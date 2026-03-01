import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { signals, signalAccounts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function GET(req: NextRequest) {
  try {
    const ctx = await getSessionContext();
    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const impact = searchParams.get("impact");

    const rows = await db
      .select({
        id: signals.id,
        signalType: signals.signalType,
        category: signals.category,
        description: signals.description,
        confidence: signals.confidence,
        confidenceLevel: signals.confidenceLevel,
        impact: signals.impact,
        explanation: signals.explanation,
        suggestedAction: signals.suggestedAction,
        tags: signals.tags,
        createdAt: signals.createdAt,
        accountName: signalAccounts.name,
        accountAvatar: signalAccounts.avatar,
      })
      .from(signals)
      .leftJoin(signalAccounts, eq(signals.accountId, signalAccounts.id))
      .where(eq(signals.workspaceId, ctx.workspaceId))
      .orderBy(desc(signals.createdAt));

    let result = rows;
    if (category) result = result.filter((r) => r.category === category);
    if (impact) result = result.filter((r) => r.impact === impact);

    return json(result);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[GET /api/signals]", err);
    return error("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await getSessionContext();
    const body = await req.json();
    const { signalType, category, description, confidence, confidenceLevel, impact, accountId, explanation, suggestedAction, tags } = body;

    if (!signalType || !category || !description) {
      return error("signalType, category, and description are required");
    }

    const [row] = await db
      .insert(signals)
      .values({
        workspaceId: ctx.workspaceId,
        accountId,
        signalType,
        category,
        description,
        confidence: confidence ?? 50,
        confidenceLevel: confidenceLevel ?? "medium",
        impact: impact ?? "medium",
        explanation,
        suggestedAction,
        tags: tags ?? [],
        processedAt: new Date(),
      })
      .returning();

    return json(row, 201);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[POST /api/signals]", err);
    return error("Internal server error", 500);
  }
}
