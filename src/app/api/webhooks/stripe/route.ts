/**
 * Stripe Webhook Handler
 * 
 * Handles post-purchase events:
 * - checkout.session.completed: Send download email via AWS SES
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendPurchaseConfirmationEmail } from '@/lib/email';
import { generateDownloadLink, generateDownloadLinkFromMetadata } from '@/lib/downloads';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name;
      const productCode = session.metadata?.product_code || 'UNKNOWN';
      const priceId = session.metadata?.price_id;

      if (!customerEmail) {
        console.error('No customer email in session:', session.id);
        return NextResponse.json({ received: true });
      }

      if (!priceId) {
        console.error('No price_id in session metadata:', session.id);
        return NextResponse.json({ received: true });
      }

      // Get product details from Stripe
      const price = await stripe.prices.retrieve(priceId, {
        expand: ['product'],
      });

      if (!price.product || typeof price.product === 'string') {
        console.error('Could not retrieve product details:', priceId);
        return NextResponse.json({ received: true });
      }

      const product = price.product;

      // Check if product is deleted
      if ('deleted' in product && product.deleted) {
        console.error('Product has been deleted:', priceId);
        return NextResponse.json({ received: true });
      }

      const activeProduct = product as import('stripe').Stripe.Product;

      // Generate download link
      // Option 1: Use hardcoded map (PRODUCT_FILE_MAP in downloads.ts)
      let downloadResult = await generateDownloadLink({ productCode });

      // Option 2: Use Stripe metadata s3_path if available
      if (!downloadResult && activeProduct.metadata?.s3_path) {
        downloadResult = await generateDownloadLinkFromMetadata(
          activeProduct.metadata.s3_path,
          activeProduct.metadata.download_filename
        );
      }

      if (!downloadResult) {
        console.error('Failed to generate download link for:', productCode);
        // TODO: Send alert to admin - purchase without download
        return NextResponse.json({ received: true });
      }

      // Send confirmation email
      await sendPurchaseConfirmationEmail({
        to: customerEmail,
        customerName: customerName || undefined,
        productName: activeProduct.name,
        productCode: productCode,
        downloadUrl: downloadResult.url,
        orderId: session.id.slice(-8).toUpperCase(),
        amount: session.amount_total || 0,
        currency: session.currency || 'usd',
      });

      console.log('Purchase processed successfully:', {
        orderId: session.id,
        customerEmail,
        productName: product.name,
        productCode,
      });

      return NextResponse.json({ received: true });
    } catch (error) {
      console.error('Error processing completed checkout:', error);
      // Still return 200 to Stripe to prevent retries
      // Log error for manual follow-up
      return NextResponse.json({ received: true });
    }
  }

  // Handle other events as needed
  return NextResponse.json({ received: true });
}
