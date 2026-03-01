import { db } from "@/lib/db";
import { integrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function GET() {
  try {
    const ctx = await getSessionContext();
    const rows = await db
      .select()
      .from(integrations)
      .where(eq(integrations.workspaceId, ctx.workspaceId));

    return json(rows);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[GET /api/integrations]", err);
    return error("Internal server error", 500);
  }
}
