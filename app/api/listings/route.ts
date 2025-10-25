import { NextRequest, NextResponse } from 'next/server';
import { sanityFetch } from '@/lib/sanity/client';
import { GET_PROPERTIES, GET_PROPERTIES_COUNT } from '@/lib/sanity/queries';
import { z } from 'zod';

// Request validation schema
const listingsSchema = z.object({
  q: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  type: z.enum(['house', 'apartment', 'villa', 'land', 'shophouse', 'office', 'warehouse']).optional(),
  bedrooms: z.coerce.number().min(0).max(20).optional(),
  minLand: z.coerce.number().min(0).optional(),
  status: z.enum(['sale', 'rent']).optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'oldest']).optional(),
  cursor: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawParams = Object.fromEntries(searchParams.entries());

    // Validate and parse parameters
    const validationResult = listingsSchema.safeParse(rawParams);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'bad_request', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const params = validationResult.data;

    // Build GROQ query parameters
    const groqParams = {
      q: params.q || null,
      city: params.city || null,
      province: params.province || null,
      type: params.type || null,
      status: params.status || null,
      minPrice: params.minPrice || null,
      maxPrice: params.maxPrice || null,
      bedrooms: params.bedrooms || null,
      minLand: params.minLand || null,
      sort: params.sort || 'newest',
      cursor: params.cursor,
      limit: params.cursor + params.limit,
    };

    // Fetch properties from Sanity
    const [items, total] = await Promise.all([
      sanityFetch(GET_PROPERTIES, groqParams, {
        cache: 'no-store',
        next: { revalidate: 60 }, // Revalidate every minute
      }),
      sanityFetch<number>(GET_PROPERTIES_COUNT, groqParams, {
        cache: 'no-store',
        next: { revalidate: 60 },
      }),
    ]);

    // Calculate if there are more items
    const hasMore = params.cursor + params.limit < total;
    const nextCursor = hasMore ? params.cursor + params.limit : undefined;

    // Return response
    return NextResponse.json(
      {
        items,
        nextCursor,
        total,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Listings API error:', error);
    
    return NextResponse.json(
      { 
        error: 'internal_server_error',
        message: 'Failed to fetch listings' 
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

export async function PUT() {
  return NextResponse.json(
    { error: 'method_not_allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'method_not_allowed' },
    { status: 405 }
  );
}
