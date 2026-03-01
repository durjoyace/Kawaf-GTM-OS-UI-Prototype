import { NextRequest } from "next/server";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { playbooks } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ctx = await getSessionContext();

  const [playbook] = await db
    .select()
    .from(playbooks)
    .where(
      and(
        eq(playbooks.id, id),
        eq(playbooks.workspaceId, ctx.workspaceId)
      )
    );

  if (!playbook) return error("Playbook not found", 404);

  // Validate rules exist
  const rules = playbook.signalRules as Record<string, unknown> | null;
  if (!rules || (!rules.categories && !rules.signalTypes)) {
    return error("Playbook must have at least one signal rule to activate", 400);
  }

  await db
    .update(playbooks)
    .set({ status: "active" })
    .where(eq(playbooks.id, id));

  return json({ success: true, status: "active" });
}
