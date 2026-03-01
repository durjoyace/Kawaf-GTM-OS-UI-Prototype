import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { HeroSection } from "@/components/marketing/hero-section";
import { SocialProof } from "@/components/marketing/social-proof";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Testimonials } from "@/components/marketing/testimonials";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Kawaf GTM OS — AI-Powered Go-To-Market Intelligence",
  description: "Detect buying signals, draft personalized outreach, and close deals faster with AI — at 1/50th the cost of a GTM agency.",
};

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="marketing flex min-h-screen flex-col bg-[var(--mkt-bg)] text-[var(--mkt-text)]">
      <MarketingHeader />
      <main className="flex-1">
        <HeroSection />
        <SocialProof />
        <HowItWorks />
        <FeatureGrid />
        <Testimonials />
        <TrustBadges />
        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
