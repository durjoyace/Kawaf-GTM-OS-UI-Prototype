import { AttributionEvent, ChartDataPoint, KpiMetric } from "@/lib/types/models";

export const attributionKpis: KpiMetric[] = [
  { label: "Signal-Attributed Revenue", value: "$2.1M", trend: { value: "+24%", direction: "up" }, icon: "trending-up", chartData: [120, 140, 160, 155, 180, 195, 210] },
  { label: "Avg Deal Size", value: "$32.8K", trend: { value: "+8%", direction: "up" }, icon: "banknote", chartData: [28, 29, 30, 31, 30, 32, 33] },
  { label: "Signal→Close Rate", value: "34%", trend: { value: "+5%", direction: "up" }, icon: "target", chartData: [26, 28, 29, 30, 31, 33, 34] },
  { label: "Time to Close", value: "18 days", trend: { value: "-3 days", direction: "up" }, icon: "clock", chartData: [24, 23, 22, 21, 20, 19, 18] },
];

export const attributionChartData: ChartDataPoint[] = [
  { month: "Sep", signal: 85, direct: 60 },
  { month: "Oct", signal: 110, direct: 65 },
  { month: "Nov", signal: 95, direct: 58 },
  { month: "Dec", signal: 140, direct: 70 },
  { month: "Jan", signal: 165, direct: 75 },
  { month: "Feb", signal: 210, direct: 80 },
];

export const funnelData: AttributionEvent[] = [
  { label: "Signals Detected", value: 1240, percentage: 100 },
  { label: "Accounts Engaged", value: 842, percentage: 68 },
  { label: "Opportunities Created", value: 284, percentage: 23 },
  { label: "Deals Won", value: 96, percentage: 8 },
  { label: "Revenue Attributed", value: 2100000, percentage: 100 },
];
