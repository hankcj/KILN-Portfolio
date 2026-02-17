/**
 * Page Router
 * 
 * Manages page rendering and coordinates with transition effects.
 */

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store';
import { MicroficheTransition } from './MicroficheTransition';
import HomePage from '@/app/home-page';
import WorkPage from '@/app/work-page';

export function PageRouter() {
  const { currentPage, setCurrentPage, isTransitioning, transitionTarget, endTransition } = useAppStore();
  const [displayedPage, setDisplayedPage] = useState(currentPage);
  const [stage, setStage] = useState<'idle' | 'zoom1' | 'text' | 'zoom2' | 'switch' | 'reveal'>('idle');
  const contentRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // Handle transition
  useEffect(() => {
    if (!isTransitioning || !transitionTarget) {
      setStage('idle');
      return;
    }

    const contentEl = contentRef.current;
    if (!contentEl) return;

    // Clear any existing timers
    clearAllTimers();

    const goingForward = transitionTarget !== 'home';

    // Stage 1: First zoom (800ms)
    setStage('zoom1');
    gsap.to(contentEl, {
      scale: goingForward ? 2.2 : 0.7,
      opacity: goingForward ? 0.5 : 0.6,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power2.inOut'
    });

    // Stage 2: Text display (800ms hold)
    const textTimer = setTimeout(() => {
      setStage('text');
    }, 800);
    timersRef.current.push(textTimer);

    // Stage 3: Deep zoom (600ms)
    const zoom2Timer = setTimeout(() => {
      setStage('zoom2');
      gsap.to(contentEl, {
        scale: goingForward ? 4 : 0.2,
        opacity: 0,
        filter: 'blur(30px)',
        duration: 0.6,
        ease: 'power3.in'
      });
    }, 1600);
    timersRef.current.push(zoom2Timer);

    // Stage 4: Switch page (when fully obscured)
    const switchTimer = setTimeout(() => {
      setStage('switch');
      setDisplayedPage(transitionTarget);
      setCurrentPage(transitionTarget);
    }, 2200);
    timersRef.current.push(switchTimer);

    // Stage 5: Reveal (800ms)
    const revealTimer = setTimeout(() => {
      setStage('reveal');
      gsap.fromTo(contentEl, 
        {
          scale: goingForward ? 0.4 : 1.6,
          opacity: 0,
          filter: 'blur(20px)'
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            endTransition();
          }
        }
      );
    }, 2400);
    timersRef.current.push(revealTimer);

    return () => {
      clearAllTimers();
    };
  }, [isTransitioning, transitionTarget, setCurrentPage, endTransition, clearAllTimers]);

  // Reset when transition ends
  useEffect(() => {
    if (!isTransitioning && contentRef.current) {
      gsap.set(contentRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        clearProps: 'all'
      });
    }
  }, [isTransitioning]);

  return (
    <div className="relative min-h-screen">
      {/* Transition effects */}
      <MicroficheTransition stage={stage} />
      
      {/* Page content */}
      <div 
        ref={contentRef}
        id="page-content"
        className="relative z-10"
        style={{ transformOrigin: 'center center' }}
      >
        {getPageComponent(displayedPage)}
      </div>

      {/* Noise overlay */}
      <div 
        id="transition-overlay"
        className="fixed inset-0 z-50 pointer-events-none opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          backgroundColor: 'rgba(19, 22, 31, 0.9)',
          transition: 'opacity 0.3s ease, background-color 0.1s ease'
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
