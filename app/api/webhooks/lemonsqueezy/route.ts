import crypto from 'crypto';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') ?? '';

    // Validar firma de Lemon Squeezy
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret) {
      console.error('LEMONSQUEEZY_WEBHOOK_SECRET no está definido');
      return new NextResponse('Error de configuración del servidor', { status: 500 });
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(rawBody).digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature)) === false) {
      return new NextResponse('Firma inválida', { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Procesar evento de creación de orden
    if (event.meta.event_name === 'order_created') {
      const supabase = createServerSupabaseClient();
      
      // custom_data se pasa al generar el link de checkout
      const productId = event.meta.custom_data?.product_id;
      const orderId = String(event.data.id);
      const email = event.data.attributes.user_email;

      if (!productId) {
        console.error('Webhook recibido sin product_id en custom_data');
        return new NextResponse('Falta product_id en custom_data', { status: 400 });
      }

      // Upsert para idempotencia
      const { error } = await supabase.from('purchases').upsert(
        {
          product_id: productId,
          buyer_email: email,
          provider: 'lemonsqueezy',
          provider_order_id: orderId,
          status: 'paid',
        },
        { onConflict: 'provider_order_id' }
      );

      if (error) {
        console.error('Error insertando compra en Supabase:', error);
        return new NextResponse('Error de base de datos', { status: 500 });
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (err: any) {
    console.error('Error procesando webhook Lemon Squeezy:', err);
    return new NextResponse('Error interno', { status: 500 });
  }
}
