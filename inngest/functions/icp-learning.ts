import { inngest } from "../client";
import { db } from "@/lib/db";
import { workspaces } from "@/lib/db/schema";
import { learnFromDeals } from "@/lib/ai/icp-learner";

export const icpLearning = inngest.createFunction(
  { id: "icp-learning", name: "Weekly ICP Learning" },
  { cron: "0 8 * * 1" }, // Every Monday at 8 AM
  async ({ step }) => {
    const allWorkspaces = await step.run("fetch-workspaces", async () => {
      return db.select({ id: workspaces.id }).from(workspaces);
    });

    const results: Record<string, number> = {};

    for (const workspace of allWorkspaces) {
      const suggestions = await step.run(`learn-${workspace.id}`, async () => {
        return learnFromDeals(workspace.id);
      });

      results[workspace.id] = suggestions.length;
    }

    return { workspacesAnalyzed: allWorkspaces.length, results };
  }
);
