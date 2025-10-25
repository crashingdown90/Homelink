import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  Target, 
  Eye, 
  Users, 
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Shield
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Tentang Homelink - Platform Properti Digital Indonesia",
  description: "Homelink adalah platform properti digital terpercaya yang menghubungkan pembeli, penjual, dan agen properti di seluruh Indonesia.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-brand-navy to-brand-electric-blue-1">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-urbanist font-bold mb-4">
                Tentang Homelink
              </h1>
              <p className="text-lg text-white/90">
                Platform properti digital yang menghubungkan impian dengan kenyataan
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-urbanist font-bold mb-4">
                  Cerita Kami
                </h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Homelink lahir dari visi sederhana namun kuat: membuat proses mencari dan menemukan properti 
                  di Indonesia menjadi lebih mudah, transparan, dan terpercaya. Didirikan pada tahun 2020, 
                  kami telah berkembang menjadi salah satu platform properti digital terdepan di Indonesia.
                </p>
                <p className="mt-4">
                  Dengan teknologi terkini dan jaringan agen profesional, kami berkomitmen untuk memberikan 
                  pengalaman terbaik bagi setiap pengguna, baik yang mencari rumah pertama mereka, 
                  investor properti, atau agen yang ingin mengembangkan bisnis mereka.
                </p>
                <p className="mt-4">
                  Kami percaya bahwa setiap orang berhak mendapatkan hunian yang layak dan sesuai dengan 
                  kebutuhan mereka. Itulah mengapa kami terus berinovasi untuk menghadirkan solusi 
                  properti yang lebih baik bagi masyarakat Indonesia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-accent/30">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-brand-gold" />
                </div>
                <h3 className="text-2xl font-urbanist font-bold mb-4">Visi</h3>
                <p className="text-muted-foreground">
                  Menjadi platform properti digital terpercaya nomor satu di Indonesia yang menghubungkan 
                  setiap orang dengan hunian impian mereka melalui teknologi inovatif dan layanan yang 
                  transparan.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-brand-gold" />
                </div>
                <h3 className="text-2xl font-urbanist font-bold mb-4">Misi</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-1">•</span>
                    Menyediakan platform yang mudah, aman, dan terpercaya untuk jual-beli properti
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-1">•</span>
                    Memberdayakan agen properti dengan teknologi dan tools modern
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-1">•</span>
                    Memberikan informasi properti yang akurat dan transparan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-1">•</span>
                    Membangun ekosistem properti digital yang berkelanjutan
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-urbanist font-bold mb-4">
                Nilai-Nilai Kami
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Prinsip yang memandu setiap langkah kami
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-brand-gold" />
                </div>
                <h4 className="font-semibold mb-2">Kepercayaan</h4>
                <p className="text-sm text-muted-foreground">
                  Membangun kepercayaan melalui transparansi dan integritas
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-brand-gold" />
                </div>
                <h4 className="font-semibold mb-2">Kolaborasi</h4>
                <p className="text-sm text-muted-foreground">
                  Bekerja sama untuk mencapai hasil terbaik
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-brand-gold" />
                </div>
                <h4 className="font-semibold mb-2">Inovasi</h4>
                <p className="text-sm text-muted-foreground">
                  Terus berinovasi untuk solusi yang lebih baik
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-brand-gold" />
                </div>
                <h4 className="font-semibold mb-2">Keunggulan</h4>
                <p className="text-sm text-muted-foreground">
                  Berkomitmen pada kualitas dan pelayanan terbaik
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-accent/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-urbanist font-bold mb-4">
                Perjalanan Kami
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-brand-gold rounded-full" />
                    <div className="w-0.5 h-full bg-brand-gold/30" />
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">2020</span>
                    </div>
                    <h4 className="font-semibold mb-1">Homelink Didirikan</h4>
                    <p className="text-muted-foreground">
                      Memulai perjalanan dengan visi membuat properti lebih accessible
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-brand-gold rounded-full" />
                    <div className="w-0.5 h-full bg-brand-gold/30" />
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">2021</span>
                    </div>
                    <h4 className="font-semibold mb-1">Ekspansi ke 10 Kota</h4>
                    <p className="text-muted-foreground">
                      Memperluas jangkauan ke kota-kota besar di Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-brand-gold rounded-full" />
                    <div className="w-0.5 h-full bg-brand-gold/30" />
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">2023</span>
                    </div>
                    <h4 className="font-semibold mb-1">Platform 2.0 Launch</h4>
                    <p className="text-muted-foreground">
                      Meluncurkan platform baru dengan teknologi AI dan virtual tour
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-brand-gold rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">2024</span>
                    </div>
                    <h4 className="font-semibold mb-1">Jangkauan Nasional</h4>
                    <p className="text-muted-foreground">
                      Melayani seluruh Indonesia dengan 50+ kota
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section (Placeholder) */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-urbanist font-bold mb-4">
                Tim Kami
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Profesional berpengalaman yang berdedikasi untuk kesuksesan Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "John Doe", role: "CEO & Founder" },
                { name: "Jane Smith", role: "CTO" },
                { name: "Ahmad Wijaya", role: "Head of Operations" },
              ].map((member, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-32 h-32 bg-brand-gold/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-brand-gold" />
                  </div>
                  <h4 className="font-semibold">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-brand-navy to-brand-electric-blue-1">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-urbanist font-bold mb-4">
                Bergabunglah dengan Kami
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Mari bersama-sama membangun masa depan properti digital Indonesia
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-brand-navy hover:bg-gray-100"
                  asChild
                >
                  <Link href="/contact">Hubungi Kami</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white/30 hover:bg-white/10"
                  asChild
                >
                  <Link href="/careers">Karir</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
