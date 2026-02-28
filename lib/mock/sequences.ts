import { KpiMetric, Sequence } from "@/lib/types/models";

export const orchestrationKpis: KpiMetric[] = [
  { label: "Active Sequences", value: "3", icon: "play-circle", chartData: [1, 2, 2, 3, 3, 3, 3] },
  { label: "Enrolled Contacts", value: "1,426", icon: "users", chartData: [800, 920, 1050, 1180, 1260, 1350, 1426] },
  { label: "Avg Open Rate", value: "68%", icon: "mail-open", chartData: [55, 58, 62, 64, 66, 67, 68] },
  { label: "Meetings Booked", value: "47", icon: "calendar", chartData: [12, 18, 24, 30, 35, 41, 47] },
];

export const sequences: Sequence[] = [
  {
    id: "seq-001",
    name: "Q1 Enterprise Expansion",
    channels: ["linkedin", "email", "slack"],
    enrolled: 312,
    steps: 7,
    openRate: 68,
    replyRate: 24,
    meetingsBooked: 18,
    status: "active",
    progress: 65,
  },
  {
    id: "seq-002",
    name: "SaaS Mid-Market Outbound",
    channels: ["email", "linkedin", "sms"],
    enrolled: 856,
    steps: 5,
    openRate: 72,
    replyRate: 19,
    meetingsBooked: 22,
    status: "active",
    progress: 45,
  },
  {
    id: "seq-003",
    name: "Churn Prevention - At-Risk",
    channels: ["email", "slack", "calendar"],
    enrolled: 258,
    steps: 4,
    openRate: 54,
    replyRate: 31,
    meetingsBooked: 7,
    status: "active",
    progress: 80,
  },
];
