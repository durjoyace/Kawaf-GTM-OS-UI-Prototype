import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { signals } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, getSessionContext } from "@/lib/api/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getSessionContext();
  const { id } = await params;
  const [row] = await db
    .select()
    .from(signals)
    .where(and(eq(signals.id, id), eq(signals.workspaceId, ctx.workspaceId)));

  if (!row) return error("Signal not found", 404);
  return json(row);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getSessionContext();
  const { id } = await params;
  const body = await req.json();

  const [row] = await db
    .update(signals)
    .set(body)
    .where(and(eq(signals.id, id), eq(signals.workspaceId, ctx.workspaceId)))
    .returning();

  if (!row) return error("Signal not found", 404);
  return json(row);
}
