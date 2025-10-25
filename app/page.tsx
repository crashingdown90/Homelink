import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  Home, 
  Shield, 
  TrendingUp, 
  MapPin,
  Users,
  ChevronRight,
  Star,
  Phone,
  Mail
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/hero-section";
import { PropertyCard } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProperties } from "@/lib/sanity/fetchers";

export const metadata = {
  title: "Homelink - Temukan Hunian Masa Depanmu",
  description: "Platform properti digital terhubung - mudah, aman, dan tepercaya. Cari rumah, apartemen, villa di seluruh Indonesia.",
};

export default async function HomePage() {
  // Fetch featured properties
  const featuredProperties = await getFeaturedProperties(8);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="py-20 bg-accent/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-urbanist font-bold mb-4">
                Mengapa Memilih Homelink?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Platform properti modern dengan teknologi terkini untuk pengalaman terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <Search className="h-7 w-7 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pencarian Cerdas</h3>
                <p className="text-muted-foreground">
                  Temukan properti impian dengan filter canggih dan pencarian berbasis lokasi yang akurat
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aman & Terpercaya</h3>
                <p className="text-muted-foreground">
                  Semua properti terverifikasi dengan dokumen lengkap dan agen berlisensi
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Harga Transparan</h3>
                <p className="text-muted-foreground">
                  Informasi harga yang jelas tanpa biaya tersembunyi, dengan analisis pasar real-time
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="h-7 w-7 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Jangkauan Nasional</h3>
                <p className="text-muted-foreground">
                  Properti dari Sabang sampai Merauke, semua ada dalam satu platform
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Agen Profesional</h3>
                <p className="text-muted-foreground">
                  Terhubung dengan agen properti berpengalaman dan berlisensi resmi
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <Home className="h-7 w-7 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Virtual Tour</h3>
                <p className="text-muted-foreground">
                  Lihat properti secara virtual dengan foto 360° dan video walkthrough
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        {featuredProperties && featuredProperties.length > 0 && (
          <section className="py-20">
            <div className="container-custom">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-urbanist font-bold mb-2">
                    Properti Pilihan
                  </h2>
                  <p className="text-muted-foreground">
                    Temukan properti terbaik yang telah kami kurasi untuk Anda
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/search">
                    Lihat Semua
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProperties.slice(0, 8).map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Map Preview */}
        <section className="py-20 bg-accent/30">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-urbanist font-bold mb-4">
                Jelajahi Properti di Peta
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Temukan properti berdasarkan lokasi yang Anda inginkan dengan peta interaktif
              </p>
            </div>
            
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden h-[500px] flex items-center justify-center">
              <Link
                href="/search?view=map"
                className="text-center p-8 hover:scale-105 transition-transform"
              >
                <MapPin className="h-16 w-16 text-brand-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Buka Peta Interaktif</h3>
                <p className="text-muted-foreground">
                  Klik untuk menjelajahi properti di peta
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-urbanist font-bold mb-4">
                Apa Kata Mereka?
              </h2>
              <p className="text-muted-foreground">
                Kepercayaan pelanggan adalah prioritas kami
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  &quot;Platform yang sangat membantu! Saya menemukan rumah impian dalam waktu singkat. Prosesnya mudah dan transparan.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-brand-gold">AS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Andi Susanto</p>
                    <p className="text-sm text-muted-foreground">Pembeli Rumah</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  &quot;Sebagai agen, Homelink memudahkan saya mengelola listing dan mendapatkan leads berkualitas. Highly recommended!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-brand-gold">SR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Rahmawati</p>
                    <p className="text-sm text-muted-foreground">Agen Properti</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  &quot;Fitur pencarian yang canggih dan foto properti berkualitas tinggi. Sangat membantu dalam pengambilan keputusan.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-brand-gold">BP</span>
                  </div>
                  <div>
                    <p className="font-semibold">Budi Pratama</p>
                    <p className="text-sm text-muted-foreground">Investor Properti</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-navy to-brand-electric-blue-1">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-urbanist font-bold mb-4">
                Siap Menemukan Hunian Impian?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Bergabung dengan ribuan pengguna yang telah menemukan properti ideal mereka
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-brand-navy hover:bg-gray-100"
                  asChild
                >
                  <Link href="/search">
                    Mulai Pencarian
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white/30 hover:bg-white/10"
                  asChild
                >
                  <Link href="/developers">
                    Untuk Developer
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-urbanist font-bold mb-4">
                Dapatkan Update Properti Terbaru
              </h2>
              <p className="text-muted-foreground mb-8">
                Jadilah yang pertama mengetahui properti baru dan penawaran eksklusif
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  required
                />
                <Button type="submit" variant="gradient">
                  Berlangganan
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
