import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT || 587),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // 1) Send email to Admin / You
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_SERVER_USER,
      replyTo: email,
      subject: subject ? `Contact: ${subject}` : "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "(none)"}</p>
          <p><strong>Message:</strong><br/>${message}</p>
          <hr/>
          <p>Reply to this email to contact the user directly.</p>
        </div>
      `,
    });

    // 2) Send auto-reply to User with logo
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "We received your message!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Hello ${name},</h2>
          <p>Thank you for reaching out to us. We have received your message and will get back to you soon.</p>
          <p><strong>Your submitted message:</strong><br/>"${message}"</p>
          <br/>
          <p>Best regards,<br/>Support Team</p>
          <img src="cid:logo" alt="Company Logo" style="width:120px; margin-top:10px;" />
        </div>
      `,
      attachments: [
        {
          filename: "LOGO.png",
          path: "./public/LOGO.png", // make sure your logo is in the public folder
          cid: "logo", // same cid value as in the html img src
        },
      ],
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("/api/contact error:", error);
    return NextResponse.json({ message: "Error sending mail" }, { status: 500 });
  }
}
