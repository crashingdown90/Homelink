import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Clock, ChevronRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/lib/sanity/client";
import { GET_ARTICLES } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Insight - Tips & Artikel Properti | Homelink", 
  description: "Baca artikel, tips, dan panduan seputar properti, investasi, dan hunian dari para ahli di Homelink.",
};

// Article categories
const categories = [
  { name: "Semua", value: null },
  { name: "Tips Properti", value: "tips" },
  { name: "Tren Pasar", value: "tren" },
  { name: "Teknologi", value: "teknologi" },
  { name: "Hunian Hijau", value: "hunian-hijau" },
  { name: "Investasi", value: "investasi" },
  { name: "Interior", value: "interior" },
];

export default async function InsightPage() {
  // Fetch articles from Sanity
  let articles = [];
  try {
    articles = await sanityFetch(GET_ARTICLES, { limit: 20 });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  // Featured article (first one)
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-brand-navy to-brand-electric-blue-1">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-urbanist font-bold mb-4">
                Insight Properti
              </h1>
              <p className="text-lg text-white/90">
                Tips, panduan, dan berita terkini seputar dunia properti Indonesia
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.value || "all"}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="py-12">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                  {featuredArticle.cover ? (
                    <Image
                      src={featuredArticle.cover}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-muted-foreground">No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full">
                      {featuredArticle.category || "Artikel"}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-urbanist font-bold mb-4">
                    <Link href={`/insight/${featuredArticle.slug}`} className="hover:text-brand-gold transition-colors">
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredArticle.author || "Tim Homelink"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(featuredArticle.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>5 min read</span>
                    </div>
                  </div>
                  
                  <div>
                    <Button variant="gradient" asChild>
                      <Link href={`/insight/${featuredArticle.slug}`}>
                        Baca Selengkapnya
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-12 bg-accent/30">
          <div className="container-custom">
            <h2 className="text-2xl font-urbanist font-bold mb-8">
              Artikel Terbaru
            </h2>
            
            {otherArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherArticles.map((article: any) => (
                  <article key={article._id} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <Link href={`/insight/${article.slug}`}>
                      <div className="relative aspect-[16/10] bg-muted">
                        {article.cover ? (
                          <Image
                            src={article.cover}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-muted-foreground">No Image</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="px-2 py-1 bg-accent text-xs font-medium rounded">
                          {article.category || "Artikel"}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        <Link href={`/insight/${article.slug}`} className="hover:text-brand-gold transition-colors">
                          {article.title}
                        </Link>
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatDate(article.publishedAt)}</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Belum ada artikel tersedia.</p>
              </div>
            )}
            
            {/* Load more button */}
            {articles.length >= 20 && (
              <div className="text-center mt-8">
                <Button variant="outline">
                  Muat Lebih Banyak
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-brand-navy to-brand-electric-blue-1">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-3xl font-urbanist font-bold mb-4">
                Dapatkan Tips Properti Mingguan
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Subscribe newsletter kami untuk mendapatkan artikel dan tips properti terbaru
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <Button type="submit" variant="secondary" className="bg-white text-brand-navy hover:bg-gray-100">
                  Subscribe
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
