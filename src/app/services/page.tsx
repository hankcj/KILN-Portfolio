/**
 * Available Work Route
 * 
 * Selective services. Not a service menu —
 * a statement of what this studio builds and fixes.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal, StaggerReveal } from '@/components/dom/ScrollReveal';

export const metadata = {
  title: 'Available — KILN',
  description: 'Limited bandwidth for projects that need to hold up under real traffic, real budgets, and real attention.',
};

export default function ServicesPage() {
  return (
    <SimplePageShell
      currentPage="services"
      leftSideText="SELECTIVE_WORK"
      rightSideText="LIMITED_INQUIRIES"
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
                  ACCEPTING: LIMITED INQUIRIES
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                SELECTIVE WORK
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body text-on-bg-tertiary max-w-2xl leading-relaxed">
                Limited bandwidth for projects that need to hold up under real traffic, 
                real budgets, and real attention.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-body text-on-bg-tertiary max-w-2xl mt-3 leading-relaxed">
                If you need a clean story, a site that converts, or paid social that stops 
                bleeding, this is the lane.
              </p>
            </ScrollReveal>
          </header>

          {/* Services */}
          <section className="mb-16 md:mb-24">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <p className="font-mono text-system text-on-surface-muted tracking-widest">
                  {'// WHAT I DO'}
                </p>
                <div className="h-px bg-border-custom flex-1" />
                <p className="font-mono text-system text-on-surface-muted tracking-widest">
                  SYSTEM_TYPES
                </p>
              </div>
            </ScrollReveal>
            <StaggerReveal className="space-y-px bg-border-custom" stagger={0.15}>
              
              <ServiceCard
                code="SYS.001"
                title="Website Design + Build"
                description="Websites and landing pages that look intentional and earn their keep."
                deliverables={[
                  'Structure + page architecture (what exists, what gets cut)',
                  'Copy refresh or full rewrite (positioning, page copy, CTAs)',
                  'Design direction (type, layout, motion, visual system)',
                  'Build in code or in a CMS workflow (depending on scope)',
                  'Analytics basics: events, UTMs, conversion points',
                ]}
                bestFor={[
                  'Portfolios that need to sell services',
                  'Small brands that need a site that behaves like a funnel',
                  '"We have a website" situations where it\'s not doing anything',
                ]}
              />
              
              <ServiceCard
                code="SYS.002"
                title="Copywriting + Messaging"
                description="Language that makes the offer obvious, without turning you into a marketing robot."
                deliverables={[
                  'Positioning pass: what you do, who it\'s for, why you win',
                  'Homepage + services + landing page copy',
                  'Offer pages for digital products',
                  'Email sequences (welcome, launch, follow-up)',
                  'Ad copy and hooks that match your brand voice',
                ]}
                bestFor={[
                  '"People don\'t get what I do"',
                  '"I\'m getting traffic but not conversions"',
                  '"My work is good but my words are vague"',
                ]}
              />
              
              <ServiceCard
                code="SYS.003"
                title="Meta Ads (Facebook + Instagram)"
                description="Campaign structure, creative direction, and ongoing optimization. Not set-and-forget."
                deliverables={[
                  'Account + campaign audit (what\'s working, what\'s lying)',
                  'Funnel mapping: ad → landing → conversion event',
                  'Campaign rebuild (structure, audiences, testing plan)',
                  'Creative testing system (angles, formats, variations)',
                  'Weekly iteration + reporting in plain language',
                ]}
                notes={[
                  'If your tracking is messy (third-party booking engines, weak pixels), we set up a cleaner measurement plan instead of pretending it\'s fine.',
                ]}
              />
              
              <ServiceCard
                code="SYS.004"
                title="Creative Direction"
                description="A coherent aesthetic that stays coherent when you ship weekly, not once a year."
                deliverables={[
                  'Visual direction: references, rules, do-not-cross lines',
                  'Content system: pillars, formats, repeatable templates',
                  'Creative guidance for shoots, edits, layouts, motion',
                  'Brand kit: type, spacing, components, usage rules',
                  '"Make it feel like this" translated into a system',
                ]}
                bestFor={[
                  'Founders who can build, but can\'t keep the look consistent',
                  'Brands that are "almost" distinct, but not quite memorable yet',
                ]}
              />
              
            </StaggerReveal>
          </section>

          {/* Approach */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-8 tracking-widest">
                {'// ENGAGEMENT_MODES'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-h2 text-on-bg-primary mb-10">APPROACH</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-heading text-h4 text-on-bg-primary mb-3">Audit First</h3>
                  <p className="text-small text-on-bg-tertiary leading-relaxed">
                    Short diagnostic to see what&apos;s actually broken before we touch anything.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-h4 text-on-bg-primary mb-3">Build or Fix</h3>
                  <p className="text-small text-on-bg-tertiary leading-relaxed">
                    We either build the system from scratch, or remove friction from 
                    what&apos;s already there.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-h4 text-on-bg-primary mb-3">Ship the Rationale</h3>
                  <p className="text-small text-on-bg-tertiary leading-relaxed">
                    You get documentation and decisions, so it survives future edits 
                    and future people.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Selection Criteria */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// GOOD_FIT'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-bg-secondary p-8 border border-border-muted">
                <h2 className="font-heading text-h3 text-on-bg-primary mb-6">SELECTION_CRITERIA</h2>
                <p className="text-body text-on-bg-secondary leading-relaxed mb-6">
                  The best work happens when:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>You want clarity more than novelty</span>
                  </li>
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>You can make decisions without ten layers of approval</span>
                  </li>
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>You care about long-term maintainability, not quick hacks</span>
                  </li>
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>You&apos;re willing to change the page, not just &ldquo;tweak the copy&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-3 text-small text-on-bg-secondary">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span>Budget matches scope, and scope stays honest</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </section>

          {/* Current Focus */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
                {'// CURRENT_FOCUS'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="border border-border-muted p-8">
                <h2 className="font-heading text-h3 text-on-bg-primary mb-6">ACTIVE_PROCESSES</h2>
                <p className="text-body text-on-bg-secondary leading-relaxed mb-4">
                  Right now I&apos;m prioritizing:
                </p>
                <ul className="space-y-2 text-small text-on-bg-tertiary">
                  <li className="flex items-start gap-3">
                    <span className="text-accent">{'>'}</span>
                    <span>Website + services pages that need a full positioning pass</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">{'>'}</span>
                    <span>Meta ads for bookings, lead gen, and product funnels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">{'>'}</span>
                    <span>Copy systems that scale across site, ads, and email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">{'>'}</span>
                    <span>Creative direction for brands that ship consistently</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </section>

          {/* CTA */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <ScrollReveal>
              <div className="p-8 md:p-10 bg-bg-secondary border border-border-muted">
                <p className="font-mono text-system text-accent mb-2">
                  {'// INITIATE_INQUIRY'}
                </p>
                <h2 className="font-heading text-h2 text-on-bg-primary mb-4">
                  START_CONVERSATION
                </h2>
                <p className="text-body text-on-bg-secondary leading-relaxed mb-6 max-w-2xl">
                  Describe the system. What are you selling, what&apos;s not working, and 
                  where does attention leak out of the funnel?
                </p>

                <div className="mb-8">
                  <p className="font-mono text-system text-on-surface-muted mb-3">
                    HELPFUL CONTEXT (IF YOU HAVE IT)
                  </p>
                  <ul className="space-y-2 text-small text-on-bg-tertiary">
                    <li className="flex items-start gap-3">
                      <span className="text-accent">{'>'}</span>
                      <span>Link to the site</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent">{'>'}</span>
                      <span>What &ldquo;conversion&rdquo; means for you (bookings, leads, sales)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent">{'>'}</span>
                      <span>Current ad spend + what platform</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent">{'>'}</span>
                      <span>The one sentence version of the offer</span>
                    </li>
                  </ul>
                </div>

                <a 
                  href="/intake"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
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
                LIMITED_INQUIRIES
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

function ServiceCard({ 
  code, 
  title, 
  description, 
  deliverables,
  bestFor,
  notes,
}: { 
  code: string;
  title: string;
  description: string;
  deliverables: string[];
  bestFor?: string[];
  notes?: string[];
}) {
  return (
    <div className="bg-bg-primary p-8 md:p-10 hover-lift focus-ring">
      <div className="mb-4">
        <span className="font-mono text-system text-accent">{code}</span>
        <div className="h-px bg-border-custom mt-3 mb-6 max-w-[80px]" />
      </div>

      <h2 className="font-heading text-h2 text-on-bg-primary mb-3">{title}</h2>
      <p className="text-body text-on-bg-tertiary max-w-2xl leading-relaxed mb-8">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="font-mono text-system text-on-surface-muted mb-3">
            DELIVERABLES (TYPICAL)
          </p>
          <ul className="space-y-2">
            {deliverables.map((item, i) => (
              <li key={i} className="text-small text-on-bg-secondary flex items-start gap-2">
                <span className="text-accent shrink-0">{'>'}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {bestFor && bestFor.length > 0 && (
          <div>
            <p className="font-mono text-system text-on-surface-muted mb-3">
              BEST FOR
            </p>
            <ul className="space-y-2">
              {bestFor.map((item, i) => (
                <li key={i} className="text-small text-on-bg-secondary flex items-start gap-2">
                  <span className="text-accent shrink-0">{'>'}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {notes && notes.length > 0 && (
          <div>
            <p className="font-mono text-system text-on-surface-muted mb-3">
              NOTES
            </p>
            <ul className="space-y-2">
              {notes.map((item, i) => (
                <li key={i} className="text-small text-on-bg-tertiary flex items-start gap-2">
                  <span className="text-accent shrink-0">{'>'}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
