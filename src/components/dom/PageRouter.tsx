/**
 * Page Router
 * 
 * Manages page rendering with microfiche transition.
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
  const isRunningRef = useRef(false);

  // Handle transition
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

    // Stage 1: Fade content to blank
    setStage('fadeout');
    gsap.to(contentEl, {
      opacity: 0,
      scale: goingForward ? 1.1 : 0.9,
      filter: 'blur(10px)',
      duration: 0.4,
      ease: 'power2.in'
    });

    // Stage 2: Show blank and zoom
    setTimeout(() => {
      setStage('blank');
      gsap.set(blankEl, { opacity: 1, scale: 1 });
      gsap.to(blankEl, {
        scale: goingForward ? 2.5 : 0.4,
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }, 400);

    // Stage 3: Text display
    setTimeout(() => {
      setStage('text');
    }, 800);

    // Stage 4: Deep zoom
    setTimeout(() => {
      gsap.to(blankEl, {
        scale: goingForward ? 5 : 0.1,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in'
      });
    }, 1400);

    // Stage 5: Switch page
    setTimeout(() => {
      setStage('switch');
      setDisplayedPage(transitionTarget);
      setCurrentPage(transitionTarget);
    }, 1800);

    // Stage 6: Reveal
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
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => {
            endTransition();
            isRunningRef.current = false;
          }
        }
      );
    }, 2000);

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Transition effects */}
      <MicroficheTransition 
        stage={stage === 'fadeout' || stage === 'blank' || stage === 'text' ? 'text' : stage === 'switch' ? 'zoom2' : 'idle'} 
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
