"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TopBar } from "@/components/top-bar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Copy, Check } from "lucide-react";
import Link from "next/link";

interface Report {
  id: string;
  name: string;
  widgets: Array<{ type: string; title: string }>;
  dateRange: Record<string, unknown>;
  isPublic: boolean;
  shareToken: string;
  createdAt: string;
}

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/reports`)
      .then((r) => r.json())
      .then((reports: Report[]) => {
        const found = reports.find((r) => r.id === id);
        setReport(found ?? null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  function copyShareLink() {
    if (!report) return;
    const url = `${window.location.origin}/api/reports/${report.id}/public?token=${report.shareToken}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <TopBar title={report?.name ?? "Report"} subtitle="Report details and widgets" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/reports"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Reports
          </Link>

          {report && (
            <Button variant="outline" size="sm" onClick={copyShareLink} className="gap-1.5 text-xs">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy Share Link"}
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500" />
          </div>
        ) : report ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {(report.widgets ?? []).map((widget, i) => (
              <Card key={widget.type} className="p-6">
                <h3 className="text-sm font-semibold mb-4">{widget.title}</h3>
                <div className="flex items-center justify-center h-32 text-muted-foreground text-xs border border-dashed rounded-lg">
                  {widget.title} widget — data loads from live API
                </div>
              </Card>
            ))}

            {(report.widgets ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground col-span-full text-center py-10">
                No widgets configured for this report.
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Report not found.</p>
        )}
      </div>
    </>
  );
}
