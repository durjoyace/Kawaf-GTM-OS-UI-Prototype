import { NextRequest } from "next/server";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { db } from "@/lib/db";
import { sequences, sequenceEnrollments, outreachEmails, emailEngagements } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

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

  // Enrollment stats
  const enrollments = await db
    .select()
    .from(sequenceEnrollments)
    .where(eq(sequenceEnrollments.sequenceId, id));

  const totalEnrolled = enrollments.length;
  const active = enrollments.filter((e) => e.status === "active").length;
  const completed = enrollments.filter((e) => e.status === "completed").length;

  // Build step-by-step metrics
  const steps = (sequence.steps as Array<{ type: string; subject?: string }>) ?? [];
  const stepMetrics = steps.map((step, index) => {
    const atOrPast = enrollments.filter((e) => (e.currentStep ?? 0) > index).length;
    return {
      step: index + 1,
      type: step.type,
      subject: step.subject ?? `Step ${index + 1}`,
      reached: atOrPast,
      completionRate: totalEnrolled > 0 ? Math.round((atOrPast / totalEnrolled) * 100) : 0,
    };
  });

  return json({
    sequenceId: id,
    name: sequence.name,
    totalEnrolled,
    active,
    completed,
    openRate: sequence.openRate ?? 0,
    replyRate: sequence.replyRate ?? 0,
    meetingsBooked: sequence.meetingsBooked ?? 0,
    stepMetrics,
  });
}
