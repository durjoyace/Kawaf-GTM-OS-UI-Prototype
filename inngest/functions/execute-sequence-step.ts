import { inngest } from "../client";
import { db } from "@/lib/db";
import { sequenceEnrollments, sequences, signalAccounts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { executeStep } from "@/lib/channels/channel-router";

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

    const steps = (sequence.steps as Array<{ type: string; subject?: string; body?: string; delay?: number }>) ?? [];
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

    // Resolve contact info for channel routing
    const contact = await step.run("resolve-contact", async () => {
      const contactId = enrollment.contactId;
      // Try to resolve from signal accounts
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
      return executeStep(stepConfig, contact);
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

    return { enrollmentId, stepExecuted: currentStep, result, nextStep: currentStep + 1 };
  }
);
