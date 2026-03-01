"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SourceSelector } from "@/components/signal-builder/source-selector";
import { ConditionEditor } from "@/components/signal-builder/condition-editor";
import { ActionConfig } from "@/components/signal-builder/action-config";
import { Save, Play, Pause } from "lucide-react";

interface SignalSource {
  id: string;
  name: string;
  type: string;
  status: string;
  config: Record<string, unknown>;
  conditionRules: Array<{ jsonPath: string; operator: string; value: string }>;
  createdAt: string;
}

export function SignalBuilderClient({ sources: initialSources }: { sources: SignalSource[] }) {
  const [sources, setSources] = useState(initialSources);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // New source form state
  const [name, setName] = useState("");
  const [sourceType, setSourceType] = useState("webhook");
  const [url, setUrl] = useState("");
  const [pollInterval, setPollInterval] = useState(60);
  const [conditions, setConditions] = useState<Array<{ jsonPath: string; operator: string; value: string }>>([]);
  const [signalType, setSignalType] = useState("");
  const [category, setCategory] = useState("external-news");
  const [impact, setImpact] = useState("medium");

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/signal-sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type: sourceType,
          config: { url, pollInterval, signalType, category, impact },
          conditionRules: conditions,
        }),
      });
      if (res.ok) {
        const newSource = await res.json();
        setSources([newSource, ...sources]);
        setCreating(false);
        resetForm();
      }
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(source: SignalSource) {
    const newStatus = source.status === "active" ? "paused" : "active";
    const res = await fetch(`/api/signal-sources/${source.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setSources(sources.map((s) => (s.id === source.id ? { ...s, status: newStatus } : s)));
    }
  }

  function resetForm() {
    setName("");
    setSourceType("webhook");
    setUrl("");
    setPollInterval(60);
    setConditions([]);
    setSignalType("");
    setCategory("external-news");
    setImpact("medium");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Signal Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create custom signal sources from webhooks, RSS feeds, APIs, and more.
          </p>
        </div>
        <Button onClick={() => setCreating(!creating)} className="gap-1.5">
          {creating ? "Cancel" : "+ New Source"}
        </Button>
      </div>

      {/* Create form */}
      {creating && (
        <Card className="p-6 space-y-5">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Source Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. GitHub Stars Monitor"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Source Type</label>
            <SourceSelector value={sourceType} onChange={setSourceType} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">URL / Endpoint</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/data"
                className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            {sourceType === "api_poll" && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Poll Interval (minutes)</label>
                <input
                  type="number"
                  value={pollInterval}
                  onChange={(e) => setPollInterval(parseInt(e.target.value) || 60)}
                  className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            )}
          </div>

          <ConditionEditor conditions={conditions} onChange={setConditions} />

          <ActionConfig
            signalType={signalType}
            category={category}
            impact={impact}
            onSignalTypeChange={setSignalType}
            onCategoryChange={setCategory}
            onImpactChange={setImpact}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => { setCreating(false); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !name} className="gap-1.5">
              <Save className="h-3.5 w-3.5" />
              {saving ? "Saving..." : "Save Source"}
            </Button>
          </div>
        </Card>
      )}

      {/* Existing sources */}
      <div className="grid gap-3">
        {sources.map((source) => (
          <Card key={source.id} className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">{source.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {source.type} &middot; {source.conditionRules?.length ?? 0} conditions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  source.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {source.status}
              </span>
              <Button variant="ghost" size="sm" onClick={() => toggleStatus(source)} className="h-7 w-7 p-0">
                {source.status === "active" ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </Card>
        ))}

        {sources.length === 0 && !creating && (
          <p className="text-sm text-muted-foreground text-center py-10">
            No custom signal sources yet. Click &ldquo;+ New Source&rdquo; to create one.
          </p>
        )}
      </div>
    </div>
  );
}
