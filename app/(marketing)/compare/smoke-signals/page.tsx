import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ComparisonTable } from "@/components/marketing/comparison-table";
import { competitorInfo } from "@/lib/data/comparison";

export const metadata: Metadata = {
  title: "Kawaf vs Smoke Signals AI — Feature Comparison",
  description:
    "See how Kawaf GTM OS compares to Smoke Signals AI. Get the same GTM intelligence at 1/50th the cost.",
};

export default function CompareSmokePage() {
  return (
    <>
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--mkt-accent)]">
              FEATURE COMPARISON
            </span>
            <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              Kawaf vs {competitorInfo.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--mkt-text-secondary)]">
              {competitorInfo.name} charges {competitorInfo.priceRange} for a{" "}
              {competitorInfo.model}. Kawaf delivers superior AI intelligence as
              self-serve SaaS starting at $99/mo.
            </p>
          </div>

          <div className="mt-14 rounded-xl border border-[var(--mkt-border)] bg-[var(--mkt-bg-card)] p-6 sm:p-8">
            <ComparisonTable />
          </div>

          <div className="mt-12 text-center">
            <h2 className="font-serif text-2xl text-[var(--mkt-text)] sm:text-3xl">
              Ready to Save $14,900/mo?
            </h2>
            <p className="mt-2 text-[var(--mkt-text-secondary)]">
              Switch from agency dependency to AI-powered self-serve GTM
              intelligence.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--mkt-accent)] px-6 py-3 text-sm font-medium text-black transition-shadow hover:shadow-[0_0_24px_var(--mkt-accent-glow)]"
              >
                Start Free
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
      </section>
    </>
  );
}
