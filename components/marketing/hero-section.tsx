"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, SlideIn } from "./motion";
import { SignalVisualization } from "./signal-visualization";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--mkt-accent)] opacity-[0.03] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          {/* Left: text */}
          <SlideIn direction="left">
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mkt-border)] bg-[var(--mkt-bg-card)] px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--mkt-accent)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--mkt-accent)]" />
                </span>
                <span className="font-mono text-xs tracking-wider text-[var(--mkt-text-secondary)]">
                  AI-POWERED GTM INTELLIGENCE
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-5xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="text-[var(--mkt-text)]">
                  Detect Buying Signals.{" "}
                </span>
                <span className="bg-gradient-to-r from-[var(--mkt-gradient-start)] to-[var(--mkt-gradient-end)] bg-clip-text text-transparent">
                  Close Deals Faster.
                </span>
              </h1>

              {/* Subtext */}
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--mkt-text-secondary)] sm:text-xl">
                Kawaf is an AI-powered GTM operating system that detects buying
                signals, drafts personalized outreach, and automates your entire
                pipeline — at 1/50th the cost of a GTM agency.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--mkt-accent)] px-6 py-3 text-sm font-medium text-black transition-shadow hover:shadow-[0_0_24px_var(--mkt-accent-glow)]"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/compare/smoke-signals"
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--mkt-border)] px-6 py-3 text-sm text-[var(--mkt-text-secondary)] transition-all hover:border-[var(--mkt-border-hover)] hover:text-[var(--mkt-text)]"
                >
                  See How We Compare
                </Link>
              </div>

              {/* Fine print */}
              <p className="mt-4 font-mono text-xs text-[var(--mkt-text-muted)]">
                No credit card required. Free plan includes 50 signals/mo.
              </p>
            </div>
          </SlideIn>

          {/* Right: visualization */}
          <FadeIn delay={0.3} className="flex justify-center lg:justify-end">
            <SignalVisualization />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
