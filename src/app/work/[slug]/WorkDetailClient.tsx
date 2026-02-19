/**
 * Work Detail Client Component
 * 
 * Client wrapper for work detail pages with transition links.
 */

'use client';

import { BackLink, TransitionLink } from '@/components/dom/TransitionLink';

interface WorkDetailClientProps {
  slug: string;
  children: React.ReactNode;
}

export function WorkDetailClient({ slug, children }: WorkDetailClientProps) {
  return (
    <>
      {children}
    </>
  );
}

/**
 * Work Detail Back Link
 */
export function WorkBackLink() {
  return (
    <BackLink
      href="/work"
      className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted hover:text-accent transition-colors mb-12"
    >
      <span>←</span>
      <span>RETURN_TO_ARCHIVE</span>
    </BackLink>
  );
}

/**
 * Work Detail Navigation
 */
interface WorkDetailNavProps {
  prevSlug?: string;
  nextSlug?: string;
}

export function WorkDetailNav({ prevSlug, nextSlug }: WorkDetailNavProps) {
  return (
    <nav className="flex items-center justify-between pt-8 border-t border-border-muted">
      <div className="flex items-center gap-4">
        {prevSlug ? (
          <TransitionLink
            href={`/work/${prevSlug}`}
            destination="project"
            className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted hover:text-accent transition-colors px-4 py-2 border border-border-muted hover:border-accent"
          >
            <span>←</span>
            <span>PREV_OUTPUT</span>
          </TransitionLink>
        ) : (
          <span className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted/30 px-4 py-2 border border-border-muted/30 cursor-not-allowed">
            <span>←</span>
            <span>PREV_OUTPUT</span>
          </span>
        )}
      </div>

      <TransitionLink
        href="/work"
        destination="work"
        className="font-mono text-system text-on-surface-muted hover:text-accent transition-colors"
      >
        ← BACK_TO_ARCHIVE
      </TransitionLink>

      <div className="flex items-center gap-4">
        {nextSlug ? (
          <TransitionLink
            href={`/work/${nextSlug}`}
            destination="project"
            className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted hover:text-accent transition-colors px-4 py-2 border border-border-muted hover:border-accent"
          >
            <span>NEXT_OUTPUT</span>
            <span>→</span>
          </TransitionLink>
        ) : (
          <span className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted/30 px-4 py-2 border border-border-muted/30 cursor-not-allowed">
            <span>NEXT_OUTPUT</span>
            <span>→</span>
          </span>
        )}
      </div>
    </nav>
  );
}
