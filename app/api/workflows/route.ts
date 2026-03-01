import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workflows } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json, error, WORKSPACE_ID } from "@/lib/api/utils";

export async function GET() {
  const rows = await db
    .select()
    .from(workflows)
    .where(eq(workflows.workspaceId, WORKSPACE_ID));

  return json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, nodes, edges } = body;

  if (!name) return error("name is required");

  const [row] = await db
    .insert(workflows)
    .values({
      workspaceId: WORKSPACE_ID,
      name,
      nodes: nodes ?? [],
      edges: edges ?? [],
      status: "draft",
    })
    .returning();

  return json(row, 201);
}
