import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedUser } from "../../../../lib/auth";
import PromptLibraryModel from "../../../../db/models/PromptLibrary";
import dbConnect from "../../../../db/dbConnect";

// GET - Fetch single prompt with all details
async function getPromptDetailHandler(
  req: NextRequest,
  user: AuthenticatedUser,
  context?: any
) {
  try {
    await dbConnect();
    
  // Safely resolve dynamic route param `id`.
  // In newer Next.js versions `params` can be a Promise (see warning: params should be awaited).
  let id: string | null = null;
  if (context && context.params) {
      try {
        const maybePromise = context.params as any;
        const resolved = typeof maybePromise?.then === 'function' ? await maybePromise : maybePromise;
        if (resolved && typeof resolved.id === 'string') {
          id = resolved.id;
        }
      } catch (e) {
        // ignore and fallback to URL parsing below
      }
  }
    if (!id) {
      // fallback: try to parse id from the URL
      try {
        const url = new URL(req.url);
        // Expect path like /api/prompt-library/<id>
        const parts = url.pathname.split('/').filter(Boolean);
        id = parts[parts.length - 1];
      } catch (e) {
        // ignore
      }
    }
    
    console.log("📄 Fetching prompt details:", id);

    // Fetch complete prompt data
    const prompt = await PromptLibraryModel.findOne({
      _id: id,
      userId: user.id
    }).lean();

    if (!prompt) {
      return NextResponse.json({ 
        error: "Prompt not found or not accessible" 
      }, { status: 404 });
    }

    console.log("✅ Prompt details fetched:", prompt.title);

    return NextResponse.json({
      success: true,
      prompt
    });

  } catch (err: any) {
    console.error("❌ Error fetching prompt details:", err);
    return NextResponse.json({ 
      error: err.message || String(err) 
    }, { status: 500 });
  }
}

export const GET = withAuth(getPromptDetailHandler);
