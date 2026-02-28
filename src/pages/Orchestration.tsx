import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { ChannelBadge } from '../components/ChannelBadge';
import {
  PlayIcon,
  PauseIcon,
  PlusIcon,
  ArrowRightIcon,
  GitBranchIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  MailIcon,
  LinkedinIcon,
  MessageSquareIcon,
  UsersIcon,
  ZapIcon,
  BarChart2Icon,
  ChevronRightIcon,
  EditIcon } from
'lucide-react';
type SequenceStatus = 'active' | 'paused' | 'draft' | 'completed';
const sequences = [
{
  id: 1,
  name: 'Q1 Enterprise Expansion',
  status: 'active' as SequenceStatus,
  accounts: 48,
  enrolled: 312,
  channels: ['linkedin', 'email', 'slack'] as const,
  steps: 7,
  openRate: 68,
  replyRate: 24,
  progress: 62
},
{
  id: 2,
  name: 'SaaS Mid-Market Outbound',
  status: 'active' as SequenceStatus,
  accounts: 124,
  enrolled: 891,
  channels: ['email', 'sms', 'linkedin'] as const,
  steps: 5,
  openRate: 54,
  replyRate: 18,
  progress: 41
},
{
  id: 3,
  name: 'Churn Prevention - At-Risk',
  status: 'active' as SequenceStatus,
  accounts: 23,
  enrolled: 67,
  channels: ['email', 'slack', 'calendar'] as const,
  steps: 4,
  openRate: 82,
  replyRate: 41,
  progress: 78
},
{
  id: 4,
  name: 'New Funding Trigger Sequence',
  status: 'paused' as SequenceStatus,
  accounts: 31,
  enrolled: 156,
  channels: ['linkedin', 'email'] as const,
  steps: 6,
  openRate: 71,
  replyRate: 29,
  progress: 55
},
{
  id: 5,
  name: 'Event Follow-Up: SaaStr',
  status: 'draft' as SequenceStatus,
  accounts: 0,
  enrolled: 0,
  channels: ['email', 'linkedin', 'sms'] as const,
  steps: 3,
  openRate: 0,
  replyRate: 0,
  progress: 0
}];

const sequenceFlow = [
{
  step: 1,
  type: 'trigger',
  label: 'Signal Detected',
  sublabel: 'Confidence ≥ 75%',
  color: 'bg-blue-500',
  icon: ZapIcon
},
{
  step: 2,
  type: 'action',
  label: 'LinkedIn Connect',
  sublabel: 'Day 1 · Personalized',
  color: 'bg-blue-400',
  icon: LinkedinIcon
},
{
  step: 3,
  type: 'wait',
  label: 'Wait 2 Days',
  sublabel: 'Check engagement',
  color: 'bg-gray-400',
  icon: ClockIcon
},
{
  step: 4,
  type: 'branch',
  label: 'Opened?',
  sublabel: 'Conditional branch',
  color: 'bg-violet-500',
  icon: GitBranchIcon
},
{
  step: 5,
  type: 'action',
  label: 'Email: Value Prop',
  sublabel: 'Day 3 · AI-personalized',
  color: 'bg-emerald-500',
  icon: MailIcon
},
{
  step: 6,
  type: 'action',
  label: 'SMS Follow-up',
  sublabel: 'Day 5 · Brief',
  color: 'bg-amber-500',
  icon: MessageSquareIcon
},
{
  step: 7,
  type: 'action',
  label: 'Book Meeting',
  sublabel: 'Calendar invite',
  color: 'bg-rose-500',
  icon: CheckCircleIcon
}];

