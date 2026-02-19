/**
 * Reading Position Glow Indicator
 * 
 * Shows reading progress with a glowing accent line on the left edge.
 * Indicates current position within long articles.
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface ReadingPositionIndicatorProps {
  /**
   * Color of the indicator line
   */
  color?: string;
  /**
   * Width of the indicator line
   */
  width?: number;
  /**
   * Glow intensity
   */
  glowIntensity?: number;
}

export function ReadingPositionIndicator({
  color = '#0036D8',
  width = 3,
  glowIntensity = 0.6,
}: ReadingPositionIndicatorProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          
          setProgress(Math.min(100, Math.max(0, scrollPercent)));
          setIsVisible(scrollTop > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate the glow intensity based on scroll velocity
  useEffect(() => {
    if (!glowRef.current) return;

    gsap.to(glowRef.current, {
      opacity: glowIntensity + (progress > 0 && progress < 100 ? 0.2 : 0),
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [progress, glowIntensity]);

  if (!isVisible) return null;

  return (
    <>
      {/* Fixed position container on the left edge */}
      <div 
        className="fixed left-0 top-0 bottom-0 z-[35] pointer-events-none hidden lg:block"
        style={{ width: `${width + 10}px` }}
      >
        {/* Background track */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-px bg-border-muted/30"
          style={{ marginLeft: `${width / 2}px` }}
        />
        
        {/* Progress line with glow */}
        <div
          ref={indicatorRef}
          className="absolute left-0 top-0 w-px transition-all duration-150 ease-out"
          style={{
            marginLeft: `${width / 2}px`,
            height: `${progress}%`,
            backgroundColor: color,
            boxShadow: `0 0 ${10 * glowIntensity}px ${color}, 0 0 ${20 * glowIntensity}px ${color}`,
          }}
        />
        
        {/* Glow orb at current position */}
        <div
          ref={glowRef}
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-opacity duration-300"
          style={{
            top: `${progress}%`,
            backgroundColor: color,
            boxShadow: `0 0 ${15 * glowIntensity}px ${color}, 0 0 ${30 * glowIntensity}px ${color}`,
            marginTop: '-4px',
            opacity: glowIntensity,
          }}
        />
        
        {/* Section markers (optional visual enhancement) */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-[10vh]">
          {[0, 25, 50, 75, 100].map((mark) => (
            <div
              key={mark}
              className="w-1 h-px bg-on-surface-muted/20"
              style={{
                marginLeft: `${width / 2 - 2}px`,
                opacity: Math.abs(progress - mark) < 5 ? 0.5 : 0.2,
                transition: 'opacity 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile indicator - bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-bg-primary/80 backdrop-blur-sm z-[35] lg:hidden">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>
    </>
  );
}

/**
 * Section-aware reading indicator
 * Shows which section the user is currently reading
 */
interface SectionAwareIndicatorProps {
  sections: { id: string; title: string }[];
}

export function SectionAwareIndicator({ sections }: SectionAwareIndicatorProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      // Find current section
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      // Calculate overall progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / docHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (!activeSection) return null;

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[35] hidden xl:block">
      <div className="space-y-2">
        {sections.map((section, index) => {
          const isActive = section.id === activeSection;
          const isPast = sections.findIndex(s => s.id === activeSection) > index;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-center gap-3 py-1"
            >
              {/* Indicator dot */}
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent scale-125 shadow-[0_0_10px_rgba(0,54,216,0.6)]' 
                    : isPast 
                      ? 'bg-accent/40' 
                      : 'bg-border-muted'
                }`}
              />
              
              {/* Section title - shows on hover */}
              <span 
                className={`font-mono text-system text-[10px] uppercase tracking-wider transition-all duration-300 ${
                  isActive 
                    ? 'text-accent opacity-100 translate-x-0' 
                    : 'text-on-surface-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {section.title}
              </span>
            </a>
          );
        })}
      </div>
      
      {/* Progress bar */}
      <div className="absolute left-[3px] top-0 bottom-0 w-px bg-border-muted/30 -z-10">
        <div 
          className="w-full bg-accent/50 transition-all duration-150"
          style={{ height: `${progress}%` }}
        />
      </div>
    </div>
  );
}
