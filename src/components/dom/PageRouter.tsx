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
  const [nextPage, setNextPage] = useState<string | null>(null);
  const currentContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Handle page transitions
  useEffect(() => {
    if (!isTransitioning || !transitionTarget) return;

    // Store the page we're going to
    setNextPage(transitionTarget);

    const ctx = gsap.context(() => {
      // TIMELINE: Microfiche transition sequence
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayedPage(transitionTarget);
          setNextPage(null);
          // Reset current content for next time
          gsap.set(currentContentRef.current, {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          });
          endTransition();
        }
      });

      // PHASE 1: ZOOM INTO CURRENT PAGE (0-800ms)
      // The page zooms way in and blurs, as if looking too close at microfiche
      tl.to(currentContentRef.current, {
        scale: 4,
        opacity: 0.3,
        filter: 'blur(20px) brightness(0.5)',
        duration: 0.8,
        ease: 'power3.in'
      });

      // PHASE 2: NOISE TAKES OVER (600-1000ms)
      // Static/noise becomes visible as we "zoom into the grain"
      tl.to(overlayRef.current, {
        opacity: 0.9,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.4');

      // Show transition label
      tl.to(labelRef.current, {
        opacity: 1,
        duration: 0.3
      }, '-=0.3');

      // Intensify grain
      tl.to('.grain-overlay', {
        opacity: 0.2,
        duration: 0.3
      }, '-=0.3');

      // PHASE 3: FLASH/TRANSITION POINT (800-1000ms)
      // Brief flash of accent color - the "slide change" moment
      tl.to(overlayRef.current, {
        backgroundColor: 'rgba(0, 54, 216, 0.3)',
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });

      // Hide current page completely
      tl.set(currentContentRef.current, {
        opacity: 0,
        scale: 4
      });

      // PHASE 4: PULL BACK TO NEW PAGE (1000-1600ms)
      // New page emerges from the noise, pulling back into view
      tl.to(labelRef.current, {
        opacity: 0,
        duration: 0.2
      });

      tl.to(overlayRef.current, {
        opacity: 0,
        backgroundColor: 'transparent',
        duration: 0.4,
        ease: 'power2.in'
      }, '-=0.1');

      tl.to('.grain-overlay', {
        opacity: 0.04,
        duration: 0.4
      }, '-=0.3');

      // New page comes into focus from zoomed-in state
      tl.fromTo(currentContentRef.current, 
        {
          scale: 0.5,
          opacity: 0,
          filter: 'blur(30px) brightness(1.2)'
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 0.6,
          ease: 'power3.out'
        },
        '-=0.3'
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isTransitioning, transitionTarget, endTransition]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Current page content - this gets zoomed and replaced */}
      <div 
        ref={currentContentRef}
        className="relative z-10"
        style={{ transformOrigin: 'center center' }}
      >
        {getPageComponent(displayedPage)}
      </div>

      {/* Noise overlay for transition */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[9997] pointer-events-none opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
          backgroundColor: 'rgba(19, 22, 31, 0.95)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Grain overlay (extra intense during transition) */}
      <div 
        className="grain-overlay fixed inset-0 z-[9996] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
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
          <div className="mt-6 w-48 h-px bg-accent/30 mx-auto overflow-hidden relative">
            <div 
              className="h-full bg-accent absolute left-0 top-0" 
              style={{ 
                width: '30%',
                animation: 'slideLoader 1s ease-in-out infinite'
              }} 
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideLoader {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
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
