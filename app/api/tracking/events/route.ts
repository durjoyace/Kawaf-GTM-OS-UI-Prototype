import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { trackingEvents, workspaces } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, visitorId, pageUrl, pageTitle, referrer, duration, type } = body;

    if (!key || !visitorId || !pageUrl) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Validate workspace API key
    const [workspace] = await db
      .select({ id: workspaces.id })
      .from(workspaces)
      .where(eq(workspaces.apiKey, key));

    if (!workspace) {
      return new Response("Invalid API key", { status: 401 });
    }

    await db.insert(trackingEvents).values({
      workspaceId: workspace.id,
      visitorId,
      pageUrl,
      pageTitle: pageTitle || null,
      referrer: referrer || null,
      duration: duration || null,
      metadata: { type: type || "pageview" },
    });

    return new Response("ok", { status: 200 });
  } catch {
    return new Response("Internal error", { status: 500 });
  }
}
