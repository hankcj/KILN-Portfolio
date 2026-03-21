/**
 * Page Shell Component
 * 
 * Provides consistent layout and decorative elements across all pages.
 * Uses TerminalNav for command-line style navigation.
 * 
 * Standard elements included:
 * - Terminal navigation (typewriter effect)
 * - Corner brackets (decorative frame)
 * - Living effects (system clock, grain)
 * - Side text (page-specific context)
 * - Consistent z-index layering
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LivingEffects } from './LivingEffects';
import { TerminalNav } from './TerminalNav';
import { MicroficheTransition } from './MicroficheTransition';
import { useAppStore } from '@/lib/store';
import { ScrollProgress } from './ScrollProgress';
import { KLogoMinimal } from './KLogo';

export type PageType = 'home' | 'work' | 'journal' | 'about' | 'services' | 'product' | 'tools' | 'contact';

interface PageShellProps {
  children: React.ReactNode;
  currentPage: PageType;
  /**
   * Left side text (vertical, rotated 180deg)
   * Example: "WORK_ARCHIVE_V2.0", "JOURNAL_V1.0"
   */
  leftSideText?: string;
  /**
   * Right side text (vertical)
   * Example: "6 ITEMS INDEXED", "48.8566° N 2.3522° E"
   */
  rightSideText?: string;
  /**
   * Whether to animate content entrance
   * @default true
   */
  animateEntrance?: boolean;
}

interface SocialRailLink {
  label: string;
  href: string;
}

const SOCIAL_RAIL_LINKS: SocialRailLink[] = [
  { label: 'GitHub', href: 'https://github.com/hankcj' },
  { label: 'Instagram Studio', href: 'https://instagram.com/hankcj' },
  { label: 'Instagram Live', href: 'https://instagram.com/sabl_live' },
  { label: 'X Live', href: 'https://x.com/sabl_live' },
  { label: 'Twitch', href: 'https://twitch.tv/sabllive' },
];

/**
 * Unified Page Shell - handles both server and client component scenarios
 * Previously was split between PageShell and SimplePageShell
 */
export function PageShell({ 
  children, 
  currentPage, 
  leftSideText,
  rightSideText,
  animateEntrance = true
}: PageShellProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const { isTransitioning, transitionTarget } = useAppStore();
  
  // Track if we came from a transition (page was loaded after navigation)
  const [incomingTransition, setIncomingTransition] = useState<{
    active: boolean;
    target: string;
    remainingTime: number;
  }>({ active: false, target: '', remainingTime: 0 });
  
  // Parallax effect for side text
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const triggers: ScrollTrigger[] = [];
    
    // Left side text parallax (moves slower than scroll)
    if (leftSideRef.current) {
      const tl = gsap.to(leftSideRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    }
    
    // Right side text parallax (moves slower, opposite direction)
    if (rightSideRef.current) {
      const tl = gsap.to(rightSideRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    }
    
    return () => {
      triggers.forEach(st => st.kill());
    };
  }, []);
  
  // Check for incoming transition on mount
  useEffect(() => {
    const { getInitialTransitionState } = require('@/lib/transition');
    const state = getInitialTransitionState();
    
    if (state.isTransitioning) {
      setIncomingTransition({
        active: true,
        target: state.target || 'default',
        remainingTime: state.remainingTime,
      });
    }
  }, []);
  
  // Handle incoming transition timing
  useEffect(() => {
    if (!incomingTransition.active) return;
    
    // Content starts hidden and offset for animation
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 20, filter: 'blur(5px)' });
    }
    
    // After remaining time, fade in content
    const timer = setTimeout(() => {
      setIncomingTransition(prev => ({ ...prev, active: false }));
      
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out'
        });
      }
    }, incomingTransition.remainingTime);
    
    return () => clearTimeout(timer);
  }, [incomingTransition.active, incomingTransition.remainingTime]);
  
  // Entrance animation when not in a transition
  useEffect(() => {
    if (!animateEntrance || !contentRef.current || incomingTransition.active) return;
    
    const el = contentRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    });
    
    return () => ctx.revert();
  }, [animateEntrance, incomingTransition.active]);

  // Handle outgoing transition
  useEffect(() => {
    if (!contentRef.current) return;
    
    if (isTransitioning) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [isTransitioning]);
  
  // Determine effective transition state
  const effectiveTransitionActive = isTransitioning || incomingTransition.active;
  const effectiveTransitionTarget = transitionTarget || incomingTransition.target || 'default';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <LivingEffects />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Transition overlay */}
      <MicroficheTransition 
        stage={effectiveTransitionActive ? 'text' : 'idle'} 
        destination={effectiveTransitionTarget}
      />
      
      {/* Terminal Navigation */}
      <TerminalNav />

      {/* K Logo - Home link (always visible) */}
      <div className="fixed top-8 left-8 z-40">
        <KLogoMinimal />
      </div>

      {/* Side text - Left (vertical, rotated) with parallax */}
      {leftSideText && (
        <div 
          ref={leftSideRef}
          className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:block z-30 pointer-events-none"
        >
          <div 
            className="font-mono text-system text-on-surface-muted"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {leftSideText}
          </div>
        </div>
      )}

      {/* Side text - Right (vertical) with parallax */}
      {rightSideText && (
        <div 
          ref={rightSideRef}
          className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block z-30 pointer-events-none"
        >
          <div 
            className="font-mono text-system text-on-surface-muted"
            style={{ writingMode: 'vertical-rl' }}
          >
            {rightSideText}
          </div>
        </div>
      )}

      {/* Main content */}
      <div 
        ref={contentRef}
        className="relative z-10 min-h-screen opacity-0 transition-filter duration-300"
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {children}
      </div>

      <GlobalSocialRail />
      <CornerBrackets />
    </main>
  );
}

