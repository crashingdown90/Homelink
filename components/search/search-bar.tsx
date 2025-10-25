"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Home as HomeIcon, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SearchFilters } from "@/types";

interface SearchBarProps {
  onSubmit: (filters: SearchFilters) => void;
  defaultValues?: SearchFilters;
  className?: string;
  variant?: "default" | "compact";
}

const PROPERTY_TYPES = [
  { value: "house", label: "Rumah" },
  { value: "apartment", label: "Apartemen" },
  { value: "villa", label: "Villa" },
  { value: "land", label: "Tanah" },
  { value: "shophouse", label: "Ruko" },
  { value: "office", label: "Kantor" },
  { value: "warehouse", label: "Gudang" },
];

const PRICE_RANGES = [
  { value: "", label: "Semua Harga" },
  { value: "0-500000000", label: "< 500 Juta" },
  { value: "500000000-1000000000", label: "500 Juta - 1 M" },
  { value: "1000000000-2000000000", label: "1 M - 2 M" },
  { value: "2000000000-5000000000", label: "2 M - 5 M" },
  { value: "5000000000-", label: "> 5 M" },
];

const BEDROOM_OPTIONS = [
  { value: "", label: "Semua" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

export function SearchBar({
  onSubmit,
  defaultValues = {},
  className,
  variant = "default",
}: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>(defaultValues);
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse price range
    const processedFilters = { ...filters };
    if (filters.minPrice === 0 && filters.maxPrice === 0) {
      delete processedFilters.minPrice;
      delete processedFilters.maxPrice;
    }
    
    onSubmit(processedFilters);
  };

  // Handle price range change
  const handlePriceRangeChange = (value: string) => {
    if (!value) {
      setFilters(prev => {
        const { minPrice, maxPrice, ...rest } = prev;
        return rest;
      });
      return;
    }

    const [min, max] = value.split("-").map(v => parseInt(v) || 0);
    setFilters(prev => ({
      ...prev,
      minPrice: min,
      maxPrice: max || undefined,
    }));
  };

  // Get current price range value for select
  const getCurrentPriceRange = () => {
    if (!filters.minPrice && !filters.maxPrice) return "";
    if (filters.minPrice && !filters.maxPrice) {
      return `${filters.minPrice}-`;
    }
    return `${filters.minPrice || 0}-${filters.maxPrice || ""}`;
  };

  // Handle reset
  const handleReset = () => {
    setFilters({});
    onSubmit({});
  };

  // Check if has active filters
  const hasActiveFilters = Object.keys(filters).length > 0;

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={cn("w-full", className)}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari lokasi, nama properti..."
              value={filters.q || ""}
              onChange={(e) => setFilters(prev => ({ ...prev, q: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            />
          </div>
          <Button type="submit" variant="gradient" className="px-6">
            Cari
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6 space-y-4">
        {/* Main search bar */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari lokasi, kota, atau nama properti..."
              value={filters.q || ""}
              onChange={(e) => setFilters(prev => ({ ...prev, q: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            />
          </div>
          
          {/* Quick filters */}
          <div className="flex gap-2">
            <select
              value={filters.type || ""}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                type: e.target.value as any || undefined 
              }))}
              className="px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            >
              <option value="">Semua Tipe</option>
              {PROPERTY_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={getCurrentPriceRange()}
              onChange={(e) => handlePriceRangeChange(e.target.value)}
              className="px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            >
              {PRICE_RANGES.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4"
            >
              {isExpanded ? "Sembunyikan" : "Filter Lanjut"}
            </Button>

            <Button type="submit" variant="gradient" size="lg">
              <Search className="mr-2 h-4 w-4" />
              Cari
            </Button>
          </div>
        </div>

        {/* Expanded filters */}
        {isExpanded && (
          <div className="pt-4 border-t space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Kota
                </label>
                <input
                  type="text"
                  placeholder="Jakarta, Surabaya..."
                  value={filters.city || ""}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Status
                </label>
                <select
                  value={filters.status || ""}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    status: e.target.value as any || undefined 
                  }))}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                >
                  <option value="">Semua</option>
                  <option value="sale">Dijual</option>
                  <option value="rent">Disewa</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Kamar Tidur
                </label>
                <select
                  value={filters.bedrooms || ""}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    bedrooms: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                >
                  {BEDROOM_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Land Size */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Luas Tanah Min (m²)
                </label>
                <input
                  type="number"
                  placeholder="100"
                  value={filters.minLand || ""}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    minLand: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2">
              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleReset}
                  className="text-muted-foreground"
                >
                  Reset Filter
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.q && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm">
                Kata kunci: {filters.q}
                <button
                  type="button"
                  onClick={() => setFilters(prev => {
                    const { q, ...rest } = prev;
                    return rest;
                  })}
                  className="ml-1 hover:text-brand-gold/70"
                >
                  ×
                </button>
              </span>
            )}
            {filters.city && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm">
                Kota: {filters.city}
                <button
                  type="button"
                  onClick={() => setFilters(prev => {
                    const { city, ...rest } = prev;
                    return rest;
                  })}
                  className="ml-1 hover:text-brand-gold/70"
                >
                  ×
                </button>
              </span>
            )}
            {filters.type && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm">
                Tipe: {PROPERTY_TYPES.find(t => t.value === filters.type)?.label}
                <button
                  type="button"
                  onClick={() => setFilters(prev => {
                    const { type, ...rest } = prev;
                    return rest;
                  })}
                  className="ml-1 hover:text-brand-gold/70"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
