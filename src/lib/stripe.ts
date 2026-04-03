import Stripe from "stripe";

export interface StoreProduct {
  id: string; // Stripe price id
  productId: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  images: string[];
  metadata: {
    code?: string;
    category?: string;
    includes?: string;
    file_size?: string;
    file_format?: string;
    version?: string;
    status?: "available" | "coming_soon" | "archived";
  };
}

let stripeClient: Stripe | null = null;

function getStripe() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(secret, {
      apiVersion: "2026-03-25.dahlia",
      typescript: true,
    });
  }
  return stripeClient;
}

function normalizeProduct(price: Stripe.Price): StoreProduct | null {
  if (!price.product || typeof price.product === "string") return null;
  const product = price.product as Stripe.Product;
  if (product.active === false) return null;

  return {
    id: price.id,
    productId: product.id,
    name: product.name,
    description: product.description,
    price: price.unit_amount ?? 0,
    currency: price.currency,
    images: product.images ?? [],
    metadata: {
      code: product.metadata.code,
      category: product.metadata.category,
      includes: product.metadata.includes,
      file_size: product.metadata.file_size,
      file_format: product.metadata.file_format,
      version: product.metadata.version,
      status: (product.metadata.status as StoreProduct["metadata"]["status"]) ?? "available",
    },
  };
}

export async function getProducts(): Promise<StoreProduct[]> {
  const stripe = getStripe();
  if (!stripe) return [];

  try {
    const prices = await stripe.prices.list({
      expand: ["data.product"],
      active: true,
      limit: 100,
    });

    return prices.data
      .map(normalizeProduct)
      .filter((product): product is StoreProduct => Boolean(product))
      .filter((product) => product.metadata.status !== "archived");
  } catch {
    return [];
  }
}

export async function getProduct(priceId: string): Promise<StoreProduct | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  try {
    const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });
    return normalizeProduct(price);
  } catch {
    return null;
  }
}

export async function createCheckoutSession(priceId: string) {
  const stripe = getStripe();
  if (!stripe) return null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const product = await getProduct(priceId);
  if (!product || product.metadata.status === "coming_soon") return null;

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "payment",
    success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/shop/cancel`,
    billing_address_collection: "required",
    customer_creation: "always",
    metadata: {
      price_id: priceId,
      product_code: product.metadata.code ?? "",
    },
  });

  return session;
}

export function getStripeWebhookClient() {
  return getStripe();
}

export function formatPrice(amount: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}
