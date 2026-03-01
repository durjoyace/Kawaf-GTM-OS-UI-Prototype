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

const iconColorMap: Record<string, { bg: string; text: string }> = {
  "dollar-sign": { bg: "bg-green-50", text: "text-green-600" },
  banknote: { bg: "bg-green-50", text: "text-green-600" },
  users: { bg: "bg-blue-50", text: "text-blue-600" },
  activity: { bg: "bg-blue-50", text: "text-blue-600" },
  "play-circle": { bg: "bg-blue-50", text: "text-blue-600" },
  "mail-open": { bg: "bg-blue-50", text: "text-blue-600" },
  trophy: { bg: "bg-emerald-50", text: "text-emerald-600" },
  "trending-up": { bg: "bg-emerald-50", text: "text-emerald-600" },
  target: { bg: "bg-emerald-50", text: "text-emerald-600" },
  clock: { bg: "bg-amber-50", text: "text-amber-600" },
  "refresh-cw": { bg: "bg-amber-50", text: "text-amber-600" },
  plug: { bg: "bg-amber-50", text: "text-amber-600" },
  shield: { bg: "bg-purple-50", text: "text-purple-600" },
  calendar: { bg: "bg-indigo-50", text: "text-indigo-600" },
};

export function KpiCard({ metric }: { metric: KpiMetric }) {
  const Icon = iconMap[metric.icon] || Activity;
  const colors = iconColorMap[metric.icon] ?? { bg: "bg-blue-50", text: "text-blue-600" };

  return (
    <Card className="p-5 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {metric.label}
          </p>
          <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
        </div>
        <div className={`rounded-lg ${colors.bg} p-2`}>
          <Icon className={`h-4 w-4 ${colors.text}`} />
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
