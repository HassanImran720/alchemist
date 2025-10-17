import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/db/models/User";
import dbConnect from "@/db/dbConnect";
import { signJwt } from "@/helpers/jwt";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_ID);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: "No token provided" }, { status: 400 });

    // Verify ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;

    // Check if user exists
    const user = await UserModel.findOne({ email, authMethod: "google" });
    if (!user) return NextResponse.json({ error: "No account found with Google. Please signup first." }, { status: 400 });

    const jwtToken = signJwt({ 
      id: user._id, 
      email: user.email, 
      authMethod: user.authMethod 
    });
    return NextResponse.json({ token: jwtToken, user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
