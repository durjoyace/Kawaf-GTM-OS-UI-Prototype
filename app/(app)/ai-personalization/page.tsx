import { getAccounts, getSignals } from "@/lib/data/api";
import { getSessionContext } from "@/lib/api/utils";
import { TopBar } from "@/components/top-bar";
import { AccountRow } from "@/components/account-row";
import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp, Zap, Target } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AIPersonalizationPage() {
  const ctx = await getSessionContext();
  const [accounts, signals] = await Promise.all([
    getAccounts(ctx.workspaceId),
    getSignals(undefined, ctx.workspaceId),
  ]);
  const latestSignal = signals[0];

  return (
    <>
      <TopBar title="AI Personalization" subtitle="Self-tuning outreach engine" />
      <div className="p-6 space-y-6">
        {/* Hero banner */}
        <div className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-10">
            <Sparkles className="h-32 w-32" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold">Self-Tuning Engine Active</span>
            </div>
            <p className="text-sm text-white/80 max-w-lg">
              AI continuously optimizes messaging, timing, and channel selection based on engagement signals and conversion patterns.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-300" />
              <span className="text-lg font-bold">+34%</span>
              <span className="text-sm text-white/70">Reply rate lift</span>
            </div>
            <div className="mt-4 flex gap-3 flex-wrap">
              <div className="rounded-lg bg-white/10 backdrop-blur-sm px-3 py-1.5 text-center">
                <p className="text-lg font-bold">2.4x</p>
                <p className="text-[10px] text-white/60">Meeting Rate</p>
              </div>
              <div className="rounded-lg bg-white/10 backdrop-blur-sm px-3 py-1.5 text-center">
                <p className="text-lg font-bold">18%</p>
                <p className="text-[10px] text-white/60">Open Rate Lift</p>
              </div>
              <div className="rounded-lg bg-white/10 backdrop-blur-sm px-3 py-1.5 text-center">
                <p className="text-lg font-bold">42ms</p>
                <p className="text-[10px] text-white/60">Avg Response</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Accounts */}
          <div className="lg:col-span-1">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
              <Target className="h-4 w-4 text-muted-foreground" />
              Select Account
            </h2>
            <Card className="divide-y">
              {accounts.map((account, i) => (
                <AccountRow key={account.id} account={account} isSelected={i === 0} />
              ))}
            </Card>
          </div>

          {/* Context Signals */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              Context Signals
            </h2>
            {latestSignal && (
              <Card className="p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Recent News</h3>
                    <p className="text-xs text-blue-600 font-medium mt-0.5">
                      {latestSignal.accountName} — {latestSignal.signalType}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {latestSignal.description}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      {latestSignal.recency}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
