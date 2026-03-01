import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { config } from "dotenv";
config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Seeding database...");

  // Create demo user
  const [user] = await db
    .insert(schema.users)
    .values({
      id: "demo-user-001",
      name: "Demo User",
      email: "demo@kawaf.io",
      emailVerified: new Date(),
      role: "admin",
    })
    .onConflictDoNothing()
    .returning();

  const userId = user?.id ?? "demo-user-001";
  console.log("✓ User created");

  // Create workspace
  const [workspace] = await db
    .insert(schema.workspaces)
    .values({
      id: "ws-001",
      name: "Kawaf Demo",
      slug: "kawaf-demo",
      ownerId: userId,
    })
    .onConflictDoNothing()
    .returning();

  const wsId = workspace?.id ?? "ws-001";

  await db
    .insert(schema.workspaceMembers)
    .values({ workspaceId: wsId, userId, role: "admin" })
    .onConflictDoNothing();

  console.log("✓ Workspace created");

  // Seed signal accounts
  const accountData = [
    { id: "acct-001", name: "Acme Corp", avatar: "AC", industry: "SaaS / Enterprise", score: 92 },
    { id: "acct-002", name: "TechFlow Inc.", avatar: "TF", industry: "FinTech / Mid-Market", score: 87 },
    { id: "acct-003", name: "DataBridge Co.", avatar: "DB", industry: "Data Analytics / SMB", score: 74 },
    { id: "acct-004", name: "Nexus Systems", avatar: "NS", industry: "Cybersecurity / Enterprise", score: 81 },
    { id: "acct-005", name: "CloudScale AI", avatar: "CA", industry: "AI / Mid-Market", score: 65 },
    { id: "acct-006", name: "FinServ Global", avatar: "FG", industry: "Financial Services / Enterprise", score: 58 },
  ];

  await db
    .insert(schema.signalAccounts)
    .values(accountData.map((a) => ({ ...a, workspaceId: wsId })))
    .onConflictDoNothing();

  console.log("✓ Signal accounts created");

  // Seed signals
  const signalData = [
    {
      id: "sig-001", accountId: "acct-001", signalType: "Product Usage Spike",
      category: "product-analytics",
      description: "3x increase in API calls over the past 7 days. Feature adoption score jumped from 45 to 82.",
      confidence: 92, confidenceLevel: "high", impact: "high",
      tags: ["Expansion", "Product-Led"],
      explanation: "This signal is triggered when API usage exceeds 200% of the 30-day average. Acme Corp's usage pattern correlates with expansion behavior seen in 78% of similar accounts that upgraded within 30 days.",
      suggestedAction: "Schedule a call with the VP Engineering to discuss enterprise tier upgrade and additional seat licenses.",
    },
    {
      id: "sig-002", accountId: "acct-002", signalType: "Funding Round",
      category: "external-news",
      description: "Series B funding of $42M announced. Likely expanding tech stack and team size.",
      confidence: 87, confidenceLevel: "high", impact: "high",
      tags: ["New Business", "Enterprise"],
      explanation: "Funding events are detected via Crunchbase and SEC filings. Companies raising Series B+ have a 3.2x higher conversion rate within 60 days of announcement.",
      suggestedAction: "Initiate outbound sequence targeting CTO and VP Engineering with a personalized value proposition.",
    },
    {
      id: "sig-003", accountId: "acct-003", signalType: "Contract Renewal",
      category: "crm-data",
      description: "Current contract expires in 45 days. Usage has declined 15% quarter-over-quarter.",
      confidence: 74, confidenceLevel: "medium", impact: "medium",
      tags: ["Retention", "At-Risk"],
      explanation: "Contract renewal signals combine CRM close dates with usage trends. Declining usage (-15%) paired with upcoming renewal indicates churn risk. Similar patterns show 40% churn probability.",
      suggestedAction: "Trigger churn prevention sequence. Schedule a QBR with the customer success team and key stakeholders.",
    },
    {
      id: "sig-004", accountId: "acct-004", signalType: "Competitor Evaluation",
      category: "marketing-engagement",
      description: "Visited competitor comparison page 4 times this week. Downloaded pricing guide.",
      confidence: 81, confidenceLevel: "high", impact: "high",
      tags: ["Competitive", "Urgent"],
      explanation: "Web analytics detected repeated visits to comparison and pricing pages, combined with content downloads. This behavior pattern precedes competitor switch in 62% of cases.",
      suggestedAction: "Send competitive battle card to AE. Escalate to sales leadership for executive engagement.",
    },
    {
      id: "sig-005", accountId: "acct-005", signalType: "Hiring Signal",
      category: "firmographics",
      description: "Posted 5 new engineering roles in the last 2 weeks. Growing team indicates expansion.",
      confidence: 65, confidenceLevel: "medium", impact: "medium",
      tags: ["Growth", "Mid-Market"],
      explanation: "Job posting signals are aggregated from LinkedIn and company career pages. 5+ engineering hires correlate with tool evaluation cycles in 45% of mid-market companies.",
      suggestedAction: "Add to mid-market outbound sequence with team-scaling messaging angle.",
    },
    {
      id: "sig-006", accountId: "acct-006", signalType: "Webinar Attendance",
      category: "marketing-engagement",
      description: "3 stakeholders attended the enterprise security webinar. Engaged with Q&A.",
      confidence: 58, confidenceLevel: "low", impact: "low",
      tags: ["Awareness", "Enterprise"],
      explanation: "Multi-stakeholder webinar attendance is a top-of-funnel signal. While confidence is lower, having 3 attendees from the same account indicates organizational interest.",
      suggestedAction: "Send follow-up content sequence with security-focused case studies.",
    },
  ];

  await db
    .insert(schema.signals)
    .values(signalData.map((s) => ({ ...s, workspaceId: wsId, processedAt: new Date() })))
    .onConflictDoNothing();

  console.log("✓ Signals created");

  // Seed sequences
  const seqData = [
    {
      id: "seq-001", name: "Q1 Enterprise Expansion",
      channels: ["linkedin", "email", "slack"],
      status: "active", openRate: 68, replyRate: 24, meetingsBooked: 18, progress: 65,
      steps: [
        { type: "email", subject: "Enterprise expansion opportunity", delay: 0 },
        { type: "linkedin", action: "connection_request", delay: 1 },
        { type: "email", subject: "Follow up - ROI calculator", delay: 3 },
        { type: "linkedin", action: "dm", delay: 5 },
        { type: "email", subject: "Case study: Similar company", delay: 7 },
        { type: "slack", action: "internal_alert", delay: 8 },
        { type: "email", subject: "Final touchpoint", delay: 10 },
      ],
    },
    {
      id: "seq-002", name: "SaaS Mid-Market Outbound",
      channels: ["email", "linkedin", "sms"],
      status: "active", openRate: 72, replyRate: 19, meetingsBooked: 22, progress: 45,
      steps: [
        { type: "email", subject: "Intro - solving mid-market challenges", delay: 0 },
        { type: "linkedin", action: "connection_request", delay: 2 },
        { type: "sms", message: "Quick follow up", delay: 4 },
        { type: "email", subject: "Customer story", delay: 6 },
        { type: "linkedin", action: "dm", delay: 8 },
      ],
    },
    {
      id: "seq-003", name: "Churn Prevention - At-Risk",
      channels: ["email", "slack", "calendar"],
      status: "active", openRate: 54, replyRate: 31, meetingsBooked: 7, progress: 80,
      steps: [
        { type: "email", subject: "We noticed changes in your usage", delay: 0 },
        { type: "slack", action: "cs_alert", delay: 1 },
        { type: "calendar", action: "schedule_qbr", delay: 2 },
        { type: "email", subject: "Exclusive renewal offer", delay: 5 },
      ],
    },
  ];

  await db
    .insert(schema.sequences)
    .values(seqData.map((s) => ({ ...s, workspaceId: wsId })))
    .onConflictDoNothing();

  // Add enrollments
  const enrollments = [];
  for (let i = 0; i < 312; i++) {
    enrollments.push({ sequenceId: "seq-001", contactId: `contact-${i}`, status: "active" as const });
  }
  for (let i = 0; i < 856; i++) {
    enrollments.push({ sequenceId: "seq-002", contactId: `contact-${312 + i}`, status: "active" as const });
  }
  for (let i = 0; i < 258; i++) {
    enrollments.push({ sequenceId: "seq-003", contactId: `contact-${312 + 856 + i}`, status: "active" as const });
  }

  // Insert in batches of 500
  for (let i = 0; i < enrollments.length; i += 500) {
    await db.insert(schema.sequenceEnrollments).values(enrollments.slice(i, i + 500)).onConflictDoNothing();
  }

  console.log("✓ Sequences + enrollments created");

  // Seed integrations
  const intData = [
    {
      id: "int-001", provider: "salesforce", name: "Salesforce", avatar: "SF", avatarColor: "bg-blue-500",
      category: "CRM", status: "connected", isNative: true,
      description: "Bi-directional sync for accounts, contacts, opportunities, and activities.",
      recordCount: 24200, objectsSynced: ["Accounts", "Contacts", "Opportunities", "Activities"],
      lastSyncAt: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: "int-002", provider: "hubspot", name: "HubSpot", avatar: "HS", avatarColor: "bg-orange-500",
      category: "CRM", status: "connected", isNative: true,
      description: "Marketing automation sync including campaigns, forms, and lead scoring.",
      recordCount: 12800, objectsSynced: ["Campaigns", "Forms", "Leads", "Scores"],
      lastSyncAt: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: "int-003", provider: "outreach", name: "Outreach", avatar: "OR", avatarColor: "bg-purple-500",
      category: "Sales Engagement", status: "connected", isNative: true,
      description: "Sequence enrollment, email tracking, and meeting scheduling sync.",
      recordCount: 8100, objectsSynced: ["Sequences", "Emails", "Meetings"],
      lastSyncAt: new Date(Date.now() - 8 * 60 * 1000),
    },
    {
      id: "int-004", provider: "linkedin", name: "LinkedIn Sales Nav", avatar: "LI", avatarColor: "bg-blue-700",
      category: "Social", status: "connected", isNative: false,
      description: "InMail tracking, profile views, and connection request monitoring.",
      recordCount: 3300, objectsSynced: ["InMails", "ProfileViews", "Connections"],
      lastSyncAt: new Date(Date.now() - 15 * 60 * 1000),
    },
  ];

  await db
    .insert(schema.integrations)
    .values(intData.map((i) => ({ ...i, workspaceId: wsId })))
    .onConflictDoNothing();

  console.log("✓ Integrations created");

  // Seed deals
  const dealData = [
    { id: "deal-001", accountId: "acct-001", name: "Acme Corp Enterprise", value: 85000, stage: "negotiation" },
    { id: "deal-002", accountId: "acct-002", name: "TechFlow Platform", value: 42000, stage: "proposal" },
    { id: "deal-003", accountId: "acct-003", name: "DataBridge Renewal", value: 28000, stage: "qualified" },
    { id: "deal-004", accountId: "acct-004", name: "Nexus Security Suite", value: 65000, stage: "prospecting" },
    { id: "deal-005", accountId: "acct-001", name: "Acme Corp Expansion", value: 120000, stage: "closed-won", closedAt: new Date("2026-01-15") },
    { id: "deal-006", accountId: "acct-002", name: "TechFlow Initial", value: 35000, stage: "closed-won", closedAt: new Date("2026-02-01") },
  ];

  await db
    .insert(schema.deals)
    .values(dealData.map((d) => ({ ...d, workspaceId: wsId })))
    .onConflictDoNothing();

  console.log("✓ Deals created");

  // Seed attribution events
  const attrData = [
    { signalId: "sig-001", dealId: "deal-005", revenue: 120000, model: "last-touch", touchWeight: 1.0 },
    { signalId: "sig-002", dealId: "deal-006", revenue: 35000, model: "last-touch", touchWeight: 1.0 },
    { signalId: "sig-001", dealId: "deal-005", revenue: 120000, model: "linear", touchWeight: 0.5 },
    { signalId: "sig-004", dealId: "deal-005", revenue: 120000, model: "linear", touchWeight: 0.5 },
    { signalId: "sig-002", dealId: "deal-006", revenue: 35000, model: "linear", touchWeight: 0.33 },
  ];

  await db
    .insert(schema.attributionEvents)
    .values(attrData.map((a) => ({ ...a, workspaceId: wsId })))
    .onConflictDoNothing();

  console.log("✓ Attribution events created");

  // Seed notifications
  const notifData = [
    { userId, title: "High-confidence signal detected", description: "Acme Corp shows 3x API usage spike — 92% confidence", type: "signal", read: false },
    { userId, title: "Sequence milestone reached", description: "Q1 Enterprise Expansion hit 300 enrollments", type: "sequence", read: false },
    { userId, title: "Salesforce sync completed", description: "24.2K records synced successfully", type: "integration", read: true },
    { userId, title: "New funding signal", description: "TechFlow Inc. raised $42M Series B", type: "signal", read: true },
  ];

  await db
    .insert(schema.notifications)
    .values(notifData.map((n) => ({ ...n, workspaceId: wsId })))
    .onConflictDoNothing();

  console.log("✓ Notifications created");

  // Seed KPI snapshots (monthly data for charts)
  const months = ["2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02"];
  const pipelineValues = [180000, 220000, 260000, 240000, 300000, 340000, 380000];
  const closedValues = [80000, 95000, 110000, 130000, 140000, 160000, 180000];
  const signalRevValues = [85000, 110000, 95000, 140000, 165000, 210000, 0]; // for attribution chart
  const directRevValues = [60000, 65000, 58000, 70000, 75000, 80000, 0];

  const kpiRows = [];
  for (let i = 0; i < months.length; i++) {
    kpiRows.push({ metric: "pipeline", value: pipelineValues[i], period: months[i] });
    kpiRows.push({ metric: "closed", value: closedValues[i], period: months[i] });
    kpiRows.push({ metric: "signal_revenue", value: signalRevValues[i], period: months[i] });
    kpiRows.push({ metric: "direct_revenue", value: directRevValues[i], period: months[i] });
  }

  await db
    .insert(schema.kpiSnapshots)
    .values(kpiRows.map((k) => ({ ...k, workspaceId: wsId })))
    .onConflictDoNothing();

  console.log("✓ KPI snapshots created");
  console.log("🎉 Seed complete!");
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
