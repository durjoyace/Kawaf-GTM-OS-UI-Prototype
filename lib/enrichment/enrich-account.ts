import { db } from "@/lib/db";
import { signalAccounts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { fetchEnrichment } from "./client";

/**
 * Enrich a signal account with firmographic data.
 * Fetches company data from enrichment provider and updates the account.
 */
export async function enrichAccount(accountId: string) {
  const [account] = await db
    .select()
    .from(signalAccounts)
    .where(eq(signalAccounts.id, accountId));

  if (!account) {
    throw new Error(`Account not found: ${accountId}`);
  }

  const domain = (account.metadata as Record<string, unknown>)?.domain as string | undefined;
  const result = await fetchEnrichment(account.name, domain);

  await db
    .update(signalAccounts)
    .set({
      employees: result.employees,
      revenue: result.revenue,
      techStack: result.techStack,
      linkedinUrl: result.linkedinUrl,
      fundingStage: result.fundingStage,
      headquarters: result.headquarters,
      enrichedAt: new Date(),
      enrichmentSource: result.source,
    })
    .where(eq(signalAccounts.id, accountId));

  return result;
}
