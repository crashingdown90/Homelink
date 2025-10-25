"use client";

import { useState, useEffect, useCallback } from "react";
import { isClient } from "@/lib/utils";

const FAVORITES_KEY = "homelink_favorites";
const MAX_FAVORITES = 100;

interface FavoriteProperty {
  id: string;
  savedAt: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage
  useEffect(() => {
    if (!isClient()) return;

    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed: FavoriteProperty[] = JSON.parse(stored);
        setFavorites(new Set(parsed.map(f => f.id)));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = useCallback((newFavorites: Set<string>) => {
    if (!isClient()) return;

    try {
      const favoritesList: FavoriteProperty[] = Array.from(newFavorites).map(id => ({
        id,
        savedAt: new Date().toISOString(),
      }));
      
      // Limit to MAX_FAVORITES most recent
      const limited = favoritesList.slice(-MAX_FAVORITES);
      
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(limited));
      setFavorites(new Set(limited.map(f => f.id)));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback((propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        if (newFavorites.size >= MAX_FAVORITES) {
          // Remove oldest favorite
          const oldest = Array.from(newFavorites)[0];
          newFavorites.delete(oldest);
        }
        newFavorites.add(propertyId);
      }
      
      saveFavorites(newFavorites);
      return newFavorites;
    });
  }, [saveFavorites]);

  // Check if property is favorited
  const isFavorited = useCallback((propertyId: string) => {
    return favorites.has(propertyId);
  }, [favorites]);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    if (!isClient()) return;
    
    localStorage.removeItem(FAVORITES_KEY);
    setFavorites(new Set());
  }, []);

  // Get all favorite IDs as array
  const getFavoriteIds = useCallback(() => {
    return Array.from(favorites);
  }, [favorites]);

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorited,
    clearFavorites,
    getFavoriteIds,
    count: favorites.size,
  };
}
