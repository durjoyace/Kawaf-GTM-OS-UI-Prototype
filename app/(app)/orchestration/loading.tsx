import { KpiGridSkeleton, TableSkeleton } from "@/components/loading-skeleton";

export default function OrchestrationLoading() {
  return (
    <div className="p-6 space-y-6">
      <KpiGridSkeleton />
      <TableSkeleton rows={4} />
    </div>
  );
}
