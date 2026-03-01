"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TopBar } from "@/components/top-bar";
import { SequenceAnalytics } from "@/components/sequence-analytics";
import { AbTestResults } from "@/components/ab-test-results";
import { KpiGridSkeleton, TableSkeleton } from "@/components/loading-skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AbVariant {
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
  variants: AbVariant[];
  winner: string | null;
  confidence: number;
}

interface AnalyticsData {
  sequenceId: string;
  name: string;
  totalEnrolled: number;
  active: number;
  completed: number;
  openRate: number;
  replyRate: number;
  meetingsBooked: number;
  stepMetrics: Array<{
    step: number;
    type: string;
    subject: string;
    reached: number;
    completionRate: number;
    abResults?: AbStepResult[];
  }>;
}

export default function SequenceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sequences/${id}/analytics`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // Extract AB results from step metrics if available
  const abResults = data?.stepMetrics
    ?.flatMap((s) => s.abResults ?? [])
    .filter((r): r is AbStepResult => r !== undefined);

  return (
    <>
      <TopBar
        title={data?.name ?? "Sequence Detail"}
        subtitle="Step-by-step analytics and conversion funnel"
      />
      <div className="p-6 space-y-6">
        <Link
          href="/orchestration"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Orchestration
        </Link>

        {loading ? (
          <div className="space-y-6">
            <KpiGridSkeleton count={6} />
            <TableSkeleton rows={4} />
          </div>
        ) : data ? (
          <>
            <SequenceAnalytics
              totalEnrolled={data.totalEnrolled}
              active={data.active}
              completed={data.completed}
              openRate={data.openRate}
              replyRate={data.replyRate}
              meetingsBooked={data.meetingsBooked}
              stepMetrics={data.stepMetrics}
            />
            <AbTestResults sequenceId={data.sequenceId} data={abResults} />
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Sequence not found.</p>
        )}
      </div>
    </>
  );
}
