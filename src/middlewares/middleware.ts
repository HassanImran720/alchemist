import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/helpers/jwt';

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyJwt(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
  // Optionally attach user info to request
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/protected/:path*'], // Protect all /api/protected routes
};
