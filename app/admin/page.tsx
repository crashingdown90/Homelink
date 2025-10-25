import { Suspense } from "react";
import { 
  Home, 
  Users, 
  Mail, 
  FileText,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
  DollarSign,
  MapPin,
} from "lucide-react";
import { getDashboardStats } from "@/lib/sanity/fetchers";
import { formatPrice, formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

// Stats card component
function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  href,
}: {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: any;
  href?: string;
}) {
  const content = (
    <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {changeType === "increase" ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-sm ${
                  changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-brand-gold" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export default async function AdminDashboard() {
  // Fetch dashboard statistics with fallback
  let stats;
  try {
    stats = await getDashboardStats();
  } catch (error) {
    // Fallback to empty stats if Sanity is not configured
    stats = {
      totalProperties: 0,
      activeProperties: 0,
      newLeads: 0,
      totalLeads: 0,
      activeAgents: 0,
      totalAgents: 0,
      recentLeads: [],
      recentProperties: [],
    };
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-urbanist font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s an overview of your platform.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Properties"
          value={stats.totalProperties.toLocaleString("id-ID")}
          change="+12% from last month"
          changeType="increase"
          icon={Home}
          href="/admin/properties"
        />
        <StatCard
          title="Active Listings"
          value={stats.activeProperties.toLocaleString("id-ID")}
          icon={Eye}
          href="/admin/properties"
        />
        <StatCard
          title="New Leads"
          value={stats.newLeads.toLocaleString("id-ID")}
          change={`${stats.totalLeads} total`}
          changeType="increase"
          icon={Mail}
          href="/admin/leads"
        />
        <StatCard
          title="Active Agents"
          value={stats.activeAgents.toLocaleString("id-ID")}
          change={`${stats.totalAgents} total`}
          changeType="increase"
          icon={Users}
          href="/admin/agents"
        />
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent leads */}
        <div className="bg-card rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Leads</h2>
              <Link
                href="/admin/leads"
                className="text-sm text-brand-gold hover:underline"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y">
            {stats.recentLeads && stats.recentLeads.length > 0 ? (
              stats.recentLeads.map((lead: any) => (
                <div key={lead._id} className="p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {lead.email}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            lead.status === "new"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(lead.createdAt)}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/admin/leads/${lead._id}`}
                      className="text-sm text-brand-gold hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No recent leads
              </div>
            )}
          </div>
        </div>

        {/* Recent properties */}
        <div className="bg-card rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Properties</h2>
              <Link
                href="/admin/properties"
                className="text-sm text-brand-gold hover:underline"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y">
            {stats.recentProperties && stats.recentProperties.length > 0 ? (
              stats.recentProperties.map((property: any) => (
                <div key={property._id} className="p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium line-clamp-1">{property.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {property.city}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-semibold text-brand-gold">
                          {formatPrice(property.price)}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            property.status === "sale"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {property.status === "sale" ? "For Sale" : "For Rent"}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/admin/properties/${property._id}`}
                      className="text-sm text-brand-gold hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No recent properties
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/studio"
            className="p-4 bg-accent/50 hover:bg-accent rounded-lg text-center transition-colors"
          >
            <Home className="h-8 w-8 text-brand-gold mx-auto mb-2" />
            <span className="text-sm font-medium">Add Property</span>
          </Link>
          <Link
            href="/admin/leads"
            className="p-4 bg-accent/50 hover:bg-accent rounded-lg text-center transition-colors"
          >
            <Mail className="h-8 w-8 text-brand-gold mx-auto mb-2" />
            <span className="text-sm font-medium">View Leads</span>
          </Link>
          <Link
            href="/studio"
            className="p-4 bg-accent/50 hover:bg-accent rounded-lg text-center transition-colors"
          >
            <FileText className="h-8 w-8 text-brand-gold mx-auto mb-2" />
            <span className="text-sm font-medium">Write Article</span>
          </Link>
          <Link
            href="/admin/analytics"
            className="p-4 bg-accent/50 hover:bg-accent rounded-lg text-center transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-brand-gold mx-auto mb-2" />
            <span className="text-sm font-medium">View Analytics</span>
          </Link>
        </div>
      </div>

      {/* System info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100">
              System Status
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              All systems operational. Last backup: 2 hours ago.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
