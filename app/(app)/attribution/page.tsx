import { getAttributionKpis, getAttributionChartData, getFunnelData } from "@/lib/data/api";
import { getSessionContext } from "@/lib/api/utils";
import { TopBar } from "@/components/top-bar";
import { KpiCard } from "@/components/kpi-card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AttributionClient } from "./client";

export const dynamic = "force-dynamic";

export default async function AttributionPage() {
  const ctx = await getSessionContext();
  const [kpis, chartData, funnelData] = await Promise.all([
    getAttributionKpis(ctx.workspaceId),
    getAttributionChartData(ctx.workspaceId),
    getFunnelData(ctx.workspaceId),
  ]);

  return (
    <>
      <TopBar
        title="Attribution"
        subtitle="Signal-to-revenue attribution analytics"
        actions={
          <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        }
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} metric={kpi} />
          ))}
        </div>
        <AttributionClient chartData={chartData} funnelData={funnelData} />
      </div>
    </>
  );
}
