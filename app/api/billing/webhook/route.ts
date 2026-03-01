import { NextRequest } from "next/server";
import { getStripe } from "@/lib/billing/stripe";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const workspaceId = session.metadata?.workspaceId;
      if (!workspaceId || !session.subscription) break;

      const sub = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const priceId = sub.items.data[0]?.price?.id;
      const plan = priceId?.includes("team")
        ? "team"
        : priceId?.includes("pro")
          ? "pro"
          : "pro";

      await db.insert(subscriptions).values({
        workspaceId,
        stripeSubscriptionId: sub.id,
        plan,
        status: "active",
        currentPeriodStart: new Date(sub.current_period_start * 1000),
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
      });
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      await db
        .update(subscriptions)
        .set({
          status: sub.status === "active" ? "active" : sub.status === "past_due" ? "past_due" : "canceled",
          currentPeriodStart: new Date(sub.current_period_start * 1000),
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        })
        .where(eq(subscriptions.stripeSubscriptionId, sub.id));
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await db
        .update(subscriptions)
        .set({ status: "canceled" })
        .where(eq(subscriptions.stripeSubscriptionId, sub.id));
      break;
    }
  }

  return new Response("ok", { status: 200 });
}
