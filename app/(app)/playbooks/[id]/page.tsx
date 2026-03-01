"use client";

import { useParams, useRouter } from "next/navigation";
import { playbookTemplates } from "@/lib/data/playbook-templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap } from "lucide-react";
import { useState } from "react";

export default function PlaybookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const template = playbookTemplates.find((t) => t.id === id);

  if (!template) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Playbook not found.</p>
      </div>
    );
  }

  async function handleUseTemplate() {
    setCreating(true);
    try {
      const res = await fetch("/api/playbooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: template!.id }),
      });
      if (res.ok) {
        router.push("/playbooks");
      }
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => router.push("/playbooks")}>
        <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Back to Playbooks
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{template.name}</h1>
            <Badge variant="secondary">{template.industry}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{template.description}</p>
        </div>
        <Button onClick={handleUseTemplate} disabled={creating}>
          <Zap className="mr-1 h-4 w-4" />
          {creating ? "Creating..." : "Use Template"}
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Signal Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Categories: </span>
              <span className="text-muted-foreground">
                {template.signalRules.categories.join(", ")}
              </span>
            </div>
            <div>
              <span className="font-medium">Min Confidence: </span>
              <span className="text-muted-foreground">{template.signalRules.minConfidence}%</span>
            </div>
            <div>
              <span className="font-medium">Signal Types: </span>
              <span className="text-muted-foreground">
                {template.signalRules.signalTypes.join(", ")}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sequence Config</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Channels: </span>
              <span className="text-muted-foreground">
                {template.sequenceConfig.channels.join(", ")}
              </span>
            </div>
            <div>
              <span className="font-medium">Steps: </span>
              <span className="text-muted-foreground">{template.sequenceConfig.steps}</span>
            </div>
            <div>
              <span className="font-medium">Cadence: </span>
              <span className="text-muted-foreground">
                Every {template.sequenceConfig.cadenceDays} days
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
