'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { WORK_PIN_DISTANCE, WORK_PIN_SCRUB } from '@/lib/scrollChapters';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'atlas',
    title: 'Atlas',
    year: '2024',
    category: 'Website system',
    description: 'Site architecture and messaging structure for a B2B platform.',
    image: '/assets/Ocean.png',
  },
  {
    id: 'veridian',
    title: 'Veridian',
    year: '2024',
    category: 'Campaign cycle',
    description: 'Creative narrative and landing system for a focused offer cycle.',
    image: '/assets/Nebula.png',
  },
  {
    id: 'nexus',
    title: 'Nexus',
    year: '2023',
    category: 'Reporting system',
    description: 'Decision-ready reporting structure for weekly operating reviews.',
    image: '/assets/Neptune.png',
  },
  {
    id: 'prism',
    title: 'Prism',
    year: '2023',
    category: 'Product study',
    description: 'Early product exploration focused on long-term knowledge use.',
    image: '/assets/Jupiter Moon.png',
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const pillsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const transitionTimes: number[] = [];
      let transitionProgresses = Array.from(
        { length: projects.length - 1 },
        (_, i) => (i + 1) / projects.length,
      );

      // Container starts inset and expands to full bleed
      gsap.fromTo(container,
        { 
          width: '80vw',
          height: '70vh',
          borderRadius: '8px'
        },
        {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top top',
            scrub: 1,
          },
        }
      );

      // Create main timeline for pinned scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: WORK_PIN_DISTANCE,
          pin: true,
          scrub: WORK_PIN_SCRUB,
          onUpdate: (self) => {
            let newIndex = 0;
            transitionProgresses.forEach((point, i) => {
              if (self.progress >= point) {
                newIndex = i + 1;
              }
            });
            setActiveIndex((prev) => (prev === newIndex ? prev : newIndex));
          },
        },
      });

      // Set up initial states
      imagesRef.current.forEach((img, i) => {
        if (img) {
          gsap.set(img, { opacity: i === 0 ? 1 : 0 });
        }
      });

      contentRef.current.forEach((content, i) => {
        if (content) {
          gsap.set(content, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
        }
      });

      // Animate through projects with shared checkpoints for both transitions and pills
      for (let i = 0; i < projects.length - 1; i++) {
        const startTime = (i + 1) / projects.length;
        transitionTimes.push(startTime);

        tl.to(imagesRef.current[i], {
          opacity: 0,
          scale: 1.05,
          duration: 0.08,
          ease: 'power2.inOut',
        }, startTime);

        tl.fromTo(imagesRef.current[i + 1], {
          opacity: 0,
          scale: 1.1,
        }, {
          opacity: 1,
          scale: 1,
          duration: 0.08,
          ease: 'power2.inOut',
        }, startTime);

        tl.to(contentRef.current[i], {
          opacity: 0,
          y: -20,
          duration: 0.08,
          ease: 'power2.in',
        }, startTime);

        tl.fromTo(contentRef.current[i + 1], {
          opacity: 0,
          y: 30,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        }, startTime + 0.03);
      }

      // Keep timeline normalized to 0..1 so checkpoints map directly to scroll progress.
      tl.set({}, {}, 1);
      const timelineDuration = tl.duration();
      transitionProgresses = transitionTimes.map((time) => time / timelineDuration);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-screen flex items-center justify-center bg-[#13161F]"
    >
      {/* Navigation Pills */}
      <div 
        ref={pillsRef}
        className="absolute top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border ${
              activeIndex === index
                ? 'bg-white text-[#13161F] border-white'
                : 'bg-transparent text-white/50 border-white/20'
            }`}
          >
            {project.title}
          </div>
        ))}
      </div>

      {/* Project Container - starts inset, expands to full */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ width: '80vw', height: '70vh' }}
      >
        {/* Project Images */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { imagesRef.current[index] = el; }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              quality={90}
              priority={index === 0}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#13161F]/70 via-[#13161F]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13161F]/50 via-transparent to-transparent" />
          </div>
        ))}

        {/* Project Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="px-8 sm:px-12 lg:px-16 max-w-lg">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { contentRef.current[index] = el; }}
                className="absolute top-1/2 -translate-y-1/2 left-8 sm:left-12 lg:left-16 max-w-md"
              >
                {/* Section label */}
                <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase mb-4">
                  {project.category} — {project.year}
                </p>

                {/* Title */}
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl text-white font-light leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
                >
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
                  {project.description}
                </p>

                {/* CTA */}
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/60 uppercase hover:text-white transition-colors duration-300"
                >
                  <span>Surface object</span>
                  <svg
                    className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-16 z-30 flex items-center gap-4">
        <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
          0{activeIndex + 1}
        </span>
        <div className="w-12 h-[1px] bg-white/20">
          <div 
            className="h-full bg-white/60 transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / 4) * 100}%` }}
          />
        </div>
        <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
          04
        </span>
      </div>
    </section>
  );
}
