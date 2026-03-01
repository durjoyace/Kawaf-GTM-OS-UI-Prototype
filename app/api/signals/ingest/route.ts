import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { signals, signalAccounts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error } from "@/lib/api/utils";

/**
 * Public webhook for ingesting signals from external sources.
 * Authenticated via Bearer token (workspace API key).
 *
 * POST /api/signals/ingest
 * Headers: Authorization: Bearer <workspace-id>
 * Body: { signals: [{ signalType, category, description, confidence, impact, accountName?, ... }] }
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return error("Missing or invalid Authorization header", 401);
  }

  const workspaceId = authHeader.slice(7).trim();
  if (!workspaceId) {
    return error("Invalid workspace token", 401);
  }

  let body: {
    signals: Array<{
      signalType: string;
      category: string;
      description: string;
      confidence: number;
      impact: string;
      accountName?: string;
      accountIndustry?: string;
      explanation?: string;
      suggestedAction?: string;
      tags?: string[];
      source?: string;
      rawData?: Record<string, unknown>;
    }>;
  };

  try {
    body = await req.json();
  } catch {
    return error("Invalid JSON body", 400);
  }

  if (!Array.isArray(body.signals) || body.signals.length === 0) {
    return error("Request must include a non-empty 'signals' array", 400);
  }

  if (body.signals.length > 100) {
    return error("Maximum 100 signals per request", 400);
  }

  const results: Array<{ id: string; accountId: string | null }> = [];

  for (const s of body.signals) {
    if (!s.signalType || !s.category || !s.description || s.confidence == null || !s.impact) {
      continue; // skip malformed signals
    }

    let accountId: string | null = null;

    // Resolve or create account by name
    if (s.accountName) {
      const [existing] = await db
        .select()
        .from(signalAccounts)
        .where(
          and(
            eq(signalAccounts.workspaceId, workspaceId),
            eq(signalAccounts.name, s.accountName)
          )
        )
        .limit(1);

      if (existing) {
        accountId = existing.id;
      } else {
        const [created] = await db
          .insert(signalAccounts)
          .values({
            workspaceId,
            name: s.accountName,
            industry: s.accountIndustry ?? null,
            score: Math.round(s.confidence * 0.8),
          })
          .returning();
        accountId = created.id;
      }
    }

    const confidence = Math.max(0, Math.min(100, Math.round(s.confidence)));
    const confidenceLevel =
      confidence >= 80 ? "high" : confidence >= 60 ? "medium" : "low";

    const [created] = await db
      .insert(signals)
      .values({
        workspaceId,
        accountId,
        signalType: s.signalType,
        category: s.category,
        description: s.description,
        confidence,
        confidenceLevel,
        impact: s.impact,
        explanation: s.explanation ?? null,
        suggestedAction: s.suggestedAction ?? null,
        tags: s.tags ?? [],
        source: s.source ?? "webhook",
        rawData: s.rawData ?? null,
      })
      .returning();

    results.push({ id: created.id, accountId });
  }

  return json({ ingested: results.length, signals: results }, 201);
}
