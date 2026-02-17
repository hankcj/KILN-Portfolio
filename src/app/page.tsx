/**
 * Entrance / Experience Route
 * 
 * The main entry point. Not a typical portfolio homepage.
 * A digital brutalist manifesto that happens to contain a portfolio.
 */

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background atmospheric elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Large gradient orb - represents the kiln */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
        
        {/* Grid lines for structure */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-px bg-on-bg-primary absolute left-[10%]" />
          <div className="h-full w-px bg-on-bg-primary absolute left-[50%]" />
          <div className="h-full w-px bg-on-bg-primary absolute left-[90%]" />
          <div className="w-full h-px bg-on-bg-primary absolute top-[15%]" />
          <div className="w-full h-px bg-on-bg-primary absolute top-[85%]" />
        </div>
      </div>

      {/* UNORTHODOX NAVIGATION - scattered, not in a bar */}
      <nav className="fixed inset-0 z-50 pointer-events-none">
        {/* Top left - Identity */}
        <Link 
          href="/" 
          className="pointer-events-auto absolute top-8 left-8 font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors"
        >
          K
        </Link>

        {/* Top right - Work link */}
        <Link 
          href="/work" 
          className="pointer-events-auto absolute top-8 right-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors"
        >
          C  WORK
        </Link>

        {/* Bottom left - Signal */}
        <Link 
          href="/signal" 
          className="pointer-events-auto absolute bottom-8 left-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors"
        >
          C  SIGNAL
        </Link>

        {/* Bottom right - System */}
        <Link 
          href="/system" 
          className="pointer-events-auto absolute bottom-8 right-8 font-mono text-system text-on-surface-muted hover:text-on-bg-primary transition-colors"
        >
          // SYSTEM
        </Link>

        {/* Vertical side nav - left middle */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="font-mono text-system text-on-surface-muted writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
            PORTFOLIO_V1.0.0
          </div>
        </div>

        {/* Vertical side nav - right middle */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="font-mono text-system text-on-surface-muted" style={{ writingMode: 'vertical-rl' }}>
            48.8566° N 2.3522° E
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT - Asymmetric brutalist layout */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-32">
        
        {/* TOP SECTION - System header */}
        <div className="flex justify-between items-start">
          <div className="font-mono text-system text-on-surface-muted">
            // BOOT SEQUENCE
          </div>
          <div className="font-mono text-system text-on-surface-muted text-right">
            EST. 2024<br />
            STATUS: ONLINE
          </div>
        </div>

        {/* CENTER - The massive KILN typography */}
        <div className="relative my-auto">
          {/* Background giant text - partially obscured */}
          <div className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 pointer-events-none select-none">
            <span className="font-heading text-[20vw] md:text-[25vw] text-on-bg-primary/[0.03] leading-none tracking-tighter">
              K
            </span>
          </div>

          {/* Main title block */}
          <div className="relative">
            {/* Line above */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-accent w-16" />
              <span className="font-mono text-system text-accent">
                ENTRY POINT
              </span>
            </div>

            {/* KILN - massive display */}
            <h1 className="font-heading text-display-xl md:text-[12rem] lg:text-[16rem] text-on-bg-primary leading-[0.85] tracking-tight">
              KILN
            </h1>

            {/* Subtitle - overlapping style */}
            <div className="mt-2 md:mt-0 md:absolute md:top-4 md:right-0 lg:right-20">
              <p className="font-heading text-h3 md:text-h2 text-on-bg-tertiary max-w-xs">
                digital<br />museum
              </p>
            </div>

            {/* Line below */}
            <div className="flex items-center gap-4 mt-8">
              <span className="font-mono text-system text-on-surface-muted">
                // LOADING COMPLETE
              </span>
              <div className="h-px bg-border-custom flex-1 max-w-xs" />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - Three column info layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mt-auto">
          {/* Column 1 - What this is */}
          <div className="space-y-2">
            <div className="font-mono text-system text-on-surface-muted mb-2">
              C  TYPE
            </div>
            <p className="text-small text-on-bg-secondary leading-relaxed">
              Personal studio & publishing space. Not a portfolio. Not a blog. 
              A continuous practice of systems, essays, and experiments.
            </p>
          </div>

          {/* Column 2 - Current status */}
          <div className="space-y-2">
            <div className="font-mono text-system text-on-surface-muted mb-2">
              C  STATUS
            </div>
            <p className="text-small text-on-bg-secondary leading-relaxed">
              Currently building systems that think. Writing about the intersection 
              of technology, design, and human experience.
            </p>
          </div>

          {/* Column 3 - Entry CTA */}
          <div className="space-y-2">
            <div className="font-mono text-system text-on-surface-muted mb-2">
              C  NAVIGATION
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/work" className="text-small text-on-bg-primary hover:text-accent transition-colors group flex items-center gap-2">
                <span className="text-accent">→</span> Browse outputs
              </Link>
              <Link href="/signal" className="text-small text-on-bg-primary hover:text-accent transition-colors group flex items-center gap-2">
                <span className="text-accent">→</span> Read signal
              </Link>
              <Link href="/system" className="text-small text-on-bg-primary hover:text-accent transition-colors group flex items-center gap-2">
                <span className="text-accent">→</span> Inspect system
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-between items-end mt-16 pt-8 border-t border-border-muted">
          <div className="font-mono text-system text-on-surface-muted">
            REF: 001-A
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-system text-on-surface-muted">
              LIVE
            </span>
          </div>
          <div className="font-mono text-system text-on-surface-muted">
            SYS_RDY
          </div>
        </div>
      </div>

      {/* Decorative corner brackets */}
      <div className="fixed top-8 left-8 w-4 h-4 border-l border-t border-accent/30 pointer-events-none" />
      <div className="fixed top-8 right-8 w-4 h-4 border-r border-t border-accent/30 pointer-events-none" />
      <div className="fixed bottom-8 left-8 w-4 h-4 border-l border-b border-accent/30 pointer-events-none" />
      <div className="fixed bottom-8 right-8 w-4 h-4 border-r border-b border-accent/30 pointer-events-none" />
    </main>
  );
}
