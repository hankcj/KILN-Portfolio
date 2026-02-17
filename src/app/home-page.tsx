/**
 * Home Page Content
 * 
 * Status accumulation load animation - system labels form frame, content prints in.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LivingEffects, GlitchText } from '@/components/dom/LivingEffects';
import { useAppStore } from '@/lib/store';

// Corner status labels
const CORNER_LABELS = [
  { text: 'REF: 001-A', position: 'top-left' },
  { text: 'EST. 2024', position: 'top-right' },
  { text: 'SYS_RDY', position: 'bottom-left' },
  { text: 'v1.0.0', position: 'bottom-right' },
];

export default function HomePage() {
  const { startTransition } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [printedLines, setPrintedLines] = useState<number>(0);
  const [frameComplete, setFrameComplete] = useState(false);

  // Status accumulation sequence
  useEffect(() => {
    const tl = gsap.timeline();

    // PHASE 1: Corner labels appear (hard cuts, staggered)
    tl.fromTo('.corner-label', 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.05, 
        stagger: 0.1,
        ease: 'steps(1)',
        onComplete: () => setFrameComplete(true)
      }
    );

    // PHASE 2: Frame lines draw
    tl.fromTo('.frame-line-h', 
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    );
    tl.fromTo('.frame-line-v', 
      { scaleY: 0 },
      { scaleY: 1, duration: 0.4, ease: 'power2.out' },
      '<'
    );

    // PHASE 3: Content prints line by line
    tl.call(() => setShowContent(true));
    
    // Print each line with stagger
    const lines = document.querySelectorAll('.print-line');
    tl.fromTo(lines, 
      { opacity: 0, x: -10 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.03, 
        stagger: 0.08,
        ease: 'steps(1)'
      },
      '+=0.2'
    );

    // Print nav items
    tl.fromTo('.nav-item', 
      { opacity: 0 },
      { opacity: 1, duration: 0.05, stagger: 0.1, ease: 'steps(1)' },
      '<0.3'
    );

    return () => { tl.kill(); };
  }, []);

  const handleNavigate = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(page);
  };

  return (
    <main ref={containerRef} className="min-h-screen relative overflow-hidden">
      <LivingEffects />

      {/* Background - static */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* PHASE 1 & 2: Corner labels and frame */}
      <div className="fixed inset-8 z-40 pointer-events-none">
        {/* Corner labels */}
        {CORNER_LABELS.map((label, i) => (
          <div
            key={i}
            className={`corner-label absolute font-mono text-system text-on-surface-muted opacity-0 ${
              label.position === 'top-left' ? 'top-0 left-0' :
              label.position === 'top-right' ? 'top-0 right-0' :
              label.position === 'bottom-left' ? 'bottom-0 left-0' :
              'bottom-0 right-0'
            }`}
          >
            {label.text}
          </div>
        ))}

        {/* Frame lines - horizontal */}
        <div 
          className="frame-line-h absolute top-0 left-16 right-16 h-px bg-accent/30 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
        <div 
          className="frame-line-h absolute bottom-0 left-16 right-16 h-px bg-accent/30 origin-right"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Frame lines - vertical */}
        <div 
          className="frame-line-v absolute left-0 top-16 bottom-16 w-px bg-accent/30 origin-top"
          style={{ transform: 'scaleY(0)' }}
        />
        <div 
          className="frame-line-v absolute right-0 top-16 bottom-16 w-px bg-accent/30 origin-bottom"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>

      {/* PHASE 3: Content prints inside frame */}
      {showContent && (
        <>
          {/* Navigation */}
          <nav className="fixed inset-0 z-50">
            <a 
              href="/"
              className="nav-item absolute top-8 left-8 font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors opacity-0"
            >
              K
            </a>

            <a 
              href="/work"
              onClick={handleNavigate('work')}
              className="nav-item absolute top-8 right-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors opacity-0"
            >
              <GlitchText>C  WORK</GlitchText>
            </a>

            <a 
              href="/signal"
              onClick={handleNavigate('signal')}
              className="nav-item absolute bottom-8 left-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors opacity-0"
            >
              <GlitchText>C  SIGNAL</GlitchText>
            </a>

            <a 
              href="/system"
              onClick={handleNavigate('system')}
              className="nav-item absolute bottom-8 right-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors opacity-0"
            >
              <GlitchText>// SYSTEM</GlitchText>
            </a>

            <div className="print-line absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-0">
              <div 
                className="font-mono text-system text-on-surface-muted"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                PORTFOLIO_V1.0.0
              </div>
            </div>

            <div className="print-line absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-0">
              <div 
                className="font-mono text-system text-on-surface-muted"
                style={{ writingMode: 'vertical-rl' }}
              >
                48.8566° N 2.3522° E
              </div>
            </div>
          </nav>

          {/* Main content - prints line by line */}
          <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-32">
            
            {/* Top header */}
            <div className="flex justify-between items-start">
              <div className="print-line font-mono text-system text-on-surface-muted opacity-0">
                // BOOT_SEQUENCE <span className="animate-pulse">_</span>
              </div>
              <div className="print-line font-mono text-system text-on-surface-muted text-right opacity-0">
                STATUS: ONLINE
              </div>
            </div>

            {/* Center - KILN title */}
            <div className="relative my-auto">
              <div className="relative">
                <div className="print-line flex items-center gap-4 mb-4 opacity-0">
                  <div className="h-px bg-accent w-16" />
                  <span className="font-mono text-system text-accent">
                    ENTRY POINT
                  </span>
                </div>

                <h1 className="print-line font-heading text-display-xl md:text-[12rem] lg:text-[16rem] text-on-bg-primary leading-[0.85] tracking-tight opacity-0">
                  KILN
                </h1>

                <div className="print-line mt-2 md:mt-0 md:absolute md:top-4 md:right-0 lg:right-20 opacity-0">
                  <p className="font-heading text-h3 md:text-h2 text-on-bg-tertiary max-w-xs leading-tight">
                    personal<br />studio
                  </p>
                </div>

                <div className="print-line flex items-center gap-4 mt-8 opacity-0">
                  <span className="font-mono text-system text-on-surface-muted">
                    // LOADING COMPLETE
                  </span>
                  <div className="h-px bg-border-custom flex-1 max-w-xs" />
                </div>
              </div>
            </div>

            {/* Bottom - Two column info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-auto max-w-4xl">
              <div className="print-line space-y-2 opacity-0">
                <div className="font-mono text-system text-on-surface-muted mb-2">
                  C  TYPE
                </div>
                <p className="text-small text-on-bg-secondary leading-relaxed">
                  Personal studio & publishing space. Not a portfolio. Not a blog. 
                  A continuous practice of systems, essays, and experiments.
                </p>
              </div>

              <div className="print-line space-y-2 opacity-0">
                <div className="font-mono text-system text-on-surface-muted mb-2">
                  C  STATUS
                </div>
                <p className="text-small text-on-bg-secondary leading-relaxed">
                  Currently building systems that think. Writing about the intersection 
                  of technology, design, and human experience.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="print-line flex justify-between items-end mt-16 pt-8 border-t border-border-muted opacity-0">
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
                LAST_UPDATE: 2024.02.17
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
