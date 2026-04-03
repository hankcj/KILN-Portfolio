'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/assets/Horizon.png', alt: 'Mountain landscape' },
  { src: '/assets/Ocean Flow.png', alt: 'Abstract waves' },
  { src: '/assets/Horizon 2.png', alt: 'Architecture detail' },
  { src: '/assets/Underwater 2.png', alt: 'Minimal scene' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid items reveal
      const items = grid.querySelectorAll('.gallery-item');
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative bg-[#0a0c14] py-24 sm:py-32"
    >
      <div className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3">
            Process
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl text-white font-light"
            style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
          >
            Work Context
          </h2>
        </div>

        {/* Gallery Grid - Clean 2x2 layout */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item group relative aspect-[16/10] overflow-hidden bg-[#13161F]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={85}
              />
              {/* Subtle border */}
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#13161F]/0 group-hover:bg-[#13161F]/20 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* Description text */}
        <div className="mt-16 sm:mt-20 max-w-2xl">
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6">
            Each object starts with context, constraints, and patient iteration
            before any visual polish is applied.
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            The process is structured to keep decisions legible and outcomes reusable.
          </p>
        </div>
      </div>
    </section>
  );
}
