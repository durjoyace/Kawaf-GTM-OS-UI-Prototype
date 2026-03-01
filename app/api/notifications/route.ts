import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { json, getSessionContext } from "@/lib/api/utils";

export async function GET() {
  const ctx = await getSessionContext();
  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, ctx.userId))
    .orderBy(desc(notifications.createdAt))
    .limit(20);

  return json(rows);
}
