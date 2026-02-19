/**
 * Signal Route Error Boundary
 * 
 * Catches errors specifically in the Signal/blog section.
 */

'use client';

import { useEffect } from 'react';
import { SimplePageShell } from '@/components/dom/PageShell';

export default function SignalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Signal section error:', error);
  }, [error]);

  return (
    <SimplePageShell
      currentPage="signal"
      leftSideText="SIGNAL_LOST"
      rightSideText="NO_CARRIER"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="border border-yellow-500/30 bg-yellow-500/5 p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span className="font-mono text-system text-yellow-400">
                TRANSMISSION_ERROR
              </span>
            </div>
            
            <h1 className="font-heading text-display text-on-bg-primary mb-4">
              Signal Lost
            </h1>
            
            <p className="text-body text-on-bg-secondary mb-6">
              Unable to receive transmissions from the content server. 
              The signal may be temporarily interrupted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
              >
                <span>↻ RETRY_CONNECTION</span>
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border-custom text-on-bg-primary font-mono text-system hover:bg-bg-secondary transition-colors"
              >
                <span>← RETURN</span>
              </a>
            </div>
          </div>

          {/* Signal diagnostic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border-muted bg-bg-secondary">
              <p className="font-mono text-system text-on-surface-muted mb-1">SIGNAL_STRENGTH</p>
              <p className="text-red-400 font-mono">0%</p>
            </div>
            <div className="p-4 border border-border-muted bg-bg-secondary">
              <p className="font-mono text-system text-on-surface-muted mb-1">NOISE_LEVEL</p>
              <p className="text-yellow-400 font-mono">CRITICAL</p>
            </div>
            <div className="p-4 border border-border-muted bg-bg-secondary">
              <p className="font-mono text-system text-on-surface-muted mb-1">LAST_SYNC</p>
              <p className="text-on-bg-secondary font-mono">FAILED</p>
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
