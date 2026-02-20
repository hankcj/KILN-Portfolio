/**
 * Stripe Integration
 * 
 * Client and server-side utilities for Stripe Checkout.
 * Products are managed in Stripe Dashboard; this site fetches via API.
 */

import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover', // Latest API version
  typescript: true,
});

// Client-side Stripe promise
let stripePromise: Promise<StripeClient | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Product type from Stripe
export interface Product {
  id: string;                    // Price ID
  productId: string;             // Product ID
  name: string;
  description: string | null;
  price: number;                 // In cents
  currency: string;
  images: string[];
  metadata: {
    code?: string;
    category?: string;
    includes?: string;
    file_size?: string;
    file_format?: string;
    version?: string;
    status?: 'available' | 'coming_soon' | 'archived';
  };
}

// Fetch all active products from Stripe
export async function getProducts(): Promise<Product[]> {
  try {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
      limit: 100,
    });

    return prices.data
      .filter((price) => price.product && typeof price.product !== 'string')
      .map((price) => {
        const product = price.product as Stripe.Product;
        return {
          id: price.id,
          productId: product.id,
          name: product.name,
          description: product.description,
          price: price.unit_amount || 0,
          currency: price.currency,
          images: product.images || [],
          metadata: {
            code: product.metadata.code || 'PROD.000',
            category: product.metadata.category || 'tool',
            includes: product.metadata.includes,
            file_size: product.metadata.file_size,
            file_format: product.metadata.file_format,
            version: product.metadata.version,
            status: (product.metadata.status as Product['metadata']['status']) || 'available',
          },
        };
      })
      .filter((product) => product.metadata.status !== 'archived');
  } catch (error) {
    console.error('Error fetching products from Stripe:', error);
    return [];
  }
}

// Fetch single product by price ID
export async function getProduct(priceId: string): Promise<Product | null> {
  try {
    const price = await stripe.prices.retrieve(priceId, {
      expand: ['product'],
    });

    if (!price.product || typeof price.product === 'string') {
      return null;
    }

    const product = price.product as Stripe.Product;

    return {
      id: price.id,
      productId: product.id,
      name: product.name,
      description: product.description,
      price: price.unit_amount || 0,
      currency: price.currency,
      images: product.images || [],
      metadata: {
        code: product.metadata.code || 'PROD.000',
        category: product.metadata.category || 'tool',
        includes: product.metadata.includes,
        file_size: product.metadata.file_size,
        file_format: product.metadata.file_format,
        version: product.metadata.version,
        status: (product.metadata.status as Product['metadata']['status']) || 'available',
      },
    };
  } catch (error) {
    console.error('Error fetching product from Stripe:', error);
    return null;
  }
}

// Format price for display
export function formatPrice(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}
