import type { Metadata } from "next";
import { pricingTiers } from "@/lib/data/pricing";
import { PricingCard } from "@/components/marketing/pricing-card";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Pricing — Kawaf GTM OS",
  description:
    "AI-powered GTM intelligence from $99/mo. Replace your $15K agency with self-serve signal detection and outreach.",
};

export default function PricingPage() {
  return (
    <>
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--mkt-accent)]">
              PRICING
            </span>
            <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-lg text-[var(--mkt-text-secondary)]">
              Start free. Upgrade when you&apos;re ready. Cancel anytime.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
