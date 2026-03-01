import { inngest } from "../client";
import { db } from "@/lib/db";
import { signals, signalAccounts, notifications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const WORKSPACE_ID = "ws-001";
const DEMO_USER_ID = "demo-user-001";

export const processSignals = inngest.createFunction(
  { id: "process-signals", name: "Process Incoming Signals" },
  { cron: "*/5 * * * *" }, // Every 5 minutes
  async ({ step }) => {
    // Find unprocessed signals
    const unprocessed = await step.run("fetch-unprocessed", async () => {
      return db
        .select()
        .from(signals)
        .where(eq(signals.workspaceId, WORKSPACE_ID))
        .limit(50);
    });

    // Score and enrich each signal
    for (const signal of unprocessed) {
      if (signal.processedAt) continue;

      await step.run(`process-${signal.id}`, async () => {
        // Apply confidence scoring logic
        let confidence = signal.confidence;
        let confidenceLevel: "high" | "medium" | "low" = "medium";

        if (confidence >= 80) confidenceLevel = "high";
        else if (confidence >= 60) confidenceLevel = "medium";
        else confidenceLevel = "low";

        await db
          .update(signals)
          .set({
            confidence,
            confidenceLevel,
            processedAt: new Date(),
          })
          .where(eq(signals.id, signal.id));

        // Create notification for high-confidence signals
        if (confidenceLevel === "high") {
          const account = signal.accountId
            ? await db
                .select()
                .from(signalAccounts)
                .where(eq(signalAccounts.id, signal.accountId))
                .then((r) => r[0])
            : null;

          await db.insert(notifications).values({
            workspaceId: WORKSPACE_ID,
            userId: DEMO_USER_ID,
            title: "High-confidence signal detected",
            description: `${account?.name ?? "Unknown"}: ${signal.signalType} — ${confidence}% confidence`,
            type: "signal",
          });
        }
      });
    }

    return { processed: unprocessed.length };
  }
);
