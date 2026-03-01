import { inngest } from "../client";
import { db } from "@/lib/db";
import { playbooks, signals, signalAccounts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { evaluatePlaybookRules } from "@/lib/playbooks/rule-engine";
import { executePlaybook } from "@/lib/playbooks/executor";

export const matchPlaybooks = inngest.createFunction(
  { id: "match-playbooks", name: "Match Signals to Playbooks" },
  { event: "signal/scored" },
  async ({ event, step }) => {
    const { signalId, workspaceId } = event.data as {
      signalId: string;
      workspaceId: string;
    };

    // Fetch the scored signal
    const signal = await step.run("fetch-signal", async () => {
      const [row] = await db
        .select()
        .from(signals)
        .where(eq(signals.id, signalId));
      return row;
    });

    if (!signal) return { skipped: true, reason: "Signal not found" };

    // Fetch active playbooks for this workspace
    const activePlaybooks = await step.run("fetch-playbooks", async () => {
      return db
        .select()
        .from(playbooks)
        .where(eq(playbooks.workspaceId, workspaceId));
    });

    const matched: string[] = [];

    for (const playbook of activePlaybooks) {
      const signalData = {
        signalType: signal.signalType,
        category: signal.category,
        confidence: signal.confidence,
        confidenceLevel: signal.confidenceLevel,
        tags: (signal.tags as string[]) ?? [],
      };

      if (evaluatePlaybookRules(signalData, playbook)) {
        const result = await step.run(`execute-${playbook.id}`, async () => {
          return executePlaybook(
            { id: signal.id, workspaceId: signal.workspaceId, accountId: signal.accountId },
            {
              id: playbook.id,
              workspaceId: playbook.workspaceId,
              name: playbook.name,
              sequenceConfig: playbook.sequenceConfig,
            }
          );
        });

        if (result) matched.push(playbook.id);
      }
    }

    return { signalId, matchedPlaybooks: matched };
  }
);
