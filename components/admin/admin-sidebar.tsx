"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Users,
  FileText,
  Mail,
  Settings,
  BarChart,
  Shield,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Properties",
    icon: Home,
    href: "/admin/properties",
    badge: null,
  },
  {
    title: "Leads",
    icon: Mail,
    href: "/admin/leads",
    badge: "new",
  },
  {
    title: "Articles",
    icon: FileText,
    href: "/admin/articles",
  },
  {
    title: "Agents",
    icon: Users,
    href: "/admin/agents",
  },
  {
    title: "Analytics",
    icon: BarChart,
    href: "/admin/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-brand-gold text-white rounded-full shadow-lg hover:bg-brand-gold/90 transition-colors"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 w-64 bg-card border-r transform transition-transform duration-300 z-40",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <nav className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="p-6 border-b">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-28 h-8">
                <Image
                  src="/Homelink_Logo.png"
                  alt="Homelink Admin"
                  fill
                  className="object-contain"
                  sizes="112px"
                />
              </div>
              <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-brand-gold/10 text-brand-gold font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge === "new" && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
                          New
                        </span>
                      )}
                      {isActive && <ChevronRight className="h-4 w-4" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom section */}
          <div className="p-4 border-t space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>View Site</span>
            </Link>
            <Link
              href="/admin/logout"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
