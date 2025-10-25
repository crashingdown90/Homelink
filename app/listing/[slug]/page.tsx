import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin,
  Calendar,
  Eye,
  Loader
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertySpecs } from "@/components/property/property-specs";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyActions } from "@/components/property/property-actions";
import { AgentCard } from "@/components/contact/agent-card";
import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { 
  getPropertyBySlug, 
  getRelatedProperties 
} from "@/lib/sanity/fetchers";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Property } from "@/types";

// Dynamic import for MapView to avoid SSR issues
const MapPinpoint = dynamic(
  () => import("@/components/property/map-pinpoint").then(mod => mod.MapPinpoint),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-muted rounded-2xl flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-brand-gold" />
      </div>
    )
  }
);

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const property = await getPropertyBySlug(params.slug);
  
  if (!property) {
    return {
      title: "Properti Tidak Ditemukan",
    };
  }

  return {
    title: property.title,
    description: `${property.type} di ${property.city}. ${property.description || ""}`.slice(0, 160),
    openGraph: {
      title: property.title,
      description: `${property.type} di ${property.city}`,
      images: property.photos?.[0] ? [property.photos[0]] : [],
    },
  };
}

export default async function ListingDetailPage({ params }: PageProps) {
  // Fetch property data
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  // Fetch related properties
  const relatedProperties = await getRelatedProperties(
    property.slug,
    property.city,
    property.type,
    6
  );

  // Generate breadcrumb data
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Cari Hunian", href: "/search" },
    { label: property.city, href: `/search?city=${encodeURIComponent(property.city)}` },
    { label: property.title, href: "#" },
  ];

  // Status labels
  const statusLabel = property.status === "sale" ? "Dijual" : "Disewa";
  const typeLabel = {
    house: "Rumah",
    apartment: "Apartemen",
    villa: "Villa",
    land: "Tanah",
    shophouse: "Ruko",
    office: "Kantor",
    warehouse: "Gudang",
  }[property.type] || property.type;

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="container-custom pt-24 pb-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {idx > 0 && <span>/</span>}
                {crumb.href !== "#" ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-brand-gold transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium truncate max-w-[200px]">
                    {crumb.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="container-custom pb-12">
          {/* Gallery */}
          <PropertyGallery
            images={property.photos || []}
            title={property.title}
          />

          {/* Main content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Property details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {/* Status and type badges */}
                    <div className="flex gap-2 mb-3">
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium rounded-full">
                        {statusLabel}
                      </span>
                      <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full">
                        {typeLabel}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-urbanist font-bold">
                      {property.title}
                    </h1>

                    {/* Location */}
                    <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{property.address || `${property.city}, ${property.province}`}</span>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Dipasang {formatDate(property.listedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>234 kali dilihat</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <PropertyActions 
                    title={property.title}
                    propertyId={property._id}
                  />
                </div>

                {/* Price */}
                <div className="mt-6 p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-xl">
                  <p className="text-3xl font-bold text-brand-gold">
                    {formatPrice(property.price)}
                  </p>
                  {property.status === "rent" && (
                    <p className="text-sm text-muted-foreground mt-1">/tahun</p>
                  )}
                  {property.landSize && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {formatPrice(Math.round(property.price / property.landSize))} per m²
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Deskripsi</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              )}

              {/* Specifications */}
              <PropertySpecs property={property} />

              {/* Map */}
              {property.location && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Lokasi di Peta</h2>
                  <Suspense fallback={<div>Loading map...</div>}>
                    <MapPinpoint
                      latitude={property.location.lat}
                      longitude={property.location.lng}
                      title={property.title}
                      address={property.address || `${property.city}, ${property.province}`}
                    />
                  </Suspense>
                </div>
              )}
            </div>

            {/* Right column - Contact */}
            <div className="space-y-6">
              {/* Agent card */}
              {property.agent ? (
                <AgentCard
                  agent={property.agent}
                  listingSlug={property.slug}
                  listingTitle={property.title}
                />
              ) : (
                <div className="bg-card rounded-2xl p-6 shadow-sm text-center">
                  <p className="text-muted-foreground">
                    Informasi agen tidak tersedia
                  </p>
                  <Button variant="gradient" className="mt-4 w-full">
                    Hubungi Homelink
                  </Button>
                </div>
              )}

              {/* Contact form */}
              <ContactForm
                listingSlug={property.slug}
                listingTitle={property.title}
                subject="property"
                agentName={property.agent?.name}
              />

              {/* Safety tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Tips Keamanan
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Verifikasi dokumen properti</li>
                  <li>• Kunjungi properti secara langsung</li>
                  <li>• Gunakan jasa notaris terpercaya</li>
                  <li>• Jangan transfer sebelum deal clear</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related properties */}
          {relatedProperties.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Properti Serupa</h2>
                <Link
                  href={`/search?city=${encodeURIComponent(property.city)}&type=${property.type}`}
                  className="text-brand-gold hover:underline text-sm font-medium"
                >
                  Lihat Semua →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProperties.map((relatedProperty) => (
                  <PropertyCard
                    key={relatedProperty._id}
                    property={relatedProperty}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
