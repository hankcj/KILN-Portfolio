'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DecorativeElements() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    // Scroll progress indicator
    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <>
      {/* Top Ruler / Tick Marks - SOM style */}
      <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
        {/* Progress bar line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20">
          <div 
            ref={progressRef}
            className="h-full bg-[#0036D8] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        
        {/* Tick marks */}
        <div className="flex justify-between px-4 sm:px-8 py-1">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="w-[1px] bg-white/30"
              style={{ 
                height: i % 5 === 0 ? '8px' : '4px',
                opacity: i % 5 === 0 ? 0.55 : 0.35 
              }}
            />
          ))}
        </div>
      </div>

      {/* Side Social Links - SOM style */}
      <div className="fixed left-6 sm:left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <a 
          href="https://github.com/hankcj"
          className="text-[11px] tracking-[0.3em] text-white/60 uppercase hover:text-white/90 transition-colors duration-300 pointer-events-auto"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          GitHub
        </a>
      </div>

      <div className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <a 
          href="https://instagram.com/hankcj"
          className="text-[11px] tracking-[0.3em] text-white/60 uppercase hover:text-white/90 transition-colors duration-300 pointer-events-auto"
          style={{ writingMode: 'vertical-rl' }}
        >
          Instagram
        </a>
      </div>

      {/* Corner logo - subtle like SOM */}
      <div className="fixed top-6 left-6 sm:top-8 sm:left-12 z-40 pointer-events-none">
        <span 
          className="text-sm tracking-[0.2em] text-white/80 font-light"
          style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
        >
          KILN
        </span>
      </div>
    </>
  );
}
