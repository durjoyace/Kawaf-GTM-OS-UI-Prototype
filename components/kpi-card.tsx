import { Activity, DollarSign, Users, Trophy, PlayCircle, MailOpen, Calendar, TrendingUp, Banknote, Target, Clock, Plug, RefreshCw, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TrendDelta } from "@/components/trend-delta";
import { MiniBarChart } from "@/components/mini-bar-chart";
import type { KpiMetric } from "@/lib/types/models";

const iconMap: Record<string, React.ElementType> = {
  activity: Activity,
  "dollar-sign": DollarSign,
  users: Users,
  trophy: Trophy,
  "play-circle": PlayCircle,
  "mail-open": MailOpen,
  calendar: Calendar,
  "trending-up": TrendingUp,
  banknote: Banknote,
  target: Target,
  clock: Clock,
  plug: Plug,
  "refresh-cw": RefreshCw,
  shield: Shield,
};

export function KpiCard({ metric }: { metric: KpiMetric }) {
  const Icon = iconMap[metric.icon] || Activity;

  return (
    <Card className="p-5 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {metric.label}
          </p>
          <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-2">
          <Icon className="h-4 w-4 text-blue-600" />
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        {metric.chartData && metric.chartData.length > 0 && (
          <MiniBarChart data={metric.chartData} />
        )}
        {metric.trend && (
          <TrendDelta value={metric.trend.value} direction={metric.trend.direction} />
        )}
      </div>
    </Card>
  );
}
