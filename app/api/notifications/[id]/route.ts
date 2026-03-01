import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { json, error, getSessionContext, AuthError } from "@/lib/api/utils";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getSessionContext();
    const { id } = await params;
    const body = await req.json();

    // Whitelist allowed fields
    const allowed: Record<string, unknown> = {};
    if (typeof body.read === "boolean") allowed.read = body.read;

    const [row] = await db
      .update(notifications)
      .set(allowed)
      .where(and(eq(notifications.id, id), eq(notifications.userId, ctx.userId)))
      .returning();

    if (!row) return error("Notification not found", 404);
    return json(row);
  } catch (err) {
    if (err instanceof AuthError) return error("Unauthorized", 401);
    console.error("[Notifications API]", err);
    return error("Internal server error", 500);
  }
}
