import { cn } from "@/lib/utils";

interface UsageMeterProps {
  label: string;
  current: number;
  limit: number | "Unlimited";
}

export function UsageMeter({ label, current, limit }: UsageMeterProps) {
  const isUnlimited = limit === "Unlimited";
  const pct = isUnlimited ? 0 : Math.min((current / (limit as number)) * 100, 100);
  const isNearLimit = !isUnlimited && pct >= 80;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {current} / {isUnlimited ? "Unlimited" : limit}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isNearLimit ? "bg-amber-500" : "bg-green-500"
          )}
          style={{ width: isUnlimited ? "5%" : `${pct}%` }}
        />
      </div>
    </div>
  );
}
