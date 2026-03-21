/**
 * Product Detail Loading State
 */

export default function ProductLoading() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-4 bg-bg-secondary w-32 mb-8" />
          
          <div className="mb-8">
            <div className="h-8 bg-bg-secondary w-48 mb-4" />
            <div className="h-12 bg-bg-secondary w-3/4 mb-6" />
            <div className="h-6 bg-bg-secondary w-full max-w-2xl" />
          </div>
          
          <div className="h-px bg-border-muted my-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-40 bg-bg-secondary" />
            <div className="h-40 bg-bg-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
