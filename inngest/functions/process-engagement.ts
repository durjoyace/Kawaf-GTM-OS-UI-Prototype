import { inngest } from "../client";
import { db } from "@/lib/db";
import { emailEngagements, outreachEmails, signals, notifications, workspaceMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const processEngagement = inngest.createFunction(
  { id: "process-engagement", name: "Process Email Engagement" },
  { event: "email/engagement.recorded" },
  async ({ event, step }) => {
    const { outreachEmailId, type } = event.data as {
      engagementId: string;
      outreachEmailId: string;
      type: string;
      trackingId: string;
    };

    // Fetch the outreach email for context
    const email = await step.run("fetch-email", async () => {
      const [row] = await db
        .select()
        .from(outreachEmails)
        .where(eq(outreachEmails.id, outreachEmailId));
      return row;
    });

    if (!email) return { skipped: true, reason: "Email not found" };

    // For reply events, create a new signal
    if (type === "reply" && email.accountId) {
      await step.run("create-reply-signal", async () => {
        await db.insert(signals).values({
          workspaceId: email.workspaceId,
          accountId: email.accountId,
          signalType: "Email Reply",
          category: "marketing-engagement",
          description: `Reply received to outreach email: "${email.subject}"`,
          confidence: 75,
          confidenceLevel: "high",
          impact: "high",
          tags: ["email-reply", "engagement"],
          source: "email-tracking",
        });
      });

      // Notify workspace owner
      await step.run("notify-reply", async () => {
        const [member] = await db
          .select({ userId: workspaceMembers.userId })
          .from(workspaceMembers)
          .where(eq(workspaceMembers.workspaceId, email.workspaceId))
          .limit(1);

        if (member) {
          await db.insert(notifications).values({
            workspaceId: email.workspaceId,
            userId: member.userId,
            title: "Email reply received",
            description: `Reply to "${email.subject}" from ${email.toEmail}`,
            type: "sequence",
          });
        }
      });
    }

    return { processed: true, type, outreachEmailId };
  }
);
