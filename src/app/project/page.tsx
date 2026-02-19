/**
 * Project Kiln Route
 * 
 * The main event — a separate application being built.
 * This page serves as the gateway and context provider.
 */

import { SimplePageShell } from '@/components/dom/PageShell';

export const metadata = {
  title: 'Project Kiln — KILN',
  description: 'A new system for building systems. Currently in development.',
};

export default function ProjectPage() {
  return (
    <SimplePageShell
      currentPage="project"
      leftSideText="PROJECT_KILN"
      rightSideText="IN_DEVELOPMENT"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <div className="flex justify-between items-start mb-4">
              <p className="font-mono text-system text-on-surface-muted tracking-widest">
                {'// EXTERNAL_SYSTEM'}
              </p>
              <p className="font-mono text-system text-accent">
                STATUS: ACTIVE_DEVELOPMENT
              </p>
            </div>
            <h1 className="font-heading text-display text-on-bg-primary mb-4">
              PROJECT KILN
            </h1>
            <p className="text-body text-on-bg-tertiary max-w-2xl">
              A comprehensive environment for building digital products. 
              The evolution of this studio&apos;s practice into a usable system.
            </p>
          </header>

          {/* Hero / Preview */}
          <section className="mb-16 md:mb-24">
            <div className="relative border border-border-custom bg-bg-secondary p-8 md:p-16 overflow-hidden">
              {/* Decorative grid background */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(250, 246, 240, 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(250, 246, 240, 0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                  <span className="font-mono text-system text-accent">
                    SYSTEM_COMING_SOON
                  </span>
                </div>
                
                <h2 className="font-heading text-display-md md:text-display-lg text-on-bg-primary mb-6 max-w-3xl">
                  The tools that built this site,
                  <br />
                  <span className="text-on-bg-tertiary">packaged for your use.</span>
                </h2>
                
                <p className="text-body text-on-bg-secondary max-w-2xl mb-10 leading-relaxed">
                  Project Kiln is a complete environment for designers and developers 
                  who want to build digital products with intention. It includes the 
                  component systems, animation libraries, and deployment infrastructure 
                  that powers this studio&apos;s work.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://projectkiln.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
                  >
                    <span>ENTER_ENVIRONMENT</span>
                    <span>↗</span>
                  </a>
                  <a 
                    href="#details"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border-muted text-on-bg-primary font-mono text-system hover:border-accent hover:text-accent transition-colors"
                  >
                    <span>VIEW_SPECIFICATIONS</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent/30" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent/30" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent/30" />
            </div>
          </section>

          {/* What is Project Kiln */}
          <section id="details" className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
              C  SYSTEM_COMPONENTS
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-custom mb-12">
              
              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">MOD.001</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h3 text-on-bg-primary mb-3">
                  Component Library
                </h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  Production-ready React components with brutalist aesthetics. 
                  Fully typed, accessible, and designed for composition.
                </p>
              </div>

              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">MOD.002</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h3 text-on-bg-primary mb-3">
                  Motion System
                </h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  GSAP-powered animation presets with the &quot;heavy mass&quot; feel. 
                  Page transitions, scroll triggers, and micro-interactions.
                </p>
              </div>

              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">MOD.003</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h3 text-on-bg-primary mb-3">
                  Content Architecture
                </h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  Ghost CMS integration, MDX processing, and static generation 
                  workflows for content-heavy sites.
                </p>
              </div>

              <div className="bg-bg-primary p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-system text-accent">MOD.004</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>
                <h3 className="font-heading text-h3 text-on-bg-primary mb-3">
                  Deployment Pipeline
                </h3>
                <p className="text-small text-on-bg-tertiary leading-relaxed">
                  Optimized build system with ISR, edge distribution, and 
                  performance monitoring out of the box.
                </p>
              </div>

            </div>
          </section>

          {/* Who is it for */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
              {'// TARGET_OPERATORS'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  role: 'DESIGNERS',
                  desc: 'Who want to ship sites without fighting CSS. Who care about typography, spacing, and motion.'
                },
                {
                  role: 'DEVELOPERS',
                  desc: 'Who need a solid foundation to build on. Who appreciate type safety and clean architecture.'
                },
                {
                  role: 'STUDIOS',
                  desc: 'Who want to systematize their practice. Who need to scale without losing craft.'
                }
              ].map((item) => (
                <div key={item.role} className="border border-border-muted p-6">
                  <p className="font-mono text-system text-accent mb-3">{item.role}</p>
                  <p className="text-small text-on-bg-tertiary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
              C  DEVELOPMENT_TIMELINE
            </p>
            
            <div className="space-y-0">
              {[
                { phase: 'ALPHA', status: 'COMPLETE', date: '2024.Q1', desc: 'Core system architecture' },
                { phase: 'BETA', status: 'IN_PROGRESS', date: '2024.Q2', desc: 'Component library refinement' },
                { phase: 'RELEASE_CANDIDATE', status: 'PLANNED', date: '2024.Q3', desc: 'Documentation and examples' },
                { phase: 'PUBLIC_LAUNCH', status: 'PLANNED', date: '2024.Q4', desc: 'Full system availability' },
              ].map((item, i, arr) => (
                <div key={item.phase} className="flex gap-6 relative">
                  {/* Timeline line */}
                  {i !== arr.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border-muted" />
                  )}
                  
                  {/* Status dot */}
                  <div className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'COMPLETE' ? 'bg-accent' : 
                      item.status === 'IN_PROGRESS' ? 'bg-accent animate-pulse' : 
                      'bg-border-muted'
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="pb-10 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <span className="font-mono text-system text-accent">{item.phase}</span>
                      <span className="font-mono text-system text-on-surface-muted">{item.date}</span>
                      <span className={`font-mono text-system ${
                        item.status === 'COMPLETE' ? 'text-accent' : 
                        item.status === 'IN_PROGRESS' ? 'text-accent' : 
                        'text-on-surface-muted'
                      }`}>
                        [{item.status}]
                      </span>
                    </div>
                    <p className="text-small text-on-bg-tertiary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stay Updated */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <div className="bg-bg-secondary border border-border-muted p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <p className="font-mono text-system text-accent mb-2">
                    REQUEST_ACCESS
                  </p>
                  <h3 className="font-heading text-h3 text-on-bg-primary mb-3">
                    Early access program
                  </h3>
                  <p className="text-body text-on-bg-tertiary max-w-xl">
                    Join the waitlist for beta access, documentation previews, 
                    and early pricing.
                  </p>
                </div>
                
                <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <input 
                    type="email" 
                    placeholder="operator@domain.com"
                    className="px-4 py-3 bg-bg-primary border border-border-muted text-on-bg-primary font-mono text-system placeholder:text-on-surface-muted focus:border-accent focus:outline-none min-w-[280px]"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
                  >
                    SUBMIT_REQUEST
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-16 md:mb-24 border-t border-border-custom pt-16">
            <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
              C  RELATED_SYSTEMS
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-custom">
              <a 
                href="/work" 
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">BUILT_WITH_THIS</p>
                  <p className="text-small text-on-bg-tertiary">See what this studio has made</p>
                </div>
                <span className="text-on-surface-muted group-hover:text-accent transition-colors">→</span>
              </a>
              
              <a 
                href="/services" 
                className="bg-bg-primary p-6 group hover:bg-bg-secondary transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-system text-accent mb-1">NEED_HELP</p>
                  <p className="text-small text-on-bg-tertiary">Implementation services available</p>
                </div>
                <span className="text-on-surface-muted group-hover:text-accent transition-colors">→</span>
              </a>
            </div>
          </section>

          {/* Footer info */}
          <div className="flex justify-between items-end pt-8 border-t border-border-muted">
            <div className="font-mono text-system text-on-surface-muted">
              V: 0.8.2_BETA
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-system text-on-surface-muted">
                DEVELOPMENT_ACTIVE
              </span>
            </div>
            <div className="font-mono text-system text-on-surface-muted">
              EST: 2024
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
