/**
 * Microfiche Transition
 * 
 * Edge text and noise effects that coordinate with PageRouter.
 */

'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const EDGE_TEXTS = [
  { text: '// LOADING', position: 'top-left' as const },
  { text: 'C  ACCESS', position: 'top-right' as const },
  { text: 'READING...', position: 'bottom-left' as const },
  { text: 'SYS_RDY', position: 'bottom-right' as const },
  { text: '// DECODE', position: 'left' as const },
  { text: 'INDEX_OK', position: 'right' as const },
];

interface MicroficheTransitionProps {
  stage: 'idle' | 'zoom1' | 'text' | 'zoom2' | 'switch' | 'reveal';
  isSwitching: boolean;
}

export function MicroficheTransition({ stage, isSwitching }: MicroficheTransitionProps) {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  // Animate text appearance based on stage
  useEffect(() => {
    if (stage === 'text') {
      // Stagger text appearance
      EDGE_TEXTS.forEach((_, i) => {
        setTimeout(() => {
          setActiveIndices(prev => [...prev, i]);
        }, i * 120);
      });
    } else if (stage === 'zoom2' || stage === 'idle') {
      setActiveIndices([]);
    }
  }, [stage]);

  // Control noise overlay based on stage
  useEffect(() => {
    const overlayEl = document.getElementById('transition-overlay');
    if (!overlayEl) return;

    if (stage === 'zoom2') {
      gsap.to(overlayEl, { opacity: 0.9, duration: 0.3 });
    } else if (stage === 'switch') {
      // Flash effect
      gsap.timeline()
        .to(overlayEl, { backgroundColor: 'rgba(0, 54, 216, 0.3)', duration: 0.1 })
        .to(overlayEl, { backgroundColor: 'rgba(19, 22, 31, 0.9)', duration: 0.1 });
    } else if (stage === 'reveal' || stage === 'idle') {
      gsap.to(overlayEl, { 
        opacity: 0, 
        backgroundColor: 'rgba(19, 22, 31, 0.9)',
        duration: 0.3 
      });
    }
  }, [stage]);

  if (stage === 'idle') return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {EDGE_TEXTS.map((item, i) => {
        const isActive = activeIndices.includes(i);
        const { positionClasses } = getPositionStyles(item.position);
        
        return (
          <div
            key={i}
            className={`absolute font-mono text-system ${positionClasses}`}
            style={{
              color: isActive ? 'rgba(250, 246, 240, 0.9)' : 'rgba(0, 54, 216, 0.4)',
              opacity: stage === 'text' || stage === 'zoom2' ? (isActive ? 1 : 0.3) : 0,
              transition: 'all 0.4s ease-out',
              textShadow: isActive ? '0 0 20px rgba(0, 54, 216, 0.8)' : 'none',
              transform: isActive ? 'scale(1)' : 'scale(0.9)',
            }}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
}

function getPositionStyles(position: string) {
  switch (position) {
    case 'top-left': return { positionClasses: 'top-28 left-12' };
    case 'top-right': return { positionClasses: 'top-28 right-12' };
    case 'bottom-left': return { positionClasses: 'bottom-28 left-12' };
    case 'bottom-right': return { positionClasses: 'bottom-28 right-12' };
    case 'left': return { positionClasses: 'left-12 top-1/2 -translate-y-1/2' };
    case 'right': return { positionClasses: 'right-12 top-1/2 -translate-y-1/2' };
    default: return { positionClasses: '' };
  }
}
