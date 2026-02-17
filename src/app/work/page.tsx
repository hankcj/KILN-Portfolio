/**
 * Work Gallery Route
 * 
 * Grid/list of outputs; thumbnails may use controlled displacement shaders.
 * Work is presented as "outputs," not projects.
 */

export default function WorkPage() {
  return (
    <div className="min-h-screen py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h1 className="font-heading text-h1 mb-4">Work</h1>
          <p className="text-body text-on-surface-muted">
            Outputs — not projects. A continuous practice.
          </p>
        </header>
        
        {/* Outputs grid placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <p className="text-small text-on-surface-muted col-span-full">
            Work outputs will be rendered here.
          </p>
        </div>
      </div>
    </div>
  );
}
