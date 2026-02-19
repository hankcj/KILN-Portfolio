/**
 * Signal Search Component
 * 
 * Fuzzy search for Signal posts using Fuse.js.
 * Command palette style with keyboard shortcuts.
 */

'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import Fuse from 'fuse.js';
import type { GhostPost } from '@/lib/ghost';

interface SignalSearchProps {
  posts: GhostPost[];
}

export function SignalSearch({ posts }: SignalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'excerpt', weight: 0.3 },
        { name: 'custom_excerpt', weight: 0.3 },
        { name: 'tags.name', weight: 0.2 },
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
    });
  }, [posts]);

  // Search results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [query, fuse]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      // ESC to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      
      // Animate in
      if (containerRef.current) {
        gsap.fromTo(containerRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }
        );
      }
    }
  }, [isOpen]);

  // Handle keyboard navigation in results
  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      window.location.href = `/signal/${results[selectedIndex].item.slug}`;
    }
  }, [results, selectedIndex]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedEl = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, results.length]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-3 px-4 py-2 border border-border-muted bg-bg-secondary/50 hover:bg-bg-secondary transition-colors"
      >
        <svg 
          className="w-4 h-4 text-on-surface-muted" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="font-mono text-system text-on-bg-tertiary">
          Search transmissions...
        </span>
        <span className="ml-auto font-mono text-system text-on-surface-muted border border-border-muted px-1.5 py-0.5">
          ⌘K
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
        }}
      />
      
      {/* Search container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-2xl bg-bg-primary border border-border-custom shadow-2xl"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border-muted">
          <svg 
            className="w-5 h-5 text-accent" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search transmissions..."
            className="flex-1 bg-transparent font-mono text-body text-on-bg-primary placeholder:text-on-surface-muted focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={() => {
              setIsOpen(false);
              setQuery('');
            }}
            className="font-mono text-system text-on-surface-muted border border-border-muted px-2 py-1 hover:text-on-bg-primary transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div 
          ref={resultsRef}
          className="max-h-[50vh] overflow-y-auto"
        >
          {results.length > 0 ? (
            results.map((result, index) => (
              <a
                key={result.item.id}
                href={`/signal/${result.item.slug}`}
                className={`block px-4 py-4 border-b border-border-muted last:border-b-0 transition-colors ${
                  index === selectedIndex 
                    ? 'bg-bg-secondary' 
                    : 'hover:bg-bg-secondary/50'
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-heading text-h4 mb-1 truncate ${
                      index === selectedIndex ? 'text-accent' : 'text-on-bg-primary'
                    }`}>
                      <HighlightedText 
                        text={result.item.title} 
                        matches={result.matches?.filter(m => m.key === 'title')[0]?.indices as [number, number][] || []}
                      />
                    </h4>
                    <p className="text-small text-on-bg-tertiary line-clamp-2">
                      <HighlightedText 
                        text={result.item.custom_excerpt || result.item.excerpt} 
                        matches={result.matches?.filter(m => m.key === 'excerpt' || m.key === 'custom_excerpt')[0]?.indices as [number, number][] || []}
                      />
                    </p>
                    {result.item.tags && result.item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {result.item.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag.id}
                            className="font-mono text-system text-on-surface-muted px-2 py-0.5 border border-border-muted"
                          >
                            {tag.name.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-system text-on-surface-muted shrink-0">
                    {new Date(result.item.published_at).getFullYear()}
                  </span>
                </div>
              </a>
            ))
          ) : query.trim() ? (
            <div className="px-4 py-12 text-center">
              <p className="font-mono text-system text-on-surface-muted mb-2">
                {'// NO_RESULTS_FOUND'}
              </p>
              <p className="text-small text-on-bg-tertiary">
                No transmissions match &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <div className="px-4 py-8">
              <p className="font-mono text-system text-on-surface-muted mb-4">
                {'// RECENT_TRANSMISSIONS'}
              </p>
              <div className="space-y-2">
                {posts.slice(0, 5).map(post => (
                  <a
                    key={post.id}
                    href={`/signal/${post.slug}`}
                    className="block py-2 text-small text-on-bg-secondary hover:text-accent transition-colors"
                  >
                    {post.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-6 px-4 py-3 bg-bg-secondary border-t border-border-muted">
          <span className="font-mono text-system text-on-surface-muted">
            <span className="text-accent">↑↓</span> Navigate
          </span>
          <span className="font-mono text-system text-on-surface-muted">
            <span className="text-accent">↵</span> Select
          </span>
          <span className="font-mono text-system text-on-surface-muted">
            <span className="text-accent">ESC</span> Close
          </span>
          <span className="ml-auto font-mono text-system text-on-surface-muted">
            {results.length} RESULTS
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper component to highlight matched text
function HighlightedText({ text, matches }: { text: string; matches: [number, number][] }) {
  if (!matches.length) return <>{text}</>;

  const parts: JSX.Element[] = [];
  let lastIndex = 0;

  // Sort matches and merge overlapping
  const sortedMatches = [...matches].sort((a, b) => a[0] - b[0]);
  const mergedMatches: [number, number][] = [];
  
  for (const match of sortedMatches) {
    if (mergedMatches.length === 0 || match[0] > mergedMatches[mergedMatches.length - 1][1]) {
      mergedMatches.push(match);
    } else {
      mergedMatches[mergedMatches.length - 1][1] = Math.max(
        mergedMatches[mergedMatches.length - 1][1],
        match[1]
      );
    }
  }

  mergedMatches.forEach((match, i) => {
    const [start, end] = match;
    
    // Text before match
    if (start > lastIndex) {
      parts.push(<span key={`text-${i}`}>{text.slice(lastIndex, start)}</span>);
    }
    
    // Highlighted match
    parts.push(
      <mark 
        key={`mark-${i}`} 
        className="bg-accent/30 text-on-bg-primary px-0.5"
      >
        {text.slice(start, end + 1)}
      </mark>
    );
    
    lastIndex = end + 1;
  });

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(<span key="text-end">{text.slice(lastIndex)}</span>);
  }

  return <>{parts}</>;
}
