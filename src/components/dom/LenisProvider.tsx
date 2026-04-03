"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisContextValue {
  getLenis: () => Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ getLenis: () => null });
gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const instance = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchMultiplier: 1,
      lerp: prefersReducedMotion ? 1 : 0.14,
      autoRaf: false,
      overscroll: true,
      infinite: false,
    });

    lenisRef.current = instance;

    const tickerUpdate = (time: number) => {
      instance.raf(time * 1000);
    };

    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(tickerUpdate);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tickerUpdate);
      instance.off?.("scroll", ScrollTrigger.update);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(refreshId);
  }, [pathname]);

  const value = useMemo<LenisContextValue>(() => ({
    getLenis: () => lenisRef.current,
  }), []);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext).getLenis;
}
