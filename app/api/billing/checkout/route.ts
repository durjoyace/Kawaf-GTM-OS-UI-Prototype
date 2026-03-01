import { NextRequest } from "next/server";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { getStripe } from "@/lib/billing/stripe";
import { getPlan } from "@/lib/billing/plans";
import { db } from "@/lib/db";
import { workspaces } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const ctx = await getSessionContext();
  const { planId } = (await req.json()) as { planId: string };

  const plan = getPlan(planId);
  if (!plan.stripePriceId) {
    return error("Cannot checkout for free plan", 400);
  }

  const stripe = getStripe();

  // Get or create Stripe customer
  const [workspace] = await db
    .select({ stripeCustomerId: workspaces.stripeCustomerId })
    .from(workspaces)
    .where(eq(workspaces.id, ctx.workspaceId));

  let customerId = workspace?.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      metadata: { workspaceId: ctx.workspaceId, userId: ctx.userId },
    });
    customerId = customer.id;
    await db
      .update(workspaces)
      .set({ stripeCustomerId: customerId })
      .where(eq(workspaces.id, ctx.workspaceId));
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/settings/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/settings/billing?canceled=true`,
    metadata: { workspaceId: ctx.workspaceId },
  });

  return json({ url: session.url });
}
