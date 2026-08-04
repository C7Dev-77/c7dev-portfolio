// lib/ratelimit.ts
// Requiere variables inyectadas por la integración de Upstash en Vercel:
// UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Instancia compartida de Redis (se reutiliza entre funciones)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Limitador para generar tokens de descarga gratuita (Work.ink).
 * 5 solicitudes por IP cada 10 minutos.
 * Previene flooding de la tabla free_claims y la API de Work.ink.
 */
export const claimsLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  analytics: true,
  prefix: 'rl:claims',
});

/**
 * Limitador para canjear un token de descarga gratuita.
 * 10 intentos por IP cada 5 minutos.
 * Previene fuerza bruta sobre UUIDs de tokens.
 */
export const claimDownloadLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '5 m'),
  analytics: true,
  prefix: 'rl:claim-download',
});

/**
 * Limitador para descargar una compra de Lemon Squeezy.
 * 10 intentos por IP cada 5 minutos.
 * Previene fuerza bruta sobre order IDs.
 */
export const purchaseDownloadLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '5 m'),
  analytics: true,
  prefix: 'rl:purchase-download',
});

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
