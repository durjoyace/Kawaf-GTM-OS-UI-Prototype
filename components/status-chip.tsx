import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  connected: "bg-green-50 text-green-700 border-green-200",
  "high impact": "bg-red-50 text-red-700 border-red-200",
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-gray-50 text-gray-600 border-gray-200",
  paused: "bg-gray-50 text-gray-600 border-gray-200",
  draft: "bg-blue-50 text-blue-700 border-blue-200",
  disconnected: "bg-red-50 text-red-700 border-red-200",
  error: "bg-red-50 text-red-700 border-red-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export function StatusChip({ label, className }: { label: string; className?: string }) {
  const key = label.toLowerCase();
  const variant = variants[key] || "bg-gray-50 text-gray-600 border-gray-200";

  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", variant, className)}>
      {label}
    </span>
  );
}
