import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workflows } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getSessionContext();
    const { id } = await params;
    const [row] = await db
      .select()
      .from(workflows)
      .where(and(eq(workflows.id, id), eq(workflows.workspaceId, ctx.workspaceId)));

    if (!row) return error("Workflow not found", 404);
    return json(row);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[Workflows API]", err);
    return error("Internal server error", 500);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getSessionContext();
    const { id } = await params;
    const body = await req.json();

    const allowed: Record<string, unknown> = {};
    const mutable = ["name", "description", "nodes", "edges", "status"];
    for (const key of mutable) {
      if (body[key] !== undefined) allowed[key] = body[key];
    }
    allowed.updatedAt = new Date();

    const [row] = await db
      .update(workflows)
      .set(allowed)
      .where(and(eq(workflows.id, id), eq(workflows.workspaceId, ctx.workspaceId)))
      .returning();

    if (!row) return error("Workflow not found", 404);
    return json(row);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[Workflows API]", err);
    return error("Internal server error", 500);
  }
}
