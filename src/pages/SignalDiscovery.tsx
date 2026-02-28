import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { SignalCard } from '../components/SignalCard';
import {
  ZapIcon,
  FilterIcon,
  SortAscIcon,
  ChevronDownIcon,
  InfoIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  DatabaseIcon,
  NewspaperIcon,
  BarChart2Icon,
  UsersIcon,
  TrendingUpIcon } from
'lucide-react';
type FilterType =
'all' |
'product' |
'firmographic' |
'crm' |
'marketing' |
'news';
type SortType = 'recency' | 'confidence' | 'impact';
const signals = [
{
  company: 'Acme Corp',
  signalType: 'Product Usage Spike',
  description:
  'Feature adoption increased 340% in last 48h. User expanded to 3 new departments. Strong expansion signal detected via product analytics.',
  confidence: 92,
  sources: ['product', 'crm'] as const,
  recency: '2m ago',
  impact: 'high' as const,
  category: 'product'
},
{
  company: 'TechFlow Inc.',
  signalType: 'Funding Round Announced',
  description:
  'Series B $28M announced. Headcount growing 40%. New VP Sales hired last week. Ideal expansion window — budget likely available.',
  confidence: 87,
  sources: ['news', 'firmographic'] as const,
  recency: '1h ago',
  impact: 'high' as const,
  category: 'news'
},
{
  company: 'DataBridge Co.',
  signalType: 'Competitor Dissatisfaction',
  description:
  'Mentioned competitor in 3 support tickets. Showing dissatisfaction with current solution. Churn risk + opportunity for displacement.',
  confidence: 74,
  sources: ['marketing', 'crm'] as const,
  recency: '3h ago',
  impact: 'medium' as const,
  category: 'crm'
},
{
  company: 'Nexus Systems',
  signalType: 'High Email Engagement',
  description:
  'Opened 8 emails in last 7 days. Clicked pricing page 3 times. Visited case studies. Strong buying intent signals from marketing data.',
  confidence: 81,
  sources: ['marketing'] as const,
  recency: '5h ago',
  impact: 'high' as const,
  category: 'marketing'
},
{
  company: 'Vertex Analytics',
  signalType: 'Headcount Growth',
  description:
  'Sales team grew 60% in Q4. 12 new SDR roles posted. Firmographic data suggests scaling go-to-market motion.',
  confidence: 68,
  sources: ['firmographic'] as const,
  recency: '1d ago',
  impact: 'medium' as const,
  category: 'firmographic'
},
{
  company: 'CloudPeak Ltd.',
  signalType: 'Trial Expiry Approaching',
  description:
  'Free trial expires in 3 days. 4 active users. 2 integrations connected. High product engagement suggests conversion readiness.',
  confidence: 95,
  sources: ['product', 'crm'] as const,
  recency: '30m ago',
  impact: 'high' as const,
  category: 'product'
},
{
  company: 'Meridian Group',
  signalType: 'Executive Change',
  description:
  'New CTO joined from AWS. Previous CTO was a champion. Re-engagement opportunity — new stakeholder mapping required.',
  confidence: 62,
  sources: ['news', 'crm'] as const,
  recency: '2d ago',
  impact: 'medium' as const,
  category: 'news'
},
{
  company: 'Prism Software',
  signalType: 'Low Engagement Risk',
  description:
  'No login in 14 days. Usage dropped 80%. Support ticket volume increased. Churn risk — intervention recommended immediately.',
  confidence: 88,
  sources: ['product', 'crm'] as const,
  recency: '6h ago',
  impact: 'high' as const,
  category: 'product'
},
{
  company: 'Orbit Dynamics',
  signalType: 'Conference Attendance',
  description:
  'Registered for SaaStr Annual. 3 team members attending. High-intent event signal — ideal for in-person meeting request.',
  confidence: 55,
  sources: ['marketing', 'firmographic'] as const,
  recency: '4h ago',
  impact: 'low' as const,
  category: 'marketing'
}];

const sourceStats = [
{
  label: 'Product Analytics',
  count: 142,
  icon: BarChart2Icon,
  color: 'text-blue-500',
  bg: 'bg-blue-50'
},
{
  label: 'Firmographics',
  count: 89,
  icon: UsersIcon,
  color: 'text-violet-500',
  bg: 'bg-violet-50'
},
{
  label: 'CRM Data',
  count: 67,
  icon: DatabaseIcon,
  color: 'text-emerald-500',
  bg: 'bg-emerald-50'
},
{
  label: 'Marketing Eng.',
  count: 103,
  icon: TrendingUpIcon,
  color: 'text-amber-500',
  bg: 'bg-amber-50'
},
{
  label: 'External News',
  count: 38,
  icon: NewspaperIcon,
  color: 'text-rose-500',
  bg: 'bg-rose-50'
}];

export function SignalDiscovery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('recency');
  const [selectedSignal, setSelectedSignal] = useState<number | null>(null);
  const filteredSignals = signals.filter(
    (s) => activeFilter === 'all' || s.category === activeFilter
  );
  const filterTabs: {
    id: FilterType;
    label: string;
  }[] = [
  {
    id: 'all',
    label: 'All Signals'
  },
  {
    id: 'product',
    label: 'Product'
  },
  {
    id: 'firmographic',
    label: 'Firmographic'
  },
  {
    id: 'crm',
    label: 'CRM'
  },
  {
    id: 'marketing',
    label: 'Marketing'
  },
  {
    id: 'news',
    label: 'News'
  }];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <TopBar
        title="Alpha Signal Discovery"
        subtitle="Multi-source signals ranked by confidence and impact" />


      <div className="p-6 space-y-5">
        {/* Source stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {sourceStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 flex items-center gap-3">

                <div
                  className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>

                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 leading-none">
                    {stat.count}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>);

          })}
        </div>

        {/* Filters and sort */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-lg p-1 shadow-sm">
            {filterTabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeFilter === tab.id ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>

                {tab.label}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Sort by:</span>
            <div className="flex items-center gap-1">
              {(['recency', 'confidence', 'impact'] as SortType[]).map((s) =>
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${sortBy === s ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>

                  {s}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Attribution logic panel */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <InfoIcon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-800 mb-1">
              Signal Attribution Logic
            </p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Confidence scores are computed using a weighted ensemble model:
              Product signals (35%), CRM history (25%), Marketing engagement
              (20%), Firmographic fit (15%), External news (5%). Scores above
              80% trigger immediate action recommendations.
            </p>
          </div>
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
              <CheckCircleIcon className="w-3 h-3" /> High ≥80%
            </span>
            <span className="flex items-center gap-1 text-[10px] text-amber-700 font-medium bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">
              <AlertCircleIcon className="w-3 h-3" /> Med 60–79%
            </span>
            <span className="flex items-center gap-1 text-[10px] text-red-700 font-medium bg-red-50 border border-red-200 px-2 py-1 rounded-full">
              <XCircleIcon className="w-3 h-3" /> Low &lt;60%
            </span>
          </div>
        </div>

        {/* Signal grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filteredSignals.map((signal, i) =>
          <SignalCard
            key={i}
            {...signal}
            onClick={() => setSelectedSignal(selectedSignal === i ? null : i)} />

          )}
        </div>

        {filteredSignals.length === 0 &&
        <div className="text-center py-16 text-gray-400">
            <ZapIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">
              No signals found for this filter
            </p>
          </div>
        }
      </div>
    </div>);

}