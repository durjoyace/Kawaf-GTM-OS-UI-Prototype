import { inngest } from "../client";
import { db } from "@/lib/db";
import { signals, signalAccounts, notifications, workspaces, workspaceMembers } from "@/lib/db/schema";

import { eq } from "drizzle-orm";
import { scoreSignal, scoreSignalFallback } from "@/lib/ai/score-signal";
import type { SignalContext, AccountContext } from "@/lib/ai/types";

const AI_CONFIDENCE_THRESHOLD = 40; // Only call AI for signals >= 40% raw confidence

export const processSignals = inngest.createFunction(
  { id: "process-signals", name: "Process Incoming Signals" },
  { cron: "*/5 * * * *" },
  async ({ step }) => {
    const allWorkspaces = await step.run("fetch-workspaces", async () => {
      return db.select({ id: workspaces.id }).from(workspaces);
    });

    let totalProcessed = 0;

    for (const workspace of allWorkspaces) {
      const workspaceId = workspace.id;

      const ownerMembership = await step.run(`fetch-owner-${workspaceId}`, async () => {
        const [membership] = await db
          .select({ userId: workspaceMembers.userId })
          .from(workspaceMembers)
          .where(eq(workspaceMembers.workspaceId, workspaceId))
          .limit(1);
        return membership ?? null;
      });

      const unprocessed = await step.run(`fetch-unprocessed-${workspaceId}`, async () => {
        return db
          .select()
          .from(signals)
          .where(eq(signals.workspaceId, workspaceId))
          .limit(50);
      });

      for (const signal of unprocessed) {
        if (signal.processedAt) continue;

        const scored = await step.run(`process-${signal.id}`, async () => {
          // Fetch account context if available
          let accountCtx: AccountContext | null = null;
          if (signal.accountId) {
            const [acct] = await db
              .select()
              .from(signalAccounts)
              .where(eq(signalAccounts.id, signal.accountId));
            if (acct) {
              accountCtx = {
                name: acct.name,
                industry: acct.industry,
                score: acct.score,
                metadata: acct.metadata,
              };
            }
          }

          const signalCtx: SignalContext = {
            signalType: signal.signalType,
            category: signal.category,
            description: signal.description,
            rawConfidence: signal.confidence,
            tags: (signal.tags as string[]) ?? [],
            source: signal.source,
            rawData: signal.rawData,
          };

          // Use AI for signals above threshold, fallback for noise
          let result;
          if (signal.confidence >= AI_CONFIDENCE_THRESHOLD) {
            try {
              result = await scoreSignal(signalCtx, accountCtx);
            } catch {
              // AI unavailable — use threshold fallback
              result = scoreSignalFallback(signal.confidence);
            }
          } else {
            result = scoreSignalFallback(signal.confidence);
          }

          await db
            .update(signals)
            .set({
              confidence: result.confidence,
              confidenceLevel: result.confidenceLevel,
              explanation: result.explanation,
              suggestedAction: result.suggestedAction,
              processedAt: new Date(),
            })
            .where(eq(signals.id, signal.id));

          return result;
        });

        // Emit signal/scored event for playbook matching
        await step.run(`emit-scored-${signal.id}`, async () => {
          await inngest.send({
            name: "signal/scored",
            data: {
              signalId: signal.id,
              workspaceId: workspaceId,
              confidence: scored.confidence,
              confidenceLevel: scored.confidenceLevel,
            },
          });
        });

        // Create notification for high-confidence signals
        if (scored.confidenceLevel === "high" && ownerMembership) {
          await step.run(`notify-${signal.id}`, async () => {
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
              description: `${account?.name ?? "Unknown"}: ${signal.signalType} — ${scored.confidence}% confidence`,
              type: "signal",
            });
          });
        }

        totalProcessed++;
      }
    }

    return { processed: totalProcessed };
  }
);
