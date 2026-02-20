/**
 * System / Colophon Route
 * 
 * How this site is built, why it works this way, and what 
 * that says about building for the web in 2026.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal, StaggerReveal } from '@/components/dom/ScrollReveal';

export const metadata = {
  title: 'System — KILN',
  description: 'How this site is built, why it works this way, and what that says about building for the web.',
};

export default function SystemPage() {
  return (
    <SimplePageShell
      currentPage="system"
      leftSideText="SYS_DOCS_V2.0"
      rightSideText="48.8566° N 2.3522° E"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <ScrollReveal>
              <div className="flex justify-between items-start mb-4">
                <p className="font-mono text-system text-on-surface-muted tracking-widest">
                  {'// DOCUMENTATION'}
                </p>
                <p className="font-mono text-system text-on-surface-muted">
                  STATUS: OPERATIONAL
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
                How this site is built, why it works this way, and what 
                that says about building for the web in 2026.
              </p>
            </ScrollReveal>
          </header>

          {/* Philosophy */}
          <section className="mb-16 md:mb-24">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// PHILOSOPHY'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="prose prose-invert max-w-none">
                <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                  Most digital infrastructure is built to extract. Attention, time, data—converted 
                  to metrics that optimize for engagement, not meaning. The default configuration 
                  thins attention, flattens taste, and makes it easy to confuse motion with progress.
                </p>
                <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                  This site runs <span className="text-on-bg-primary">different processes</span>. 
                  It is built for return visits, not discovery. The assumption is that people 
                  arrive with intent, and that the interface should preserve what matters rather 
                  than extract what it can.
                </p>
                <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                  The dark theme is not a preference—it is a material choice. Dark interfaces 
                  recede; they allow content to sit forward. The brutalist aesthetic privileges 
                  structure over decoration because structure is what survives. Motion is treated 
                  as mass: heavy, damped, deliberate. Nothing moves just to impress.
                </p>
                <p className="text-body text-on-bg-secondary leading-relaxed">
                  The goal is infrastructure that feels <span className="text-on-bg-primary">inhabited</span>, 
                  not performative. Systems that can be reread, reused, referenced later. 
                  The archive matters more than the timeline.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* Design Principles */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                C  PRINCIPLES
              </p>
            </ScrollReveal>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-custom" stagger={0.1}>
              
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">01</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-3">The Archive Matters More Than the Timeline</h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  Work is organized for findability and reference, not chronological 
                  consumption. Essays are categorized by type. Projects include context 
                  on how they were made. Everything should be useful a year from now.
                </p>
              </div>

              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">02</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-3">Preserve Friction Where It Creates Depth</h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  The terminal navigation requires learning. Transitions take time. 
                  These are not bugs—they are <span className="text-on-bg-secondary">intentional resistances</span> 
                  against the assumption that faster is always better. Speed often optimizes 
                  for the wrong thing.
                </p>
              </div>

              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">03</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-3">Systems Over Pages</h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  This is not a collection of pages but a coherent environment. 
                  Navigation, typography, motion, and color follow consistent rules 
                  that allow the site to feel like a single object rather than 
                  stitched-together templates. Internal consistency is a feature.
                </p>
              </div>

              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">04</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-3">Canonical Home</h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  studiokiln.io is the source of truth. Essays published elsewhere 
                  resolve here. Products link back. Social platforms are distribution, 
                  not identity. The archive is the point.
                </p>
              </div>

            </StaggerReveal>
          </section>

          {/* Technical Specifications */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                C  IMPLEMENTATION
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-body text-on-bg-tertiary mb-8 max-w-2xl">
                The following specifications exist not to impress but to document. 
                They are the result of choices made in service of the principles above.
              </p>
            </ScrollReveal>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-custom" stagger={0.1}>
              
              {/* Architecture */}
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <h2 className="font-heading text-h3 text-on-bg-primary">Foundation</h2>
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

              {/* Infrastructure */}
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <h2 className="font-heading text-h3 text-on-bg-primary">Infrastructure</h2>
                </div>
                <ul className="space-y-4 text-small font-mono">
                  <SpecRow label="FRONTEND" value="Vercel (Edge)" />
                  <SpecRow label="CMS" value="Ghost (AWS EC2)" />
                  <SpecRow label="EMAIL" value="AWS SES + Listmonk" />
                  <SpecRow label="PAYMENTS" value="Stripe" />
                  <SpecRow label="DOMAIN" value="kiln.studio" />
                </ul>
              </div>

              {/* Services */}
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <h2 className="font-heading text-h3 text-on-bg-primary">Services</h2>
                </div>
                <ul className="space-y-4 text-small font-mono">
                  <SpecRow label="SSL" value="Let's Encrypt" />
                  <SpecRow label="CDN" value="Cloudflare" />
                  <SpecRow label="STORAGE" value="AWS S3" />
                  <SpecRow label="INTAKE" value="Custom (TBD)" />
                  <SpecRow label="ANALYTICS" value="None (Intentionally)" />
                </ul>
              </div>
            </StaggerReveal>
          </section>

          {/* Typography */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// TYPOGRAPHY'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="prose prose-invert max-w-none">
                <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                  <span className="font-heading text-on-bg-primary">Averia Serif Libre</span> — 
                  an imperfect, slightly broken serif that suggests institutional authority 
                  with human fallibility. It carries the weight of long-form text without 
                  feeling corporate or trendy.
                </p>
                <p className="text-body text-on-bg-secondary leading-relaxed">
                  <span className="font-body text-on-bg-primary">Inter</span> for system text 
                  and UI elements. Neutral, legible, designed for screens. The pairing creates 
                  hierarchy through contrast in texture rather than just size or weight.
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
                version="V2.1.0" 
                date="2026.02.20" 
                changes={[
                  'Brand alignment: optimization critique, systems-forward voice',
                  'System documentation: philosophy before implementation',
                  'Infrastructure: AWS SES, Listmonk, Stripe integration prepared',
                  'Added social links and external system connections'
                ]} 
              />
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

          {/* Connect */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
              C  CONNECT
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-custom">
              <a 
                href="/rss.xml" 
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">RSS</p>
                  <p className="text-small text-on-bg-tertiary">Subscribe to transmissions</p>
                </div>
                <span className="text-on-surface-muted group-hover:text-accent transition-colors">→</span>
              </a>
              
              <a 
                href="https://hankcj.substack.com"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">SUBSTACK</p>
                  <p className="text-small text-on-bg-tertiary">KILN — syndicated essays</p>
                </div>
                <span className="text-on-surface-muted group-hover:text-accent transition-colors">↗</span>
              </a>
              
              <a 
                href="https://github.com/hankcj"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">GITHUB</p>
                  <p className="text-small text-on-bg-tertiary">Code and open source</p>
                </div>
                <span className="text-on-surface-muted group-hover:text-accent transition-colors">↗</span>
              </a>
              
              <a 
                href="https://instagram.com/hankcj"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">INSTAGRAM</p>
                  <p className="text-small text-on-bg-tertiary">Process and studio</p>
                </div>
                <span className="text-on-surface-muted group-hover:text-accent transition-colors">↗</span>
              </a>
            </div>
            
            {/* Email */}
            <div className="mt-6">
              <a 
                href="mailto:hello@kiln.studio"
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between border border-border-custom"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">EMAIL</p>
                  <p className="text-small text-on-bg-tertiary">Direct inquiries: hello@kiln.studio</p>
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
              STATUS: OPERATIONAL
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-system text-on-surface-muted">
                ARCHIVE_ACTIVE
              </span>
            </div>
            <div className="font-mono text-system text-on-surface-muted">
              REF: SYS.002
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
