"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  Zap, Database, Mail, Linkedin, MessageSquare, Webhook,
  GitBranch, Filter, Clock, Flag,
} from "lucide-react";
import type { WorkflowNodeData } from "@/lib/types/models";

const iconMap: Record<string, React.ElementType> = {
  zap: Zap, database: Database, mail: Mail, linkedin: Linkedin,
  "message-square": MessageSquare, webhook: Webhook,
  "git-branch": GitBranch, filter: Filter, clock: Clock, flag: Flag,
};

const colorStyles: Record<string, { bg: string; border: string; icon: string }> = {
  green: { bg: "bg-green-50", border: "border-green-300", icon: "text-green-600" },
  blue: { bg: "bg-blue-50", border: "border-blue-300", icon: "text-blue-600" },
  amber: { bg: "bg-amber-50", border: "border-amber-300", icon: "text-amber-600" },
  gray: { bg: "bg-gray-50", border: "border-gray-300", icon: "text-gray-500" },
};

function CustomNodeComponent({ data, selected }: NodeProps & { data: WorkflowNodeData }) {
  const Icon = iconMap[data.icon] || Zap;
  const colors = colorStyles[data.color] || colorStyles.gray;

  return (
    <div
      className={`rounded-xl border-2 px-4 py-3 min-w-[180px] shadow-sm transition-shadow ${colors.bg} ${
        selected ? "ring-2 ring-blue-400 ring-offset-2 shadow-md" : ""
      } ${colors.border}`}
    >
      {data.category !== "trigger" && (
        <Handle type="target" position={Position.Top} className="!bg-gray-400 !w-2.5 !h-2.5 !border-2 !border-white" />
      )}
      <div className="flex items-center gap-2.5">
        <div className={`rounded-lg p-1.5 ${colors.bg}`}>
          <Icon className={`h-4 w-4 ${colors.icon}`} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800">{data.label}</p>
          <p className="text-[10px] text-gray-500 capitalize">{data.category}</p>
        </div>
      </div>
      {data.category !== "end" && (
        <Handle type="source" position={Position.Bottom} className="!bg-gray-400 !w-2.5 !h-2.5 !border-2 !border-white" />
      )}
    </div>
  );
}

export const CustomNode = memo(CustomNodeComponent);
