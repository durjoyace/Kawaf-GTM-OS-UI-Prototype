import React from 'react';
import {
  ClockIcon,
  ExternalLinkIcon,
  ChevronRightIcon,
  ZapIcon } from
'lucide-react';
type SignalSource = 'product' | 'firmographic' | 'crm' | 'marketing' | 'news';
type SignalCardProps = {
  company: string;
  companyLogo?: string;
  signalType: string;
  description: string;
  confidence: number;
  sources: SignalSource[];
  recency: string;
  impact: 'high' | 'medium' | 'low';
  onClick?: () => void;
};
const sourceConfig: Record<
  SignalSource,
  {
    label: string;
    color: string;
  }> =
{
  product: {
    label: 'Product',
    color: 'bg-blue-100 text-blue-700'
  },
  firmographic: {
    label: 'Firmographic',
    color: 'bg-violet-100 text-violet-700'
  },
  crm: {
    label: 'CRM',
    color: 'bg-emerald-100 text-emerald-700'
  },
  marketing: {
    label: 'Marketing',
    color: 'bg-amber-100 text-amber-700'
  },
  news: {
    label: 'News',
    color: 'bg-rose-100 text-rose-700'
  }
};
const impactConfig = {
  high: {
    label: 'High Impact',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  medium: {
    label: 'Medium',
    color: 'text-amber-700 bg-amber-50 border-amber-200'
  },
  low: {
    label: 'Low',
    color: 'text-gray-600 bg-gray-50 border-gray-200'
  }
};
function ConfidenceBar({ score }: {score: number;}) {
  const color =
  score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-400';
  const textColor =
  score >= 80 ?
  'text-emerald-700' :
  score >= 60 ?
  'text-amber-700' :
  'text-red-600';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{
            width: `${score}%`
          }} />

      </div>
      <span className={`text-xs font-bold tabular-nums ${textColor}`}>
        {score}%
      </span>
    </div>);

}
export function SignalCard({
  company,
  signalType,
  description,
  confidence,
  sources,
  recency,
  impact,
  onClick
}: SignalCardProps) {
  const impactStyle = impactConfig[impact];
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-pointer group">

      <div className="flex items-start gap-3">
        {/* Company avatar */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-slate-600">
          {company.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <span className="text-sm font-semibold text-gray-900">
                {company}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ZapIcon className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-medium text-blue-600">
                  {signalType}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${impactStyle.color}`}>

                {impactStyle.label}
              </span>
              <ChevronRightIcon className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 transition-colors" />
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>

          {/* Confidence */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                Confidence Score
              </span>
            </div>
            <ConfidenceBar score={confidence} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 flex-wrap">
              {sources.map((src) =>
              <span
                key={src}
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${sourceConfig[src].color}`}>

                  {sourceConfig[src].label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <ClockIcon className="w-3 h-3" />
              {recency}
            </div>
          </div>
        </div>
      </div>
    </div>);

}