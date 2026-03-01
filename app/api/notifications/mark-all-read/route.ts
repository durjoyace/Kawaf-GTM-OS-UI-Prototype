import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json, DEMO_USER_ID } from "@/lib/api/utils";

export async function POST() {
  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.userId, DEMO_USER_ID));

  return json({ success: true });
}
