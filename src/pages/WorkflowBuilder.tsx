import React, { useState, Component } from 'react';
import { TopBar } from '../components/TopBar';
import {
  PlusIcon,
  ZapIcon,
  GitBranchIcon,
  ClockIcon,
  MailIcon,
  LinkedinIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  PlayIcon,
  SaveIcon,
  TrashIcon,
  MoveIcon,
  SettingsIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  DatabaseIcon,
  FilterIcon,
  BellIcon,
  WebhookIcon } from
'lucide-react';
type NodeType = 'trigger' | 'action' | 'condition' | 'delay' | 'end';
type WorkflowNode = {
  id: string;
  type: NodeType;
  label: string;
  sublabel: string;
  icon: ComponentType<{
    className?: string;
  }>;
  color: string;
  bg: string;
  border: string;
  x: number;
  y: number;
};
const nodeLibrary = [
{
  type: 'trigger' as NodeType,
  label: 'Signal Trigger',
  icon: ZapIcon,
  color: 'text-blue-600',
  bg: 'bg-blue-50',
  border: 'border-blue-200'
},
{
  type: 'trigger' as NodeType,
  label: 'CRM Event',
  icon: DatabaseIcon,
  color: 'text-violet-600',
  bg: 'bg-violet-50',
  border: 'border-violet-200'
},
{
  type: 'action' as NodeType,
  label: 'Send Email',
  icon: MailIcon,
  color: 'text-gray-600',
  bg: 'bg-gray-50',
  border: 'border-gray-200'
},
{
  type: 'action' as NodeType,
  label: 'LinkedIn DM',
  icon: LinkedinIcon,
  color: 'text-blue-600',
  bg: 'bg-blue-50',
  border: 'border-blue-200'
},
{
  type: 'action' as NodeType,
  label: 'Send SMS',
  icon: MessageSquareIcon,
  color: 'text-green-600',
  bg: 'bg-green-50',
  border: 'border-green-200'
},
{
  type: 'action' as NodeType,
  label: 'Webhook',
  icon: WebhookIcon,
  color: 'text-orange-600',
  bg: 'bg-orange-50',
  border: 'border-orange-200'
},
{
  type: 'condition' as NodeType,
  label: 'If/Else Branch',
  icon: GitBranchIcon,
  color: 'text-violet-600',
  bg: 'bg-violet-50',
  border: 'border-violet-200'
},
{
  type: 'condition' as NodeType,
  label: 'Filter',
  icon: FilterIcon,
  color: 'text-amber-600',
  bg: 'bg-amber-50',
  border: 'border-amber-200'
},
{
  type: 'delay' as NodeType,
  label: 'Wait / Delay',
  icon: ClockIcon,
  color: 'text-slate-600',
  bg: 'bg-slate-50',
  border: 'border-slate-200'
},
{
  type: 'end' as NodeType,
  label: 'End / Goal',
  icon: CheckCircleIcon,
  color: 'text-emerald-600',
  bg: 'bg-emerald-50',
  border: 'border-emerald-200'
}];

const savedWorkflows = [
{
  name: 'Enterprise Expansion',
  status: 'active',
  runs: 312,
  lastRun: '2m ago'
},
{
  name: 'Churn Prevention',
  status: 'active',
  runs: 67,
  lastRun: '1h ago'
},
{
  name: 'Trial Conversion',
  status: 'draft',
  runs: 0,
  lastRun: 'Never'
},
{
  name: 'Funding Trigger',
  status: 'paused',
  runs: 156,
  lastRun: '2d ago'
}];

