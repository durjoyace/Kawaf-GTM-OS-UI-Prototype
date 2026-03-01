"use client";

import {
  Zap, Database, Mail, Linkedin, MessageSquare, Webhook,
  GitBranch, Filter, Clock, Flag, GripVertical,
} from "lucide-react";
import type { WorkflowNode } from "@/lib/types/models";

const iconMap: Record<string, React.ElementType> = {
  zap: Zap, database: Database, mail: Mail, linkedin: Linkedin,
  "message-square": MessageSquare, webhook: Webhook,
  "git-branch": GitBranch, filter: Filter, clock: Clock, flag: Flag,
};

const colorMap: Record<string, string> = {
  green: "border-l-green-500 bg-green-50/50 hover:bg-green-50",
  blue: "border-l-blue-500 bg-blue-50/50 hover:bg-blue-50",
  amber: "border-l-amber-500 bg-amber-50/50 hover:bg-amber-50",
  gray: "border-l-gray-400 bg-gray-50/50 hover:bg-gray-100",
};

interface NodeLibraryProps {
  nodes: WorkflowNode[];
  onAddNode: (node: WorkflowNode) => void;
}

export function NodeLibrary({ nodes, onAddNode }: NodeLibraryProps) {
  const groups = [
    { label: "Triggers", items: nodes.filter((n) => n.category === "trigger") },
    { label: "Actions", items: nodes.filter((n) => n.category === "action") },
    { label: "Logic", items: nodes.filter((n) => n.category === "logic") },
    { label: "Utility", items: nodes.filter((n) => n.category === "utility") },
    { label: "End", items: nodes.filter((n) => n.category === "end") },
  ];

  return (
    <div className="w-[220px] border-r bg-white flex flex-col">
      <div className="px-4 py-3 border-b">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Node Library
        </p>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-4">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-[11px] font-medium text-muted-foreground mb-1.5">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((node) => {
                const Icon = iconMap[node.icon] || Zap;
                const colors = colorMap[node.color] || colorMap.gray;
                return (
                  <button
                    key={node.id}
                    onClick={() => onAddNode(node)}
                    className={`flex items-center gap-2 w-full rounded-lg border border-l-4 px-2.5 py-2 cursor-grab active:cursor-grabbing hover:shadow-sm transition-all text-left ${colors}`}
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="flex-1 text-xs font-medium">{node.label}</span>
                    <GripVertical className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
