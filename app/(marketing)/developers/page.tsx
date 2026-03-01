import type { Metadata } from "next";
import Link from "next/link";
import { ApiReference } from "@/components/developers/api-reference";

export const metadata: Metadata = {
  title: "API Documentation — Kawaf GTM OS",
  description: "Integrate Kawaf GTM OS into your workflow with our REST API.",
};

export default function DevelopersPage() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--mkt-accent)]">
            DEVELOPERS
          </span>
          <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            API Reference
          </h1>
          <p className="mt-4 text-lg text-[var(--mkt-text-secondary)]">
            Build on Kawaf GTM OS. Ingest signals, trigger outreach, and manage
            playbooks programmatically.
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-[var(--mkt-border)] bg-[var(--mkt-bg-card)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--mkt-text)]">
            Authentication
          </h2>
          <p className="mb-4 text-sm text-[var(--mkt-text-secondary)]">
            All API requests require authentication via a Bearer token in the
            Authorization header. Get your API key from the Settings page after
            signing in.
          </p>
          <div className="rounded-lg bg-[var(--mkt-bg-elevated)] p-4">
            <code className="font-mono text-xs text-[var(--mkt-accent)]">
              curl -H &quot;Authorization: Bearer YOUR_API_KEY&quot; \
              <br />
              &nbsp;&nbsp;https://your-app.vercel.app/api/signals
            </code>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--mkt-text)]">
            Endpoints
          </h2>
          <div className="rounded-xl border border-[var(--mkt-border)] bg-[var(--mkt-bg-card)] p-6">
            <ApiReference />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/login"
            className="inline-flex items-center rounded-lg bg-[var(--mkt-accent)] px-6 py-3 text-sm font-medium text-black transition-shadow hover:shadow-[0_0_24px_var(--mkt-accent-glow)]"
          >
            Get Your API Key
          </Link>
        </div>
      </div>
    </section>
  );
}
