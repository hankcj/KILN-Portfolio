/**
 * Services Route
 * 
 * Professional offerings and collaboration opportunities.
 * Systematic approach to client work.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal, StaggerReveal } from '@/components/dom/ScrollReveal';

export const metadata = {
  title: 'Services — KILN',
  description: 'Design systems, creative direction, and digital architecture. Available for select projects.',
};

export default function ServicesPage() {
  return (
    <SimplePageShell
      currentPage="services"
      leftSideText="AVAILABLE_V1.0"
      rightSideText="SELECTIVE_ENGAGEMENT"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <ScrollReveal>
              <div className="flex justify-between items-start mb-4">
                <p className="font-mono text-system text-on-surface-muted tracking-widest">
                  {'// SERVICE_MANIFEST'}
                </p>
                <p className="font-mono text-system text-accent">
                  STATUS: ACCEPTING_INQUIRIES
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                SERVICES
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body text-on-bg-tertiary max-w-2xl">
                Design systems, creative direction, and digital architecture. 
                Selective engagement with teams building meaningful systems.
              </p>
            </ScrollReveal>
          </header>

          {/* Primary Services */}
          <section className="mb-16 md:mb-24">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                C  PRIMARY_SERVICES
              </p>
            </ScrollReveal>
            <StaggerReveal className="space-y-px bg-border-custom" stagger={0.15}>
              
              <ServiceBlock
                code="SVC.001"
                title="Design Systems"
                description="Comprehensive component architectures, token systems, and documentation for scaling product teams."
                capabilities={[
                  'Component library architecture',
                  'Design token specification',
                  'Documentation systems',
                  'Team onboarding protocols'
                ]}
              />
              
              <ServiceBlock
                code="SVC.002"
                title="Creative Direction"
                description="Visual systems and experiential design for digital environments that demand attention."
                capabilities={[
                  'Visual identity systems',
                  'Motion design direction',
                  'Environmental design',
                  'Brand architecture'
                ]}
              />
              
              <ServiceBlock
                code="SVC.003"
                title="Digital Architecture"
                description="Technical foundation and frontend infrastructure for performance-critical applications."
                capabilities={[
                  'Frontend architecture',
                  'Performance optimization',
                  'Animation systems',
                  'Technical direction'
                ]}
              />
              
            </StaggerReveal>
          </section>

          {/* Engagement Models */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                C  ENGAGEMENT_MODELS
              </p>
            </ScrollReveal>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-custom" stagger={0.1}>
              
              <div className="bg-bg-primary p-8 hover-lift focus-ring">
                <p className="font-mono text-system text-accent mb-4">MODEL_A</p>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-4">System Audit</h3>
                <p className="text-small text-on-bg-tertiary mb-6">
                  2-3 week engagement. Comprehensive analysis of existing systems with actionable recommendations.
                </p>
                <ul className="space-y-2 text-small font-mono text-on-surface-muted">
                  <li>{'> '} Heuristic evaluation</li>
                  <li>{'> '} Performance audit</li>
                  <li>{'> '} Strategic roadmap</li>
                </ul>
              </div>
              
              <div className="bg-bg-primary p-8 hover-lift focus-ring">
                <p className="font-mono text-system text-accent mb-4">MODEL_B</p>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-4">Embedded</h3>
                <p className="text-small text-on-bg-tertiary mb-6">
                  3-6 month engagement. Deep integration with your team to build and implement systems.
                </p>
                <ul className="space-y-2 text-small font-mono text-on-surface-muted">
                  <li>{'> '} System architecture</li>
                  <li>{'> '} Team training</li>
                  <li>{'> '} Implementation</li>
                </ul>
              </div>
              
              <div className="bg-bg-primary p-8 hover-lift focus-ring">
                <p className="font-mono text-system text-accent mb-4">MODEL_C</p>
                <h3 className="font-heading text-h4 text-on-bg-primary mb-4">Direction</h3>
                <p className="text-small text-on-bg-tertiary mb-6">
                  Ongoing advisory. High-level creative and technical direction for evolving products.
                </p>
                <ul className="space-y-2 text-small font-mono text-on-surface-muted">
                  <li>{'> '} Strategic oversight</li>
                  <li>{'> '} Quality assurance</li>
                  <li>{'> '} Team mentorship</li>
                </ul>
              </div>
              
            </StaggerReveal>
          </section>

          {/* Process */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// OPERATIONAL_PROTOCOL'}
              </p>
            </ScrollReveal>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-4 gap-4" stagger={0.08}>
              {[
                { step: '01', title: 'Inquiry', desc: 'Initial contact and scope definition' },
                { step: '02', title: 'Assessment', desc: 'Feasibility and fit evaluation' },
                { step: '03', title: 'Proposal', desc: 'Detailed engagement terms' },
                { step: '04', title: 'Execution', desc: 'Collaborative system building' },
              ].map((item) => (
                <div key={item.step} className="border border-border-muted p-6">
                  <p className="font-mono text-system text-accent mb-2">{item.step}</p>
                  <h4 className="font-heading text-h4 text-on-bg-primary mb-2">{item.title}</h4>
                  <p className="text-small text-on-bg-tertiary">{item.desc}</p>
                </div>
              ))}
            </StaggerReveal>
          </section>

          {/* Selection Criteria */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// SELECTION_CRITERIA'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-bg-secondary p-8 border border-border-muted">
              <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                Not every project is a fit. The most productive engagements share these characteristics:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>Teams building systems, not one-off campaigns</span>
                  </li>
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>Technical leadership committed to craft</span>
                  </li>
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>Timelines that respect thoughtful work</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>Budget aligned with scope and quality</span>
                  </li>
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>Willingness to challenge conventions</span>
                  </li>
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>Long-term thinking over quick fixes</span>
                  </li>
                </ul>
                </div>
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
                  Tell me about your system. What&apos;s broken? What needs building?
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
              TZ: CET/EST
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}

// Service block component
function ServiceBlock({ 
  code, 
  title, 
  description, 
  capabilities 
}: { 
  code: string;
  title: string;
  description: string;
  capabilities: string[];
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
          <p className="font-mono text-system text-on-surface-muted mb-3">CAPABILITIES</p>
          <ul className="space-y-2">
            {capabilities.map((cap, i) => (
              <li key={i} className="text-small text-on-bg-secondary font-mono flex items-start gap-2">
                <span className="text-accent">{'>'}</span>
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
