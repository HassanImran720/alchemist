import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/db/models/User";
import { signJwt } from "@/helpers/jwt";
import dbConnect from "@/db/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // <- MongoDB connect
    const { code } = await req.json();
    if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

    // Exchange code for token
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_ID!,
      client_secret: process.env.GITHUB_SECRET!,
      code,
    });
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: params,
    });
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ error: "Failed to get access token" }, { status: 400 });
    }

    // Fetch user data
    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const ghUser = await userRes.json();

    if (!ghUser.email) {
      const emailRes = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const emails = await emailRes.json();
      const primary = emails.find((e: any) => e.primary)?.email;
      ghUser.email = primary;
    }

    // Check if registered
    const existingUser = await UserModel.findOne({ email: ghUser.email, authMethod: "github" });
    if (!existingUser) {
      return NextResponse.json({
        error: "No account found with GitHub. Please signup first.",
      }, { status: 400 });
    }

    // Create JWT
    const token = signJwt({ 
      id: existingUser._id, 
      email: existingUser.email, 
      authMethod: existingUser.authMethod 
    });

    return NextResponse.json({ token, user: existingUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
