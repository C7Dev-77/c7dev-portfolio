import { createServerSupabaseClient } from '@/lib/supabase/server';
import { purchaseDownloadLimiter, getClientIp } from '@/lib/ratelimit';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  // --- Rate Limiting ---
  const ip = getClientIp(req);
  const { success, limit, remaining, reset } = await purchaseDownloadLimiter.limit(ip);

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
    const { orderId } = params;

    // 1. Validar que la compra existe y está pagada
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .select('status, product_id')
      .eq('provider_order_id', orderId)
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json({ error: 'Compra no encontrada' }, { status: 404 });
    }

    if (purchase.status !== 'paid') {
      return NextResponse.json({ error: 'El pago no ha sido verificado aún' }, { status: 403 });
    }

    // 2. Obtener el path del archivo desde el producto
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('storage_path')
      .eq('id', purchase.product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Producto no encontrado en base de datos' }, { status: 404 });
    }

    // 3. Generar Signed URL de Supabase Storage (expira en 10 minutos)
    const { data: signed, error: signError } = await supabase
      .storage
      .from('product-files')
      .createSignedUrl(product.storage_path, 600);

    if (signError || !signed) {
      console.error('Error generando signed URL:', signError);
      return NextResponse.json({ error: 'No se pudo generar el enlace de descarga' }, { status: 500 });
    }

    // 4. Retornar la URL firmada
    return NextResponse.json({ url: signed.signedUrl }, { status: 200 });

  } catch (error: any) {
    console.error('Error en el endpoint de descarga:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
