import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { 
  Check, 
  X, 
  TrendingUp,
  Users,
  BarChart,
  Shield,
  Zap,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Untuk Developer & Agen - Homelink",
  description: "Bergabung dengan Homelink sebagai developer atau agen properti. Dapatkan akses ke tools modern dan jaringan pembeli terluas di Indonesia.",
};

const pricingPlans = [
  {
    name: "Basic",
    price: "Gratis",
    period: "",
    description: "Untuk agen individu yang baru memulai",
    features: [
      "Listing hingga 5 properti",
      "Dashboard dasar",
      "Kontak via WhatsApp",
      "Statistik dasar",
      "Support via email",
    ],
    notIncluded: [
      "Properti featured",
      "Virtual tour",
      "Analytics lanjutan",
      "Priority support",
      "Custom branding",
    ],
    cta: "Mulai Gratis",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "Rp 499.000",
    period: "/bulan",
    description: "Untuk agen profesional dan tim kecil",
    features: [
      "Listing hingga 50 properti",
      "Dashboard profesional",
      "Kontak via WhatsApp & Email",
      "Analytics lengkap",
      "Priority support",
      "5 properti featured/bulan",
      "Virtual tour (10/bulan)",
      "Lead management",
      "Export data",
    ],
    notIncluded: [
      "Unlimited listings",
      "Custom branding",
      "API access",
    ],
    cta: "Mulai Trial 14 Hari",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Untuk developer besar dan agensi",
    features: [
      "Unlimited listings",
      "Dashboard kustomisasi",
      "Multi-channel contact",
      "Advanced analytics",
      "Dedicated support",
      "Unlimited featured",
      "Unlimited virtual tour",
      "Team management",
      "API access",
      "Custom branding",
      "Custom integration",
      "Training & onboarding",
    ],
    notIncluded: [],
    cta: "Hubungi Sales",
    highlighted: false,
  },
];

export default function DevelopersPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-brand-navy to-brand-electric-blue-1">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-urbanist font-bold mb-6">
                Kembangkan Bisnis Properti Anda Bersama Homelink
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Platform modern dengan teknologi terkini untuk memaksimalkan penjualan properti Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-brand-navy hover:bg-gray-100"
                >
                  Daftar Sekarang
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white/30 hover:bg-white/10"
                >
                  Lihat Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-urbanist font-bold mb-4">
                Mengapa Bergabung dengan Homelink?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dapatkan keuntungan maksimal dengan tools dan fitur terbaik untuk bisnis properti Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Jangkauan Luas</h3>
                <p className="text-muted-foreground">
                  Akses ke ribuan pembeli potensial di seluruh Indonesia setiap bulannya
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-8 w-8 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytics Lengkap</h3>
                <p className="text-muted-foreground">
                  Dashboard real-time untuk monitor performa listing dan lead generation
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Listing Cepat</h3>
                <p className="text-muted-foreground">
                  Upload properti dalam hitungan menit dengan interface yang user-friendly
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verifikasi Terpercaya</h3>
                <p className="text-muted-foreground">
                  Badge verifikasi untuk meningkatkan kredibilitas dan kepercayaan pembeli
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lead Berkualitas</h3>
                <p className="text-muted-foreground">
                  Sistem filtering otomatis untuk mendapatkan lead yang serius dan qualified
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Premium</h3>
                <p className="text-muted-foreground">
                  Tim support dedicated siap membantu kesuksesan bisnis properti Anda
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20 bg-accent/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-urbanist font-bold mb-4">
                Pilih Paket yang Tepat untuk Anda
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Mulai gratis atau upgrade untuk fitur premium
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "bg-card rounded-2xl p-8 relative",
                    plan.highlighted && "ring-2 ring-brand-gold shadow-xl"
                  )}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-brand-gold text-white px-4 py-1 rounded-full text-sm font-medium">
                        POPULER
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 opacity-50">
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.highlighted ? "gradient" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Semua paket termasuk: SSL Security, Backup harian, Update otomatis
              </p>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-urbanist font-bold mb-4">
                Cerita Sukses Partner Kami
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <p className="text-lg mb-6 italic">
                  "Sejak bergabung dengan Homelink, penjualan properti saya meningkat 300%. 
                  Platform yang sangat user-friendly dan support tim yang luar biasa."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-brand-gold">PT</span>
                  </div>
                  <div>
                    <p className="font-semibold">PT. Properti Sejahtera</p>
                    <p className="text-sm text-muted-foreground">Developer, Jakarta</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <p className="text-lg mb-6 italic">
                  "Dashboard analytics Homelink membantu saya memahami market trend dan 
                  mengoptimalkan strategi penjualan. Highly recommended!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-brand-gold">RA</span>
                  </div>
                  <div>
                    <p className="font-semibold">Rizky Agency</p>
                    <p className="text-sm text-muted-foreground">Agen Properti, Surabaya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-20 bg-accent/30">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-urbanist font-bold mb-4">
                  Daftar Sekarang
                </h2>
                <p className="text-muted-foreground">
                  Isi form di bawah dan tim kami akan menghubungi Anda dalam 24 jam
                </p>
              </div>

              <ContactForm
                subject="developer"
                className="shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-urbanist font-bold text-center mb-12">
                FAQ Developer & Agen
              </h2>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">
                    Berapa lama proses verifikasi akun?
                  </h4>
                  <p className="text-muted-foreground">
                    Proses verifikasi biasanya memakan waktu 1-2 hari kerja setelah dokumen lengkap diterima.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    Apakah ada kontrak minimum?
                  </h4>
                  <p className="text-muted-foreground">
                    Tidak ada kontrak minimum untuk paket Basic. Paket Professional minimal 3 bulan, 
                    dan Enterprise minimal 12 bulan.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    Bagaimana sistem pembayaran komisi?
                  </h4>
                  <p className="text-muted-foreground">
                    Homelink tidak mengambil komisi dari transaksi. Anda hanya membayar biaya berlangganan bulanan.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    Apakah bisa upgrade/downgrade paket?
                  </h4>
                  <p className="text-muted-foreground">
                    Ya, Anda bisa mengubah paket kapan saja. Upgrade langsung aktif, downgrade aktif di periode billing berikutnya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
