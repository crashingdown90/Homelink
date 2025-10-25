"use client";

import { useState, useEffect } from "react";
import Map, { 
  Marker, 
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  FullscreenControl,
} from "react-map-gl";
import { MapPin, Navigation, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapPinpointProps {
  latitude: number;
  longitude: number;
  title?: string;
  address?: string;
  className?: string;
}

// Map styles
const DARK_MAP_STYLE = "mapbox://styles/mapbox/dark-v11";
const LIGHT_MAP_STYLE = "mapbox://styles/mapbox/light-v11";
const SATELLITE_STYLE = "mapbox://styles/mapbox/satellite-streets-v12";

type MapStyle = "light" | "dark" | "satellite";

export function MapPinpoint({
  latitude,
  longitude,
  title,
  address,
  className,
}: MapPinpointProps) {
  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom: 16,
  });
  const [mapStyle, setMapStyle] = useState<MapStyle>("light");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
      setMapStyle(isDark ? "dark" : "light");
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Get map style URL
  const getMapStyleUrl = () => {
    switch (mapStyle) {
      case "dark":
        return DARK_MAP_STYLE;
      case "satellite":
        return SATELLITE_STYLE;
      default:
        return LIGHT_MAP_STYLE;
    }
  };

  // Open in Google Maps
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  // Get directions
  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative h-[400px] rounded-2xl overflow-hidden">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle={getMapStyleUrl()}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          reuseMaps
          attributionControl={false}
          dragRotate={false}
          touchPitch={false}
        >
          {/* Controls */}
          <NavigationControl position="top-right" />
          <GeolocateControl position="top-right" />
          <ScaleControl position="bottom-right" />
          <FullscreenControl position="top-right" />

          {/* Property marker */}
          <Marker
            latitude={latitude}
            longitude={longitude}
            anchor="bottom"
          >
            <div className="relative">
              {/* Pulse animation */}
              <div className="absolute inset-0 -top-2">
                <div className="w-12 h-12 bg-brand-gold/30 rounded-full animate-ping" />
              </div>
              
              {/* Pin */}
              <div className="relative flex flex-col items-center">
                <div className="bg-brand-gold text-white p-2 rounded-full shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="w-0.5 h-4 bg-brand-gold" />
                <div className="w-2 h-2 bg-brand-gold rounded-full shadow-lg" />
              </div>
            </div>
          </Marker>

          {/* Property info overlay */}
          {(title || address) && (
            <div className="absolute bottom-4 left-4 right-4 max-w-sm mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
                {title && (
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                    {title}
                  </h4>
                )}
                {address && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {address}
                  </p>
                )}
              </div>
            </div>
          )}
        </Map>

        {/* Map style switcher */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            onClick={() => setMapStyle("light")}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-sm",
              mapStyle === "light"
                ? "bg-white text-gray-900"
                : "bg-white/80 text-gray-600 hover:bg-white"
            )}
          >
            Map
          </button>
          <button
            onClick={() => setMapStyle("satellite")}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-sm",
              mapStyle === "satellite"
                ? "bg-white text-gray-900"
                : "bg-white/80 text-gray-600 hover:bg-white"
            )}
          >
            Satellite
          </button>
          {isDarkMode && (
            <button
              onClick={() => setMapStyle("dark")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-sm",
                mapStyle === "dark"
                  ? "bg-white text-gray-900"
                  : "bg-white/80 text-gray-600 hover:bg-white"
              )}
            >
              Dark
            </button>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={openInGoogleMaps}
        >
          <MapPin className="h-4 w-4 mr-2" />
          Buka di Google Maps
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={getDirections}
        >
          <Navigation className="h-4 w-4 mr-2" />
          Petunjuk Arah
        </Button>
      </div>

      {/* Nearby places info */}
      <div className="mt-4 p-4 bg-accent/50 dark:bg-accent/20 rounded-xl">
        <h4 className="font-medium text-sm mb-2">Tempat Terdekat</h4>
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div>
            <p>🏫 Sekolah: 500m</p>
            <p>🏥 Rumah Sakit: 1.2km</p>
            <p>🛒 Supermarket: 800m</p>
          </div>
          <div>
            <p>🚉 Stasiun: 2km</p>
            <p>🏦 Bank: 600m</p>
            <p>🍽️ Restoran: 300m</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 italic">
          * Jarak perkiraan dari lokasi properti
        </p>
      </div>
    </div>
  );
}
