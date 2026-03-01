import { NextRequest } from "next/server";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { sequences } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { calculateAbResults } from "@/lib/ab-testing/stats";

interface StepConfig {
  type: string;
  subject?: string;
  abTest?: boolean;
  variants?: Array<{ id: string; name: string; subject?: string; body?: string }>;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ctx = await getSessionContext();

  const [sequence] = await db
    .select()
    .from(sequences)
    .where(
      and(eq(sequences.id, id), eq(sequences.workspaceId, ctx.workspaceId))
    );

  if (!sequence) return error("Sequence not found", 404);

  const steps = (sequence.steps as unknown as StepConfig[]) ?? [];

  const abSteps = steps
    .map((step, index) => ({ step, index }))
    .filter((s) => s.step.abTest && s.step.variants && s.step.variants.length > 0);

  const results = await Promise.all(
    abSteps.map(async ({ step, index }) => {
      const variantDefs = step.variants!.map((v) => ({
        id: v.id,
        name: v.name,
      }));
      const stats = await calculateAbResults(id, index, variantDefs);
      return {
        stepIndex: index,
        stepType: step.type,
        ...stats,
      };
    })
  );

  return json({ sequenceId: id, abResults: results });
}
