"use client";

import { useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toast } from "sonner";
import { Save, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomNode } from "@/components/workflow/custom-node";
import { NodeLibrary } from "@/components/workflow/node-library";
import { NodeInspector } from "@/components/workflow/node-inspector";
import type { WorkflowNode, WorkflowNodeData } from "@/lib/types/models";

const nodeTypes = { custom: CustomNode };

const initialNodes: Node<WorkflowNodeData>[] = [
  {
    id: "init-1",
    type: "custom",
    position: { x: 250, y: 50 },
    data: { label: "Signal Trigger", icon: "zap", category: "trigger", color: "green" },
  },
  {
    id: "init-2",
    type: "custom",
    position: { x: 250, y: 200 },
    data: { label: "Send Email", icon: "mail", category: "action", color: "blue" },
  },
  {
    id: "init-3",
    type: "custom",
    position: { x: 250, y: 350 },
    data: { label: "Wait / Delay", icon: "clock", category: "utility", color: "gray", config: { Duration: "24 hours" } },
  },
  {
    id: "init-4",
    type: "custom",
    position: { x: 100, y: 500 },
    data: { label: "If/Else Branch", icon: "git-branch", category: "logic", color: "amber" },
  },
  {
    id: "init-5",
    type: "custom",
    position: { x: 400, y: 650 },
    data: { label: "End / Goal", icon: "flag", category: "end", color: "green" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "init-1", target: "init-2", animated: true },
  { id: "e2-3", source: "init-2", target: "init-3" },
  { id: "e3-4", source: "init-3", target: "init-4" },
  { id: "e4-5", source: "init-4", target: "init-5" },
];

interface WorkflowCanvasProps {
  nodeLibrary: WorkflowNode[];
}

export function WorkflowCanvas({ nodeLibrary }: WorkflowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<WorkflowNodeData> | null>(null);
  const [published, setPublished] = useState(false);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node as Node<WorkflowNodeData>);
    },
    []
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  function addNode(template: WorkflowNode) {
    const id = `node-${Date.now()}`;
    const newNode: Node<WorkflowNodeData> = {
      id,
      type: "custom",
      position: { x: 250 + Math.random() * 100, y: 100 + nodes.length * 80 },
      data: {
        label: template.label,
        icon: template.icon,
        category: template.category,
        color: template.color,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    toast.success(`Added "${template.label}" node`);
  }

  function updateNode(id: string, updates: Partial<WorkflowNodeData>) {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...updates } } : n
      )
    );
    setSelectedNode((prev) =>
      prev && prev.id === id ? { ...prev, data: { ...prev.data, ...updates } } : prev
    );
  }

  function deleteNode(id: string) {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setSelectedNode(null);
    toast.info("Node deleted");
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = { name: "My Workflow", nodes, edges };
      if (workflowId) {
        await fetch(`/api/workflows/${workflowId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        const res = await fetch("/api/workflows", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        setWorkflowId(data.id);
      }
      toast.success("Draft saved", { description: `${nodes.length} nodes, ${edges.length} connections` });
    } catch {
      toast.error("Failed to save workflow");
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (!workflowId) {
      await handleSave();
    }
    if (!workflowId) return;
    try {
      await fetch(`/api/workflows/${workflowId}/publish`, { method: "POST" });
      setPublished(true);
      toast.success("Workflow published!", {
        description: "Your workflow is now live and processing signals.",
      });
    } catch {
      toast.error("Failed to publish workflow");
    }
  }

  return (
    <div className="flex h-[calc(100vh-57px)]">
      <NodeLibrary nodes={nodeLibrary} onAddNode={addNode} />
      <div className="flex-1 relative">
        {/* Toolbar */}
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <Button size="sm" variant="outline" onClick={handleSave} className="h-8 text-xs gap-1 bg-white/90 backdrop-blur-sm shadow-sm">
            <Save className="h-3.5 w-3.5" />
            Save Draft
          </Button>
          <Button
            size="sm"
            onClick={handlePublish}
            className={`h-8 text-xs gap-1 shadow-sm ${published ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            <Rocket className="h-3.5 w-3.5" />
            {published ? "Published" : "Publish"}
          </Button>
        </div>
        {/* Status badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium shadow-sm bg-white/90 backdrop-blur-sm ${published ? "text-green-700 border-green-200" : "text-amber-700 border-amber-200"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${published ? "bg-green-500" : "bg-amber-500"}`} />
            {published ? "Live" : "Draft"}
          </span>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          defaultEdgeOptions={{ type: "smoothstep", style: { stroke: "#94a3b8", strokeWidth: 2 } }}
        >
          <Background color="#e2e8f0" gap={20} size={1} />
          <Controls className="!border !border-gray-200 !rounded-lg !shadow-sm" />
          <MiniMap
            className="!border !border-gray-200 !rounded-lg !shadow-sm"
            nodeColor={(n) => {
              const d = n.data as WorkflowNodeData;
              const colors: Record<string, string> = { green: "#22c55e", blue: "#3b82f6", amber: "#f59e0b", gray: "#9ca3af" };
              return colors[d.color] || "#9ca3af";
            }}
          />
        </ReactFlow>
      </div>
      {selectedNode && (
        <NodeInspector
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdate={updateNode}
          onDelete={deleteNode}
        />
      )}
    </div>
  );
}
