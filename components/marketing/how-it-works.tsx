"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "./motion";
import { Section } from "./section";

const steps = [
  {
    number: "01",
    title: "Detect Buying Signals",
    description:
      "Our AI continuously monitors CRM activity, website visits, job postings, and funding news to identify accounts showing buying intent.",
  },
  {
    number: "02",
    title: "AI Scores & Prioritizes",
    description:
      "Claude-powered scoring analyzes signal context and assigns priority with natural language explanations — not arbitrary thresholds.",
  },
  {
    number: "03",
    title: "Engage & Close",
    description:
      "AI drafts personalized outreach based on signal context. Your team reviews, sends, and closes deals faster than ever.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <FadeIn>
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--mkt-accent)]">
            HOW IT WORKS
          </span>
          <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            Three steps to{" "}
            <span className="bg-gradient-to-r from-[var(--mkt-gradient-start)] to-[var(--mkt-gradient-end)] bg-clip-text text-transparent">
              revenue
            </span>
          </h2>
        </div>
      </FadeIn>

      <StaggerChildren className="relative" staggerDelay={0.15}>
        {/* Connecting vertical line */}
        <div className="absolute bottom-0 left-[23px] top-0 w-px bg-gradient-to-b from-[var(--mkt-accent)] via-[var(--mkt-accent)]/30 to-transparent sm:left-[31px]" />

        <div className="space-y-12">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="flex gap-6 sm:gap-8">
                {/* Number */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--mkt-accent)]/30 bg-[var(--mkt-bg)] sm:h-16 sm:w-16">
                  <span className="font-mono text-lg font-medium text-[var(--mkt-accent)] sm:text-xl">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1 sm:pt-3">
                  <h3 className="text-xl font-semibold text-[var(--mkt-text)] sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-[var(--mkt-text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerChildren>
    </Section>
  );
}
