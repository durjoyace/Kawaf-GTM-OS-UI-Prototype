import { inngest } from "../client";
import { db } from "@/lib/db";
import { trackingEvents, signals, workspaces } from "@/lib/db/schema";
import { and, eq, gte } from "drizzle-orm";
import { evaluateIntentRules } from "@/lib/tracking/intent-rules";

export const analyzeTracking = inngest.createFunction(
  { id: "analyze-tracking", name: "Analyze Website Tracking Events" },
  { cron: "*/15 * * * *" }, // Every 15 minutes
  async ({ step }) => {
    const allWorkspaces = await step.run("fetch-workspaces", async () => {
      return db.select({ id: workspaces.id }).from(workspaces);
    });

    let signalsCreated = 0;

    for (const workspace of allWorkspaces) {
      const workspaceId = workspace.id;

      // Get events from last 7 days, grouped by visitor
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const events = await step.run(`fetch-events-${workspaceId}`, async () => {
        return db
          .select()
          .from(trackingEvents)
          .where(and(
            eq(trackingEvents.workspaceId, workspaceId),
            gte(trackingEvents.createdAt, sevenDaysAgo)
          ))
          .orderBy(trackingEvents.createdAt);
      });

      // Group by visitor
      const byVisitor = new Map<string, typeof events>();
      for (const event of events) {
        const existing = byVisitor.get(event.visitorId) ?? [];
        existing.push(event);
        byVisitor.set(event.visitorId, existing);
      }

      // Evaluate intent rules per visitor
      for (const [visitorId, visitorEvents] of byVisitor) {
        const intentSignal = evaluateIntentRules(visitorEvents);
        if (!intentSignal) continue;

        // Check if we already created a signal for this visitor recently
        const existing = await step.run(`check-existing-${workspaceId}-${visitorId}`, async () => {
          const [found] = await db
            .select({ id: signals.id })
            .from(signals)
            .where(and(
              eq(signals.workspaceId, workspaceId),
              eq(signals.source, `tracking:${visitorId}`),
              gte(signals.createdAt, sevenDaysAgo)
            ))
            .limit(1);
          return found ?? null;
        });

        if (existing) continue;

        await step.run(`create-signal-${workspaceId}-${visitorId}`, async () => {
          await db.insert(signals).values({
            workspaceId,
            signalType: intentSignal.signalType,
            category: "product-analytics",
            description: intentSignal.reason,
            confidence: intentSignal.confidence,
            confidenceLevel: intentSignal.confidence >= 80 ? "high" : intentSignal.confidence >= 60 ? "medium" : "low",
            impact: intentSignal.confidence >= 70 ? "high" : "medium",
            source: `tracking:${visitorId}`,
            tags: ["website-tracking", "auto-detected"],
            rawData: {
              visitorId,
              eventCount: visitorEvents.length,
              pages: visitorEvents.map((e: { pageUrl: string }) => e.pageUrl),
            },
          });
        });

        signalsCreated++;
      }
    }

    return { signalsCreated };
  }
);
