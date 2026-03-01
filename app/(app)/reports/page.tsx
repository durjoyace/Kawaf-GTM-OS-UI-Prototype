"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/top-bar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReportBuilder } from "@/components/report-builder";
import { EmptyState } from "@/components/empty-state";
import { KpiGridSkeleton } from "@/components/loading-skeleton";
import { Plus, FileBarChart, Share2 } from "lucide-react";

interface Report {
  id: string;
  name: string;
  widgets: Array<{ type: string; title: string }>;
  isPublic: boolean;
  shareToken: string;
  createdAt: string;
}

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [widgets, setWidgets] = useState<Array<{ type: string; title: string }>>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/reports")
      .then((r) => r.json())
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate() {
    if (!name) return;
    setSaving(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, widgets }),
      });
      if (res.ok) {
        const report = await res.json();
        setReports([report, ...reports]);
        setCreating(false);
        setName("");
        setWidgets([]);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <TopBar title="Reports" subtitle="Build and share ROI reports" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Your Reports</h2>
          <Button size="sm" onClick={() => setCreating(!creating)} className="gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            New Report
          </Button>
        </div>

        {creating && (
          <Card className="p-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Report Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Q1 2026 GTM Performance"
              />
            </div>
            <ReportBuilder widgets={widgets} onChange={setWidgets} />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreating(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={saving || !name}>
                {saving ? "Creating..." : "Create Report"}
              </Button>
            </div>
          </Card>
        )}

        {loading ? (
          <KpiGridSkeleton count={3} />
        ) : reports.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <Card
                key={report.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(`/reports/${report.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileBarChart className="h-4 w-4 text-green-600" />
                    <h3 className="text-sm font-semibold">{report.name}</h3>
                  </div>
                  {report.isPublic && <Share2 className="h-3.5 w-3.5 text-blue-500" />}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {report.widgets?.length ?? 0} widgets
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Created {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        ) : !creating ? (
          <EmptyState
            icon={<FileBarChart className="h-6 w-6 text-muted-foreground" />}
            title="No reports yet"
            description="Create your first report to share ROI insights with stakeholders."
          />
        ) : null}
      </div>
    </>
  );
}
