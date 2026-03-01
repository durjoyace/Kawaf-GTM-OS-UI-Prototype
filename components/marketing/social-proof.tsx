const metrics = [
  { value: "50x", label: "Cheaper than agencies" },
  { value: "<5 min", label: "Time to first signal" },
  { value: "10K+", label: "Signals processed" },
  { value: "99.9%", label: "Uptime" },
];

export function SocialProof() {
  return (
    <section className="border-y bg-muted/30 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl font-bold text-green-500">{metric.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