const canvasNodes: WorkflowNode[] = [
{
  id: '1',
  type: 'trigger',
  label: 'Signal Detected',
  sublabel: 'Confidence ≥ 80%',
  icon: ZapIcon,
  color: 'text-blue-600',
  bg: 'bg-blue-500',
  border: 'border-blue-400',
  x: 0,
  y: 0
},
{
  id: '2',
  type: 'condition',
  label: 'Account Tier?',
  sublabel: 'Enterprise / Mid-Market',
  icon: GitBranchIcon,
  color: 'text-violet-600',
  bg: 'bg-violet-500',
  border: 'border-violet-400',
  x: 0,
  y: 1
},
{
  id: '3',
  type: 'action',
  label: 'LinkedIn Connect',
  sublabel: 'AI-personalized note',
  icon: LinkedinIcon,
  color: 'text-blue-600',
  bg: 'bg-blue-400',
  border: 'border-blue-300',
  x: -1,
  y: 2
},
{
  id: '4',
  type: 'action',
  label: 'Send Email',
  sublabel: 'Value prop sequence',
  icon: MailIcon,
  color: 'text-gray-600',
  bg: 'bg-gray-400',
  border: 'border-gray-300',
  x: 1,
  y: 2
},
{
  id: '5',
  type: 'delay',
  label: 'Wait 3 Days',
  sublabel: 'Check engagement',
  icon: ClockIcon,
  color: 'text-slate-600',
  bg: 'bg-slate-400',
  border: 'border-slate-300',
  x: 0,
  y: 3
},
{
  id: '6',
  type: 'action',
  label: 'Book Meeting',
  sublabel: 'Calendar invite',
  icon: CheckCircleIcon,
  color: 'text-emerald-600',
  bg: 'bg-emerald-500',
  border: 'border-emerald-400',
  x: 0,
  y: 4
}];

