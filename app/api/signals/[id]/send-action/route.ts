import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { outreachEmails } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { sendEmail } from "@/lib/email/resend";

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

  // Send via Resend
  const result = await sendEmail({
    to: toEmail,
    subject,
    html: `<div style="font-family: sans-serif; line-height: 1.6;">${emailBody.replace(/\n/g, "<br>")}</div>`,
  });

  // Update DB record
  await db
    .update(outreachEmails)
    .set({
      toEmail,
      subject,
      body: emailBody,
      status: "sent",
      sentAt: new Date(),
    })
    .where(eq(outreachEmails.id, emailId));

  return json({ success: true, emailId: email.id, resendId: result?.id });
}
