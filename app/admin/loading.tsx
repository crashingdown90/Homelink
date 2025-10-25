import { Loader } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-card border-b z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-32 h-6 bg-muted rounded skeleton" />
            <div className="w-80 h-10 bg-muted rounded-lg skeleton" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-muted rounded-lg skeleton" />
            <div className="w-10 h-10 bg-muted rounded-lg skeleton" />
            <div className="w-32 h-10 bg-muted rounded-lg skeleton" />
          </div>
        </div>
      </div>

      {/* Sidebar skeleton */}
      <div className="fixed top-16 left-0 bottom-0 w-64 bg-card border-r">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-lg skeleton" />
            <div className="w-24 h-6 bg-muted rounded skeleton" />
          </div>
        </div>
        <div className="p-3 space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5">
              <div className="w-5 h-5 bg-muted rounded skeleton" />
              <div className="w-20 h-5 bg-muted rounded skeleton" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="lg:pl-64 pt-16">
        <div className="p-8">
          <div className="space-y-6">
            {/* Page header */}
            <div>
              <div className="w-48 h-8 bg-muted rounded skeleton mb-2" />
              <div className="w-96 h-5 bg-muted rounded skeleton" />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-xl p-6 shadow-sm">
                  <div className="w-20 h-4 bg-muted rounded skeleton mb-2" />
                  <div className="w-16 h-8 bg-muted rounded skeleton" />
                </div>
              ))}
            </div>

            {/* Content area */}
            <div className="bg-card rounded-xl shadow-sm p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded skeleton" />
                    <div className="flex-1 space-y-2">
                      <div className="w-48 h-5 bg-muted rounded skeleton" />
                      <div className="w-32 h-4 bg-muted rounded skeleton" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading overlay */}
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-card rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col items-center space-y-4">
              <Loader className="h-8 w-8 animate-spin text-brand-gold" />
              <p className="text-sm text-muted-foreground">
                Loading admin panel...
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
