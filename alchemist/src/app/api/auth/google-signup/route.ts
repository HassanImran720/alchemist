import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/db/models/User";
import dbConnect from "@/db/dbConnect";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_ID);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: "No token provided" }, { status: 400 });
console.log(token);
    // Verify ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name || "Google User";

    // Check if already registered
    const existingUser = await UserModel.findOne({ email, authMethod: "google" });
    if (existingUser) return NextResponse.json({ error: "Already registered with Google. Please login." }, { status: 400 });

    // Create new user
    const newUser = await UserModel.create({ name, email, authMethod: "google" });
    const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return NextResponse.json({ token: jwtToken, user: newUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
