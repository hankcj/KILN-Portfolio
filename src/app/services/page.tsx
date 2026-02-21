/**
 * Available Work Route
 * 
 * Selective system audits and builds. Not a service menu — 
 * a statement of what this studio debugs and ships.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal, StaggerReveal } from '@/components/dom/ScrollReveal';

export const metadata = {
  title: 'Available — KILN',
  description: 'Selective system audits and builds. Infrastructure for attention, tools that compound.',
};

export default function ServicesPage() {
  return (
    <SimplePageShell
      currentPage="services"
      leftSideText="AVAILABLE_Q2_2026"
      rightSideText="SELECTIVE_WORK"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <ScrollReveal>
              <div className="flex justify-between items-start mb-4">
                <p className="font-mono text-system text-on-surface-muted tracking-widest">
                  {'// CURRENT_STATUS'}
                </p>
                <p className="font-mono text-system text-accent">
                  ACCEPTING_INQUIRIES
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                AVAILABLE WORK
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body text-on-bg-tertiary max-w-2xl">
                Limited bandwidth for systems that need to outlast the next quarter. 
                Current focus: infrastructure for attention, tools that compound, 
                environments that don&apos;t extract.
              </p>
            </ScrollReveal>
          </header>

          {/* What Gets Built */}
          <section className="mb-16 md:mb-24">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                C  SYSTEM_TYPES
              </p>
            </ScrollReveal>
            <StaggerReveal className="space-y-px bg-border-custom" stagger={0.15}>
              
              <SystemBlock
                code="SYS.001"
                title="Design Systems"
                description="Component architectures that don't collapse under their own complexity."
                details={[
                  'Token systems with conceptual integrity',
                  'Documentation teams actually use',
                  'Onboarding as system design',
                  'Built to survive personnel changes'
                ]}
              />
              
              <SystemBlock
                code="SYS.002"
                title="Digital Environments"
                description="Interfaces that reward attention instead of extracting it."
                details={[
                  'Motion with mass and purpose',
                  'Typography as structural element',
                  'Performance as design constraint',
                  'Dark patterns explicitly excluded'
                ]}
              />
              
              <SystemBlock
                code="SYS.003"
                title="Internal Infrastructure"
                description="Workflows and tools that make teams more effective without adding overhead."
                details={[
                  "Publishing pipelines that don't bottleneck",
                  'Design-to-code workflows',
                  'Documentation systems',
                  'Custom tools when off-the-shelf optimizes for the wrong thing'
                ]}
              />
              
            </StaggerReveal>
          </section>

          {/* How We Work Together */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// APPROACH'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-heading text-h4 text-on-bg-primary mb-3">Audit First</h3>
                  <p className="text-small text-on-bg-tertiary leading-relaxed">
                    Two weeks to understand the system before touching it. Most problems 
                    are diagnosed wrong. The audit produces clarity—whether we work 
                    together after or not.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-h4 text-on-bg-primary mb-3">Embed or Direct</h3>
                  <p className="text-small text-on-bg-tertiary leading-relaxed">
                    Deep collaboration building alongside your team, or high-level 
                    direction reviewing architecture. Both require trust and a shared 
                    understanding of what good looks like.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-h4 text-on-bg-primary mb-3">Ship the Rationale</h3>
                  <p className="text-small text-on-bg-tertiary leading-relaxed">
                    Every system ships with written documentation—not just how it works, 
                    but why it was built this way. The thinking has to survive the handoff.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* When It Works */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// SELECTION_CRITERIA'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-bg-secondary p-8 border border-border-muted">
                <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                  The most productive collaborations share a few characteristics:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                      <span className="text-accent mt-0.5">{'>'}</span>
                      <span>The problem is worth sitting with before solving</span>
                    </li>
                    <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                      <span className="text-accent mt-0.5">{'>'}</span>
                      <span>Technical leadership understands the tradeoffs</span>
                    </li>
                    <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                      <span className="text-accent mt-0.5">{'>'}</span>
                      <span>Timelines respect the difficulty of good work</span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                      <span className="text-accent mt-0.5">{'>'}</span>
                      <span>Budget matches scope (no optimistic estimates)</span>
                    </li>
                    <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                      <span className="text-accent mt-0.5">{'>'}</span>
                      <span>Default configurations can be questioned</span>
                    </li>
                    <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                      <span className="text-accent mt-0.5">{'>'}</span>
                      <span>The system needs to outlast the current team</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Current Focus */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                C  ACTIVE_PROCESSES
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="border border-border-muted p-8">
                <p className="text-body text-on-bg-secondary leading-relaxed mb-4">
                  For Q2 2026, particularly interested in:
                </p>
                <ul className="space-y-2 text-small text-on-bg-tertiary">
                  <li className="flex items-start gap-3">
                    <span className="text-accent">{'>'}</span>
                    <span>Design systems for teams who care about conceptual integrity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">{'>'}</span>
                    <span>Publishing infrastructure that slows content down instead of speeding it up</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">{'>'}</span>
                    <span>Tools that help people think more clearly (not faster)</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </section>

          {/* CTA */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 p-8 bg-bg-secondary border border-border-muted">
                <div>
                  <p className="font-mono text-system text-accent mb-2">INITIATE_INQUIRY</p>
                  <p className="text-body text-on-bg-secondary">
                    Describe the system. What&apos;s broken? What&apos;s extracting more than it gives?
                  </p>
                </div>
                <a 
                  href="/intake"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors shrink-0"
                >
                  <span>START_CONVERSATION</span>
                  <span>→</span>
                </a>
              </div>
            </ScrollReveal>
          </section>

          {/* Footer info */}
          <div className="flex justify-between items-end pt-8 border-t border-border-muted">
            <div className="font-mono text-system text-on-surface-muted">
              RATE: PROJECT_BASED
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-system text-on-surface-muted">
                ACCEPTING_INQUIRIES
              </span>
            </div>
            <div className="font-mono text-system text-on-surface-muted">
              TZ: EST
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}

// System block component
function SystemBlock({ 
  code, 
  title, 
  description, 
  details
}: { 
  code: string;
  title: string;
  description: string;
  details: string[];
}) {
  return (
    <div className="bg-bg-primary p-8 md:p-10 hover-lift focus-ring">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-system text-accent">{code}</span>
            <div className="h-px bg-border-custom flex-1 max-w-[100px]" />
          </div>
          <h2 className="font-heading text-h2 text-on-bg-primary mb-4">{title}</h2>
          <p className="text-body text-on-bg-tertiary max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
        <div className="md:w-64 shrink-0">
          <p className="font-mono text-system text-on-surface-muted mb-3">SPECIFICATIONS</p>
          <ul className="space-y-2">
            {details.map((detail, i) => (
              <li key={i} className="text-small text-on-bg-secondary font-mono flex items-start gap-2">
                <span className="text-accent">{'>'}</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
