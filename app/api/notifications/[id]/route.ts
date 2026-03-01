import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json, error } from "@/lib/api/utils";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const [row] = await db
    .update(notifications)
    .set(body)
    .where(eq(notifications.id, id))
    .returning();

  if (!row) return error("Notification not found", 404);
  return json(row);
}
