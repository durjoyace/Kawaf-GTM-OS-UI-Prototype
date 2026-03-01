/**
 * LinkedIn message adapter.
 * Uses Unipile API when UNIPILE_API_KEY is set, otherwise mocks.
 */
export async function sendLinkedInMessage(
  profileUrl: string,
  message: string
): Promise<{ success: boolean; messageId: string }> {
  if (process.env.UNIPILE_API_KEY) {
    return sendViaUnipile(profileUrl, message);
  }
  return mockLinkedIn(profileUrl, message);
}

async function sendViaUnipile(profileUrl: string, message: string) {
  const res = await fetch("https://api.unipile.com/api/v1/messages/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
    },
    body: JSON.stringify({
      provider: "linkedin",
      recipient_url: profileUrl,
      text: message,
    }),
  });

  if (!res.ok) {
    console.error(`[LinkedIn] Unipile API error: ${res.status}`);
    return mockLinkedIn(profileUrl, message);
  }

  const data = await res.json();
  return { success: true, messageId: data.id ?? `unipile-${Date.now()}` };
}

function mockLinkedIn(profileUrl: string, message: string) {
  console.log(`[LinkedIn Mock] To: ${profileUrl} | Message: ${message.slice(0, 50)}...`);
  return { success: true, messageId: `mock-li-${Date.now()}` };
}
