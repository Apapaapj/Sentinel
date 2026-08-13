import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT = 100;
const WINDOW = 3600000;
const requestMap = new Map<string, { count: number; reset: number }>();

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const path = request.nextUrl.pathname;

  if (path.startsWith('/_next') || path.startsWith('/static')) {
    return NextResponse.next();
  }

  if (path.startsWith('/api/scan') || path.startsWith('/api/report')) {
    const now = Date.now();
    const record = requestMap.get(ip);

    if (record && now < record.reset) {
      if (record.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }
      record.count++;
    } else {
      requestMap.set(ip, { count: 1, reset: now + WINDOW });
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
