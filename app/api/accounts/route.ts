import { db } from "@/lib/db";
import { signalAccounts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { json, getSessionContext } from "@/lib/api/utils";

export async function GET() {
  const ctx = await getSessionContext();
  const rows = await db
    .select()
    .from(signalAccounts)
    .where(eq(signalAccounts.workspaceId, ctx.workspaceId))
    .orderBy(desc(signalAccounts.score));

  return json(rows);
}
