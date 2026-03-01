import { db } from "@/lib/db";
import { signalAccounts, signals, deals } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAnthropicClient } from "./client";

export interface MeetingBrief {
  keyPoints: string[];
  risks: string[];
  opportunities: string[];
  talkingPoints: string[];
  accountSummary: string;
}

/**
 * Generate a pre-meeting brief from signals, enrichment, and deal history.
 */
export async function generateBrief(accountId: string): Promise<MeetingBrief> {
  // Gather context
  const [account] = await db
    .select()
    .from(signalAccounts)
    .where(eq(signalAccounts.id, accountId));

  if (!account) {
    return {
      keyPoints: ["Account not found"],
      risks: [],
      opportunities: [],
      talkingPoints: [],
      accountSummary: "No account data available.",
    };
  }

  const accountSignals = await db
    .select()
    .from(signals)
    .where(eq(signals.accountId, accountId))
    .limit(20);

  const accountDeals = await db
    .select()
    .from(deals)
    .where(eq(deals.accountId, accountId))
    .limit(10);

  const context = {
    account: {
      name: account.name,
      industry: account.industry,
      employees: account.employees,
      revenue: account.revenue,
      techStack: account.techStack,
      fundingStage: account.fundingStage,
      headquarters: account.headquarters,
    },
    signals: accountSignals.map((s) => ({
      type: s.signalType,
      description: s.description,
      confidence: s.confidence,
      date: s.createdAt,
    })),
    deals: accountDeals.map((d) => ({
      name: d.name,
      value: d.value,
      stage: d.stage,
    })),
  };

  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: "Generate a pre-meeting brief for a sales meeting. Return JSON only, no markdown.",
      messages: [{
        role: "user",
        content: `Generate a meeting brief for ${account.name}:

${JSON.stringify(context, null, 2)}

Return JSON: { "keyPoints": ["..."], "risks": ["..."], "opportunities": ["..."], "talkingPoints": ["..."], "accountSummary": "..." }`,
      }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "{}";
    return JSON.parse(text) as MeetingBrief;
  } catch {
    return {
      keyPoints: [`${account.name} — ${account.industry ?? "Unknown industry"}`],
      risks: accountDeals.filter((d) => d.stage === "closed-lost").length > 0
        ? ["Previous deal(s) closed-lost"]
        : [],
      opportunities: accountSignals
        .filter((s) => s.confidenceLevel === "high")
        .map((s) => s.description)
        .slice(0, 3),
      talkingPoints: ["Discuss recent engagement signals", "Review enrichment data"],
      accountSummary: `${account.name} is a ${account.employees ? `${account.employees}-person` : ""} company${account.industry ? ` in ${account.industry}` : ""}.`,
    };
  }
}
