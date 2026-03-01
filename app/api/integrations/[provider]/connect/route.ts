import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { integrations } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, getSessionContext } from "@/lib/api/utils";

export async function POST(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const ctx = await getSessionContext();
  const { provider } = await params;
  const body = await req.json();

  // Upsert: connect or update existing
  const [existing] = await db
    .select()
    .from(integrations)
    .where(and(eq(integrations.provider, provider), eq(integrations.workspaceId, ctx.workspaceId)));

  if (existing) {
    const [row] = await db
      .update(integrations)
      .set({ status: "connected", config: body.config ?? {}, lastSyncAt: new Date() })
      .where(eq(integrations.id, existing.id))
      .returning();
    return json(row);
  }

  const [row] = await db
    .insert(integrations)
    .values({
      workspaceId: ctx.workspaceId,
      provider,
      name: body.name ?? provider,
      status: "connected",
      config: body.config ?? {},
    })
    .returning();

  return json(row, 201);
}
