
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';
import { signJwt } from '@/helpers/jwt';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
  }
  const user = await User.create({ name, email, password, authMethod: 'self' });
  const token = signJwt({ id: user._id, email: user.email, authMethod: user.authMethod });
  return NextResponse.json({
    message: 'User registered successfully.',
    token,
    user: { email: user.email, name: user.name, authMethod: user.authMethod }
  });
}
