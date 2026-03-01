import { db } from "@/lib/db";
import {
  signals as signalsTable,
  signalAccounts,
  sequences as sequencesTable,
  sequenceEnrollments,
  integrations as integrationsTable,
  notifications as notificationsTable,
  deals,
  attributionEvents,
  kpiSnapshots,
} from "@/lib/db/schema";
import { eq, desc, asc, gte, ilike, or, sql, count, sum } from "drizzle-orm";
import { workflowNodes } from "@/lib/mock/workflow-nodes";
import type {
  DashboardData, Signal, SignalCategoryCount, Sequence,
  KpiMetric, Account, ChartDataPoint, AttributionEvent,
  WorkflowNode, Integration, Notification, SignalFilter,
} from "@/lib/types/models";

// ─── Helpers ───────────────────────────────────────────────────

function timeAgo(date: Date | null): string {
  if (!date) return "Never";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

function formatCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n}`;
}

// ─── Dashboard ─────────────────────────────────────────────────

export async function getDashboardData(workspaceId = "ws-001"): Promise<DashboardData> {
  const [signalCount, accountCount, pipelineResult, closedResult, snapshots] = await Promise.all([
    db.select({ count: count() }).from(signalsTable).where(eq(signalsTable.workspaceId, workspaceId)),
    db.select({ count: count() }).from(signalAccounts).where(eq(signalAccounts.workspaceId, workspaceId)),
    db.select({ total: sum(deals.value) }).from(deals)
      .where(sql`${deals.workspaceId} = ${workspaceId} AND ${deals.stage} NOT IN ('closed-won', 'closed-lost')`),
    db.select({ total: sum(deals.value) }).from(deals)
      .where(sql`${deals.workspaceId} = ${workspaceId} AND ${deals.stage} = 'closed-won'`),
    db.select().from(kpiSnapshots)
      .where(eq(kpiSnapshots.workspaceId, workspaceId))
      .orderBy(asc(kpiSnapshots.period)),
  ]);

  const pipelineTotal = Number(pipelineResult[0]?.total ?? 0);
  const closedTotal = Number(closedResult[0]?.total ?? 0);
  const winRate = pipelineTotal + closedTotal > 0 ? Math.round((closedTotal / (pipelineTotal + closedTotal)) * 100) : 0;

  const kpis: KpiMetric[] = [
    {
      label: "Active Signals",
      value: signalCount[0].count.toString(),
      trend: { value: "+18%", direction: "up" },
      icon: "activity",
      chartData: [30, 45, 35, 50, 42, 55, signalCount[0].count],
    },
    {
      label: "Pipeline Value",
      value: formatCurrency(pipelineTotal),
      trend: { value: "+12%", direction: "up" },
      icon: "dollar-sign",
      chartData: [40, 38, 52, 48, 60, 55, 70],
    },
    {
      label: "Accounts Engaged",
      value: formatCount(accountCount[0].count),
      trend: { value: "+7%", direction: "up" },
      icon: "users",
      chartData: [20, 25, 30, 28, 35, 38, accountCount[0].count],
    },
    {
      label: "Win Rate",
      value: `${winRate}%`,
      trend: { value: "-2%", direction: "down" },
      icon: "trophy",
      chartData: [38, 36, 34, 35, 33, 34, winRate],
    },
  ];

  // Build chart from KPI snapshots
  const monthMap = new Map<string, { pipeline: number; closed: number }>();
  for (const s of snapshots) {
    if (!monthMap.has(s.period)) monthMap.set(s.period, { pipeline: 0, closed: 0 });
    const entry = monthMap.get(s.period)!;
    if (s.metric === "pipeline") entry.pipeline = s.value / 1000;
    if (s.metric === "closed") entry.closed = s.value / 1000;
  }

  const chartData: ChartDataPoint[] = Array.from(monthMap.entries()).map(([period, data]) => {
    const month = new Date(period + "-01").toLocaleDateString("en-US", { month: "short" });
    return { month, pipeline: data.pipeline, closed: data.closed };
  });

  return { kpis, chartData };
}

// ─── Signals ───────────────────────────────────────────────────

export async function getSignals(filter?: SignalFilter, workspaceId = "ws-001"): Promise<Signal[]> {
  const conditions = [eq(signalsTable.workspaceId, workspaceId)];

  if (filter?.category) {
    conditions.push(eq(signalsTable.category, filter.category));
  }
  if (filter?.impact) {
    conditions.push(eq(signalsTable.impact, filter.impact));
  }
  if (filter?.minConfidence) {
    conditions.push(gte(signalsTable.confidence, filter.minConfidence));
  }

  let orderBy: ReturnType<typeof desc> = desc(signalsTable.createdAt);
  if (filter?.sortBy === "confidence") {
    orderBy = desc(signalsTable.confidence);
  } else if (filter?.sortBy === "impact") {
    orderBy = sql`CASE ${signalsTable.impact} WHEN 'high' THEN 3 WHEN 'medium' THEN 2 ELSE 1 END DESC`;
  }

  const rows = await db
    .select({
      id: signalsTable.id,
      signalType: signalsTable.signalType,
      category: signalsTable.category,
      description: signalsTable.description,
      confidence: signalsTable.confidence,
      confidenceLevel: signalsTable.confidenceLevel,
      impact: signalsTable.impact,
      explanation: signalsTable.explanation,
      suggestedAction: signalsTable.suggestedAction,
      tags: signalsTable.tags,
      createdAt: signalsTable.createdAt,
      accountName: signalAccounts.name,
      accountAvatar: signalAccounts.avatar,
    })
    .from(signalsTable)
    .leftJoin(signalAccounts, eq(signalsTable.accountId, signalAccounts.id))
    .where(sql`${sql.join(conditions, sql` AND `)}`)
    .orderBy(orderBy);

  let result: Signal[] = rows.map((r) => ({
    id: r.id,
    accountName: r.accountName ?? "Unknown",
    accountAvatar: r.accountAvatar ?? "??",
    signalType: r.signalType,
    category: r.category as Signal["category"],
    description: r.description,
    confidence: r.confidence,
    confidenceLevel: r.confidenceLevel as Signal["confidenceLevel"],
    tags: (r.tags as string[]) ?? [],
    recency: timeAgo(r.createdAt),
    impact: r.impact as Signal["impact"],
    explanation: r.explanation ?? undefined,
    suggestedAction: r.suggestedAction ?? undefined,
  }));

  // Client-side search (DB search is optional optimization later)
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.accountName.toLowerCase().includes(q) ||
        s.signalType.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }

  return result;
}

export async function getSignalCategories(workspaceId = "ws-001"): Promise<SignalCategoryCount[]> {
  const rows = await db
    .select({
      category: signalsTable.category,
      count: count(),
    })
    .from(signalsTable)
    .where(eq(signalsTable.workspaceId, workspaceId))
    .groupBy(signalsTable.category);

  const categoryMeta: Record<string, { label: string; icon: string }> = {
    "product-analytics": { label: "Product Analytics", icon: "bar-chart-3" },
    firmographics: { label: "Firmographics", icon: "building-2" },
    "crm-data": { label: "CRM Data", icon: "database" },
    "marketing-engagement": { label: "Marketing Eng.", icon: "megaphone" },
    "external-news": { label: "External News", icon: "newspaper" },
  };

  return rows.map((r) => ({
    category: r.category as SignalCategoryCount["category"],
    label: categoryMeta[r.category]?.label ?? r.category,
    count: r.count,
    icon: categoryMeta[r.category]?.icon ?? "circle",
  }));
}

// ─── Sequences ─────────────────────────────────────────────────

export async function getSequences(workspaceId = "ws-001"): Promise<Sequence[]> {
  const rows = await db
    .select({
      id: sequencesTable.id,
      name: sequencesTable.name,
      channels: sequencesTable.channels,
      status: sequencesTable.status,
      steps: sequencesTable.steps,
      openRate: sequencesTable.openRate,
      replyRate: sequencesTable.replyRate,
      meetingsBooked: sequencesTable.meetingsBooked,
      progress: sequencesTable.progress,
      enrollmentCount: count(sequenceEnrollments.id),
    })
    .from(sequencesTable)
    .leftJoin(sequenceEnrollments, eq(sequencesTable.id, sequenceEnrollments.sequenceId))
    .where(eq(sequencesTable.workspaceId, workspaceId))
    .groupBy(sequencesTable.id);

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    channels: (r.channels ?? []) as Sequence["channels"],
    enrolled: r.enrollmentCount,
    steps: Array.isArray(r.steps) ? r.steps.length : 0,
    openRate: r.openRate ?? 0,
    replyRate: r.replyRate ?? 0,
    meetingsBooked: r.meetingsBooked ?? 0,
    status: r.status as Sequence["status"],
    progress: r.progress ?? 0,
  }));
}

export async function getOrchestrationKpis(workspaceId = "ws-001"): Promise<KpiMetric[]> {
  const [seqRows, enrollmentCount] = await Promise.all([
    db.select().from(sequencesTable).where(eq(sequencesTable.workspaceId, workspaceId)),
    db.select({ count: count() }).from(sequenceEnrollments)
      .innerJoin(sequencesTable, eq(sequenceEnrollments.sequenceId, sequencesTable.id))
      .where(eq(sequencesTable.workspaceId, workspaceId)),
  ]);

  const activeCount = seqRows.filter((s) => s.status === "active").length;
  const avgOpenRate = seqRows.length > 0
    ? Math.round(seqRows.reduce((sum, s) => sum + (s.openRate ?? 0), 0) / seqRows.length)
    : 0;
  const totalMeetings = seqRows.reduce((sum, s) => sum + (s.meetingsBooked ?? 0), 0);

  return [
    { label: "Active Sequences", value: activeCount.toString(), icon: "play-circle", chartData: [1, 2, 2, 3, 3, 3, activeCount] },
    { label: "Enrolled Contacts", value: formatCount(enrollmentCount[0].count), icon: "users", chartData: [800, 920, 1050, 1180, 1260, 1350, enrollmentCount[0].count] },
    { label: "Avg Open Rate", value: `${avgOpenRate}%`, icon: "mail-open", chartData: [55, 58, 62, 64, 66, 67, avgOpenRate] },
    { label: "Meetings Booked", value: totalMeetings.toString(), icon: "calendar", chartData: [12, 18, 24, 30, 35, 41, totalMeetings] },
  ];
}

// ─── Accounts ──────────────────────────────────────────────────

export async function getAccounts(workspaceId = "ws-001"): Promise<Account[]> {
  const rows = await db
    .select()
    .from(signalAccounts)
    .where(eq(signalAccounts.workspaceId, workspaceId))
    .orderBy(desc(signalAccounts.score));

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    avatar: r.avatar ?? r.name.slice(0, 2).toUpperCase(),
    industry: r.industry ?? "",
    score: r.score ?? 0,
  }));
}

// ─── Attribution ───────────────────────────────────────────────

export async function getAttributionKpis(workspaceId = "ws-001"): Promise<KpiMetric[]> {
  const [revenueResult, dealRows] = await Promise.all([
    db.select({ total: sum(attributionEvents.revenue) })
      .from(attributionEvents)
      .where(eq(attributionEvents.workspaceId, workspaceId)),
    db.select()
      .from(deals)
      .where(sql`${deals.workspaceId} = ${workspaceId} AND ${deals.stage} = 'closed-won'`),
  ]);

  const totalRevenue = Number(revenueResult[0]?.total ?? 0);
  const avgDealSize = dealRows.length > 0
    ? Math.round(dealRows.reduce((sum, d) => sum + (d.value ?? 0), 0) / dealRows.length)
    : 0;
  const signalCloseRate = 34; // TODO: compute from actual data

  return [
    { label: "Signal-Attributed Revenue", value: formatCurrency(totalRevenue), trend: { value: "+24%", direction: "up" }, icon: "trending-up", chartData: [120, 140, 160, 155, 180, 195, 210] },
    { label: "Avg Deal Size", value: formatCurrency(avgDealSize), trend: { value: "+8%", direction: "up" }, icon: "banknote", chartData: [28, 29, 30, 31, 30, 32, 33] },
    { label: "Signal→Close Rate", value: `${signalCloseRate}%`, trend: { value: "+5%", direction: "up" }, icon: "target", chartData: [26, 28, 29, 30, 31, 33, 34] },
    { label: "Time to Close", value: "18 days", trend: { value: "-3 days", direction: "up" }, icon: "clock", chartData: [24, 23, 22, 21, 20, 19, 18] },
  ];
}

export async function getAttributionChartData(workspaceId = "ws-001"): Promise<ChartDataPoint[]> {
  const snapshots = await db
    .select()
    .from(kpiSnapshots)
    .where(sql`${kpiSnapshots.workspaceId} = ${workspaceId} AND ${kpiSnapshots.metric} IN ('signal_revenue', 'direct_revenue')`)
    .orderBy(asc(kpiSnapshots.period));

  const monthMap = new Map<string, { signal: number; direct: number }>();
  for (const s of snapshots) {
    if (!monthMap.has(s.period)) monthMap.set(s.period, { signal: 0, direct: 0 });
    const entry = monthMap.get(s.period)!;
    if (s.metric === "signal_revenue") entry.signal = s.value / 1000;
    if (s.metric === "direct_revenue") entry.direct = s.value / 1000;
  }

  return Array.from(monthMap.entries()).map(([period, data]) => {
    const month = new Date(period + "-01").toLocaleDateString("en-US", { month: "short" });
    return { month, signal: data.signal, direct: data.direct };
  });
}

export async function getFunnelData(workspaceId = "ws-001"): Promise<AttributionEvent[]> {
  const [signalCount, accountCount, dealCount, wonDeals] = await Promise.all([
    db.select({ count: count() }).from(signalsTable).where(eq(signalsTable.workspaceId, workspaceId)),
    db.select({ count: count() }).from(signalAccounts).where(eq(signalAccounts.workspaceId, workspaceId)),
    db.select({ count: count() }).from(deals).where(eq(deals.workspaceId, workspaceId)),
    db.select({ count: count(), total: sum(deals.value) }).from(deals)
      .where(sql`${deals.workspaceId} = ${workspaceId} AND ${deals.stage} = 'closed-won'`),
  ]);

  const signals = signalCount[0].count;
  const accounts = accountCount[0].count;
  const totalDeals = dealCount[0].count;
  const won = wonDeals[0].count;
  const revenue = Number(wonDeals[0].total ?? 0);

  return [
    { label: "Signals Detected", value: signals, percentage: 100 },
    { label: "Accounts Engaged", value: accounts, percentage: signals > 0 ? Math.round((accounts / signals) * 100) : 0 },
    { label: "Opportunities Created", value: totalDeals, percentage: signals > 0 ? Math.round((totalDeals / signals) * 100) : 0 },
    { label: "Deals Won", value: won, percentage: signals > 0 ? Math.round((won / signals) * 100) : 0 },
    { label: "Revenue Attributed", value: revenue, percentage: 100 },
  ];
}

// ─── Workflows (static config - node types don't come from DB) ─

export async function getWorkflowNodes(): Promise<WorkflowNode[]> {
  return workflowNodes;
}

// ─── Integrations ──────────────────────────────────────────────

export async function getIntegrations(workspaceId = "ws-001"): Promise<Integration[]> {
  const rows = await db
    .select()
    .from(integrationsTable)
    .where(eq(integrationsTable.workspaceId, workspaceId));

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    avatar: r.avatar ?? r.name.slice(0, 2).toUpperCase(),
    avatarColor: r.avatarColor ?? "bg-gray-500",
    category: r.category ?? "Other",
    status: r.status as Integration["status"],
    isNative: r.isNative ?? false,
    description: r.description ?? "",
    lastSync: timeAgo(r.lastSyncAt),
    recordCount: formatCount(r.recordCount ?? 0),
    objectsSynced: (r.objectsSynced as string[]) ?? [],
  }));
}

export async function getIntegrationKpis(workspaceId = "ws-001"): Promise<KpiMetric[]> {
  const [connectedResult, totalRecords] = await Promise.all([
    db.select({ count: count() }).from(integrationsTable)
      .where(sql`${integrationsTable.workspaceId} = ${workspaceId} AND ${integrationsTable.status} = 'connected'`),
    db.select({ total: sum(integrationsTable.recordCount) }).from(integrationsTable)
      .where(eq(integrationsTable.workspaceId, workspaceId)),
  ]);

  return [
    { label: "Connected", value: connectedResult[0].count.toString(), icon: "plug", chartData: [2, 3, 4, 4, 5, 6, connectedResult[0].count] },
    { label: "Records Synced", value: formatCount(Number(totalRecords[0].total ?? 0)), icon: "refresh-cw", chartData: [20, 25, 30, 35, 40, 45, 48] },
    { label: "API Calls Today", value: "12,840", icon: "activity", chartData: [8000, 9200, 10500, 11000, 11800, 12400, 12840] },
    { label: "Data Region", value: "US-East", icon: "shield", chartData: [] },
  ];
}

// ─── Notifications ─────────────────────────────────────────────

export async function getNotifications(userId = "demo-user-001"): Promise<Notification[]> {
  const rows = await db
    .select()
    .from(notificationsTable)
    .where(eq(notificationsTable.userId, userId))
    .orderBy(desc(notificationsTable.createdAt))
    .limit(20);

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description ?? "",
    time: timeAgo(r.createdAt),
    read: r.read ?? false,
    type: r.type as Notification["type"],
  }));
}
