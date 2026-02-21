/**
 * System / Colophon Route
 * 
 * Technical documentation, system diagnostics, and environment context.
 * The system's own source code — exposed.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal, StaggerReveal } from '@/components/dom/ScrollReveal';

export const metadata = {
  title: 'System — KILN',
  description: 'Technical documentation, system diagnostics, and environment context.',
};

export default function SystemPage() {
  return (
    <SimplePageShell
      currentPage="system"
      leftSideText="SYS_DOCS_V1.0"
      rightSideText="48.8566° N 2.3522° E"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <ScrollReveal>
              <div className="flex justify-between items-start mb-4">
                <p className="font-mono text-system text-on-surface-muted tracking-widest">
                  {'// SYSTEM DIAGNOSTIC'}
                </p>
                <p className="font-mono text-system text-on-surface-muted">
                  STATUS: ONLINE
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                SYSTEM
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body text-on-bg-tertiary max-w-2xl">
                Technical specifications, environment variables, and operational parameters. 
                This is the machine that builds the machine.
              </p>
            </ScrollReveal>
          </header>

          {/* System Specs Grid */}
          <section className="mb-16 md:mb-24">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                C  SYSTEM_SPECIFICATIONS
              </p>
            </ScrollReveal>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-custom" stagger={0.1}>
              
              {/* Architecture */}
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <h2 className="font-heading text-h3 text-on-bg-primary">Architecture</h2>
                </div>
                <ul className="space-y-4 text-small font-mono">
                  <SpecRow label="FRAMEWORK" value="Next.js 14 (App Router)" />
                  <SpecRow label="LANGUAGE" value="TypeScript (Strict)" />
                  <SpecRow label="STYLING" value="Tailwind CSS" />
                  <SpecRow label="CONTENT" value="Ghost CMS + MDX" />
                  <SpecRow label="BUILD" value="Static Export (SSG)" />
                </ul>
              </div>

              {/* Experience Layer */}
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <h2 className="font-heading text-h3 text-on-bg-primary">Experience</h2>
                </div>
                <ul className="space-y-4 text-small font-mono">
                  <SpecRow label="3D_ENGINE" value="React Three Fiber" />
                  <SpecRow label="MOTION" value="GSAP + ScrollTrigger" />
                  <SpecRow label="STATE" value="Zustand" />
                  <SpecRow label="SCROLL" value="Lenis (Smooth)" />
                  <SpecRow label="TYPE" value="Averia Serif + Inter" />
                </ul>
              </div>

              {/* Deployment */}
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <h2 className="font-heading text-h3 text-on-bg-primary">Deployment</h2>
                </div>
                <ul className="space-y-4 text-small font-mono">
                  <SpecRow label="HOST" value="Self-Hosted / Edge" />
                  <SpecRow label="CDN" value="Vercel / Cloudflare" />
                  <SpecRow label="CMS" value="Ghost (Self-Hosted)" />
                  <SpecRow label="DOMAIN" value="kiln.studio" />
                  <SpecRow label="SSL" value="Let's Encrypt" />
                </ul>
              </div>

              {/* Performance */}
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <h2 className="font-heading text-h3 text-on-bg-primary">Performance</h2>
                </div>
                <ul className="space-y-4 text-small font-mono">
                  <SpecRow label="STRATEGY" value="ISR (60s Revalidate)" />
                  <SpecRow label="BUNDLE" value="~120KB First Load" />
                  <SpecRow label="FONTS" value="Google Fonts (Subset)" />
                  <SpecRow label="IMAGES" value="WebP / Responsive" />
                  <SpecRow label="ACCESSIBILITY" value="WCAG 2.1 AA" />
                </ul>
              </div>
            </StaggerReveal>
          </section>

          {/* Colophon */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// COLOPHON'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="prose prose-invert max-w-none">
              <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                This site was designed and built as a digital environment — a space that rewards 
                attention and functions as a destination for people who arrive with intent. 
                It is not optimized for mass discovery or rapid conversion.
              </p>
              <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                The visual language draws from brutalist design principles and scientific 
                diagram aesthetics. Motion is treated as mass — heavy, damped, and deliberate. 
                Every animation serves a purpose; nothing is decorative without function.
              </p>
              <p className="text-body text-on-bg-secondary leading-relaxed">
                Typography pairs <span className="font-heading text-on-bg-primary">Averia Serif Libre</span> — 
                an imperfect, slightly broken serif that suggests institutional authority with human fallibility — 
                with <span className="font-body text-on-bg-primary">Inter</span> for system text and UI elements.
              </p>
              </div>
            </ScrollReveal>
          </section>

          {/* Changelog */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                C  CHANGELOG
              </p>
            </ScrollReveal>
            <StaggerReveal className="space-y-px bg-border-custom" stagger={0.15}>
              <ChangelogEntry 
                version="V2.0.0" 
                date="2024.02.17" 
                changes={[
                  'Migrated content to Ghost CMS',
                  'Added /signal publishing platform',
                  'Implemented ISR for static generation',
                  'Unified page shell components'
                ]} 
              />
              <ChangelogEntry 
                version="V1.1.0" 
                date="2024.02.01" 
                changes={[
                  'Added microfiche transition effects',
                  'Implemented system clock & grain effects',
                  'Refined motion damping across pages'
                ]} 
              />
              <ChangelogEntry 
                version="V1.0.0" 
                date="2024.01.15" 
                changes={[
                  'Initial release',
                  'Home, Work, Signal routes',
                  'WebGL entrance scene',
                  'Dark theme implementation'
                ]} 
              />
            </StaggerReveal>
          </section>

          {/* Feeds & Connect */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
              C  EXTERNAL_SYSTEMS
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-custom">
              <a 
                href="/rss.xml" 
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">RSS_FEED</p>
                  <p className="text-small text-on-bg-tertiary">Feed for readers and syndication</p>
                </div>
                <span className="text-on-surface-muted group-hover:text-accent transition-colors">→</span>
              </a>
              {process.env.NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL && (
                <a 
                  href={process.env.NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="font-mono text-system text-accent mb-1">SIGNAL_EMAIL</p>
                    <p className="text-small text-on-bg-tertiary">Subscribe to transmissions</p>
                  </div>
                  <span className="text-on-surface-muted group-hover:text-accent transition-colors">↗</span>
                </a>
              )}
              <a 
                href="https://yourname.substack.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">SUBSTACK</p>
                  <p className="text-small text-on-bg-tertiary">Discovery and reading (RSS)</p>
                </div>
                <span className="text-on-surface-muted group-hover:text-accent transition-colors">↗</span>
              </a>
              <a 
                href="mailto:hello@kiln.studio"
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">INQUIRY</p>
                  <p className="text-small text-on-bg-tertiary">Direct channel</p>
                </div>
                <span className="text-on-surface-muted group-hover:text-accent transition-colors">→</span>
              </a>
            </div>
          </section>

          {/* Acknowledgments */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
              {'// ACKNOWLEDGMENTS'}
            </p>
            <p className="text-small text-on-bg-tertiary leading-relaxed font-mono">
              Built with gratitude for the open source ecosystem. Special thanks to the teams behind 
              Next.js, React Three Fiber, GSAP, and Ghost. Typography by Google Fonts. 
              Hosted on infrastructure maintained by countless unnamed engineers.
            </p>
          </section>

          {/* Footer info */}
          <div className="flex justify-between items-end pt-8 border-t border-border-muted">
            <div className="font-mono text-system text-on-surface-muted">
              STATUS: ONLINE
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-system text-on-surface-muted">
                OPERATIONAL
              </span>
            </div>
            <div className="font-mono text-system text-on-surface-muted">
              REF: SYS.001
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}

// Component for specification rows
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between items-center">
      <span className="text-on-surface-muted">{label}</span>
      <span className="text-on-bg-secondary text-right">{value}</span>
    </li>
  );
}

// Component for changelog entries
function ChangelogEntry({ 
  version, 
  date, 
  changes 
}: { 
  version: string; 
  date: string; 
  changes: string[];
}) {
  return (
    <div className="bg-bg-primary p-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-system text-accent">{version}</span>
          <span className="font-mono text-system text-on-surface-muted">{date}</span>
        </div>
        <div className="w-2 h-2 bg-accent/50 rounded-full" />
      </div>
      <ul className="space-y-2">
        {changes.map((change, i) => (
          <li key={i} className="text-small text-on-bg-secondary font-mono flex items-start gap-3">
            <span className="text-accent mt-1">{'>'}</span>
            <span>{change}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
