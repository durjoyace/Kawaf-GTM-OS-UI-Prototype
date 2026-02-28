import { ArrowUp, ArrowDown } from "lucide-react";

interface TrendDeltaProps {
  value: string;
  direction: "up" | "down";
}

export function TrendDelta({ value, direction }: TrendDeltaProps) {
  const isPositive = direction === "up";
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
      {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
      {value}
    </span>
  );
}
