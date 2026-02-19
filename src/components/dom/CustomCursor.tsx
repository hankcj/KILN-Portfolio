/**
 * Custom Cursor Component
 * 
 * Terminal-style cursor that reinforces the system aesthetic.
 * Block cursor for links, underscore for text areas, default elsewhere.
 * Respects reduced motion preferences.
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { useAppStore } from '@/lib/store';

export function CustomCursor() {
  const { reducedMotion } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    setMounted(true);
    
    // Disable on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      return;
    }

    // Disable if reduced motion is preferred
    if (reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Detect cursor type based on element under mouse
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const tagName = element.tagName.toLowerCase();
        const role = element.getAttribute('role');
        const isClickable = 
          tagName === 'a' ||
          tagName === 'button' ||
          role === 'button' ||
          role === 'link' ||
          element.closest('a') ||
          element.closest('button') ||
          window.getComputedStyle(element).cursor === 'pointer';
        
        const isText = 
          tagName === 'input' ||
          tagName === 'textarea' ||
          tagName === 'select' ||
          element.getAttribute('contenteditable') === 'true';

        if (isClickable) {
          setCursorType('pointer');
        } else if (isText) {
          setCursorType('text');
        } else {
          setCursorType('default');
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth animation loop
    const animate = () => {
      // Lerp for smooth following
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    rafRef.current = requestAnimationFrame(animate);

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, input, textarea, select, [role="button"]').forEach(el => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Restore default cursor
      document.body.style.cursor = '';
      document.querySelectorAll('a, button, input, textarea, select, [role="button"]').forEach(el => {
        (el as HTMLElement).style.cursor = '';
      });
    };
  }, [reducedMotion]);

  // Don't render on server, during hydration, or if reduced motion
  if (!mounted || typeof window === 'undefined' || reducedMotion) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          willChange: 'transform',
        }}
      >
        {/* Default cursor - small dot */}
        {cursorType === 'default' && (
          <div
            className={`w-2 h-2 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
              isClicking ? 'scale-50' : 'scale-100'
            }`}
          />
        )}

        {/* Pointer cursor - block/bracket style */}
        {cursorType === 'pointer' && (
          <div
            className={`-translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
              isClicking ? 'scale-90' : 'scale-100'
            }`}
          >
            <div className="relative">
              <div className="w-6 h-6 border border-accent flex items-center justify-center">
                <div className={`w-1 h-1 bg-accent transition-opacity ${isClicking ? 'opacity-0' : 'opacity-100'}`} />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-2 h-px bg-accent" />
              <div className="absolute -top-1 -left-1 w-px h-2 bg-accent" />
              <div className="absolute -bottom-1 -right-1 w-2 h-px bg-accent" />
              <div className="absolute -bottom-1 -right-1 w-px h-2 bg-accent" />
            </div>
          </div>
        )}

        {/* Text cursor - underscore */}
        {cursorType === 'text' && (
          <div
            className={`-translate-x-1/2 translate-y-1 transition-opacity duration-100 ${
              isClicking ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <div className="w-3 h-0.5 bg-accent animate-pulse" />
          </div>
        )}
      </div>

      {/* Trailing cursor (lagging behind for visual effect) */}
      <TrailingCursor targetX={targetRef.current.x} targetY={targetRef.current.y} isVisible={isVisible} />
    </>
  );
}

// Separate trailing cursor component for the lag effect
function TrailingCursor({ 
  targetX, 
  targetY, 
  isVisible 
}: { 
  targetX: number; 
  targetY: number; 
  isVisible: boolean;
}) {
  const trailRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      // Slower lerp for trailing effect
      positionRef.current.x += (targetX - positionRef.current.x) * 0.08;
      positionRef.current.y += (targetY - positionRef.current.y) * 0.08;

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [targetX, targetY]);

  return (
    <div
      ref={trailRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300 ${
        isVisible ? 'opacity-30' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="w-4 h-4 border border-accent/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
