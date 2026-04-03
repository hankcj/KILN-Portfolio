'use client';

import { useEffect, useState } from 'react';
import { motionTokens, prefersReducedMotionQuery } from '@/lib/motion';

interface PageIntroProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export default function PageIntro({
  children,
  className,
  delayMs = 50,
}: PageIntroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia(prefersReducedMotionQuery).matches;

    if (prefersReduced) {
      const timer = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(timer);
    }

    let timer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      timer = window.setTimeout(() => setIsVisible(true), delayMs);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [delayMs]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0)'
          : `translate3d(0, ${motionTokens.distancePx.md}px, 0)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${motionTokens.durationMs.slow}ms`,
        transitionTimingFunction: motionTokens.easing.enter,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
