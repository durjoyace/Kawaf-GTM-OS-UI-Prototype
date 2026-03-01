import { NextRequest } from "next/server";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { meetings } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const ctx = await getSessionContext();

  const rows = await db
    .select()
    .from(meetings)
    .where(eq(meetings.workspaceId, ctx.workspaceId))
    .orderBy(desc(meetings.scheduledAt));

  return json(rows);
}

export async function POST(req: NextRequest) {
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
}
