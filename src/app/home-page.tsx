/**
 * Home Page Content
 * 
 * Clean layout with load animation that clears after complete.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LivingEffects, GlitchText } from '@/components/dom/LivingEffects';
import { useAppStore } from '@/lib/store';

export default function HomePage() {
  const { startTransition } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Load animation sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimationComplete(true);
        }
      });

      // PHASE 1: Boot sequence text appears
      tl.fromTo('.boot-text', 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.1, stagger: 0.4, ease: 'power2.out' }
      );

      // PHASE 2: Fade boot text, reveal main content
      tl.to('.boot-overlay', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      }, '+=0.5');

      // PHASE 3: Main content reveals
      tl.fromTo('.main-content', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      tl.fromTo('.nav-link', 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, stagger: 0.1, ease: 'steps(1)' },
        '-=0.5'
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNavigate = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(page);
  };

  return (
    <main ref={containerRef} className="min-h-screen relative overflow-hidden">
      <LivingEffects />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Boot animation overlay - disappears after load */}
      <div 
        className={`boot-overlay fixed inset-0 z-50 flex items-center justify-center bg-bg-primary transition-opacity duration-500 ${animationComplete ? 'pointer-events-none opacity-0' : ''}`}
      >
        <div className="space-y-3">
          <div className="boot-text font-mono text-system text-accent opacity-0">// INIT_SEQUENCE</div>
          <div className="boot-text font-mono text-system text-accent opacity-0">C  LOAD_MODULES</div>
          <div className="boot-text font-mono text-system text-accent opacity-0">{'>>'} MOUNT_SYSTEMS</div>
          <div className="boot-text font-mono text-system text-accent opacity-0">** READY</div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content relative z-10 min-h-screen flex flex-col justify-between px-8 md:px-16 lg:px-24 py-12" style={{ opacity: 0 }}>
        
        {/* Navigation - scattered in corners */}
        <nav className="fixed inset-0 z-40 pointer-events-none">
          <a 
            href="/"
            className="nav-link pointer-events-auto absolute top-8 left-8 font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors opacity-0"
          >
            K
          </a>

          <a 
            href="/work"
            onClick={handleNavigate('work')}
            className="nav-link pointer-events-auto absolute top-8 right-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors opacity-0"
          >
            <GlitchText>C  WORK</GlitchText>
          </a>

          <a 
            href="/signal"
            onClick={handleNavigate('signal')}
            className="nav-link pointer-events-auto absolute bottom-8 left-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors opacity-0"
          >
            <GlitchText>C  SIGNAL</GlitchText>
          </a>

          <a 
            href="/system"
            onClick={handleNavigate('system')}
            className="nav-link pointer-events-auto absolute bottom-8 right-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors opacity-0"
          >
            <GlitchText>// SYSTEM</GlitchText>
          </a>

          {/* Side text */}
          <div className="nav-link absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-0">
            <div 
              className="font-mono text-system text-on-surface-muted"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              PORTFOLIO_V1.0.0
            </div>
          </div>

          <div className="nav-link absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-0">
            <div 
              className="font-mono text-system text-on-surface-muted"
              style={{ writingMode: 'vertical-rl' }}
            >
              48.8566° N 2.3522° E
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <div className="flex flex-col justify-between h-full">
          
          {/* Top header */}
          <div className="flex justify-between items-start pt-4">
            <div className="font-mono text-system text-on-surface-muted">
              // BOOT_SEQUENCE <span className="animate-pulse">_</span>
            </div>
            <div className="font-mono text-system text-on-surface-muted text-right">
              EST. 2024<br />
              STATUS: ONLINE
            </div>
          </div>

          {/* Center - KILN title */}
          <div className="relative my-auto py-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-accent w-16" />
              <span className="font-mono text-system text-accent">
                ENTRY POINT
              </span>
            </div>

            <h1 className="font-heading text-display-xl md:text-[12rem] lg:text-[16rem] text-on-bg-primary leading-[0.85] tracking-tight">
              KILN
            </h1>

            <div className="mt-4 md:absolute md:top-20 md:right-0 lg:right-20">
              <p className="font-heading text-h3 md:text-h2 text-on-bg-tertiary leading-tight">
                personal<br />studio
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <span className="font-mono text-system text-on-surface-muted">
                // LOADING COMPLETE
              </span>
              <div className="h-px bg-border-custom flex-1 max-w-xs" />
            </div>
          </div>

          {/* Bottom - Two column info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-auto max-w-4xl pb-4">
            <div className="space-y-2">
              <div className="font-mono text-system text-on-surface-muted mb-2">
                C  TYPE
              </div>
              <p className="text-small text-on-bg-secondary leading-relaxed">
                Personal studio & publishing space. Not a portfolio. Not a blog. 
                A continuous practice of systems, essays, and experiments.
              </p>
            </div>

            <div className="space-y-2">
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
          <div className="flex justify-between items-end mt-12 pt-8 border-t border-border-muted">
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
      </div>
    </main>
  );
}
