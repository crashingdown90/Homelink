import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const footerLinks = {
  product: {
    title: "Produk",
    links: [
      { name: "Cari Hunian", href: "/search" },
      { name: "Peta Properti", href: "/search?view=map" },
      { name: "Favorit", href: "/favorites" },
      { name: "Terbaru", href: "/search?sort=newest" },
    ],
  },
  company: {
    title: "Perusahaan",
    links: [
      { name: "Tentang Kami", href: "/about" },
      { name: "Karir", href: "/careers" },
      { name: "Developers", href: "/developers" },
      { name: "Partner", href: "/partners" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Insight", href: "/insight" },
      { name: "Tips Properti", href: "/insight?category=tips" },
      { name: "Tren Pasar", href: "/insight?category=tren" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Kebijakan Privasi", href: "/legal/privacy" },
      { name: "Syarat & Ketentuan", href: "/legal/terms" },
      { name: "Cookie Policy", href: "/legal/cookies" },
    ],
  },
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/homelink" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/homelink" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/homelink" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/homelink" },
];

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-gold rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-gold/80 rounded-lg flex items-center justify-center">
                  <span className="text-white font-urbanist font-black text-2xl">
                    H
                  </span>
                </div>
              </div>
              <span className="font-urbanist font-bold text-2xl text-white">
                Homelink
              </span>
            </Link>
            
            <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-sm">
              Platform properti digital terhubung di Indonesia. Temukan hunian 
              masa depanmu dengan mudah, aman, dan tepercaya.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a 
                href="tel:+62211234567" 
                className="flex items-center space-x-3 text-white/70 hover:text-brand-gold transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">+62 21 1234567</span>
              </a>
              <a 
                href="mailto:info@homelink.co.id" 
                className="flex items-center space-x-3 text-white/70 hover:text-brand-gold transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@homelink.co.id</span>
              </a>
              <div className="flex items-start space-x-3 text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Jakarta, Indonesia
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-brand-gold/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-urbanist font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-brand-gold text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-urbanist font-semibold text-lg text-white">
                Dapatkan Update Properti Terbaru
              </h3>
              <p className="text-white/70 text-sm mt-1">
                Berlangganan newsletter untuk info hunian terkini
              </p>
            </div>
            <form className="w-full lg:w-auto flex gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent w-full lg:w-64"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-medium rounded-xl transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Homelink. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/legal/privacy"
                className="text-white/60 hover:text-brand-gold text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/legal/terms"
                className="text-white/60 hover:text-brand-gold text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-white/60 hover:text-brand-gold text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
