"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Map, { 
  Marker, 
  Popup, 
  NavigationControl, 
  GeolocateControl,
  ScaleControl,
  FullscreenControl,
  Source,
  Layer
} from "react-map-gl";
import Supercluster from "supercluster";
import { MapPin, Search, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatPrice, formatCompactNumber } from "@/lib/utils";
import type { PropertySummary, MapBounds } from "@/types";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapViewProps {
  properties: PropertySummary[];
  onBoundsChange?: (bounds: MapBounds) => void;
  selectedProperty?: string;
  onPropertySelect?: (id: string) => void;
  className?: string;
  isLoading?: boolean;
}

// Dark map style
const DARK_MAP_STYLE = "mapbox://styles/mapbox/dark-v11";
const LIGHT_MAP_STYLE = "mapbox://styles/mapbox/light-v11";

// Default Indonesia view
const DEFAULT_VIEW = {
  latitude: -2.5,
  longitude: 118,
  zoom: 4,
};

// Cluster configuration
const CLUSTER_RADIUS = 60;
const CLUSTER_MAX_ZOOM = 14;

export function MapView({
  properties,
  onBoundsChange,
  selectedProperty,
  onPropertySelect,
  className,
  isLoading = false,
}: MapViewProps) {
  const mapRef = useRef<any>(null);
  const [viewState, setViewState] = useState(DEFAULT_VIEW);
  const [clusters, setClusters] = useState<any[]>([]);
  const [supercluster, setSupercluster] = useState<Supercluster | null>(null);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [popupProperty, setPopupProperty] = useState<PropertySummary | null>(null);
  const [searchInAreaVisible, setSearchInAreaVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Initialize supercluster
  useEffect(() => {
    if (!properties || properties.length === 0) return;

    const points = properties.map(property => ({
      type: "Feature" as const,
      properties: {
        cluster: false,
        propertyId: property._id,
        property,
      },
      geometry: {
        type: "Point" as const,
        coordinates: [
          property.location?.lng || 0,
          property.location?.lat || 0,
        ],
      },
    }));

    const cluster = new Supercluster({
      radius: CLUSTER_RADIUS,
      maxZoom: CLUSTER_MAX_ZOOM,
      map: (props) => ({ property: props.property }),
      reduce: (acc, props) => {
        if (!acc.property) acc.property = [];
        if (Array.isArray(acc.property)) {
          acc.property.push(props.property);
        }
      },
    });

    cluster.load(points);
    setSupercluster(cluster);
  }, [properties]);

  // Get clusters for current bounds
  const getClusters = useCallback(() => {
    if (!supercluster || !mapRef.current) return [];

    const bounds = mapRef.current.getBounds();
    const bbox: [number, number, number, number] = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];

    return supercluster.getClusters(bbox, Math.floor(viewState.zoom));
  }, [supercluster, viewState.zoom]);

  // Update clusters when view changes
  useEffect(() => {
    const newClusters = getClusters();
    setClusters(newClusters);
  }, [getClusters]);

  // Handle map move
  const handleMoveEnd = useCallback(() => {
    if (!mapRef.current) return;

    const bounds = mapRef.current.getBounds();
    const newBounds: MapBounds = {
      neLat: bounds.getNorth(),
      neLng: bounds.getEast(),
      swLat: bounds.getSouth(),
      swLng: bounds.getWest(),
    };

    setSearchInAreaVisible(true);
    onBoundsChange?.(newBounds);
  }, [onBoundsChange]);

  // Handle search in area
  const handleSearchInArea = () => {
    setSearchInAreaVisible(false);
    handleMoveEnd();
  };

  // Fly to property
  useEffect(() => {
    if (selectedProperty && mapRef.current) {
      const property = properties.find(p => p._id === selectedProperty);
      if (property && property.location) {
        mapRef.current.flyTo({
          center: [property.location.lng, property.location.lat],
          zoom: 16,
          duration: 1000,
        });
        setPopupProperty(property);
      }
    }
  }, [selectedProperty, properties]);

  // Render cluster marker
  const renderCluster = (cluster: any) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

    if (isCluster) {
      // Calculate cluster size
      const size = 40 + (pointCount / properties.length) * 40;
      
      return (
        <Marker
          key={`cluster-${cluster.id}`}
          latitude={latitude}
          longitude={longitude}
        >
          <div
            className="flex items-center justify-center bg-brand-gold text-white font-bold rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg"
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
            onClick={() => {
              if (!supercluster || !mapRef.current) return;
              
              const expansionZoom = Math.min(
                supercluster.getClusterExpansionZoom(cluster.id),
                20
              );
              
              mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: expansionZoom,
                duration: 500,
              });
            }}
          >
            {formatCompactNumber(pointCount)}
          </div>
        </Marker>
      );
    }

    // Single property marker
    const property = cluster.properties.property;
    const isSelected = property._id === selectedProperty;
    const isHovered = property._id === hoveredPropertyId;

    return (
      <Marker
        key={property._id}
        latitude={latitude}
        longitude={longitude}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          onPropertySelect?.(property._id);
          setPopupProperty(property);
        }}
      >
        <div
          className={cn(
            "relative cursor-pointer transition-all",
            (isSelected || isHovered) && "z-10"
          )}
          onMouseEnter={() => setHoveredPropertyId(property._id)}
          onMouseLeave={() => setHoveredPropertyId(null)}
        >
          {/* Price tag */}
          <div
            className={cn(
              "px-2 py-1 rounded-lg font-semibold text-xs whitespace-nowrap transition-all shadow-md",
              isSelected
                ? "bg-brand-gold text-white scale-110"
                : isHovered
                ? "bg-white text-brand-gold scale-105 shadow-lg"
                : "bg-white text-gray-700"
            )}
          >
            {formatPrice(property.price).replace("Rp", "").trim()}
          </div>
          
          {/* Pin */}
          <div
            className={cn(
              "absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent",
              isSelected
                ? "border-t-[8px] border-t-brand-gold"
                : "border-t-[8px] border-t-white"
            )}
          />
        </div>
      </Marker>
    );
  };

  return (
    <div className={cn("relative w-full h-full rounded-2xl overflow-hidden", className)}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onMoveEnd={handleMoveEnd}
        mapStyle={isDarkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE}
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

        {/* Render markers/clusters */}
        {clusters.map(renderCluster)}

        {/* Popup */}
        {popupProperty && popupProperty.location && (
          <Popup
            latitude={popupProperty.location.lat}
            longitude={popupProperty.location.lng}
            onClose={() => setPopupProperty(null)}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            className="property-popup"
          >
            <div className="p-2 min-w-[200px]">
              {popupProperty.photos?.[0] && (
                <img
                  src={popupProperty.photos[0]}
                  alt={popupProperty.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              <h4 className="font-semibold text-sm line-clamp-2">
                {popupProperty.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {popupProperty.city}
              </p>
              <p className="text-sm font-bold text-brand-gold mt-2">
                {formatPrice(popupProperty.price)}
              </p>
            </div>
          </Popup>
        )}
      </Map>

      {/* Search in area button */}
      {searchInAreaVisible && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <Button
            variant="default"
            size="sm"
            onClick={handleSearchInArea}
            className="shadow-lg"
          >
            <Search className="h-4 w-4 mr-2" />
            Cari di area ini
          </Button>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="bg-card p-4 rounded-lg shadow-lg flex items-center gap-3">
            <Loader className="h-5 w-5 animate-spin text-brand-gold" />
            <span className="text-sm">Memuat properti...</span>
          </div>
        </div>
      )}

      {/* No properties message */}
      {!isLoading && properties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Tidak ada properti di area ini
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
