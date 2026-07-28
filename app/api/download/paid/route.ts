import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase'; // Asegúrate de tener esta importación correcta

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return NextResponse.json({ error: 'Falta session_id' }, { status: 400 });
    }

    // 1. Recuperamos la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // 2. Verificamos que el pago se haya completado
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Pago no completado' }, { status: 402 });
    }

    // 3. Obtenemos el ID del producto que guardamos en los metadata
    const productoId = session.metadata?.productoId;

    if (!productoId) {
      return NextResponse.json({ error: 'Producto no encontrado en la sesión' }, { status: 404 });
    }

    // 4. Buscamos el link_paid en Supabase
    const { data: producto, error } = await supabase
      .from('productos')
      .select('link_paid')
      .eq('id', productoId)
      .single();

    if (error || !producto || !producto.link_paid) {
      console.error('Error obteniendo producto:', error);
      return NextResponse.json({ error: 'Producto o enlace no encontrado' }, { status: 404 });
    }

    // 5. Devolvemos el enlace de descarga de forma segura
    return NextResponse.json({ link: producto.link_paid });

  } catch (error: any) {
    console.error('Error validando la descarga:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
