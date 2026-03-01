"use client";

import {
  Radar,
  Sparkles,
  Mail,
  Eye,
  BarChart3,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { StaggerChildren, StaggerItem, FadeIn } from "./motion";
import { Section } from "./section";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Radar,
    title: "Signal Detection",
    description:
      "Automatically detect buying intent from CRM activity, website visits, job postings, and funding news.",
  },
  {
    icon: Sparkles,
    title: "AI Scoring",
    description:
      "Claude-powered contextual scoring with natural language explanations — not just arbitrary thresholds.",
  },
  {
    icon: Mail,
    title: "One-Click Outreach",
    description:
      "AI drafts personalized emails based on the signal context. Edit and send in seconds.",
  },
  {
    icon: Eye,
    title: "Visitor Tracking",
    description:
      "Drop a snippet on your site and automatically detect when prospects research your product.",
  },
  {
    icon: BarChart3,
    title: "Revenue Attribution",
    description:
      "See which signals led to closed deals. Prove ROI and optimize your go-to-market motion.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Build visual workflows that trigger sequences, update CRMs, and route leads — no code required.",
  },
];

export function FeatureGrid() {
  return (
    <Section id="features">
      <FadeIn>
        <div className="mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--mkt-accent)]">
            CAPABILITIES
          </span>
          <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            Everything You Need to Win Deals
          </h2>
          <p className="mt-4 text-lg text-[var(--mkt-text-secondary)]">
            A complete GTM operating system — signal detection, outreach,
            attribution, and automation.
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <div className="group rounded-xl border border-[var(--mkt-border)] bg-[var(--mkt-bg-card)] p-6 transition-all hover:border-[var(--mkt-accent)]/20 hover:bg-[var(--mkt-bg-card-hover)] hover:shadow-[0_0_30px_var(--mkt-accent-glow)]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--mkt-accent)]/10 text-[var(--mkt-accent)] transition-colors group-hover:bg-[var(--mkt-accent)]/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--mkt-text)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--mkt-text-secondary)]">
                {feature.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </Section>
  );
}
