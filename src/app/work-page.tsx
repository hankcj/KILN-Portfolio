/**
 * Work Page Content
 * 
 * The work/archive page with output grid.
 * Uses PageShell for consistent navigation and decorations.
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PageShell } from '@/components/dom/PageShell';

export default function WorkPage() {
  const headerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from(gridRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <PageShell 
      currentPage="outputs"
      leftSideText="OUTPUT_ARCHIVE_V2.0"
      rightSideText="6 ITEMS INDEXED"
    >
      {/* Main content */}
      <div className="relative z-10 min-h-screen px-6 md:px-16 lg:px-24 py-32">
        <header ref={headerRef} className="mb-16 md:mb-24">
          <div className="flex justify-between items-start mb-4">
            <p className="font-mono text-system text-on-surface-muted tracking-widest">
              C  OUTPUT ARCHIVE
            </p>
            <p className="font-mono text-system text-on-surface-muted">
              VIEW: GRID
            </p>
          </div>
          <h1 className="font-heading text-display text-on-bg-primary mb-4">
            OUTPUTS
          </h1>
          <p className="text-body text-on-bg-tertiary max-w-xl">
            Outputs — not projects. A continuous practice of essays, systems, tools, 
            and experiments.
          </p>
        </header>
        
        {/* Output grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-custom">
          {[
            { id: '001', type: 'SYSTEM', status: 'PUBLISHED', title: 'Knowledge Graph', desc: 'An ontology-driven second brain for connecting ideas.' },
            { id: '002', type: 'ESSAY', status: 'PUBLISHED', title: 'The Slow Web', desc: 'On building digital spaces that respect attention.' },
            { id: '003', type: 'TOOL', status: 'BETA', title: 'Text Processor', desc: 'A brutalist writing environment with system aesthetics.' },
            { id: '004', type: 'VISUAL', status: 'PUBLISHED', title: 'Data Portraits', desc: 'Generative visualizations of personal data.' },
            { id: '005', type: 'EXPERIMENT', status: 'ONGOING', title: 'Living Documents', desc: 'Documents that evolve and respond to readers.' },
            { id: '006', type: 'SYSTEM', status: 'ARCHIVED', title: 'Early Prototypes', desc: 'First attempts at building thinking tools.' },
          ].map((item) => (
            <a 
              key={item.id}
              href={`/work/${item.id}`}
              className="group bg-bg-primary p-8 min-h-[320px] flex flex-col justify-between hover:bg-bg-secondary transition-all duration-300 border border-transparent hover:border-border-custom"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-system text-accent">{item.type}</span>
                <span className="font-mono text-system text-on-surface-muted">{item.status}</span>
              </div>
              <div>
                <div className="font-mono text-system text-on-surface-muted mb-2">
                  REF: {item.id}
                </div>
                <h3 className="font-heading text-h3 text-on-bg-primary group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-small text-on-bg-tertiary mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border-muted">
                <span className="font-mono text-system text-on-surface-muted group-hover:text-accent transition-colors">
                  {'// ACCESS →'}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom info */}
        <div className="flex justify-between items-end mt-16 pt-8 border-t border-border-muted">
          <div className="font-mono text-system text-on-surface-muted">
            TOTAL: 06 ENTRIES
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-system text-on-surface-muted">
              INDEXED
            </span>
          </div>
          <div className="font-mono text-system text-on-surface-muted">
            LAST_UPDATE: 2024.02.17
          </div>
        </div>
      </div>
    </PageShell>
  );
}
