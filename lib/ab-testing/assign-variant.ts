import { db } from "@/lib/db";
import { sequenceEnrollments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface AbVariant {
  id: string;
  name: string;
  subject?: string;
  body?: string;
}

interface AbStep {
  type: string;
  delay?: number;
  abTest: true;
  variants: AbVariant[];
}

/**
 * Assign a variant for a given A/B step. If already assigned (idempotent),
 * return the previously assigned variant. Otherwise pick randomly and persist.
 */
export async function assignVariant(
  enrollmentId: string,
  stepIndex: number,
  step: AbStep
): Promise<AbVariant> {
  const [enrollment] = await db
    .select()
    .from(sequenceEnrollments)
    .where(eq(sequenceEnrollments.id, enrollmentId));

  if (!enrollment) throw new Error("Enrollment not found");

  const assignments =
    (enrollment.variantAssignments as Record<string, string>) ?? {};
  const key = String(stepIndex);

  // Already assigned — return the same variant
  if (assignments[key]) {
    const existing = step.variants.find((v) => v.id === assignments[key]);
    if (existing) return existing;
  }

  // Randomly pick a variant
  const picked =
    step.variants[Math.floor(Math.random() * step.variants.length)];

  // Persist assignment
  const updated = { ...assignments, [key]: picked.id };
  await db
    .update(sequenceEnrollments)
    .set({ variantAssignments: updated })
    .where(eq(sequenceEnrollments.id, enrollmentId));

  return picked;
}
