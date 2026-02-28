import { WorkflowNode } from "@/lib/types/models";

export const workflowNodes: WorkflowNode[] = [
  { id: "wn-1", label: "Signal Trigger", icon: "zap", category: "trigger", color: "green", description: "Starts workflow when a buying signal is detected" },
  { id: "wn-2", label: "CRM Event", icon: "database", category: "trigger", color: "green", description: "Triggers on CRM field changes or stage transitions" },
  { id: "wn-3", label: "Send Email", icon: "mail", category: "action", color: "blue", description: "Send a personalized email to the contact" },
  { id: "wn-4", label: "LinkedIn DM", icon: "linkedin", category: "action", color: "blue", description: "Send a LinkedIn direct message" },
  { id: "wn-5", label: "Send SMS", icon: "message-square", category: "action", color: "blue", description: "Send an SMS message to mobile" },
  { id: "wn-6", label: "Webhook", icon: "webhook", category: "action", color: "blue", description: "Send data to an external webhook URL" },
  { id: "wn-7", label: "If/Else Branch", icon: "git-branch", category: "logic", color: "amber", description: "Split flow based on conditions" },
  { id: "wn-8", label: "Filter", icon: "filter", category: "logic", color: "amber", description: "Filter contacts based on attributes" },
  { id: "wn-9", label: "Wait / Delay", icon: "clock", category: "utility", color: "gray", description: "Pause execution for a set duration" },
  { id: "wn-10", label: "End / Goal", icon: "flag", category: "end", color: "green", description: "Mark goal as achieved and end workflow" },
];
