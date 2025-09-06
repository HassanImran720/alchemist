import { NextResponse } from "next/server";

const MAILERLITE_TOKEN = process.env.MAILERLITE_TOKEN as string;
const GROUP_ID = process.env.MAILERLITE_GROUP_ID as string;

interface SubscriberRequest {
  name?: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email } = body as SubscriberRequest;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (name) console.log("✅ Name provided:", name);

    if (!MAILERLITE_TOKEN || !GROUP_ID) {
      console.error("❌ Missing required environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration: Missing env variables" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MAILERLITE_TOKEN}`,
        },
        body: JSON.stringify({
          email,
          fields: {
            name: name || "",
          },
          groups: [GROUP_ID],
          resubscribe: true,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: "MailerLite error", details: data },
        { status: response.status }
      );
    }
    return NextResponse.json(
      { message: "Successfully subscribed and added to group!", data },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json(
      { error: "Something went wrong", details: errorMessage },
      { status: 500 }
    );
  }
}
