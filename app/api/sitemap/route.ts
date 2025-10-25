import { NextRequest, NextResponse } from 'next/server';
import { sanityFetch } from '@/lib/sanity/client';
import { GET_ALL_SLUGS_FOR_SITEMAP } from '@/lib/sanity/queries';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homelink.co.id';

// Static pages that should be included in the sitemap
const staticPages = [
  {
    url: '/',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    url: '/search',
    changefreq: 'hourly',
    priority: 0.9,
  },
  {
    url: '/developers',
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    url: '/insight',
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    url: '/legal/privacy',
    changefreq: 'monthly',
    priority: 0.3,
  },
  {
    url: '/legal/terms',
    changefreq: 'monthly',
    priority: 0.3,
  },
];

export async function GET(request: NextRequest) {
  try {
    // Fetch all dynamic slugs from Sanity
    const { properties, articles } = await sanityFetch<{
      properties: string[];
      articles: string[];
    }>(GET_ALL_SLUGS_FOR_SITEMAP, {}, {
      cache: 'no-store',
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    // Build XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
  ${properties
    .map(
      (slug) => `
  <url>
    <loc>${siteUrl}/listing/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
  ${articles
    .map(
      (slug) => `
  <url>
    <loc>${siteUrl}/insight/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    // Return XML response with appropriate headers
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Return a basic sitemap with static pages only if there's an error
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    return new NextResponse(fallbackXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600',
      },
    });
  }
}
