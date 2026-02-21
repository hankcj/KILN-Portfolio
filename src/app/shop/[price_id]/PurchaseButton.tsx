'use client';

import { useState } from 'react';

interface PurchaseButtonProps {
  priceId: string;
  status?: string;
}

export function PurchaseButton({ priceId, status }: PurchaseButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (status === 'coming_soon') return;

    setIsLoading(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'coming_soon') {
    return (
      <button
        disabled
        className="w-full px-6 py-4 bg-bg-tertiary border border-border-muted text-on-surface-muted font-mono text-system cursor-not-allowed"
      >
        COMING_SOON
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className="w-full px-6 py-4 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <span className="w-2 h-2 bg-on-accent rounded-full animate-pulse" />
            <span>PROCESSING</span>
          </>
        ) : (
          <>
            <span>PURCHASE</span>
            <span>→</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30">
          <p className="font-mono text-system text-red-400">
            {'>'} ERROR
          </p>
          <p className="text-small text-on-bg-secondary mt-1">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
