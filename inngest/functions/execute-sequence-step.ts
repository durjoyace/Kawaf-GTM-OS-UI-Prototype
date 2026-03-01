import { inngest } from "../client";
import { db } from "@/lib/db";
import { sequenceEnrollments, sequences, signalAccounts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { executeStep } from "@/lib/channels/channel-router";
import { assignVariant } from "@/lib/ab-testing/assign-variant";

interface StepConfig {
  type: string;
  subject?: string;
  body?: string;
  delay?: number;
  abTest?: boolean;
  variants?: Array<{ id: string; name: string; subject?: string; body?: string }>;
}

export const executeSequenceStep = inngest.createFunction(
  { id: "execute-sequence-step", name: "Execute Sequence Step" },
  { event: "sequence/step.due" },
  async ({ event, step }) => {
    const { enrollmentId } = event.data as { enrollmentId: string };

    const enrollment = await step.run("fetch-enrollment", async () => {
      const [row] = await db
        .select()
        .from(sequenceEnrollments)
        .where(eq(sequenceEnrollments.id, enrollmentId));
      return row;
    });

    if (!enrollment || enrollment.status !== "active") {
      return { skipped: true, reason: "Enrollment not active" };
    }

    const sequence = await step.run("fetch-sequence", async () => {
      const [row] = await db
        .select()
        .from(sequences)
        .where(eq(sequences.id, enrollment.sequenceId));
      return row;
    });

    if (!sequence) return { error: "Sequence not found" };

    const steps = (sequence.steps as unknown as StepConfig[]) ?? [];
    const currentStep = enrollment.currentStep ?? 0;

    if (currentStep >= steps.length) {
      await step.run("complete-enrollment", async () => {
        await db
          .update(sequenceEnrollments)
          .set({ status: "completed" })
          .where(eq(sequenceEnrollments.id, enrollmentId));
      });
      return { completed: true };
    }

    const stepConfig = steps[currentStep];

    // Resolve variant content for A/B test steps
    let resolvedStep: { type: string; subject?: string; body?: string } = stepConfig;
    let variantId: string | undefined;

    if (stepConfig.abTest && stepConfig.variants && stepConfig.variants.length > 0) {
      const variant = await step.run("assign-variant", async () => {
        return assignVariant(enrollmentId, currentStep, {
          type: stepConfig.type,
          delay: stepConfig.delay,
          abTest: true as const,
          variants: stepConfig.variants!,
        });
      });

      resolvedStep = {
        type: stepConfig.type,
        subject: variant.subject,
        body: variant.body,
      };
      variantId = variant.id;
    }

    // Resolve contact info for channel routing
    const contact = await step.run("resolve-contact", async () => {
      const contactId = enrollment.contactId;
      const [account] = await db
        .select()
        .from(signalAccounts)
        .where(eq(signalAccounts.id, contactId))
        .limit(1);

      return {
        email: account ? (account.metadata as Record<string, string>)?.email ?? contactId : contactId,
        linkedinUrl: account?.linkedinUrl ?? undefined,
        phone: account ? (account.metadata as Record<string, string>)?.phone : undefined,
      };
    });

    const result = await step.run(`execute-step-${currentStep}`, async () => {
      return executeStep(resolvedStep, contact);
    });

    // Advance to next step
    await step.run("advance-step", async () => {
      await db
        .update(sequenceEnrollments)
        .set({ currentStep: currentStep + 1 })
        .where(eq(sequenceEnrollments.id, enrollmentId));
    });

    // Schedule next step if there's a delay
    const nextStep = steps[currentStep + 1];
    if (nextStep?.delay) {
      await step.sleep("wait-for-next-step", `${nextStep.delay}d`);
    }

    return { enrollmentId, stepExecuted: currentStep, result, variantId, nextStep: currentStep + 1 };
  }
);
