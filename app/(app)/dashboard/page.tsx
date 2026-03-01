import { getDashboardData } from "@/lib/data/api";
import { getSessionContext } from "@/lib/api/utils";
import { TopBar } from "@/components/top-bar";
import { KpiCard } from "@/components/kpi-card";
import { DashboardChart } from "./chart";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const ctx = await getSessionContext();
  const data = await getDashboardData(ctx.workspaceId);

  return (
    <>
      <TopBar title="Dashboard" subtitle="Real-time GTM performance overview" />
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-sm font-semibold">Overview</h2>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.kpis.map((kpi) => (
            <KpiCard key={kpi.label} metric={kpi} />
          ))}
        </div>
        <div>
          <h2 className="text-sm font-semibold mb-4">Revenue Trend</h2>
          <DashboardChart data={data.chartData} />
        </div>
      </div>
    </>
  );
}
