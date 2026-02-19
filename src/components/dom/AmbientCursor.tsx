/**
 * Ambient Cursor Glow
 * 
 * Subtle accent-colored glow that follows the cursor.
 * Enhances the "living system" aesthetic without being distracting.
 * Respects reduced motion preferences.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function AmbientCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Check for reduced motion preference
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      return;
    }

    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) {
        setIsVisible(true);
      }

      // Mark as moving
      isMoving.current = true;
      
      // Clear previous timeout
      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current);
      }

      // Set timeout to detect when mouse stops
      moveTimeout.current = setTimeout(() => {
        isMoving.current = false;
      }, 100);

      // Smooth follow with GSAP
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current);
      }
    };
  }, [reducedMotion, isVisible]);

  // Don't render on server, during hydration, or if reduced motion
  if (!mounted || reducedMotion) return null;

  return (
    <>
      {/* Main glow */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 pointer-events-none z-[5] transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '400px',
          height: '400px',
          marginLeft: '-200px',
          marginTop: '-200px',
          background: 'radial-gradient(circle, rgba(0, 54, 216, 0.08) 0%, rgba(0, 54, 216, 0.02) 40%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
      />
      
      {/* Inner bright core */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[6] transition-opacity duration-300 ${
          isVisible ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          width: '100px',
          height: '100px',
          marginLeft: '-50px',
          marginTop: '-50px',
          background: 'radial-gradient(circle, rgba(0, 54, 216, 0.15) 0%, transparent 60%)',
          filter: 'blur(20px)',
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
          willChange: 'transform',
        }}
      />
    </>
  );
}

/**
 * Interactive hover glow for cards and buttons
 * Adds extra glow intensity on hover
 */
export function HoverGlow({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x,
        y,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(glow, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 54, 216, 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      {children}
    </div>
  );
}
