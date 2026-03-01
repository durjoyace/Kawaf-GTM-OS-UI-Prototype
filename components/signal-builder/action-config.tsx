"use client";

interface ActionConfigProps {
  signalType: string;
  category: string;
  impact: string;
  onSignalTypeChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onImpactChange: (v: string) => void;
}

const categories = [
  "product-analytics",
  "firmographics",
  "crm-data",
  "marketing-engagement",
  "external-news",
];

export function ActionConfig({
  signalType,
  category,
  impact,
  onSignalTypeChange,
  onCategoryChange,
  onImpactChange,
}: ActionConfigProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-muted-foreground">When signal fires, create:</label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Signal Type</label>
          <input
            type="text"
            value={signalType}
            onChange={(e) => onSignalTypeChange(e.target.value)}
            placeholder="e.g. GitHub Star Spike"
            className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Category</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Impact</label>
          <select
            value={impact}
            onChange={(e) => onImpactChange(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
