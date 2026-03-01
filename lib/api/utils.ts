import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { workspaces, workspaceMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export function json<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export interface SessionContext {
  userId: string;
  workspaceId: string;
}

// Demo fallback for when auth is bypassed
const DEMO_CONTEXT: SessionContext = {
  userId: "demo-user-001",
  workspaceId: "ws-001",
};

/**
 * Resolve the current user + workspace from the session.
 * Falls back to demo context when auth is bypassed.
 * Auto-creates a workspace on first sign-in.
 */
export async function getSessionContext(): Promise<SessionContext> {
  const session = await auth();

  if (!session?.user?.id) {
    return DEMO_CONTEXT;
  }

  const userId = session.user.id;

  // Find user's workspace membership
  const membership = await db
    .select({ workspaceId: workspaceMembers.workspaceId })
    .from(workspaceMembers)
    .where(eq(workspaceMembers.userId, userId))
    .limit(1);

  if (membership.length > 0) {
    return { userId, workspaceId: membership[0].workspaceId };
  }

  // Auto-create workspace for new users
  const slug = `ws-${userId.slice(0, 8)}`;
  const name = session.user.name || session.user.email?.split("@")[0] || "My Workspace";

  const [ws] = await db
    .insert(workspaces)
    .values({
      name: `${name}'s Workspace`,
      slug,
      ownerId: userId,
    })
    .onConflictDoNothing()
    .returning();

  if (ws) {
    await db.insert(workspaceMembers).values({
      workspaceId: ws.id,
      userId,
      role: "admin",
    });
    return { userId, workspaceId: ws.id };
  }

  // Slug conflict — find existing
  const existing = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.slug, slug))
    .limit(1);

  if (existing.length > 0) {
    await db
      .insert(workspaceMembers)
      .values({ workspaceId: existing[0].id, userId, role: "admin" })
      .onConflictDoNothing();
    return { userId, workspaceId: existing[0].id };
  }

  return DEMO_CONTEXT;
}
