import { NextRequest } from "next/server";
import { getSessionContext, json, error, AuthError } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { signalSources } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const ctx = await getSessionContext();

    const sources = await db
      .select()
      .from(signalSources)
      .where(eq(signalSources.workspaceId, ctx.workspaceId))
      .orderBy(desc(signalSources.createdAt));

    return json(sources);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[GET /api/signal-sources]", err);
    return error("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await getSessionContext();
    const body = await req.json();

    const { name, type, config, conditionRules } = body as {
      name: string;
      type: string;
      config?: Record<string, unknown>;
      conditionRules?: Record<string, unknown>[];
    };

    if (!name || !type) {
      return error("Missing required fields: name, type", 400);
    }

    const [source] = await db
      .insert(signalSources)
      .values({
        workspaceId: ctx.workspaceId,
        name,
        type,
        config: config ?? {},
        conditionRules: conditionRules ?? [],
        status: "active",
      })
      .returning();

    return json(source, 201);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[POST /api/signal-sources]", err);
    return error("Internal server error", 500);
  }
}
