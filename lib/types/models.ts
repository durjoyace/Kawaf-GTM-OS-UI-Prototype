export type ChannelType = "linkedin" | "email" | "sms" | "slack" | "calendar" | "webhook";

export type SignalCategory = "product-analytics" | "firmographics" | "crm-data" | "marketing-engagement" | "external-news";

export type ConfidenceLevel = "high" | "medium" | "low";

export type IntegrationStatus = "connected" | "disconnected" | "error" | "pending";

export interface KpiMetric {
  label: string;
  value: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  icon: string;
  chartData?: number[];
}

export interface Signal {
  id: string;
  accountName: string;
  accountAvatar: string;
  signalType: string;
  category: SignalCategory;
  description: string;
  confidence: number;
  confidenceLevel: ConfidenceLevel;
  tags: string[];
  recency: string;
  impact: "high" | "medium" | "low";
}

export interface SignalCategoryCount {
  category: SignalCategory;
  label: string;
  count: number;
  icon: string;
}

export interface Account {
  id: string;
  name: string;
  avatar: string;
  industry: string;
  score: number;
  role?: string;
}

export interface Sequence {
  id: string;
  name: string;
  channels: ChannelType[];
  enrolled: number;
  steps: number;
  openRate: number;
  status: "active" | "paused" | "draft";
  progress: number;
}

export interface MessageVariant {
  id: string;
  channel: ChannelType;
  subject: string;
  preview: string;
  openRate: number;
  replyRate: number;
}

export interface AttributionEvent {
  label: string;
  value: number;
  percentage: number;
}

export interface Integration {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  category: string;
  status: IntegrationStatus;
  isNative: boolean;
  description: string;
  lastSync: string;
  recordCount: string;
}

export interface WorkflowNode {
  id: string;
  label: string;
  icon: string;
  category: "trigger" | "action" | "logic" | "utility" | "end";
  color: string;
}

export interface ChartDataPoint {
  month: string;
  pipeline?: number;
  closed?: number;
  signal?: number;
  direct?: number;
}

export interface DashboardData {
  kpis: KpiMetric[];
  chartData: ChartDataPoint[];
}
