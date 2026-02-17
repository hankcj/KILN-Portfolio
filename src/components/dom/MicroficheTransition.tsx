/**
 * Microfiche Transition
 * 
 * Loading text clustered in bottom area, blank page state, no grain.
 */

'use client';

import { useEffect, useState } from 'react';

// Loading text clustered in bottom-left area
const LOADING_TEXTS = [
  { text: '// LOADING_ARCHIVE', delay: 0 },
  { text: 'C  ACCESS_GRANTED', delay: 150 },
  { text: 'READING_INDEX...', delay: 300 },
  { text: 'SYS_RDY', delay: 450 },
];

interface MicroficheTransitionProps {
  stage: 'idle' | 'text' | 'zoom2';
}

export function MicroficheTransition({ stage }: MicroficheTransitionProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  // Animate text appearance
  useEffect(() => {
    if (stage === 'text') {
      LOADING_TEXTS.forEach((item) => {
        setTimeout(() => {
          setVisibleLines(prev => [...prev, item.delay]);
        }, item.delay);
      });
    } else if (stage === 'zoom2' || stage === 'idle') {
      setVisibleLines([]);
    }
  }, [stage]);

  if (stage === 'idle') return null;

  const showContent = stage === 'text' || stage === 'zoom2';

  return (
    <div 
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ pointerEvents: 'none' }}
    >
      {/* Blank dark background during transition */}
      <div 
        className="absolute inset-0 bg-bg-primary"
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      />

      {/* Loading text - clustered in bottom left */}
      <div 
        className="absolute bottom-20 left-10 flex flex-col gap-2 pointer-events-none"
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}
      >
        {LOADING_TEXTS.map((item, i) => {
          const isVisible = visibleLines.includes(item.delay);
          return (
            <div
              key={i}
              className="font-mono text-system pointer-events-none"
              style={{
                color: isVisible ? 'rgba(0, 54, 216, 0.9)' : 'rgba(0, 54, 216, 0.2)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.3s ease-out',
                textShadow: isVisible ? '0 0 10px rgba(0, 54, 216, 0.5)' : 'none',
                transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>

      {/* Corner brackets during transition */}
      <div 
        className="absolute top-10 left-10 w-6 h-6 border-l border-t border-accent/40 pointer-events-none"
        style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s' }}
      />
      <div 
        className="absolute top-10 right-10 w-6 h-6 border-r border-t border-accent/40 pointer-events-none"
        style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s' }}
      />
      <div 
        className="absolute bottom-10 left-10 w-6 h-6 border-l border-b border-accent/40 pointer-events-none"
        style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s' }}
      />
      <div 
        className="absolute bottom-10 right-10 w-6 h-6 border-r border-b border-accent/40 pointer-events-none"
        style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s' }}
      />
    </div>
  );
}
