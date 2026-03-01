import { inngest } from "../client";
import { db } from "@/lib/db";
import { signals, workspaces } from "@/lib/db/schema";
import { scanFundingNews } from "@/lib/signals/news-scanner";
import { classifyExternalSignal } from "@/lib/ai/classify-external-signal";
import { scoreSignalFallback } from "@/lib/ai/score-signal";

export const scanFundingNewsJob = inngest.createFunction(
  { id: "scan-funding-news", name: "Scan Funding & Leadership News" },
  { cron: "0 7 * * *" }, // Daily at 7 AM
  async ({ step }) => {
    const allWorkspaces = await step.run("fetch-workspaces", async () => {
      return db
        .select({ id: workspaces.id, icpConfig: workspaces.icpConfig })
        .from(workspaces);
    });

    let signalsCreated = 0;

    for (const workspace of allWorkspaces) {
      const icpConfig = workspace.icpConfig as Record<string, unknown> | null;

      const news = await step.run(`scan-news-${workspace.id}`, async () => {
        return scanFundingNews(icpConfig);
      });

      for (const item of news) {
        await step.run(`process-news-${workspace.id}-${item.companyName}`, async () => {
          let result;
          try {
            result = await classifyExternalSignal(
              "funding-news",
              item.title,
              item.description,
              item.companyName,
              icpConfig
            );
          } catch {
            result = scoreSignalFallback(50);
          }

          if (result.confidence < 40) return;

          await db.insert(signals).values({
            workspaceId: workspace.id,
            signalType: "Funding / Leadership",
            category: "external-news",
            description: item.title,
            confidence: result.confidence,
            confidenceLevel: result.confidenceLevel,
            impact: result.confidence >= 70 ? "high" : "medium",
            explanation: result.explanation,
            suggestedAction: result.suggestedAction,
            source: "funding-news",
            tags: ["funding-news", "auto-detected"],
            rawData: {
              companyName: item.companyName,
              url: item.url,
              publishedAt: item.publishedAt,
            },
          });

          signalsCreated++;
        });
      }
    }

    return { signalsCreated };
  }
);
