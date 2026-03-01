import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { outreachEmails } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { sendEmail } from "@/lib/email/resend";
import { wrapEmailWithTracking } from "@/lib/email/tracking";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: signalId } = await params;
  const ctx = await getSessionContext();

  const body = await req.json();
  const { emailId, toEmail, subject, emailBody } = body as {
    emailId: string;
    toEmail: string;
    subject: string;
    emailBody: string;
  };

  if (!toEmail || !subject || !emailBody) {
    return error("Missing required fields: toEmail, subject, emailBody", 400);
  }

  // Verify the outreach email belongs to this workspace
  const [email] = await db
    .select()
    .from(outreachEmails)
    .where(eq(outreachEmails.id, emailId));

  if (!email || email.workspaceId !== ctx.workspaceId) {
    return error("Outreach email not found", 404);
  }

  // Generate tracking ID and wrap HTML with tracking
  const trackingId = crypto.randomUUID();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kawaf.io";
  // Sanitize email body — escape HTML entities to prevent injection
  const sanitized = emailBody
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
  const rawHtml = `<div style="font-family: sans-serif; line-height: 1.6;">${sanitized}</div>`;
  const trackedHtml = wrapEmailWithTracking(rawHtml, trackingId, baseUrl);

  // Send via Resend
  const result = await sendEmail({
    to: toEmail,
    subject,
    html: trackedHtml,
  });

  // Update DB record with tracking ID
  await db
    .update(outreachEmails)
    .set({
      toEmail,
      subject,
      body: emailBody,
      status: "sent",
      trackingId,
      sentAt: new Date(),
    })
    .where(eq(outreachEmails.id, emailId));

  return json({ success: true, emailId: email.id, resendId: result?.id });
}
