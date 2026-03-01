import { getWorkflowNodes } from "@/lib/data/api";
import { getSessionContext } from "@/lib/api/utils";
import { TopBar } from "@/components/top-bar";
import { WorkflowCanvas } from "./canvas";

export const dynamic = "force-dynamic";

export default async function WorkflowBuilderPage() {
  const ctx = await getSessionContext();
  const nodes = await getWorkflowNodes();

  return (
    <>
      <TopBar
        title="Workflow Builder"
        subtitle="Visual automation designer"
      />
      <WorkflowCanvas nodeLibrary={nodes} />
    </>
  );
}
