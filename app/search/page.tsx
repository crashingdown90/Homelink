"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Grid3x3, 
  List, 
  Map as MapIcon, 
  Filter,
  Loader,
  ChevronLeft,
  ChevronRight,
  Clock
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search/search-bar";
import { FilterPanel } from "@/components/search/filter-panel";
import { PropertyCard } from "@/components/property/property-card";
import { PopupPreview } from "@/components/property/popup-preview";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { cn } from "@/lib/utils";
import type { PropertySummary, SearchFilters, MapBounds } from "@/types";

// Dynamic import for MapView to avoid SSR issues
const MapView = dynamic(
  () => import("@/components/search/map-view").then(mod => mod.MapView),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-muted rounded-2xl flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-brand-gold" />
      </div>
    )
  }
);

type ViewMode = "grid" | "list" | "map";
type SplitMode = "list" | "map";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [splitMode, setSplitMode] = useState<SplitMode>("list");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [previewProperty, setPreviewProperty] = useState<PropertySummary | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);

  // Hooks
  const { toggleFavorite, isFavorited } = useFavorites();
  const { addSearch, recentSearches, removeSearch, getSearchLabel } = useRecentSearches();

  // Parse filters from URL
  useEffect(() => {
    const params: SearchFilters = {};
    
    if (searchParams.get("q")) params.q = searchParams.get("q")!;
    if (searchParams.get("city")) params.city = searchParams.get("city")!;
    if (searchParams.get("province")) params.province = searchParams.get("province")!;
    if (searchParams.get("type")) params.type = searchParams.get("type") as any;
    if (searchParams.get("status")) params.status = searchParams.get("status") as any;
    if (searchParams.get("minPrice")) params.minPrice = parseInt(searchParams.get("minPrice")!);
    if (searchParams.get("maxPrice")) params.maxPrice = parseInt(searchParams.get("maxPrice")!);
    if (searchParams.get("bedrooms")) params.bedrooms = parseInt(searchParams.get("bedrooms")!);
    if (searchParams.get("minLand")) params.minLand = parseInt(searchParams.get("minLand")!);
    if (searchParams.get("sort")) params.sort = searchParams.get("sort") as any;
    
    setFilters(params);

    // Set view mode from URL
    const view = searchParams.get("view");
    if (view === "list" || view === "grid" || view === "map") {
      setViewMode(view);
    }
  }, [searchParams]);

  // Fetch properties
  const fetchProperties = useCallback(async (
    searchFilters: SearchFilters,
    useBounds: boolean = false,
    append: boolean = false
  ) => {
    setIsLoading(true);

    try {
      let url = "";
      let params = new URLSearchParams();

      if (useBounds && mapBounds) {
        // Use bounds-based search for map
        url = "/api/search";
        params.append("neLat", mapBounds.neLat.toString());
        params.append("neLng", mapBounds.neLng.toString());
        params.append("swLat", mapBounds.swLat.toString());
        params.append("swLng", mapBounds.swLng.toString());
      } else {
        // Use regular search
        url = "/api/listings";
        if (append && nextCursor) {
          params.append("cursor", nextCursor);
        }
      }

      // Add filters to params
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`${url}?${params}`);
      const data = await response.json();

      if (response.ok) {
        if (append) {
          setProperties(prev => [...prev, ...data.items]);
        } else {
          setProperties(data.items);
        }
        setNextCursor(data.nextCursor || null);
        setTotalCount(data.total || data.items.length);
      } else {
        console.error("Failed to fetch properties:", data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  }, [mapBounds, nextCursor]);

  // Initial load
  useEffect(() => {
    fetchProperties(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Handle search submission
  const handleSearch = (newFilters: SearchFilters) => {
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });
    
    // Keep view mode in URL
    if (viewMode !== "grid") {
      params.append("view", viewMode);
    }
    
    router.push(`/search?${params.toString()}`);
    
    // Save to recent searches
    addSearch(newFilters);
  };

  // Handle filter change
  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters };
    handleSearch(updated);
  };

  // Handle map bounds change
  const handleMapBoundsChange = (bounds: MapBounds) => {
    setMapBounds(bounds);
    fetchProperties(filters, true);
  };

  // Load more properties
  const loadMore = () => {
    if (nextCursor && !isLoading) {
      fetchProperties(filters, false, true);
    }
  };

  // Handle property selection (from map or list)
  const handlePropertySelect = (propertyId: string) => {
    setSelectedProperty(propertyId);
    const property = properties.find(p => p._id === propertyId);
    if (property && viewMode !== "map") {
      setPreviewProperty(property);
    }
  };

  // Navigate to property detail
  const navigateToProperty = (slug: string) => {
    router.push(`/listing/${slug}`);
  };

  // Toggle split view (list/map)
  const toggleSplitMode = () => {
    setSplitMode(prev => prev === "list" ? "map" : "list");
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Search Bar */}
        <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-xl border-b">
          <div className="container-custom py-4">
            <SearchBar 
              onSubmit={handleSearch}
              defaultValues={filters}
            />
          </div>
        </div>

        <div className="container-custom py-6">
          {/* Recent Searches */}
          {recentSearches.length > 0 && Object.keys(filters).length === 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pencarian Terakhir
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.slice(0, 5).map(search => (
                  <button
                    key={search.id}
                    onClick={() => handleSearch(search.filters)}
                    className="group relative pl-3 pr-8 py-2 bg-card hover:bg-accent rounded-lg text-sm transition-colors"
                  >
                    <span>{getSearchLabel(search.filters)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSearch(search.id);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
                    >
                      ×
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-urbanist font-bold">
                {totalCount > 0 ? (
                  <>
                    {totalCount.toLocaleString("id-ID")} Properti
                    {filters.city && ` di ${filters.city}`}
                  </>
                ) : (
                  "Cari Properti"
                )}
              </h1>
            </div>

            {/* View controls */}
            <div className="flex items-center gap-2">
              {/* Filter toggle (mobile) */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4" />
              </Button>

              {/* View mode buttons */}
              <div className="flex bg-card rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewMode === "grid" 
                      ? "bg-brand-gold text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewMode === "list" 
                      ? "bg-brand-gold text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewMode === "map" 
                      ? "bg-brand-gold text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Map view"
                >
                  <MapIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            {showFilters && viewMode !== "map" && (
              <aside className="hidden lg:block w-72 flex-shrink-0">
                <FilterPanel
                  value={filters}
                  onChange={handleFilterChange}
                  onReset={() => handleSearch({})}
                />
              </aside>
            )}

            {/* Results */}
            <div className="flex-1">
              {viewMode === "map" ? (
                // Full map view
                <div className="h-[calc(100vh-280px)] rounded-2xl overflow-hidden">
                  <Suspense fallback={<div>Loading map...</div>}>
                    <MapView
                      properties={properties}
                      onBoundsChange={handleMapBoundsChange}
                      selectedProperty={selectedProperty || undefined}
                      onPropertySelect={handlePropertySelect}
                      isLoading={isLoading}
                    />
                  </Suspense>
                </div>
              ) : (
                // Grid/List with optional map split
                <div className="flex gap-4">
                  {/* Property list/grid */}
                  <div className={cn(
                    "flex-1",
                    splitMode === "map" && "lg:w-1/2"
                  )}>
                    {isLoading && properties.length === 0 ? (
                      <div className="flex items-center justify-center py-20">
                        <Loader className="h-8 w-8 animate-spin text-brand-gold" />
                      </div>
                    ) : properties.length > 0 ? (
                      <>
                        <div className={cn(
                          viewMode === "grid"
                            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                            : "space-y-4"
                        )}>
                          {properties.map(property => (
                            <PropertyCard
                              key={property._id}
                              property={property}
                              variant={viewMode === "list" ? "list" : "grid"}
                              isFavorited={isFavorited(property._id)}
                              onFavorite={toggleFavorite}
                            />
                          ))}
                        </div>

                        {/* Load more */}
                        {nextCursor && (
                          <div className="mt-8 text-center">
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={loadMore}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                                  Memuat...
                                </>
                              ) : (
                                "Muat Lebih Banyak"
                              )}
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-20">
                        <p className="text-muted-foreground">
                          Tidak ada properti yang sesuai dengan pencarian Anda
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Split map view (desktop only) */}
                  {splitMode === "map" && (
                    <div className="hidden lg:block w-1/2 sticky top-32 h-[calc(100vh-200px)]">
                      <Suspense fallback={<div>Loading map...</div>}>
                        <MapView
                          properties={properties}
                          onBoundsChange={handleMapBoundsChange}
                          selectedProperty={selectedProperty || undefined}
                          onPropertySelect={handlePropertySelect}
                          className="h-full"
                        />
                      </Suspense>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Split view toggle button */}
        {viewMode !== "map" && (
          <button
            onClick={toggleSplitMode}
            className="hidden lg:flex fixed bottom-8 right-8 items-center gap-2 px-4 py-3 bg-brand-gold text-white rounded-full shadow-lg hover:bg-brand-gold/90 transition-colors z-20"
          >
            {splitMode === "list" ? (
              <>
                <MapIcon className="h-5 w-5" />
                Tampilkan Peta
              </>
            ) : (
              <>
                <List className="h-5 w-5" />
                Sembunyikan Peta
              </>
            )}
          </button>
        )}

        {/* Property preview popup */}
        {previewProperty && (
          <PopupPreview
            property={previewProperty}
            onClose={() => setPreviewProperty(null)}
            onOpenDetail={() => navigateToProperty(previewProperty.slug)}
            onContact={() => {}}
            onSave={() => toggleFavorite(previewProperty._id)}
            isFavorited={isFavorited(previewProperty._id)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
