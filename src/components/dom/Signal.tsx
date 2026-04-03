'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 'systems-thinking',
    title: 'Systems Thinking in Interface Design',
    excerpt: 'How to build design systems that scale without losing their soul.',
    date: 'Jan 2025',
    readTime: '8 min',
    category: 'Process',
  },
  {
    id: 'craft-of-tools',
    title: 'The Craft of Tools',
    excerpt: 'Why we believe in building custom tools for custom problems.',
    date: 'Dec 2024',
    readTime: '6 min',
    category: 'Essay',
  },
  {
    id: 'invisible-design',
    title: 'Invisible Design',
    excerpt: 'The best interfaces are the ones you don\'t notice.',
    date: 'Nov 2024',
    readTime: '5 min',
    category: 'Philosophy',
  },
];

export default function Signal() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

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

      // Cards staggered reveal with clip-path
      const items = cards.querySelectorAll('.article-card');
      gsap.fromTo(
        items,
        { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
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
      id="signal"
      className="relative bg-[#13161F] py-24 sm:py-32"
    >
      <div className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3">
            Signal
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl text-white font-light mb-4"
            style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
          >
            Signal Archive
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-md">
            Essays and notes surfaced from studio research and practice.
          </p>
        </div>

        {/* Article Cards */}
        <div ref={cardsRef} className="space-y-4">
          {articles.map((article) => (
            <a
              key={article.id}
              href="#"
              className="article-card group block py-6 border-b border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase">
                      {article.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">
                      {article.date}
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl text-white font-light mb-2 group-hover:text-white/80 transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
                  >
                    {article.title}
                  </h3>

                  <p className="text-white/40 text-sm leading-relaxed max-w-xl">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.15em] text-white/30 uppercase">
                    {article.readTime}
                  </span>
                  <svg
                    className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300"
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
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12">
          <a
            href="#"
            className="group inline-flex items-center gap-4 text-sm tracking-[0.15em] text-white/60 uppercase hover:text-white transition-colors duration-300"
          >
            <span>Signal archive</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
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
      </div>
    </section>
  );
}
