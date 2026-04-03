export const motionTokens = {
  durationMs: {
    fast: 180,
    base: 320,
    slow: 520,
    chapter: 780,
    ambient: 1200,
  },
  distancePx: {
    sm: 8,
    md: 16,
    lg: 28,
    xl: 44,
  },
  easing: {
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
    enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  blur: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  scale: {
    subtle: 0.985,
    base: 0.97,
    lift: 1.02,
  },
  stagger: {
    fast: 40,
    base: 70,
    slow: 110,
  },
} as const;

export const prefersReducedMotionQuery = '(prefers-reduced-motion: reduce)';
