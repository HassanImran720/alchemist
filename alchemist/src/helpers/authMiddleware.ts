import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/helpers/jwt';

export interface AuthenticatedRequest {
  userId: string;
  email: string;
}

export function authenticateRequest(req: NextRequest): { 
  authenticated: boolean; 
  user?: AuthenticatedRequest; 
  response?: NextResponse 
} {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      authenticated: false,
      response: NextResponse.json({ error: 'Unauthorized. Please provide a valid token.' }, { status: 401 })
    };
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyJwt(token) as any;

  if (!decoded || !decoded.id) {
    return {
      authenticated: false,
      response: NextResponse.json({ error: 'Invalid or expired token.' }, { status: 401 })
    };
  }

  return {
    authenticated: true,
    user: {
      userId: decoded.id,
      email: decoded.email
    }
  };
}
