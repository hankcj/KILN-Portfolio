/**
 * Animation Tokens & Utilities
 * 
 * Standardized animation values for consistency across the site.
 * Based on the motion philosophy: "heavy, damped, and deliberate"
 */

import { gsap } from 'gsap';

// ============================================
// DURATION TOKENS
// ============================================
export const DURATION = {
  /** Micro-interactions: button states, icon changes */
  fast: 0.15,
  /** Standard transitions: hover states, color changes */
  normal: 0.3,
  /** Entrance animations: content reveals */
  slow: 0.6,
  /** Page transitions: major state changes */
  cinematic: 0.8,
} as const;

// ============================================
// EASING TOKENS
// ============================================
export const EASE = {
  /** Standard entrance: smooth deceleration */
  enter: 'power3.out',
  /** Standard exit: smooth acceleration */
  exit: 'power2.in',
  /** Heavy/damped: for "massive" feel */
  heavy: 'power4.out',
  /** Bouncy but restrained: for playful elements */
  soft: 'back.out(1.2)',
  /** Linear: for continuous animations */
  linear: 'none',
  /** Step: for terminal/cursor effects */
  step: 'steps(1)',
} as const;

// ============================================
// STAGGER TOKENS
// ============================================
export const STAGGER = {
  /** Tight: for related items like nav links */
  tight: 0.05,
  /** Normal: for content lists, cards */
  normal: 0.08,
  /** Loose: for dramatic reveals */
  loose: 0.12,
} as const;

// ============================================
// DISTANCE TOKENS
// ============================================
export const DISTANCE = {
  /** Subtle: for hover lift effects */
  subtle: 2,
  /** Small: for entrance slides */
  small: 20,
  /** Medium: for page transitions */
  medium: 30,
  /** Large: for dramatic entrances */
  large: 50,
} as const;

// ============================================
// SCALE TOKENS
// ============================================
export const SCALE = {
  /** Pressed state: tactile feedback */
  pressed: 0.98,
  /** Subtle hover: gentle lift */
  subtle: 1.02,
  /** Normal hover: clear interaction */
  normal: 1.05,
} as const;

// ============================================
// PRESET ANIMATIONS (for GSAP)
// ============================================
export const PRESETS = {
  /** Fade in from below */
  fadeUp: {
    from: { opacity: 0, y: DISTANCE.small },
    to: { opacity: 1, y: 0, duration: DURATION.slow, ease: EASE.enter },
  },
  /** Fade in from above */
  fadeDown: {
    from: { opacity: 0, y: -DISTANCE.small },
    to: { opacity: 1, y: 0, duration: DURATION.slow, ease: EASE.enter },
  },
  /** Scale up with fade */
  scaleIn: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1, duration: DURATION.normal, ease: EASE.enter },
  },
  /** Scale down with fade */
  scaleOut: {
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0.95, duration: DURATION.fast, ease: EASE.exit },
  },
  /** Card hover: lift with shadow */
  cardHover: {
    y: -DISTANCE.subtle,
    scale: SCALE.subtle,
    duration: DURATION.normal,
    ease: EASE.enter,
  },
  /** Button press: scale down */
  buttonPress: {
    scale: SCALE.pressed,
    duration: DURATION.fast,
    ease: EASE.exit,
  },
  /** Stagger reveal for lists */
  staggerReveal: {
    from: { opacity: 0, y: DISTANCE.small },
    to: { 
      opacity: 1, 
      y: 0, 
      duration: DURATION.slow, 
      ease: EASE.enter,
      stagger: STAGGER.normal,
    },
  },
} as const;

// ============================================
// CSS CUSTOM PROPERTIES (for Tailwind)
// ============================================
export const CSS_VARS = `
  --duration-fast: ${DURATION.fast}s;
  --duration-normal: ${DURATION.normal}s;
  --duration-slow: ${DURATION.slow}s;
  --duration-cinematic: ${DURATION.cinematic}s;
  
  --ease-enter: ${EASE.enter};
  --ease-exit: ${EASE.exit};
  --ease-heavy: ${EASE.heavy};
`;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Apply entrance animation to elements
 */
export function animateEntrance(
  elements: string | Element | Element[],
  options: {
    y?: number;
    stagger?: number;
    delay?: number;
    duration?: number;
  } = {}
) {
  const { y = DISTANCE.small, stagger = STAGGER.normal, delay = 0.2, duration = DURATION.slow } = options;
  
  return gsap.from(elements, {
    opacity: 0,
    y,
    duration,
    stagger,
    delay,
    ease: EASE.enter,
  });
}

/**
 * Apply hover animation to card elements
 */
export function applyCardHover(element: HTMLElement) {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      y: -DISTANCE.subtle,
      duration: DURATION.normal,
      ease: EASE.enter,
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      y: 0,
      duration: DURATION.normal,
      ease: EASE.exit,
    });
  });
}

/**
 * Apply press animation to button elements
 */
export function applyButtonPress(element: HTMLElement) {
  element.addEventListener('mousedown', () => {
    gsap.to(element, {
      scale: SCALE.pressed,
      duration: DURATION.fast,
      ease: EASE.exit,
    });
  });
  
  element.addEventListener('mouseup', () => {
    gsap.to(element, {
      scale: 1,
      duration: DURATION.fast,
      ease: EASE.enter,
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: DURATION.fast,
      ease: EASE.enter,
    });
  });
}
