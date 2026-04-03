'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const HERO_IMAGE_SRC = '/assets/Saturn.png';
gsap.registerPlugin(ScrollTrigger);

export default function HeroClone() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const ctx = gsap.context(() => {
      gsap.to(image, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '40% top',
          end: '70% top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-clone"
      className="relative h-[150vh] w-full overflow-hidden"
      aria-hidden="true"
    >
      <div ref={imageRef} className="absolute inset-0 h-[120%]">
        <Image
          src={HERO_IMAGE_SRC}
          alt=""
          fill
          sizes="100vw"
          preload
          quality={90}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13161F] via-[#13161F]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#13161F]/30 via-transparent to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 h-screen flex items-center justify-center px-6 sm:px-12 lg:px-16"
      >
        <p className="text-xs sm:text-sm text-white/50 max-w-sm text-center leading-relaxed tracking-wide">
          Objects, systems, and writing from a single studio.
        </p>
      </div>
    </section>
  );
}
