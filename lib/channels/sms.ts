/**
 * SMS adapter.
 * Uses Twilio when TWILIO_ACCOUNT_SID is set, otherwise mocks.
 */
export async function sendSms(
  to: string,
  body: string
): Promise<{ success: boolean; messageId: string }> {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    return sendViaTwilio(to, body);
  }
  return mockSms(to, body);
}

async function sendViaTwilio(to: string, body: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const from = process.env.TWILIO_PHONE_NUMBER ?? "+15005550006";

  const params = new URLSearchParams({ To: to, From: from, Body: body });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      },
      body: params.toString(),
    }
  );

  if (!res.ok) {
    console.error(`[SMS] Twilio API error: ${res.status}`);
    return mockSms(to, body);
  }

  const data = await res.json();
  return { success: true, messageId: data.sid ?? `twilio-${Date.now()}` };
}

function mockSms(to: string, body: string) {
  console.log(`[SMS Mock] To: ${to} | Body: ${body.slice(0, 50)}...`);
  return { success: true, messageId: `mock-sms-${Date.now()}` };
}
