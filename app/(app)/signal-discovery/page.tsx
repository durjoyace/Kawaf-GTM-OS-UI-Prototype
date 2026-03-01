import { getSignals, getSignalCategories } from "@/lib/data/api";
import { getSessionContext } from "@/lib/api/utils";
import { TopBar } from "@/components/top-bar";
import { SignalDiscoveryClient } from "./client";

export const dynamic = "force-dynamic";

export default async function SignalDiscoveryPage() {
  const ctx = await getSessionContext();
  const [signals, categories] = await Promise.all([
    getSignals(undefined, ctx.workspaceId),
    getSignalCategories(ctx.workspaceId),
  ]);

  return (
    <>
      <TopBar title="Signal Discovery" subtitle="AI-detected buying signals across your accounts" />
      <SignalDiscoveryClient initialSignals={signals} categories={categories} />
    </>
  );
}
