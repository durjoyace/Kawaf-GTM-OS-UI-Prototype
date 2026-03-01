import { db } from "@/lib/db";
import { signalAccounts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function GET() {
  try {
    const ctx = await getSessionContext();
    const rows = await db
      .select()
      .from(signalAccounts)
      .where(eq(signalAccounts.workspaceId, ctx.workspaceId))
      .orderBy(desc(signalAccounts.score));

    return json(rows);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[GET /api/accounts]", err);
    return error("Internal server error", 500);
  }
}
