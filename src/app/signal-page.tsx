/**
 * Signal Page Component
 * 
 * Journal index displaying posts from Ghost CMS.
 * Uses PageShell for consistent navigation and decorations.
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { PageShell } from '@/components/dom/PageShell';
import { SignalSearch } from '@/components/dom/SignalSearch';
import { SubscribeForm } from '@/components/dom/SubscribeForm';
import { Toast } from '@/components/dom/Toast';
import type { GhostPost } from '@/lib/ghost';

interface SignalPageProps {
  posts: GhostPost[];
}

function formatDateCode(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function SignalPage({ posts }: SignalPageProps) {
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const handleRssClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    const rssUrl = `${window.location.origin}/rss.xml`;
    
    try {
      await navigator.clipboard.writeText(rssUrl);
      setToastVisible(true);
    } catch (err) {
      // Fallback: open the RSS in a new tab if clipboard fails
      window.open(rssUrl, '_blank');
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from(listRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.3,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <PageShell 
      currentPage="signal"
      leftSideText="TRANSMISSION_LOG"
      rightSideText={`${posts.length.toString().padStart(2, '0')} ENTRIES LOGGED`}
    >
      {/* Main content */}
      <div className="relative z-10 min-h-screen px-6 md:px-16 lg:px-24 py-32">
        <header ref={headerRef} className="mb-16 md:mb-24">
          <div className="flex justify-between items-start mb-4">
            <p className="font-mono text-system text-on-surface-muted tracking-widest">
              C  TRANSMISSION LOG
            </p>
            <p className="font-mono text-system text-on-surface-muted">
              VIEW: CHRONOLOGICAL
            </p>
          </div>
          <h1 className="font-heading text-display text-on-bg-primary mb-4">
            SIGNAL
          </h1>
          <p className="text-body text-on-bg-tertiary max-w-xl mb-8">
            Essays, research, and long-form writing on systems, design, and technology. 
            Published here and syndicated to Substack.
          </p>
          
          {/* Search */}
          <SignalSearch posts={posts} />
        </header>
        
        {/* Posts list */}
        {posts.length > 0 ? (
          <div ref={listRef} className="space-y-px bg-border-custom">
            {posts.map((post, index) => (
              <a 
                key={post.id}
                href={`/signal/${post.slug}`}
                className="block bg-bg-primary p-8 group hover:bg-bg-secondary border border-transparent hover:border-border-custom hover-lift focus-ring"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {post.feature_image && (
                    <div className="w-full max-w-40 md:w-40 shrink-0 aspect-[16/10] relative rounded overflow-hidden border border-border-muted bg-bg-secondary">
                      <Image
                        src={post.feature_image}
                        alt=""
                        fill
                        className="object-cover group-hover:opacity-90 transition-opacity"
                        sizes="(max-width: 768px) 100vw, 10rem"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="font-mono text-system text-accent">
                        #{String(posts.length - index).padStart(3, '0')}
                      </span>
                      {post.featured && (
                        <span className="font-mono text-system text-on-surface-muted">
                          ★ FEATURED
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-h3 text-on-bg-primary group-hover:text-accent transition-colors mb-3">
                      {post.title}
                    </h3>
                    {post.custom_excerpt && (
                      <p className="text-body text-on-bg-tertiary leading-relaxed max-w-2xl">
                        {post.custom_excerpt}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag.id}
                            className="font-mono text-system text-on-surface-muted px-2 py-1 border border-border-muted"
                          >
                            {tag.name.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 shrink-0 md:text-right">
                    <span className="font-mono text-system text-on-surface-muted">
                      {formatDateCode(post.published_at)}
                    </span>
                    <span className="font-mono text-system text-on-surface-muted">
                      {post.reading_time} MIN READ
                    </span>
                    {post.primary_author && (
                      <span className="font-mono text-system text-on-bg-secondary">
                        BY {post.primary_author.name.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Read indicator */}
                <div className="mt-6 pt-4 border-t border-border-muted flex justify-between items-center">
                  <span className="font-mono text-system text-on-surface-muted group-hover:text-accent transition-colors">
                    {'// READ_TRANSMISSION →'}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-border-muted">
            <p className="font-mono text-system text-on-surface-muted mb-4">
              {'// NO_TRANSMISSIONS_DETECTED'}
            </p>
            <p className="text-body text-on-bg-tertiary">
              Check back soon for new essays and writings.
            </p>
          </div>
        )}

        {/* Bottom info */}
        <div className="flex justify-between items-end mt-16 pt-8 border-t border-border-muted">
          <div className="font-mono text-system text-on-surface-muted">
            TOTAL: {posts.length.toString().padStart(2, '0')} ENTRIES
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-system text-on-surface-muted">
              RECEIVING
            </span>
          </div>
          <div className="font-mono text-system text-on-surface-muted">
            Email via Mautic; also on Substack (RSS)
          </div>
        </div>

        {/* RSS / Subscribe */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={handleRssClick}
            className="font-mono text-system text-on-surface-muted hover:text-accent transition-colors inline-flex items-center gap-2 group"
          >
            <span>{'// SUBSCRIBE_VIA_RSS'}</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </button>
          <p className="font-mono text-xs text-on-surface-muted/50">
            Click to copy feed URL
          </p>
          {process.env.NEXT_PUBLIC_MAUTIC_FORM_URL && (
            <a
              href={process.env.NEXT_PUBLIC_MAUTIC_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-system text-on-surface-muted hover:text-accent transition-colors inline-flex items-center gap-2"
            >
              <span>{'// SUBSCRIBE_VIA_EMAIL'}</span>
              <span>↗</span>
            </a>
          )}
        </div>

        {/* Embedded Subscribe Form (shown when enabled) */}
        {process.env.NEXT_PUBLIC_ENABLE_EMBEDDED_SUBSCRIBE === 'true' && (
          <div className="mt-12 max-w-md mx-auto">
            <SubscribeForm />
          </div>
        )}

      </div>

      {/* Copy confirmation toast */}
      <Toast 
        message="RSS URL copied to clipboard"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
        duration={2500}
      />
    </PageShell>
  );
}
