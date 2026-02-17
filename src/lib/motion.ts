/**
 * GSAP Motion System
 * 
 * Shared easings, timelines, and motion presets.
 * Motion philosophy: cinematic, viscous, heavy damping.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Shared easings — "motion as mass"
export const easings = {
  // Heavy, damped, continuous
  cinematic: 'power3.out',
  viscous: 'power2.inOut',
  
  // Short, decisive
  snap: 'power1.out',
  
  // Default for UI interactions
  default: 'power2.out',
} as const;

// Duration presets
export const durations = {
  micro: 0.15,      // 150ms — hover states
  short: 0.2,       // 200ms — UI transitions
  medium: 0.4,      // 400ms — element transitions
  long: 0.8,        // 800ms — page/section transitions
  cinematic: 1.2,   // 1200ms — dramatic reveals
} as const;

// Stagger presets
export const staggers = {
  tight: 0.05,
  default: 0.1,
  loose: 0.2,
} as const;

// Page transition helper
export function createPageTransition(
  element: gsap.TweenTarget,
  direction: 'in' | 'out' = 'in'
): gsap.core.Timeline {
  const tl = gsap.timeline();
  
  if (direction === 'in') {
    tl.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: durations.medium, ease: easings.cinematic }
    );
  } else {
    tl.to(element, {
      opacity: 0,
      y: -20,
      duration: durations.short,
      ease: easings.default,
    });
  }
  
  return tl;
}

// Scroll-triggered reveal
export function createScrollReveal(
  element: gsap.TweenTarget,
  options?: {
    y?: number;
    start?: string;
    end?: string;
  }
): ScrollTrigger {
  const { y = 30, start = 'top 80%', end = 'bottom 20%' } = options || {};
  
  gsap.set(element, { opacity: 0, y });
  
  return ScrollTrigger.create({
    trigger: element as gsap.DOMTarget,
    start,
    end,
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: durations.medium,
        ease: easings.cinematic,
      });
    },
    onLeaveBack: () => {
      gsap.to(element, {
        opacity: 0,
        y,
        duration: durations.short,
        ease: easings.default,
      });
    },
  });
}

// Reduced motion check
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger };
