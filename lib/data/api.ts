import { dashboardData } from "@/lib/mock/dashboard";
import { signals, signalCategories } from "@/lib/mock/signals";
import { sequences, orchestrationKpis } from "@/lib/mock/sequences";
import { accounts } from "@/lib/mock/accounts";
import { attributionKpis, attributionChartData, funnelData } from "@/lib/mock/attribution";
import { workflowNodes } from "@/lib/mock/workflow-nodes";
import { integrations, integrationKpis } from "@/lib/mock/integrations";
import type { DashboardData, Signal, SignalCategoryCount, Sequence, KpiMetric, Account, ChartDataPoint, AttributionEvent, WorkflowNode, Integration } from "@/lib/types/models";

export async function getDashboardData(): Promise<DashboardData> {
  return dashboardData;
}

export async function getSignals(): Promise<Signal[]> {
  return signals;
}

export async function getSignalCategories(): Promise<SignalCategoryCount[]> {
  return signalCategories;
}

export async function getSequences(): Promise<Sequence[]> {
  return sequences;
}

export async function getOrchestrationKpis(): Promise<KpiMetric[]> {
  return orchestrationKpis;
}

export async function getAccounts(): Promise<Account[]> {
  return accounts;
}

export async function getAttributionKpis(): Promise<KpiMetric[]> {
  return attributionKpis;
}

export async function getAttributionChartData(): Promise<ChartDataPoint[]> {
  return attributionChartData;
}

export async function getFunnelData(): Promise<AttributionEvent[]> {
  return funnelData;
}

export async function getWorkflowNodes(): Promise<WorkflowNode[]> {
  return workflowNodes;
}

export async function getIntegrations(): Promise<Integration[]> {
  return integrations;
}

export async function getIntegrationKpis(): Promise<KpiMetric[]> {
  return integrationKpis;
}
