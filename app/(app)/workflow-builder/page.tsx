import { getWorkflowNodes } from "@/lib/data/api";
import { TopBar } from "@/components/top-bar";
import { WorkflowCanvas } from "./canvas";

export default async function WorkflowBuilderPage() {
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
