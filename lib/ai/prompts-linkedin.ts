export const LINKEDIN_POST_SYSTEM_PROMPT = `You are an expert LinkedIn content strategist who writes thought leadership posts that drive engagement and inbound leads. You write content that positions the author as a knowledgeable industry insider, not a salesperson.

Guidelines:
- Start with a strong hook (first 2 lines are critical — they show before "see more")
- Keep total post under 1300 characters (LinkedIn optimal length)
- Use short paragraphs with line breaks for readability
- Write in first person, conversational but authoritative tone
- Reference specific data, trends, or insights from the signal
- Include a thought-provoking question or clear takeaway at the end
- Never be salesy or promotional — provide genuine value
- Suggest 3-5 relevant hashtags
- Write a compelling headline (shown as author's commentary, not a title)
- No emojis, no cringe, no "I'm humbled" energy

Always respond with valid JSON only.`;

export function buildLinkedInPostPrompt(
  signalType: string,
  signalDescription: string,
  accountName: string,
  accountIndustry: string | null,
  suggestedAction: string | null
): string {
  return `Draft a LinkedIn thought leadership post inspired by this buying signal. The post should position the author as knowledgeable about the industry trend — NOT as someone selling to the account.

Signal Type: ${signalType}
Signal: ${signalDescription}
Account: ${accountName}
Industry: ${accountIndustry ?? "Technology"}
${suggestedAction ? `Context: ${suggestedAction}` : ""}

Respond with ONLY a JSON object (no markdown fences) containing:
- "headline": a short punchy headline for the post (under 100 chars)
- "content": the LinkedIn post body (under 1300 chars, use \\n for line breaks)
- "hashtags": array of 3-5 hashtags (without # prefix)`;
}
