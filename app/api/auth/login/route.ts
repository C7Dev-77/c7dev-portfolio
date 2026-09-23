import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, claimsLimiter } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  // Rate Limiting para evitar ataques de fuerza bruta al login
  const ip = getClientIp(req as any);
  
  // Usamos el claimsLimiter que permite 5 peticiones por minuto
  const { success, limit, remaining, reset } = await claimsLimiter.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo más tarde.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString()
        }
      }
    );
  }

  return NextResponse.json({ success: true });
}
