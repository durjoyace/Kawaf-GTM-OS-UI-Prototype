import { Integration, KpiMetric } from "@/lib/types/models";

export const integrationKpis: KpiMetric[] = [
  { label: "Connected", value: "6", icon: "plug", chartData: [2, 3, 4, 4, 5, 6, 6] },
  { label: "Records Synced", value: "48.4K", icon: "refresh-cw", chartData: [20, 25, 30, 35, 40, 45, 48] },
  { label: "API Calls Today", value: "12,840", icon: "activity", chartData: [8000, 9200, 10500, 11000, 11800, 12400, 12840] },
  { label: "Data Region", value: "US-East", icon: "shield", chartData: [] },
];

export const integrations: Integration[] = [
  {
    id: "1",
    name: "Salesforce",
    avatar: "SF",
    avatarColor: "bg-blue-500",
    category: "CRM",
    status: "connected",
    isNative: true,
    description: "Bi-directional sync for accounts, contacts, opportunities, and activities.",
    lastSync: "2 min ago",
    recordCount: "24.2K",
  },
  {
    id: "2",
    name: "HubSpot",
    avatar: "HS",
    avatarColor: "bg-orange-500",
    category: "CRM",
    status: "connected",
    isNative: true,
    description: "Marketing automation sync including campaigns, forms, and lead scoring.",
    lastSync: "5 min ago",
    recordCount: "12.8K",
  },
  {
    id: "3",
    name: "Outreach",
    avatar: "OR",
    avatarColor: "bg-purple-500",
    category: "Sales Engagement",
    status: "connected",
    isNative: true,
    description: "Sequence enrollment, email tracking, and meeting scheduling sync.",
    lastSync: "8 min ago",
    recordCount: "8.1K",
  },
  {
    id: "4",
    name: "LinkedIn Sales Nav",
    avatar: "LI",
    avatarColor: "bg-blue-700",
    category: "Social",
    status: "connected",
    isNative: false,
    description: "InMail tracking, profile views, and connection request monitoring.",
    lastSync: "15 min ago",
    recordCount: "3.3K",
  },
];
