import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { signals } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getSessionContext();
    const { id } = await params;
    const [row] = await db
      .select()
      .from(signals)
      .where(and(eq(signals.id, id), eq(signals.workspaceId, ctx.workspaceId)));

    if (!row) return error("Signal not found", 404);
    return json(row);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[Signals API]", err);
    return error("Internal server error", 500);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getSessionContext();
    const { id } = await params;
    const body = await req.json();

    // Whitelist mutable fields
    const allowed: Record<string, unknown> = {};
    const mutable = ["status", "impact", "confidence", "confidenceLevel", "notes", "category"];
    for (const key of mutable) {
      if (body[key] !== undefined) allowed[key] = body[key];
    }

    const [row] = await db
      .update(signals)
      .set(allowed)
      .where(and(eq(signals.id, id), eq(signals.workspaceId, ctx.workspaceId)))
      .returning();

    if (!row) return error("Signal not found", 404);
    return json(row);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[Signals API]", err);
    return error("Internal server error", 500);
  }
}
