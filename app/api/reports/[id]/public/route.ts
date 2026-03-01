import { NextRequest } from "next/server";
import { json, error } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { reports } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * Public report endpoint — no auth required, validated by share token.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = req.nextUrl.searchParams.get("token");

  if (!token) return error("Missing share token", 400);

  const [report] = await db
    .select()
    .from(reports)
    .where(
      and(
        eq(reports.id, id),
        eq(reports.shareToken, token),
        eq(reports.isPublic, true)
      )
    );

  if (!report) return error("Report not found or not public", 404);

  return json({
    name: report.name,
    widgets: report.widgets,
    dateRange: report.dateRange,
    createdAt: report.createdAt,
  });
}
