import { db } from "@/lib/db";
import { deals, signalAccounts, signals } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getAnthropicClient } from "./client";

export interface IcpSuggestion {
  category: "industry" | "size" | "techStack" | "behavior" | "firmographic";
  suggestion: string;
  confidence: number;
  reasoning: string;
}

/**
 * Analyze closed-won deals to suggest ICP refinements.
 */
export async function learnFromDeals(workspaceId: string): Promise<IcpSuggestion[]> {
  // Fetch closed-won deals with account data
  const wonDeals = await db
    .select({
      dealName: deals.name,
      dealValue: deals.value,
      accountName: signalAccounts.name,
      industry: signalAccounts.industry,
      employees: signalAccounts.employees,
      revenue: signalAccounts.revenue,
      techStack: signalAccounts.techStack,
      fundingStage: signalAccounts.fundingStage,
    })
    .from(deals)
    .leftJoin(signalAccounts, eq(deals.accountId, signalAccounts.id))
    .where(
      and(
        eq(deals.workspaceId, workspaceId),
        eq(deals.stage, "closed-won")
      )
    )
    .limit(50);

  if (wonDeals.length < 3) {
    return [{
      category: "behavior",
      suggestion: "Need more closed-won deals for meaningful ICP analysis",
      confidence: 0,
      reasoning: `Only ${wonDeals.length} closed-won deals found. At least 3 needed for pattern detection.`,
    }];
  }

  // Fetch related signals for context
  const accountSignals = await db
    .select({
      signalType: signals.signalType,
      category: signals.category,
      confidence: signals.confidence,
    })
    .from(signals)
    .where(eq(signals.workspaceId, workspaceId))
    .limit(100);

  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are an ICP (Ideal Customer Profile) analyst. Analyze closed-won deals and suggest ICP refinements. Return JSON array only, no markdown.`,
      messages: [{
        role: "user",
        content: `Analyze these closed-won deals and suggest ICP refinements:

Deals: ${JSON.stringify(wonDeals)}

Signal patterns: ${JSON.stringify(accountSignals.slice(0, 30))}

Return a JSON array of suggestions with this shape:
[{ "category": "industry|size|techStack|behavior|firmographic", "suggestion": "...", "confidence": 0-100, "reasoning": "..." }]`,
      }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "[]";
    return JSON.parse(text) as IcpSuggestion[];
  } catch {
    // Fallback: basic pattern analysis
    const industries = wonDeals.map(d => d.industry).filter(Boolean);
    const topIndustry = mode(industries as string[]);

    return [{
      category: "industry",
      suggestion: topIndustry ? `Focus on ${topIndustry} — most closed-won deals come from this industry` : "Diversify industry targeting",
      confidence: 60,
      reasoning: `Based on ${wonDeals.length} closed-won deals.`,
    }];
  }
}

function mode(arr: string[]): string | null {
  if (arr.length === 0) return null;
  const freq: Record<string, number> = {};
  for (const v of arr) freq[v] = (freq[v] ?? 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}
