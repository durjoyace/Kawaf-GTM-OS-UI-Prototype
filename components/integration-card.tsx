import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/status-chip";
import { Zap, RefreshCw, Settings } from "lucide-react";
import type { Integration } from "@/lib/types/models";

interface IntegrationCardProps {
  integration: Integration;
  onConnect?: () => void;
}

export function IntegrationCard({ integration, onConnect }: IntegrationCardProps) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${integration.avatarColor}`}>
          {integration.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">{integration.name}</h3>
            <span className="text-[10px] text-muted-foreground bg-gray-100 rounded px-1.5 py-0.5">{integration.category}</span>
            {integration.isNative && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-600 bg-amber-50 rounded px-1.5 py-0.5">
                <Zap className="h-2.5 w-2.5" />
                Native
              </span>
            )}
          </div>
          <StatusChip label={integration.status === "connected" ? "Connected" : "Disconnected"} className="mt-1.5" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3">{integration.description}</p>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span>Last sync: {integration.lastSync}</span>
        <span>{integration.recordCount} records</span>
      </div>
      <div className="mt-4 flex gap-2">
        <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
          <RefreshCw className="h-3 w-3" />
          Sync
        </Button>
        <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
          <Settings className="h-3 w-3" />
          Configure
        </Button>
        {integration.status !== "connected" && onConnect && (
          <Button size="sm" className="h-7 text-xs gap-1" onClick={onConnect}>
            Connect
          </Button>
        )}
      </div>
    </Card>
  );
}
