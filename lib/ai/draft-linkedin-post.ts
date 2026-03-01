import { getAnthropicClient } from "./client";
import { buildLinkedInPostPrompt, LINKEDIN_POST_SYSTEM_PROMPT } from "./prompts-linkedin";

interface LinkedInPostDraft {
  headline: string;
  content: string;
  hashtags: string[];
}

export async function draftLinkedInPost(
  signalType: string,
  signalDescription: string,
  accountName: string,
  accountIndustry: string | null,
  suggestedAction: string | null
): Promise<LinkedInPostDraft> {
  const client = getAnthropicClient();

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: LINKEDIN_POST_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildLinkedInPostPrompt(
          signalType,
          signalDescription,
          accountName,
          accountIndustry,
          suggestedAction
        ),
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  return JSON.parse(text) as LinkedInPostDraft;
}
