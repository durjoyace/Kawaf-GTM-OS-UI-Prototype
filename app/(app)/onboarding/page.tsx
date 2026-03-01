import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { workspaces } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSessionContext } from "@/lib/api/utils";
import { OnboardingWizard } from "./client";

export default async function OnboardingPage() {
  const ctx = await getSessionContext();

  const [workspace] = await db
    .select({ onboardingComplete: workspaces.onboardingComplete })
    .from(workspaces)
    .where(eq(workspaces.id, ctx.workspaceId));

  if (workspace?.onboardingComplete) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
            <span className="text-lg font-bold text-white">K</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome to Kawaf</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Let&apos;s set up your GTM intelligence in under 5 minutes.
          </p>
        </div>
        <OnboardingWizard />
      </div>
    </div>
  );
}
