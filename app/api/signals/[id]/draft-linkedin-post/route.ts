import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { signals, signalAccounts, linkedinPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { draftLinkedInPost } from "@/lib/ai/draft-linkedin-post";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ctx = await getSessionContext();

  const [signal] = await db
    .select()
    .from(signals)
    .where(eq(signals.id, id));

  if (!signal || signal.workspaceId !== ctx.workspaceId) {
    return error("Signal not found", 404);
  }

  let accountName = "Unknown";
  let accountIndustry: string | null = null;

  if (signal.accountId) {
    const [account] = await db
      .select()
      .from(signalAccounts)
      .where(eq(signalAccounts.id, signal.accountId));
    if (account) {
      accountName = account.name;
      accountIndustry = account.industry;
    }
  }

  const draft = await draftLinkedInPost(
    signal.signalType,
    signal.description,
    accountName,
    accountIndustry,
    signal.suggestedAction
  );

  const [post] = await db
    .insert(linkedinPosts)
    .values({
      workspaceId: ctx.workspaceId,
      signalId: signal.id,
      accountId: signal.accountId,
      headline: draft.headline,
      content: draft.content,
      hashtags: draft.hashtags,
      status: "draft",
    })
    .returning();

  return json({
    id: post.id,
    headline: draft.headline,
    content: draft.content,
    hashtags: draft.hashtags,
  });
}
