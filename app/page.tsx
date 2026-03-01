import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { SocialProof } from "@/components/marketing/social-proof";
import { CtaSection } from "@/components/marketing/cta-section";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <HeroSection />
        <SocialProof />
        <FeatureGrid />
        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
