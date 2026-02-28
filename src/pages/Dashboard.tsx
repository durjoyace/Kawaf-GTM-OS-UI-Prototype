import React from 'react';
import { TopBar } from '../components/TopBar';
import { MetricCard } from '../components/MetricCard';
import { SignalCard } from '../components/SignalCard';
import { ChannelBadge } from '../components/ChannelBadge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell } from
'recharts';
import {
  ZapIcon,
  TargetIcon,
  DollarSignIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  ActivityIcon,
  UsersIcon,
  CheckCircleIcon } from
'lucide-react';
const revenueData = [
{
  month: 'Aug',
  pipeline: 420,
  closed: 180
},
{
  month: 'Sep',
  pipeline: 380,
  closed: 210
},
{
  month: 'Oct',
  pipeline: 510,
  closed: 240
},
{
  month: 'Nov',
  pipeline: 490,
  closed: 195
},
{
  month: 'Dec',
  pipeline: 620,
  closed: 310
},
{
  month: 'Jan',
  pipeline: 580,
  closed: 280
},
{
  month: 'Feb',
  pipeline: 710,
  closed: 360
}];

const channelData = [
{
  channel: 'LinkedIn',
  sent: 1240,
  opened: 680,
  replied: 210
},
{
  channel: 'Email',
  sent: 3200,
  opened: 1890,
  replied: 420
},
{
  channel: 'SMS',
  sent: 540,
  opened: 490,
  replied: 180
},
{
  channel: 'Slack',
  sent: 320,
  opened: 290,
  replied: 140
}];

const signalMixData = [
{
  name: 'Product',
  value: 34,
  color: '#3B82F6'
},
{
  name: 'Firmographic',
  value: 22,
  color: '#8B5CF6'
},
{
  name: 'CRM',
  value: 18,
  color: '#10B981'
},
{
  name: 'Marketing',
  value: 16,
  color: '#F59E0B'
},
{
  name: 'News',
  value: 10,
  color: '#EF4444'
}];

const recentActivity = [
{
  action: 'Signal triggered for Acme Corp',
  time: '2m ago',
  type: 'signal'
},
{
  action: 'Sequence launched: Q1 Enterprise',
  time: '8m ago',
  type: 'sequence'
},
{
  action: 'Deal closed: TechFlow Inc. $42K',
  time: '1h ago',
  type: 'deal'
},
{
  action: 'New integration: Salesforce sync',
  time: '3h ago',
  type: 'integration'
},
{
  action: 'AI refined messaging for SaaS segment',
  time: '5h ago',
  type: 'ai'
}];

