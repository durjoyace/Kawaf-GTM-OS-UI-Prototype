"use client";

export function MiniBarChart({ data }: { data: number[] }) {
  if (!data.length) return null;
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-[3px] h-8">
      {data.map((value, i) => (
        <div
          key={i}
          className="w-[4px] rounded-full bg-blue-500/30"
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  );
}