/**
 * Simple page wrapper - alias for PageShell for backward compatibility
 * @deprecated Use PageShell directly
 */
export function SimplePageShell(props: PageShellProps) {
  return <PageShell {...props} />;
}

/**
 * Corner Brackets - Decorative frame element
 * Present on all pages with scroll-based pulse animation
 */
function CornerBrackets() {
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    let ticking = false;
    let pulseTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const velocity = Math.abs(currentScroll - lastScrollRef.current);
          lastScrollRef.current = currentScroll;

          if (velocity > 5) {
            const intensity = Math.min(velocity / 50, 1);
            
            [topLeftRef, topRightRef, bottomLeftRef, bottomRightRef].forEach((ref) => {
              if (ref.current) {
                gsap.to(ref.current, {
                  borderColor: `rgba(0, 54, 216, ${0.5 + intensity * 0.5})`,
                  scale: 1 + intensity * 0.2,
                  duration: 0.15,
                  ease: 'power2.out',
                });
              }
            });

            if (pulseTimeout) clearTimeout(pulseTimeout);

            pulseTimeout = setTimeout(() => {
              [topLeftRef, topRightRef, bottomLeftRef, bottomRightRef].forEach((ref) => {
                if (ref.current) {
                  gsap.to(ref.current, {
                    borderColor: 'rgba(0, 54, 216, 0.5)',
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                  });
                }
              });
            }, 150);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (pulseTimeout) clearTimeout(pulseTimeout);
    };
  }, []);

  return (
    <>
      <div
        ref={topLeftRef}
        className="fixed w-4 h-4 border-l border-t border-accent/50 pointer-events-none z-30 transition-colors"
        style={{ top: 'var(--frame-inset-top)', left: 'var(--frame-inset-x)' }}
      />
      <div
        ref={topRightRef}
        className="fixed w-4 h-4 border-r border-t border-accent/50 pointer-events-none z-30 transition-colors"
        style={{ top: 'var(--frame-inset-top)', right: 'var(--frame-inset-x)' }}
      />
      <div
        ref={bottomLeftRef}
        className="fixed w-4 h-4 border-l border-b border-accent/50 pointer-events-none z-30 transition-colors"
        style={{ bottom: 'var(--frame-inset-bottom)', left: 'var(--frame-inset-x)' }}
      />
      <div
        ref={bottomRightRef}
        className="fixed w-4 h-4 border-r border-b border-accent/50 pointer-events-none z-30 transition-colors"
        style={{ bottom: 'var(--frame-inset-bottom)', right: 'var(--frame-inset-x)' }}
      />
      <BottomCenterMarker />
    </>
  );
}

function BottomCenterMarker() {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 pointer-events-none z-30 w-24 h-4"
      style={{ bottom: 'var(--frame-inset-bottom)' }}
      aria-hidden="true"
    >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent/60" />
    </div>
  );
}

export function GlobalSocialRail({ show = true }: { show?: boolean } = {}) {
  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-[35] w-[min(94vw,80rem)] pointer-events-none"
      style={{ bottom: 'calc(var(--frame-inset-bottom) + 1.25rem)' }}
      aria-hidden="false"
    >
      <div className="pointer-events-auto border-t border-border-muted bg-bg-primary/70 backdrop-blur-sm px-3 py-2 overflow-x-auto">
        <div className="flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap min-w-max font-mono text-[10px] text-on-surface-muted tracking-widest">
          {SOCIAL_RAIL_LINKS.map((link, index) => (
            <div key={link.label} className="flex items-center gap-2 md:gap-3">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </a>
              {index < SOCIAL_RAIL_LINKS.length - 1 && (
                <span className="text-on-surface-muted/50">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
