import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { signalAccounts, signals } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { json, error, getSessionContext } from "@/lib/api/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getSessionContext();
  const { id } = await params;

  const [account] = await db
    .select()
    .from(signalAccounts)
    .where(and(eq(signalAccounts.id, id), eq(signalAccounts.workspaceId, ctx.workspaceId)));

  if (!account) return error("Account not found", 404);

  const accountSignals = await db
    .select()
    .from(signals)
    .where(and(eq(signals.accountId, id), eq(signals.workspaceId, ctx.workspaceId)))
    .orderBy(desc(signals.createdAt));

  return json({ ...account, signals: accountSignals });
}
