import { getSessionContext, json, error } from "@/lib/api/utils";
import { getStripe } from "@/lib/billing/stripe";
import { db } from "@/lib/db";
import { workspaces } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const ctx = await getSessionContext();
  const stripe = getStripe();

  const [workspace] = await db
    .select({ stripeCustomerId: workspaces.stripeCustomerId })
    .from(workspaces)
    .where(eq(workspaces.id, ctx.workspaceId));

  if (!workspace?.stripeCustomerId) {
    return error("No billing account found", 400);
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: workspace.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/settings/billing`,
  });

  return json({ url: session.url });
}
