import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-16 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stop Paying $15K/mo for GTM Intelligence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Get AI-powered signal detection, one-click outreach, and full
            attribution — all for less than the cost of a single sales tool.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-green-500 text-white hover:bg-green-600"
              asChild
            >
              <Link href="/login">
                Start Free Today <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
