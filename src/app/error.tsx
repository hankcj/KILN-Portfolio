/**
 * Global Error Boundary
 * 
 * Catches errors at the root level and displays a system error page.
 * Allows users to recover without full page crash.
 */

'use client';

import { useEffect } from 'react';
import { SimplePageShell } from '@/components/dom/PageShell';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (could be Sentry, etc.)
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <SimplePageShell
      currentPage="system"
      leftSideText="CRITICAL_ERROR"
      rightSideText="RECOVERY_MODE"
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24">
        <div className="text-center max-w-2xl">
          {/* Error indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="font-mono text-system text-red-400">
              CRITICAL_SYSTEM_FAILURE
            </span>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>

          {/* Error code */}
          <h1 className="font-heading text-6xl md:text-8xl text-on-bg-primary mb-6">
            ERROR
          </h1>

          <div className="border border-red-500/30 bg-red-500/5 p-6 mb-8">
            <p className="font-mono text-system text-red-400 mb-2">
              {'// ERROR_DETAILS'}
            </p>
            <p className="text-body text-on-bg-secondary mb-4">
              A critical error has occurred in the system. The application has been 
              placed in recovery mode to prevent data loss.
            </p>
            {error.digest && (
              <p className="font-mono text-caption text-on-surface-muted">
                ERROR_ID: {error.digest}
              </p>
            )}
          </div>

          {/* Recovery actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
            >
              <span>↻ RETRY_OPERATION</span>
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-3 px-6 py-3 border border-border-custom text-on-bg-primary font-mono text-system hover:bg-bg-secondary transition-colors"
            >
              <span>← RETURN_TO_ORIGIN</span>
            </a>
          </div>

          {/* Technical info */}
          <div className="mt-12 pt-8 border-t border-border-muted">
            <p className="font-mono text-caption text-on-surface-muted mb-4">
              If the error persists, please contact system support:
            </p>
            <a 
              href="mailto:hello@kiln.studio" 
              className="font-mono text-system text-accent hover:text-on-bg-primary transition-colors"
            >
              hello@kiln.studio
            </a>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
