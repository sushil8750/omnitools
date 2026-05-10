import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simplified Rate Limiter for Demo
// In production, use @upstash/ratelimit with Redis
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const LIMIT = 10; // requests
const DURATION = 60 * 1000; // 1 minute

export async function rateLimit(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();
  
  const userRate = rateLimitMap.get(ip) || { count: 0, lastReset: now };
  
  if (now - userRate.lastReset > DURATION) {
    userRate.count = 1;
    userRate.lastReset = now;
  } else {
    userRate.count++;
  }
  
  rateLimitMap.set(ip, userRate);
  
  if (userRate.count > LIMIT) {
    return {
      success: false,
      response: new NextResponse('Too Many Requests', { status: 429 })
    };
  }
  
  return { success: true };
}