const nodeTypeColors: Record<
  NodeType,
  {
    bg: string;
    text: string;
  }> =
{
  trigger: {
    bg: 'bg-blue-500',
    text: 'text-white'
  },
  action: {
    bg: 'bg-slate-500',
    text: 'text-white'
  },
  condition: {
    bg: 'bg-violet-500',
    text: 'text-white'
  },
  delay: {
    bg: 'bg-amber-400',
    text: 'text-white'
  },
  end: {
    bg: 'bg-emerald-500',
    text: 'text-white'
  }
};
export function WorkflowBuilder() {
  const [selectedNode, setSelectedNode] = useState<string | null>('1');
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <TopBar
        title="Workflow Builder"
        subtitle="Drag-and-drop automation — no code, no services required"
        actions={
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SaveIcon className="w-3.5 h-3.5" /> Save Draft
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors">
              <PlayIcon className="w-3.5 h-3.5" /> Publish
            </button>
          </div>
        } />


      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
          {/* Left panel: node library */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Node Library
              </h3>
              <div className="space-y-1.5">
                {nodeLibrary.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border cursor-grab active:cursor-grabbing hover:shadow-sm transition-all ${node.bg} ${node.border}`}>

                      <Icon
                        className={`w-3.5 h-3.5 ${node.color} flex-shrink-0`} />

                      <span className={`text-xs font-medium ${node.color}`}>
                        {node.label}
                      </span>
                      <MoveIcon className="w-3 h-3 text-gray-300 ml-auto" />
                    </div>);

                })}
              </div>
            </div>

            {/* Saved workflows */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Saved Workflows
                </h3>
                <button className="text-blue-500 hover:text-blue-600">
                  <PlusIcon className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1.5">
                {savedWorkflows.map((wf, i) =>
                <button
                  key={i}
                  onClick={() => setActiveWorkflow(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${activeWorkflow === i ? 'border-blue-200 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-800 truncate">
                        {wf.name}
                      </span>
                      <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${wf.status === 'active' ? 'bg-emerald-50 text-emerald-600' : wf.status === 'paused' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-500'}`}>

                        {wf.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {wf.runs} runs · {wf.lastRun}
                    </p>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <span className="text-xs font-semibold text-gray-700">
                Enterprise Expansion Workflow
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">
                  6 nodes · 4 connections
                </span>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                  <SettingsIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Workflow canvas */}
            <div className="p-6 min-h-96 relative bg-[radial-gradient(circle,_#E2E8F0_1px,_transparent_1px)] bg-[length:20px_20px]">
              <div className="flex flex-col items-center gap-0">
                {canvasNodes.map((node, i) => {
                  const Icon = node.icon;
                  const colors = nodeTypeColors[node.type];
                  const isSelected = selectedNode === node.id;
                  return (
                    <div key={node.id} className="flex flex-col items-center">
                      <button
                        onClick={() =>
                        setSelectedNode(isSelected ? null : node.id)
                        }
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 shadow-sm transition-all ${isSelected ? 'border-blue-400 ring-2 ring-blue-100 shadow-md' : 'border-white hover:border-gray-200 hover:shadow-md'} bg-white`}>

                        <div
                          className={`w-7 h-7 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>

                          <Icon className={`w-3.5 h-3.5 ${colors.text}`} />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-semibold text-gray-900">
                            {node.label}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            {node.sublabel}
                          </div>
                        </div>
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ml-1 ${node.type === 'trigger' ? 'bg-blue-50 text-blue-600' : node.type === 'condition' ? 'bg-violet-50 text-violet-600' : node.type === 'delay' ? 'bg-amber-50 text-amber-600' : node.type === 'end' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-600'}`}>

                          {node.type}
                        </span>
                      </button>

                      {/* Connector */}
                      {i < canvasNodes.length - 1 &&
                      <div className="flex flex-col items-center my-1">
                          <div className="w-px h-4 bg-gray-200" />
                          <ArrowRightIcon className="w-3 h-3 text-gray-300 rotate-90" />
                        </div>
                      }

                      {/* Branch split for condition node */}
                      {node.type === 'condition' &&
                      <div className="flex items-center gap-16 my-1">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-px h-3 bg-gray-200" />
                            <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                              Enterprise
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-px h-3 bg-gray-200" />
                            <span className="text-[9px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              Mid-Market
                            </span>
                          </div>
                        </div>
                      }
                    </div>);

                })}
              </div>

              {/* Add node button */}
              <div className="flex justify-center mt-4">
                <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-500 bg-blue-50 border border-blue-200 border-dashed rounded-xl hover:bg-blue-100 transition-colors">
                  <PlusIcon className="w-3.5 h-3.5" /> Add Node
                </button>
              </div>
            </div>
          </div>

          {/* Right panel: node config */}
          <div className="space-y-3">
            {selectedNode ?
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Node Config
                  </h3>
                  <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1.5">
                      Node Label
                    </label>
                    <input
                    type="text"
                    defaultValue="Signal Detected"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100" />

                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1.5">
                      Trigger Condition
                    </label>
                    <select className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300 bg-white">
                      <option>Confidence ≥ 80%</option>
                      <option>Confidence ≥ 70%</option>
                      <option>Any signal</option>
                      <option>High impact only</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1.5">
                      Signal Sources
                    </label>
                    <div className="space-y-1.5">
                      {[
                    'Product Analytics',
                    'CRM Events',
                    'News & Firmographic',
                    'Marketing Engagement'].
                    map((src) =>
                    <label
                      key={src}
                      className="flex items-center gap-2 cursor-pointer">

                          <input
                        type="checkbox"
                        defaultChecked
                        className="w-3.5 h-3.5 rounded border-gray-300 text-blue-500 focus:ring-blue-300" />

                          <span className="text-xs text-gray-700">{src}</span>
                        </label>
                    )}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1.5">
                      AI Personalization
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer" />

                        <div className="w-9 h-5 bg-blue-500 rounded-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                      </div>
                      <span className="text-xs text-gray-700">Enabled</span>
                    </div>
                  </div>
                </div>
              </div> :

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <SettingsIcon className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-xs text-gray-400">
                  Select a node to configure
                </p>
              </div>
            }

            {/* Workflow stats */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Workflow Stats
              </h3>
              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Total Runs</span>
                  <span className="text-xs font-semibold text-gray-800">
                    312
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Success Rate</span>
                  <span className="text-xs font-semibold text-emerald-600">
                    94.2%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Avg Duration</span>
                  <span className="text-xs font-semibold text-gray-800">
                    8.4 days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Meetings Booked</span>
                  <span className="text-xs font-semibold text-blue-600">
                    47
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}