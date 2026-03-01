import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { linkedinPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSessionContext, json, error } from "@/lib/api/utils";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await params; // signal id — not directly needed since we reference by postId
  const ctx = await getSessionContext();

  const body = await req.json();
  const { postId, headline, content, hashtags } = body as {
    postId: string;
    headline: string;
    content: string;
    hashtags: string[];
  };

  if (!postId) return error("postId is required", 400);

  const [post] = await db
    .select()
    .from(linkedinPosts)
    .where(eq(linkedinPosts.id, postId));

  if (!post || post.workspaceId !== ctx.workspaceId) {
    return error("Post not found", 404);
  }

  await db
    .update(linkedinPosts)
    .set({
      headline,
      content,
      hashtags,
      status: "posted",
      postedAt: new Date(),
    })
    .where(eq(linkedinPosts.id, postId));

  return json({ success: true, postId });
}
