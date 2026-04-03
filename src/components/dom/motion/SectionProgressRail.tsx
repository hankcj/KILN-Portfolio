'use client';

import { useEffect, useState } from 'react';

interface SectionProgressRailProps {
  sections: Array<{ id: string; label: string }>;
}

export default function SectionProgressRail({ sections }: SectionProgressRailProps) {
  const [resolvedSections, setResolvedSections] = useState<Array<{ id: string; label: string }>>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = sections
      .map((section) => {
        const el = document.getElementById(section.id);
        return el ? { ...section, el } : null;
      })
      .filter((section): section is { id: string; label: string; el: HTMLElement } => Boolean(section));

    const nextResolved = elements.map(({ id, label }) => ({ id, label }));
    setResolvedSections(nextResolved);

    if (nextResolved.length === 0) {
      setActiveId('');
      return;
    }

    const pickActiveId = () => {
      const viewportAnchorY = window.innerHeight * 0.42;
      let lastPassedId = '';
      let nearestId = nextResolved[0].id;
      let nearestDistance = Number.POSITIVE_INFINITY;

      elements.forEach((section) => {
        const top = section.el.getBoundingClientRect().top;
        const distance = Math.abs(top - viewportAnchorY);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestId = section.id;
        }

        if (top <= viewportAnchorY) {
          lastPassedId = section.id;
        }
      });

      const nextActiveId = lastPassedId || nearestId;
      setActiveId((prev) => (prev === nextActiveId ? prev : nextActiveId));
    };

    let rafId = 0;
    const queueMeasure = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        pickActiveId();
      });
    };

    pickActiveId();
    window.addEventListener('scroll', queueMeasure, { passive: true });
    window.addEventListener('resize', queueMeasure);

    return () => {
      window.removeEventListener('scroll', queueMeasure);
      window.removeEventListener('resize', queueMeasure);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [sections]);

  if (resolvedSections.length < 2) {
    return null;
  }

  return (
    <aside className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {resolvedSections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <div key={section.id} className="flex items-center gap-3">
            <span className={`h-[1px] transition-all duration-300 ${isActive ? 'w-8 bg-white/80' : 'w-4 bg-white/20'}`} />
            <span
              className={`text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                isActive ? 'text-white/70' : 'text-white/30'
              }`}
            >
              {section.label}
            </span>
          </div>
        );
      })}
    </aside>
  );
}
