import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/helpers/jwt';

export interface AuthenticatedUser {
  id: string;
  email: string;
  authMethod: string;
}

export interface AuthResult {
  success: boolean;
  user?: AuthenticatedUser;
  error?: string;
}

/**
 * Utility function to authenticate requests by checking JWT token in Authorization header
 * Returns user info if authenticated, or error response if not
 */
export function authenticateRequest(req: NextRequest): AuthResult {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      success: false,
      error: 'Missing or invalid authorization header. Please provide Bearer token.'
    };
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return {
      success: false,
      error: 'Missing token in authorization header.'
    };
  }

  const decoded = verifyJwt(token);
  
  if (!decoded || typeof decoded !== 'object') {
    return {
      success: false,
      error: 'Invalid or expired token. Please login again.'
    };
  }

  // Extract user info from decoded token
  const user: AuthenticatedUser = {
    id: (decoded as any).id,
    email: (decoded as any).email,
    authMethod: (decoded as any).authMethod
  };

  return {
    success: true,
    user
  };
}

/**
 * Wrapper function for protected API routes
 * Automatically handles authentication and returns 401 if not authenticated
 */
export function withAuth<T extends any[]>(
  handler: (req: NextRequest, user: AuthenticatedUser, ...args: T) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    const authResult = authenticateRequest(req);
    
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error }, 
        { status: 401 }
      );
    }

    // Call the original handler with authenticated user
    return handler(req, authResult.user!, ...args);
  };
}