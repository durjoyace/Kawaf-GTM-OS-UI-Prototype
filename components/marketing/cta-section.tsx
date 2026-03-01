"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./motion";
import { Section } from "./section";

export function CtaSection() {
  return (
    <Section>
      <FadeIn>
        <div className="relative overflow-hidden rounded-2xl border border-[var(--mkt-border)] bg-[var(--mkt-bg-card)] px-6 py-16 text-center sm:px-12">
          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--mkt-accent)] opacity-[0.06] blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-[var(--mkt-text)]">
                Stop Paying $15K/mo for{" "}
              </span>
              <span className="bg-gradient-to-r from-[var(--mkt-gradient-start)] to-[var(--mkt-gradient-end)] bg-clip-text text-transparent">
                GTM Intelligence
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--mkt-text-secondary)]">
              Get AI-powered signal detection, one-click outreach, and full
              attribution — all for less than the cost of a single sales tool.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--mkt-accent)] px-6 py-3 text-sm font-medium text-black transition-shadow hover:shadow-[0_0_24px_var(--mkt-accent-glow)]"
              >
                Start Free Today
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-lg border border-[var(--mkt-border)] px-6 py-3 text-sm text-[var(--mkt-text-secondary)] transition-all hover:border-[var(--mkt-border-hover)] hover:text-[var(--mkt-text)]"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
