import { createServerSupabaseClient } from '@/lib/supabase/server';
import { claimDownloadLimiter, getClientIp } from '@/lib/ratelimit';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { token: string } }) {
  // --- Rate Limiting ---
  const ip = getClientIp(req);
  const { success, limit, remaining, reset } = await claimDownloadLimiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
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
    const supabase = createServerSupabaseClient();
    const { token } = params;

    if (!token) {
      return NextResponse.json({ error: 'Falta token' }, { status: 400 });
    }

    // 1. Buscar el claim por el token único
    const { data: claim, error: claimError } = await supabase
      .from('free_claims')
      .select('id, product_id, expires_at, ad_verified')
      .eq('download_token', token)
      .single();

    if (claimError || !claim) {
      return NextResponse.json({ error: 'Sesión de descarga inválida o no encontrada' }, { status: 404 });
    }

    // 2. Verificar expiración (el token dura 30 minutos desde su creación)
    if (new Date(claim.expires_at) < new Date()) {
      return NextResponse.json({ error: 'El tiempo para descargar ha expirado. Por favor, genera un nuevo enlace.' }, { status: 410 });
    }

    // 3. Como usamos el Override API y la única forma de que el usuario regrese
    // con el token es habiendo completado Work.ink, marcamos como verificado si no lo estaba.
    if (!claim.ad_verified) {
      await supabase
        .from('free_claims')
        .update({ ad_verified: true })
        .eq('id', claim.id);
    }

    // 4. Obtener el storage_path del producto
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('storage_path')
      .eq('id', claim.product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Producto no encontrado en la base de datos' }, { status: 404 });
    }

    // 5. Generar Signed URL de Supabase Storage (expira en 5 minutos para mayor seguridad)
    const { data: signed, error: signError } = await supabase
      .storage
      .from('product-files')
      .createSignedUrl(product.storage_path, 300);

    if (signError || !signed) {
      console.error('Error generando signed URL:', signError);
      return NextResponse.json({ error: 'No se pudo generar el enlace de descarga' }, { status: 500 });
    }

    return NextResponse.json({ url: signed.signedUrl }, { status: 200 });

  } catch (error: any) {
    console.error('Error en /api/claims/[token]/download:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
