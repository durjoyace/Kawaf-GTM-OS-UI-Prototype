import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function POST() {
  try {
    const ctx = await getSessionContext();
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, ctx.userId));

    return json({ success: true });
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[POST /api/notifications/mark-all-read]", err);
    return error("Internal server error", 500);
  }
}
