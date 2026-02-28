import React, { Component } from 'react';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from 'lucide-react';
type MetricCardProps = {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: ComponentType<{
    className?: string;
  }>;
  iconColor?: string;
  iconBg?: string;
  suffix?: string;
  sparkline?: number[];
};
export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'text-blue-500',
  iconBg = 'bg-blue-50',
  suffix,
  sparkline
}: MetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === 0;
  const maxVal = sparkline ? Math.max(...sparkline) : 1;
  const minVal = sparkline ? Math.min(...sparkline) : 0;
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className="text-2xl font-bold text-gray-900 leading-none">
              {value}
            </span>
            {suffix &&
            <span className="text-sm text-gray-500 font-medium">
                {suffix}
              </span>
            }
          </div>
        </div>
        {Icon &&
        <div
          className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>

            <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
          </div>
        }
      </div>

      {/* Sparkline */}
      {sparkline && sparkline.length > 1 &&
      <div className="flex items-end gap-0.5 h-8">
          {sparkline.map((val, i) => {
          const height =
          maxVal === minVal ?
          50 :
          (val - minVal) / (maxVal - minVal) * 100;
          return (
            <div
              key={i}
              className={`flex-1 rounded-sm transition-all ${isPositive ? 'bg-emerald-200' : isNegative ? 'bg-red-200' : 'bg-blue-200'}`}
              style={{
                height: `${Math.max(height, 10)}%`
              }} />);


        })}
        </div>
      }

      {/* Change indicator */}
      {change !== undefined &&
      <div className="flex items-center gap-1.5">
          <div
          className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md ${isPositive ? 'text-emerald-700 bg-emerald-50' : isNegative ? 'text-red-700 bg-red-50' : 'text-gray-600 bg-gray-50'}`}>

            {isPositive && <TrendingUpIcon className="w-3 h-3" />}
            {isNegative && <TrendingDownIcon className="w-3 h-3" />}
            {isNeutral && <MinusIcon className="w-3 h-3" />}
            {isPositive ? '+' : ''}
            {change}%
          </div>
          {changeLabel &&
        <span className="text-xs text-gray-400">{changeLabel}</span>
        }
        </div>
      }
    </div>);

}