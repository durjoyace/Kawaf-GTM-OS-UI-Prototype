import {
  pgTable,
  text,
  timestamp,
  integer,
  real,
  boolean,
  jsonb,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

// ─── Auth tables (Auth.js adapter) ─────────────────────────────

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: text("role").default("member"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ─── Workspaces ────────────────────────────────────────────────

export const workspaces = pgTable("workspaces", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const workspaceMembers = pgTable(
  "workspace_members",
  {
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull().default("member"), // admin | member | viewer
  },
  (wm) => [primaryKey({ columns: [wm.workspaceId, wm.userId] })]
);

// ─── Signal Accounts ───────────────────────────────────────────

export const signalAccounts = pgTable("signal_accounts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  avatar: text("avatar"),
  industry: text("industry"),
  score: integer("score").default(0),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Signals ───────────────────────────────────────────────────

export const signals = pgTable("signals", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  accountId: text("account_id").references(() => signalAccounts.id),
  signalType: text("signal_type").notNull(),
  category: text("category").notNull(), // product-analytics | firmographics | crm-data | marketing-engagement | external-news
  description: text("description").notNull(),
  confidence: integer("confidence").notNull(),
  confidenceLevel: text("confidence_level").notNull(), // high | medium | low
  impact: text("impact").notNull(), // high | medium | low
  explanation: text("explanation"),
  suggestedAction: text("suggested_action"),
  tags: jsonb("tags").$type<string[]>().default([]),
  source: text("source"),
  rawData: jsonb("raw_data").$type<Record<string, unknown>>(),
  processedAt: timestamp("processed_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Sequences ─────────────────────────────────────────────────

export const sequences = pgTable("sequences", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  channels: jsonb("channels").$type<string[]>().default([]),
  status: text("status").notNull().default("draft"), // active | paused | draft
  steps: jsonb("steps").$type<Record<string, unknown>[]>().default([]),
  openRate: real("open_rate").default(0),
  replyRate: real("reply_rate").default(0),
  meetingsBooked: integer("meetings_booked").default(0),
  progress: real("progress").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Sequence Enrollments ──────────────────────────────────────

export const sequenceEnrollments = pgTable("sequence_enrollments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sequenceId: text("sequence_id")
    .notNull()
    .references(() => sequences.id, { onDelete: "cascade" }),
  contactId: text("contact_id").notNull(),
  currentStep: integer("current_step").default(0),
  status: text("status").notNull().default("active"), // active | completed | paused | bounced
  enrolledAt: timestamp("enrolled_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Workflows ─────────────────────────────────────────────────

export const workflows = pgTable("workflows", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  nodes: jsonb("nodes").$type<Record<string, unknown>[]>().default([]),
  edges: jsonb("edges").$type<Record<string, unknown>[]>().default([]),
  status: text("status").notNull().default("draft"), // draft | published | archived
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Integrations ──────────────────────────────────────────────

export const integrations = pgTable("integrations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  provider: text("provider").notNull(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  avatarColor: text("avatar_color"),
  category: text("category"),
  status: text("status").notNull().default("disconnected"), // connected | disconnected | error | pending
  isNative: boolean("is_native").default(false),
  description: text("description"),
  config: jsonb("config").$type<Record<string, unknown>>(), // encrypted tokens
  lastSyncAt: timestamp("last_sync_at", { mode: "date" }),
  recordCount: integer("record_count").default(0),
  objectsSynced: jsonb("objects_synced").$type<string[]>(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Deals ─────────────────────────────────────────────────────

export const deals = pgTable("deals", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  accountId: text("account_id").references(() => signalAccounts.id),
  name: text("name").notNull(),
  value: real("value").default(0),
  stage: text("stage").notNull(), // prospecting | qualified | proposal | negotiation | closed-won | closed-lost
  closedAt: timestamp("closed_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Attribution Events ────────────────────────────────────────

export const attributionEvents = pgTable("attribution_events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  signalId: text("signal_id").references(() => signals.id),
  dealId: text("deal_id").references(() => deals.id),
  revenue: real("revenue").default(0),
  model: text("model").notNull(), // last-touch | linear | time-decay
  touchWeight: real("touch_weight").default(1),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Notifications ─────────────────────────────────────────────

export const notifications = pgTable("notifications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // signal | sequence | integration | system
  read: boolean("read").default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── KPI Snapshots ─────────────────────────────────────────────

export const kpiSnapshots = pgTable("kpi_snapshots", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  metric: text("metric").notNull(),
  value: real("value").notNull(),
  period: text("period").notNull(), // e.g. "2026-02", "2026-W09"
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Relations ─────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  workspaceMembers: many(workspaceMembers),
  notifications: many(notifications),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, { fields: [workspaces.ownerId], references: [users.id] }),
  members: many(workspaceMembers),
  signals: many(signals),
  signalAccounts: many(signalAccounts),
  sequences: many(sequences),
  workflows: many(workflows),
  integrations: many(integrations),
  deals: many(deals),
  notifications: many(notifications),
  kpiSnapshots: many(kpiSnapshots),
}));

export const workspaceMembersRelations = relations(workspaceMembers, ({ one }) => ({
  workspace: one(workspaces, { fields: [workspaceMembers.workspaceId], references: [workspaces.id] }),
  user: one(users, { fields: [workspaceMembers.userId], references: [users.id] }),
}));

export const signalAccountsRelations = relations(signalAccounts, ({ one, many }) => ({
  workspace: one(workspaces, { fields: [signalAccounts.workspaceId], references: [workspaces.id] }),
  signals: many(signals),
  deals: many(deals),
}));

export const signalsRelations = relations(signals, ({ one }) => ({
  workspace: one(workspaces, { fields: [signals.workspaceId], references: [workspaces.id] }),
  account: one(signalAccounts, { fields: [signals.accountId], references: [signalAccounts.id] }),
}));

export const sequencesRelations = relations(sequences, ({ one, many }) => ({
  workspace: one(workspaces, { fields: [sequences.workspaceId], references: [workspaces.id] }),
  enrollments: many(sequenceEnrollments),
}));

export const sequenceEnrollmentsRelations = relations(sequenceEnrollments, ({ one }) => ({
  sequence: one(sequences, { fields: [sequenceEnrollments.sequenceId], references: [sequences.id] }),
}));

export const workflowsRelations = relations(workflows, ({ one }) => ({
  workspace: one(workspaces, { fields: [workflows.workspaceId], references: [workspaces.id] }),
}));

export const integrationsRelations = relations(integrations, ({ one }) => ({
  workspace: one(workspaces, { fields: [integrations.workspaceId], references: [workspaces.id] }),
}));

export const dealsRelations = relations(deals, ({ one, many }) => ({
  workspace: one(workspaces, { fields: [deals.workspaceId], references: [workspaces.id] }),
  account: one(signalAccounts, { fields: [deals.accountId], references: [signalAccounts.id] }),
  attributionEvents: many(attributionEvents),
}));

export const attributionEventsRelations = relations(attributionEvents, ({ one }) => ({
  workspace: one(workspaces, { fields: [attributionEvents.workspaceId], references: [workspaces.id] }),
  signal: one(signals, { fields: [attributionEvents.signalId], references: [signals.id] }),
  deal: one(deals, { fields: [attributionEvents.dealId], references: [deals.id] }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  workspace: one(workspaces, { fields: [notifications.workspaceId], references: [workspaces.id] }),
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}));

export const kpiSnapshotsRelations = relations(kpiSnapshots, ({ one }) => ({
  workspace: one(workspaces, { fields: [kpiSnapshots.workspaceId], references: [workspaces.id] }),
}));
