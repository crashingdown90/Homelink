import { Suspense } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Calendar,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/lib/sanity/client";
import { GET_LEADS } from "@/lib/sanity/queries";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const configs = {
    new: {
      label: "New",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      icon: AlertCircle,
    },
    contacted: {
      label: "Contacted",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      icon: Phone,
    },
    qualified: {
      label: "Qualified",
      className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      icon: CheckCircle,
    },
    converted: {
      label: "Converted",
      className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      icon: CheckCircle,
    },
    closed: {
      label: "Closed",
      className: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
      icon: Clock,
    },
  };

  const config = configs[status as keyof typeof configs] || configs.new;
  const Icon = config.icon;

  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full font-medium", config.className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

// Priority badge component
function PriorityBadge({ priority }: { priority: string }) {
  const configs = {
    urgent: {
      label: "Urgent",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
    high: {
      label: "High",
      className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    },
    medium: {
      label: "Medium",
      className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    low: {
      label: "Low",
      className: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    },
  };

  const config = configs[priority as keyof typeof configs] || configs.medium;

  return (
    <span className={cn("px-2 py-1 text-xs rounded-full font-medium", config.className)}>
      {config.label}
    </span>
  );
}

export default async function AdminLeadsPage() {
  // Fetch leads from Sanity
  const leads = await sanityFetch(
    GET_LEADS,
    {
      status: null,
      priority: null,
      cursor: 0,
      limit: 100,
    },
    { cache: "no-store" }
  );

  // Count statistics
  const stats = {
    total: leads.length,
    new: leads.filter((l: any) => l.status === "new").length,
    contacted: leads.filter((l: any) => l.status === "contacted").length,
    qualified: leads.filter((l: any) => l.status === "qualified").length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-urbanist font-bold">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track property inquiries
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
        </div>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Mail className="h-8 w-8 text-muted-foreground/20" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New</p>
              <p className="text-2xl font-bold text-green-600">{stats.new}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-green-600/20" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contacted</p>
              <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
            </div>
            <Phone className="h-8 w-8 text-blue-600/20" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Qualified</p>
              <p className="text-2xl font-bold text-purple-600">{stats.qualified}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-600/20" />
          </div>
        </div>
      </div>

      {/* Leads table */}
      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-sm">Name</th>
                <th className="text-left p-4 font-medium text-sm">Contact</th>
                <th className="text-left p-4 font-medium text-sm">Subject</th>
                <th className="text-left p-4 font-medium text-sm">Status</th>
                <th className="text-left p-4 font-medium text-sm">Priority</th>
                <th className="text-left p-4 font-medium text-sm">Assigned To</th>
                <th className="text-left p-4 font-medium text-sm">Date</th>
                <th className="text-left p-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leads && leads.length > 0 ? (
                leads.map((lead: any) => (
                  <tr key={lead._id} className="hover:bg-accent/50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        {lead.listingSlug && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Property: {lead.listingSlug}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {lead.email && (
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        )}
                        {lead.phone && (
                          <p className="text-sm text-muted-foreground">{lead.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm capitalize">
                        {lead.subject?.replace("_", " ") || "General"}
                      </p>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="p-4">
                      <PriorityBadge priority={lead.priority} />
                    </td>
                    <td className="p-4">
                      {lead.assignedTo ? (
                        <p className="text-sm">{lead.assignedTo.name}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Unassigned</p>
                      )}
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm">{formatDate(lead.createdAt)}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(lead.createdAt)}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <Link href={`/admin/leads/${lead._id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {leads && leads.length > 0 && (
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing 1 to {leads.length} of {leads.length} results
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
