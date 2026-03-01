"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Loader2 } from "lucide-react";
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
              <Badge className="absolute top-3 right-3 bg-green-100 text-green-700 text-[10px] gap-0.5">
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
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
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
                className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors ${
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
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-medium">API Documentation</p>
          <p className="text-xs text-muted-foreground mt-1">RESTful API with OAuth 2.0 authentication. Rate limited to 10,000 requests/day.</p>
          <pre className="mt-4 rounded-lg bg-slate-900 text-green-400 text-xs p-4 text-left max-w-md w-full">
{`GET /api/v1/signals
Authorization: Bearer <token>

{
  "data": [...],
  "meta": { "total": 247 }
}`}
          </pre>
        </div>
      )}

      {activeTab === "Security" && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShieldCheck className="h-12 w-12 text-green-500 mb-4" />
          <p className="text-sm font-medium">SOC 2 Type II Compliant</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            All data is encrypted at rest (AES-256) and in transit (TLS 1.3).
            Data residency: US-East. Annual penetration testing by independent auditors.
          </p>
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
                    <Badge key={obj} variant="secondary" className="text-[10px]">{obj}</Badge>
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
