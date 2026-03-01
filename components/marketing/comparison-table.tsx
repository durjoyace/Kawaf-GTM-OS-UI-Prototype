import { Check, X } from "lucide-react";
import { comparisonData, competitorInfo } from "@/lib/data/comparison";
import { Fragment } from "react";

function CellValue({ value }: { value: string | boolean }) {
  if (value === true)
    return <Check className="h-4 w-4 text-[var(--mkt-accent)]" />;
  if (value === false)
    return <X className="h-4 w-4 text-red-400/60" />;
  return (
    <span className="text-sm text-[var(--mkt-text-secondary)]">{value}</span>
  );
}

export function ComparisonTable() {
  const categories = [...new Set(comparisonData.map((r) => r.category))];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse text-left">
        <caption className="sr-only">Feature comparison between Kawaf and Smoke Signals AI</caption>
        <colgroup>
          <col className="w-[50%]" />
          <col className="w-[25%]" />
          <col className="w-[25%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-[var(--mkt-border)]">
            <th scope="col" className="py-3 pr-4 text-sm font-medium text-[var(--mkt-text-muted)]">
              Feature
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              <div className="text-sm font-semibold text-[var(--mkt-text)]">
                Kawaf
              </div>
              <div className="text-xs text-[var(--mkt-accent)]">
                From $99/mo
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              <div className="text-sm font-semibold text-[var(--mkt-text)]">
                {competitorInfo.name}
              </div>
              <div className="text-xs text-[var(--mkt-text-muted)]">
                {competitorInfo.priceRange}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <Fragment key={category}>
              <tr>
                <td
                  colSpan={3}
                  className="pb-2 pt-6 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--mkt-text-muted)]"
                >
                  {category}
                </td>
              </tr>
              {comparisonData
                .filter((r) => r.category === category)
                .map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-[var(--mkt-border)]"
                  >
                    <td className="py-3 pr-4 text-sm text-[var(--mkt-text)]">
                      {row.feature}
                    </td>
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
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
