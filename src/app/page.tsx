'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '@/components/dom/LoadingScreen';
import DecorativeElements from '@/components/dom/DecorativeElements';
import Hero from '@/components/dom/Hero';
import Work from '@/components/dom/Work';
import GridSignal from '@/components/dom/ExpandingImage';
import Philosophy from '@/components/dom/Philosophy';
import Contact from '@/components/dom/Contact';
import Marquee from '@/components/dom/Marquee';
import SectionHeader from '@/components/dom/SectionHeader';
import HeroClone from '@/components/dom/HeroClone';
import { useLenis } from '@/components/dom/LenisProvider';

gsap.registerPlugin(ScrollTrigger);

const HOME_HERO_IMAGE_SRC = '/assets/Saturn.png';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const getLenis = useLenis();

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    if (isLoading) {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
      return;
    }

    lenis.start();
    lenis.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();

    const fadeTimer = requestAnimationFrame(() => {
      setIsContentVisible(true);
    });
    return () => cancelAnimationFrame(fadeTimer);
  }, [isLoading, getLenis]);

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    const lenis = getLenis();
    if (!isReady || !lenis) return;

    // Background color transitions
    const colorStops = [
      { trigger: '#hero', color: '#161a26' },
      { trigger: '#work', color: '#13161F' },
      { trigger: '#process', color: '#171c24' },
      { trigger: '#philosophy', color: '#111420' },
      { trigger: '#contact', color: '#0f1219' },
    ];

    const colorTriggers: ScrollTrigger[] = [];
    if (mainRef.current) {
      colorStops.forEach(({ trigger, color }) => {
        const el = document.querySelector(trigger);
        if (!el) return;
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () =>
            gsap.to(mainRef.current, {
              backgroundColor: color,
              duration: 0.8,
              ease: 'power2.out',
            }),
          onEnterBack: () =>
            gsap.to(mainRef.current, {
              backgroundColor: color,
              duration: 0.8,
              ease: 'power2.out',
            }),
        });
        colorTriggers.push(st);
      });
    }

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      colorTriggers.forEach((t) => t.kill());
    };
  }, [isReady, getLenis]);

  useEffect(() => {
    const lenis = getLenis();
    if (!isReady || !lenis) return;

    let isLoopJumping = false;
    let unlockTimer: number | undefined;
    const edgeBufferPx = 4;

    const jumpTo = (target: string | number) => {
      if (isLoopJumping) return;
      isLoopJumping = true;
      lenis.scrollTo(target, { immediate: true });
      ScrollTrigger.update();

      unlockTimer = window.setTimeout(() => {
        isLoopJumping = false;
      }, 160);
    };

    const handleLoop = (event: { scroll: number; limit: number; velocity: number }) => {
      if (isLoopJumping) return;

      const { scroll, limit, velocity } = event;

      if (velocity > 0 && scroll >= limit - edgeBufferPx) {
        jumpTo('#hero');
        return;
      }

      if (velocity < 0 && scroll <= edgeBufferPx) {
        jumpTo(Math.max(0, limit - edgeBufferPx));
      }
    };

    lenis.on('scroll', handleLoop);

    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer);
      lenis.off?.('scroll', handleLoop);
      isLoopJumping = false;
    };
  }, [isReady, getLenis]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={handleLoadingComplete}
        heroImageSrc={HOME_HERO_IMAGE_SRC}
      />
    );
  }

  return (
    <div
      className="transition-opacity duration-1000 ease-out"
      style={{ opacity: isContentVisible ? 1 : 0 }}
    >
      <DecorativeElements />
      <SectionHeader />

      <main ref={mainRef} className="relative bg-[#13161F] overflow-x-hidden">
        <Hero />

        <Marquee text="Objects, systems, and frameworks from the studio archive" speed={35} />

        <Work />

        <GridSignal />

        <Philosophy />

        <Contact />

        <HeroClone />
      </main>
    </div>
  );
}
