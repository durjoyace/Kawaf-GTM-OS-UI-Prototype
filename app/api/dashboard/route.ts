import { getDashboardData } from "@/lib/data/api";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function GET() {
  try {
    const ctx = await getSessionContext();
    const data = await getDashboardData(ctx.workspaceId);
    return json(data);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[Dashboard API]", err);
    return error("Internal server error", 500);
  }
}
