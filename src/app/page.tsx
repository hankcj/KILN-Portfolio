/**
 * Entrance / Experience Route
 * 
 * Pure experience; heavy WebGL; minimal text.
 * This is the immersive entry point to the portfolio.
 * Dark mode with dramatic typography.
 */

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background gradient orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="text-center relative z-10 px-6">
        <p className="font-mono text-system text-on-surface-muted mb-6 tracking-widest">
          // ENTRY POINT
        </p>
        <h1 className="font-heading text-display-xl text-on-bg-primary tracking-tight mb-4">
          KILN
        </h1>
        <p className="text-body text-on-bg-tertiary max-w-md mx-auto mb-8">
          A personal studio portfolio and publishing space
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/work" className="btn-primary">
            ENTER
          </a>
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-32 left-8 font-mono text-system text-on-surface-muted">
        01.00.00
      </div>
      <div className="absolute top-32 right-8 font-mono text-system text-on-surface-muted">
        48.8566° N
      </div>
      <div className="absolute bottom-32 left-8 font-mono text-system text-on-surface-muted">
        2.3522° E
      </div>
      <div className="absolute bottom-32 right-8 font-mono text-system text-on-surface-muted">
        EST. 2024
      </div>
    </div>
  );
}
