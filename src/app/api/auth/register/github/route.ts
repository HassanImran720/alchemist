
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';
import { signJwt } from '@/helpers/jwt';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ error: 'GitHub token required.' }, { status: 400 });
  }
  // Fetch user info from GitHub API
  const resp = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) {
    return NextResponse.json({ error: 'Invalid GitHub token.' }, { status: 401 });
  }
  const data = await resp.json();
  if (!data.email) {
    // If email is not public, fetch from /emails endpoint
    const emailResp = await fetch('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const emails = await emailResp.json();
    const primary = emails.find((e: any) => e.primary && e.verified);
    data.email = primary?.email;
  }
  if (!data.email) {
    return NextResponse.json({ error: 'GitHub email not found.' }, { status: 400 });
  }
  let user = await User.findOne({ email: data.email });
  if (user) {
    if (user.authMethod !== 'github') {
      return NextResponse.json({ error: `Email already registered with ${user.authMethod}.` }, { status: 409 });
    }
    const token = signJwt({ id: user._id, email: user.email, authMethod: user.authMethod });
    return NextResponse.json({ message: 'User already registered.', token, user: { email: user.email, name: user.name, authMethod: user.authMethod } });
  }
  user = await User.create({
    name: data.name || data.login,
    email: data.email,
    authMethod: 'github',
    emailVerified: true,
    profileurl: data.avatar_url || ''
  });
  const jwtToken = signJwt({ id: user._id, email: user.email, authMethod: user.authMethod });
  return NextResponse.json({ message: 'GitHub signup successful.', token: jwtToken, user: { email: user.email, name: user.name, authMethod: user.authMethod } });
}
