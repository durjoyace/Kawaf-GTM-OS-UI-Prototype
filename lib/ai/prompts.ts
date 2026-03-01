import type { SignalContext, AccountContext } from "./types";

export function buildScorePrompt(signal: SignalContext, account: AccountContext | null): string {
  const accountInfo = account
    ? `\nAccount: ${account.name} (Industry: ${account.industry ?? "Unknown"}, Score: ${account.score ?? "N/A"})`
    : "\nAccount: Unknown";

  return `You are a GTM (Go-To-Market) intelligence analyst. Analyze the following buying signal and provide a structured assessment.

Signal Type: ${signal.signalType}
Category: ${signal.category}
Description: ${signal.description}
Raw Confidence: ${signal.rawConfidence}%
Source: ${signal.source ?? "Direct"}
Tags: ${signal.tags.join(", ") || "None"}${accountInfo}
${signal.rawData ? `\nRaw Data: ${JSON.stringify(signal.rawData)}` : ""}

Respond with ONLY a JSON object (no markdown fences) containing:
- "confidence": number 0-100, your refined confidence score based on the signal strength and context
- "confidenceLevel": "high" if confidence >= 80, "medium" if >= 60, else "low"
- "explanation": 1-2 sentence explanation of why this signal matters (or doesn't)
- "suggestedAction": a specific, actionable next step the sales team should take`;
}

export const SCORE_SYSTEM_PROMPT = `You are an expert B2B sales intelligence analyst for a GTM (Go-To-Market) platform. Your job is to evaluate buying signals and determine their strength, relevance, and the best next action.

Be precise and actionable. Avoid generic advice. Consider:
- Signal recency and relevance
- Account context and industry
- Likely buying intent based on the signal type
- What a top-performing SDR would do next

Always respond with valid JSON only.`;
