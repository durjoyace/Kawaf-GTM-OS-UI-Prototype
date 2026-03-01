import { getAnthropicClient } from "./client";
import { buildOutreachPrompt, OUTREACH_SYSTEM_PROMPT } from "./prompts-outreach";

interface OutreachDraft {
  subject: string;
  body: string;
}

export async function draftOutreach(
  signalType: string,
  signalDescription: string,
  accountName: string,
  accountIndustry: string | null,
  suggestedAction: string | null
): Promise<OutreachDraft> {
  const client = getAnthropicClient();

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    system: OUTREACH_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildOutreachPrompt(
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

  return JSON.parse(text) as OutreachDraft;
}
