import { inngest } from "../client";
import { db } from "@/lib/db";
import { signals, signalAccounts, notifications, workspaces, workspaceMembers } from "@/lib/db/schema";
import { eq, isNull } from "drizzle-orm";

export const processSignals = inngest.createFunction(
  { id: "process-signals", name: "Process Incoming Signals" },
  { cron: "*/5 * * * *" }, // Every 5 minutes
  async ({ step }) => {
    // Fetch all workspaces to process signals across all tenants
    const allWorkspaces = await step.run("fetch-workspaces", async () => {
      return db.select({ id: workspaces.id }).from(workspaces);
    });

    let totalProcessed = 0;

    for (const workspace of allWorkspaces) {
      const workspaceId = workspace.id;

      // Find the workspace owner to use as notification recipient
      const ownerMembership = await step.run(`fetch-owner-${workspaceId}`, async () => {
        const [membership] = await db
          .select({ userId: workspaceMembers.userId })
          .from(workspaceMembers)
          .where(eq(workspaceMembers.workspaceId, workspaceId))
          .limit(1);
        return membership ?? null;
      });

      // Find unprocessed signals for this workspace
      const unprocessed = await step.run(`fetch-unprocessed-${workspaceId}`, async () => {
        return db
          .select()
          .from(signals)
          .where(eq(signals.workspaceId, workspaceId))
          .limit(50);
      });

      // Score and enrich each signal
      for (const signal of unprocessed) {
        if (signal.processedAt) continue;

        await step.run(`process-${signal.id}`, async () => {
          // Apply confidence scoring logic
          const confidence = signal.confidence;
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
          if (confidenceLevel === "high" && ownerMembership) {
            const account = signal.accountId
              ? await db
                  .select()
                  .from(signalAccounts)
                  .where(eq(signalAccounts.id, signal.accountId))
                  .then((r) => r[0])
              : null;

            await db.insert(notifications).values({
              workspaceId,
              userId: ownerMembership.userId,
              title: "High-confidence signal detected",
              description: `${account?.name ?? "Unknown"}: ${signal.signalType} — ${confidence}% confidence`,
              type: "signal",
            });
          }
        });

        totalProcessed++;
      }
    }

    return { processed: totalProcessed };
  }
);
