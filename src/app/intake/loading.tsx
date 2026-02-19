/**
 * Intake Loading State
 * 
 * Skeleton loader for project intake form.
 */

import { SimplePageShell } from '@/components/dom/PageShell';

export default function IntakeLoading() {
  return (
    <SimplePageShell
      currentPage="services"
      leftSideText="LOADING..."
      rightSideText="FORM_INIT"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          {/* Header skeleton */}
          <header className="mb-12">
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 w-32 bg-bg-tertiary animate-pulse" />
              <div className="h-4 w-32 bg-accent/30 animate-pulse" />
            </div>
            <div className="h-10 md:h-12 bg-bg-tertiary rounded animate-pulse mb-4 max-w-md" />
            <div className="space-y-3 max-w-xl">
              <div className="h-4 bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 bg-bg-tertiary rounded animate-pulse w-3/4" />
            </div>
          </header>

          {/* Progress bar skeleton */}
          <div className="mb-8 flex items-center gap-2">
            <div className="h-4 w-20 bg-bg-tertiary animate-pulse" />
            <div className="flex-1 h-px bg-bg-tertiary animate-pulse" />
            <div className="h-4 w-12 bg-bg-tertiary animate-pulse" />
          </div>

          {/* Form sections skeleton */}
          <div className="space-y-6">
            {/* Section 1 */}
            <div className="animate-pulse">
              <div className="h-4 w-48 bg-accent/30 mb-4 pb-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-12 bg-bg-tertiary" />
                <div className="h-12 bg-bg-tertiary" />
              </div>
            </div>

            {/* Section 2 */}
            <div className="animate-pulse">
              <div className="h-4 w-56 bg-accent/30 mb-4 pb-2" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-12 bg-bg-tertiary" />
                <div className="h-12 bg-bg-tertiary" />
                <div className="h-12 bg-bg-tertiary" />
              </div>
            </div>

            {/* Section 3 */}
            <div className="animate-pulse">
              <div className="h-4 w-48 bg-accent/30 mb-4 pb-2" />
              <div className="h-32 bg-bg-tertiary" />
            </div>

            {/* Submit button */}
            <div className="pt-6 border-t border-border-muted">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="space-y-2">
                  <div className="h-3 bg-bg-tertiary rounded w-64 animate-pulse" />
                  <div className="h-3 bg-bg-tertiary rounded w-48 animate-pulse" />
                </div>
                <div className="h-12 w-48 bg-accent/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
