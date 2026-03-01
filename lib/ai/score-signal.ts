import { getAnthropicClient } from "./client";
import { buildScorePrompt, SCORE_SYSTEM_PROMPT } from "./prompts";
import type { AiScoreResult, SignalContext, AccountContext } from "./types";

export async function scoreSignal(
  signal: SignalContext,
  account: AccountContext | null
): Promise<AiScoreResult> {
  const client = getAnthropicClient();
  const userPrompt = buildScorePrompt(signal, account);

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    system: SCORE_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  const result: AiScoreResult = JSON.parse(text);

  // Ensure confidenceLevel matches confidence
  if (result.confidence >= 80) result.confidenceLevel = "high";
  else if (result.confidence >= 60) result.confidenceLevel = "medium";
  else result.confidenceLevel = "low";

  return result;
}

/** Threshold-based fallback when AI is unavailable */
export function scoreSignalFallback(rawConfidence: number): AiScoreResult {
  let confidenceLevel: "high" | "medium" | "low" = "medium";
  if (rawConfidence >= 80) confidenceLevel = "high";
  else if (rawConfidence >= 60) confidenceLevel = "medium";
  else confidenceLevel = "low";

  return {
    confidence: rawConfidence,
    confidenceLevel,
    explanation: `Signal scored at ${rawConfidence}% confidence using threshold-based analysis.`,
    suggestedAction:
      confidenceLevel === "high"
        ? "Prioritize outreach to this account immediately."
        : confidenceLevel === "medium"
          ? "Add to nurture sequence and monitor for additional signals."
          : "Log for tracking. No immediate action required.",
  };
}
