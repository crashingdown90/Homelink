import { sanityFetch, sanityWriteClient } from './client';
import {
  GET_PROPERTIES,
  GET_PROPERTY_BY_SLUG,
  GET_FEATURED_PROPERTIES,
  GET_RECENT_PROPERTIES,
  GET_RELATED_PROPERTIES,
  GET_CITIES,
  GET_PROVINCES,
  GET_ARTICLES,
  GET_ARTICLE_BY_SLUG,
  GET_FEATURED_ARTICLES,
  GET_RECENT_ARTICLES,
  GET_SITE_SETTINGS,
  GET_DASHBOARD_STATS,
  GET_AGENT_BY_ID,
  GET_ALL_AGENTS,
} from './queries';
import type { 
  Property, 
  PropertySummary, 
  Article, 
  Agent, 
  SearchFilters,
  LeadSubmission 
} from '@/types';

// Property fetchers
export async function getProperties(
  filters: SearchFilters & { cursor?: number; limit?: number } = {}
) {
  const {
    q = null,
    city = null,
    province = null,
    type = null,
    status = null,
    minPrice = null,
    maxPrice = null,
    bedrooms = null,
    minLand = null,
    sort = 'newest',
    cursor = 0,
    limit = 20,
  } = filters;

  const items = await sanityFetch<PropertySummary[]>(
    GET_PROPERTIES,
    {
      q,
      city,
      province,
      type,
      status,
      minPrice,
      maxPrice,
      bedrooms,
      minLand,
      sort,
      cursor,
      limit: cursor + limit,
    },
    {
      next: { revalidate: 60, tags: ['properties'] },
    }
  );

  return items;
}

export async function getPropertyBySlug(slug: string) {
  const property = await sanityFetch<Property>(
    GET_PROPERTY_BY_SLUG,
    { slug },
    {
      next: { revalidate: 60, tags: ['property', slug] },
    }
  );

  return property;
}

export async function getFeaturedProperties(limit: number = 8) {
  const properties = await sanityFetch<PropertySummary[]>(
    GET_FEATURED_PROPERTIES,
    { limit },
    {
      next: { revalidate: 300, tags: ['featured-properties'] },
    }
  );

  return properties;
}

export async function getRecentProperties(limit: number = 8) {
  const properties = await sanityFetch<PropertySummary[]>(
    GET_RECENT_PROPERTIES,
    { limit },
    {
      next: { revalidate: 60, tags: ['recent-properties'] },
    }
  );

  return properties;
}

export async function getRelatedProperties(
  currentSlug: string,
  city: string,
  type: string,
  limit: number = 6
) {
  const properties = await sanityFetch<PropertySummary[]>(
    GET_RELATED_PROPERTIES,
    { currentSlug, city, type, limit },
    {
      next: { revalidate: 300, tags: ['related-properties'] },
    }
  );

  return properties;
}

export async function getCities() {
  const cities = await sanityFetch<string[]>(
    GET_CITIES,
    {},
    {
      next: { revalidate: 3600, tags: ['cities'] },
    }
  );

  return cities;
}

export async function getProvinces() {
  const provinces = await sanityFetch<string[]>(
    GET_PROVINCES,
    {},
    {
      next: { revalidate: 3600, tags: ['provinces'] },
    }
  );

  return provinces;
}

// Article fetchers
export async function getArticles(
  params: { 
    category?: string; 
    featured?: boolean; 
    cursor?: number; 
    limit?: number;
  } = {}
) {
  const {
    category = null,
    featured = null,
    cursor = 0,
    limit = 12,
  } = params;

  const articles = await sanityFetch<Article[]>(
    GET_ARTICLES,
    { category, featured, cursor, limit: cursor + limit },
    {
      next: { revalidate: 300, tags: ['articles'] },
    }
  );

  return articles;
}

export async function getArticleBySlug(slug: string) {
  const article = await sanityFetch<Article>(
    GET_ARTICLE_BY_SLUG,
    { slug },
    {
      next: { revalidate: 300, tags: ['article', slug] },
    }
  );

  return article;
}

export async function getFeaturedArticles(limit: number = 4) {
  const articles = await sanityFetch<Article[]>(
    GET_FEATURED_ARTICLES,
    { limit },
    {
      next: { revalidate: 600, tags: ['featured-articles'] },
    }
  );

  return articles;
}

export async function getRecentArticles(limit: number = 6) {
  const articles = await sanityFetch<Article[]>(
    GET_RECENT_ARTICLES,
    { limit },
    {
      next: { revalidate: 300, tags: ['recent-articles'] },
    }
  );

  return articles;
}

// Agent fetchers
export async function getAgentById(id: string) {
  const agent = await sanityFetch<Agent>(
    GET_AGENT_BY_ID,
    { id },
    {
      next: { revalidate: 300, tags: ['agent', id] },
    }
  );

  return agent;
}

export async function getAllAgents() {
  const agents = await sanityFetch<Agent[]>(
    GET_ALL_AGENTS,
    {},
    {
      next: { revalidate: 600, tags: ['agents'] },
    }
  );

  return agents;
}

// Site settings fetcher
export async function getSiteSettings() {
  const settings = await sanityFetch(
    GET_SITE_SETTINGS,
    {},
    {
      next: { revalidate: 600, tags: ['site-settings'] },
    }
  );

  return settings;
}

// Dashboard stats fetcher
export async function getDashboardStats() {
  const stats = await sanityFetch(
    GET_DASHBOARD_STATS,
    {},
    {
      cache: 'no-store', // Always fresh for admin
    }
  );

  // Return fallback if Sanity returns null or undefined
  if (!stats || typeof stats !== 'object') {
    return {
      totalProperties: 0,
      activeProperties: 0,
      newLeads: 0,
      totalLeads: 0,
      activeAgents: 0,
      totalAgents: 0,
      totalArticles: 0,
      recentLeads: [],
      recentProperties: [],
    };
  }

  return stats;
}

// Lead creation function
export async function createLead(data: Omit<LeadSubmission, '_id' | 'createdAt'>) {
  try {
    const lead = await sanityWriteClient.create({
      _type: 'lead',
      ...data,
      status: 'new',
      priority: data.subject === 'property' ? 'high' : 'medium',
      createdAt: new Date().toISOString(),
    });

    return { success: true, id: lead._id };
  } catch (error) {
    console.error('Failed to create lead:', error);
    return { success: false, error: 'Failed to submit lead' };
  }
}

// Revalidation helper (for use in server actions)
export async function revalidateProperty(slug: string) {
  // This would be used with Next.js revalidateTag
  // revalidateTag('property');
  // revalidateTag(slug);
}

export async function revalidateAllProperties() {
  // This would be used with Next.js revalidateTag
  // revalidateTag('properties');
  // revalidateTag('featured-properties');
  // revalidateTag('recent-properties');
}
