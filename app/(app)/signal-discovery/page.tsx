import { getSignals, getSignalCategories } from "@/lib/data/api";
import { TopBar } from "@/components/top-bar";
import { CategoryTile } from "@/components/category-tile";
import { SignalCard } from "@/components/signal-card";
import { Badge } from "@/components/ui/badge";

export default async function SignalDiscoveryPage() {
  const [signals, categories] = await Promise.all([getSignals(), getSignalCategories()]);

  const tabs = ["All Signals", "Product", "Firmographic", "CRM", "Marketing", "News"];
  const sorts = ["Recency", "Confidence", "Impact"];

  return (
    <>
      <TopBar title="Signal Discovery" subtitle="AI-detected buying signals across your accounts" />
      <div className="p-6 space-y-6">
        {/* Category tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <CategoryTile key={cat.category} category={cat} />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                i === 0
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="ml-auto flex gap-1">
            {sorts.map((sort, i) => (
              <button
                key={sort}
                className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors ${
                  i === 0 ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>

        {/* Attribution Logic Banner */}
        <div className="rounded-lg border bg-blue-50/50 px-4 py-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs font-medium text-blue-800">Signal Attribution Logic</span>
          <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-700">
            High &ge;80%
          </Badge>
          <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700">
            Med 60-79%
          </Badge>
          <Badge variant="secondary" className="text-[10px] bg-red-100 text-red-700">
            Low &lt;60%
          </Badge>
        </div>

        {/* Signal cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </div>
    </>
  );
}
