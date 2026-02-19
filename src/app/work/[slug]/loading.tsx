/**
 * Work Detail Loading State
 * 
 * Skeleton loader matching the system aesthetic.
 * Provides visual feedback while output data loads.
 */

import { SimplePageShell } from '@/components/dom/PageShell';

export default function WorkDetailLoading() {
  return (
    <SimplePageShell
      currentPage="outputs"
      leftSideText="LOADING..."
      rightSideText="PLEASE_WAIT"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Back link skeleton */}
          <div className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted mb-12">
            <span>←</span>
            <span className="animate-pulse">LOADING_ARCHIVE...</span>
          </div>

          {/* Header skeleton */}
          <header className="mb-12 pb-8 border-b border-border-muted">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-system text-accent animate-pulse">
                INITIALIZING...
              </span>
              <div className="h-4 w-24 bg-bg-tertiary animate-pulse" />
            </div>
            
            {/* Title skeleton */}
            <div className="h-12 md:h-16 bg-bg-tertiary rounded animate-pulse mb-6 max-w-2xl" />
            
            {/* Description skeleton */}
            <div className="space-y-3 max-w-2xl">
              <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 bg-bg-tertiary rounded animate-pulse w-3/4" />
            </div>
          </header>

          {/* Content skeleton */}
          <div className="space-y-8">
            {/* Image placeholder */}
            <div className="aspect-video bg-bg-secondary border border-border-muted flex items-center justify-center relative overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-full h-full animate-shimmer" 
                     style={{ backgroundSize: '200% 100%' }} />
              </div>
              <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                <span className="font-mono text-system text-on-surface-muted animate-pulse">
                  LOADING_OUTPUT_PREVIEW
                </span>
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 bg-bg-tertiary rounded animate-pulse w-5/6" />
              <div className="h-4 bg-bg-tertiary rounded animate-pulse w-4/5" />
            </div>

            {/* Meta data skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-border-muted bg-bg-secondary">
                  <div className="h-3 bg-bg-tertiary rounded animate-pulse mb-2 w-16" />
                  <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer skeleton */}
          <footer className="mt-16 pt-8 border-t border-border-muted">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-system text-on-surface-muted">
                SYSTEM_READY
              </span>
            </div>
          </footer>
        </div>
      </div>
    </SimplePageShell>
  );
}
