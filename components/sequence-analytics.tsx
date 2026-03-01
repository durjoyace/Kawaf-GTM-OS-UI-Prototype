"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mail, Linkedin, Phone, MessageSquare } from "lucide-react";

interface StepMetric {
  step: number;
  type: string;
  subject: string;
  reached: number;
  completionRate: number;
}

interface SequenceAnalyticsProps {
  totalEnrolled: number;
  active: number;
  completed: number;
  openRate: number;
  replyRate: number;
  meetingsBooked: number;
  stepMetrics: StepMetric[];
}

const channelIcons: Record<string, typeof Mail> = {
  email: Mail,
  linkedin: Linkedin,
  sms: MessageSquare,
  call: Phone,
};

export function SequenceAnalytics({
  totalEnrolled,
  active,
  completed,
  openRate,
  replyRate,
  meetingsBooked,
  stepMetrics,
}: SequenceAnalyticsProps) {
  const kpis = [
    { label: "Enrolled", value: totalEnrolled },
    { label: "Active", value: active },
    { label: "Completed", value: completed },
    { label: "Open Rate", value: `${openRate}%` },
    { label: "Reply Rate", value: `${replyRate}%` },
    { label: "Meetings", value: meetingsBooked },
  ];

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-3 text-center">
            <p className="text-lg font-bold">{kpi.value}</p>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
          </Card>
        ))}
      </div>

      {/* Step funnel */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold mb-4">Conversion Funnel</h3>
        <div className="space-y-3">
          {stepMetrics.map((metric) => {
            const Icon = channelIcons[metric.type] ?? Mail;
            return (
              <div key={metric.step} className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-48 shrink-0">
                  <span className="bg-slate-100 text-xs font-medium rounded-full px-2 py-0.5">
                    {metric.step}
                  </span>
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs truncate" title={metric.subject}>{metric.subject}</span>
                </div>
                <div className="flex-1">
                  <Progress value={metric.completionRate} className="h-2" />
                </div>
                <div className="text-xs font-medium w-16 text-right">
                  {metric.reached} ({metric.completionRate}%)
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
