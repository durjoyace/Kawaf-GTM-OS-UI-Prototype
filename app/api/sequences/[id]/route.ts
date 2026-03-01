import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { sequences } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getSessionContext();
    const { id } = await params;
    const body = await req.json();

    const allowed: Record<string, unknown> = {};
    const mutable = ["name", "status", "channels", "steps"];
    for (const key of mutable) {
      if (body[key] !== undefined) allowed[key] = body[key];
    }

    const [row] = await db
      .update(sequences)
      .set(allowed)
      .where(and(eq(sequences.id, id), eq(sequences.workspaceId, ctx.workspaceId)))
      .returning();

    if (!row) return error("Sequence not found", 404);
    return json(row);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[Sequences API]", err);
    return error("Internal server error", 500);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getSessionContext();
    const { id } = await params;

    const [row] = await db
      .delete(sequences)
      .where(and(eq(sequences.id, id), eq(sequences.workspaceId, ctx.workspaceId)))
      .returning();

    if (!row) return error("Sequence not found", 404);
    return json({ deleted: true });
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[Sequences API]", err);
    return error("Internal server error", 500);
  }
}
