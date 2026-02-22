/**
 * Product Detail Route
 * 
 * Individual product page with Stripe Checkout integration.
 */

import Image from 'next/image';
import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal } from '@/components/dom/ScrollReveal';
import { getProduct, formatPrice } from '@/lib/stripe';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PurchaseButton } from './PurchaseButton';

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{
    price_id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { price_id } = await params;
  const product = await getProduct(price_id);
  
  if (!product) {
    return { title: 'Product not found — KILN' };
  }

  return {
    title: `${product.name} — KILN`,
    description: product.description || 'Digital product from KILN studio',
  };
}

// Format includes list from metadata
function formatIncludes(includes: string | undefined): string[] {
  if (!includes) return [];
  return includes.split(',').map(item => item.trim());
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { price_id } = await params;
  const product = await getProduct(price_id);

  if (!product) {
    notFound();
  }

  const includes = formatIncludes(product.metadata.includes);
  const status = product.metadata.status || 'available';

  return (
    <SimplePageShell
      currentPage="shop"
      leftSideText="PRODUCT_DETAIL"
      rightSideText={product.metadata.code || 'PROD.000'}
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          
          {/* Back link */}
          <ScrollReveal>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted hover:text-accent transition-colors mb-12"
            >
              <span>←</span>
              <span>BACK_TO_SHOP</span>
            </a>
          </ScrollReveal>

          {/* Product header */}
          <header className="mb-12 pb-8 border-b border-border-muted">
            <ScrollReveal delay={0.1}>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="font-mono text-system text-accent">
                  {product.metadata.code || 'PROD.000'}
                </span>
                <span className="font-mono text-system text-on-surface-muted">
                  {product.metadata.category?.toUpperCase() || 'TOOL'}
                </span>
                {product.metadata.version && (
                  <span className="font-mono text-system text-on-surface-muted">
                    V{product.metadata.version}
                  </span>
                )}
                {status === 'coming_soon' && (
                  <span className="font-mono text-system text-accent">
                    COMING_SOON
                  </span>
                )}
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h1 className="font-heading text-display-md md:text-display text-on-bg-primary mb-6">
                {product.name}
              </h1>
            </ScrollReveal>
            
            {product.description && (
              <ScrollReveal delay={0.3}>
                <p className="text-body text-on-bg-tertiary max-w-2xl leading-relaxed">
                  {product.description}
                </p>
              </ScrollReveal>
            )}
          </header>

          {/* Product details grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Left: Image or placeholder */}
            <ScrollReveal delay={0.4} className="md:col-span-2">
              {product.images.length > 0 ? (
                <div className="aspect-video bg-bg-secondary border border-border-muted overflow-hidden relative">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-bg-secondary border border-border-muted flex items-center justify-center">
                  <span className="font-mono text-system text-on-surface-muted">
                    [PRODUCT_PREVIEW]
                  </span>
                </div>
              )}
            </ScrollReveal>

            {/* Right: Purchase panel */}
            <ScrollReveal delay={0.5}>
              <div className="bg-bg-secondary border border-border-muted p-6">
                <div className="mb-6">
                  <p className="font-mono text-system text-on-surface-muted mb-2">
                    PRICE
                  </p>
                  <p className="font-heading text-h2 text-on-bg-primary">
                    {formatPrice(product.price, product.currency)}
                  </p>
                </div>

                {product.metadata.file_size && (
                  <div className="mb-6">
                    <p className="font-mono text-system text-on-surface-muted mb-1">
                      FILE_SIZE
                    </p>
                    <p className="text-small text-on-bg-secondary">
                      {product.metadata.file_size}
                    </p>
                  </div>
                )}

                {product.metadata.file_format && (
                  <div className="mb-6">
                    <p className="font-mono text-system text-on-surface-muted mb-1">
                      FORMAT
                    </p>
                    <p className="text-small text-on-bg-secondary">
                      {product.metadata.file_format}
                    </p>
                  </div>
                )}

                <PurchaseButton 
                  priceId={product.id} 
                  status={status}
                />

                <p className="mt-4 text-xs text-on-surface-muted font-mono">
                  Secure checkout via Stripe. 
                  Download link delivered via email.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Includes section */}
          {includes.length > 0 && (
            <ScrollReveal delay={0.6}>
              <section className="mb-12 border-t border-border-custom pt-8">
                <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                  C  INCLUDES
                </p>
                <ul className="space-y-3">
                  {includes.map((item, i) => (
                    <li 
                      key={i} 
                      className="flex items-start gap-3 text-body text-on-bg-secondary"
                    >
                      <span className="text-accent mt-1">{'>'}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          )}

          {/* Footer */}
          <ScrollReveal delay={0.7}>
            <footer className="mt-16 pt-8 border-t border-border-muted">
              <a
                href="/shop"
                className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted hover:text-accent transition-colors"
              >
                <span>←</span>
                <span>BACK_TO_SHOP</span>
              </a>
            </footer>
          </ScrollReveal>
        </div>
      </div>
    </SimplePageShell>
  );
}
