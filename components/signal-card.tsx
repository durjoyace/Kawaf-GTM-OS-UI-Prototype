import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfidenceBar } from "@/components/confidence-bar";
import { StatusChip } from "@/components/status-chip";
import type { Signal } from "@/lib/types/models";

export function SignalCard({ signal }: { signal: Signal }) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-bold text-white">
          {signal.accountAvatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm truncate">{signal.accountName}</h3>
            <StatusChip label={signal.impact === "high" ? "High Impact" : signal.impact === "medium" ? "Medium" : "Low"} />
          </div>
          <p className="text-xs text-blue-600 font-medium mt-0.5">{signal.signalType}</p>
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{signal.description}</p>
          <ConfidenceBar value={signal.confidence} className="mt-3" />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {signal.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[11px] px-1.5 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{signal.recency}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
