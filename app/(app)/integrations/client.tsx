"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Loader2, ExternalLink, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { KpiCard } from "@/components/kpi-card";
import { IntegrationCard } from "@/components/integration-card";
import type { Integration, KpiMetric } from "@/lib/types/models";

const mainTabs = ["Integrations", "Open API", "Security"];
const categories = ["All", "CRM", "Sales Engagement", "Social", "Messaging", "Enrichment", "Intent", "Analytics"];

interface Props {
  integrations: Integration[];
  kpis: KpiMetric[];
}

export function IntegrationsClient({ integrations, kpis }: Props) {
  const [activeTab, setActiveTab] = useState("Integrations");
  const [activeCategory, setActiveCategory] = useState("All");
  const [connectModal, setConnectModal] = useState<Integration | null>(null);
  const [connecting, setConnecting] = useState(false);

  const filtered = activeCategory === "All"
    ? integrations
    : integrations.filter((i) => i.category === activeCategory);

  function handleConnect(integration: Integration) {
    setConnectModal(integration);
  }

  async function confirmConnect() {
    if (!connectModal) return;
    setConnecting(true);
    try {
      const provider = connectModal.name.toLowerCase().replace(/\s+/g, "-");
      await fetch(`/api/integrations/${provider}/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: connectModal.name, config: {} }),
      });
      toast.success(`${connectModal.name} connected successfully`, {
        description: "Initial sync will begin in a few moments.",
      });
    } catch {
      toast.error("Failed to connect integration");
    } finally {
      setConnecting(false);
      setConnectModal(null);
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="relative">
            <KpiCard metric={kpi} />
            {kpi.label === "Data Region" && (
              <Badge className="absolute top-3 right-3 bg-green-100 text-green-700 text-[11px] gap-0.5">
                <ShieldCheck className="h-2.5 w-2.5" />
                SOC2
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Main tabs */}
      <div className="flex items-center gap-2">
        {mainTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
              activeTab === tab
                ? "bg-slate-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Integrations" && (
        <>
          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Integration cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} onConnect={() => handleConnect(integration)} />
            ))}
          </div>
        </>
      )}

      {activeTab === "Open API" && (
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">API Documentation</h3>
              <p className="text-xs text-muted-foreground mt-0.5">RESTful API with OAuth 2.0 authentication. Rate limited to 10,000 requests/day.</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs gap-1" asChild>
              <a href="/developers">
                <ExternalLink className="h-3 w-3" />
                Full Docs
              </a>
            </Button>
          </div>
          <Card className="overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">GET /api/v1/signals</span>
              <Badge variant="secondary" className="text-[11px] bg-green-500/20 text-green-400 border-0">200 OK</Badge>
            </div>
            <pre className="bg-slate-900 text-green-400 text-xs p-4 overflow-x-auto">
{`curl -X GET https://api.kawaf.io/v1/signals \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json"

{
  "data": [
    {
      "id": "sig_01",
      "account": "Acme Corp",
      "type": "product-analytics",
      "confidence": 0.92
    }
  ],
  "meta": { "total": 247, "page": 1 }
}`}
            </pre>
          </Card>
        </div>
      )}

      {activeTab === "Security" && (
        <div className="space-y-4 max-w-lg">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-sm font-semibold">Security & Compliance</h3>
              <p className="text-xs text-muted-foreground">Enterprise-grade security for your GTM data.</p>
            </div>
          </div>
          <Card className="p-4 space-y-3">
            {[
              { label: "SOC 2 Type II Certified", done: true },
              { label: "AES-256 encryption at rest", done: true },
              { label: "TLS 1.3 encryption in transit", done: true },
              { label: "Data residency: US-East", done: true },
              { label: "Annual penetration testing", done: true },
              { label: "GDPR compliant data handling", done: true },
              { label: "SSO / SAML 2.0 support", done: true },
              { label: "Role-based access controls", done: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Connect modal */}
      <Dialog open={!!connectModal} onOpenChange={() => setConnectModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Connect {connectModal?.name}</DialogTitle>
          <DialogDescription>
            Authorize Kawaf GTM OS to access your {connectModal?.name} data.
          </DialogDescription>
          <div className="space-y-4 mt-2">
            <div className="rounded-lg border p-4 space-y-2">
              <p className="text-xs font-medium">Permissions requested:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>Read accounts, contacts, and opportunities</li>
                <li>Write activities and custom fields</li>
                <li>Bi-directional real-time sync</li>
              </ul>
            </div>
            {connectModal?.objectsSynced && (
              <div className="rounded-lg border p-4">
                <p className="text-xs font-medium mb-2">Objects to sync:</p>
                <div className="flex gap-1.5 flex-wrap">
                  {connectModal.objectsSynced.map((obj) => (
                    <Badge key={obj} variant="secondary" className="text-[11px]">{obj}</Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => setConnectModal(null)} className="text-xs">
                Cancel
              </Button>
              <Button size="sm" onClick={confirmConnect} disabled={connecting} className="text-xs gap-1">
                {connecting && <Loader2 className="h-3 w-3 animate-spin" />}
                {connecting ? "Connecting..." : "Authorize & Connect"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
