"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Cari Hunian", href: "/search" },
  { name: "Insight", href: "/insight" },
  { name: "Developers", href: "/developers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isHomePage = pathname === "/";

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || !isHomePage
          ? "navbar-blur shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gold rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-gold to-brand-gold/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-urbanist font-black text-xl md:text-2xl">
                  H
                </span>
              </div>
            </div>
            <span
              className={cn(
                "font-urbanist font-bold text-xl md:text-2xl transition-colors",
                isScrolled || !isHomePage
                  ? "text-foreground"
                  : "text-white"
              )}
            >
              Homelink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? isScrolled || !isHomePage
                        ? "bg-brand-gold/10 text-brand-gold"
                        : "bg-white/10 text-white"
                      : isScrolled || !isHomePage
                      ? "text-muted hover:text-foreground hover:bg-accent"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "rounded-xl",
                  isScrolled || !isHomePage
                    ? ""
                    : "text-white hover:bg-white/10"
                )}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            {/* CTA Button */}
            <Button
              variant="gradient"
              size="lg"
              className="rounded-full shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/search">
                Mulai Cari Hunian
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "rounded-xl",
                  isScrolled || !isHomePage
                    ? ""
                    : "text-white hover:bg-white/10"
                )}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "rounded-xl",
                isScrolled || !isHomePage
                  ? ""
                  : "text-white hover:bg-white/10"
              )}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 bg-background/95 backdrop-blur-xl transition-all duration-300 transform",
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container-custom py-6 h-full overflow-y-auto">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-medium transition-all",
                    isActive
                      ? "bg-brand-gold/10 text-brand-gold"
                      : "text-foreground hover:bg-accent"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 pt-8 border-t">
            <Button
              variant="gradient"
              size="lg"
              className="w-full rounded-full"
              asChild
            >
              <Link href="/search">
                Mulai Cari Hunian
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
