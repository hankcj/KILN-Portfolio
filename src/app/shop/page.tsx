import Link from "next/link";
import { formatPrice, getProducts } from "@/lib/stripe";
import { motionTokens } from "@/lib/motion";
import RouteShell from "@/components/dom/RouteShell";
import ChapterHero from "@/components/dom/ChapterHero";
import SectionDivider from "@/components/dom/SectionDivider";
import RevealOnView from "@/components/dom/motion/RevealOnView";

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <RouteShell theme="shop">
      <ChapterHero
        id="shop-header"
        label="Tools"
        title="Tools"
        subtitle="Digital products built in the studio. Each tool is documented and maintained as part of the archive."
        marquee="Digital products built and maintained in the studio"
        accent="rgba(58, 125, 140, 0.05)"
      />

      <div
        id="shop-products"
        className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pb-24"
      >
        <SectionDivider label="Products" className="mb-2" />

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <RevealOnView
                key={product.id}
                delayMs={index * motionTokens.stagger.base}
                blur={index < 2}
                scale
              >
                <article className="kiln-card-surface kiln-spotlight border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                      {product.metadata.code || "Tool object"}
                    </p>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="kiln-badge-pulse inline-block w-1.5 h-1.5 rounded-full bg-[#3A7D8C]" />
                    <span className="text-[9px] tracking-[0.15em] text-[#3A7D8C]/70 uppercase">Available</span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl text-white font-light mb-4"
                    style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
                  >
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="text-white/50 text-sm leading-relaxed mb-6">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="inline-block px-3 py-1.5 border border-[#3A7D8C]/30 text-[10px] tracking-[0.15em] text-[#3A7D8C] uppercase">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    <Link
                      href={`/shop/${product.id}`}
                      className="kiln-link-surface inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/70 uppercase hover:text-white transition-colors duration-300"
                    >
                      <span>Surface</span>
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </RevealOnView>
            ))}
          </div>
        ) : (
          <RevealOnView className="border border-white/10 bg-white/[0.02] p-8 sm:p-10">
            <p className="text-white/60 text-sm leading-relaxed">
              No tools are currently visible on this route.
            </p>
          </RevealOnView>
        )}

        <RevealOnView className="mt-14" delayMs={motionTokens.stagger.slow}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <Link
              href="/intake"
              className="kiln-link-surface inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/70 uppercase hover:text-white transition-colors duration-300"
            >
              <span>Make contact</span>
              <span aria-hidden>→</span>
            </Link>
            <p className="text-[10px] tracking-[0.15em] text-white/30 uppercase">
              Custom tool commissions available
            </p>
          </div>
        </RevealOnView>
      </div>
    </RouteShell>
  );
}
