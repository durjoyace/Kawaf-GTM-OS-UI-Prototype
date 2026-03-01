import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { sequences, sequenceEnrollments } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { json, error, getSessionContext } from "@/lib/api/utils";

export async function GET() {
  const ctx = await getSessionContext();
  const rows = await db
    .select({
      id: sequences.id,
      name: sequences.name,
      channels: sequences.channels,
      status: sequences.status,
      steps: sequences.steps,
      openRate: sequences.openRate,
      replyRate: sequences.replyRate,
      meetingsBooked: sequences.meetingsBooked,
      progress: sequences.progress,
      enrollmentCount: count(sequenceEnrollments.id),
    })
    .from(sequences)
    .leftJoin(sequenceEnrollments, eq(sequences.id, sequenceEnrollments.sequenceId))
    .where(eq(sequences.workspaceId, ctx.workspaceId))
    .groupBy(sequences.id);

  return json(rows);
}

export async function POST(req: NextRequest) {
  const ctx = await getSessionContext();
  const body = await req.json();
  const { name, channels, steps } = body;

  if (!name) return error("name is required");

  const [row] = await db
    .insert(sequences)
    .values({
      workspaceId: ctx.workspaceId,
      name,
      channels: channels ?? [],
      steps: steps ?? [],
      status: "draft",
    })
    .returning();

  return json(row, 201);
}
