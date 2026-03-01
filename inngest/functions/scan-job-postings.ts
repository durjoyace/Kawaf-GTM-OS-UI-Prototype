import { inngest } from "../client";
import { db } from "@/lib/db";
import { signals, workspaces } from "@/lib/db/schema";
import { scanJobPostings } from "@/lib/signals/job-scanner";
import { classifyExternalSignal } from "@/lib/ai/classify-external-signal";
import { scoreSignalFallback } from "@/lib/ai/score-signal";

export const scanJobPostingsJob = inngest.createFunction(
  { id: "scan-job-postings", name: "Scan Job Postings for Signals" },
  { cron: "0 6 * * *" }, // Daily at 6 AM
  async ({ step }) => {
    const allWorkspaces = await step.run("fetch-workspaces", async () => {
      return db
        .select({ id: workspaces.id, icpConfig: workspaces.icpConfig })
        .from(workspaces);
    });

    let signalsCreated = 0;

    for (const workspace of allWorkspaces) {
      const icpConfig = workspace.icpConfig as Record<string, unknown> | null;

      const jobs = await step.run(`scan-jobs-${workspace.id}`, async () => {
        return scanJobPostings(icpConfig);
      });

      for (const job of jobs) {
        await step.run(`process-job-${workspace.id}-${job.companyName}`, async () => {
          let result;
          try {
            result = await classifyExternalSignal(
              "job-posting",
              job.title,
              job.description,
              job.companyName,
              icpConfig
            );
          } catch {
            result = scoreSignalFallback(55);
          }

          if (result.confidence < 40) return;

          await db.insert(signals).values({
            workspaceId: workspace.id,
            signalType: "Job Posting",
            category: "external-news",
            description: `${job.companyName} is hiring: ${job.title}`,
            confidence: result.confidence,
            confidenceLevel: result.confidenceLevel,
            impact: result.confidence >= 70 ? "high" : "medium",
            explanation: result.explanation,
            suggestedAction: result.suggestedAction,
            source: "job-posting",
            tags: ["job-posting", "auto-detected"],
            rawData: {
              companyName: job.companyName,
              title: job.title,
              location: job.location,
              url: job.url,
            },
          });

          signalsCreated++;
        });
      }
    }

    return { signalsCreated };
  }
);
