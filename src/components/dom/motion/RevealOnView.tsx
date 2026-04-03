'use client';

import { useEffect, useRef, useState } from 'react';
import { motionTokens, prefersReducedMotionQuery } from '@/lib/motion';

interface RevealOnViewProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  yOffset?: number;
  blur?: boolean;
  scale?: boolean;
  id?: string;
}

export default function RevealOnView({
  children,
  className,
  delayMs = 0,
  yOffset = motionTokens.distancePx.md,
  blur = false,
  scale = false,
  id,
}: RevealOnViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia(prefersReducedMotionQuery).matches;

    if (prefersReduced) {
      const timer = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const duration = blur
    ? motionTokens.durationMs.chapter
    : motionTokens.durationMs.base;
  const easing = blur ? motionTokens.easing.enter : motionTokens.easing.standard;

  const hiddenTransform = [
    `translate3d(0, ${yOffset}px, 0)`,
    scale ? `scale(${motionTokens.scale.subtle})` : '',
  ].filter(Boolean).join(' ');

  const visibleTransform = [
    'translate3d(0, 0, 0)',
    scale ? 'scale(1)' : '',
  ].filter(Boolean).join(' ');

  const transitionProps = ['opacity', 'transform'];
  if (blur) transitionProps.push('filter');

  return (
    <div
      ref={rootRef}
      id={id}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? visibleTransform : hiddenTransform,
        filter: blur ? (isVisible ? 'blur(0px)' : `blur(${motionTokens.blur.sm}px)`) : undefined,
        transitionProperty: transitionProps.join(', '),
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
        transitionDelay: `${delayMs}ms`,
        willChange: transitionProps.join(', '),
      }}
    >
      {children}
    </div>
  );
}
