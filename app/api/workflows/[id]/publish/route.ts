import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workflows } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, getSessionContext } from "@/lib/api/utils";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getSessionContext();
  const { id } = await params;

  const [row] = await db
    .update(workflows)
    .set({ status: "published", updatedAt: new Date() })
    .where(and(eq(workflows.id, id), eq(workflows.workspaceId, ctx.workspaceId)))
    .returning();

  if (!row) return error("Workflow not found", 404);
  return json(row);
}
