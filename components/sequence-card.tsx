import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChannelBadge } from "@/components/channel-badge";
import { StatusChip } from "@/components/status-chip";
import type { Sequence } from "@/lib/types/models";

export function SequenceCard({ sequence }: { sequence: Sequence }) {
  return (
    <Link href={`/orchestration/${sequence.id}`}>
    <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
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
      <div className="mt-4 grid grid-cols-5 gap-2 text-center">
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
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Open</p>
        </div>
        <div>
          <p className="text-lg font-bold">{sequence.replyRate}%</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Reply</p>
        </div>
        <div>
          <p className="text-lg font-bold">{sequence.meetingsBooked}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Meetings</p>
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
    </Link>
  );
}