const activityColors: Record<string, string> = {
  signal: 'bg-blue-500',
  sequence: 'bg-violet-500',
  deal: 'bg-emerald-500',
  integration: 'bg-amber-500',
  ai: 'bg-rose-500'
};
export function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <TopBar
        title="GTM Dashboard"
        subtitle="Real-time overview of your go-to-market performance" />


      <div className="p-6 space-y-6">
        {/* Metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Signals"
            value="247"
            change={18}
            changeLabel="vs last week"
            icon={ZapIcon}
            iconColor="text-blue-500"
            iconBg="bg-blue-50"
            sparkline={[40, 55, 48, 70, 62, 80, 95]} />

          <MetricCard
            title="Pipeline Value"
            value="$2.4M"
            change={12}
            changeLabel="vs last month"
            icon={DollarSignIcon}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-50"
            sparkline={[200, 240, 220, 280, 310, 290, 360]} />

          <MetricCard
            title="Accounts Engaged"
            value="1,842"
            change={7}
            changeLabel="vs last week"
            icon={UsersIcon}
            iconColor="text-violet-500"
            iconBg="bg-violet-50"
            sparkline={[1200, 1350, 1400, 1520, 1680, 1750, 1842]} />

          <MetricCard
            title="Win Rate"
            value="34%"
            change={-2}
            changeLabel="vs last quarter"
            icon={TargetIcon}
            iconColor="text-amber-500"
            iconBg="bg-amber-50"
            sparkline={[38, 36, 34, 37, 35, 33, 34]} />

        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Pipeline vs Closed Revenue
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Last 7 months · USD thousands
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full bg-blue-200 inline-block" />
                  Pipeline
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Closed
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={revenueData}
                margin={{
                  top: 0,
                  right: 0,
                  left: -20,
                  bottom: 0
                }}>

                <defs>
                  <linearGradient id="pipelineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="closedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 11,
                    fill: '#94A3B8'
                  }}
                  axisLine={false}
                  tickLine={false} />

                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: '#94A3B8'
                  }}
                  axisLine={false}
                  tickLine={false} />

                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(val: number) => [`$${val}K`, '']} />

                <Area
                  type="monotone"
                  dataKey="pipeline"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#pipelineGrad)" />

                <Area
                  type="monotone"
                  dataKey="closed"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#closedGrad)" />

              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Signal mix */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Signal Mix
            </h3>
            <p className="text-xs text-gray-500 mb-4">By source type</p>
            <div className="flex justify-center mb-3">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={signalMixData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value">

                    {signalMixData.map((entry, index) =>
                    <Cell key={index} fill={entry.color} />
                    )}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      fontSize: 11,
                      borderRadius: 8
                    }}
                    formatter={(val: number) => [`${val}%`, '']} />

                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {signalMixData.map((item) =>
              <div
                key={item.name}
                className="flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: item.color
                    }} />

                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-800">
                    {item.value}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Channel performance */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Channel Performance
              </h3>
              <button className="text-xs text-blue-500 font-medium flex items-center gap-1 hover:text-blue-600">
                View all <ArrowRightIcon className="w-3 h-3" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart
                data={channelData}
                margin={{
                  top: 0,
                  right: 0,
                  left: -20,
                  bottom: 0
                }}>

                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="channel"
                  tick={{
                    fontSize: 11,
                    fill: '#94A3B8'
                  }}
                  axisLine={false}
                  tickLine={false} />

                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: '#94A3B8'
                  }}
                  axisLine={false}
                  tickLine={false} />

                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid #E2E8F0'
                  }} />

                <Bar dataKey="sent" fill="#EFF6FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="opened" fill="#93C5FD" radius={[4, 4, 0, 0]} />
                <Bar dataKey="replied" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-blue-100 inline-block" />
                Sent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-blue-300 inline-block" />
                Opened
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-blue-500 inline-block" />
                Replied
              </span>
            </div>
          </div>

          {/* Activity feed */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Live Activity
              </h3>
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item, i) =>
              <div key={i} className="flex items-start gap-2.5">
                  <span
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColors[item.type]}`} />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-snug">
                      {item.action}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <button className="mt-4 w-full text-xs text-blue-500 font-medium flex items-center justify-center gap-1 hover:text-blue-600">
              View all activity <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Top signals */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Top Signals Today
            </h3>
            <button className="text-xs text-blue-500 font-medium flex items-center gap-1 hover:text-blue-600">
              View all signals <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <SignalCard
              company="Acme Corp"
              signalType="Product Usage Spike"
              description="Feature adoption increased 340% in last 48h. User expanded to 3 new departments. Strong expansion signal."
              confidence={92}
              sources={['product', 'crm']}
              recency="2m ago"
              impact="high" />

            <SignalCard
              company="TechFlow Inc."
              signalType="Funding Round"
              description="Series B $28M announced. Headcount growing 40%. New VP Sales hired. Ideal expansion window."
              confidence={87}
              sources={['news', 'firmographic']}
              recency="1h ago"
              impact="high" />

            <SignalCard
              company="DataBridge Co."
              signalType="Competitor Mention"
              description="Mentioned competitor in 3 support tickets. Showing dissatisfaction with current solution. Churn risk + opportunity."
              confidence={74}
              sources={['marketing', 'crm']}
              recency="3h ago"
              impact="medium" />

          </div>
        </div>
      </div>
    </div>);

}