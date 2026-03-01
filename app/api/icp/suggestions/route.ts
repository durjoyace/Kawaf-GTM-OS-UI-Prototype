import { getSessionContext, json, error } from "@/lib/api/utils";
import { learnFromDeals } from "@/lib/ai/icp-learner";

export async function GET() {
  const ctx = await getSessionContext();

  try {
    const suggestions = await learnFromDeals(ctx.workspaceId);
    return json(suggestions);
  } catch (err) {
    const message = err instanceof Error ? err.message : "ICP analysis failed";
    return error(message, 500);
  }
}
