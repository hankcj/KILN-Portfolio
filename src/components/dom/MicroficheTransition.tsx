/**
 * Microfiche Transition
 * 
 * Two-stage zoom transition with edge system text.
 * Forward: zoom in → edge text → zoom deeper → fade in new page
 * Backward: zoom out → edge text → zoom deeper out → fade in new page
 */

'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store';

// System text that appears at viewport edges during transition
const EDGE_TEXTS = [
  { text: '// LOADING', position: 'top-left' as const },
  { text: 'C  ACCESS', position: 'top-right' as const },
  { text: 'READING...', position: 'bottom-left' as const },
  { text: 'SYS_RDY', position: 'bottom-right' as const },
  { text: '// DECODE', position: 'left' as const },
  { text: 'INDEX_OK', position: 'right' as const },
];

export function MicroficheTransition() {
  const { 
    currentPage,
    setCurrentPage,
    isTransitioning, 
    transitionTarget, 
    endTransition 
  } = useAppStore();
  
  const [showEdgeText, setShowEdgeText] = useState(false);
  const [edgeTextOpacity, setEdgeTextOpacity] = useState(0);
  const isAnimatingRef = useRef(false);

  // Determine direction based on page order
  const getDirection = useCallback((from: string, to: string) => {
    const order = ['home', 'work', 'signal', 'system'];
    const fromIndex = order.indexOf(from);
    const toIndex = order.indexOf(to);
    return toIndex > fromIndex ? 'forward' : 'backward';
  }, []);

  const runTransition = useCallback(() => {
    if (!transitionTarget || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    const direction = getDirection(currentPage, transitionTarget);
    const isForward = direction === 'forward';

    // Get the page content element
    const contentEl = document.getElementById('page-content');
    const overlayEl = document.getElementById('transition-overlay');
    
    if (!contentEl) {
      isAnimatingRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPage(transitionTarget);
        setShowEdgeText(false);
        setEdgeTextOpacity(0);
        endTransition();
        isAnimatingRef.current = false;
      }
    });

    // PHASE 1: First zoom
    tl.to(contentEl, {
      scale: isForward ? 1.8 : 0.6,
      opacity: isForward ? 0.6 : 0.7,
      filter: 'blur(4px)',
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // PHASE 2: Show edge text
    tl.call(() => {
      setShowEdgeText(true);
      gsap.to({}, {
        duration: 0.1,
        onComplete: () => setEdgeTextOpacity(1)
      });
    });

    // Hold
    tl.to({}, { duration: 0.5 });

    // PHASE 3: Second deeper zoom + edge text out
    tl.to(contentEl, {
      scale: isForward ? 3 : 0.3,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 0.4,
      ease: 'power2.in'
    });

    tl.to({}, {
      duration: 0.1,
      onStart: () => setEdgeTextOpacity(0)
    });

    tl.call(() => setShowEdgeText(false));

    // Noise
    if (overlayEl) {
      tl.to(overlayEl, {
        opacity: 0.8,
        duration: 0.2
      }, '-=0.2');

      tl.to(overlayEl, {
        backgroundColor: 'rgba(0, 54, 216, 0.2)',
        duration: 0.08,
        yoyo: true,
        repeat: 1
      });
    }

    // PHASE 4: New page from zoomed state
    tl.set(contentEl, {
      scale: isForward ? 0.5 : 1.5,
      opacity: 0,
      filter: 'blur(15px)'
    });

    if (overlayEl) {
      tl.to(overlayEl, {
        opacity: 0,
        backgroundColor: 'transparent',
        duration: 0.2
      });
    }

    tl.to(contentEl, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power3.out'
    });

  }, [transitionTarget, currentPage, setCurrentPage, endTransition, getDirection]);

  useEffect(() => {
    if (isTransitioning && transitionTarget && !isAnimatingRef.current) {
      const timer = setTimeout(() => runTransition(), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, transitionTarget, runTransition]);

  return (
    <>
      {/* Edge text overlay */}
      {showEdgeText && (
        <div 
          className="fixed inset-0 z-40 pointer-events-none transition-opacity duration-200"
          style={{ opacity: edgeTextOpacity }}
        >
          {EDGE_TEXTS.map((item, i) => {
            const { positionClasses, textAlign } = getPositionStyles(item.position);
            const offset = getInitialOffset(item.position);
            
            return (
              <div
                key={i}
                className={`absolute font-mono text-system text-accent/50 ${positionClasses} ${textAlign}`}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      )}

      {/* Noise overlay */}
      <div 
        id="transition-overlay"
        className="fixed inset-0 z-50 pointer-events-none opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          backgroundColor: 'rgba(19, 22, 31, 0.9)',
        }}
      />
    </>
  );
}

function getPositionStyles(position: string) {
  switch (position) {
    case 'top-left': 
      return { positionClasses: 'top-20 left-8', textAlign: 'text-left' };
    case 'top-right': 
      return { positionClasses: 'top-20 right-8', textAlign: 'text-right' };
    case 'bottom-left': 
      return { positionClasses: 'bottom-20 left-8', textAlign: 'text-left' };
    case 'bottom-right': 
      return { positionClasses: 'bottom-20 right-8', textAlign: 'text-right' };
    case 'left': 
      return { positionClasses: 'left-8 top-1/2 -translate-y-1/2', textAlign: 'text-left' };
    case 'right': 
      return { positionClasses: 'right-8 top-1/2 -translate-y-1/2', textAlign: 'text-right' };
    default: 
      return { positionClasses: '', textAlign: 'text-left' };
  }
}

function getInitialOffset(position: string) {
  switch (position) {
    case 'top-left': return { x: -30, y: 0 };
    case 'top-right': return { x: 30, y: 0 };
    case 'bottom-left': return { x: -30, y: 0 };
    case 'bottom-right': return { x: 30, y: 0 };
    case 'left': return { x: -40, y: 0 };
    case 'right': return { x: 40, y: 0 };
    default: return { x: 0, y: 0 };
  }
}
