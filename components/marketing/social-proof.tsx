"use client";

import { StaggerChildren, StaggerItem } from "./motion";

const metrics = [
  { value: "50x", label: "Cheaper than agencies" },
  { value: "<5 min", label: "Time to first signal" },
  { value: "47%", label: "Conversion lift" },
  { value: "99.9%", label: "Uptime" },
];

export function SocialProof() {
  return (
    <section className="border-y border-[var(--mkt-border)] bg-[var(--mkt-bg-elevated)] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <StaggerChildren className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="text-center">
                <div className="font-serif text-4xl text-[var(--mkt-text)] sm:text-5xl">
                  {metric.value}
                </div>
                <div className="mx-auto mt-3 h-px w-8 bg-gradient-to-r from-transparent via-[var(--mkt-accent)] to-transparent" />
                <div className="mt-3 font-mono text-xs uppercase tracking-wider text-[var(--mkt-text-muted)]">
                  {metric.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
