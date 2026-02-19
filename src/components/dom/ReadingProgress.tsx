/**
 * Reading Progress Component
 * 
 * Shows reading time remaining and scroll progress.
 * Terminal-style UI matching the system aesthetic.
 */

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface ReadingProgressProps {
  contentSelector?: string;
  wordsPerMinute?: number;
}

export function ReadingProgress({
  contentSelector = '.ghost-content',
  wordsPerMinute = 200,
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const contentRef = useRef<HTMLElement | null>(null);
  const headingsRef = useRef<HTMLElement[]>([]);

  // Calculate reading time from content
  useEffect(() => {
    const content = document.querySelector(contentSelector);
    if (!content) return;

    contentRef.current = content as HTMLElement;
    
    // Get all headings for section tracking
    headingsRef.current = Array.from(content.querySelectorAll('h1, h2, h3'));
    
    // Calculate word count
    const text = content.textContent || '';
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    setTotalTime(minutes);
    setTimeRemaining(minutes);
  }, [contentSelector, wordsPerMinute]);

  // Track scroll progress
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      setIsVisible(scrollTop > 100);

      // Update time remaining
      if (contentRef.current && totalTime > 0) {
        const remainingPercent = 1 - (scrollPercent / 100);
        const remainingMinutes = Math.max(1, Math.ceil(totalTime * remainingPercent));
        setTimeRemaining(remainingMinutes);
      }

      // Find current section
      const currentHeading = headingsRef.current.find((heading, index) => {
        const nextHeading = headingsRef.current[index + 1];
        const headingTop = heading.offsetTop - 150;
        const nextHeadingTop = nextHeading ? nextHeading.offsetTop - 150 : Infinity;
        
        return scrollTop >= headingTop && scrollTop < nextHeadingTop;
      });

      if (currentHeading) {
        setCurrentSection(currentHeading.textContent || '');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalTime]);

  if (!isVisible) return null;

  const filledBlocks = Math.floor(progress / 5);
  const emptyBlocks = 20 - filledBlocks;
  const bar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <div className="fixed top-0 left-0 right-0 z-[90] bg-bg-primary/90 backdrop-blur-sm border-b border-border-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-2 flex items-center justify-between gap-4">
        {/* Current section (hidden on mobile) */}
        <div className="hidden md:block w-48 font-mono text-system text-on-surface-muted truncate">
          {currentSection ? (
            <span className="text-accent">{'//'}</span>
          ) : (
            'READING'
          )}
          {' '}
          <span className="text-on-bg-secondary">{currentSection}</span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 font-mono text-system text-[10px] tracking-wider text-on-surface-muted overflow-hidden whitespace-nowrap">
          <span className="text-accent">[</span>
          <span className="text-[#FAF6F0]">{bar}</span>
          <span className="text-accent">]</span>
        </div>
        
        {/* Time remaining */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="font-mono text-system text-[10px] text-on-surface-muted text-right">
            <span className="text-accent">{timeRemaining}</span>
            <span className="text-on-surface-muted"> MIN</span>
          </div>
          <div className="font-mono text-system text-[10px] text-on-surface-muted w-10 text-right">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact reading progress for minimal display
 */
export function ReadingProgressMinimal({
  contentSelector = '.ghost-content',
  wordsPerMinute = 200,
}: ReadingProgressProps) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const content = document.querySelector(contentSelector);
    if (!content) return;

    const text = content.textContent || '';
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    setTimeRemaining(minutes);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;
        
        setProgress(scrollPercent);
        setIsVisible(scrollTop > 100);
        
        const remaining = Math.max(1, Math.ceil(minutes * (1 - scrollPercent)));
        setTimeRemaining(remaining);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentSelector, wordsPerMinute]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 px-4 py-2 bg-bg-primary/90 backdrop-blur-sm border border-border-muted rounded-full">
      <div className="flex items-center gap-3">
        {/* Mini progress ring */}
        <svg className="w-4 h-4 -rotate-90" viewBox="0 0 16 16">
          <circle
            cx="8"
            cy="8"
            r="6"
            fill="none"
            stroke="rgba(250, 246, 240, 0.1)"
            strokeWidth="2"
          />
          <circle
            cx="8"
            cy="8"
            r="6"
            fill="none"
            stroke="#0036D8"
            strokeWidth="2"
            strokeDasharray={`${progress * 37.7} 37.7`}
            className="transition-all duration-150"
          />
        </svg>
        
        <span className="font-mono text-system text-on-surface-muted">
          <span className="text-accent">{timeRemaining}</span> min
        </span>
      </div>
    </div>
  );
}

/**
 * Reading time estimate component (for post headers)
 */
interface ReadingTimeEstimateProps {
  content: string;
  wordsPerMinute?: number;
  className?: string;
}

export function ReadingTimeEstimate({
  content,
  wordsPerMinute = 200,
  className = '',
}: ReadingTimeEstimateProps) {
  const minutes = useCallback(() => {
    const wordCount = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }, [content, wordsPerMinute]);

  return (
    <span className={className}>
      {minutes()} MIN READ
    </span>
  );
}
