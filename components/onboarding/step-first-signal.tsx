"use client";

import { Button } from "@/components/ui/button";
import { Radar, ArrowRight } from "lucide-react";

interface StepFirstSignalProps {
  onComplete: () => void;
  onBack: () => void;
}

export function StepFirstSignal({ onComplete, onBack }: StepFirstSignalProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <Radar className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold">You&apos;re All Set!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your workspace is configured. Signals will start appearing as data flows in
          from your CRM, website tracking, and external sources.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4">
        <h3 className="text-sm font-medium">What happens next:</h3>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            Signals are processed every 5 minutes with AI scoring
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            Website visitor intent is analyzed every 15 minutes
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            High-confidence signals trigger instant notifications
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            One-click AI outreach is available from any signal
          </li>
        </ul>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={onComplete} className="flex-1">
          Go to Dashboard <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
