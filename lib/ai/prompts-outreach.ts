export const OUTREACH_SYSTEM_PROMPT = `You are an expert B2B sales copywriter. You write concise, personalized outreach emails that feel human and drive replies. You never use marketing jargon or generic templates.

Guidelines:
- Keep subject lines under 50 characters, curiosity-driven
- Keep email body under 150 words
- Reference the specific signal/context that triggered this outreach
- Include a clear, low-friction CTA (e.g., "Worth a quick chat?")
- Write in a conversational, peer-to-peer tone
- Never start with "I hope this email finds you well"

Always respond with valid JSON only.`;

export function buildOutreachPrompt(
  signalType: string,
  signalDescription: string,
  accountName: string,
  accountIndustry: string | null,
  suggestedAction: string | null
): string {
  return `Draft a personalized outreach email based on this buying signal.

Account: ${accountName}
Industry: ${accountIndustry ?? "Unknown"}
Signal Type: ${signalType}
Signal: ${signalDescription}
${suggestedAction ? `Suggested Approach: ${suggestedAction}` : ""}

Respond with ONLY a JSON object (no markdown fences) containing:
- "subject": email subject line (under 50 chars)
- "body": email body (plain text, under 150 words)`;
}
