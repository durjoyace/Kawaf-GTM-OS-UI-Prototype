import { getSequences, getOrchestrationKpis } from "@/lib/data/api";
import { TopBar } from "@/components/top-bar";
import { KpiCard } from "@/components/kpi-card";
import { SequenceCard } from "@/components/sequence-card";
import { Plus } from "lucide-react";

export default async function OrchestrationPage() {
  const [sequences, kpis] = await Promise.all([getSequences(), getOrchestrationKpis()]);

  return (
    <>
      <TopBar title="Orchestration" subtitle="Multi-channel sequence management" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} metric={kpi} />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Sequences</h2>
          <button className="inline-flex items-center gap-1 text-xs text-green-600 font-medium hover:text-green-700">
            <Plus className="h-3.5 w-3.5" />
            New
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {sequences.map((seq) => (
            <SequenceCard key={seq.id} sequence={seq} />
          ))}
        </div>
      </div>
    </>
  );
}
