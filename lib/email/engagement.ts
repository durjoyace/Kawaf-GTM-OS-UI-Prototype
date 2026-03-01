import { db } from "@/lib/db";
import { emailEngagements, outreachEmails } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { inngest } from "@/inngest/client";

/**
 * Record an email engagement event (open, click, reply, bounce).
 */
export async function recordEngagement(
  trackingId: string,
  type: "open" | "click" | "reply" | "bounce",
  meta?: { linkUrl?: string; ipAddress?: string; userAgent?: string }
) {
  // Find the outreach email by tracking ID
  const [email] = await db
    .select({ id: outreachEmails.id })
    .from(outreachEmails)
    .where(eq(outreachEmails.trackingId, trackingId));

  if (!email) return null;

  // Insert engagement record
  const [engagement] = await db
    .insert(emailEngagements)
    .values({
      outreachEmailId: email.id,
      type,
      linkUrl: meta?.linkUrl ?? null,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
    })
    .returning();

  // Update aggregate counters on outreach email
  if (type === "open") {
    await db
      .update(outreachEmails)
      .set({ opens: sql`${outreachEmails.opens} + 1` })
      .where(eq(outreachEmails.id, email.id));
  } else if (type === "click") {
    await db
      .update(outreachEmails)
      .set({ clicks: sql`${outreachEmails.clicks} + 1` })
      .where(eq(outreachEmails.id, email.id));
  }

  // Emit event for further processing
  await inngest.send({
    name: "email/engagement.recorded",
    data: {
      engagementId: engagement.id,
      outreachEmailId: email.id,
      type,
      trackingId,
    },
  });

  return engagement;
}
