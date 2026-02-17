/**
 * Microfiche Transition
 * 
 * Typewriter loading text in white, clustered in bottom area.
 */

'use client';

import { useEffect, useState } from 'react';

// Loading text - clustered in bottom-left area
const LOADING_LINES = [
  '// LOADING_ARCHIVE',
  'C  ACCESS_GRANTED',
  'READING_INDEX...',
  'SYS_RDY',
];

interface MicroficheTransitionProps {
  stage: 'idle' | 'text' | 'zoom2';
}

export function MicroficheTransition({ stage }: MicroficheTransitionProps) {
  const [typedLines, setTypedLines] = useState<string[]>(['', '', '', '']);
  const [currentLine, setCurrentLine] = useState(0);
  const [showText, setShowText] = useState(false);

  // Typewriter effect when entering 'text' stage
  useEffect(() => {
    if (stage === 'text' && !showText) {
      setShowText(true);
      
      const typeLine = (lineIndex: number) => {
        if (lineIndex >= LOADING_LINES.length) {
          return; // All lines typed
        }

        const text = LOADING_LINES[lineIndex];
        let charIndex = 0;
        
        const typeChar = () => {
          if (charIndex <= text.length) {
            setTypedLines(prev => {
              const newLines = [...prev];
              newLines[lineIndex] = text.slice(0, charIndex);
              return newLines;
            });
            charIndex++;
            setTimeout(typeChar, 35); // 35ms per character
          } else {
            // Line complete, start next line
            setTimeout(() => {
              setCurrentLine(lineIndex + 1);
              typeLine(lineIndex + 1);
            }, 250);
          }
        };

        typeChar();
      };

      typeLine(0);
    } else if (stage === 'idle') {
      // Reset when idle
      setShowText(false);
      setTypedLines(['', '', '', '']);
      setCurrentLine(0);
    }
  }, [stage, showText]);

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

      {/* Loading text - clustered in bottom left with typewriter effect */}
      <div 
        className="absolute bottom-20 left-10 flex flex-col gap-2 pointer-events-none font-mono text-system"
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}
      >
        {LOADING_LINES.map((line, i) => (
          <div 
            key={i}
            className="h-6"
            style={{
              color: '#FAF6F0', // Parchment white from branding
              opacity: i <= currentLine ? 1 : 0,
              transition: 'opacity 0.1s',
              textShadow: i < currentLine ? '0 0 10px rgba(250, 246, 240, 0.3)' : 'none'
            }}
          >
            {typedLines[i]}
            {i === currentLine && stage === 'text' && (
              <span className="animate-pulse" style={{ color: '#FAF6F0' }}>_</span>
            )}
          </div>
        ))}
      </div>

      {/* Corner brackets during transition */}
      <div 
        className="absolute top-10 left-10 w-6 h-6 border-l border-t pointer-events-none"
        style={{ 
          opacity: showContent ? 1 : 0, 
          transition: 'opacity 0.3s',
          borderColor: 'rgba(250, 246, 240, 0.2)'
        }}
      />
      <div 
        className="absolute top-10 right-10 w-6 h-6 border-r border-t pointer-events-none"
        style={{ 
          opacity: showContent ? 1 : 0, 
          transition: 'opacity 0.3s',
          borderColor: 'rgba(250, 246, 240, 0.2)'
        }}
      />
      <div 
        className="absolute bottom-10 left-10 w-6 h-6 border-l border-b pointer-events-none"
        style={{ 
          opacity: showContent ? 1 : 0, 
          transition: 'opacity 0.3s',
          borderColor: 'rgba(250, 246, 240, 0.2)'
        }}
      />
      <div 
        className="absolute bottom-10 right-10 w-6 h-6 border-r border-b pointer-events-none"
        style={{ 
          opacity: showContent ? 1 : 0, 
          transition: 'opacity 0.3s',
          borderColor: 'rgba(250, 246, 240, 0.2)'
        }}
      />
    </div>
  );
}
