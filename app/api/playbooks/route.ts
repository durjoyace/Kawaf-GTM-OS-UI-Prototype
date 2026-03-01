import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { playbooks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSessionContext, json, error } from "@/lib/api/utils";
import { playbookTemplates } from "@/lib/data/playbook-templates";

export async function GET() {
  const ctx = await getSessionContext();

  const results = await db
    .select()
    .from(playbooks)
    .where(eq(playbooks.workspaceId, ctx.workspaceId))
    .orderBy(playbooks.createdAt);

  return json(results);
}

export async function POST(req: NextRequest) {
  const ctx = await getSessionContext();
  const body = await req.json();
  const { templateId } = body as { templateId: string };

  const template = playbookTemplates.find((t) => t.id === templateId);
  if (!template) {
    return error("Template not found", 404);
  }

  const [playbook] = await db
    .insert(playbooks)
    .values({
      workspaceId: ctx.workspaceId,
      templateId: template.id,
      name: template.name,
      industry: template.industry,
      signalRules: template.signalRules,
      sequenceConfig: template.sequenceConfig,
      status: "draft",
    })
    .returning();

  return json(playbook, 201);
}
