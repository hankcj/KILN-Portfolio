/**
 * Entrance / Experience Route
 * 
 * The main entry point. Not a typical portfolio homepage.
 * A brutalist manifesto that happens to contain a portfolio.
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { LivingEffects, GlitchText, MouseParallax } from '@/components/dom/LivingEffects';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(titleRef.current, { 
        y: 100, 
        opacity: 0,
        clipPath: 'inset(100% 0 0 0)'
      });
      gsap.set(subtitleRef.current, { 
        x: -30, 
        opacity: 0 
      });
      gsap.set(navRefs.current, { 
        opacity: 0,
        y: -20 
      });
      gsap.set(cornerRefs.current, { 
        scale: 0,
        opacity: 0 
      });
      gsap.set(lineRefs.current, { 
        scaleX: 0,
        transformOrigin: 'left center'
      });
      gsap.set(infoRefs.current, { 
        y: 30, 
        opacity: 0 
      });

      // Main timeline
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out' },
        delay: 0.3
      });

      // Corner brackets first
      tl.to(cornerRefs.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1
      });

      // Grid lines draw in
      tl.to(lineRefs.current, {
        scaleX: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power2.inOut'
      }, '-=0.4');

      // Navigation fades in
      tl.to(navRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1
      }, '-=0.8');

      // Main title reveal
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.4,
        ease: 'power4.out'
      }, '-=0.6');

      // Subtitle slides in
      tl.to(subtitleRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8');

      // Info columns rise up
      tl.to(infoRefs.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.6');

      // Background K letter fades in slowly
      gsap.to('.bg-letter', {
        opacity: 0.03,
        duration: 2,
        delay: 0.5,
        ease: 'power2.out'
      });

      // Scan line animation - continuous vertical sweep
      gsap.to(scanRef.current, {
        top: '100%',
        duration: 4,
        repeat: -1,
        ease: 'power2.inOut',
        repeatDelay: 2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover animations for nav
  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: e.type === 'mouseenter' ? 5 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  // Random blinking cursor for system text
  const blinkRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(blinkRef.current, { opacity: 0, duration: 0.5 })
      .to(blinkRef.current, { opacity: 1, duration: 0.5 });
    return () => { tl.kill(); };
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Living effects layer */}
      <LivingEffects />

      {/* Scan line sweep */}
      <div 
        ref={scanRef}
        className="fixed left-0 right-0 h-px bg-accent/20 pointer-events-none z-30"
        style={{ top: '-2px', boxShadow: '0 0 20px rgba(0, 54, 216, 0.3)' }}
      />

      {/* Background atmospheric elements with parallax */}
      <MouseParallax intensity={0.01}>
        <div className="fixed inset-0 pointer-events-none">
          {/* Large gradient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
          
          {/* Grid lines for structure */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div ref={el => lineRefs.current[0] = el} className="h-full w-px bg-on-bg-primary absolute left-[10%]" />
            <div ref={el => lineRefs.current[1] = el} className="h-full w-px bg-on-bg-primary absolute left-[50%]" />
            <div ref={el => lineRefs.current[2] = el} className="h-full w-px bg-on-bg-primary absolute left-[90%]" />
            <div ref={el => lineRefs.current[3] = el} className="w-full h-px bg-on-bg-primary absolute top-[15%]" />
            <div ref={el => lineRefs.current[4] = el} className="w-full h-px bg-on-bg-primary absolute top-[85%]" />
          </div>
        </div>
      </MouseParallax>

      {/* UNORTHODOX NAVIGATION - scattered, not in a bar */}
      <nav className="fixed inset-0 z-50 pointer-events-none">
        {/* Top left - Identity */}
        <Link 
          ref={el => navRefs.current[0] = el}
          href="/" 
          onMouseEnter={handleNavHover}
          onMouseLeave={handleNavHover}
          className="pointer-events-auto absolute top-8 left-8 font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors"
        >
          K
        </Link>

        {/* Top right - Work link */}
        <Link 
          ref={el => navRefs.current[1] = el}
          href="/work" 
          onMouseEnter={handleNavHover}
          onMouseLeave={handleNavHover}
          className="pointer-events-auto absolute top-8 right-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors"
        >
          <GlitchText>C  WORK</GlitchText>
        </Link>

        {/* Bottom left - Signal */}
        <Link 
          ref={el => navRefs.current[2] = el}
          href="/signal" 
          onMouseEnter={handleNavHover}
          onMouseLeave={handleNavHover}
          className="pointer-events-auto absolute bottom-8 left-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors"
        >
          <GlitchText>C  SIGNAL</GlitchText>
        </Link>

        {/* Bottom right - System */}
        <Link 
          ref={el => navRefs.current[3] = el}
          href="/system" 
          onMouseEnter={handleNavHover}
          onMouseLeave={handleNavHover}
          className="pointer-events-auto absolute bottom-8 right-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors"
        >
          <GlitchText>// SYSTEM</GlitchText>
        </Link>

        {/* Vertical side nav - left middle */}
        <div 
          ref={el => navRefs.current[4] = el as HTMLAnchorElement}
          className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div 
            className="font-mono text-system text-on-surface-muted"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            PORTFOLIO_V1.0.0
          </div>
        </div>

        {/* Vertical side nav - right middle */}
        <div 
          ref={el => navRefs.current[5] = el as HTMLAnchorElement}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div 
            className="font-mono text-system text-on-surface-muted"
            style={{ writingMode: 'vertical-rl' }}
          >
            48.8566° N 2.3522° E
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT - Asymmetric brutalist layout */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-32">
        
        {/* TOP SECTION - System header */}
        <div className="flex justify-between items-start">
          <div className="font-mono text-system text-on-surface-muted">
            // BOOT SEQUENCE <span ref={blinkRef}>_</span>
          </div>
          <div className="font-mono text-system text-on-surface-muted text-right">
            EST. 2024<br />
            STATUS: ONLINE
          </div>
        </div>

        {/* CENTER - The massive KILN typography */}
        <div className="relative my-auto">
          {/* Background giant text - partially obscured */}
          <div className="bg-letter absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-0">
            <span className="font-heading text-[20vw] md:text-[25vw] text-on-bg-primary leading-none tracking-tighter">
              K
            </span>
          </div>

          {/* Main title block */}
          <div className="relative">
            {/* Line above */}
            <div className="flex items-center gap-4 mb-4">
              <div ref={el => lineRefs.current[5] = el} className="h-px bg-accent w-16" />
              <span className="font-mono text-system text-accent">
                ENTRY POINT
              </span>
            </div>

            {/* KILN - massive display */}
            <MouseParallax intensity={0.02}>
              <h1 ref={titleRef} className="font-heading text-display-xl md:text-[12rem] lg:text-[16rem] text-on-bg-primary leading-[0.85] tracking-tight">
                KILN
              </h1>
            </MouseParallax>

            {/* Subtitle - overlapping style */}
            <div ref={subtitleRef} className="mt-2 md:mt-0 md:absolute md:top-4 md:right-0 lg:right-20">
              <p className="font-heading text-h3 md:text-h2 text-on-bg-tertiary max-w-xs leading-tight">
                personal<br />studio
              </p>
            </div>

            {/* Line below */}
            <div className="flex items-center gap-4 mt-8">
              <span className="font-mono text-system text-on-surface-muted">
                // LOADING COMPLETE
              </span>
              <div ref={el => lineRefs.current[6] = el} className="h-px bg-border-custom flex-1 max-w-xs" />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - Three column info layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mt-auto">
          {/* Column 1 - What this is */}
          <div ref={el => infoRefs.current[0] = el} className="space-y-2">
            <div className="font-mono text-system text-on-surface-muted mb-2">
              C  TYPE
            </div>
            <p className="text-small text-on-bg-secondary leading-relaxed">
              Personal studio & publishing space. Not a portfolio. Not a blog. 
              A continuous practice of systems, essays, and experiments.
            </p>
          </div>

          {/* Column 2 - Current status */}
          <div ref={el => infoRefs.current[1] = el} className="space-y-2">
            <div className="font-mono text-system text-on-surface-muted mb-2">
              C  STATUS
            </div>
            <p className="text-small text-on-bg-secondary leading-relaxed">
              Currently building systems that think. Writing about the intersection 
              of technology, design, and human experience.
            </p>
          </div>

          {/* Column 3 - Entry CTA */}
          <div ref={el => infoRefs.current[2] = el} className="space-y-2">
            <div className="font-mono text-system text-on-surface-muted mb-2">
              C  NAVIGATION
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/work" className="text-small text-on-bg-primary hover:text-accent transition-colors group flex items-center gap-2">
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span> Browse outputs
              </Link>
              <Link href="/signal" className="text-small text-on-bg-primary hover:text-accent transition-colors group flex items-center gap-2">
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span> Read signal
              </Link>
              <Link href="/system" className="text-small text-on-bg-primary hover:text-accent transition-colors group flex items-center gap-2">
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span> Inspect system
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-between items-end mt-16 pt-8 border-t border-border-muted">
          <div className="font-mono text-system text-on-surface-muted">
            REF: 001-A
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-system text-on-surface-muted">
              LIVE
            </span>
          </div>
          <div className="font-mono text-system text-on-surface-muted">
            SYS_RDY
          </div>
        </div>
      </div>

      {/* Decorative corner brackets */}
      <div ref={el => cornerRefs.current[0] = el} className="fixed top-8 left-8 w-4 h-4 border-l border-t border-accent/30 pointer-events-none" />
      <div ref={el => cornerRefs.current[1] = el} className="fixed top-8 right-8 w-4 h-4 border-r border-t border-accent/30 pointer-events-none" />
      <div ref={el => cornerRefs.current[2] = el} className="fixed bottom-8 left-8 w-4 h-4 border-l border-b border-accent/30 pointer-events-none" />
      <div ref={el => cornerRefs.current[3] = el} className="fixed bottom-8 right-8 w-4 h-4 border-r border-b border-accent/30 pointer-events-none" />
    </main>
  );
}
