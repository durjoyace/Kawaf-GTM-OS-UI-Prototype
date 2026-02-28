import { WorkflowNode } from "@/lib/types/models";

export const workflowNodes: WorkflowNode[] = [
  { id: "1", label: "Signal Trigger", icon: "zap", category: "trigger", color: "green" },
  { id: "2", label: "CRM Event", icon: "database", category: "trigger", color: "green" },
  { id: "3", label: "Send Email", icon: "mail", category: "action", color: "blue" },
  { id: "4", label: "LinkedIn DM", icon: "linkedin", category: "action", color: "blue" },
  { id: "5", label: "Send SMS", icon: "message-square", category: "action", color: "blue" },
  { id: "6", label: "Webhook", icon: "webhook", category: "action", color: "blue" },
  { id: "7", label: "If/Else Branch", icon: "git-branch", category: "logic", color: "amber" },
  { id: "8", label: "Filter", icon: "filter", category: "logic", color: "amber" },
  { id: "9", label: "Wait / Delay", icon: "clock", category: "utility", color: "gray" },
  { id: "10", label: "End / Goal", icon: "flag", category: "end", color: "green" },
];
