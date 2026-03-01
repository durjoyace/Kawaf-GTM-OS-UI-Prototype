"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Node } from "@xyflow/react";
import type { WorkflowNodeData } from "@/lib/types/models";

interface NodeInspectorProps {
  node: Node<WorkflowNodeData> | null;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<WorkflowNodeData>) => void;
  onDelete: (id: string) => void;
}

const configFields: Record<string, { label: string; placeholder: string }[]> = {
  trigger: [
    { label: "Signal Type", placeholder: "e.g., Product Usage Spike" },
    { label: "Min Confidence", placeholder: "e.g., 80" },
  ],
  action: [
    { label: "Template", placeholder: "Select a message template" },
    { label: "Delay After", placeholder: "e.g., 2 hours" },
  ],
  logic: [
    { label: "Condition", placeholder: "e.g., score > 80" },
    { label: "Fallback", placeholder: "e.g., skip to next step" },
  ],
  utility: [
    { label: "Duration", placeholder: "e.g., 24 hours" },
  ],
  end: [
    { label: "Goal Name", placeholder: "e.g., Meeting Booked" },
  ],
};

export function NodeInspector({ node, onClose, onUpdate, onDelete }: NodeInspectorProps) {
  if (!node) return null;

  const data = node.data as WorkflowNodeData;
  const fields = configFields[data.category] || [];

  return (
    <div className="w-[280px] border-l bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <p className="text-sm font-semibold">{data.label}</p>
          <p className="text-[11px] text-muted-foreground capitalize">{data.category} node</p>
        </div>
        <button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Node Label
          </label>
          <Input
            value={data.label}
            onChange={(e) => onUpdate(node.id, { label: e.target.value })}
            className="mt-1 h-8 text-xs"
          />
        </div>
        <Separator />
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Configuration
        </p>
        {fields.map((field) => (
          <div key={field.label}>
            <label className="text-[11px] font-medium text-muted-foreground">{field.label}</label>
            <Input
              placeholder={field.placeholder}
              value={data.config?.[field.label] || ""}
              onChange={(e) =>
                onUpdate(node.id, {
                  config: { ...data.config, [field.label]: e.target.value },
                })
              }
              className="mt-1 h-8 text-xs"
            />
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(node.id)}
          className="w-full text-xs h-8"
        >
          Delete Node
        </Button>
      </div>
    </div>
  );
}
