/**
 * Page Router
 * 
 * Wraps pages with microfiche transition effect.
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store';
import { MicroficheTransition } from './MicroficheTransition';
import HomePage from '@/app/home-page';
import WorkPage from '@/app/work-page';

export function PageRouter() {
  const { currentPage, isTransitioning } = useAppStore();
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset content transform when not transitioning
  useEffect(() => {
    if (!isTransitioning && contentRef.current) {
      gsap.set(contentRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        clearProps: 'all'
      });
    }
  }, [currentPage, isTransitioning]);

  return (
    <div className="relative min-h-screen">
      {/* Transition effects layer */}
      <MicroficheTransition />
      
      {/* Page content - wrapped for transition targeting */}
      <div 
        ref={contentRef}
        id="page-content"
        className="relative z-10"
      >
        {getPageComponent(currentPage)}
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
