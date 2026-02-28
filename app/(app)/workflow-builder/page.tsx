import { getWorkflowNodes } from "@/lib/data/api";
import { TopBar } from "@/components/top-bar";
import { NodeTile } from "@/components/node-tile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Save, Rocket, Plus } from "lucide-react";

export default async function WorkflowBuilderPage() {
  const nodes = await getWorkflowNodes();

  const triggers = nodes.filter((n) => n.category === "trigger");
  const actions = nodes.filter((n) => n.category === "action");
  const logic = nodes.filter((n) => n.category === "logic");
  const utility = nodes.filter((n) => n.category === "utility");
  const end = nodes.filter((n) => n.category === "end");

  return (
    <>
      <TopBar
        title="Workflow Builder"
        subtitle="Visual automation designer"
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
              <Save className="h-3.5 w-3.5" />
              Save Draft
            </Button>
            <Button size="sm" className="h-8 text-xs gap-1 bg-purple-600 hover:bg-purple-700">
              <Rocket className="h-3.5 w-3.5" />
              Publish
            </Button>
          </div>
        }
      />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Node library */}
          <div className="lg:col-span-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Node Library
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Triggers</p>
                <div className="space-y-1.5">
                  {triggers.map((n) => <NodeTile key={n.id} node={n} />)}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Actions</p>
                <div className="space-y-1.5">
                  {actions.map((n) => <NodeTile key={n.id} node={n} />)}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Logic</p>
                <div className="space-y-1.5">
                  {logic.map((n) => <NodeTile key={n.id} node={n} />)}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Utility</p>
                <div className="space-y-1.5">
                  {utility.map((n) => <NodeTile key={n.id} node={n} />)}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground mb-1.5">End</p>
                <div className="space-y-1.5">
                  {end.map((n) => <NodeTile key={n.id} node={n} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Canvas placeholder */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex items-center justify-center border-dashed border-2">
              <div className="text-center">
                <div className="rounded-full bg-gray-100 p-4 mx-auto w-fit mb-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Drag nodes here to build your workflow
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect triggers, actions, and logic to automate your GTM processes
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
