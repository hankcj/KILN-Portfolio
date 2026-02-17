/**
 * System / Colophon Route
 * 
 * About page, technical breakdown, system context.
 * Deconstructed visuals; system voice strongest here.
 */

export default function SystemPage() {
  return (
    <div className="min-h-screen py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="font-heading text-h1 mb-4">System</h1>
          <p className="text-body text-on-surface-muted">
            Technical breakdown, colophon, and system context.
          </p>
        </header>
        
        <section className="space-y-8">
          <h2 className="font-heading text-h2">Colophon</h2>
          <p className="text-body">
            System details and technical information will be rendered here.
          </p>
        </section>
      </div>
    </div>
  );
}
