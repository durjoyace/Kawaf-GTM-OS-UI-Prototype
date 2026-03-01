"use client";

import { Webhook, Rss, Globe, Github, Star } from "lucide-react";

const sourceTypes = [
  { type: "webhook", label: "Webhook", icon: Webhook, description: "Receive signals via webhook URL" },
  { type: "rss", label: "RSS Feed", icon: Rss, description: "Monitor RSS feeds for signals" },
  { type: "api_poll", label: "API Poll", icon: Globe, description: "Poll an API endpoint on interval" },
  { type: "github", label: "GitHub", icon: Github, description: "Track GitHub stars, issues, releases" },
  { type: "g2", label: "G2 Reviews", icon: Star, description: "Monitor G2 review activity" },
];

interface SourceSelectorProps {
  value: string;
  onChange: (type: string) => void;
}

export function SourceSelector({ value, onChange }: SourceSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {sourceTypes.map((source) => (
        <button
          key={source.type}
          onClick={() => onChange(source.type)}
          className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
            value === source.type
              ? "border-green-500 bg-green-50 ring-1 ring-green-500"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          <source.icon className={`h-5 w-5 ${value === source.type ? "text-green-600" : "text-slate-500"}`} />
          <span className="text-xs font-medium">{source.label}</span>
          <span className="text-[10px] text-muted-foreground text-center">{source.description}</span>
        </button>
      ))}
    </div>
  );
}
