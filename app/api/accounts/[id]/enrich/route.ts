import { NextRequest } from "next/server";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { signalAccounts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { enrichAccount } from "@/lib/enrichment/enrich-account";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ctx = await getSessionContext();

  // Verify account belongs to workspace
  const [account] = await db
    .select()
    .from(signalAccounts)
    .where(
      and(
        eq(signalAccounts.id, id),
        eq(signalAccounts.workspaceId, ctx.workspaceId)
      )
    );

  if (!account) return error("Account not found", 404);

  try {
    const result = await enrichAccount(id);
    return json({ success: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Enrichment failed";
    return error(message, 500);
  }
}
