"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Bed, Bath, Maximize, Building } from "lucide-react";
import { cn, formatPrice, formatCompactNumber } from "@/lib/utils";
import type { PropertySummary } from "@/types";

interface PropertyCardProps {
  property: PropertySummary;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  variant?: "grid" | "list";
  className?: string;
}

const statusLabels = {
  sale: "Dijual",
  rent: "Disewa",
  sold: "Terjual",
  rented: "Tersewa",
};

const typeLabels = {
  house: "Rumah",
  apartment: "Apartemen",
  villa: "Villa",
  land: "Tanah",
  shophouse: "Ruko",
  office: "Kantor",
  warehouse: "Gudang",
};

export function PropertyCard({
  property,
  onFavorite,
  isFavorited = false,
  variant = "grid",
  className,
}: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(property._id);
  };

  // Get primary image
  const primaryImage = property.photos?.[0] || "/placeholder-property.jpg";

  if (variant === "list") {
    return (
      <Link
        href={`/listing/${property.slug}`}
        className={cn(
          "group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300",
          className
        )}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-80 h-48 md:h-56">
            <Image
              src={imageError ? "/placeholder-property.jpg" : primaryImage}
              alt={property.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, 320px"
              priority={false}
            />
            
            {/* Status badge */}
            <div className="absolute top-3 left-3">
              <span className={cn(
                "px-3 py-1 text-xs font-medium rounded-full",
                property.status === "sale" 
                  ? "bg-green-500/90 text-white" 
                  : "bg-blue-500/90 text-white"
              )}>
                {statusLabels[property.status]}
              </span>
            </div>

            {/* Favorite button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              aria-label="Add to favorites"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
                )}
              />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 md:p-6">
            <div className="flex flex-col h-full">
              {/* Type */}
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {typeLabels[property.type]}
              </p>

              {/* Title */}
              <h3 className="mt-1 text-lg font-semibold text-foreground group-hover:text-brand-gold transition-colors line-clamp-2">
                {property.title}
              </h3>

              {/* Location */}
              <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.city}</span>
              </div>

              {/* Specs */}
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {property.bedrooms && (
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms} KT</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} KM</span>
                  </div>
                )}
                {property.buildingSize && (
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{property.buildingSize} m²</span>
                  </div>
                )}
                {property.landSize && (
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{property.landSize} m²</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mt-auto pt-4">
                <p className="text-2xl font-bold text-brand-gold">
                  {formatPrice(property.price)}
                </p>
                {property.landSize && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatPrice(Math.round(property.price / property.landSize))} / m²
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link
      href={`/listing/${property.slug}`}
      className={cn(
        "group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300",
        "hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageError ? "/placeholder-property.jpg" : primaryImage}
          alt={property.title}
          fill
          className={cn(
            "object-cover transition-transform duration-300",
            isHovered && "scale-110"
          )}
          onError={() => setImageError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-3 py-1 text-xs font-medium rounded-full",
            property.status === "sale" 
              ? "bg-green-500/90 text-white" 
              : "bg-blue-500/90 text-white"
          )}>
            {statusLabels[property.status]}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label="Add to favorites"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </button>

        {/* Image count */}
        {property.photos && property.photos.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-lg">
            📷 {property.photos.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Type */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {typeLabels[property.type]}
        </p>

        {/* Title */}
        <h3 className="mt-1 font-semibold text-foreground group-hover:text-brand-gold transition-colors line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{property.city}</span>
        </div>

        {/* Specs */}
        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.buildingSize && (
            <div className="flex items-center gap-1">
              <Building className="h-3.5 w-3.5" />
              <span>{formatCompactNumber(property.buildingSize)}m²</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-lg font-bold text-brand-gold">
            {formatPrice(property.price)}
          </p>
          {property.status === "rent" && (
            <p className="text-xs text-muted-foreground">/tahun</p>
          )}
        </div>
      </div>
    </Link>
  );
}
