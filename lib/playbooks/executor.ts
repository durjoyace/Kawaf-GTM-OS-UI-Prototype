import { db } from "@/lib/db";
import { sequences, sequenceEnrollments, playbooks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { inngest } from "@/inngest/client";

interface SignalData {
  id: string;
  workspaceId: string;
  accountId: string | null;
}

interface PlaybookData {
  id: string;
  workspaceId: string;
  name: string;
  sequenceConfig: Record<string, unknown> | null;
}

/**
 * Execute a playbook for a matched signal.
 * Creates a sequence enrollment and fires the first step.
 */
export async function executePlaybook(signal: SignalData, playbook: PlaybookData) {
  // Find or create a sequence for this playbook
  let [sequence] = await db
    .select()
    .from(sequences)
    .where(eq(sequences.name, `Playbook: ${playbook.name}`))
    .limit(1);

  if (!sequence) {
    const config = playbook.sequenceConfig as {
      channels?: string[];
      steps?: number;
      cadenceDays?: number;
    } | null;

    const stepCount = config?.steps ?? 3;
    const cadenceDays = config?.cadenceDays ?? 3;
    const channels = config?.channels ?? ["email"];

    const stepArray = Array.from({ length: stepCount }, (_, i) => ({
      type: channels[i % channels.length],
      subject: `${playbook.name} — Step ${i + 1}`,
      delay: i === 0 ? 0 : cadenceDays,
    }));

    [sequence] = await db
      .insert(sequences)
      .values({
        workspaceId: playbook.workspaceId,
        name: `Playbook: ${playbook.name}`,
        channels,
        status: "active",
        steps: stepArray,
      })
      .returning();
  }

  if (!sequence) return null;

  // Create enrollment
  const contactId = signal.accountId ?? signal.id;
  const [enrollment] = await db
    .insert(sequenceEnrollments)
    .values({
      sequenceId: sequence.id,
      contactId,
      currentStep: 0,
      status: "active",
    })
    .returning();

  // Fire first step
  await inngest.send({
    name: "sequence/step.due",
    data: { enrollmentId: enrollment.id },
  });

  return { sequenceId: sequence.id, enrollmentId: enrollment.id };
}
