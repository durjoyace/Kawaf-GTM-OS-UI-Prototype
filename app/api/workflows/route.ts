import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workflows } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function GET() {
  try {
    const ctx = await getSessionContext();
    const rows = await db
      .select()
      .from(workflows)
      .where(eq(workflows.workspaceId, ctx.workspaceId));

    return json(rows);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[GET /api/workflows]", err);
    return error("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await getSessionContext();
    const body = await req.json();
    const { name, nodes, edges } = body;

    if (!name) return error("name is required");

    const [row] = await db
      .insert(workflows)
      .values({
        workspaceId: ctx.workspaceId,
        name,
        nodes: nodes ?? [],
        edges: edges ?? [],
        status: "draft",
      })
      .returning();

    return json(row, 201);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[POST /api/workflows]", err);
    return error("Internal server error", 500);
  }
}
