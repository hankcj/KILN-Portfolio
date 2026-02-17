/**
 * Microfiche Transition
 * 
 * Page transition effect like changing slides on a microfiche reader.
 * Current page zooms into grain/noise, then new page pulls back into view.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store';

interface MicroficheTransitionProps {
  children: React.ReactNode;
}

export function MicroficheTransition({ children }: MicroficheTransitionProps) {
  const { currentPage, isTransitioning, transitionTarget } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const outgoingRef = useRef<HTMLDivElement>(null);
  const incomingRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [displayedPage, setDisplayedPage] = useState(currentPage);
  const [incomingPage, setIncomingPage] = useState<string | null>(null);

  useEffect(() => {
    if (!isTransitioning || !transitionTarget) return;

    const ctx = gsap.context(() => {
      // Prepare incoming page
      setIncomingPage(transitionTarget);
      
      // Set initial states
      gsap.set(incomingRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: 'blur(20px)'
      });
      
      gsap.set(noiseRef.current, {
        opacity: 0,
        scale: 0.8
      });
      
      gsap.set(labelRef.current, {
        opacity: 0,
        y: 20
      });

      // Build timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayedPage(transitionTarget);
          setIncomingPage(null);
          useAppStore.getState().endTransition();
        }
      });

      // Phase 1: Zoom into current page (0-40%)
      tl.to(outgoingRef.current, {
        scale: 3,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.6,
        ease: 'power2.in'
      });

      // Phase 2: Show noise/static (30-50%)
      tl.to(noiseRef.current, {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
        ease: 'power1.inOut'
      }, '-=0.3');

      // Show transition label
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.2
      }, '-=0.2');

      // Phase 3: Flash of accent color (45-55%)
      tl.to(noiseRef.current, {
        backgroundColor: 'rgba(0, 54, 216, 0.1)',
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });

      // Phase 4: Hide noise, reveal new page (50-100%)
      tl.to(labelRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2
      });

      tl.to(noiseRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power1.in'
      }, '-=0.1');

      tl.to(incomingRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.2');

    }, containerRef);

    return () => ctx.revert();
  }, [isTransitioning, transitionTarget]);

  // Update displayed page when not transitioning
  useEffect(() => {
    if (!isTransitioning) {
      setDisplayedPage(currentPage);
    }
  }, [currentPage, isTransitioning]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* Outgoing page */}
      <div 
        ref={outgoingRef}
        className={`absolute inset-0 ${isTransitioning ? 'pointer-events-none' : ''}`}
        style={{ 
          opacity: isTransitioning && incomingPage ? 1 : (incomingPage ? 0 : 1),
          visibility: incomingPage && !isTransitioning ? 'hidden' : 'visible'
        }}
      >
        {!incomingPage && children}
      </div>

      {/* Incoming page */}
      <div 
        ref={incomingRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      >
        {incomingPage && getPageContent(incomingPage)}
      </div>

      {/* Noise/Static overlay */}
      <div 
        ref={noiseRef}
        className="fixed inset-0 z-[9998] pointer-events-none opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundColor: 'rgba(19, 22, 31, 0.9)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Transition label */}
      <div 
        ref={labelRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none opacity-0"
      >
        <div className="font-mono text-system text-accent tracking-widest">
          // LOADING {incomingPage?.toUpperCase()}_VIEW
        </div>
      </div>

      {/* Static content when not transitioning */}
      {!isTransitioning && !incomingPage && children}
    </div>
  );
}

function getPageContent(page: string): React.ReactNode {
  // This will be replaced with actual page components
  // For now, return a placeholder that matches the page structure
  switch (page) {
    case 'home':
      return null; // Home is default
    case 'work':
      return <WorkPageContent />;
    case 'signal':
      return <div className="min-h-screen bg-bg-primary" />;
    case 'system':
      return <div className="min-h-screen bg-bg-primary" />;
    default:
      return null;
  }
}

// Placeholder for Work page - will be replaced with actual component
function WorkPageContent() {
  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:mb-24">
          <p className="font-mono text-system text-on-surface-muted mb-4 tracking-widest">
            C  OUTPUT ARCHIVE
          </p>
          <h1 className="font-heading text-display text-on-bg-primary mb-4">
            WORK
          </h1>
          <p className="text-body text-on-bg-tertiary max-w-xl">
            Outputs — not projects. A continuous practice of essays, systems, tools, 
            and experiments.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-custom">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className="bg-bg-primary p-8 min-h-[300px] flex flex-col justify-between group hover:bg-bg-secondary transition-colors duration-300 border border-transparent hover:border-border-custom"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-system text-on-surface-muted">VISUAL</span>
                <span className="font-mono text-system text-on-surface-muted">PUBLISHED</span>
              </div>
              <div>
                <h3 className="font-heading text-h3 text-on-bg-primary group-hover:text-accent transition-colors">
                  Output {String(i).padStart(3, '0')}
                </h3>
                <p className="text-small text-on-bg-tertiary mt-2">
                  A description of this work output goes here.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
