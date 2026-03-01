import { inngest } from "../client";
import { enrichAccount } from "@/lib/enrichment/enrich-account";

export const enrichAccounts = inngest.createFunction(
  { id: "enrich-accounts", name: "Auto-Enrich New Accounts" },
  { event: "account/created" },
  async ({ event, step }) => {
    const { accountId } = event.data as { accountId: string };

    const result = await step.run("enrich-account", async () => {
      return enrichAccount(accountId);
    });

    return { accountId, enriched: true, source: result.source };
  }
);
