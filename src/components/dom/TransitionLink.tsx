/**
 * Transition Link Component
 * 
 * Wrapper for links that triggers the microfiche transition effect.
 * Works with both internal navigation (store-based) and external links.
 */

'use client';

import { useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { startPageTransition, TRANSITION_DURATION } from '@/lib/transition';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  destination?: string;
  onClick?: () => void;
}

export function TransitionLink({
  href,
  children,
  className = '',
  external = false,
  destination,
  onClick,
}: TransitionLinkProps) {
  const { startTransition } = useAppStore();

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (external) {
      // Let external links handle normally
      onClick?.();
      return;
    }

    // Don't intercept if modifier keys are pressed
    if (e.metaKey || e.ctrlKey || e.shiftKey) {
      onClick?.();
      return;
    }

    e.preventDefault();
    
    // Determine destination key for transition text
    const destKey = destination || getDestinationFromHref(href);
    
    // Start the transition
    startTransition(destKey);
    
    // Persist to sessionStorage for page load detection
    startPageTransition(destKey);
    
    // Navigate after transition starts
    // Consistent 400ms delay for fade-out animation
    setTimeout(() => {
      window.location.href = href;
    }, 400);

    onClick?.();
  }, [href, external, destination, startTransition, onClick]);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

/**
 * Get destination key from href for transition text
 */
function getDestinationFromHref(href: string): string {
  if (href === '/') return 'home';
  if (href.startsWith('/work')) {
    // Check if it's a detail page
    const parts = href.split('/');
    if (parts.length > 2 && parts[2]) {
      return 'project';
    }
    return 'work';
  }
  if (href.startsWith('/signal')) {
    const parts = href.split('/');
    if (parts.length > 2 && parts[2]) {
      return 'signal';
    }
    return 'signal';
  }
  if (href.startsWith('/system')) return 'system';
  if (href.startsWith('/services')) return 'services';
  if (href.startsWith('/intake')) return 'intake';
  return 'default';
}

/**
 * Back link with transition
 * 
 * Special component for "back to list" navigation
 */
interface BackLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function BackLink({ href, children, className = '' }: BackLinkProps) {
  const { startTransition } = useAppStore();

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    
    e.preventDefault();
    
    const destKey = getDestinationFromHref(href);
    startTransition(destKey);
    startPageTransition(destKey);
    
    // Consistent 400ms delay across all navigation
    setTimeout(() => {
      window.location.href = href;
    }, 400);
  }, [href, startTransition]);

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

/**
 * Detail Page Navigation
 * 
 * Next/Previous navigation for detail pages with transitions
 */
interface DetailNavProps {
  prevHref?: string;
  nextHref?: string;
  listHref: string;
  type: 'output' | 'transmission';
}

export function DetailNav({ prevHref, nextHref, listHref, type }: DetailNavProps) {
  return (
    <nav className="flex items-center justify-between pt-8 border-t border-border-muted">
      <div className="flex items-center gap-4">
        {prevHref ? (
          <TransitionLink
            href={prevHref}
            destination={type === 'output' ? 'project' : 'signal'}
            className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted hover:text-accent transition-colors px-4 py-2 border border-border-muted hover:border-accent"
          >
            <span>←</span>
            <span>PREV_{type === 'output' ? 'OUTPUT' : 'TRANSMISSION'}</span>
          </TransitionLink>
        ) : (
          <span className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted/30 px-4 py-2 border border-border-muted/30 cursor-not-allowed">
            <span>←</span>
            <span>PREV_{type === 'output' ? 'OUTPUT' : 'TRANSMISSION'}</span>
          </span>
        )}
      </div>

      <TransitionLink
        href={listHref}
        destination={type === 'output' ? 'work' : 'signal'}
        className="font-mono text-system text-on-surface-muted hover:text-accent transition-colors"
      >
        ← RETURN_TO_{type === 'output' ? 'ARCHIVE' : 'LOG'}
      </TransitionLink>

      <div className="flex items-center gap-4">
        {nextHref ? (
          <TransitionLink
            href={nextHref}
            destination={type === 'output' ? 'project' : 'signal'}
            className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted hover:text-accent transition-colors px-4 py-2 border border-border-muted hover:border-accent"
          >
            <span>NEXT_{type === 'output' ? 'OUTPUT' : 'TRANSMISSION'}</span>
            <span>→</span>
          </TransitionLink>
        ) : (
          <span className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted/30 px-4 py-2 border border-border-muted/30 cursor-not-allowed">
            <span>NEXT_{type === 'output' ? 'OUTPUT' : 'TRANSMISSION'}</span>
            <span>→</span>
          </span>
        )}
      </div>
    </nav>
  );
}
