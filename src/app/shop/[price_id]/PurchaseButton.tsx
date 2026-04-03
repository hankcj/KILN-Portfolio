"use client";

import { useState } from "react";

interface PurchaseButtonProps {
  priceId: string;
  disabled?: boolean;
}

export function PurchaseButton({ priceId, disabled = false }: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startCheckout = async () => {
    if (disabled) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = (await response.json()) as { error?: string; url?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "No signal returned.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "No signal returned.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading || disabled}
        className="kiln-button-surface inline-flex items-center gap-3 border border-white/30 px-5 py-3 text-[10px] tracking-[0.2em] text-white/75 uppercase hover:text-white hover:border-white/50 transition-colors duration-300 disabled:opacity-50"
      >
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${loading ? "kiln-badge-pulse bg-[#3A7D8C]" : "bg-white/45"}`}
        />
        <span>{loading ? "Acquiring..." : disabled ? "Dark" : "Checkout"}</span>
        <span aria-hidden>→</span>
      </button>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  );
}
