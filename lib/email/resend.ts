import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailParams) {
  const resend = getResend();

  if (!resend) {
    console.log(`[Email Mock] To: ${to} | Subject: ${subject}`);
    return { id: `mock-${Date.now()}`, mock: true };
  }

  const { data, error } = await resend.emails.send({
    from: from ?? "Kawaf GTM <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}
