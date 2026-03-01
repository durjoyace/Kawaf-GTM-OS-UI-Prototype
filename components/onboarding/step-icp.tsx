"use client";

import { Button } from "@/components/ui/button";

interface StepIcpProps {
  data: { industries: string[]; sizes: string[]; titles: string[] };
  onChange: (data: StepIcpProps["data"]) => void;
  onNext: () => void;
  onBack: () => void;
}

const targetIndustries = ["SaaS", "Fintech", "Healthcare", "E-commerce", "Manufacturing", "Education", "Real Estate", "Legal"];
const targetSizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"];
const targetTitles = ["VP Sales", "CRO", "Head of Marketing", "CEO", "CTO", "VP Engineering", "Head of Growth", "Director of BD"];

function toggleItem(arr: string[], item: string) {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export function StepIcp({ data, onChange, onNext, onBack }: StepIcpProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Define Your Ideal Customer</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select the target industries, company sizes, and job titles you sell to.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Target Industries</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {targetIndustries.map((ind) => (
              <button
                key={ind}
                onClick={() => onChange({ ...data, industries: toggleItem(data.industries, ind) })}
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  data.industries.includes(ind)
                    ? "border-green-500 bg-green-500/10 text-green-600"
                    : "hover:bg-accent"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Company Sizes</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {targetSizes.map((s) => (
              <button
                key={s}
                onClick={() => onChange({ ...data, sizes: toggleItem(data.sizes, s) })}
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  data.sizes.includes(s)
                    ? "border-green-500 bg-green-500/10 text-green-600"
                    : "hover:bg-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Target Job Titles</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {targetTitles.map((t) => (
              <button
                key={t}
                onClick={() => onChange({ ...data, titles: toggleItem(data.titles, t) })}
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  data.titles.includes(t)
                    ? "border-green-500 bg-green-500/10 text-green-600"
                    : "hover:bg-accent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={onNext} className="flex-1">Continue</Button>
      </div>
    </div>
  );
}
