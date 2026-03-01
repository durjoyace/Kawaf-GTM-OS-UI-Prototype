import { getSessionContext } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { signalSources } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { TopBar } from "@/components/top-bar";
import { SignalBuilderClient } from "./client";

export const dynamic = "force-dynamic";

export default async function SignalBuilderPage() {
  const ctx = await getSessionContext();

  const sources = await db
    .select()
    .from(signalSources)
    .where(eq(signalSources.workspaceId, ctx.workspaceId))
    .orderBy(desc(signalSources.createdAt));

  const serialized = sources.map((s) => ({
    id: s.id,
    name: s.name,
    type: s.type,
    status: s.status,
    config: (s.config ?? {}) as Record<string, unknown>,
    conditionRules: (s.conditionRules ?? []) as Array<{ jsonPath: string; operator: string; value: string }>,
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <>
      <TopBar title="Signal Builder" subtitle="Create custom signal sources" />
      <div className="p-6">
        <SignalBuilderClient sources={serialized} />
      </div>
    </>
  );
}
