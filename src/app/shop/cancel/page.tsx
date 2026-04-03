import Link from "next/link";
import RevealOnView from "@/components/dom/motion/RevealOnView";

export default function ShopCancelPage() {
  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #13161F 0%, #171c24 50%, #13161F 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(58, 125, 140, 0.04), transparent 55%)" }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
        <RevealOnView className="kiln-card-surface border border-white/10 bg-white/[0.02] p-8 sm:p-10" blur>
          <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase mb-4 font-mono">Dark</p>
          <h1
            className="text-3xl sm:text-4xl text-white font-light mb-4"
            style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
          >
            Checkout not completed
          </h1>
          <p className="text-white/55 leading-relaxed mb-8">
            No charge was made. You can return to tools and complete checkout whenever you are
            ready.
          </p>
          <Link
            href="/shop"
            className="kiln-link-surface inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/70 uppercase hover:text-white transition-colors duration-300"
          >
            <span>Return to tools</span>
            <span aria-hidden>→</span>
          </Link>
        </RevealOnView>
      </div>
    </div>
  );
}
