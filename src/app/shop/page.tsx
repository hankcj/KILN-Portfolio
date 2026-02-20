/**
 * Shop Route
 * 
 * Digital products from the studio. Fetched from Stripe.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal, StaggerReveal } from '@/components/dom/ScrollReveal';
import { getProducts, formatPrice, Product } from '@/lib/stripe';
import { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Tools — KILN',
  description: 'Digital products built in the studio. Each includes documentation on how it was made and why.',
};

// Format includes list from metadata
function formatIncludes(includes: string | undefined): string[] {
  if (!includes) return [];
  return includes.split(',').map(item => item.trim());
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <SimplePageShell
      currentPage="shop"
      leftSideText="PRODUCT_ARCHIVE_V1.0"
      rightSideText={`${products.length.toString().padStart(2, '0')} ITEMS_AVAILABLE`}
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <ScrollReveal>
              <div className="flex justify-between items-start mb-4">
                <p className="font-mono text-system text-on-surface-muted tracking-widest">
                  C  DIGITAL_PRODUCTS
                </p>
                <p className="font-mono text-system text-on-surface-muted">
                  STATUS: OPERATIONAL
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                TOOLS
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body text-on-bg-tertiary max-w-2xl">
                Digital products built in the studio. Each includes documentation 
                on how it was made and why. Purchases include future updates.
              </p>
            </ScrollReveal>
          </header>

          {/* Products Grid */}
          {products.length > 0 ? (
            <StaggerReveal 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-custom" 
              stagger={0.1}
            >
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </StaggerReveal>
          ) : (
            <div className="py-24 text-center border border-border-muted">
              <p className="font-mono text-system text-on-surface-muted mb-4">
                {'// NO_PRODUCTS_AVAILABLE'}
              </p>
              <p className="text-body text-on-bg-tertiary">
                Products are being prepared. Check back soon.
              </p>
            </div>
          )}

          {/* Bottom info */}
          <div className="flex justify-between items-end mt-16 pt-8 border-t border-border-muted">
            <div className="font-mono text-system text-on-surface-muted">
              TOTAL: {products.length.toString().padStart(2, '0')} ITEMS
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-system text-on-surface-muted">
                STRIPE_CONNECTED
              </span>
            </div>
            <div className="font-mono text-system text-on-surface-muted">
              UPDATED_LIVE
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}

// Product card component
function ProductCard({ product, index }: { product: Product; index: number }) {
  const includes = formatIncludes(product.metadata.includes);
  const status = product.metadata.status || 'available';

  return (
    <a 
      href={`/shop/${product.id}`}
      className="bg-bg-primary p-8 min-h-[320px] flex flex-col justify-between group hover:bg-bg-secondary border border-transparent hover:border-border-custom hover-lift focus-ring"
    >
      {/* Top row: Code, Price, Status */}
      <div className="flex justify-between items-start mb-6">
        <span className="font-mono text-system text-accent">
          {product.metadata.code || `PROD.${String(index + 1).padStart(3, '0')}`}
        </span>
        <div className="text-right">
          <span className="font-mono text-system text-on-bg-primary">
            {formatPrice(product.price, product.currency)}
          </span>
          {status === 'coming_soon' && (
            <p className="font-mono text-system text-on-surface-muted mt-1">
              COMING_SOON
            </p>
          )}
        </div>
      </div>

      {/* Middle: Name and Description */}
      <div className="flex-1">
        <h3 className="font-heading text-h3 text-on-bg-primary group-hover:text-accent transition-colors mb-3">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-small text-on-bg-tertiary leading-relaxed line-clamp-3">
            {product.description}
          </p>
        )}
      </div>

      {/* Bottom: Includes preview */}
      <div className="mt-6 pt-4 border-t border-border-muted">
        {includes.length > 0 && (
          <p className="font-mono text-system text-on-surface-muted mb-2">
            INCLUDES {includes.length} ITEMS
          </p>
        )}
        <div className="flex justify-between items-center">
          <span className="font-mono text-system text-on-surface-muted group-hover:text-accent transition-colors">
            {'// VIEW_SPECIFICATIONS →'}
          </span>
          <div className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
        </div>
      </div>
    </a>
  );
}
