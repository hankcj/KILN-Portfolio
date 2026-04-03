'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Marquee from '@/components/dom/Marquee';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  const headingWords = ['How', 'this', 'studio', 'works'];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(image, { yPercent: -8 }, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      wordsRef.current.forEach((word, i) => {
        if (!word) return;
        gsap.fromTo(word,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });

      if (bodyRef.current) {
        gsap.fromTo(bodyRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.5,
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative min-h-screen bg-[#0d0f17]"
    >
      <Marquee
        text="Signal archive // Surface 02 // Fixed position"
        speed={30}
        className="relative z-20 bg-[#0f1219]"
      />

      <div className="absolute inset-0 overflow-hidden">
        <div ref={imageRef} className="absolute inset-0 scale-110">
          <Image
            src="/assets/Underwater 2.png"
            alt="Hand reaching"
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f17]/90 via-[#0d0f17]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-[#0d0f17]/30" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-32">
        <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase mb-8">
          System
        </p>

        <h2 className="flex flex-col gap-0 mb-10">
          {headingWords.map((word, i) => (
            <span
              key={word}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="text-[8vw] sm:text-[6vw] text-white font-light leading-[0.95] tracking-tight"
              style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
            >
              {word}
            </span>
          ))}
        </h2>

        <div ref={bodyRef} className="space-y-4 text-white/60 text-sm sm:text-base leading-relaxed max-w-md opacity-0">
          <p>
            KILN develops objects, systems, and essays at a deliberate pace.
            The aim is durable work, not fast output.
          </p>
          <p>
            This studio keeps a small surface area on purpose. Every piece
            should remain useful when revisited later.
          </p>
        </div>
      </div>

      <Marquee text="KILN // Studio, archive, and tools // 2026" speed={25} className="relative z-10" />
    </section>
  );
}
