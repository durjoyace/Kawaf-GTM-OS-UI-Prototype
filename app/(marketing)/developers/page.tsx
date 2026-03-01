import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApiReference } from "@/components/developers/api-reference";

export const metadata: Metadata = {
  title: "API Documentation — Kawaf GTM OS",
  description: "Integrate Kawaf GTM OS into your workflow with our REST API.",
};

export default function DevelopersPage() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            API Reference
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Build on Kawaf GTM OS. Ingest signals, trigger outreach, and manage playbooks programmatically.
          </p>
        </div>

        <div className="mt-10 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Authentication</h2>
          <p className="text-sm text-muted-foreground mb-4">
            All API requests require authentication via a Bearer token in the Authorization header.
            Get your API key from the Settings page after signing in.
          </p>
          <div className="rounded-lg bg-slate-900 p-4">
            <code className="text-xs text-green-400 font-mono">
              curl -H &quot;Authorization: Bearer YOUR_API_KEY&quot; \<br />
              &nbsp;&nbsp;https://your-app.vercel.app/api/signals
            </code>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Endpoints</h2>
          <ApiReference />
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/login">Get Your API Key</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
