import { getAnthropicClient } from "./client";

export type SocialSentiment = "complaint" | "praise" | "intent" | "competitive" | "neutral";

export interface ClassifiedMention {
  sentiment: SocialSentiment;
  relevance: number; // 0-100
  summary: string;
}

/**
 * Use Claude to classify a social mention.
 */
export async function classifySocialSignal(
  content: string,
  companyContext?: string
): Promise<ClassifiedMention> {
  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 256,
      system: "Classify social media mentions for a GTM platform. Return JSON only, no markdown.",
      messages: [{
        role: "user",
        content: `Classify this social mention:
"${content}"

${companyContext ? `Company context: ${companyContext}` : ""}

Return JSON: { "sentiment": "complaint|praise|intent|competitive|neutral", "relevance": 0-100, "summary": "1 sentence" }`,
      }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "{}";
    return JSON.parse(text) as ClassifiedMention;
  } catch {
    return {
      sentiment: "neutral",
      relevance: 30,
      summary: content.slice(0, 100),
    };
  }
}
