"use client";

import { Button } from "@/components/ui/button";
import { TrackingSnippetCard } from "@/components/tracking-snippet-card";

interface StepTrackingProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepTracking({ onNext, onBack }: StepTrackingProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Install Website Tracking</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Drop this snippet on your website to start detecting visitor intent.
        </p>
      </div>

      <TrackingSnippetCard />

      <p className="text-xs text-muted-foreground text-center">
        You can skip this step and install the snippet later.
      </p>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={onNext} className="flex-1">Continue</Button>
      </div>
    </div>
  );
}
