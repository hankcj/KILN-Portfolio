/**
 * Error Fallback Component
 * 
 * Reusable error display for use with React Error Boundaries.
 * Can be used in client components that need local error handling.
 */

'use client';

interface ErrorFallbackProps {
  error: Error;
  reset?: () => void;
  title?: string;
  description?: string;
  compact?: boolean;
}

export function ErrorFallback({
  error,
  reset,
  title = 'System Error',
  description = 'An unexpected error occurred.',
  compact = false,
}: ErrorFallbackProps) {
  if (compact) {
    return (
      <div className="p-4 border border-red-500/30 bg-red-500/5 rounded">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="font-mono text-system text-red-400">{title}</span>
        </div>
        <p className="text-small text-on-bg-secondary mb-3">{description}</p>
        {reset && (
          <button
            onClick={reset}
            className="text-small font-mono text-accent hover:text-on-bg-primary transition-colors"
          >
            ↻ Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 border border-red-500/30 bg-red-500/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <span className="font-mono text-system text-red-400">SYSTEM_ERROR</span>
      </div>
      
      <h3 className="font-heading text-h3 text-on-bg-primary mb-3">{title}</h3>
      <p className="text-body text-on-bg-secondary mb-6">{description}</p>
      
      {error.message && (
        <div className="p-4 bg-bg-secondary border border-border-muted mb-6">
          <p className="font-mono text-system text-on-surface-muted mb-1">ERROR_MESSAGE:</p>
          <p className="font-mono text-small text-on-bg-secondary">{error.message}</p>
        </div>
      )}
      
      {reset && (
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
          >
            <span>↻ RETRY_OPERATION</span>
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * WebGL Error Fallback
 * 
 * Specific fallback for WebGL/Canvas errors.
 */
export function WebGLErrorFallback({ reset }: { reset?: () => void }) {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div className="text-center p-8 border border-border-muted bg-bg-primary/80 backdrop-blur-sm">
        <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-mono text-system text-on-surface-muted">
          RENDER_SYSTEM_DEGRADED
        </p>
        <p className="text-small text-on-bg-tertiary mt-2">
          Falling back to standard rendering
        </p>
        {reset && (
          <button
            onClick={reset}
            className="mt-4 text-small font-mono text-accent hover:text-on-bg-primary transition-colors pointer-events-auto"
          >
            ↻ Retry WebGL
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Data Error Fallback
 * 
 * For content/data fetching errors.
 */
export function DataErrorFallback({
  reset,
  resourceName = 'Data',
}: {
  reset?: () => void;
  resourceName?: string;
}) {
  return (
    <div className="p-6 border border-yellow-500/30 bg-yellow-500/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
        <span className="font-mono text-system text-yellow-400">DATA_UNAVAILABLE</span>
      </div>
      
      <p className="text-body text-on-bg-secondary mb-4">
        Unable to load {resourceName.toLowerCase()}. This may be temporary.
      </p>
      
      {reset && (
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 border border-border-custom text-on-bg-primary font-mono text-system hover:bg-bg-secondary transition-colors"
        >
          <span>↻ RETRY</span>
        </button>
      )}
    </div>
  );
}
