/**
 * Project Page Loading State
 */

export default function ProjectLoading() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="h-4 bg-bg-secondary w-48" />
            <div className="h-4 bg-bg-secondary w-32" />
          </div>
          
          <div className="h-12 bg-bg-secondary w-64 mb-4" />
          <div className="h-6 bg-bg-secondary w-full max-w-2xl mb-16" />
          
          <div className="h-64 bg-bg-secondary mb-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-custom mb-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-bg-primary p-8">
                <div className="h-4 bg-bg-secondary w-16 mb-4" />
                <div className="h-6 bg-bg-secondary w-32 mb-3" />
                <div className="h-20 bg-bg-secondary w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
