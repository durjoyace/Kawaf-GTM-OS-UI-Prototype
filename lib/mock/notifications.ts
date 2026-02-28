import { Notification } from "@/lib/types/models";

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "High-confidence signal detected",
    description: "Acme Corp shows 3x API usage spike — 92% confidence",
    time: "2 min ago",
    read: false,
    type: "signal",
  },
  {
    id: "n2",
    title: "Sequence milestone reached",
    description: "Q1 Enterprise Expansion hit 300 enrollments",
    time: "1 hour ago",
    read: false,
    type: "sequence",
  },
  {
    id: "n3",
    title: "Salesforce sync completed",
    description: "24.2K records synced successfully",
    time: "2 hours ago",
    read: true,
    type: "integration",
  },
  {
    id: "n4",
    title: "New funding signal",
    description: "TechFlow Inc. raised $42M Series B",
    time: "5 hours ago",
    read: true,
    type: "signal",
  },
];
