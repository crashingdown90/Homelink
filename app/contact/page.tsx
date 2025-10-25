import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { QuickContactButtons } from "@/components/contact/quick-contact-buttons";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle
} from "lucide-react";

export const metadata = {
  title: "Hubungi Kami - Homelink",
  description: "Hubungi tim Homelink untuk pertanyaan, saran, atau kerja sama. Kami siap membantu Anda menemukan properti impian.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-brand-navy to-brand-electric-blue-1">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-urbanist font-bold mb-4">
                Hubungi Kami
              </h1>
              <p className="text-lg text-white/90">
                Tim kami siap membantu Anda dengan pertanyaan atau kebutuhan properti Anda
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-urbanist font-bold mb-6">
                  Informasi Kontak
                </h2>
                <p className="text-muted-foreground mb-8">
                  Kami tersedia untuk membantu Anda menemukan properti impian atau 
                  menjawab pertanyaan seputar layanan kami.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Kantor Pusat</h4>
                      <p className="text-muted-foreground">
                        Jl. Sudirman No. 123<br />
                        Jakarta Pusat, DKI Jakarta 10220<br />
                        Indonesia
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Telepon</h4>
                      <p className="text-muted-foreground">
                        +62 21 1234 5678<br />
                        +62 812 3456 7890 (WhatsApp)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">
                        info@homelink.co.id<br />
                        support@homelink.co.id
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Jam Operasional</h4>
                      <p className="text-muted-foreground">
                        Senin - Jumat: 09:00 - 18:00 WIB<br />
                        Sabtu: 09:00 - 15:00 WIB<br />
                        Minggu & Hari Libur: Tutup
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="mt-8">
                  <QuickContactButtons />
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 h-64 bg-accent/50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-muted-foreground">Peta Lokasi Kantor</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-urbanist font-bold mb-6">
                  Kirim Pesan
                </h2>
                <ContactForm
                  subject="general"
                  className="shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-accent/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-urbanist font-bold mb-4">
                  Pertanyaan Umum
                </h2>
                <p className="text-muted-foreground">
                  Temukan jawaban untuk pertanyaan yang sering diajukan
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6">
                  <h4 className="font-semibold mb-2">
                    Bagaimana cara mendaftarkan properti saya?
                  </h4>
                  <p className="text-muted-foreground">
                    Anda dapat mendaftarkan properti dengan membuat akun sebagai agen atau developer. 
                    Setelah itu, Anda dapat menambahkan listing properti melalui dashboard.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6">
                  <h4 className="font-semibold mb-2">
                    Apakah ada biaya untuk menggunakan Homelink?
                  </h4>
                  <p className="text-muted-foreground">
                    Untuk pencari properti, Homelink sepenuhnya gratis. Untuk agen dan developer, 
                    kami menawarkan berbagai paket berlangganan dengan fitur yang berbeda-beda.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6">
                  <h4 className="font-semibold mb-2">
                    Bagaimana cara memverifikasi keaslian properti?
                  </h4>
                  <p className="text-muted-foreground">
                    Semua properti di Homelink melalui proses verifikasi. Kami memeriksa dokumen 
                    dan memastikan agen adalah profesional berlisensi. Namun, kami tetap menyarankan 
                    untuk melakukan pengecekan langsung sebelum transaksi.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6">
                  <h4 className="font-semibold mb-2">
                    Apakah Homelink melayani di luar Jakarta?
                  </h4>
                  <p className="text-muted-foreground">
                    Ya, Homelink melayani seluruh Indonesia. Kami memiliki properti listing 
                    dari Sabang sampai Merauke dengan jaringan agen di lebih dari 50 kota.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-urbanist font-bold mb-4">
                Butuh Bantuan Lebih Lanjut?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-brand-gold" />
                </div>
                <h4 className="font-semibold mb-2">Dukungan Telepon</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Bicara langsung dengan tim support kami
                </p>
                <Button variant="outline" size="sm">
                  Hubungi Sekarang
                </Button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-brand-gold" />
                </div>
                <h4 className="font-semibold mb-2">Live Chat</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat real-time dengan customer service
                </p>
                <Button variant="outline" size="sm">
                  Mulai Chat
                </Button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-brand-gold" />
                </div>
                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Kirim pertanyaan detail via email
                </p>
                <Button variant="outline" size="sm">
                  Kirim Email
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
