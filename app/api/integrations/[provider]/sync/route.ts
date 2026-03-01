import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { integrations } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, getSessionContext } from "@/lib/api/utils";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const ctx = await getSessionContext();
  const { provider } = await params;

  const [integration] = await db
    .select()
    .from(integrations)
    .where(and(eq(integrations.provider, provider), eq(integrations.workspaceId, ctx.workspaceId)));

  if (!integration) return error("Integration not found", 404);
  if (integration.status !== "connected") return error("Integration is not connected");

  // Update lastSyncAt (actual sync handled by Inngest background job)
  const [row] = await db
    .update(integrations)
    .set({ lastSyncAt: new Date() })
    .where(eq(integrations.id, integration.id))
    .returning();

  return json({ syncing: true, integration: row });
}
