interface ConfidenceBarProps {
  value: number;
  className?: string;
}

export function ConfidenceBar({ value, className = "" }: ConfidenceBarProps) {
  const color = value >= 80 ? "bg-green-500" : value >= 60 ? "bg-amber-500" : "bg-red-400";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="h-1.5 flex-1 rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium text-muted-foreground">{value}%</span>
    </div>
  );
}
