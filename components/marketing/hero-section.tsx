import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-50/50 to-transparent dark:from-green-950/20" />

      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          Replacing $15K/mo GTM agencies with AI
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Detect Buying Signals.{" "}
          <span className="text-green-500">Close Deals Faster.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Kawaf is an AI-powered GTM operating system that detects buying signals,
          drafts personalized outreach, and automates your entire pipeline —
          at 1/50th the cost of a GTM agency.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/login">
              Start Free <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/compare/smoke-signals">See How We Compare</Link>
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          No credit card required. Free plan includes 50 signals/mo.
        </p>
      </div>
    </section>
  );
}
