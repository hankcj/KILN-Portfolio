'use client';

import { useEffect } from 'react';

export default function CardGlowEffect() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handler = (e: MouseEvent) => {
      const card = (e.target as Element).closest('.kiln-card-surface') as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--card-glow-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--card-glow-y', `${e.clientY - rect.top}px`);
    };

    document.addEventListener('mousemove', handler, { passive: true });
    return () => document.removeEventListener('mousemove', handler);
  }, []);

  return null;
}
