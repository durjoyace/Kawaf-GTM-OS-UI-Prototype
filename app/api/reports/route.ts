import { NextRequest } from "next/server";
import { getSessionContext, json, error, AuthError } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { reports } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const ctx = await getSessionContext();

    const rows = await db
      .select()
      .from(reports)
      .where(eq(reports.workspaceId, ctx.workspaceId))
      .orderBy(desc(reports.createdAt));

    return json(rows);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[GET /api/reports]", err);
    return error("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await getSessionContext();
    const body = await req.json();

    const { name, widgets, dateRange } = body as {
      name: string;
      widgets?: Record<string, unknown>[];
      dateRange?: Record<string, unknown>;
    };

    if (!name) return error("Name is required", 400);

    const shareToken = crypto.randomUUID().replace(/-/g, "");

    const [report] = await db
      .insert(reports)
      .values({
        workspaceId: ctx.workspaceId,
        name,
        widgets: widgets ?? [],
        dateRange: dateRange ?? { period: "30d" },
        shareToken,
        isPublic: false,
      })
      .returning();

    return json(report, 201);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[POST /api/reports]", err);
    return error("Internal server error", 500);
  }
}
