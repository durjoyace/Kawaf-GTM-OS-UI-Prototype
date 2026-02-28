import { dashboardData } from "@/lib/mock/dashboard";
import { signals, signalCategories } from "@/lib/mock/signals";
import { sequences, orchestrationKpis } from "@/lib/mock/sequences";
import { accounts } from "@/lib/mock/accounts";
import { attributionKpis, attributionChartData, funnelData } from "@/lib/mock/attribution";
import { workflowNodes } from "@/lib/mock/workflow-nodes";
import { integrations, integrationKpis } from "@/lib/mock/integrations";
import { notifications } from "@/lib/mock/notifications";
import type {
  DashboardData, Signal, SignalCategoryCount, Sequence,
  KpiMetric, Account, ChartDataPoint, AttributionEvent,
  WorkflowNode, Integration, Notification, SignalFilter,
} from "@/lib/types/models";

/** Simulate network latency (250-600ms) */
async function simulate<T>(data: T): Promise<T> {
  if (typeof window !== "undefined") {
    const delay = 250 + Math.random() * 350;
    await new Promise((r) => setTimeout(r, delay));
  }
  return data;
}

export async function getDashboardData(): Promise<DashboardData> {
  return simulate(dashboardData);
}

export async function getSignals(filter?: SignalFilter): Promise<Signal[]> {
  let result = [...signals];
  if (filter?.category) {
    result = result.filter((s) => s.category === filter.category);
  }
  if (filter?.impact) {
    result = result.filter((s) => s.impact === filter.impact);
  }
  if (filter?.minConfidence) {
    result = result.filter((s) => s.confidence >= filter.minConfidence!);
  }
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.accountName.toLowerCase().includes(q) ||
        s.signalType.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }
  if (filter?.sortBy === "confidence") {
    result.sort((a, b) => b.confidence - a.confidence);
  } else if (filter?.sortBy === "impact") {
    const order = { high: 3, medium: 2, low: 1 };
    result.sort((a, b) => order[b.impact] - order[a.impact]);
  }
  return simulate(result);
}

export async function getSignalCategories(): Promise<SignalCategoryCount[]> {
  return simulate(signalCategories);
}

export async function getSequences(): Promise<Sequence[]> {
  return simulate(sequences);
}

export async function getOrchestrationKpis(): Promise<KpiMetric[]> {
  return simulate(orchestrationKpis);
}

export async function getAccounts(): Promise<Account[]> {
  return simulate(accounts);
}

export async function getAttributionKpis(): Promise<KpiMetric[]> {
  return simulate(attributionKpis);
}

export async function getAttributionChartData(): Promise<ChartDataPoint[]> {
  return simulate(attributionChartData);
}

export async function getFunnelData(): Promise<AttributionEvent[]> {
  return simulate(funnelData);
}

export async function getWorkflowNodes(): Promise<WorkflowNode[]> {
  return simulate(workflowNodes);
}

export async function getIntegrations(): Promise<Integration[]> {
  return simulate(integrations);
}

export async function getIntegrationKpis(): Promise<KpiMetric[]> {
  return simulate(integrationKpis);
}

export async function getNotifications(): Promise<Notification[]> {
  return simulate(notifications);
}
