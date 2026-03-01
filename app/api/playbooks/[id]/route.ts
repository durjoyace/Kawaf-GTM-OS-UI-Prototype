import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { playbooks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSessionContext, json, error } from "@/lib/api/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ctx = await getSessionContext();

  const [playbook] = await db
    .select()
    .from(playbooks)
    .where(eq(playbooks.id, id));

  if (!playbook || playbook.workspaceId !== ctx.workspaceId) {
    return error("Playbook not found", 404);
  }

  return json(playbook);
}
