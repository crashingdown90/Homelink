import type { PropertySummary } from "@/types";
import { PropertyType, PropertyStatus } from "@/types";

/**
 * Dummy property data for development and testing
 * Using Unsplash images for property photos
 */
export const dummyProperties: PropertySummary[] = [
  {
    _id: "dummy-1",
    title: "Rumah Modern Minimalis di Jakarta Selatan",
    slug: "rumah-modern-minimalis-jakarta-selatan",
    price: 3500000000,
    type: PropertyType.HOUSE,
    status: PropertyStatus.SALE,
    bedrooms: 4,
    bathrooms: 3,
    buildingSize: 200,
    landSize: 250,
    city: "Jakarta Selatan",
    photos: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    ],
    location: {
      lat: -6.2615,
      lng: 106.8106,
    },
    listedAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "dummy-2",
    title: "Apartemen Mewah dengan View Kota di Sudirman",
    slug: "apartemen-mewah-view-kota-sudirman",
    price: 2800000000,
    type: PropertyType.APARTMENT,
    status: PropertyStatus.SALE,
    bedrooms: 3,
    bathrooms: 2,
    buildingSize: 120,
    city: "Jakarta Pusat",
    photos: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    location: {
      lat: -6.2088,
      lng: 106.8456,
    },
    listedAt: "2024-01-20T14:30:00Z",
  },
  {
    _id: "dummy-3",
    title: "Villa Tropis dengan Kolam Renang di Bali",
    slug: "villa-tropis-kolam-renang-bali",
    price: 5500000000,
    type: PropertyType.VILLA,
    status: PropertyStatus.SALE,
    bedrooms: 5,
    bathrooms: 4,
    buildingSize: 350,
    landSize: 500,
    city: "Badung",
    photos: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    ],
    location: {
      lat: -8.6705,
      lng: 115.2126,
    },
    listedAt: "2024-01-18T09:00:00Z",
  },
  {
    _id: "dummy-4",
    title: "Rumah Cluster Siap Huni di BSD City",
    slug: "rumah-cluster-siap-huni-bsd-city",
    price: 1850000000,
    type: PropertyType.HOUSE,
    status: PropertyStatus.SALE,
    bedrooms: 3,
    bathrooms: 2,
    buildingSize: 120,
    landSize: 150,
    city: "Tangerang Selatan",
    photos: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    ],
    location: {
      lat: -6.3018,
      lng: 106.6519,
    },
    listedAt: "2024-01-22T11:15:00Z",
  },
  {
    _id: "dummy-5",
    title: "Apartemen Studio Strategis di Bandung",
    slug: "apartemen-studio-strategis-bandung",
    price: 650000000,
    type: PropertyType.APARTMENT,
    status: PropertyStatus.SALE,
    bedrooms: 1,
    bathrooms: 1,
    buildingSize: 35,
    city: "Bandung",
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
    ],
    location: {
      lat: -6.9175,
      lng: 107.6191,
    },
    listedAt: "2024-01-25T16:45:00Z",
  },
  {
    _id: "dummy-6",
    title: "Ruko 3 Lantai Lokasi Premium di Surabaya",
    slug: "ruko-3-lantai-lokasi-premium-surabaya",
    price: 4200000000,
    type: PropertyType.SHOPHOUSE,
    status: PropertyStatus.SALE,
    bedrooms: 2,
    bathrooms: 3,
    buildingSize: 180,
    landSize: 100,
    city: "Surabaya",
    photos: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
    location: {
      lat: -7.2575,
      lng: 112.7521,
    },
    listedAt: "2024-01-12T08:30:00Z",
  },
  {
    _id: "dummy-7",
    title: "Rumah Klasik Eropa di Menteng",
    slug: "rumah-klasik-eropa-menteng",
    price: 12000000000,
    type: PropertyType.HOUSE,
    status: PropertyStatus.SALE,
    bedrooms: 6,
    bathrooms: 5,
    buildingSize: 500,
    landSize: 600,
    city: "Jakarta Pusat",
    photos: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
    ],
    location: {
      lat: -6.1944,
      lng: 106.8229,
    },
    listedAt: "2024-01-10T13:00:00Z",
  },
  {
    _id: "dummy-8",
    title: "Apartemen 2BR Furnished di Kemang",
    slug: "apartemen-2br-furnished-kemang",
    price: 45000000,
    type: PropertyType.APARTMENT,
    status: PropertyStatus.RENT,
    bedrooms: 2,
    bathrooms: 1,
    buildingSize: 65,
    city: "Jakarta Selatan",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-444092139f8c?w=800&q=80",
    ],
    location: {
      lat: -6.2615,
      lng: 106.8168,
    },
    listedAt: "2024-01-28T10:20:00Z",
  },
  {
    _id: "dummy-9",
    title: "Tanah Kavling Siap Bangun di Sentul",
    slug: "tanah-kavling-siap-bangun-sentul",
    price: 1200000000,
    type: PropertyType.LAND,
    status: PropertyStatus.SALE,
    landSize: 300,
    city: "Bogor",
    photos: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    ],
    location: {
      lat: -6.5603,
      lng: 106.9447,
    },
    listedAt: "2024-01-05T15:00:00Z",
  },
  {
    _id: "dummy-10",
    title: "Rumah Townhouse 2 Lantai di Alam Sutera",
    slug: "rumah-townhouse-2-lantai-alam-sutera",
    price: 2300000000,
    type: PropertyType.HOUSE,
    status: PropertyStatus.SALE,
    bedrooms: 3,
    bathrooms: 3,
    buildingSize: 140,
    landSize: 90,
    city: "Tangerang",
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
    ],
    location: {
      lat: -6.2382,
      lng: 106.6631,
    },
    listedAt: "2024-01-30T09:45:00Z",
  },
  {
    _id: "dummy-11",
    title: "Villa View Gunung di Puncak",
    slug: "villa-view-gunung-puncak",
    price: 3800000000,
    type: PropertyType.VILLA,
    status: PropertyStatus.SALE,
    bedrooms: 4,
    bathrooms: 3,
    buildingSize: 250,
    landSize: 400,
    city: "Bogor",
    photos: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    location: {
      lat: -6.6992,
      lng: 106.9447,
    },
    listedAt: "2024-01-08T12:30:00Z",
  },
  {
    _id: "dummy-12",
    title: "Kantor Modern di SCBD",
    slug: "kantor-modern-scbd",
    price: 150000000,
    type: PropertyType.OFFICE,
    status: PropertyStatus.RENT,
    buildingSize: 200,
    city: "Jakarta Selatan",
    photos: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    ],
    location: {
      lat: -6.2253,
      lng: 106.8031,
    },
    listedAt: "2024-02-01T14:00:00Z",
  },
];

/**
 * Get dummy properties with optional filters
 */
export function getDummyProperties(filters?: {
  type?: string;
  status?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}): PropertySummary[] {
  let filtered = [...dummyProperties];

  if (filters) {
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    if (filters.city) {
      filtered = filtered.filter(p => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(p => (p.bedrooms || 0) >= filters.bedrooms!);
    }
  }

  return filtered;
}

