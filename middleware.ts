import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/security/rate-limit';

export async function middleware(request: NextRequest) {
  // Only rate limit API routes and processing routes
  if (request.nextUrl.pathname.startsWith('/api') || 
      request.nextUrl.pathname.includes('/process')) {
    const limiter = await rateLimit(request);
    if (!limiter.success) return limiter.response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/tools/:path*'],
};
