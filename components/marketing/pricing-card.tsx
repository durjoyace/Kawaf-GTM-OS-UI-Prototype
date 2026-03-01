import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/lib/data/pricing";

interface PricingCardProps {
  tier: PricingTier;
}

export function PricingCard({ tier }: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border border-[var(--mkt-border)] bg-[var(--mkt-bg-card)] p-6 transition-all",
        tier.highlighted &&
          "border-[var(--mkt-accent)]/50 shadow-[0_0_30px_var(--mkt-accent-glow)]"
      )}
    >
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--mkt-accent)] px-3 py-0.5 text-xs font-medium text-black">
          START HERE
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-[var(--mkt-text)]">
          {tier.name}
        </h3>
        <div className="mt-2">
          <span className="font-serif text-5xl text-[var(--mkt-text)]">
            {tier.priceLabel}
          </span>
        </div>
        <p className="mt-2 text-sm text-[var(--mkt-text-secondary)]">
          {tier.description}
        </p>
      </div>

      <Link
        href="/login"
        className={cn(
          "mt-6 block w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-shadow",
          tier.highlighted
            ? "bg-[var(--mkt-accent)] text-black hover:shadow-[0_0_24px_var(--mkt-accent-glow)]"
            : "border border-[var(--mkt-border)] text-[var(--mkt-text-secondary)] hover:border-[var(--mkt-border-hover)] hover:text-[var(--mkt-text)]"
        )}
      >
        {tier.cta}
      </Link>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-[var(--mkt-text-secondary)]"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mkt-accent)]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
