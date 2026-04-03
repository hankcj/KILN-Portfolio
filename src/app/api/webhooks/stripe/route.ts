import { NextRequest, NextResponse } from "next/server";
import { getStripeWebhookClient } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const stripe = getStripeWebhookClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const payload = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    // Keep the handler lightweight. Additional fulfillment can be added incrementally.
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Stripe checkout completed:", {
        id: session.id,
        email: session.customer_details?.email,
      });
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }
}
