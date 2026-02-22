/**
 * Page Router
 * 
 * Manages page rendering with slow, cinematic microfiche transition.
 * Now with Signal page integration for Ghost CMS content.
 */

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store';
import { MicroficheTransition } from './MicroficheTransition';
import { PageShell } from './PageShell';
import HomePage from '@/app/home-page';
import SignalPage from '@/app/signal-page';

export function PageRouter() {
  const { currentPage, setCurrentPage, isTransitioning, transitionTarget, endTransition } = useAppStore();
  const [displayedPage, setDisplayedPage] = useState(currentPage);
  const [stage, setStage] = useState<'idle' | 'fadeout' | 'blank' | 'text' | 'switch' | 'reveal'>('idle');
  const contentRef = useRef<HTMLDivElement>(null);
  const blankRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);

  // Handle transition - slow and cinematic (4000ms total)
  useEffect(() => {
    if (!isTransitioning || !transitionTarget || isRunningRef.current) {
      return;
    }

    isRunningRef.current = true;
    const contentEl = contentRef.current;
    const blankEl = blankRef.current;
    if (!contentEl || !blankEl) {
      isRunningRef.current = false;
      return;
    }

    const goingForward = transitionTarget !== 'home';

    // Stage 1: Fade content to blank (800ms)
    setStage('fadeout');
    gsap.to(contentEl, {
      opacity: 0,
      scale: goingForward ? 1.1 : 0.9,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power2.in'
    });

    // Stage 2: Show blank and zoom (1000ms)
    setTimeout(() => {
      setStage('blank');
      gsap.set(blankEl, { opacity: 1, scale: 1 });
      gsap.to(blankEl, {
        scale: goingForward ? 2.5 : 0.4,
        duration: 1.0,
        ease: 'power2.inOut'
      });
    }, 800);

    // Stage 3: Text display (1200ms hold)
    setTimeout(() => {
      setStage('text');
    }, 1200);

    // Stage 4: Deep zoom (800ms) - keep opacity at 1 to cover content
    setTimeout(() => {
      gsap.to(blankEl, {
        scale: goingForward ? 5 : 0.1,
        duration: 0.8,
        ease: 'power3.in'
      });
    }, 2000);

    // Stage 5: Switch page
    setTimeout(() => {
      setStage('switch');
      setDisplayedPage(transitionTarget);
      setCurrentPage(transitionTarget);
    }, 2800);

    // Stage 6: Reveal (1200ms)
    setTimeout(() => {
      setStage('reveal');
      gsap.set(blankEl, { opacity: 0, scale: 1 });
      gsap.fromTo(contentEl, 
        {
          opacity: 0,
          scale: goingForward ? 0.6 : 1.4,
          filter: 'blur(15px)'
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          onComplete: () => {
            endTransition();
            isRunningRef.current = false;
          }
        }
      );
    }, 3200);

  }, [isTransitioning, transitionTarget, setCurrentPage, endTransition]);

  // Reset when not transitioning
  useEffect(() => {
    if (!isTransitioning) {
      if (contentRef.current) {
        gsap.set(contentRef.current, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          clearProps: 'all'
        });
      }
      if (blankRef.current) {
        gsap.set(blankRef.current, { opacity: 0, scale: 1 });
      }
      isRunningRef.current = false;
    }
  }, [isTransitioning]);

  // Determine which transition text to show based on destination
  const transitionStage = stage === 'fadeout' || stage === 'blank' || stage === 'text' 
    ? 'text' 
    : stage === 'switch' 
      ? 'zoom2' 
      : 'idle';

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Transition effects with destination-aware microcopy */}
      <MicroficheTransition 
        stage={transitionStage}
        destination={transitionTarget || 'default'}
      />
      
      {/* Blank state - behind content */}
      <div 
        ref={blankRef}
        className="fixed inset-0 bg-bg-primary pointer-events-none"
        style={{ 
          opacity: 0,
          zIndex: 20,
          transformOrigin: 'center center'
        }}
      />

      {/* Page content - always interactive when not transitioning */}
      <div 
        ref={contentRef}
        id="page-content"
        className="relative"
        style={{ 
          transformOrigin: 'center center',
          zIndex: 30
        }}
      >
        {getPageComponent(displayedPage)}
      </div>
    </div>
  );
}

// Placeholder for Signal page before posts are loaded
// Uses PageShell for consistent decorative elements
function SignalPagePlaceholder() {
  return (
    <PageShell 
      currentPage="signal"
      leftSideText="TRANSMISSION_LOG"
      rightSideText="00 ENTRIES LOGGED"
      animateEntrance={false}
    >
      <div className="min-h-screen pt-32 px-6 md:px-16 lg:px-24">
        <header className="mb-16">
          <div className="flex justify-between items-start mb-4">
            <p className="font-mono text-system text-on-surface-muted tracking-widest">
              C  TRANSMISSION LOG
            </p>
            <p className="font-mono text-system text-on-surface-muted">
              VIEW: CHRONOLOGICAL
            </p>
          </div>
          <h1 className="font-heading text-display text-on-bg-primary mb-4">
            SIGNAL
          </h1>
          <p className="text-body text-on-bg-tertiary max-w-xl">
            Loading transmissions...
          </p>
        </header>
        <div className="space-y-px bg-border-custom">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="block bg-bg-primary p-8 animate-pulse"
            >
              <div className="h-6 bg-bg-secondary w-1/4 mb-4" />
              <div className="h-8 bg-bg-secondary w-3/4 mb-3" />
              <div className="h-4 bg-bg-secondary w-full" />
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function getPageComponent(page: string) {
  switch (page) {
    case 'home':
      return <HomePage />;
    case 'signal':
      // Signal page requires server data fetching, so we show a placeholder
      // In production, the actual route at /signal handles data fetching
      return <SignalPagePlaceholder />;
    case 'system':
      return (
        <PageShell 
          currentPage="system"
          leftSideText="SYS_DOCS_V1.0"
          rightSideText="48.8566° N 2.3522° E"
          animateEntrance={false}
        >
          <div className="min-h-screen pt-32 px-6 md:px-16 lg:px-24">
            <header className="mb-16">
              <p className="font-mono text-system text-on-surface-muted mb-4 tracking-widest">
                {'// SYSTEM DIAGNOSTIC'}
              </p>
              <h1 className="font-heading text-display text-on-bg-primary">
                SYSTEM
              </h1>
            </header>
          </div>
        </PageShell>
      );
    default:
      return <HomePage />;
  }
}
