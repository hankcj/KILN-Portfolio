'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motionTokens, prefersReducedMotionQuery } from '@/lib/motion';
import Marquee from '@/components/dom/Marquee';

interface ChapterHeroProps {
  label: string;
  title: string;
  subtitle: string;
  marquee?: string;
  accent?: string;
  id?: string;
  children?: ReactNode;
}

export default function ChapterHero({
  label,
  title,
  subtitle,
  marquee,
  accent = 'rgba(58, 125, 140, 0.08)',
  id,
  children,
}: ChapterHeroProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (window.matchMedia(prefersReducedMotionQuery).matches) {
      setPhase(4);
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 220),
      setTimeout(() => setPhase(3), 400),
      setTimeout(() => setPhase(4), 580),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const reveal = (step: number) => ({
    opacity: phase >= step ? 1 : 0,
    transform: phase >= step
      ? 'translate3d(0, 0, 0)'
      : `translate3d(0, ${motionTokens.distancePx.lg}px, 0)`,
    filter: phase >= step ? 'blur(0px)' : `blur(${motionTokens.blur.sm}px)`,
    transition: [
      `opacity ${motionTokens.durationMs.chapter}ms ${motionTokens.easing.enter}`,
      `transform ${motionTokens.durationMs.chapter}ms ${motionTokens.easing.enter}`,
      `filter ${motionTokens.durationMs.chapter}ms ${motionTokens.easing.enter}`,
    ].join(', '),
    willChange: 'opacity, transform, filter' as const,
  });

  return (
    <div className="relative" id={id}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute inset-x-0 top-0 h-[70vh]"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${accent}, transparent)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-8">
        <p style={reveal(1)} className="text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3">
          {label}
        </p>
        <h1
          style={{ ...reveal(2), fontFamily: 'var(--font-averia), Georgia, serif' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light mb-6 leading-[0.95]"
        >
          {title}
        </h1>
        <p style={reveal(3)} className="text-white/50 text-sm sm:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
        {children && <div style={reveal(4)} className="mt-6">{children}</div>}
      </div>

      {marquee && (
        <div
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: `opacity ${motionTokens.durationMs.slow}ms ${motionTokens.easing.enter}`,
          }}
        >
          <Marquee text={marquee} speed={40} className="mt-4" />
        </div>
      )}
    </div>
  );
}
