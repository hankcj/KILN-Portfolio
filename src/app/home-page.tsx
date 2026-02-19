/**
 * Home Page Content
 * 
 * Clean layout with typewriter boot animation.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LivingEffects, GlitchText } from '@/components/dom/LivingEffects';
import { TerminalNav } from '@/components/dom/TerminalNav';
import { useAppStore } from '@/lib/store';
import { SceneManager } from '@/components/canvas/SceneManager';

const BOOT_LINES = [
  '// INIT_SEQUENCE',
  'C  LOAD_MODULES',
  '>> MOUNT_SYSTEMS',
  '** READY',
];

export default function HomePage() {
  const { startTransition } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>(['', '', '', '']);
  const [currentLine, setCurrentLine] = useState(0);

  // Typewriter effect for boot sequence
  useEffect(() => {
    const typeLine = (lineIndex: number) => {
      if (lineIndex >= BOOT_LINES.length) {
        // All lines typed, fade to content
        setTimeout(() => {
          setAnimationComplete(true);
          gsap.to('.boot-overlay', {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set('.boot-overlay', { display: 'none' });
            }
          });
          // Reveal main content
          gsap.fromTo('.main-content', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
          gsap.fromTo('.nav-link', 
            { opacity: 0 },
            { opacity: 1, duration: 0.3, stagger: 0.1, ease: 'steps(1)' }
          );
        }, 400);
        return;
      }

      const text = BOOT_LINES[lineIndex];
      let charIndex = 0;
      
      const typeChar = () => {
        if (charIndex <= text.length) {
          setTypedLines(prev => {
            const newLines = [...prev];
            newLines[lineIndex] = text.slice(0, charIndex);
            return newLines;
          });
          charIndex++;
          setTimeout(typeChar, 40); // 40ms per character
        } else {
          // Line complete, start next line after pause
          setTimeout(() => {
            setCurrentLine(lineIndex + 1);
            typeLine(lineIndex + 1);
          }, 300);
        }
      };

      typeChar();
    };

    // Start typing after brief delay
    const timer = setTimeout(() => {
      typeLine(0);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(page);
  };

  return (
    <main ref={containerRef} className="min-h-screen relative overflow-hidden">
      <LivingEffects />
      <TerminalNav />

      {/* WebGL Atmospheric Scene */}
      <SceneManager />

      {/* CSS Fallback Background - subtle gradient orb */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Boot animation overlay - typewriter effect */}
      <div 
        className="boot-overlay fixed inset-0 z-50 flex items-center justify-center bg-bg-primary"
        style={{ opacity: 1 }}
      >
        <div className="space-y-3 font-mono text-system">
          {BOOT_LINES.map((line, i) => (
            <div 
              key={i} 
              className="h-6"
              style={{ 
                color: '#FAF6F0', // Parchment white
                opacity: i <= currentLine ? 1 : 0,
                transition: 'opacity 0.1s'
              }}
            >
              {typedLines[i]}
              {i === currentLine && (
                <span className="animate-pulse" style={{ color: '#FAF6F0' }}>_</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="main-content relative z-10 min-h-screen flex flex-col justify-between px-8 md:px-16 lg:px-24 py-12" style={{ opacity: 0 }}>
        
        {/* K Logo */}
        <a 
          href="/"
          className="nav-link pointer-events-auto fixed top-8 left-8 z-40 font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors opacity-0"
        >
          K
        </a>

        {/* Decorative side text */}
        <div className="nav-link fixed left-8 top-1/2 -translate-y-1/2 hidden lg:block z-30 pointer-events-none opacity-0">
          <div 
            className="font-mono text-system text-on-surface-muted"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            PORTFOLIO_V1.0.0
          </div>
        </div>

        <div className="nav-link fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block z-30 pointer-events-none opacity-0">
          <div 
            className="font-mono text-system text-on-surface-muted"
            style={{ writingMode: 'vertical-rl' }}
          >
            48.8566° N 2.3522° E
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col justify-between h-full">
          
          {/* Top header */}
          <div className="flex justify-between items-start pt-4">
            <div className="font-mono text-system text-on-surface-muted">
              {'// BOOT_SEQUENCE'} <span className="animate-pulse">_</span>
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
                {'// LOADING COMPLETE'}
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
