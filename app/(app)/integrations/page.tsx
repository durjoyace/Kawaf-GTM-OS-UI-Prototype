import { getIntegrations, getIntegrationKpis } from "@/lib/data/api";
import { TopBar } from "@/components/top-bar";
import { KpiCard } from "@/components/kpi-card";
import { IntegrationCard } from "@/components/integration-card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

export default async function IntegrationsPage() {
  const [integrations, kpis] = await Promise.all([getIntegrations(), getIntegrationKpis()]);

  const tabs = ["Integrations", "Open API", "Security"];
  const categories = ["All", "CRM", "Sales Engagement", "Social", "Messaging", "Enrichment", "Intent", "Analytics"];

  return (
    <>
      <TopBar title="Integrations" subtitle="Connected tools and data sources" />
      <div className="p-6 space-y-6">
        {/* KPIs - special handling for Data Region card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="relative">
              <KpiCard metric={kpi} />
              {kpi.label === "Data Region" && (
                <Badge className="absolute top-3 right-3 bg-green-100 text-green-700 text-[10px] gap-0.5">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  SOC2
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                i === 0
                  ? "bg-slate-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors ${
                i === 0 ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Integration cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      </div>
    </>
  );
}
