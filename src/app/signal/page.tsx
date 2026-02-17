/**
 * Signal / Journal Index Route
 * 
 * Writing mode; WebGL recedes to faint ambient background.
 * Index of essays, research, and long-form writing.
 */

export default function SignalPage() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 md:mb-24">
          <p className="font-mono text-system text-on-surface-muted mb-4 tracking-widest">
            C  JOURNAL INDEX
          </p>
          <h1 className="font-heading text-display text-on-bg-primary mb-4">
            SIGNAL
          </h1>
          <p className="text-body text-on-bg-tertiary">
            Essays, research, and long-form writing on systems, design, and technology.
          </p>
        </header>
        
        {/* Essays list placeholder */}
        <div className="space-y-px bg-border-custom">
          {[1, 2, 3, 4, 5].map((i) => (
            <a 
              key={i}
              href={`/signal/essay-${i}`}
              className="block bg-bg-primary p-8 group hover:bg-bg-secondary transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-heading text-h3 text-on-bg-primary group-hover:text-accent transition-colors mb-2">
                    Essay Title {i}
                  </h3>
                  <p className="text-small text-on-bg-tertiary">
                    A brief description of the essay content and themes.
                  </p>
                </div>
                <span className="font-mono text-system text-on-surface-muted shrink-0">
                  2024.0{i}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
