import { db } from "@/lib/db";
import { outreachEmails, emailEngagements } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

interface VariantStats {
  id: string;
  name: string;
  sends: number;
  opens: number;
  clicks: number;
  replies: number;
  openRate: number;
  clickRate: number;
}

interface AbResults {
  variants: VariantStats[];
  winner: string | null;
  confidence: number;
}

/**
 * Calculate A/B test results for a specific step in a sequence.
 * Queries outreach emails and engagements grouped by variantId.
 */
export async function calculateAbResults(
  sequenceId: string,
  stepIndex: number,
  variantDefs: Array<{ id: string; name: string }>
): Promise<AbResults> {
  // Get all outreach emails for this sequence that have a variantId set
  // We correlate via the tracking metadata. For now, query all emails in the workspace
  // that reference this sequence's signals and have a variantId.
  // Simpler approach: query by variantId across the workspace.

  const variantStats: VariantStats[] = [];

  for (const def of variantDefs) {
    const emails = await db
      .select()
      .from(outreachEmails)
      .where(eq(outreachEmails.variantId, def.id));

    let opens = 0;
    let clicks = 0;
    let replies = 0;

    for (const email of emails) {
      const engagements = await db
        .select()
        .from(emailEngagements)
        .where(
          and(
            eq(emailEngagements.outreachEmailId, email.id),
            eq(emailEngagements.variantId, def.id)
          )
        );

      for (const eng of engagements) {
        if (eng.type === "open") opens++;
        if (eng.type === "click") clicks++;
        if (eng.type === "reply") replies++;
      }
    }

    const sends = emails.length;
    variantStats.push({
      id: def.id,
      name: def.name,
      sends,
      opens,
      clicks,
      replies,
      openRate: sends > 0 ? Math.round((opens / sends) * 100) : 0,
      clickRate: sends > 0 ? Math.round((clicks / sends) * 100) : 0,
    });
  }

  // Determine winner by open rate (simple heuristic)
  let winner: string | null = null;
  let confidence = 0;

  if (variantStats.length === 2) {
    const [a, b] = variantStats;
    const totalSends = a.sends + b.sends;

    if (totalSends >= 20) {
      // Need at least 20 total sends for any confidence
      const diff = Math.abs(a.openRate - b.openRate);
      if (diff >= 10) {
        winner = a.openRate > b.openRate ? a.id : b.id;
        confidence = Math.min(95, 50 + diff * 2);
      } else if (diff >= 5) {
        winner = a.openRate > b.openRate ? a.id : b.id;
        confidence = Math.min(75, 40 + diff * 3);
      }
    }
  }

  return { variants: variantStats, winner, confidence };
}
