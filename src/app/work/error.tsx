/**
 * Work Route Error Boundary
 * 
 * Catches errors specifically in the work/outputs section.
 */

'use client';

import { useEffect } from 'react';
import { SimplePageShell } from '@/components/dom/PageShell';

export default function WorkError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Work section error:', error);
  }, [error]);

  return (
    <SimplePageShell
      currentPage="outputs"
      leftSideText="ARCHIVE_ERROR"
      rightSideText="RECOVERY_MODE"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="border border-red-500/30 bg-red-500/5 p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="font-mono text-system text-red-400">
                ARCHIVE_ACCESS_ERROR
              </span>
            </div>
            
            <h1 className="font-heading text-display text-on-bg-primary mb-4">
              Failed to Load Outputs
            </h1>
            
            <p className="text-body text-on-bg-secondary mb-6">
              The output archive could not be accessed. This may be due to a 
              temporary system issue or connection problem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
              >
                <span>↻ RETRY</span>
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border-custom text-on-bg-primary font-mono text-system hover:bg-bg-secondary transition-colors"
              >
                <span>← HOME</span>
              </a>
            </div>
          </div>

          {/* Diagnostic info */}
          {error.digest && (
            <div className="font-mono text-system text-on-surface-muted">
              <p>ERROR_REF: {error.digest}</p>
              <p>TIMESTAMP: {new Date().toISOString()}</p>
            </div>
          )}
        </div>
      </div>
    </SimplePageShell>
  );
}
