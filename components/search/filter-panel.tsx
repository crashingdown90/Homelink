"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import type { SearchFilters } from "@/types";
import { PropertyStatus } from "@/types";

interface FilterPanelProps {
  value: SearchFilters;
  onChange: (filters: Partial<SearchFilters>) => void;
  onReset: () => void;
  className?: string;
  cities?: string[];
  provinces?: string[];
}

const PROPERTY_TYPES = [
  { value: "house", label: "Rumah", icon: "🏠" },
  { value: "apartment", label: "Apartemen", icon: "🏢" },
  { value: "villa", label: "Villa", icon: "🏡" },
  { value: "land", label: "Tanah", icon: "🌍" },
  { value: "shophouse", label: "Ruko", icon: "🏪" },
  { value: "office", label: "Kantor", icon: "🏛️" },
  { value: "warehouse", label: "Gudang", icon: "🏭" },
];

const PRICE_PRESETS = [
  { label: "< 500 Juta", min: 0, max: 500000000 },
  { label: "500 Juta - 1 M", min: 500000000, max: 1000000000 },
  { label: "1 - 2 M", min: 1000000000, max: 2000000000 },
  { label: "2 - 5 M", min: 2000000000, max: 5000000000 },
  { label: "> 5 M", min: 5000000000, max: undefined },
];

const CERTIFICATE_TYPES = [
  { value: "shm", label: "SHM" },
  { value: "hgb", label: "HGB" },
  { value: "shgb", label: "SHGB" },
  { value: "girik", label: "Girik" },
  { value: "ajb", label: "AJB" },
  { value: "ppjb", label: "PPJB" },
];

