import { NextRequest } from "next/server";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { signalSources } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ctx = await getSessionContext();

  const [source] = await db
    .select()
    .from(signalSources)
    .where(
      and(eq(signalSources.id, id), eq(signalSources.workspaceId, ctx.workspaceId))
    );

  if (!source) return error("Signal source not found", 404);
  return json(source);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ctx = await getSessionContext();
  const body = await req.json();

  const [existing] = await db
    .select()
    .from(signalSources)
    .where(
      and(eq(signalSources.id, id), eq(signalSources.workspaceId, ctx.workspaceId))
    );

  if (!existing) return error("Signal source not found", 404);

  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) updates.name = body.name;
  if (body.type !== undefined) updates.type = body.type;
  if (body.config !== undefined) updates.config = body.config;
  if (body.conditionRules !== undefined) updates.conditionRules = body.conditionRules;
  if (body.status !== undefined) updates.status = body.status;

  const [updated] = await db
    .update(signalSources)
    .set(updates)
    .where(eq(signalSources.id, id))
    .returning();

  return json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ctx = await getSessionContext();

  const [existing] = await db
    .select()
    .from(signalSources)
    .where(
      and(eq(signalSources.id, id), eq(signalSources.workspaceId, ctx.workspaceId))
    );

  if (!existing) return error("Signal source not found", 404);

  await db.delete(signalSources).where(eq(signalSources.id, id));
  return json({ success: true });
}
