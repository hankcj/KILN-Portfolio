/**
 * Home Page Content
 * 
 * Brutalist entrance with glitch/scan effects instead of gradual fades.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LivingEffects, GlitchText } from '@/components/dom/LivingEffects';
import { useAppStore } from '@/lib/store';

export default function HomePage() {
  const { startTransition } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  
  const finalTitle = 'KILN';

  // Brutalist boot sequence
  useEffect(() => {
    const sequence = [
      '// INIT...',
      'C  BOOT_SEQ_START',
      '>> LOADING_CORE',
      '** SYSTEM_CHECK',
      '// RENDER_READY',
    ];

    // Show boot lines rapidly
    sequence.forEach((line, i) => {
      setTimeout(() => {
        setBootSequence(prev => [...prev, line]);
      }, i * 80);
    });

    // Clear boot and show title with glitch
    setTimeout(() => {
      setBootSequence([]);
      setShowContent(true);
      
      // Glitch effect on title
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&';
      let iterations = 0;
      const maxIterations = 15;
      
      const glitchInterval = setInterval(() => {
        setGlitchText(
          finalTitle
            .split('')
            .map((char, index) => {
              if (index < iterations / 3) return finalTitle[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        iterations++;
        if (iterations > maxIterations) {
          clearInterval(glitchInterval);
          setGlitchText(finalTitle);
        }
      }, 50);
    }, 600);

    // Animate other elements with hard cuts
    setTimeout(() => {
      gsap.fromTo('.nav-item', 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.15, stagger: 0.05, ease: 'steps(1)' }
      );
    }, 900);

    setTimeout(() => {
      gsap.fromTo('.info-block',
        { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.3, stagger: 0.1, ease: 'power2.out' }
      );
    }, 1100);

  }, []);

  const handleNavigate = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(page);
  };

  return (
    <main ref={containerRef} className="min-h-screen relative overflow-hidden">
      <LivingEffects />

      {/* Background elements - static, no mouse parallax */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-px bg-on-bg-primary absolute left-[10%]" />
          <div className="h-full w-px bg-on-bg-primary absolute left-[50%]" />
          <div className="h-full w-px bg-on-bg-primary absolute left-[90%]" />
          <div className="w-full h-px bg-on-bg-primary absolute top-[15%]" />
          <div className="w-full h-px bg-on-bg-primary absolute top-[85%]" />
        </div>
      </div>

      {/* Boot sequence overlay */}
      {bootSequence.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary">
          <div className="font-mono text-system text-accent space-y-1">
            {bootSequence.map((line, i) => (
              <div key={i} style={{ opacity: i === bootSequence.length - 1 ? 1 : 0.5 }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      {showContent && (
        <>
          {/* Navigation */}
          <nav className="fixed inset-0 z-50">
            <span className="nav-item absolute top-8 left-8 font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors cursor-pointer opacity-0">
              K
            </span>

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

            <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
              <div 
                className="font-mono text-system text-on-surface-muted"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                PORTFOLIO_V1.0.0
              </div>
            </div>

            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
              <div 
                className="font-mono text-system text-on-surface-muted"
                style={{ writingMode: 'vertical-rl' }}
              >
                48.8566° N 2.3522° E
              </div>
            </div>
          </nav>

          {/* Main content */}
          <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-32">
            
            {/* Top header */}
            <div className="flex justify-between items-start">
              <div className="font-mono text-system text-on-surface-muted">
                // BOOT SEQUENCE <span className="animate-pulse">_</span>
              </div>
              <div className="font-mono text-system text-on-surface-muted text-right">
                EST. 2024<br />
                STATUS: ONLINE
              </div>
            </div>

            {/* Center - Glitching KILN title */}
            <div className="relative my-auto">
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px bg-accent w-16" />
                  <span className="font-mono text-system text-accent">
                    ENTRY POINT
                  </span>
                </div>

                <h1 className="font-heading text-display-xl md:text-[12rem] lg:text-[16rem] text-on-bg-primary leading-[0.85] tracking-tight">
                  {glitchText || finalTitle}
                </h1>

                <div className="mt-2 md:mt-0 md:absolute md:top-4 md:right-0 lg:right-20">
                  <p className="font-heading text-h3 md:text-h2 text-on-bg-tertiary max-w-xs leading-tight">
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
            </div>

            {/* Bottom - Two column info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-auto max-w-4xl">
              <div className="info-block space-y-2" style={{ opacity: 0 }}>
                <div className="font-mono text-system text-on-surface-muted mb-2">
                  C  TYPE
                </div>
                <p className="text-small text-on-bg-secondary leading-relaxed">
                  Personal studio & publishing space. Not a portfolio. Not a blog. 
                  A continuous practice of systems, essays, and experiments.
                </p>
              </div>

              <div className="info-block space-y-2" style={{ opacity: 0 }}>
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

          {/* Corner brackets */}
          <div className="fixed top-8 left-8 w-4 h-4 border-l border-t border-accent/30 pointer-events-none" />
          <div className="fixed top-8 right-8 w-4 h-4 border-r border-t border-accent/30 pointer-events-none" />
          <div className="fixed bottom-8 left-8 w-4 h-4 border-l border-b border-accent/30 pointer-events-none" />
          <div className="fixed bottom-8 right-8 w-4 h-4 border-r border-b border-accent/30 pointer-events-none" />
        </>
      )}
    </main>
  );
}
