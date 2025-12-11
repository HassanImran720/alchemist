import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	// Middleware is minimal since client-side checks handle token verification
	// This is just to ensure routes are protected at the edge
	return NextResponse.next();
}

export const config = {
	matcher: ['/lab/:path*'], // Apply middleware to all /lab routes
};
