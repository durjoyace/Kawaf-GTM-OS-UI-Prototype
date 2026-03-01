import { KpiGridSkeleton, TableSkeleton } from "@/components/loading-skeleton";

export default function SignalDiscoveryLoading() {
  return (
    <div className="p-6 space-y-6">
      <KpiGridSkeleton count={5} />
      <TableSkeleton rows={6} />
    </div>
  );
}
