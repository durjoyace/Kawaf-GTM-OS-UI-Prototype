import { db } from "@/lib/db";
import { usageRecords, subscriptions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { isWithinLimit, type TierLimits } from "./limits";

function getCurrentPeriod(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function getWorkspacePlan(workspaceId: string): Promise<string> {
  const [sub] = await db
    .select({ plan: subscriptions.plan })
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.workspaceId, workspaceId),
        eq(subscriptions.status, "active")
      )
    )
    .limit(1);

  return sub?.plan ?? "free";
}

export async function getUsage(
  workspaceId: string,
  resource: keyof TierLimits
): Promise<number> {
  const period = getCurrentPeriod();

  const [record] = await db
    .select({ count: usageRecords.count })
    .from(usageRecords)
    .where(
      and(
        eq(usageRecords.workspaceId, workspaceId),
        eq(usageRecords.resource, resource),
        eq(usageRecords.period, period)
      )
    );

  return record?.count ?? 0;
}

export async function incrementUsage(
  workspaceId: string,
  resource: keyof TierLimits
): Promise<void> {
  const period = getCurrentPeriod();

  const [existing] = await db
    .select()
    .from(usageRecords)
    .where(
      and(
        eq(usageRecords.workspaceId, workspaceId),
        eq(usageRecords.resource, resource),
        eq(usageRecords.period, period)
      )
    );

  if (existing) {
    await db
      .update(usageRecords)
      .set({ count: existing.count + 1 })
      .where(eq(usageRecords.id, existing.id));
  } else {
    await db.insert(usageRecords).values({
      workspaceId,
      resource,
      count: 1,
      period,
    });
  }
}

export async function checkUsage(
  workspaceId: string,
  resource: keyof TierLimits
): Promise<boolean> {
  const plan = await getWorkspacePlan(workspaceId);
  const currentCount = await getUsage(workspaceId, resource);
  return isWithinLimit(plan, resource, currentCount);
}
