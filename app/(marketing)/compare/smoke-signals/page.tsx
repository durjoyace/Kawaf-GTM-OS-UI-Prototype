import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              Feature Comparison
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Kawaf vs {competitorInfo.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {competitorInfo.name} charges {competitorInfo.priceRange} for a {competitorInfo.model}.
              Kawaf delivers superior AI intelligence as self-serve SaaS starting at $99/mo.
            </p>
          </div>

          <div className="mt-14 rounded-xl border bg-card p-6 sm:p-8">
            <ComparisonTable />
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold">Ready to Save $14,900/mo?</h2>
            <p className="mt-2 text-muted-foreground">
              Switch from agency dependency to AI-powered self-serve GTM intelligence.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/login">
                  Start Free <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
