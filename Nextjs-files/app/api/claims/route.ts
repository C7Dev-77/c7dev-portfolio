import { createServerSupabaseClient } from '@/lib/supabase/server';
import { claimsLimiter, getClientIp } from '@/lib/ratelimit';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // --- Rate Limiting ---
  const ip = getClientIp(req);
  const { success, limit, remaining, reset } = await claimsLimiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      }
    );
  }

  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: 'Falta productId' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const token = crypto.randomUUID();

    // Hashear IP para almacenarla de forma privada
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    // Insertar el claim en la base de datos
    const { error } = await supabase.from('free_claims').insert({
      product_id: productId,
      download_token: token,
      ip_hash: ipHash,
      // 30 minutos para completar el flujo de Work.ink
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      ad_verified: false,
    });

    if (error) {
      console.error('Error creando free_claim:', error);
      return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 });
    }

    // El enlace base de Work.ink provisto por ti
    const baseUrl = 'https://work.ink/2O98/example';
    const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/descargar?token=${token}`;

    // Llamar a la Override API de Work.ink
    const overrideRes = await fetch(
      `https://work.ink/_api/v2/override?destination=${encodeURIComponent(returnUrl)}`
    );

    if (!overrideRes.ok) {
      console.error('Error en Work.ink Override API:', await overrideRes.text());
      return NextResponse.json({ redirectUrl: baseUrl });
    }

    const overrideData = await overrideRes.json();

    if (!overrideData.sr) {
      console.error('La API de Work.ink no devolvió el parámetro sr');
      return NextResponse.json({ redirectUrl: baseUrl });
    }

    const finalUrl = `${baseUrl}?sr=${overrideData.sr}`;

    return NextResponse.json({ redirectUrl: finalUrl });
  } catch (err) {
    console.error('Error general en /api/claims:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
