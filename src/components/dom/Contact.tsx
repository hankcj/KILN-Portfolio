'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from '@/components/dom/Marquee';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(
        image,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
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
      id="contact"
      className="relative"
    >
      {/* CTA Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div ref={imageRef} className="absolute inset-0 scale-110">
            <Image
              src="/assets/Sky:Ocean.png"
              alt="Sky with contrails"
              fill
              className="object-cover"
              quality={90}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#13161F] via-[#13161F]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#13161F]/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 text-center px-6 py-32"
        >
          {/* Small label */}
          <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase mb-6">
            Make contact
          </p>

          {/* Main CTA text */}
          <h2
            className="text-[10vw] sm:text-[8vw] md:text-[7vw] text-white font-light mb-6 leading-[0.9]"
            style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
          >
            Make contact.
          </h2>

          <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto mb-12 leading-relaxed">
            Share context, constraints, and timeline. The studio reviews a small number of projects.
          </p>

          {/* Email CTA Button */}
          <a
            href="mailto:hello@kiln.studio"
            className="group inline-flex items-center gap-4 px-8 py-4 border border-white/20 hover:border-white/40 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
          >
            <span className="text-sm tracking-[0.15em] text-white uppercase">
              hello@kiln.studio
            </span>
            <svg
              className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>

          {/* Alternative contact */}
          <div className="mt-12 flex items-center justify-center gap-6 text-[11px] tracking-[0.15em] text-white/40 uppercase">
            <Link href="/intake" className="hover:text-white/70 transition-colors duration-300">
              Project intake
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/services" className="hover:text-white/70 transition-colors duration-300">
              Available work
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/signal" className="hover:text-white/70 transition-colors duration-300">
              Signal archive
            </Link>
          </div>
        </div>
      </div>

      {/* Footer marquee */}
      <Marquee
        text="KILN // Studio, archive, and tools // 2026"
        speed={30}
        className="text-white/20"
      />

      {/* Footer */}
      <footer className="bg-[#13161F] py-12 px-6 sm:px-12 lg:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <span
            className="text-xl tracking-[0.2em] text-white/80 font-light"
            style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
          >
            KILN
          </span>

          {/* Links */}
          <div className="flex items-center gap-8 text-[11px] tracking-[0.15em] text-white/40 uppercase">
            <a href="https://x.com/sabl_live" className="hover:text-white/70 transition-colors duration-300">
              X
            </a>
            <a href="https://github.com/hankcj" className="hover:text-white/70 transition-colors duration-300">
              GitHub
            </a>
            <a href="https://instagram.com/hankcj" className="hover:text-white/70 transition-colors duration-300">
              Instagram
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[10px] tracking-[0.1em] text-white/30 uppercase">
            © 2026 KILN
          </p>
        </div>
      </footer>
    </section>
  );
}
