import { Zap, Database, Mail, Linkedin, MessageSquare, Webhook, GitBranch, Filter, Clock, Flag, GripVertical } from "lucide-react";
import type { WorkflowNode } from "@/lib/types/models";

const iconMap: Record<string, React.ElementType> = {
  zap: Zap,
  database: Database,
  mail: Mail,
  linkedin: Linkedin,
  "message-square": MessageSquare,
  webhook: Webhook,
  "git-branch": GitBranch,
  filter: Filter,
  clock: Clock,
  flag: Flag,
};

const colorMap: Record<string, string> = {
  green: "border-l-green-500 bg-green-50/50",
  blue: "border-l-blue-500 bg-blue-50/50",
  amber: "border-l-amber-500 bg-amber-50/50",
  gray: "border-l-gray-400 bg-gray-50/50",
};

export function NodeTile({ node }: { node: WorkflowNode }) {
  const Icon = iconMap[node.icon] || Zap;
  const colors = colorMap[node.color] || colorMap.gray;

  return (
    <div className={`flex items-center gap-3 rounded-lg border border-l-4 px-3 py-2.5 cursor-grab hover:shadow-sm transition-shadow ${colors}`}>
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="flex-1 text-sm font-medium">{node.label}</span>
      <GripVertical className="h-4 w-4 text-muted-foreground/40" />
    </div>
  );
}
