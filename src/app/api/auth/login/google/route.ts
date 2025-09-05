
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';
import { OAuth2Client } from 'google-auth-library';
import { signJwt } from '@/helpers/jwt';

const client = new OAuth2Client(process.env.GOOGLE_ID);

export async function POST(req: NextRequest) {
  await dbConnect();
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ error: 'Google token required.' }, { status: 400 });
  }
  let ticket;
  try {
    ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_ID });
  } catch {
    return NextResponse.json({ error: 'Invalid Google token.' }, { status: 401 });
  }
  const payload = ticket.getPayload();
  if (!payload?.email) {
    return NextResponse.json({ error: 'Google account email not found.' }, { status: 400 });
  }
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    return NextResponse.json({ error: 'No user found. Please sign up first.' }, { status: 404 });
  }
  if (user.authMethod !== 'google') {
    return NextResponse.json({ error: `Please login with ${user.authMethod}.` }, { status: 403 });
  }
  const jwtToken = signJwt({ id: user._id, email: user.email, authMethod: user.authMethod });
  return NextResponse.json({ message: 'Google login successful.', token: jwtToken, user: { email: user.email, name: user.name, authMethod: user.authMethod } });
}
