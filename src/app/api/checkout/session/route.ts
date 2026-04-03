import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { priceId?: string };
    const priceId = body.priceId;
    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required." }, { status: 400 });
    }

    const session = await createCheckoutSession(priceId);
    if (!session || !session.url) {
      return NextResponse.json({ error: "Checkout is not available." }, { status: 400 });
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch {
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
  }
}
