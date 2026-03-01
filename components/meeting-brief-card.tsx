"use client";

import { Card } from "@/components/ui/card";
import { Lightbulb, AlertTriangle, TrendingUp, MessageCircle } from "lucide-react";

interface MeetingBriefCardProps {
  keyPoints: string[];
  risks: string[];
  opportunities: string[];
  talkingPoints: string[];
  accountSummary: string;
}

export function MeetingBriefCard({
  keyPoints,
  risks,
  opportunities,
  talkingPoints,
  accountSummary,
}: MeetingBriefCardProps) {
  const sections = [
    { title: "Key Points", items: keyPoints, icon: Lightbulb, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Risks", items: risks, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
    { title: "Opportunities", items: opportunities, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { title: "Talking Points", items: talkingPoints, icon: MessageCircle, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <Card className="p-5 space-y-4">
      <p className="text-xs text-muted-foreground">{accountSummary}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sections.map((section) => {
          if (section.items.length === 0) return null;
          return (
            <div key={section.title} className={`rounded-lg ${section.bg} p-3`}>
              <div className="flex items-center gap-1.5 mb-2">
                <section.icon className={`h-3.5 w-3.5 ${section.color}`} />
                <span className={`text-[11px] font-semibold ${section.color}`}>{section.title}</span>
              </div>
              <ul className="space-y-1">
                {section.items.map((item, i) => (
                  <li key={i} className="text-[11px] text-slate-700 leading-relaxed flex items-start gap-1.5">
                    <span className="mt-1 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
