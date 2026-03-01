import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { sequenceEnrollments, sequences } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, WORKSPACE_ID } from "@/lib/api/utils";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { contactIds } = body as { contactIds: string[] };

  if (!contactIds?.length) return error("contactIds array is required");

  // Verify sequence exists
  const [seq] = await db
    .select()
    .from(sequences)
    .where(and(eq(sequences.id, id), eq(sequences.workspaceId, WORKSPACE_ID)));

  if (!seq) return error("Sequence not found", 404);

  const rows = await db
    .insert(sequenceEnrollments)
    .values(contactIds.map((contactId) => ({ sequenceId: id, contactId })))
    .returning();

  return json({ enrolled: rows.length }, 201);
}
