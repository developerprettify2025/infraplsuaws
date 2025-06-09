// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Allow access to /thank-you only if allowThankYou cookie exists
  if (pathname === '/thank-you') {
    const cookie = request.cookies.get('allowThankYou');
    if (!cookie || cookie.value !== 'yes') {
      return NextResponse.redirect(new URL('/something-went-wrong', request.url));
    }
  }

  // Handle unknown routes - redirect to error page
  const validPaths = ['/', '/thank-you', '/something-went-wrong', '/your-form-page']; // add other valid pages
  if (!validPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/something-went-wrong', request.url));
  }

  return NextResponse.next();
}
