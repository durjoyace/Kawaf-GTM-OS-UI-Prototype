import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workspaces } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSessionContext, json, error } from "@/lib/api/utils";

export async function POST(req: NextRequest) {
  const ctx = await getSessionContext();
  const body = await req.json();

  const { company, icp } = body as {
    company: { name: string; website: string; industry: string; size: string };
    icp: { industries: string[]; sizes: string[]; titles: string[] };
  };

  if (!company?.name) {
    return error("Company name is required", 400);
  }

  await db
    .update(workspaces)
    .set({
      name: company.name,
      companyInfo: company,
      icpConfig: icp,
      onboardingComplete: true,
    })
    .where(eq(workspaces.id, ctx.workspaceId));

  return json({ success: true });
}
