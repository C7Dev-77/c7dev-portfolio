// lib/ratelimit.ts
// Requiere variables inyectadas por la integración de Upstash en Vercel:
// UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Resultado por defecto cuando Redis no está disponible (permite pasar)
const ALLOW_RESULT = { success: true as const, limit: 999, remaining: 999, reset: 0, pending: Promise.resolve() };

// Crear Redis solo si las variables de entorno están disponibles
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch (e) {
  console.warn('[ratelimit] Redis no disponible, rate limiting desactivado:', e);
}

// Helper para crear un limitador seguro
function safeRatelimit(prefix: string, limiter: any) {
  if (!redis) return null;
  try {
    return new Ratelimit({ redis: redis!, limiter, analytics: true, prefix });
  } catch (e) {
    console.warn(`[ratelimit] No se pudo crear el limitador ${prefix}:`, e);
    return null;
  }
}

const _claimsLimiter = safeRatelimit('rl:claims', Ratelimit.slidingWindow(5, '10 m'));
const _claimDownloadLimiter = safeRatelimit('rl:claim-download', Ratelimit.slidingWindow(10, '5 m'));
const _purchaseDownloadLimiter = safeRatelimit('rl:purchase-download', Ratelimit.slidingWindow(10, '5 m'));

/**
 * Limitador para generar tokens de descarga gratuita (Work.ink).
 * Si Redis no está configurado, permite pasar sin error.
 */
export const claimsLimiter = {
  limit: async (ip: string) => {
    if (!_claimsLimiter) return ALLOW_RESULT;
    try { return await _claimsLimiter.limit(ip); } catch { return ALLOW_RESULT; }
  }
};

/**
 * Limitador para canjear un token de descarga gratuita.
 */
export const claimDownloadLimiter = {
  limit: async (ip: string) => {
    if (!_claimDownloadLimiter) return ALLOW_RESULT;
    try { return await _claimDownloadLimiter.limit(ip); } catch { return ALLOW_RESULT; }
  }
};

/**
 * Limitador para descargar una compra de Lemon Squeezy.
 */
export const purchaseDownloadLimiter = {
  limit: async (ip: string) => {
    if (!_purchaseDownloadLimiter) return ALLOW_RESULT;
    try { return await _purchaseDownloadLimiter.limit(ip); } catch { return ALLOW_RESULT; }
  }
};

/**
 * Extrae la IP del cliente de los headers estándar de Vercel/Next.js.
 * Fallback a '127.0.0.1' solo en desarrollo local.
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  );
}
