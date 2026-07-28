import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { productoId, nombre, precio, imagen_url } = await req.json();

    if (!productoId || !nombre || !precio) {
      return NextResponse.json(
        { error: 'Faltan datos del producto' },
        { status: 400 }
      );
    }

    // Creamos una sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: nombre,
              images: imagen_url ? [imagen_url] : [],
            },
            unit_amount: Math.round(precio * 100), // Stripe maneja centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/tienda?canceled=true`,
      metadata: {
        productoId: productoId, // Pasamos el ID para el webhook
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creando la sesión de Stripe:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
