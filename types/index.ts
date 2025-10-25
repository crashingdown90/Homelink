// Property/Listing Types
export interface Property {
  _id: string;
  title: string;
  slug: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  buildingSize?: number;
  landSize?: number;
  certificate?: CertificateType;
  city: string;
  province: string;
  address?: string;
  location: {
    lat: number;
    lng: number;
  };
  photos: string[];
  amenities?: string[];
  neighborhood?: string;
  yearBuilt?: number;
  facing?: string;
  agent?: Agent;
  listedAt: string;
  description?: string;
}

export interface PropertySummary {
  _id: string;
  title: string;
  slug: string;
  price: number;
  type: PropertyType;
  city: string;
  photos: string[];
  bedrooms?: number;
  bathrooms?: number;
  buildingSize?: number;
  landSize?: number;
  status: PropertyStatus;
  listedAt?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export enum PropertyType {
  HOUSE = "house",
  APARTMENT = "apartment",
  VILLA = "villa",
  LAND = "land",
  SHOPHOUSE = "shophouse",
  OFFICE = "office",
  WAREHOUSE = "warehouse",
}

export enum PropertyStatus {
  SALE = "sale",
  RENT = "rent",
  SOLD = "sold",
  RENTED = "rented",
}

export enum CertificateType {
  SHM = "shm",
  HGB = "hgb",
  SHGB = "shgb",
  GIRIK = "girik",
  AJB = "ajb",
  PPJB = "ppjb",
}

// Agent Types
export interface Agent {
  _id: string;
  name: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  avatar?: string;
  office?: string;
  verified?: boolean;
  rating?: number;
  totalReviews?: number;
  yearsOfExperience?: number;
  specializations?: string[];
  licenseNumber?: string;
}

// Article/Blog Types
export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  cover?: string;
  category: ArticleCategory;
  author?: string;
  publishedAt: string;
  body: any; // Portable Text from Sanity
}

export enum ArticleCategory {
  TIPS = "tips",
  TREN = "tren",
  TEKNOLOGI = "teknologi",
  HUNIAN_HIJAU = "hunian_hijau",
}

// Lead/Contact Form Types
export interface Lead {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  listingSlug?: string;
  subject?: string;
  consent: boolean;
  turnstileToken: string;
}

export interface LeadSubmission extends Omit<Lead, "turnstileToken"> {
  _id?: string;
  createdAt?: string;
}

// Search & Filter Types
export interface SearchFilters {
  q?: string;
  city?: string;
  province?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: PropertyType;
  bedrooms?: number;
  minLand?: number;
  status?: PropertyStatus;
  sort?: SortOption;
}

export interface MapBounds {
  neLat: number;
  neLng: number;
  swLat: number;
  swLng: number;
}

export enum SortOption {
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  NEWEST = "newest",
  OLDEST = "oldest",
}

// API Response Types
export interface ListingsResponse {
  items: PropertySummary[];
  nextCursor?: string;
  total?: number;
}

export interface SearchResponse {
  items: PropertySummary[];
  bounds?: MapBounds;
}

export interface ApiError {
  error: string;
  message?: string;
  details?: any;
}

export interface LeadResponse {
  ok: boolean;
  error?: string;
  id?: string;
}

// UI Component Props Types
export interface SearchBarProps {
  onSubmit: (filters: SearchFilters) => void;
  defaultValues?: SearchFilters;
  className?: string;
}

export interface FilterPanelProps {
  value: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onReset: () => void;
  className?: string;
}

export interface PropertyCardProps {
  property: PropertySummary;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export interface PopupPreviewProps {
  property: PropertySummary;
  onClose: () => void;
  onOpenDetail: () => void;
  onContact: () => void;
  onSave: () => void;
}

export interface MapViewProps {
  properties: PropertySummary[];
  onBoundsChange?: (bounds: MapBounds) => void;
  selectedProperty?: string;
  onPropertySelect?: (id: string) => void;
}

export interface AgentCardProps {
  agent: Agent;
  listingSlug?: string;
}

export interface ContactFormProps {
  listingSlug?: string;
  subject?: string;
  onSuccess?: () => void;
}

// Analytics Event Types
export interface AnalyticsEvent {
  event: string;
  parameters?: Record<string, any>;
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

// Theme Types
export type Theme = "light" | "dark";

// Pagination Types
export interface PaginationParams {
  cursor?: string;
  limit?: number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  topic?: string;
  consent: boolean;
}

// Map Cluster Types
export interface MapCluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  properties: PropertySummary[];
}

// Developer/Pricing Types
export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

// Local Storage Types
export interface SavedSearch {
  id: string;
  filters: SearchFilters;
  timestamp: string;
}

export interface FavoriteProperty {
  id: string;
  savedAt: string;
}

// Admin Types
export interface AdminUser {
  email: string;
  name?: string;
  image?: string;
  role?: "admin" | "editor";
}

export interface AdminStats {
  totalListings: number;
  totalLeads: number;
  totalArticles: number;
  recentLeads: LeadSubmission[];
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  jsonLd?: any;
}

// Environment Configuration
export interface AppConfig {
  siteUrl: string;
  mapboxToken: string;
  sanityProjectId: string;
  sanityDataset: string;
  turnstileSiteKey: string;
  ga4Id?: string;
  fbPixelId?: string;
}
