"use client";

import { Button } from "@/components/ui/button";
import { Plug } from "lucide-react";

const crms = [
  { id: "hubspot", name: "HubSpot", color: "bg-orange-500" },
  { id: "salesforce", name: "Salesforce", color: "bg-blue-500" },
  { id: "outreach", name: "Outreach", color: "bg-purple-500" },
];

interface StepCrmProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepCrm({ onNext, onBack }: StepCrmProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Connect Your CRM</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sync your CRM to automatically detect buying signals from existing accounts.
        </p>
      </div>

      <div className="space-y-2">
        {crms.map((crm) => (
          <button
            key={crm.id}
            className="flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent"
            onClick={() => {
              // In production, this would start the OAuth flow
              window.open(`/api/integrations/${crm.id}/connect`, "_blank");
            }}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded ${crm.color}`}>
              <Plug className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">{crm.name}</p>
              <p className="text-xs text-muted-foreground">Connect your {crm.name} account</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        You can skip this step and connect later from Settings.
      </p>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={onNext} className="flex-1">Continue</Button>
      </div>
    </div>
  );
}
