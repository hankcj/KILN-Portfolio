/**
 * Signal / Journal Index Route
 * 
 * Writing mode; WebGL recedes to faint ambient background.
 * Index of essays, research, and long-form writing.
 */

export default function SignalPage() {
  return (
    <div className="min-h-screen py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="font-heading text-h1 mb-4">Signal</h1>
          <p className="text-body text-on-surface-muted">
            Essays, research, and long-form writing.
          </p>
        </header>
        
        {/* Essays list placeholder */}
        <div className="space-y-8">
          <p className="text-small text-on-surface-muted">
            Essays and articles will be listed here.
          </p>
        </div>
      </div>
    </div>
  );
}
