import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct } from "@/lib/stripe";
import { motionTokens } from "@/lib/motion";
import { PurchaseButton } from "./PurchaseButton";
import RouteShell from "@/components/dom/RouteShell";
import RevealOnView from "@/components/dom/motion/RevealOnView";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ price_id: string }>;
}

function parseIncludes(includes: string | undefined) {
  if (!includes) return [];
  return includes
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { price_id } = await params;
  const product = await getProduct(price_id);
  if (!product) return { title: "Tool Not Found | KILN" };
  return {
    title: `${product.name} | KILN Tools`,
    description: product.description || "Digital tool from the KILN studio archive.",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { price_id } = await params;
  const product = await getProduct(price_id);

  if (!product) {
    notFound();
  }

  const includes = parseIncludes(product.metadata.includes);
  const isComingSoon = product.metadata.status === "coming_soon";

  return (
    <RouteShell theme="shop" showProgress showSections={false}>
      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-24">
        <RevealOnView blur>
          <Link
            href="/shop"
            className="kiln-link-surface inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/40 uppercase mb-8 hover:text-white/60 transition-colors duration-300"
          >
            <span>← Return to tools</span>
          </Link>
        </RevealOnView>

        <RevealOnView className="kiln-card-surface kiln-spotlight border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-8" delayMs={70} blur>
          <div className="flex items-center gap-3 mb-3">
            <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
              {product.metadata.code || "Tool object"}
            </p>
            {!isComingSoon && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="kiln-badge-pulse inline-block w-1.5 h-1.5 rounded-full bg-[#3A7D8C]" />
                <span className="text-[9px] tracking-[0.15em] text-[#3A7D8C]/70 uppercase">Available</span>
              </>
            )}
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-white font-light mb-4 leading-tight"
            style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
          >
            {product.name}
          </h1>
          {product.description && (
            <p className="text-white/55 leading-relaxed mb-6">{product.description}</p>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/5">
            <span className="inline-block px-3 py-1.5 border border-[#3A7D8C]/30 text-[10px] tracking-[0.15em] text-[#3A7D8C] uppercase">
              {formatPrice(product.price, product.currency)}
            </span>
            <PurchaseButton priceId={product.id} disabled={isComingSoon} />
          </div>
        </RevealOnView>

        {includes.length > 0 && (
          <RevealOnView className="kiln-card-surface border border-white/10 bg-white/[0.02] p-6 sm:p-8" delayMs={motionTokens.stagger.slow} blur>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[1px] w-6 bg-[#3A7D8C]/40" />
              <h2
                className="text-2xl text-white font-light"
                style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
              >
                Includes
              </h2>
            </div>
            <ul className="space-y-3 pl-9">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/55 text-sm leading-relaxed">
                  <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-[#3A7D8C]/50" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnView>
        )}
      </div>
    </RouteShell>
  );
}
