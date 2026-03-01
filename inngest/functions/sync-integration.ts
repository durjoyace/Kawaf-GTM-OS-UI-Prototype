import { inngest } from "../client";
import { db } from "@/lib/db";
import { integrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAdapter } from "@/lib/integrations/registry";

export const syncIntegration = inngest.createFunction(
  { id: "sync-integration", name: "Sync Integration Data" },
  { event: "integration/sync.requested" },
  async ({ event, step }) => {
    const { integrationId } = event.data as { integrationId: string };

    const integration = await step.run("fetch-integration", async () => {
      const [row] = await db
        .select()
        .from(integrations)
        .where(eq(integrations.id, integrationId));
      return row;
    });

    if (!integration) return { error: "Integration not found" };

    const adapter = getAdapter(integration.provider);
    if (!adapter) return { error: `No adapter for ${integration.provider}` };

    const result = await step.run("sync-data", async () => {
      return adapter.sync();
    });

    await step.run("update-integration", async () => {
      await db
        .update(integrations)
        .set({
          lastSyncAt: new Date(),
          recordCount: (integration.recordCount ?? 0) + result.recordsSynced,
        })
        .where(eq(integrations.id, integrationId));
    });

    return { success: result.success, recordsSynced: result.recordsSynced };
  }
);
