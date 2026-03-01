import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { json, DEMO_USER_ID } from "@/lib/api/utils";

export async function GET() {
  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, DEMO_USER_ID))
    .orderBy(desc(notifications.createdAt))
    .limit(20);

  return json(rows);
}
