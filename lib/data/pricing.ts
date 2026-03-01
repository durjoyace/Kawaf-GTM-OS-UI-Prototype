export interface PricingTier {
  name: string;
  price: number | null; // null = custom
  priceLabel: string;
  description: string;
  cta: string;
  ctaVariant: "outline" | "default" | "secondary";
  highlighted: boolean;
  features: string[];
  limits: {
    signals: number | "Unlimited";
    emails: number | "Unlimited";
    integrations: number | "Unlimited";
    users: number | "Unlimited";
  };
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: 0,
    priceLabel: "$0/mo",
    description: "Get started with AI-powered signal detection. No credit card required.",
    cta: "Start Free",
    ctaVariant: "outline",
    highlighted: false,
    features: [
      "50 signals per month",
      "10 AI-drafted outreach emails",
      "1 CRM integration",
      "Website visitor tracking",
      "Basic intent scoring",
      "Community support",
    ],
    limits: {
      signals: 50,
      emails: 10,
      integrations: 1,
      users: 1,
    },
  },
  {
    name: "Pro",
    price: 99,
    priceLabel: "$99/mo",
    description: "For growing teams that need full AI intelligence and unlimited outreach.",
    cta: "Start Pro Trial",
    ctaVariant: "default",
    highlighted: true,
    features: [
      "Unlimited signals",
      "Unlimited AI outreach emails",
      "5 CRM integrations",
      "AI scoring with Claude",
      "Job posting & funding signals",
      "Playbook templates",
      "Priority support",
      "Custom ICP configuration",
    ],
    limits: {
      signals: "Unlimited",
      emails: "Unlimited",
      integrations: 5,
      users: 5,
    },
  },
  {
    name: "Team",
    price: 299,
    priceLabel: "$299/mo",
    description: "For sales teams that want to dominate their market with full automation.",
    cta: "Contact Sales",
    ctaVariant: "outline",
    highlighted: false,
    features: [
      "Everything in Pro",
      "Unlimited integrations",
      "Unlimited team members",
      "Workflow automation builder",
      "Multi-channel sequences",
      "Advanced attribution",
      "API access",
      "Dedicated account manager",
      "SSO & SAML",
    ],
    limits: {
      signals: "Unlimited",
      emails: "Unlimited",
      integrations: "Unlimited",
      users: "Unlimited",
    },
  },
];
