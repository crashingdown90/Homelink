"use client";

import {
  Bed,
  Bath,
  Building,
  Maximize,
  Home,
  MapPin,
  Calendar,
  Compass,
  FileText,
  Layers,
  Car,
  Trees,
  Wifi,
  Droplets,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Property } from "@/types";

interface PropertySpecsProps {
  property: Property;
  className?: string;
}

const certificateLabels: Record<string, string> = {
  shm: "SHM - Sertifikat Hak Milik",
  hgb: "HGB - Hak Guna Bangunan",
  shgb: "SHGB - Sertifikat HGB",
  girik: "Girik",
  ajb: "AJB - Akta Jual Beli",
  ppjb: "PPJB - Perjanjian Pengikatan Jual Beli",
};

const facingLabels: Record<string, string> = {
  north: "Utara",
  northeast: "Timur Laut",
  east: "Timur",
  southeast: "Tenggara",
  south: "Selatan",
  southwest: "Barat Daya",
  west: "Barat",
  northwest: "Barat Laut",
};

const typeLabels: Record<string, string> = {
  house: "Rumah",
  apartment: "Apartemen",
  villa: "Villa",
  land: "Tanah",
  shophouse: "Ruko",
  office: "Kantor",
  warehouse: "Gudang",
};

export function PropertySpecs({ property, className }: PropertySpecsProps) {
  // Group specifications by category
  const mainSpecs = [
    {
      icon: Bed,
      label: "Kamar Tidur",
      value: property.bedrooms ? `${property.bedrooms} Kamar` : "-",
      available: !!property.bedrooms,
    },
    {
      icon: Bath,
      label: "Kamar Mandi",
      value: property.bathrooms ? `${property.bathrooms} Kamar` : "-",
      available: !!property.bathrooms,
    },
    {
      icon: Building,
      label: "Luas Bangunan",
      value: property.buildingSize ? `${property.buildingSize} m²` : "-",
      available: !!property.buildingSize,
    },
    {
      icon: Maximize,
      label: "Luas Tanah",
      value: property.landSize ? `${property.landSize} m²` : "-",
      available: !!property.landSize,
    },
  ];

  const additionalSpecs = [
    {
      icon: Home,
      label: "Tipe Properti",
      value: typeLabels[property.type] || property.type,
    },
    {
      icon: FileText,
      label: "Sertifikat",
      value: property.certificate ? certificateLabels[property.certificate] : "Informasi sertifikat belum tersedia",
    },
    {
      icon: Calendar,
      label: "Tahun Dibangun",
      value: property.yearBuilt ? property.yearBuilt.toString() : "-",
    },
    {
      icon: Compass,
      label: "Hadap",
      value: property.facing ? facingLabels[property.facing] : "-",
    },
  ];

  // Calculate price per square meter
  const pricePerSqm = property.landSize
    ? Math.round(property.price / property.landSize)
    : null;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main specifications grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Spesifikasi Utama</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mainSpecs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.label}
                className="bg-accent/50 dark:bg-accent/20 rounded-xl p-4 text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand-gold" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{spec.label}</p>
                <p className="font-semibold mt-1">{spec.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price breakdown */}
      {pricePerSqm && (
        <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-xl p-4">
          <h4 className="font-medium mb-2">Informasi Harga</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Harga Total</span>
              <span className="font-semibold">{formatPrice(property.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Harga per m²</span>
              <span className="font-medium">{formatPrice(pricePerSqm)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Additional specifications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Informasi Tambahan</h3>
        <div className="space-y-3">
          {additionalSpecs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div key={spec.label} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{spec.label}</p>
                  <p className="font-medium">{spec.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Fasilitas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {property.amenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Neighborhood */}
      {property.neighborhood && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Lingkungan Sekitar</h3>
          <div className="bg-accent/50 dark:bg-accent/20 rounded-xl p-4">
            <div className="flex gap-3">
              <Trees className="h-5 w-5 text-brand-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {property.neighborhood}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Location details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Lokasi</h3>
        <div className="space-y-2">
          {property.address && (
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Alamat</p>
                <p className="font-medium">{property.address}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Kota/Provinsi</p>
              <p className="font-medium">
                {property.city}, {property.province}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4 text-green-500" />
        <span className="text-sm font-medium text-green-600 dark:text-green-400">
          Properti Terverifikasi
        </span>
      </div>
    </div>
  );
}
