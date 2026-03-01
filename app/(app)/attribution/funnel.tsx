import { Card } from "@/components/ui/card";
import type { AttributionEvent } from "@/lib/types/models";

export function FunnelSection({ data }: { data: AttributionEvent[] }) {
  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold mb-4">Signal &rarr; Revenue Funnel</h2>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-40 text-xs font-medium text-muted-foreground shrink-0">
              {item.label}
            </span>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-xs font-semibold w-16 text-right">
              {item.label === "Revenue Attributed"
                ? `$${(item.value / 1000000).toFixed(1)}M`
                : item.value.toLocaleString()}
            </span>
            <span className="text-[11px] text-muted-foreground w-10 text-right">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
