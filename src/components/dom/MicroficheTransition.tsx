/**
 * Microfiche Transition
 * 
 * Loading screen with typewriter microcopy animation.
 * Shown briefly during page transitions.
 */

'use client';

import { useEffect, useState } from 'react';

// Loading text variants based on destination
const LOADING_LINES_VARIANTS = {
  home: [
    '// RETURNING_TO_ORIGIN',
    'C  RESET_NAVIGATION',
    '>> DISENGAGE_ARCHIVE',
    '** HOME',
  ],
  work: [
    '// ACCESSING_OUTPUTS',
    'C  LOAD_ARCHIVE',
    'INDEXING_ITEMS...',
    'READY',
  ],
  outputs: [
    '// ACCESSING_OUTPUTS',
    'C  LOAD_ARCHIVE',
    'INDEXING_ITEMS...',
    'READY',
  ],
  signal: [
    '// TUNING_FREQUENCY',
    'C  ESTABLISH_UPLINK',
    'RECEIVING_TRANSMISSION...',
    'SIGNAL_ACQUIRED',
  ],
  system: [
    '// SYSTEM_DIAGNOSTICS',
    'C  QUERY_PARAMETERS',
    'LOADING_COLOPHON...',
    'DOCS_READY',
  ],
  services: [
    '// LOADING_MANIFEST',
    'C  QUERY_SERVICES',
    'CHECKING_AVAILABILITY...',
    'READY',
  ],
  project: [
    '// CONNECTING_EXTERNAL',
    'C  HANDSHAKE_INIT',
    'MOUNTING_PROJECT...',
    'LINK_ESTABLISHED',
  ],
  intake: [
    '// INITIALIZING_INTAKE',
    'C  LOAD_FORM',
    'PREPARING_FIELDS...',
    'READY_FOR_INPUT',
  ],
  inquiry: [
    '// INITIALIZING_INTAKE',
    'C  LOAD_FORM',
    'PREPARING_FIELDS...',
    'READY_FOR_INPUT',
  ],
  notfound: [
    '// SEARCHING...',
    'C  SCAN_ARCHIVE',
    'NO_RECORDS_FOUND',
    '** 404 **',
  ],
  error: [
    '// SYSTEM_ERROR',
    'C  DIAGNOSE',
    'RECOVERY_MODE...',
    '** ERROR **',
  ],
  default: [
    '// LOADING',
    'C  PROCESSING',
    'PLEASE_WAIT...',
    'READY',
  ],
};

interface MicroficheTransitionProps {
  stage: 'idle' | 'text' | 'zoom2';
  destination?: string;
}

export function MicroficheTransition({ stage, destination = 'default' }: MicroficheTransitionProps) {
  const [typedLines, setTypedLines] = useState<string[]>(['', '', '', '']);
  const [currentLine, setCurrentLine] = useState(0);
  const [showText, setShowText] = useState(false);

  const loadingLines = LOADING_LINES_VARIANTS[destination as keyof typeof LOADING_LINES_VARIANTS] || LOADING_LINES_VARIANTS.default;

  useEffect(() => {
    if (stage === 'text' && !showText) {
      setShowText(true);
      
      const typeLine = (lineIndex: number) => {
        if (lineIndex >= loadingLines.length) return;

        const text = loadingLines[lineIndex];
        let charIndex = 0;
        
        const typeChar = () => {
          if (charIndex <= text.length) {
            setTypedLines(prev => {
              const newLines = [...prev];
              newLines[lineIndex] = text.slice(0, charIndex);
              return newLines;
            });
            charIndex++;
            setTimeout(typeChar, 30);
          } else {
            setTimeout(() => {
              setCurrentLine(lineIndex + 1);
              typeLine(lineIndex + 1);
            }, 150);
          }
        };

        typeChar();
      };

      typeLine(0);
    } else if (stage === 'idle') {
      setShowText(false);
      setTypedLines(['', '', '', '']);
      setCurrentLine(0);
    }
  }, [stage, showText, loadingLines]);

  if (stage === 'idle') return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] pointer-events-none bg-bg-primary transition-all duration-500 ${
        stage === 'text' ? 'backdrop-blur-sm' : ''
      }`}
      style={{
        filter: stage === 'text' ? 'blur(0px)' : 'blur(0px)',
      }}
    >
      {/* Loading text - bottom left with typewriter effect */}
      <div className="absolute bottom-20 left-10 flex flex-col gap-2 pointer-events-none font-mono text-system">
        {loadingLines.map((line, i) => (
          <div 
            key={i}
            className="h-6"
            style={{
              color: '#FAF6F0',
              opacity: i <= currentLine ? 1 : 0,
              transition: 'opacity 0.1s',
            }}
          >
            {typedLines[i]}
            {i === currentLine && (
              <span className="animate-pulse" style={{ color: '#FAF6F0' }}>_</span>
            )}
          </div>
        ))}
      </div>

      {/* Corner brackets */}
      <div className="absolute top-10 left-10 w-6 h-6 border-l border-t pointer-events-none border-white/20" />
      <div className="absolute top-10 right-10 w-6 h-6 border-r border-t pointer-events-none border-white/20" />
      <div className="absolute bottom-10 left-10 w-6 h-6 border-l border-b pointer-events-none border-white/20" />
      <div className="absolute bottom-10 right-10 w-6 h-6 border-r border-b pointer-events-none border-white/20" />
    </div>
  );
}
