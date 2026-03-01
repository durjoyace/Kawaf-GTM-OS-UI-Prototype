import { Check, X } from "lucide-react";
import { comparisonData, competitorInfo } from "@/lib/data/comparison";

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500" />;
  if (value === false) return <X className="h-4 w-4 text-red-400" />;
  return <span className="text-sm">{value}</span>;
}

export function ComparisonTable() {
  const categories = [...new Set(comparisonData.map((r) => r.category))];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-3 pr-4 text-sm font-medium text-muted-foreground">Feature</th>
            <th className="px-4 py-3 text-center">
              <div className="text-sm font-semibold">Kawaf</div>
              <div className="text-xs text-green-500">From $99/mo</div>
            </th>
            <th className="px-4 py-3 text-center">
              <div className="text-sm font-semibold">{competitorInfo.name}</div>
              <div className="text-xs text-muted-foreground">{competitorInfo.priceRange}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tbody key={category}>
              <tr>
                <td
                  colSpan={3}
                  className="pt-6 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  {category}
                </td>
              </tr>
              {comparisonData
                .filter((r) => r.category === category)
                .map((row) => (
                  <tr key={row.feature} className="border-b border-border/50">
                    <td className="py-3 pr-4 text-sm">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <CellValue value={row.kawaf} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <CellValue value={row.competitor} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          ))}
        </tbody>
      </table>
    </div>
  );
}
