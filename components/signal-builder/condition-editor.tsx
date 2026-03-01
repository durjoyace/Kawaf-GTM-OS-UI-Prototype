"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Condition {
  jsonPath: string;
  operator: string;
  value: string;
}

interface ConditionEditorProps {
  conditions: Condition[];
  onChange: (conditions: Condition[]) => void;
}

const operators = [
  { value: "equals", label: "equals" },
  { value: "contains", label: "contains" },
  { value: "gt", label: "greater than" },
  { value: "lt", label: "less than" },
  { value: "exists", label: "exists" },
  { value: "regex", label: "matches regex" },
];

export function ConditionEditor({ conditions, onChange }: ConditionEditorProps) {
  function addCondition() {
    onChange([...conditions, { jsonPath: "", operator: "equals", value: "" }]);
  }

  function updateCondition(index: number, updates: Partial<Condition>) {
    const updated = conditions.map((c, i) => (i === index ? { ...c, ...updates } : c));
    onChange(updated);
  }

  function removeCondition(index: number) {
    onChange(conditions.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground">Conditions (all must match)</label>
      {conditions.map((condition, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={condition.jsonPath}
            onChange={(e) => updateCondition(index, { jsonPath: e.target.value })}
            placeholder="$.data.field"
            className="flex-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <select
            value={condition.operator}
            onChange={(e) => updateCondition(index, { operator: e.target.value })}
            className="rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            {operators.map((op) => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={condition.value}
            onChange={(e) => updateCondition(index, { value: e.target.value })}
            placeholder="value"
            className="flex-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button onClick={() => removeCondition(index)} className="text-red-400 hover:text-red-600">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addCondition} className="text-xs gap-1">
        <Plus className="h-3 w-3" /> Add Condition
      </Button>
    </div>
  );
}