const statusConfig: Record<
  SequenceStatus,
  {
    label: string;
    color: string;
    dot: string;
  }> =
{
  active: {
    label: 'Active',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500'
  },
  paused: {
    label: 'Paused',
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    dot: 'bg-amber-500'
  },
  draft: {
    label: 'Draft',
    color: 'text-gray-600 bg-gray-50 border-gray-200',
    dot: 'bg-gray-400'
  },
  completed: {
    label: 'Completed',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    dot: 'bg-blue-500'
  }
};
export function Orchestration() {
  const [activeSequence, setActiveSequence] = useState(1);
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <TopBar
        title="Multi-Channel Orchestration"
        subtitle="AI-personalized cadences across LinkedIn, Email, SMS, Slack, Teams & more" />


      <div className="p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">
              Active Sequences
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              ↑ 1 this week
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">
              Enrolled Contacts
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">1,426</p>
            <p className="text-xs text-blue-600 font-medium mt-1">
              Across 5 sequences
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">Avg. Open Rate</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">68%</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              ↑ 12% vs benchmark
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">Meetings Booked</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">47</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              This month
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Sequence list */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Sequences</h3>
              <button className="flex items-center gap-1 text-xs text-blue-500 font-medium hover:text-blue-600">
                <PlusIcon className="w-3.5 h-3.5" /> New
              </button>
            </div>
            {sequences.map((seq) => {
              const status = statusConfig[seq.status];
              const isActive = activeSequence === seq.id;
              return (
                <button
                  key={seq.id}
                  onClick={() => setActiveSequence(seq.id)}
                  className={`w-full text-left bg-white rounded-xl border shadow-sm p-4 transition-all ${isActive ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-100 hover:border-gray-200'}`}>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-900 leading-tight">
                      {seq.name}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 flex items-center gap-1 ${status.color}`}>

                      <span
                        className={`w-1.5 h-1.5 rounded-full ${status.dot} ${seq.status === 'active' ? 'animate-pulse' : ''}`} />

                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap mb-2">
                    {seq.channels.map((ch) =>
                    <ChannelBadge key={ch} channel={ch} size="sm" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{seq.enrolled} enrolled</span>
                    <span>{seq.steps} steps</span>
                    {seq.status !== 'draft' &&
                    <span className="text-emerald-600 font-medium">
                        {seq.openRate}% open
                      </span>
                    }
                  </div>
                  {seq.status !== 'draft' &&
                  <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${seq.progress}%`
                      }} />

                    </div>
                  }
                </button>);

            })}
          </div>

          {/* Sequence flow visualizer */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Sequence Flow
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Q1 Enterprise Expansion · 7 steps
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  <EditIcon className="w-3.5 h-3.5" /> Edit
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                  <PlayIcon className="w-3.5 h-3.5" /> Running
                </button>
              </div>
            </div>

            {/* Flow steps */}
            <div className="space-y-2">
              {sequenceFlow.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-lg ${step.color} flex items-center justify-center flex-shrink-0`}>

                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      {i < sequenceFlow.length - 1 &&
                      <div className="w-px h-4 bg-gray-200 mt-1" />
                      }
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {step.label}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {step.sublabel}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${step.type === 'trigger' ? 'bg-blue-50 text-blue-600' : step.type === 'branch' ? 'bg-violet-50 text-violet-600' : step.type === 'wait' ? 'bg-gray-50 text-gray-600' : 'bg-emerald-50 text-emerald-600'}`}>

                          {step.type}
                        </span>
                      </div>
                      {step.type === 'branch' &&
                      <div className="mt-2 ml-2 flex items-center gap-3">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg">
                            <CheckCircleIcon className="w-3 h-3 text-emerald-500" />
                            <span className="text-xs text-emerald-700 font-medium">
                              Yes → Continue
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 border border-red-100 rounded-lg">
                            <XCircleIcon className="w-3 h-3 text-red-400" />
                            <span className="text-xs text-red-600 font-medium">
                              No → Re-engage
                            </span>
                          </div>
                        </div>
                      }
                    </div>
                  </div>);

              })}
            </div>

            {/* AI personalization note */}
            <div className="mt-4 p-3 bg-violet-50 border border-violet-100 rounded-lg flex items-start gap-2">
              <ZapIcon className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-violet-700">
                <span className="font-semibold">AI Adaptive Mode:</span>{' '}
                Sequence timing and content automatically adjusts based on
                account engagement signals. 3 accounts fast-tracked to step 5
                today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}