/**
 * Services Loading State
 * 
 * Skeleton loader matching the system aesthetic.
 */

import { SimplePageShell } from '@/components/dom/PageShell';

export default function ServicesLoading() {
  return (
    <SimplePageShell
      currentPage="services"
      leftSideText="LOADING..."
      rightSideText="PLEASE_WAIT"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Header skeleton */}
          <header className="mb-16 md:mb-24">
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 w-32 bg-bg-tertiary animate-pulse" />
              <div className="h-4 w-40 bg-bg-tertiary animate-pulse" />
            </div>
            <div className="h-12 md:h-16 bg-bg-tertiary rounded animate-pulse mb-4 max-w-md" />
            <div className="space-y-3 max-w-2xl">
              <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 bg-bg-tertiary rounded animate-pulse w-3/4" />
            </div>
          </header>

          {/* Service blocks skeleton */}
          <div className="space-y-px bg-border-custom mb-16 md:mb-24">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-bg-primary p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-4 w-16 bg-bg-tertiary animate-pulse" />
                      <div className="h-px bg-bg-tertiary flex-1 max-w-[100px]" />
                    </div>
                    <div className="h-8 bg-bg-tertiary rounded animate-pulse mb-4 w-64" />
                    <div className="space-y-2 max-w-2xl">
                      <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
                      <div className="h-4 bg-bg-tertiary rounded animate-pulse w-5/6" />
                    </div>
                  </div>
                  <div className="md:w-64 shrink-0">
                    <div className="h-4 w-24 bg-bg-tertiary animate-pulse mb-3" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-4 bg-bg-tertiary rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Engagement models skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-custom mb-16 md:mb-24">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-bg-primary p-8">
                <div className="h-4 w-20 bg-bg-tertiary animate-pulse mb-4" />
                <div className="h-6 bg-bg-tertiary rounded animate-pulse mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-bg-tertiary rounded animate-pulse" />
                  <div className="h-3 bg-bg-tertiary rounded animate-pulse w-5/6" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-3 bg-bg-tertiary rounded animate-pulse w-3/4" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA skeleton */}
          <div className="p-8 bg-bg-secondary border border-border-muted">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex-1">
                <div className="h-4 w-32 bg-bg-tertiary animate-pulse mb-2" />
                <div className="h-4 bg-bg-tertiary rounded animate-pulse w-3/4" />
              </div>
              <div className="h-12 w-48 bg-accent/30 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
