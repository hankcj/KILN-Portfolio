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

          {/* Form skeleton */}
          <div className="mb-8">
            <div className="h-96 bg-bg-tertiary rounded animate-pulse" />
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
