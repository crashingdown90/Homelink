import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = '2024-01-01';

// Server-only client with token for write operations
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false, // Set to false for write operations
  perspective: 'published',
});

// Server client for read operations
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});

// Client-side client (no token)
export const sanityClientPublic = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

// Image URL builder
const builder = imageUrlBuilder(sanityClientPublic);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper to get asset URL
export function getAssetUrl(ref: string): string {
  // Extract file ID and extension from reference
  // Format: file-{id}-{extension}
  const [, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}

// Type guards
export function isValidSanityDocument(doc: any): boolean {
  return doc && doc._id && doc._type;
}

// Fetch with error handling
export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, any> = {},
  options: {
    cache?: RequestCache;
    next?: { revalidate?: number | false; tags?: string[] };
  } = {}
): Promise<T> {
  // Return empty data if Sanity is not configured
  if (!projectId || projectId === 'your-project-id') {
    console.warn('Sanity not configured, returning empty data');
    return (Array.isArray([]) ? [] : null) as T;
  }

  try {
    const result = await sanityClient.fetch<T>(query, params);
    return result;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    // Always throw error so API routes can handle fallback
    throw error;
  }
}

// Real-time preview configuration (for future implementation)
export const sanityPreviewConfig = {
  projectId,
  dataset,
  apiVersion,
  // Preview token would be set via environment variable
  token: process.env.SANITY_PREVIEW_TOKEN,
};
