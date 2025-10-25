"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Listing page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
          <div className="relative bg-red-500/10 rounded-full w-24 h-24 flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-urbanist font-bold text-foreground">
            Error Memuat Properti
          </h1>
          <p className="text-muted-foreground">
            Maaf, terjadi kesalahan saat memuat detail properti. 
            Properti mungkin tidak tersedia atau telah dihapus.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="default"
            size="lg"
            className="group"
          >
            Coba Lagi
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Cari Properti Lain
            </Link>
          </Button>
        </div>

        {/* Additional help */}
        <div className="pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            Kembali ke{" "}
            <Link
              href="/"
              className="text-brand-gold hover:underline font-medium"
            >
              Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
