import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { playbooks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSessionContext, json, error, AuthError } from "@/lib/api/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[GET /api/playbooks/[id]]", err);
    return error("Internal server error", 500);
  }
}
