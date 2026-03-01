import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { processSignals } from "@/inngest/functions/process-signals";
import { syncIntegration } from "@/inngest/functions/sync-integration";
import { executeWorkflow } from "@/inngest/functions/execute-workflow";
import { executeSequenceStep } from "@/inngest/functions/execute-sequence-step";
import { analyzeTracking } from "@/inngest/functions/analyze-tracking";
import { scanJobPostingsJob } from "@/inngest/functions/scan-job-postings";
import { scanFundingNewsJob } from "@/inngest/functions/scan-funding-news";
import { resetUsage } from "@/inngest/functions/reset-usage";
import { enrichAccounts } from "@/inngest/functions/enrich-accounts";
import { processEngagement } from "@/inngest/functions/process-engagement";
import { icpLearning } from "@/inngest/functions/icp-learning";
import { matchPlaybooks } from "@/inngest/functions/match-playbooks";
import { scanSocial } from "@/inngest/functions/scan-social";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processSignals,
    syncIntegration,
    executeWorkflow,
    executeSequenceStep,
    analyzeTracking,
    scanJobPostingsJob,
    scanFundingNewsJob,
    resetUsage,
    enrichAccounts,
    processEngagement,
    icpLearning,
    matchPlaybooks,
    scanSocial,
  ],
});
