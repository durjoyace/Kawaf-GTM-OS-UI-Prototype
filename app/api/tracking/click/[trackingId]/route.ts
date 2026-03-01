import { NextRequest, NextResponse } from "next/server";
import { recordEngagement } from "@/lib/email/engagement";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await params;
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  // Record click event (fire and forget)
  recordEngagement(trackingId, "click", {
    linkUrl: url,
    ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
    userAgent: req.headers.get("user-agent") ?? undefined,
  }).catch(() => {});

  return NextResponse.redirect(url, 302);
}
