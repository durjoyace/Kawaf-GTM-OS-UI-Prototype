"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Radar, GitBranch, Target, X } from "lucide-react";

interface Widget {
  type: string;
  title: string;
}

interface ReportBuilderProps {
  widgets: Widget[];
  onChange: (widgets: Widget[]) => void;
}

const availableWidgets = [
  { type: "signals-summary", title: "Signals Summary", icon: Radar, description: "Signal volume, categories, trends" },
  { type: "attribution", title: "Revenue Attribution", icon: BarChart3, description: "Signal-to-revenue attribution" },
  { type: "sequences", title: "Sequence Performance", icon: GitBranch, description: "Open/reply/meeting rates" },
  { type: "pipeline", title: "Pipeline Impact", icon: Target, description: "Deal stage progression from signals" },
];

export function ReportBuilder({ widgets, onChange }: ReportBuilderProps) {
  function addWidget(type: string, title: string) {
    if (widgets.some((w) => w.type === type)) return;
    onChange([...widgets, { type, title }]);
  }

  function removeWidget(index: number) {
    onChange(widgets.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {/* Available widgets */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">
          Add Widgets
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {availableWidgets.map((w) => {
            const isAdded = widgets.some((wi) => wi.type === w.type);
            return (
              <button
                key={w.type}
                onClick={() => addWidget(w.type, w.title)}
                disabled={isAdded}
                className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all ${
                  isAdded
                    ? "border-green-200 bg-green-50 opacity-50 cursor-not-allowed"
                    : "border-slate-200 hover:border-green-300 hover:bg-green-50/50 cursor-pointer"
                }`}
              >
                <w.icon className="h-4 w-4 text-slate-500" />
                <span className="text-[11px] font-medium">{w.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected widgets */}
      {widgets.length > 0 && (
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Report Layout
          </label>
          <div className="space-y-2">
            {widgets.map((widget, index) => (
              <Card key={widget.type} className="p-3 flex items-center gap-3">
                <span className="text-xs font-medium flex-1">{widget.title}</span>
                <button
                  onClick={() => removeWidget(index)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
