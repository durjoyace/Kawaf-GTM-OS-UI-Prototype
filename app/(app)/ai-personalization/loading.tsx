import { KpiGridSkeleton, TableSkeleton } from "@/components/loading-skeleton";

export default function AIPersonalizationLoading() {
  return (
    <div className="p-6 space-y-6">
      <KpiGridSkeleton count={3} />
      <TableSkeleton rows={5} />
    </div>
  );
}
