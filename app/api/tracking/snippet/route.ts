import { getSessionContext, json, error } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { workspaces } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const ctx = await getSessionContext();

  const [workspace] = await db
    .select({ apiKey: workspaces.apiKey })
    .from(workspaces)
    .where(eq(workspaces.id, ctx.workspaceId));

  if (!workspace) {
    return error("Workspace not found", 404);
  }

  let apiKey = workspace.apiKey;

  // Generate API key if not exists
  if (!apiKey) {
    apiKey = `kwf_${crypto.randomUUID().replace(/-/g, "")}`;
    await db
      .update(workspaces)
      .set({ apiKey })
      .where(eq(workspaces.id, ctx.workspaceId));
  }

  const snippet = `<script src="${process.env.NEXT_PUBLIC_APP_URL || "https://your-app.vercel.app"}/tracker.js" data-key="${apiKey}" defer></script>`;

  return json({ apiKey, snippet });
}
