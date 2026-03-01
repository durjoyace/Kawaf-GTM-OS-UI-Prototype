import { inngest } from "../client";
import { db } from "@/lib/db";
import { usageRecords } from "@/lib/db/schema";
import { lt } from "drizzle-orm";

export const resetUsage = inngest.createFunction(
  { id: "reset-usage", name: "Reset Monthly Usage Counters" },
  { cron: "0 0 1 * *" }, // First of every month
  async ({ step }) => {
    // Delete records older than current period
    const currentPeriod = (() => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    })();

    const deleted = await step.run("cleanup-old-usage", async () => {
      const result = await db
        .delete(usageRecords)
        .where(lt(usageRecords.period, currentPeriod))
        .returning({ id: usageRecords.id });
      return result.length;
    });

    return { deletedRecords: deleted };
  }
);
