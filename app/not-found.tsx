import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-[10rem] font-urbanist font-black text-muted/20 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-brand-gold/10 rounded-full p-6">
              <Search className="h-12 w-12 text-brand-gold" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-urbanist font-bold text-foreground">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman
            telah dipindahkan atau tidak lagi tersedia.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            size="lg"
            asChild
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Cari Properti
            </Link>
          </Button>
        </div>

        {/* Suggestions */}
        <div className="pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Mungkin Anda tertarik dengan:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/search?type=house"
              className="px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-sm transition-colors"
            >
              Rumah
            </Link>
            <Link
              href="/search?type=apartment"
              className="px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-sm transition-colors"
            >
              Apartemen
            </Link>
            <Link
              href="/search?type=villa"
              className="px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-sm transition-colors"
            >
              Villa
            </Link>
            <Link
              href="/insight"
              className="px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-sm transition-colors"
            >
              Insight
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
