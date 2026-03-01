import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json, getSessionContext } from "@/lib/api/utils";

export async function POST() {
  const ctx = await getSessionContext();
  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.userId, ctx.userId));

  return json({ success: true });
}
