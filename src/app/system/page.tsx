/**
 * System / Colophon Route
 * 
 * About page, technical breakdown, system context.
 * Deconstructed visuals; system voice strongest here.
 */

import { Layout } from '@/components/dom/Layout';

export default function SystemPage() {
  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16 md:mb-24">
            <p className="font-mono text-system text-on-surface-muted mb-4 tracking-widest">
              // SYSTEM DIAGNOSTIC
            </p>
            <h1 className="font-heading text-display text-on-bg-primary mb-4">
              SYSTEM
            </h1>
            <p className="text-body text-on-bg-tertiary">
              Technical breakdown, colophon, and system context.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-custom mb-16">
            <div className="bg-bg-primary p-8">
              <h2 className="font-heading text-h3 text-on-bg-primary mb-4">Architecture</h2>
              <ul className="space-y-2 text-small text-on-bg-secondary font-mono">
                <li>Framework: Next.js</li>
                <li>Language: TypeScript</li>
                <li>Styling: Tailwind CSS</li>
                <li>Content: MDX</li>
              </ul>
            </div>
            <div className="bg-bg-primary p-8">
              <h2 className="font-heading text-h3 text-on-bg-primary mb-4">Experience</h2>
              <ul className="space-y-2 text-small text-on-bg-secondary font-mono">
                <li>3D: React Three Fiber</li>
                <li>Motion: GSAP</li>
                <li>State: Zustand</li>
                <li>Scroll: Lenis</li>
              </ul>
            </div>
          </div>

          <section className="border-t border-border-custom pt-16">
            <h2 className="font-heading text-h2 text-on-bg-primary mb-6">Colophon</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-body text-on-bg-secondary leading-relaxed">
                This site was designed and built as a digital museum — a space that rewards 
                attention and functions as a destination for people who arrive with intent. 
                It is not optimized for mass discovery or rapid conversion.
              </p>
              <p className="text-body text-on-bg-secondary leading-relaxed mt-4">
                The visual language draws from brutalist design principles and scientific 
                diagram aesthetics. Motion is treated as mass — heavy, damped, and deliberate.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
