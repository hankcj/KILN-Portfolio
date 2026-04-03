'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const sectionLabels: Record<string, string> = {
  hero: 'Entrance',
  work: 'Object archive',
  process: 'Signal',
  philosophy: 'System',
  contact: 'Make contact',
};
const WORK_PIN_LOCK_START = 'top top';
const WORK_PIN_LOCK_END = '+=500%';

export default function SectionHeader() {
  const [subtitle, setSubtitle] = useState('Entrance');
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const prevSubtitle = useRef('Entrance');
  const pathname = usePathname();
  const isHome = pathname === '/';

  const updateSubtitle = useCallback((newLabel: string) => {
    if (prevSubtitle.current === newLabel) return;
    prevSubtitle.current = newLabel;

    const el = subtitleRef.current;
    if (!el) {
      setSubtitle(newLabel);
      return;
    }

    gsap.to(el, {
      opacity: 0,
      y: -4,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setSubtitle(newLabel);
        gsap.fromTo(
          el,
          { opacity: 0, y: 4 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        );
      },
    });
  }, []);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const sectionIds = Object.keys(sectionLabels);
    let cancelled = false;
    const triggers: ScrollTrigger[] = [];
    let workPinTrigger: ScrollTrigger | null = null;
    let observer: MutationObserver | null = null;
    const isWorkLocked = () => Boolean(workPinTrigger?.isActive);

    const updateFromViewportCenter = () => {
      if (isWorkLocked()) {
        updateSubtitle(sectionLabels.work);
        return;
      }

      const center = window.innerHeight / 2;
      let activeId = sectionIds[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (rect.top <= center && rect.bottom >= center) {
          activeId = id;
          closestDistance = 0;
          return;
        }

        const distance = Math.min(Math.abs(rect.top - center), Math.abs(rect.bottom - center));
        if (distance < closestDistance) {
          closestDistance = distance;
          activeId = id;
        }
      });

      updateSubtitle(sectionLabels[activeId]);
    };

    const attach = () => {
      if (cancelled || !document.getElementById('hero')) {
        return false;
      }

      const workEl = document.getElementById('work');
      if (workEl) {
        workPinTrigger = ScrollTrigger.create({
          trigger: workEl,
          start: WORK_PIN_LOCK_START,
          end: WORK_PIN_LOCK_END,
          onToggle: () => {
            updateFromViewportCenter();
          },
        });
        triggers.push(workPinTrigger);
      }

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
              if (isWorkLocked() && id !== 'work') return;
              updateSubtitle(sectionLabels[id]);
            },
            onEnterBack: () => {
              if (isWorkLocked() && id !== 'work') return;
              updateSubtitle(sectionLabels[id]);
            },
          }),
        );
      });

      updateFromViewportCenter();
      ScrollTrigger.addEventListener('refresh', updateFromViewportCenter);
      return true;
    };

    if (!attach()) {
      observer = new MutationObserver(() => {
        if (attach()) {
          observer?.disconnect();
          observer = null;
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      ScrollTrigger.removeEventListener('refresh', updateFromViewportCenter);
      triggers.forEach((t) => t.kill());
    };
  }, [isHome, updateSubtitle]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[45] pointer-events-none flex flex-col items-center gap-0.5">
      <span
        className="text-[11px] tracking-[0.25em] text-white/85 uppercase font-light"
        style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
      >
        KILN
      </span>
      <p
        ref={subtitleRef}
        className="text-[9px] tracking-[0.2em] text-white/55 uppercase"
      >
        {subtitle}
      </p>
    </div>
  );
}
