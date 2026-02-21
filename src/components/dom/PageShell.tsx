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

export type PageType = 'home' | 'work' | 'outputs' | 'signal' | 'system' | 'services' | 'project' | 'shop';

interface PageShellProps {
  children: React.ReactNode;
  currentPage: PageType;
  /**
   * Left side text (vertical, rotated 180deg)
   * Example: "OUTPUT_ARCHIVE_V2.0", "TRANSMISSION_LOG"
   */
  leftSideText?: string;
  /**
   * Right side text (vertical)
   * Example: "6 ITEMS INDEXED", "48.8566° N 2.3522° E"
   */
  rightSideText?: string;
  /**
   * Whether to animate content entrance
   */
  animateEntrance?: boolean;
}

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
  const { isTransitioning, transitionTarget, endTransition } = useAppStore();
  const [showContent, setShowContent] = useState(true);
  
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
    
    // Content starts hidden and offset down for slide-up animation
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 30, filter: 'blur(5px)' });
    }
    
    // After remaining time, fade in content with slide-up and unblur
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

  // Handle page transition - fade out smoothly when transitioning
  // The MicroficheTransition overlay handles the visual transition
  useEffect(() => {
    if (!contentRef.current) return;
    
    if (isTransitioning) {
      // Fade out smoothly with blur effect
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
        duration: 0.4,
        ease: 'power2.in'
      });
    }
    // Note: We don't fade in here - incoming transition handler or entrance animation handles it
  }, [isTransitioning]);

  useEffect(() => {
    if (!animateEntrance || !contentRef.current || isTransitioning || incomingTransition.active) return;

    const el = contentRef.current;
    const ctx = gsap.context(() => {
      // Use fromTo so we animate TO opacity 1 (content div starts with opacity-0 class)
      gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    });

    return () => ctx.revert();
  }, [animateEntrance, isTransitioning, incomingTransition.active]);
  
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

      {/* Corner brackets - consistent decorative element */}
      <CornerBrackets />
    </main>
  );
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
  const scrollVelocityRef = useRef(0);

  useEffect(() => {
    let ticking = false;
    let pulseTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const velocity = Math.abs(currentScroll - lastScrollRef.current);
          scrollVelocityRef.current = velocity;
          lastScrollRef.current = currentScroll;

          // Trigger pulse on significant scroll
          if (velocity > 5) {
            const intensity = Math.min(velocity / 50, 1); // Cap at 1
            
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

            // Clear previous timeout
            if (pulseTimeout) clearTimeout(pulseTimeout);

            // Return to normal after scroll stops
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
      <div ref={topLeftRef} className="fixed top-8 left-8 w-4 h-4 border-l border-t border-accent/50 pointer-events-none z-30 transition-colors" />
      <div ref={topRightRef} className="fixed top-8 right-8 w-4 h-4 border-r border-t border-accent/50 pointer-events-none z-30 transition-colors" />
      <div ref={bottomLeftRef} className="fixed bottom-8 left-8 w-4 h-4 border-l border-b border-accent/50 pointer-events-none z-30 transition-colors" />
      <div ref={bottomRightRef} className="fixed bottom-8 right-8 w-4 h-4 border-r border-b border-accent/50 pointer-events-none z-30 transition-colors" />
    </>
  );
}

/**
 * Simple page wrapper for server components
 * Provides navigation and shell without client-side animations
 * BUT handles transition persistence across page loads
 */
interface SimplePageShellProps {
  children: React.ReactNode;
  currentPage: PageType;
  leftSideText?: string;
  rightSideText?: string;
}

export function SimplePageShell({ 
  children, 
  currentPage,
  leftSideText,
  rightSideText 
}: SimplePageShellProps) {
  const { isTransitioning, transitionTarget } = useAppStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  
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
    
    // Content starts hidden (already set via CSS class)
    // Set initial transform for slide-up animation
    if (contentRef.current) {
      gsap.set(contentRef.current, { y: 20 });
    }
    
    // After remaining time, fade in content with slide-up
    const timer = setTimeout(() => {
      setIncomingTransition(prev => ({ ...prev, active: false }));
      
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      }
    }, incomingTransition.remainingTime);
    
    return () => clearTimeout(timer);
  }, [incomingTransition.active, incomingTransition.remainingTime]);
  
  // Entrance animation when not in an incoming transition (e.g. direct load of /signal/[slug])
  useEffect(() => {
    if (!contentRef.current || incomingTransition.active) return;
    const el = contentRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    });
    return () => ctx.revert();
  }, [incomingTransition.active]);

  // Handle outgoing transition (when user navigates away)
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
    <>
      <LivingEffects />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Transition overlay - shows for both incoming and outgoing transitions */}
      <MicroficheTransition 
        stage={effectiveTransitionActive ? 'text' : 'idle'} 
        destination={effectiveTransitionTarget}
      />
      
      <TerminalNav />
      
      {/* K Logo */}
      <div className="fixed top-8 left-8 z-40">
        <KLogoMinimal />
      </div>

      {/* Side text with parallax */}
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

      <div 
        ref={contentRef}
        className="relative z-10 min-h-screen opacity-0 transition-filter duration-300"
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {children}
      </div>
      <CornerBracketsSimple />
    </>
  );
}

/**
 * Simple Corner Brackets for SimplePageShell
 */
function CornerBracketsSimple() {
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
      <div ref={topLeftRef} className="fixed top-8 left-8 w-4 h-4 border-l border-t border-accent/50 pointer-events-none z-30 transition-colors" />
      <div ref={topRightRef} className="fixed top-8 right-8 w-4 h-4 border-r border-t border-accent/50 pointer-events-none z-30 transition-colors" />
      <div ref={bottomLeftRef} className="fixed bottom-8 left-8 w-4 h-4 border-l border-b border-accent/50 pointer-events-none z-30 transition-colors" />
      <div ref={bottomRightRef} className="fixed bottom-8 right-8 w-4 h-4 border-r border-b border-accent/50 pointer-events-none z-30 transition-colors" />
    </>
  );
}