export function FilterPanel({
  value,
  onChange,
  onReset,
  className,
  cities = [],
  provinces = [],
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["type", "price", "location"])
  );

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  // Handle filter change with debounce
  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    onChange({ ...value, ...newFilters });
  };

  // Count active filters
  const activeFilterCount = Object.keys(value).filter(
    key => value[key as keyof SearchFilters] !== undefined
  ).length;

  return (
    <div className={cn("bg-card rounded-2xl shadow-sm", className)}>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Filter</h3>
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-brand-gold/10 text-brand-gold rounded-full text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground"
          >
            Reset
          </Button>
        )}
      </div>

      <div className="divide-y">
        {/* Property Type */}
        <div className="p-4">
          <button
            onClick={() => toggleSection("type")}
            className="w-full flex items-center justify-between text-left hover:text-brand-gold transition-colors"
          >
            <span className="font-medium">Tipe Properti</span>
            {expandedSections.has("type") ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {expandedSections.has("type") && (
            <div className="mt-3 space-y-2">
              {PROPERTY_TYPES.map(type => (
                <label
                  key={type.value}
                  className="flex items-center gap-3 cursor-pointer hover:bg-accent/50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={value.type === type.value}
                    onChange={(e) => handleFilterChange({ 
                      type: e.target.value as any 
                    })}
                    className="w-4 h-4 text-brand-gold focus:ring-brand-gold"
                  />
                  <span className="text-lg">{type.icon}</span>
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
              {value.type && (
                <button
                  onClick={() => {
                    const { type, ...rest } = value;
                    onChange(rest);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear selection
                </button>
              )}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="p-4">
          <button
            onClick={() => toggleSection("price")}
            className="w-full flex items-center justify-between text-left hover:text-brand-gold transition-colors"
          >
            <span className="font-medium">Harga</span>
            {expandedSections.has("price") ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {expandedSections.has("price") && (
            <div className="mt-3 space-y-3">
              {/* Price presets */}
              <div className="grid grid-cols-2 gap-2">
                {PRICE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleFilterChange({
                      minPrice: preset.min,
                      maxPrice: preset.max,
                    })}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-lg border transition-colors",
                      value.minPrice === preset.min && value.maxPrice === preset.max
                        ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                        : "border-border hover:border-brand-gold hover:text-brand-gold"
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Custom price inputs */}
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Harga Min"
                  value={value.minPrice || ""}
                  onChange={(e) => handleFilterChange({
                    minPrice: e.target.value ? parseInt(e.target.value) : undefined,
                  })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Harga Max"
                  value={value.maxPrice || ""}
                  onChange={(e) => handleFilterChange({
                    maxPrice: e.target.value ? parseInt(e.target.value) : undefined,
                  })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>

              {(value.minPrice || value.maxPrice) && (
                <button
                  onClick={() => {
                    const { minPrice, maxPrice, ...rest } = value;
                    onChange(rest);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear price filter
                </button>
              )}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="p-4">
          <button
            onClick={() => toggleSection("location")}
            className="w-full flex items-center justify-between text-left hover:text-brand-gold transition-colors"
          >
            <span className="font-medium">Lokasi</span>
            {expandedSections.has("location") ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {expandedSections.has("location") && (
            <div className="mt-3 space-y-3">
              {/* Province select */}
              {provinces.length > 0 && (
                <select
                  value={value.province || ""}
                  onChange={(e) => handleFilterChange({ 
                    province: e.target.value || undefined 
                  })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                >
                  <option value="">Semua Provinsi</option>
                  {provinces.map(province => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              )}

              {/* City input */}
              <input
                type="text"
                placeholder="Nama Kota"
                value={value.city || ""}
                onChange={(e) => handleFilterChange({ 
                  city: e.target.value || undefined 
                })}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />

              {(value.province || value.city) && (
                <button
                  onClick={() => {
                    const { province, city, ...rest } = value;
                    onChange(rest);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear location filter
                </button>
              )}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="p-4">
          <button
            onClick={() => toggleSection("status")}
            className="w-full flex items-center justify-between text-left hover:text-brand-gold transition-colors"
          >
            <span className="font-medium">Status</span>
            {expandedSections.has("status") ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {expandedSections.has("status") && (
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-accent/50 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="status"
                  value="sale"
                  checked={value.status === PropertyStatus.SALE}
                  onChange={(e) => handleFilterChange({ status: PropertyStatus.SALE })}
                  className="w-4 h-4 text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-sm">Dijual</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-accent/50 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="status"
                  value="rent"
                  checked={value.status === PropertyStatus.RENT}
                  onChange={(e) => handleFilterChange({ status: PropertyStatus.RENT })}
                  className="w-4 h-4 text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-sm">Disewa</span>
              </label>
              {value.status && (
                <button
                  onClick={() => {
                    const { status, ...rest } = value;
                    onChange(rest);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear selection
                </button>
              )}
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="p-4">
          <button
            onClick={() => toggleSection("specs")}
            className="w-full flex items-center justify-between text-left hover:text-brand-gold transition-colors"
          >
            <span className="font-medium">Spesifikasi</span>
            {expandedSections.has("specs") ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {expandedSections.has("specs") && (
            <div className="mt-3 space-y-3">
              {/* Bedrooms */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Kamar Tidur
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, "5+"].map(num => (
                    <button
                      key={num}
                      onClick={() => handleFilterChange({
                        bedrooms: typeof num === "number" ? num : 5,
                      })}
                      className={cn(
                        "flex-1 py-1.5 text-sm rounded-lg border transition-colors",
                        value.bedrooms === (typeof num === "number" ? num : 5)
                          ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                          : "border-border hover:border-brand-gold hover:text-brand-gold"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Land size */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Luas Tanah Min (m²)
                </label>
                <input
                  type="number"
                  placeholder="100"
                  value={value.minLand || ""}
                  onChange={(e) => handleFilterChange({
                    minLand: e.target.value ? parseInt(e.target.value) : undefined,
                  })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>

              {(value.bedrooms || value.minLand) && (
                <button
                  onClick={() => {
                    const { bedrooms, minLand, ...rest } = value;
                    onChange(rest);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear specifications
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
