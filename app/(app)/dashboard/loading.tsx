import { KpiGridSkeleton, ChartSkeleton } from "@/components/loading-skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6">
      <KpiGridSkeleton />
      <ChartSkeleton />
    </div>
  );
}
