import { getSequences, getOrchestrationKpis } from "@/lib/data/api";
import { getSessionContext } from "@/lib/api/utils";
import { TopBar } from "@/components/top-bar";
import { KpiCard } from "@/components/kpi-card";
import { SequenceCard } from "@/components/sequence-card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Plus, GitBranch } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrchestrationPage() {
  const ctx = await getSessionContext();
  const [sequences, kpis] = await Promise.all([
    getSequences(ctx.workspaceId),
    getOrchestrationKpis(ctx.workspaceId),
  ]);

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
          <Button size="sm" variant="outline" className="gap-1 text-xs">
            <Plus className="h-3.5 w-3.5" />
            New
          </Button>
        </div>

        {sequences.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {sequences.map((seq) => (
              <SequenceCard key={seq.id} sequence={seq} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<GitBranch className="h-6 w-6 text-muted-foreground" />}
            title="No sequences yet"
            description="Create your first multi-channel sequence to start engaging prospects."
          />
        )}
      </div>
    </>
  );
}
