import { db } from "@/lib/db";
import { signalAccounts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { json, WORKSPACE_ID } from "@/lib/api/utils";

export async function GET() {
  const rows = await db
    .select()
    .from(signalAccounts)
    .where(eq(signalAccounts.workspaceId, WORKSPACE_ID))
    .orderBy(desc(signalAccounts.score));

  return json(rows);
}
