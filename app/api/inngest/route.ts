import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { processSignals } from "@/inngest/functions/process-signals";
import { syncIntegration } from "@/inngest/functions/sync-integration";
import { executeWorkflow } from "@/inngest/functions/execute-workflow";
import { executeSequenceStep } from "@/inngest/functions/execute-sequence-step";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processSignals, syncIntegration, executeWorkflow, executeSequenceStep],
});
