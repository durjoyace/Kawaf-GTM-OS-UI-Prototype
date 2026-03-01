import { getAccounts, getSignals } from "@/lib/data/api";
import { getSessionContext } from "@/lib/api/utils";
import { TopBar } from "@/components/top-bar";
import { AIPersonalizationClient } from "./client";

export const dynamic = "force-dynamic";

export default async function AIPersonalizationPage() {
  const ctx = await getSessionContext();
  const [accounts, signals] = await Promise.all([
    getAccounts(ctx.workspaceId),
    getSignals(undefined, ctx.workspaceId),
  ]);

  return (
    <>
      <TopBar title="AI Personalization" subtitle="Self-tuning outreach engine" />
      <AIPersonalizationClient accounts={accounts} signals={signals} />
    </>
  );
}
