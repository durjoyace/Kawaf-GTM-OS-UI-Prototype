import { db } from "@/lib/db";
import { integrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json, getSessionContext } from "@/lib/api/utils";

export async function GET() {
  const ctx = await getSessionContext();
  const rows = await db
    .select()
    .from(integrations)
    .where(eq(integrations.workspaceId, ctx.workspaceId));

  return json(rows);
}
