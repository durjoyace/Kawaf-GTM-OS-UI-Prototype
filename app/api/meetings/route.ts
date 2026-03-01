import { NextRequest } from "next/server";
import { getSessionContext, json, error, AuthError } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { meetings } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const ctx = await getSessionContext();

    const rows = await db
      .select()
      .from(meetings)
      .where(eq(meetings.workspaceId, ctx.workspaceId))
      .orderBy(desc(meetings.scheduledAt));

    return json(rows);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[GET /api/meetings]", err);
    return error("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await getSessionContext();
    const body = await req.json();

    const { title, scheduledAt, accountId, attendees } = body as {
      title: string;
      scheduledAt: string;
      accountId?: string;
      attendees?: Record<string, unknown>[];
    };

    if (!title || !scheduledAt) {
      return error("Missing required fields: title, scheduledAt", 400);
    }

    const [meeting] = await db
      .insert(meetings)
      .values({
        workspaceId: ctx.workspaceId,
        accountId: accountId ?? null,
        title,
        scheduledAt: new Date(scheduledAt),
        attendees: attendees ?? [],
      })
      .returning();

    return json(meeting, 201);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[POST /api/meetings]", err);
    return error("Internal server error", 500);
  }
}
