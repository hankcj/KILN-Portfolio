/**
 * Project Kiln Route
 *
 * Coming-soon page for the second-brain product.
 * Includes a working email signup that feeds into Mautic.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal, StaggerReveal } from '@/components/dom/ScrollReveal';
import { Metadata } from 'next';
import { ProjectSignupForm } from './ProjectSignupForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://studiokiln.io';

export const metadata: Metadata = {
  title: 'Project Kiln — KILN',
  description:
    'A second brain that thinks with you. Upload your ideas, notes, and fragments — AI finds the connections you can\'t see yet.',
  openGraph: {
    title: 'Project Kiln — KILN',
    description:
      'A second brain that thinks with you. Upload your ideas, notes, and fragments — AI finds the connections you can\'t see yet.',
    url: `${SITE_URL}/project`,
  },
  twitter: {
    card: 'summary',
    title: 'Project Kiln — KILN',
    description:
      'A second brain that thinks with you. Upload your ideas, notes, and fragments — AI finds the connections you can\'t see yet.',
  },
};

export default function ProjectPage() {
  return (
    <SimplePageShell
      currentPage="project"
      leftSideText="PROJECT_KILN"
      rightSideText="COMING_SOON"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <header className="mb-16 md:mb-24">
            <ScrollReveal>
              <div className="flex justify-between items-start mb-4">
                <p className="font-mono text-system text-on-surface-muted tracking-widest">
                  {'// PRODUCT_ANNOUNCEMENT'}
                </p>
                <p className="font-mono text-system text-accent">
                  STATUS: IN_DEVELOPMENT
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                PROJECT KILN
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body text-on-bg-tertiary max-w-2xl leading-relaxed">
                A second brain that thinks with you. Upload your ideas, notes, and
                fragments — AI finds the connections you can&apos;t see yet.
              </p>
            </ScrollReveal>
          </header>

          {/* Hero */}
          <section className="mb-16 md:mb-24">
            <ScrollReveal>
              <div className="relative border border-border-custom bg-bg-secondary p-8 md:p-16 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(250, 246, 240, 0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(250, 246, 240, 0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                    <span className="font-mono text-system text-accent">
                      LAUNCHING_2026
                    </span>
                  </div>

                  <h2 className="font-heading text-display-md md:text-display-lg text-on-bg-primary mb-6 max-w-3xl">
                    Your mind has structure.
                    <br />
                    <span className="text-on-bg-tertiary">
                      This tool makes it visible.
                    </span>
                  </h2>

                  <p className="text-body text-on-bg-secondary max-w-2xl mb-10 leading-relaxed">
                    Most note-taking tools are filing cabinets — they store, but they
                    don&apos;t think. Project Kiln ingests everything you capture and
                    surfaces the relationships between ideas that you&apos;d otherwise
                    miss. Think of it as an always-on research partner that reads
                    everything you write.
                  </p>

                  <a
                    href="#early-access"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
                  >
                    <span>REQUEST_EARLY_ACCESS</span>
                    <span>↓</span>
                  </a>
                </div>

                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent/30" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent/30" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent/30" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent/30" />
              </div>
            </ScrollReveal>
          </section>

          {/* How it works */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// HOW_IT_WORKS'}
              </p>
            </ScrollReveal>
            <StaggerReveal
              className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-custom"
              stagger={0.12}
            >
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">01</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-3">
                  Capture Everything
                </h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  Drop in notes, highlights, voice memos, bookmarks, PDFs, code
                  snippets — anything that lives in your head or your tabs. No
                  formatting rules. No folder hierarchies.
                </p>
              </div>

              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">02</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-3">
                  AI Maps the Connections
                </h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  Every piece of content is analyzed semantically. The system builds
                  a living knowledge graph — surfacing links between ideas across
                  time, context, and format that you&apos;d never find manually.
                </p>
              </div>

              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">03</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-3">
                  See Your Mind
                </h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  Explore an interactive node graph of your entire knowledge base.
                  Zoom into clusters, follow threads across months of thinking, and
                  discover patterns you didn&apos;t know were there.
                </p>
              </div>
            </StaggerReveal>
          </section>

          {/* Core capabilities */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// SYSTEM_CAPABILITIES'}
              </p>
            </ScrollReveal>
            <StaggerReveal
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-custom"
              stagger={0.1}
            >
              <CapabilityCard
                code="CAP.001"
                title="Semantic Knowledge Graph"
                description="Every note becomes a node. AI identifies thematic, conceptual, and temporal connections — then renders them in an explorable graph view."
              />
              <CapabilityCard
                code="CAP.002"
                title="Universal Capture"
                description="Text, images, audio, PDFs, URLs, code. Paste it, drag it, forward it. The system normalizes everything into a searchable, connectable format."
              />
              <CapabilityCard
                code="CAP.003"
                title="AI Synthesis"
                description="Ask questions across your entire archive. Get answers grounded in your own thinking — not the internet's. Summaries, contradictions, and blind spots surfaced automatically."
              />
              <CapabilityCard
                code="CAP.004"
                title="Private by Default"
                description="Your notes stay yours. End-to-end encryption. No training on your data. Local-first architecture with optional cloud sync."
              />
            </StaggerReveal>
          </section>

          {/* Who it's for */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// TARGET_USERS'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    role: 'RESEARCHERS',
                    desc: 'Who juggle hundreds of sources and need to find the thread between them — not just file them.',
                  },
                  {
                    role: 'FOUNDERS',
                    desc: 'Who think in fragments across meetings, voice notes, and late-night ideas. Need to turn noise into strategy.',
                  },
                  {
                    role: 'WRITERS & CREATORS',
                    desc: 'Who collect obsessively but struggle to synthesize. The graph shows you what your next piece is about.',
                  },
                ].map((item) => (
                  <div key={item.role} className="border border-border-muted p-6">
                    <p className="font-mono text-system text-accent mb-3">
                      {item.role}
                    </p>
                    <p className="text-small text-on-bg-tertiary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* Pricing direction */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// PRICING_DIRECTION'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="border border-border-muted p-8">
                <h2 className="font-heading text-h3 text-on-bg-primary mb-6">
                  SUBSCRIPTION_MODEL
                </h2>
                <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                  Project Kiln will be a paid subscription — similar to tools like
                  Obsidian Sync or Notion. A generous free tier for personal use,
                  with Pro and Team plans for heavier workloads and collaboration.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-bg-secondary p-4 border border-border-muted">
                    <p className="font-mono text-system text-accent mb-1">FREE</p>
                    <p className="text-small text-on-bg-tertiary">
                      Personal use. Local storage. Core graph features.
                    </p>
                  </div>
                  <div className="bg-bg-secondary p-4 border border-accent/30">
                    <p className="font-mono text-system text-accent mb-1">PRO</p>
                    <p className="text-small text-on-bg-tertiary">
                      Cloud sync. AI synthesis. Unlimited capture.
                    </p>
                  </div>
                  <div className="bg-bg-secondary p-4 border border-border-muted">
                    <p className="font-mono text-system text-accent mb-1">TEAM</p>
                    <p className="text-small text-on-bg-tertiary">
                      Shared graphs. Collaborative nodes. Admin controls.
                    </p>
                  </div>
                </div>
                <p className="font-mono text-system text-on-surface-muted mt-6">
                  {'>'} Early access members get founder pricing — locked in permanently.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* Early access signup */}
          <section
            id="early-access"
            className="mb-16 md:mb-24 border-t border-border-custom pt-16"
          >
            <ScrollReveal>
              <div className="bg-bg-secondary border border-border-muted p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                  <div className="max-w-xl">
                    <p className="font-mono text-system text-accent mb-2">
                      {'// REQUEST_EARLY_ACCESS'}
                    </p>
                    <h3 className="font-heading text-h3 text-on-bg-primary mb-3">
                      Get on the list
                    </h3>
                    <p className="text-body text-on-bg-tertiary leading-relaxed">
                      Join the waitlist for beta access, documentation previews, and
                      permanent founder pricing when we launch.
                    </p>
                  </div>

                  <ProjectSignupForm />
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Related links */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// RELATED_SYSTEMS'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-custom">
                <a
                  href="/work"
                  className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="font-mono text-system text-accent mb-1">
                      STUDIO_WORK
                    </p>
                    <p className="text-small text-on-bg-tertiary">
                      See what this studio has made
                    </p>
                  </div>
                  <span className="text-on-surface-muted group-hover:text-accent transition-colors">
                    →
                  </span>
                </a>

                <a
                  href="/signal"
                  className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="font-mono text-system text-accent mb-1">
                      SIGNAL_LOG
                    </p>
                    <p className="text-small text-on-bg-tertiary">
                      Essays on systems, design, and technology
                    </p>
                  </div>
                  <span className="text-on-surface-muted group-hover:text-accent transition-colors">
                    →
                  </span>
                </a>
              </div>
            </ScrollReveal>
          </section>

          {/* Footer info */}
          <div className="flex justify-between items-end pt-8 border-t border-border-muted">
            <div className="font-mono text-system text-on-surface-muted">
              V: PRE-ALPHA
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-system text-on-surface-muted">
                DEVELOPMENT_ACTIVE
              </span>
            </div>
            <div className="font-mono text-system text-on-surface-muted">
              EST: 2026
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}

function CapabilityCard({
  code,
  title,
  description,
}: {
  code: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-bg-primary p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-system text-accent">{code}</span>
        <div className="h-px bg-border-custom flex-1" />
      </div>
      <h3 className="font-heading text-h4 text-on-bg-primary mb-3">{title}</h3>
      <p className="text-small text-on-bg-tertiary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
