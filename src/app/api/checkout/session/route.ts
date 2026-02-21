/**
 * Checkout Session API
 * 
 * Creates a Stripe Checkout Session for product purchases.
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe, getProduct } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    // Verify product exists and is available
    const product = await getProduct(priceId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.metadata.status === 'coming_soon') {
      return NextResponse.json(
        { error: 'Product not yet available' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiln.studio';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop/cancel`,
      automatic_tax: { enabled: false },
      billing_address_collection: 'required',
      customer_creation: 'always',
      metadata: {
        price_id: priceId,
        product_code: product.metadata.code || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
