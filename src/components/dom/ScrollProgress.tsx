/**
 * Scroll Progress Bar
 * 
 * Terminal-style scroll progress indicator at the top of the page.
 * Shows percentage and visual bar.
 */

'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setProgress(Math.min(100, Math.max(0, scrollPercent)));
          setIsVisible(scrollTop > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const filledBlocks = Math.floor(progress / 5);
  const emptyBlocks = 20 - filledBlocks;
  const bar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <div className="fixed top-0 left-0 right-0 z-[90] bg-bg-primary/90 backdrop-blur-sm border-b border-border-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-2 flex items-center justify-between gap-4">
        {/* Progress bar */}
        <div className="flex-1 font-mono text-system text-[10px] tracking-wider text-on-surface-muted overflow-hidden whitespace-nowrap">
          <span className="text-accent">[</span>
          <span className="text-[#FAF6F0]">{bar}</span>
          <span className="text-accent">]</span>
        </div>
        
        {/* Percentage */}
        <div className="font-mono text-system text-[10px] text-on-surface-muted w-12 text-right">
          {Math.round(progress).toString().padStart(2, '0')}%
        </div>
      </div>
    </div>
  );
}
