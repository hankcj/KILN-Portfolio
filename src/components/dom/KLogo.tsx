/**
 * K Logo Component
 * 
 * Animated KILN logo with hover effects:
 * - Glitch text effect on hover
 * - Subtle 3D rotation
 * - Color shift to accent
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface KLogoProps {
  className?: string;
  showGlitch?: boolean;
}

export function KLogo({ className = '', showGlitch = true }: KLogoProps) {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('K');
  const [isHovered, setIsHovered] = useState(false);
  const originalText = 'K';
  const chars = 'KILN01█▓▒░';

  // Glitch effect on hover
  useEffect(() => {
    if (!showGlitch || !isHovered) {
      setDisplayText(originalText);
      return;
    }

    let iteration = 0;
    const maxIterations = 10;
    
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (index < iteration / 3) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isHovered, showGlitch]);

  // GSAP hover animations
  useEffect(() => {
    if (!logoRef.current) return;

    const logo = logoRef.current;

    const handleMouseEnter = () => {
      setIsHovered(true);
      
      // Subtle scale and rotation
      gsap.to(logo, {
        scale: 1.05,
        rotationY: 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      // Return to normal
      gsap.to(logo, {
        scale: 1,
        rotationY: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!logo) return;
      
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Subtle tilt based on mouse position
      gsap.to(logo, {
        rotationY: x * 0.1,
        rotationX: -y * 0.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);
    logo.addEventListener('mousemove', handleMouseMove);

    return () => {
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
      logo.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <a
      ref={logoRef}
      href="/"
      className={`font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors duration-200 focus-ring block ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      aria-label="Home"
    >
      <span
        ref={textRef}
        className="inline-block relative"
        style={{
          textShadow: isHovered 
            ? '-2px 0 #ff0000, 2px 0 #00ffff' 
            : 'none',
          transition: 'text-shadow 0.2s ease',
        }}
      >
        {displayText}
      </span>
    </a>
  );
}

/**
 * Minimal K logo for use in PageShell
 * Uses the same styling but integrates with existing fixed positioning
 */
export function KLogoMinimal({ className = '' }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState('K');
  const chars = 'KILN█▓▒░';

  useEffect(() => {
    if (!isHovered) {
      setDisplayText('K');
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(chars[Math.floor(Math.random() * chars.length)]);
      iteration++;
      if (iteration > 5) {
        clearInterval(interval);
        setDisplayText('K');
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <a
      href="/"
      className={`font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors duration-150 block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Home"
    >
      <span 
        className="inline-block"
        style={{
          textShadow: isHovered ? '-1px 0 rgba(255,0,0,0.5), 1px 0 rgba(0,255,255,0.5)' : 'none',
          transition: 'all 0.15s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {displayText}
      </span>
    </a>
  );
}
