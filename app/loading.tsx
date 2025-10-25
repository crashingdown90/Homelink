export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Skeleton */}
      <div className="fixed top-0 w-full h-20 bg-card border-b z-50">
        <div className="container-custom h-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-muted rounded-lg skeleton" />
            <div className="w-24 h-6 bg-muted rounded skeleton" />
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-20 h-8 bg-muted rounded-lg skeleton" />
            ))}
          </div>
          <div className="w-32 h-10 bg-muted rounded-full skeleton" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="pt-32 pb-16">
        <div className="container-custom">
          {/* Hero Section Skeleton */}
          <div className="space-y-6 text-center">
            <div className="w-96 h-12 bg-muted rounded-lg skeleton mx-auto" />
            <div className="w-64 h-6 bg-muted rounded skeleton mx-auto" />
            <div className="w-full max-w-2xl h-14 bg-muted rounded-2xl skeleton mx-auto mt-8" />
          </div>

          {/* Grid Skeleton */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] bg-muted skeleton" />
                <div className="p-4 space-y-3">
                  <div className="w-full h-5 bg-muted rounded skeleton" />
                  <div className="w-20 h-6 bg-muted rounded skeleton" />
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-4 bg-muted rounded skeleton" />
                    <div className="w-16 h-4 bg-muted rounded skeleton" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-[100]">
        <div className="bg-card rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-muted animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-brand-gold animate-spin" />
            </div>
            <p className="text-sm text-muted-foreground animate-pulse">
              Memuat...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
