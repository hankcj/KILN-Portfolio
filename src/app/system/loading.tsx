/**
 * System Loading State
 * 
 * Skeleton loader for system/colophon page.
 */

import { SimplePageShell } from '@/components/dom/PageShell';

export default function SystemLoading() {
  return (
    <SimplePageShell
      currentPage="system"
      leftSideText="LOADING..."
      rightSideText="SYS_INIT"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Header skeleton */}
          <header className="mb-16 md:mb-24">
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 w-32 bg-bg-tertiary animate-pulse" />
              <div className="h-4 w-24 bg-bg-tertiary animate-pulse" />
            </div>
            <div className="h-12 md:h-16 bg-bg-tertiary rounded animate-pulse mb-4 max-w-md" />
            <div className="space-y-3 max-w-2xl">
              <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 bg-bg-tertiary rounded animate-pulse w-3/4" />
            </div>
          </header>

          {/* System specs grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-custom mb-16 md:mb-24">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
                  <div className="h-6 w-32 bg-bg-tertiary animate-pulse" />
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex justify-between items-center">
                      <div className="h-3 w-24 bg-bg-tertiary animate-pulse" />
                      <div className="h-3 w-40 bg-bg-tertiary animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Colophon skeleton */}
          <div className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <div className="h-4 w-24 bg-bg-tertiary animate-pulse mb-6" />
            <div className="space-y-4 max-w-none">
              <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 bg-bg-tertiary rounded animate-pulse w-5/6" />
            </div>
          </div>

          {/* Changelog skeleton */}
          <div className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <div className="h-4 w-28 bg-bg-tertiary animate-pulse mb-6" />
            <div className="space-y-px bg-border-custom">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-bg-primary p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-4 w-16 bg-bg-tertiary animate-pulse" />
                    <div className="h-4 w-24 bg-bg-tertiary animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-3 bg-bg-tertiary rounded animate-pulse" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
