import { sendEmail } from "@/lib/email/resend";
import { sendLinkedInMessage } from "./linkedin";
import { sendSms } from "./sms";

interface StepConfig {
  type: string;
  subject?: string;
  body?: string;
}

interface ContactInfo {
  email?: string;
  linkedinUrl?: string;
  phone?: string;
}

/**
 * Route a sequence step to the correct channel adapter.
 */
export async function executeStep(
  step: StepConfig,
  contact: ContactInfo
): Promise<{ type: string; success: boolean; messageId?: string }> {
  switch (step.type) {
    case "email": {
      if (!contact.email) return { type: "email", success: false };
      const result = await sendEmail({
        to: contact.email,
        subject: step.subject ?? "Follow up",
        html: `<p>${step.body ?? step.subject ?? "Hello"}</p>`,
      });
      return { type: "email", success: true, messageId: result?.id };
    }

    case "linkedin": {
      if (!contact.linkedinUrl) {
        console.log(`[Channel Router] No LinkedIn URL for contact, skipping`);
        return { type: "linkedin", success: false };
      }
      const result = await sendLinkedInMessage(
        contact.linkedinUrl,
        step.body ?? step.subject ?? "Hi, I wanted to connect."
      );
      return { type: "linkedin", success: result.success, messageId: result.messageId };
    }

    case "sms": {
      if (!contact.phone) {
        console.log(`[Channel Router] No phone number for contact, skipping`);
        return { type: "sms", success: false };
      }
      const result = await sendSms(contact.phone, step.body ?? step.subject ?? "Hi from Kawaf");
      return { type: "sms", success: result.success, messageId: result.messageId };
    }

    case "call": {
      console.log(`[Channel Router] Call step logged: ${step.subject ?? "Call task"}`);
      return { type: "call", success: true };
    }

    default: {
      console.log(`[Channel Router] Unknown channel: ${step.type}`);
      return { type: step.type, success: true };
    }
  }
}
