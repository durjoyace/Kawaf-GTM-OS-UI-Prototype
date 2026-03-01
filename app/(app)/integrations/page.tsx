import { getIntegrations, getIntegrationKpis } from "@/lib/data/api";
import { getSessionContext } from "@/lib/api/utils";
import { TopBar } from "@/components/top-bar";
import { IntegrationsClient } from "./client";

export const dynamic = "force-dynamic";

export default async function IntegrationsPage() {
  const ctx = await getSessionContext();
  const [integrations, kpis] = await Promise.all([
    getIntegrations(ctx.workspaceId),
    getIntegrationKpis(ctx.workspaceId),
  ]);

  return (
    <>
      <TopBar title="Integrations" subtitle="Connected tools and data sources" />
      <IntegrationsClient integrations={integrations} kpis={kpis} />
    </>
  );
}
