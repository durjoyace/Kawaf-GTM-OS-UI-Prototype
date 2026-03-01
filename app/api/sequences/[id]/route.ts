import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { sequences } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, getSessionContext } from "@/lib/api/utils";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getSessionContext();
  const { id } = await params;
  const body = await req.json();

  const [row] = await db
    .update(sequences)
    .set(body)
    .where(and(eq(sequences.id, id), eq(sequences.workspaceId, ctx.workspaceId)))
    .returning();

  if (!row) return error("Sequence not found", 404);
  return json(row);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getSessionContext();
  const { id } = await params;

  const [row] = await db
    .delete(sequences)
    .where(and(eq(sequences.id, id), eq(sequences.workspaceId, ctx.workspaceId)))
    .returning();

  if (!row) return error("Sequence not found", 404);
  return json({ deleted: true });
}
