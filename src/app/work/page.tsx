/**
 * Work Gallery Route
 * 
 * Grid/list of outputs; thumbnails may use controlled displacement shaders.
 * Work is presented as "outputs," not projects.
 */

import { Layout } from '@/components/dom/Layout';

export default function WorkPage() {
  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 md:mb-24">
            <p className="font-mono text-system text-on-surface-muted mb-4 tracking-widest">
              C  OUTPUT ARCHIVE
            </p>
            <h1 className="font-heading text-display text-on-bg-primary mb-4">
              WORK
            </h1>
            <p className="text-body text-on-bg-tertiary max-w-xl">
              Outputs — not projects. A continuous practice of essays, systems, tools, 
              and experiments.
            </p>
          </header>
          
          {/* Placeholder grid - will be replaced with OutputsList component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-custom">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <a 
                key={i}
                href={`/work/output-${i}`}
                className="bg-bg-primary p-8 min-h-[300px] flex flex-col justify-between group hover:bg-bg-secondary transition-colors duration-300 border border-transparent hover:border-border-custom"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-system text-on-surface-muted">VISUAL</span>
                  <span className="font-mono text-system text-on-surface-muted">PUBLISHED</span>
                </div>
                <div>
                  <h3 className="font-heading text-h3 text-on-bg-primary group-hover:text-accent transition-colors">
                    Output {String(i).padStart(3, '0')}
                  </h3>
                  <p className="text-small text-on-bg-tertiary mt-2">
                    A description of this work output goes here.
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
