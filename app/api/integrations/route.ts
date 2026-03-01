import { db } from "@/lib/db";
import { integrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json, WORKSPACE_ID } from "@/lib/api/utils";

export async function GET() {
  const rows = await db
    .select()
    .from(integrations)
    .where(eq(integrations.workspaceId, WORKSPACE_ID));

  return json(rows);
}
