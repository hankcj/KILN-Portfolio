/**
 * Page Router
 * 
 * Handles page transitions with microfiche effect.
 */

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store';
import HomePage from '@/app/home-page';
import WorkPage from '@/app/work-page';

export function PageRouter() {
  const { currentPage, isTransitioning, transitionTarget, endTransition } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const [displayedPage, setDisplayedPage] = useState(currentPage);

  // Sync displayed page with store when not transitioning
  useEffect(() => {
    if (!isTransitioning) {
      setDisplayedPage(currentPage);
    }
  }, [currentPage, isTransitioning]);

  // Handle transition animation
  const runTransition = useCallback(() => {
    if (!transitionTarget || isAnimatingRef.current || !contentRef.current) return;
    
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        // Update displayed page
        setDisplayedPage(transitionTarget);
        // Reset animation state
        isAnimatingRef.current = false;
        // Tell store transition is done
        endTransition();
      }
    });

    // PHASE 1: ZOOM IN (0-600ms)
    tl.to(contentRef.current, {
      scale: 2.5,
      opacity: 0.3,
      filter: 'blur(12px)',
      duration: 0.6,
      ease: 'power2.in'
    });

    // PHASE 2: NOISE APPEARS (400-700ms)
    tl.to(overlayRef.current, {
      opacity: 0.7,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.3');

    // PHASE 3: FLASH (600-750ms)
    tl.to(overlayRef.current, {
      backgroundColor: 'rgba(0, 54, 216, 0.15)',
      duration: 0.05,
      yoyo: true,
      repeat: 3
    });

    // PHASE 4: SWITCH PAGE (hidden)
    tl.call(() => {
      setDisplayedPage(transitionTarget);
    });

    // PHASE 5: PULL BACK (750-1300ms)
    // Set initial state for new page
    tl.set(contentRef.current, {
      scale: 0.7,
      opacity: 0,
      filter: 'blur(15px)'
    });

    // Animate to normal
    tl.to(contentRef.current, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power3.out'
    });

    // Clear noise
    tl.to(overlayRef.current, {
      opacity: 0,
      backgroundColor: 'transparent',
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.3');

  }, [transitionTarget, endTransition]);

  // Trigger transition when isTransitioning becomes true
  useEffect(() => {
    if (isTransitioning && transitionTarget && !isAnimatingRef.current) {
      // Small delay to ensure React has rendered
      const timer = setTimeout(() => {
        runTransition();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, transitionTarget, runTransition]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Page content */}
      <div 
        ref={contentRef}
        className="relative z-10 will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        {getPageComponent(displayedPage)}
      </div>

      {/* Noise overlay - only during transition */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          backgroundColor: 'rgba(19, 22, 31, 0.85)',
        }}
      />
    </div>
  );
}

function getPageComponent(page: string) {
  switch (page) {
    case 'home':
      return <HomePage />;
    case 'work':
      return <WorkPage />;
    case 'signal':
      return (
        <div className="min-h-screen bg-bg-primary pt-32 px-8">
          <h1 className="font-heading text-display text-on-bg-primary">SIGNAL</h1>
        </div>
      );
    case 'system':
      return (
        <div className="min-h-screen bg-bg-primary pt-32 px-8">
          <h1 className="font-heading text-display text-on-bg-primary">SYSTEM</h1>
        </div>
      );
    default:
      return <HomePage />;
  }
}
