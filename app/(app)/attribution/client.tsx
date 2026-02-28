"use client";

import { useState } from "react";
import { AttributionChart } from "./chart";
import { FunnelSection } from "./funnel";
import type { ChartDataPoint, AttributionEvent, AttributionModel } from "@/lib/types/models";

const models: { label: string; value: AttributionModel; description: string }[] = [
  { label: "Last Touch", value: "last-touch", description: "100% credit to the last signal before conversion" },
  { label: "Linear", value: "linear", description: "Equal credit across all touchpoints" },
  { label: "Time Decay", value: "time-decay", description: "More credit to recent signals" },
];

interface Props {
  chartData: ChartDataPoint[];
  funnelData: AttributionEvent[];
}

export function AttributionClient({ chartData, funnelData }: Props) {
  const [model, setModel] = useState<AttributionModel>("last-touch");

  // Simulate model impact on data
  const adjustedFunnel = funnelData.map((item) => {
    if (model === "linear") {
      return { ...item, value: Math.round(item.value * 0.92), percentage: Math.round(item.percentage * 0.95) };
    }
    if (model === "time-decay") {
      return { ...item, value: Math.round(item.value * 1.05), percentage: Math.min(100, Math.round(item.percentage * 1.03)) };
    }
    return item;
  });

  return (
    <div className="space-y-6">
      {/* Model selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold text-muted-foreground">Attribution Model:</span>
        {models.map((m) => (
          <button
            key={m.value}
            onClick={() => setModel(m.value)}
            className={`rounded-lg border px-3 py-2 text-left transition-all ${
              model === m.value
                ? "border-blue-300 bg-blue-50 ring-1 ring-blue-200"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <p className={`text-xs font-medium ${model === m.value ? "text-blue-700" : ""}`}>{m.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{m.description}</p>
          </button>
        ))}
      </div>

      <AttributionChart data={chartData} />
      <FunnelSection data={adjustedFunnel} />
    </div>
  );
}
