import { inngest } from "../client";
import { db } from "@/lib/db";
import { workspaces, signals } from "@/lib/db/schema";
import { scanSocialMentions } from "@/lib/signals/social-scanner";
import { classifySocialSignal } from "@/lib/ai/classify-social-signal";

export const scanSocial = inngest.createFunction(
  { id: "scan-social", name: "Social Media Mention Scanner" },
  { cron: "0 * * * *" }, // Every hour
  async ({ step }) => {
    const allWorkspaces = await step.run("fetch-workspaces", async () => {
      return db
        .select({ id: workspaces.id, companyInfo: workspaces.companyInfo })
        .from(workspaces);
    });

    let totalCreated = 0;

    for (const workspace of allWorkspaces) {
      const info = workspace.companyInfo as Record<string, string> | null;
      const companyName = info?.name ?? "Kawaf";
      const keywords = [companyName, ...(info?.competitors?.split(",") ?? [])].filter(Boolean);

      if (keywords.length === 0) continue;

      const mentions = await step.run(`scan-${workspace.id}`, async () => {
        return scanSocialMentions(keywords);
      });

      for (const mention of mentions) {
        const classified = await step.run(`classify-${workspace.id}-${mention.url.slice(-8)}`, async () => {
          return classifySocialSignal(mention.content, companyName);
        });

        if (classified.relevance >= 40) {
          await step.run(`create-signal-${workspace.id}-${mention.url.slice(-8)}`, async () => {
            await db.insert(signals).values({
              workspaceId: workspace.id,
              signalType: `Social: ${classified.sentiment}`,
              category: "external-news",
              description: `${mention.platform} mention by ${mention.author}: ${classified.summary}`,
              confidence: classified.relevance,
              confidenceLevel:
                classified.relevance >= 80 ? "high" :
                classified.relevance >= 60 ? "medium" : "low",
              impact:
                classified.sentiment === "intent" ? "high" :
                classified.sentiment === "competitive" ? "medium" : "low",
              tags: ["social", mention.platform, classified.sentiment],
              source: mention.url,
              rawData: { mention, classified },
            });
            totalCreated++;
          });
        }
      }
    }

    return { totalCreated };
  }
);
