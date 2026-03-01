"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StepCompanyProps {
  data: { name: string; website: string; industry: string; size: string };
  onChange: (data: StepCompanyProps["data"]) => void;
  onNext: () => void;
}

const industries = ["SaaS", "Fintech", "Healthcare", "E-commerce", "Agency", "Other"];
const sizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

export function StepCompany({ data, onChange, onNext }: StepCompanyProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Tell us about your company</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This helps us tailor signal detection to your business.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Company Name</label>
          <Input
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="Acme Corp"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Website</label>
          <Input
            value={data.website}
            onChange={(e) => onChange({ ...data, website: e.target.value })}
            placeholder="https://acme.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Industry</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => onChange({ ...data, industry: ind })}
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  data.industry === ind
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
          <label className="text-sm font-medium">Company Size</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => onChange({ ...data, size: s })}
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  data.size === s
                    ? "border-green-500 bg-green-500/10 text-green-600"
                    : "hover:bg-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={onNext} disabled={!data.name} className="w-full">
        Continue
      </Button>
    </div>
  );
}
