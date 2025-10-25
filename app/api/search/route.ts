import { NextRequest, NextResponse } from 'next/server';
import { sanityFetch } from '@/lib/sanity/client';
import { GET_PROPERTIES_BY_BOUNDS } from '@/lib/sanity/queries';
import { z } from 'zod';

// Request validation schema for bounds search
const searchSchema = z.object({
  neLat: z.coerce.number().min(-90).max(90),
  neLng: z.coerce.number().min(-180).max(180),
  swLat: z.coerce.number().min(-90).max(90),
  swLng: z.coerce.number().min(-180).max(180),
  q: z.string().optional(),
  city: z.string().optional(),
  type: z.enum(['house', 'apartment', 'villa', 'land', 'shophouse', 'office', 'warehouse']).optional(),
  status: z.enum(['sale', 'rent']).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  bedrooms: z.coerce.number().min(0).max(20).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawParams = Object.fromEntries(searchParams.entries());

    // Validate and parse parameters
    const validationResult = searchSchema.safeParse(rawParams);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'bad_request', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const params = validationResult.data;

    // Validate bounds (northeast should be greater than southwest)
    if (params.neLat <= params.swLat || params.neLng <= params.swLng) {
      return NextResponse.json(
        { 
          error: 'bad_request', 
          message: 'Invalid map bounds. Northeast coordinates must be greater than southwest coordinates.' 
        },
        { status: 400 }
      );
    }

    // Build GROQ query parameters
    const groqParams = {
      neLat: params.neLat,
      neLng: params.neLng,
      swLat: params.swLat,
      swLng: params.swLng,
      q: params.q || null,
      city: params.city || null,
      type: params.type || null,
      status: params.status || null,
      minPrice: params.minPrice || null,
      maxPrice: params.maxPrice || null,
      bedrooms: params.bedrooms || null,
    };

    // Fetch properties within bounds from Sanity
    const items = await sanityFetch(GET_PROPERTIES_BY_BOUNDS, groqParams, {
      cache: 'no-store',
      next: { revalidate: 30 }, // Revalidate every 30 seconds for map data
    });

    // Return response with bounds for map reference
    return NextResponse.json(
      {
        items,
        bounds: {
          neLat: params.neLat,
          neLng: params.neLng,
          swLat: params.swLat,
          swLng: params.swLng,
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Search API error:', error);
    
    return NextResponse.json(
      { 
        error: 'internal_server_error',
        message: 'Failed to search properties' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { error: 'method_not_allowed' },
    { status: 405 }
  );
}
