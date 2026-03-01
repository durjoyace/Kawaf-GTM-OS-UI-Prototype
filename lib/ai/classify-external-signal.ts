import { getAnthropicClient } from "./client";
import type { AiScoreResult } from "./types";

const SYSTEM_PROMPT = `You are an expert B2B sales intelligence analyst. Classify and score external signals (job postings, funding news, leadership changes) for their buying intent relevance.

Always respond with valid JSON only.`;

export async function classifyExternalSignal(
  signalType: "job-posting" | "funding-news",
  title: string,
  description: string,
  companyName: string,
  icpConfig: Record<string, unknown> | null
): Promise<AiScoreResult> {
  const client = getAnthropicClient();

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Classify this ${signalType === "job-posting" ? "job posting" : "funding/news"} signal:

Company: ${companyName}
Title: ${title}
Details: ${description}
${icpConfig ? `ICP Config: ${JSON.stringify(icpConfig)}` : ""}

Respond with ONLY a JSON object (no markdown fences):
- "confidence": number 0-100
- "confidenceLevel": "high" if >= 80, "medium" if >= 60, else "low"
- "explanation": 1-2 sentence explanation of buying intent
- "suggestedAction": specific next step for the sales team`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  const result: AiScoreResult = JSON.parse(text);
  if (result.confidence >= 80) result.confidenceLevel = "high";
  else if (result.confidence >= 60) result.confidenceLevel = "medium";
  else result.confidenceLevel = "low";

  return result;
}
