import { requireAdmin } from "@/lib/auth/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata = {
  title: "Admin Dashboard | Homelink",
  description: "Admin dashboard for managing Homelink properties and leads",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require admin authentication
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <AdminHeader user={session.user} />
      
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="flex-1 lg:pl-64 pt-16">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
