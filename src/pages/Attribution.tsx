import React from 'react';
import { TopBar } from '../components/TopBar';
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
  FunnelChart,
  Funnel,
  LabelList,
  Cell } from
'recharts';
import {
  DownloadIcon,
  TrendingUpIcon,
  DollarSignIcon,
  TargetIcon,
  ZapIcon,
  ArrowRightIcon,
  FilterIcon } from
'lucide-react';
const attributionData = [
{
  month: 'Sep',
  signalRevenue: 120,
  directRevenue: 80
},
{
  month: 'Oct',
  signalRevenue: 180,
  directRevenue: 90
},
{
  month: 'Nov',
  signalRevenue: 160,
  directRevenue: 110
},
{
  month: 'Dec',
  signalRevenue: 240,
  directRevenue: 130
},
{
  month: 'Jan',
  signalRevenue: 290,
  directRevenue: 120
},
{
  month: 'Feb',
  signalRevenue: 360,
  directRevenue: 140
}];

const personaData = [
{
  persona: 'VP Sales',
  deals: 24,
  revenue: 480,
  avgDeal: 20
},
{
  persona: 'CTO',
  deals: 18,
  revenue: 720,
  avgDeal: 40
},
{
  persona: 'CEO',
  deals: 12,
  revenue: 960,
  avgDeal: 80
},
{
  persona: 'RevOps',
  deals: 31,
  revenue: 310,
  avgDeal: 10
},
{
  persona: 'CMO',
  deals: 9,
  revenue: 270,
  avgDeal: 30
}];

const signalToRevenue = [
{
  signal: 'Product Usage Spike',
  deals: 42,
  revenue: '$840K',
  conversion: '34%',
  color: '#3B82F6'
},
{
  signal: 'Funding Announcement',
  deals: 28,
  revenue: '$1.12M',
  conversion: '41%',
  color: '#8B5CF6'
},
{
  signal: 'Competitor Mention',
  deals: 19,
  revenue: '$380K',
  conversion: '28%',
  color: '#10B981'
},
{
  signal: 'High Email Engagement',
  deals: 35,
  revenue: '$525K',
  conversion: '22%',
  color: '#F59E0B'
},
{
  signal: 'Trial Expiry',
  deals: 61,
  revenue: '$610K',
  conversion: '58%',
  color: '#EF4444'
}];

const funnelData = [
{
  name: 'Signals Detected',
  value: 1240,
  fill: '#DBEAFE'
},
{
  name: 'Accounts Engaged',
  value: 842,
  fill: '#93C5FD'
},
{
  name: 'Meetings Booked',
  value: 312,
  fill: '#60A5FA'
},
{
  name: 'Opportunities',
  value: 187,
  fill: '#3B82F6'
},
{
  name: 'Closed Won',
  value: 64,
  fill: '#1D4ED8'
}];

export function Attribution() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <TopBar
        title="Attribution & Reporting"
        subtitle="Signal-to-revenue tracking with board-ready exports"
        actions={
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <DownloadIcon className="w-3.5 h-3.5" /> Export
          </button>
        } />


      <div className="p-6 space-y-5">
        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Signal-Attributed Revenue
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5">$2.1M</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              72% of total closed
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Avg Deal Size
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5">$32.8K</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              ↑ 18% vs last quarter
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Signal → Close Rate
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5">34%</p>
            <p className="text-xs text-blue-600 font-medium mt-1">
              Industry avg: 22%
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Time to Close
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5">18 days</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              ↓ 12 days vs baseline
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue attribution chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Signal-to-Revenue Attribution
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Monthly revenue attributed to signals vs direct
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full bg-blue-500 inline-block" />
                  Signal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full bg-gray-300 inline-block" />
                  Direct
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={attributionData}
                margin={{
                  top: 0,
                  right: 0,
                  left: -20,
                  bottom: 0
                }}>

                <defs>
                  <linearGradient id="sigGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="dirGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0} />
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
                    border: '1px solid #E2E8F0'
                  }}
                  formatter={(val: number) => [`$${val}K`, '']} />

                <Area
                  type="monotone"
                  dataKey="signalRevenue"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fill="url(#sigGrad)" />

                <Area
                  type="monotone"
                  dataKey="directRevenue"
                  stroke="#94A3B8"
                  strokeWidth={1.5}
                  fill="url(#dirGrad)"
                  strokeDasharray="4 2" />

              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Funnel */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Signal → Revenue Funnel
            </h3>
            <div className="space-y-2">
              {funnelData.map((item, i) => {
                const pct = Math.round(item.value / funnelData[0].value * 100);
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">{item.name}</span>
                      <span className="text-xs font-semibold text-gray-800 tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-6 bg-gray-50 rounded-lg overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center justify-end pr-2 transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: item.fill
                        }}>

                        <span className="text-[10px] font-bold text-blue-800">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>

        {/* Signal type attribution */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Signal Type → Revenue Attribution
            </h3>
            <button className="text-xs text-blue-500 font-medium flex items-center gap-1 hover:text-blue-600">
              Export CSV <DownloadIcon className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">
                    Signal Type
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">
                    Deals
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">
                    Revenue
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">
                    Conv. Rate
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pl-4">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {signalToRevenue.map((row, i) =>
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: row.color
                        }} />

                        <span className="text-sm font-medium text-gray-800">
                          {row.signal}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-sm text-gray-700 font-medium tabular-nums">
                      {row.deals}
                    </td>
                    <td className="py-3 text-right text-sm font-semibold text-gray-900 tabular-nums">
                      {row.revenue}
                    </td>
                    <td className="py-3 text-right">
                      <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${parseInt(row.conversion) >= 40 ? 'text-emerald-700 bg-emerald-50' : parseInt(row.conversion) >= 25 ? 'text-amber-700 bg-amber-50' : 'text-gray-600 bg-gray-50'}`}>

                        {row.conversion}
                      </span>
                    </td>
                    <td className="py-3 pl-4">
                      <div className="flex items-center gap-0.5">
                        {[40, 55, 48, 70, 62, 80].map((h, j) =>
                      <div
                        key={j}
                        className="w-1.5 rounded-sm"
                        style={{
                          height: `${h * 0.3}px`,
                          backgroundColor: row.color,
                          opacity: 0.3 + j / 6 * 0.7
                        }} />

                      )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Persona breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Engagement by Persona
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={personaData}
              margin={{
                top: 0,
                right: 0,
                left: -20,
                bottom: 0
              }}>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="persona"
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

              <Bar
                dataKey="deals"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                name="Deals" />

              <Bar
                dataKey="avgDeal"
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
                name="Avg Deal ($K)" />

            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>);

}