/**
 * Signal Page Loading State
 */

export default function SignalLoading() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="animate-pulse">
          <div className="h-4 bg-bg-secondary w-48 mb-4" />
          <div className="h-12 bg-bg-secondary w-64 mb-8" />
          <div className="h-6 bg-bg-secondary w-full max-w-xl mb-16" />
          
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-bg-secondary w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
