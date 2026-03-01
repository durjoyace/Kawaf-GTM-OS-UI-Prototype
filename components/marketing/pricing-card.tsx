import Link from "next/link";
import { Button } from "@/components/ui/button";
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
        "relative flex flex-col rounded-xl border bg-card p-6",
        tier.highlighted && "border-green-500 shadow-lg shadow-green-500/10"
      )}
    >
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-0.5 text-xs font-medium text-white">
          Most Popular
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold">{tier.name}</h3>
        <div className="mt-2">
          <span className="text-4xl font-bold">{tier.priceLabel}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
      </div>

      <Button
        variant={tier.ctaVariant}
        className={cn("mt-6 w-full", tier.highlighted && "bg-green-500 text-white hover:bg-green-600")}
        asChild
      >
        <Link href="/login">{tier.cta}</Link>
      </Button>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
