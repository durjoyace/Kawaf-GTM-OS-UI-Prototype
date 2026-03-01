import { NextRequest } from "next/server";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { meetings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { generateBrief } from "@/lib/ai/meeting-brief";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ctx = await getSessionContext();

  const [meeting] = await db
    .select()
    .from(meetings)
    .where(
      and(eq(meetings.id, id), eq(meetings.workspaceId, ctx.workspaceId))
    );

  if (!meeting) return error("Meeting not found", 404);

  if (!meeting.accountId) {
    return json({
      keyPoints: ["No account linked to this meeting"],
      risks: [],
      opportunities: [],
      talkingPoints: [],
      accountSummary: "Link an account to generate a detailed brief.",
    });
  }

  // Check cache
  if (meeting.brief) {
    return json(meeting.brief);
  }

  const brief = await generateBrief(meeting.accountId);

  // Cache the brief
  await db
    .update(meetings)
    .set({ brief: brief as unknown as Record<string, unknown> })
    .where(eq(meetings.id, id));

  return json(brief);
}
