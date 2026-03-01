"use client";

import { useState, useMemo } from "react";
import { Radar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CategoryTile } from "@/components/category-tile";
import { DataToolbar } from "@/components/data-toolbar";
import { EmptyState } from "@/components/empty-state";
import { SignalCardExpanded } from "./signal-card-expanded";
import type { Signal, SignalCategoryCount } from "@/lib/types/models";

const tabDefs = [
  { label: "All Signals", value: "all" },
  { label: "Product", value: "product-analytics" },
  { label: "Firmographic", value: "firmographics" },
  { label: "CRM", value: "crm-data" },
  { label: "Marketing", value: "marketing-engagement" },
  { label: "News", value: "external-news" },
];

const sortOptions = [
  { label: "Recency", value: "recency" },
  { label: "Confidence", value: "confidence" },
  { label: "Impact", value: "impact" },
];

interface Props {
  initialSignals: Signal[];
  categories: SignalCategoryCount[];
}

export function SignalDiscoveryClient({ initialSignals, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recency");

  const filtered = useMemo(() => {
    let result = [...initialSignals];

    if (activeTab !== "all") {
      result = result.filter((s) => s.category === activeTab);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.accountName.toLowerCase().includes(q) ||
          s.signalType.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === "confidence") {
      result.sort((a, b) => b.confidence - a.confidence);
    } else if (sortBy === "impact") {
      const order = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => order[b.impact] - order[a.impact]);
    }

    return result;
  }, [initialSignals, activeTab, search, sortBy]);

  // Compute live tab counts
  const tabs = useMemo(
    () =>
      tabDefs.map((t) => ({
        ...t,
        count:
          t.value === "all"
            ? initialSignals.length
            : initialSignals.filter((s) => s.category === t.value).length,
      })),
    [initialSignals]
  );

  return (
    <div className="p-6 space-y-6">
      {/* Category tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat) => (
          <CategoryTile key={cat.category} category={cat} />
        ))}
      </div>

      {/* Toolbar */}
      <DataToolbar
        searchPlaceholder="Search signals, accounts..."
        searchValue={search}
        onSearchChange={setSearch}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sortOptions={sortOptions}
        activeSort={sortBy}
        onSortChange={setSortBy}
      />

      {/* Attribution Logic Banner */}
      <div className="rounded-xl border bg-gradient-to-r from-blue-50/80 to-indigo-50/50 px-4 py-3 flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold text-blue-800">Signal Attribution Logic</span>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-[11px] bg-green-100 text-green-700 border-green-200">
            High &ge;80%
          </Badge>
          <Badge variant="secondary" className="text-[11px] bg-amber-100 text-amber-700 border-amber-200">
            Med 60-79%
          </Badge>
          <Badge variant="secondary" className="text-[11px] bg-red-100 text-red-700 border-red-200">
            Low &lt;60%
          </Badge>
        </div>
        <p className="text-[11px] text-blue-600/70 ml-auto">
          Confidence scores combine source reliability, signal recency, and historical conversion correlation
        </p>
      </div>

      {/* Signal cards grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((signal) => (
            <SignalCardExpanded key={signal.id} signal={signal} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Radar className="h-6 w-6 text-muted-foreground" />}
          title="No signals found"
          description="Try adjusting your search or category filter to find matching signals."
        />
      )}
    </div>
  );
}
