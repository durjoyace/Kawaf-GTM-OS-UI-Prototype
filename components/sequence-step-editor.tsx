"use client";

import { useState } from "react";
import { Mail, Linkedin, Phone, MessageSquare, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SequenceStep {
  type: string;
  subject?: string;
  body?: string;
  delay?: number;
}

interface SequenceStepEditorProps {
  steps: SequenceStep[];
  onChange: (steps: SequenceStep[]) => void;
}

const channelOptions = [
  { type: "email", label: "Email", icon: Mail, color: "text-blue-600" },
  { type: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-sky-600" },
  { type: "sms", label: "SMS", icon: MessageSquare, color: "text-green-600" },
  { type: "call", label: "Call", icon: Phone, color: "text-amber-600" },
];

export function SequenceStepEditor({ steps, onChange }: SequenceStepEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function addStep() {
    onChange([...steps, { type: "email", subject: "", delay: 3 }]);
  }

  function updateStep(index: number, updates: Partial<SequenceStep>) {
    const updated = steps.map((s, i) => (i === index ? { ...s, ...updates } : s));
    onChange(updated);
  }

  function removeStep(index: number) {
    onChange(steps.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const channel = channelOptions.find((c) => c.type === step.type) ?? channelOptions[0];
        return (
          <Card key={index} className="p-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <span className="bg-slate-100 rounded-full px-2 py-0.5">{index + 1}</span>
              </div>

              {/* Channel selector */}
              <div className="flex gap-1">
                {channelOptions.map((opt) => (
                  <button
                    key={opt.type}
                    onClick={() => updateStep(index, { type: opt.type })}
                    className={`p-1.5 rounded-md transition-colors ${
                      step.type === opt.type ? "bg-slate-100" : "hover:bg-slate-50"
                    }`}
                    title={opt.label}
                  >
                    <opt.icon className={`h-3.5 w-3.5 ${step.type === opt.type ? opt.color : "text-slate-400"}`} />
                  </button>
                ))}
              </div>

              {/* Subject / content */}
              <input
                type="text"
                value={step.subject ?? ""}
                onChange={(e) => updateStep(index, { subject: e.target.value })}
                placeholder={`Step ${index + 1} subject...`}
                className="flex-1 text-xs border-0 bg-transparent focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50"
              />

              {/* Delay */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <input
                  type="number"
                  min={0}
                  value={step.delay ?? 0}
                  onChange={(e) => updateStep(index, { delay: parseInt(e.target.value) || 0 })}
                  className="w-8 text-center border-0 bg-transparent focus:outline-none"
                />
                <span>d</span>
              </div>

              <button
                onClick={() => removeStep(index)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </Card>
        );
      })}

      <Button variant="outline" size="sm" onClick={addStep} className="text-xs">
        + Add Step
      </Button>
    </div>
  );
}
