/**
 * Page Router
 * 
 * Handles page transitions with microfiche effect.
 * Manages which page is displayed and coordinates the transition animation.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store';
import HomePage from '@/app/home-page';
import WorkPage from '@/app/work-page';

export function PageRouter() {
  const { currentPage, isTransitioning, transitionTarget, endTransition } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedPage, setDisplayedPage] = useState(currentPage);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const currentContentRef = useRef<HTMLDivElement>(null);
  const nextContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Handle page transitions
  useEffect(() => {
    if (!isTransitioning || !transitionTarget) return;

    const ctx = gsap.context(() => {
      // Store the page we're leaving
      setPreviousPage(displayedPage);
      
      // Build timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayedPage(transitionTarget);
          setPreviousPage(null);
          endTransition();
        }
      });

      // PHASE 1: Zoom into current page (0-600ms)
      // Current page scales up and fades to blur
      tl.to(currentContentRef.current, {
        scale: 2.5,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.6,
        ease: 'power3.in'
      });

      // PHASE 2: Show noise overlay (400-800ms)
      // Intense static/noise appears
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.3');

      // Show transition label
      tl.to(labelRef.current, {
        opacity: 1,
        duration: 0.2
      }, '-=0.2');

      // Intensify grain during transition
      tl.to('.film-grain', {
        opacity: 0.15,
        duration: 0.2
      }, '-=0.3');

      // PHASE 3: Flash (600-800ms)
      // Brief accent color flash
      tl.to(overlayRef.current, {
        backgroundColor: 'rgba(0, 54, 216, 0.2)',
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });

      // PHASE 4: Reveal new page (800-1400ms)
      // Hide noise, new page scales down into view
      tl.to(labelRef.current, {
        opacity: 0,
        duration: 0.2
      });

      tl.to(overlayRef.current, {
        opacity: 0,
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.in'
      }, '-=0.1');

      tl.to('.film-grain', {
        opacity: 0.04,
        duration: 0.4
      }, '-=0.3');

      // Prepare next page
      gsap.set(nextContentRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: 'blur(10px)'
      });

      tl.to(nextContentRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.2');

    }, containerRef);

    return () => ctx.revert();
  }, [isTransitioning, transitionTarget, endTransition, displayedPage]);

  // Reset current content when not transitioning
  useEffect(() => {
    if (!isTransitioning) {
      gsap.set(currentContentRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      });
    }
  }, [isTransitioning]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Current page content */}
      <div 
        ref={currentContentRef}
        className={`${isTransitioning && previousPage ? 'pointer-events-none' : ''}`}
      >
        {!previousPage && getPageComponent(displayedPage)}
      </div>

      {/* Next page content (during transition) */}
      <div 
        ref={nextContentRef}
        className="absolute inset-0 pointer-events-none opacity-0"
      >
        {transitionTarget && getPageComponent(transitionTarget)}
      </div>

      {/* Noise overlay for transition */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[9997] pointer-events-none opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Transition label */}
      <div 
        ref={labelRef}
        className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none opacity-0"
      >
        <div className="text-center">
          <div className="font-mono text-system text-accent tracking-[0.3em] mb-4">
            // ACCESSING
          </div>
          <div className="font-heading text-h2 text-on-bg-primary">
            {transitionTarget?.toUpperCase()}_ARCHIVE
          </div>
          <div className="mt-4 w-32 h-px bg-accent mx-auto overflow-hidden">
            <div className="h-full bg-on-bg-primary animate-pulse" style={{ width: '50%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function getPageComponent(page: string): React.ReactNode {
  switch (page) {
    case 'home':
      return <HomePage />;
    case 'work':
      return <WorkPage />;
    case 'signal':
      return (
        <div className="min-h-screen bg-bg-primary pt-32 px-8">
          <h1 className="font-heading text-display text-on-bg-primary">SIGNAL</h1>
          <p className="text-body text-on-bg-tertiary mt-4">Journal entries and essays.</p>
        </div>
      );
    case 'system':
      return (
        <div className="min-h-screen bg-bg-primary pt-32 px-8">
          <h1 className="font-heading text-display text-on-bg-primary">SYSTEM</h1>
          <p className="text-body text-on-bg-tertiary mt-4">Technical documentation.</p>
        </div>
      );
    default:
      return <HomePage />;
  }
}
