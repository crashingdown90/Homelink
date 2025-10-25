"use client";

import { useState, useEffect, useCallback } from "react";
import { isClient, generateId } from "@/lib/utils";
import type { SearchFilters, SavedSearch } from "@/types";

const RECENT_SEARCHES_KEY = "homelink_recent_searches";
const MAX_RECENT_SEARCHES = 10;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<SavedSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load recent searches from localStorage
  useEffect(() => {
    if (!isClient()) return;

    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const parsed: SavedSearch[] = JSON.parse(stored);
        setRecentSearches(parsed);
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save recent searches to localStorage
  const saveToStorage = useCallback((searches: SavedSearch[]) => {
    if (!isClient()) return;

    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    } catch (error) {
      console.error("Failed to save recent searches:", error);
    }
  }, []);

  // Add a new search
  const addSearch = useCallback((filters: SearchFilters) => {
    // Don't save empty searches
    if (Object.keys(filters).length === 0) return;

    const newSearch: SavedSearch = {
      id: generateId("search"),
      filters,
      timestamp: new Date().toISOString(),
    };

    setRecentSearches(prev => {
      // Check if similar search already exists
      const exists = prev.some(search => 
        JSON.stringify(search.filters) === JSON.stringify(filters)
      );

      if (exists) {
        // Move existing search to top
        const filtered = prev.filter(search => 
          JSON.stringify(search.filters) !== JSON.stringify(filters)
        );
        const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);
        saveToStorage(updated);
        return updated;
      }

      // Add new search to beginning
      const updated = [newSearch, ...prev].slice(0, MAX_RECENT_SEARCHES);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // Remove a search
  const removeSearch = useCallback((searchId: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(search => search.id !== searchId);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // Clear all searches
  const clearSearches = useCallback(() => {
    if (!isClient()) return;
    
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSearches([]);
  }, []);

  // Get search label for display
  const getSearchLabel = useCallback((filters: SearchFilters): string => {
    const parts: string[] = [];

    if (filters.q) {
      parts.push(`"${filters.q}"`);
    }
    if (filters.city) {
      parts.push(filters.city);
    }
    if (filters.type) {
      const typeLabels: Record<string, string> = {
        house: "Rumah",
        apartment: "Apartemen",
        villa: "Villa",
        land: "Tanah",
        shophouse: "Ruko",
        office: "Kantor",
        warehouse: "Gudang",
      };
      parts.push(typeLabels[filters.type] || filters.type);
    }
    if (filters.minPrice || filters.maxPrice) {
      if (filters.minPrice && filters.maxPrice) {
        parts.push(`Rp ${(filters.minPrice / 1000000).toFixed(0)}jt - ${(filters.maxPrice / 1000000).toFixed(0)}jt`);
      } else if (filters.minPrice) {
        parts.push(`> Rp ${(filters.minPrice / 1000000).toFixed(0)}jt`);
      } else if (filters.maxPrice) {
        parts.push(`< Rp ${(filters.maxPrice / 1000000).toFixed(0)}jt`);
      }
    }
    if (filters.bedrooms) {
      parts.push(`${filters.bedrooms}+ KT`);
    }
    if (filters.status) {
      parts.push(filters.status === "sale" ? "Dijual" : "Disewa");
    }

    return parts.length > 0 ? parts.join(" • ") : "Semua Properti";
  }, []);

  return {
    recentSearches,
    isLoading,
    addSearch,
    removeSearch,
    clearSearches,
    getSearchLabel,
  };
}
