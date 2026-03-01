import { getIntegrations, getIntegrationKpis } from "@/lib/data/api";
import { TopBar } from "@/components/top-bar";
import { IntegrationsClient } from "./client";

export const dynamic = "force-dynamic";

export default async function IntegrationsPage() {
  const [integrations, kpis] = await Promise.all([getIntegrations(), getIntegrationKpis()]);

  return (
    <>
      <TopBar title="Integrations" subtitle="Connected tools and data sources" />
      <IntegrationsClient integrations={integrations} kpis={kpis} />
    </>
  );
}
