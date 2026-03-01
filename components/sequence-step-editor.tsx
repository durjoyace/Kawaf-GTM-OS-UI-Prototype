"use client";

import { useState } from "react";
import { Mail, Linkedin, Phone, MessageSquare, Clock, FlaskConical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AbVariant {
  id: string;
  name: string;
  subject?: string;
  body?: string;
}

interface SequenceStep {
  type: string;
  subject?: string;
  body?: string;
  delay?: number;
  abTest?: boolean;
  variants?: AbVariant[];
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

  function toggleAbTest(index: number) {
    const step = steps[index];
    if (step.abTest) {
      // Disable A/B: move variant A content back to step level
      const variantA = step.variants?.[0];
      updateStep(index, {
        abTest: false,
        variants: undefined,
        subject: variantA?.subject ?? step.subject,
        body: variantA?.body ?? step.body,
      });
    } else {
      // Enable A/B: create two variants from current content
      updateStep(index, {
        abTest: true,
        variants: [
          { id: "a", name: "Variant A", subject: step.subject ?? "", body: step.body ?? "" },
          { id: "b", name: "Variant B", subject: "", body: "" },
        ],
      });
    }
  }

  function updateVariant(stepIndex: number, variantIndex: number, updates: Partial<AbVariant>) {
    const step = steps[stepIndex];
    if (!step.variants) return;
    const updatedVariants = step.variants.map((v, i) =>
      i === variantIndex ? { ...v, ...updates } : v
    );
    updateStep(stepIndex, { variants: updatedVariants });
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

              {/* Subject / content (only when not A/B testing) */}
              {!step.abTest && (
                <input
                  type="text"
                  value={step.subject ?? ""}
                  onChange={(e) => updateStep(index, { subject: e.target.value })}
                  placeholder={`Step ${index + 1} subject...`}
                  className="flex-1 text-xs border-0 bg-transparent focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50"
                />
              )}

              {step.abTest && (
                <span className="flex-1 text-xs text-blue-600 font-medium flex items-center gap-1">
                  <FlaskConical className="h-3 w-3" />
                  A/B Test Active
                </span>
              )}

              {/* A/B Test toggle */}
              <button
                onClick={() => toggleAbTest(index)}
                className={`p-1.5 rounded-md transition-colors ${
                  step.abTest ? "bg-blue-100 text-blue-600" : "hover:bg-slate-50 text-slate-400"
                }`}
                title={step.abTest ? "Disable A/B Test" : "Enable A/B Test"}
              >
                <FlaskConical className="h-3.5 w-3.5" />
              </button>

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

            {/* A/B Variant editors */}
            {step.abTest && step.variants && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {step.variants.map((variant, vIndex) => (
                  <div key={variant.id} className="rounded-lg border border-slate-200 p-2.5 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        vIndex === 0 ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                      }`}>
                        {variant.name}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={variant.subject ?? ""}
                      onChange={(e) => updateVariant(index, vIndex, { subject: e.target.value })}
                      placeholder="Subject line..."
                      className="w-full text-xs border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    />
                    <textarea
                      value={variant.body ?? ""}
                      onChange={(e) => updateVariant(index, vIndex, { body: e.target.value })}
                      placeholder="Message body..."
                      rows={3}
                      className="w-full text-xs border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-300 resize-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>
        );
      })}

      <Button variant="outline" size="sm" onClick={addStep} className="text-xs">
        + Add Step
      </Button>
    </div>
  );
}
