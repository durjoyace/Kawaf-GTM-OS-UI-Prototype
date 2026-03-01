import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { sequences, sequenceEnrollments } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { json, error, WORKSPACE_ID } from "@/lib/api/utils";

export async function GET() {
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
    .where(eq(sequences.workspaceId, WORKSPACE_ID))
    .groupBy(sequences.id);

  return json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, channels, steps } = body;

  if (!name) return error("name is required");

  const [row] = await db
    .insert(sequences)
    .values({
      workspaceId: WORKSPACE_ID,
      name,
      channels: channels ?? [],
      steps: steps ?? [],
      status: "draft",
    })
    .returning();

  return json(row, 201);
}
