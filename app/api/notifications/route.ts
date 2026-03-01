import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function GET() {
  try {
    const ctx = await getSessionContext();
    const rows = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, ctx.userId))
      .orderBy(desc(notifications.createdAt))
      .limit(20);

    return json(rows);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[GET /api/notifications]", err);
    return error("Internal server error", 500);
  }
}
