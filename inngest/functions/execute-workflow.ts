import { inngest } from "../client";
import { db } from "@/lib/db";
import { workflows } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow", name: "Execute Published Workflow" },
  { event: "workflow/trigger.matched" },
  async ({ event, step }) => {
    const { workflowId, signalId } = event.data as { workflowId: string; signalId: string };

    const workflow = await step.run("fetch-workflow", async () => {
      const [row] = await db
        .select()
        .from(workflows)
        .where(eq(workflows.id, workflowId));
      return row;
    });

    if (!workflow || workflow.status !== "published") {
      return { error: "Workflow not found or not published" };
    }

    const nodes = (workflow.nodes as Array<{ id: string; data?: { category?: string; label?: string } }>) ?? [];
    const edges = (workflow.edges as Array<{ source: string; target: string }>) ?? [];

    // Walk the graph: find trigger node, then follow edges
    const triggerNode = nodes.find((n) => n.data?.category === "trigger");
    if (!triggerNode) return { error: "No trigger node found" };

    let currentNodeId = triggerNode.id;
    const executedNodes: string[] = [];

    while (currentNodeId) {
      const node = nodes.find((n) => n.id === currentNodeId);
      if (!node) break;

      await step.run(`execute-node-${node.id}`, async () => {
        // Mock execution based on node category
        const category = node.data?.category;
        if (category === "action") {
          // In real implementation: call adapter (send email, LinkedIn DM, etc.)
          console.log(`Executing action: ${node.data?.label}`);
        } else if (category === "utility") {
          // Wait/delay nodes would use step.sleep() in production
          console.log(`Utility node: ${node.data?.label}`);
        }
        return { nodeId: node.id, executed: true };
      });

      executedNodes.push(currentNodeId);

      // Find next node via edges
      const edge = edges.find((e) => e.source === currentNodeId);
      currentNodeId = edge?.target ?? "";
    }

    return { workflowId, signalId, executedNodes };
  }
);
