export interface PlanDef {
  id: string;
  name: string;
  stripePriceId: string | null; // null for free tier
  price: number;
}

export const plans: Record<string, PlanDef> = {
  free: {
    id: "free",
    name: "Free",
    stripePriceId: null,
    price: 0,
  },
  pro: {
    id: "pro",
    name: "Pro",
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? "price_pro_placeholder",
    price: 99,
  },
  team: {
    id: "team",
    name: "Team",
    stripePriceId: process.env.STRIPE_TEAM_PRICE_ID ?? "price_team_placeholder",
    price: 299,
  },
};

export function getPlan(planId: string): PlanDef {
  return plans[planId] ?? plans.free;
}
