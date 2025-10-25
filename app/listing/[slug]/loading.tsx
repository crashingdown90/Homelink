export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="sticky top-0 w-full h-20 bg-card border-b z-50">
        <div className="container-custom h-full flex items-center justify-between">
          <div className="w-32 h-6 bg-muted rounded skeleton" />
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-20 h-8 bg-muted rounded-lg skeleton" />
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom pt-24 pb-12">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 1 && <span className="text-muted-foreground">/</span>}
              <div className="w-20 h-4 bg-muted rounded skeleton" />
            </div>
          ))}
        </div>

        {/* Gallery skeleton */}
        <div className="aspect-[16/9] md:aspect-[2/1] bg-muted rounded-2xl skeleton" />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title section */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="w-20 h-6 bg-muted rounded-full skeleton" />
                <div className="w-24 h-6 bg-muted rounded-full skeleton" />
              </div>
              <div className="w-3/4 h-8 bg-muted rounded skeleton" />
              <div className="w-1/2 h-5 bg-muted rounded skeleton" />
              <div className="w-40 h-12 bg-muted rounded-lg skeleton mt-4" />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="w-32 h-6 bg-muted rounded skeleton" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-muted rounded skeleton" />
                <div className="w-full h-4 bg-muted rounded skeleton" />
                <div className="w-3/4 h-4 bg-muted rounded skeleton" />
              </div>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-accent/50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-muted rounded-full skeleton mx-auto mb-2" />
                  <div className="w-full h-4 bg-muted rounded skeleton mb-1" />
                  <div className="w-16 h-5 bg-muted rounded skeleton mx-auto" />
                </div>
              ))}
            </div>

            {/* Map skeleton */}
            <div className="h-[400px] bg-muted rounded-2xl skeleton" />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Agent card skeleton */}
            <div className="bg-card rounded-2xl shadow-sm p-6">
              <div className="w-24 h-24 bg-muted rounded-full skeleton mx-auto mb-4" />
              <div className="w-32 h-6 bg-muted rounded skeleton mx-auto mb-2" />
              <div className="w-24 h-4 bg-muted rounded skeleton mx-auto mb-4" />
              <div className="space-y-2">
                <div className="w-full h-10 bg-muted rounded-lg skeleton" />
                <div className="w-full h-10 bg-muted rounded-lg skeleton" />
              </div>
            </div>

            {/* Contact form skeleton */}
            <div className="bg-card rounded-2xl shadow-sm p-6">
              <div className="w-48 h-6 bg-muted rounded skeleton mb-4" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-10 bg-muted rounded-lg skeleton" />
                ))}
                <div className="w-full h-12 bg-muted rounded-lg skeleton" />
              </div>
            </div>
          </div>
        </div>

        {/* Related properties skeleton */}
        <div className="mt-12">
          <div className="w-48 h-8 bg-muted rounded skeleton mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl shadow-sm overflow-hidden">
                <div className="aspect-[4/3] bg-muted skeleton" />
                <div className="p-4 space-y-3">
                  <div className="w-full h-5 bg-muted rounded skeleton" />
                  <div className="w-24 h-4 bg-muted rounded skeleton" />
                  <div className="w-32 h-6 bg-muted rounded skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
