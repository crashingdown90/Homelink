import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/lib/sanity/fetchers";
import { formatPrice, formatDate, cn } from "@/lib/utils";

// Property status badge
function StatusBadge({ status }: { status: string }) {
  const configs = {
    sale: {
      label: "For Sale",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    rent: {
      label: "For Rent",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    sold: {
      label: "Sold",
      className: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    },
    rented: {
      label: "Rented",
      className: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    },
  };

  const config = configs[status as keyof typeof configs] || configs.sale;

  return (
    <span className={cn("px-2 py-1 text-xs rounded-full font-medium", config.className)}>
      {config.label}
    </span>
  );
}

export default async function AdminPropertiesPage() {
  // Fetch properties
  const properties = await getProperties({ limit: 100 });

  // Calculate statistics
  const stats = {
    total: properties.length,
    forSale: properties.filter(p => p.status === "sale").length,
    forRent: properties.filter(p => p.status === "rent").length,
    sold: properties.filter(p => p.status === "sold").length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-urbanist font-bold">Properties</h1>
          <p className="text-muted-foreground mt-1">
            Manage property listings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" asChild>
            <Link href="/studio">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Home className="h-8 w-8 text-muted-foreground/20" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">For Sale</p>
              <p className="text-2xl font-bold text-green-600">{stats.forSale}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600/20" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">For Rent</p>
              <p className="text-2xl font-bold text-blue-600">{stats.forRent}</p>
            </div>
            <Home className="h-8 w-8 text-blue-600/20" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sold</p>
              <p className="text-2xl font-bold text-gray-600">{stats.sold}</p>
            </div>
            <Home className="h-8 w-8 text-gray-600/20" />
          </div>
        </div>
      </div>

      {/* Properties table */}
      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-sm">Property</th>
                <th className="text-left p-4 font-medium text-sm">Location</th>
                <th className="text-left p-4 font-medium text-sm">Type</th>
                <th className="text-left p-4 font-medium text-sm">Price</th>
                <th className="text-left p-4 font-medium text-sm">Status</th>
                <th className="text-left p-4 font-medium text-sm">Listed</th>
                <th className="text-left p-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {properties && properties.length > 0 ? (
                properties.map((property) => (
                  <tr key={property._id} className="hover:bg-accent/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          {property.photos?.[0] ? (
                            <Image
                              src={property.photos[0]}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Home className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium line-clamp-1">{property.title}</p>
                          <p className="text-xs text-muted-foreground">
                            ID: {property._id.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{property.city}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm capitalize">{property.type}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold">{formatPrice(property.price)}</p>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={property.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">
                          {property.listedAt ? formatDate(property.listedAt) : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <Link href={`/listing/${property.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <Link href={`/studio/desk/property;${property._id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          disabled
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No properties found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {properties && properties.length > 0 && (
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing 1 to {properties.length} of {properties.length} results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
