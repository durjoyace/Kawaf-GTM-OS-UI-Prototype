import { ShieldCheck, Globe, Lock, Server } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "SOC 2 Type II" },
  { icon: Globe, label: "GDPR Compliant" },
  { icon: Lock, label: "256-bit Encryption" },
  { icon: Server, label: "99.9% Uptime SLA" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-[var(--mkt-border)] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-[var(--mkt-text-secondary)]"
            >
              <badge.icon className="h-4 w-4" />
              <span className="text-sm">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
