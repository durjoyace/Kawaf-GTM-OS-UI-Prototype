"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, BarChart3 } from "lucide-react";

interface VariantStats {
  id: string;
  name: string;
  sends: number;
  opens: number;
  clicks: number;
  replies: number;
  openRate: number;
  clickRate: number;
}

interface AbStepResult {
  stepIndex: number;
  stepType: string;
  variants: VariantStats[];
  winner: string | null;
  confidence: number;
}

interface AbTestResultsProps {
  sequenceId: string;
  data?: AbStepResult[];
}

export function AbTestResults({ sequenceId, data }: AbTestResultsProps) {
  const [results, setResults] = useState<AbStepResult[]>(data ?? []);
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    if (data) return;
    fetch(`/api/sequences/${sequenceId}/ab-results`)
      .then((r) => r.json())
      .then((d) => setResults(d.abResults ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [sequenceId, data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-blue-500" />
        A/B Test Results
      </h3>

      {results.map((result) => (
        <Card key={result.stepIndex} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">
              Step {result.stepIndex + 1} ({result.stepType})
            </span>
            {result.winner && (
              <Badge variant="outline" className="text-[11px] gap-1 border-amber-200 text-amber-700">
                <Trophy className="h-2.5 w-2.5" />
                Winner: {result.variants.find((v) => v.id === result.winner)?.name}
                {result.confidence > 0 && ` (${result.confidence}%)`}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {result.variants.map((variant) => {
              const isWinner = variant.id === result.winner;
              return (
                <div
                  key={variant.id}
                  className={`rounded-lg border p-3 ${
                    isWinner ? "border-amber-200 bg-amber-50/50" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold">{variant.name}</span>
                    {isWinner && <Trophy className="h-3 w-3 text-amber-500" />}
                  </div>
                  <div className="space-y-1.5">
                    <MetricBar label="Sends" value={variant.sends} />
                    <MetricBar label="Open Rate" value={variant.openRate} suffix="%" color="blue" />
                    <MetricBar label="Click Rate" value={variant.clickRate} suffix="%" color="green" />
                    <MetricBar label="Replies" value={variant.replies} color="purple" />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}

function MetricBar({
  label,
  value,
  suffix = "",
  color = "slate",
}: {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    slate: "bg-slate-400",
  };

  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${colorMap[color] ?? colorMap.slate}`}
            style={{ width: `${Math.min(value, 100)}%` }}
          />
        </div>
        <span className="font-medium w-8 text-right">
          {value}{suffix}
        </span>
      </div>
    </div>
  );
}
