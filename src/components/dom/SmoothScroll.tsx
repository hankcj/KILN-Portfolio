/**
 * Smooth Scroll Provider
 * 
 * Uses Lenis for smooth scrolling with GSAP ScrollTrigger integration.
 */

'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/motion';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    lenis.on('scroll', (e: { scroll: number; limit: number; velocity: number; direction: number; progress: number }) => {
      // Update ScrollTrigger on Lenis scroll
      ScrollTrigger.update();
    });

    // Connect Lenis to GSAP ScrollTrigger
    const rafCallback = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(rafCallback);
    };
    requestAnimationFrame(rafCallback);

    // Expose lenis for ScrollTrigger integration
    (window as Window & { lenis?: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as Window & { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
