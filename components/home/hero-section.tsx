"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  ChevronRight,
  Phone
} from "lucide-react";
import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import type { SearchFilters } from "@/types";

export function HeroSection() {
  const router = useRouter();

  const handleSearch = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, value.toString());
      }
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-electric-blue-1">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-urbanist font-bold mb-6">
            Temukan Hunian Masa Depanmu
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Platform properti digital terhubung — mudah, aman, dan tepercaya
          </p>
          
          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 shadow-2xl">
            <SearchBar
              onSubmit={handleSearch}
              className="border-0"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              variant="gradient"
              className="group"
              asChild
            >
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Cari Hunian
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              asChild
            >
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Hubungi Kami
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-bold text-brand-gold">1000+</p>
              <p className="text-sm text-white/80 mt-1">Properti Tersedia</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-gold">50+</p>
              <p className="text-sm text-white/80 mt-1">Kota di Indonesia</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-gold">98%</p>
              <p className="text-sm text-white/80 mt-1">Kepuasan Pelanggan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
