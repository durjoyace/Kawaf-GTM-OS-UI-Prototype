import {
  Radar,
  Sparkles,
  Mail,
  Eye,
  BarChart3,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Radar,
    title: "Signal Detection",
    description:
      "Automatically detect buying intent from CRM activity, website visits, job postings, and funding news.",
  },
  {
    icon: Sparkles,
    title: "AI Scoring",
    description:
      "Claude-powered contextual scoring with natural language explanations — not just arbitrary thresholds.",
  },
  {
    icon: Mail,
    title: "One-Click Outreach",
    description:
      "AI drafts personalized emails based on the signal context. Edit and send in seconds.",
  },
  {
    icon: Eye,
    title: "Visitor Tracking",
    description:
      "Drop a snippet on your site and automatically detect when prospects research your product.",
  },
  {
    icon: BarChart3,
    title: "Revenue Attribution",
    description:
      "See which signals led to closed deals. Prove ROI and optimize your go-to-market motion.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Build visual workflows that trigger sequences, update CRMs, and route leads — no code required.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Win Deals
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete GTM operating system — signal detection, outreach, attribution, and automation.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
