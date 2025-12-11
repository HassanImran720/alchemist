import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/helpers/jwt';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyJwt(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // jwt.verify can return a string or an object (JwtPayload). Safely extract userId when available.
    let userId: string | null = null;
    if (typeof decoded === 'object' && decoded !== null) {
      // decoded may contain custom fields like userId or sub
      // use any to avoid tight coupling to JwtPayload shape
      userId = (decoded as any).userId || (decoded as any).sub || null;
    }

    // Token is valid
    return NextResponse.json({ valid: true, userId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Token verification failed' }, { status: 401 });
  }
}
