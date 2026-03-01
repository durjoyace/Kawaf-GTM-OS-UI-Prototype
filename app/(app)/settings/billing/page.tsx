"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UsageMeter } from "@/components/billing/usage-meter";
import { pricingTiers } from "@/lib/data/pricing";
import { CreditCard, ArrowUpRight } from "lucide-react";

export default function BillingPage() {
  const [plan, setPlan] = useState("free");
  const [usage, setUsage] = useState({ signals: 0, emails: 0, integrations: 0 });
  const [loading, setLoading] = useState(false);

  const currentTier = pricingTiers.find(
    (t) => t.name.toLowerCase() === plan
  ) ?? pricingTiers[0];

  async function handleUpgrade(planId: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  async function handleManage() {
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Usage</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your subscription and track resource usage.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4" />
            Current Plan
          </CardTitle>
          <CardDescription>
            You are on the <Badge variant="secondary">{currentTier.name}</Badge> plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold">{currentTier.priceLabel}</span>
            </div>
            {plan !== "free" ? (
              <Button variant="outline" onClick={handleManage}>
                Manage Subscription <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button onClick={() => handleUpgrade("pro")} disabled={loading}>
                {loading ? "Redirecting..." : "Upgrade to Pro"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resource Usage</CardTitle>
          <CardDescription>Current billing period usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UsageMeter
            label="Signals"
            current={usage.signals}
            limit={currentTier.limits.signals}
          />
          <UsageMeter
            label="Outreach Emails"
            current={usage.emails}
            limit={currentTier.limits.emails}
          />
          <UsageMeter
            label="Integrations"
            current={usage.integrations}
            limit={currentTier.limits.integrations}
          />
        </CardContent>
      </Card>

      {/* Upgrade options (for free users) */}
      {plan === "free" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upgrade Your Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {pricingTiers.filter((t) => t.price).map((tier) => (
                <div key={tier.name} className="rounded-lg border p-4">
                  <h3 className="font-semibold">{tier.name}</h3>
                  <p className="text-2xl font-bold">{tier.priceLabel}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{tier.description}</p>
                  <Button
                    className="mt-3 w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                    onClick={() => handleUpgrade(tier.name.toLowerCase())}
                    disabled={loading}
                  >
                    {tier.cta}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
