/**
 * Page Router
 * 
 * Manages page rendering with microfiche transition.
 * Zooms into blank space with clustered loading text.
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
  const [stage, setStage] = useState<'idle' | 'fadeout' | 'blank' | 'text' | 'switch' | 'reveal'>('idle');
  const contentRef = useRef<HTMLDivElement>(null);
  const blankRef = useRef<HTMLDivElement>(null);
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
    const blankEl = blankRef.current;
    if (!contentEl || !blankEl) return;

    clearAllTimers();

    const goingForward = transitionTarget !== 'home';

    // Stage 1: Fade content to blank (400ms)
    setStage('fadeout');
    gsap.to(contentEl, {
      opacity: 0,
      scale: goingForward ? 1.1 : 0.9,
      filter: 'blur(10px)',
      duration: 0.4,
      ease: 'power2.in'
    });

    // Stage 2: Show blank state with zoom (600ms)
    const blankTimer = setTimeout(() => {
      setStage('blank');
      // Show blank, zoom into it
      gsap.set(blankEl, { opacity: 1, scale: 1 });
      gsap.to(blankEl, {
        scale: goingForward ? 2.5 : 0.4,
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }, 400);
    timersRef.current.push(blankTimer);

    // Stage 3: Show loading text (800ms hold)
    const textTimer = setTimeout(() => {
      setStage('text');
    }, 800);
    timersRef.current.push(textTimer);

    // Stage 4: Deep zoom (400ms)
    const deepZoomTimer = setTimeout(() => {
      gsap.to(blankEl, {
        scale: goingForward ? 5 : 0.1,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in'
      });
    }, 1400);
    timersRef.current.push(deepZoomTimer);

    // Stage 5: Switch page
    const switchTimer = setTimeout(() => {
      setStage('switch');
      setDisplayedPage(transitionTarget);
      setCurrentPage(transitionTarget);
    }, 1800);
    timersRef.current.push(switchTimer);

    // Stage 6: Reveal (600ms)
    const revealTimer = setTimeout(() => {
      setStage('reveal');
      // Reset blank
      gsap.set(blankEl, { opacity: 0, scale: 1 });
      // Show new content
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
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => {
            endTransition();
          }
        }
      );
    }, 2000);
    timersRef.current.push(revealTimer);

    return () => {
      clearAllTimers();
    };
  }, [isTransitioning, transitionTarget, setCurrentPage, endTransition, clearAllTimers]);

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
    }
  }, [isTransitioning]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Transition effects - show blank background during fadeout, blank, and text stages */}
      <MicroficheTransition 
        stage={stage === 'fadeout' || stage === 'blank' || stage === 'text' ? 'text' : stage === 'switch' ? 'zoom2' : 'idle'} 
      />
      
      {/* Blank state (for zooming into) */}
      <div 
        ref={blankRef}
        className="fixed inset-0 z-20 bg-bg-primary opacity-0"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Page content */}
      <div 
        ref={contentRef}
        id="page-content"
        className="relative z-10"
        style={{ transformOrigin: 'center center' }}
      >
        {getPageComponent(displayedPage)}
      </div>
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
