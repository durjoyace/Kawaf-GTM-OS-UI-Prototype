import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChannelBadge } from "@/components/channel-badge";
import { StatusChip } from "@/components/status-chip";
import type { Sequence } from "@/lib/types/models";

export function SequenceCard({ sequence }: { sequence: Sequence }) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-sm">{sequence.name}</h3>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {sequence.channels.map((ch) => (
              <ChannelBadge key={ch} channel={ch} />
            ))}
          </div>
        </div>
        <StatusChip label={sequence.status === "active" ? "Active" : sequence.status === "paused" ? "Paused" : "Draft"} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-bold">{sequence.enrolled.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Enrolled</p>
        </div>
        <div>
          <p className="text-lg font-bold">{sequence.steps}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Steps</p>
        </div>
        <div>
          <p className="text-lg font-bold">{sequence.openRate}%</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Open Rate</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground">Progress</span>
          <span className="text-[10px] font-medium">{sequence.progress}%</span>
        </div>
        <Progress value={sequence.progress} className="h-1.5" />
      </div>
    </Card>
  );
}
