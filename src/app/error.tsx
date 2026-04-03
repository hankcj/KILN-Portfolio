"use client";

import RevealOnView from "@/components/dom/motion/RevealOnView";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;

  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden text-white"
      style={{ background: "linear-gradient(180deg, #13161F 0%, #14181f 50%, #111420 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(0, 54, 216, 0.05), transparent 55%)" }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
        <RevealOnView className="kiln-card-surface border border-white/10 bg-white/[0.02] p-8 sm:p-10" blur>
          <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4 font-mono">Dark</p>
          <h1
            className="text-3xl sm:text-4xl text-white font-light mb-4"
            style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
          >
            No signal returned
          </h1>
          <p className="text-white/55 leading-relaxed mb-8">
            This view was interrupted. Try again, or return to a stable route.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="kiln-button-surface inline-flex items-center gap-3 border border-white/30 px-5 py-3 text-[10px] tracking-[0.2em] text-white/70 uppercase hover:text-white hover:border-white/50 transition-colors duration-300"
          >
            <span>Resolve</span>
            <span aria-hidden>→</span>
          </button>
        </RevealOnView>
      </div>
    </div>
  );
}
