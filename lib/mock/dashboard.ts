import { DashboardData } from "@/lib/types/models";

export const dashboardData: DashboardData = {
  kpis: [
    {
      label: "Active Signals",
      value: "247",
      trend: { value: "+18%", direction: "up" },
      icon: "activity",
      chartData: [30, 45, 35, 50, 42, 55, 65],
    },
    {
      label: "Pipeline Value",
      value: "$2.4M",
      trend: { value: "+12%", direction: "up" },
      icon: "dollar-sign",
      chartData: [40, 38, 52, 48, 60, 55, 70],
    },
    {
      label: "Accounts Engaged",
      value: "1,842",
      trend: { value: "+7%", direction: "up" },
      icon: "users",
      chartData: [20, 25, 30, 28, 35, 38, 42],
    },
    {
      label: "Win Rate",
      value: "34%",
      trend: { value: "-2%", direction: "down" },
      icon: "trophy",
      chartData: [38, 36, 34, 35, 33, 34, 32],
    },
  ],
  chartData: [
    { month: "Aug", pipeline: 180, closed: 80 },
    { month: "Sep", pipeline: 220, closed: 95 },
    { month: "Oct", pipeline: 260, closed: 110 },
    { month: "Nov", pipeline: 240, closed: 130 },
    { month: "Dec", pipeline: 300, closed: 140 },
    { month: "Jan", pipeline: 340, closed: 160 },
    { month: "Feb", pipeline: 380, closed: 180 },
  ],
};
