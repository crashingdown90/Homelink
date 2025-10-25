"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Bed, 
  Bath, 
  Building,
  Maximize,
  Phone,
  MessageCircle,
  Heart,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatPrice, getWhatsAppUrl } from "@/lib/utils";
import type { PropertySummary } from "@/types";

interface PopupPreviewProps {
  property: PropertySummary;
  onClose: () => void;
  onOpenDetail: () => void;
  onContact: () => void;
  onSave: () => void;
  isFavorited?: boolean;
}

const typeLabels = {
  house: "Rumah",
  apartment: "Apartemen",
  villa: "Villa",
  land: "Tanah",
  shophouse: "Ruko",
  office: "Kantor",
  warehouse: "Gudang",
};

export function PopupPreview({
  property,
  onClose,
  onOpenDetail,
  onContact,
  onSave,
  isFavorited = false,
}: PopupPreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const images = property.photos || ["/placeholder-property.jpg"];
  const hasMultipleImages = images.length > 1;

  // Navigate images
  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const message = `Halo, saya tertarik dengan properti: ${property.title} di ${property.city}. Link: ${window.location.origin}/listing/${property.slug}`;
    const whatsappUrl = getWhatsAppUrl("628123456789", message); // Default number, should come from agent
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-2xl z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b z-10">
          <div className="flex items-center justify-between p-4">
            <h3 className="font-semibold text-lg">Detail Properti</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {/* Image carousel */}
          <div className="relative aspect-[4/3] bg-muted">
            <Image
              src={imageError ? "/placeholder-property.jpg" : images[currentImageIndex]}
              alt={property.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              priority
            />
            
            {/* Image navigation */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                
                {/* Image indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        idx === currentImageIndex
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/75"
                      )}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Status badge */}
            <div className="absolute top-3 left-3">
              <span className={cn(
                "px-3 py-1 text-xs font-medium rounded-full",
                property.status === "sale" 
                  ? "bg-green-500/90 text-white" 
                  : "bg-blue-500/90 text-white"
              )}>
                {property.status === "sale" ? "Dijual" : "Disewa"}
              </span>
            </div>
          </div>

          {/* Property details */}
          <div className="p-4 space-y-4">
            {/* Price */}
            <div>
              <p className="text-2xl font-bold text-brand-gold">
                {formatPrice(property.price)}
              </p>
              {property.status === "rent" && (
                <p className="text-sm text-muted-foreground">/tahun</p>
              )}
            </div>

            {/* Title and type */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {typeLabels[property.type]}
              </p>
              <h4 className="mt-1 text-lg font-semibold line-clamp-2">
                {property.title}
              </h4>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">
                {property.city}
              </p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-accent/50 rounded-lg">
              {property.bedrooms && (
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {property.bedrooms} Kamar Tidur
                  </span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {property.bathrooms} Kamar Mandi
                  </span>
                </div>
              )}
              {property.buildingSize && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    LB: {property.buildingSize} m²
                  </span>
                </div>
              )}
              {property.landSize && (
                <div className="flex items-center gap-2">
                  <Maximize className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    LT: {property.landSize} m²
                  </span>
                </div>
              )}
            </div>

            {/* Quick info */}
            {property.landSize && (
              <div className="p-3 bg-brand-gold/5 border border-brand-gold/20 rounded-lg">
                <p className="text-sm text-brand-gold font-medium">
                  Harga per m²: {formatPrice(Math.round(property.price / property.landSize))}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="sticky bottom-0 bg-card border-t p-4">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              className={cn(
                "flex items-center gap-2",
                isFavorited && "text-red-500 border-red-500"
              )}
            >
              <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
              {isFavorited ? "Tersimpan" : "Simpan"}
            </Button>
          </div>
          <Button
            variant="gradient"
            className="w-full"
            onClick={onOpenDetail}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Lihat Detail Lengkap
          </Button>
        </div>
      </motion.div>

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
    </AnimatePresence>
  );
}
