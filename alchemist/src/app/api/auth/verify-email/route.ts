// /app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';

export async function GET(req: NextRequest) {
  await dbConnect();
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  user.emailVerified = true;
  user.verificationToken = undefined;
  await user.save();

  // ✅ Redirect to login page after verification
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?verified=true`);
}
