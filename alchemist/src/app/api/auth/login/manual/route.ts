
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';
import { signJwt } from '@/helpers/jwt';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }
  const user = await User.findOne({ email }).select('+password +authMethod');
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }
  if (user.authMethod !== 'self') {
    return NextResponse.json({ error: `Please login with ${user.authMethod}.` }, { status: 403 });
  }
  const isMatch = await user.correctPassword(password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }
  const token = signJwt({ id: user._id, email: user.email, authMethod: user.authMethod });
  return NextResponse.json({
    message: 'Login successful.',
    token,
    user: { email: user.email, name: user.name, authMethod: user.authMethod }
  });
}
