"use client";

import { Mail, MousePointerClick, Reply, AlertTriangle } from "lucide-react";

interface EmailEngagementStatsProps {
  opens: number;
  clicks: number;
  replies?: number;
  bounces?: number;
}

export function EmailEngagementStats({ opens, clicks, replies = 0, bounces = 0 }: EmailEngagementStatsProps) {
  const stats = [
    { label: "Opens", value: opens, icon: Mail, color: "text-blue-600" },
    { label: "Clicks", value: clicks, icon: MousePointerClick, color: "text-green-600" },
    { label: "Replies", value: replies, icon: Reply, color: "text-purple-600" },
    ...(bounces > 0
      ? [{ label: "Bounces", value: bounces, icon: AlertTriangle, color: "text-red-500" }]
      : []),
  ];

  return (
    <div className="flex items-center gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-1.5 text-xs">
          <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
          <span className="text-muted-foreground">{stat.label}:</span>
          <span className="font-medium">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
