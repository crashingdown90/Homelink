import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient } from '@/lib/sanity/client';
import { z } from 'zod';

// Request validation schema
const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  message: z.string().max(1000).optional(),
  listingSlug: z.string().optional(),
  subject: z.enum(['general', 'property', 'developer', 'partnership', 'support', 'other']).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required',
  }),
  turnstileToken: z.string(),
});

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '60000'); // 1 minute
const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10');

// Verify Turnstile token
async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: ip,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, limit] of rateLimitMap.entries()) {
    if (now > limit.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 60000); // Clean up every minute

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'rate_limited', message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate request data
    const validationResult = leadSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { ok: false, error: 'validation_error', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Validate that either email or phone is provided
    if (!data.email && !data.phone) {
      return NextResponse.json(
        { ok: false, error: 'validation_error', message: 'Either email or phone is required' },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    const isValidToken = await verifyTurnstile(data.turnstileToken, ip);
    
    if (!isValidToken) {
      return NextResponse.json(
        { ok: false, error: 'captcha_failed', message: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Get additional metadata
    const metadata = {
      ipAddress: ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
      referrer: request.headers.get('referer') || 'direct',
      utm: {
        source: request.nextUrl.searchParams.get('utm_source') || undefined,
        medium: request.nextUrl.searchParams.get('utm_medium') || undefined,
        campaign: request.nextUrl.searchParams.get('utm_campaign') || undefined,
        term: request.nextUrl.searchParams.get('utm_term') || undefined,
        content: request.nextUrl.searchParams.get('utm_content') || undefined,
      },
    };

    // Determine source based on context
    let source = 'contact_form';
    if (data.listingSlug) {
      source = 'property_inquiry';
    } else if (data.subject === 'developer') {
      source = 'developer_form';
    }

    // Create lead document in Sanity
    const lead = await sanityWriteClient.create({
      _type: 'lead',
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      subject: data.subject || 'general',
      listingSlug: data.listingSlug,
      source,
      consent: data.consent,
      status: 'new',
      priority: data.subject === 'property' ? 'high' : 'medium',
      metadata,
      createdAt: new Date().toISOString(),
    });

    // Send notification email (if configured)
    // This would be implemented with a service like SendGrid or AWS SES
    if (process.env.ADMIN_EMAILS) {
      // await sendNotificationEmail(lead);
    }

    // Track analytics event
    // This would be implemented with GA4 Measurement Protocol
    // await trackEvent('lead_submit', { status: 'success', source });

    // Return success response
    return NextResponse.json(
      { 
        ok: true, 
        id: lead._id,
        message: 'Terima kasih! Kami akan segera menghubungi Anda.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lead submission error:', error);
    
    // Track error event
    // await trackEvent('lead_submit', { status: 'fail', reason: 'server_error' });
    
    return NextResponse.json(
      { 
        ok: false, 
        error: 'internal_server_error',
        message: 'Terjadi kesalahan. Silakan coba lagi.' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
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
