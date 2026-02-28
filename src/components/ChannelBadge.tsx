import React, { Component } from 'react';
import {
  LinkedinIcon,
  MailIcon,
  MessageSquareIcon,
  SlackIcon,
  WebhookIcon,
  CalendarIcon,
  MonitorIcon } from
'lucide-react';
type Channel =
'linkedin' |
'email' |
'sms' |
'slack' |
'teams' |
'webhook' |
'calendar';
type ChannelBadgeProps = {
  channel: Channel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
};
const channelConfig: Record<
  Channel,
  {
    label: string;
    icon: ComponentType<{
      className?: string;
    }>;
    bg: string;
    text: string;
    border: string;
  }> =
{
  linkedin: {
    label: 'LinkedIn',
    icon: LinkedinIcon,
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  email: {
    label: 'Email',
    icon: MailIcon,
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200'
  },
  sms: {
    label: 'SMS',
    icon: MessageSquareIcon,
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  slack: {
    label: 'Slack',
    icon: SlackIcon,
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200'
  },
  teams: {
    label: 'Teams',
    icon: MonitorIcon,
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200'
  },
  webhook: {
    label: 'Webhook',
    icon: WebhookIcon,
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200'
  },
  calendar: {
    label: 'Calendar',
    icon: CalendarIcon,
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200'
  }
};
export function ChannelBadge({
  channel,
  size = 'md',
  showLabel = true
}: ChannelBadgeProps) {
  const config = channelConfig[channel];
  const Icon = config.icon;
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px] gap-1',
    md: 'px-2 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2'
  };
  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}>

      <Icon className={iconSizes[size]} />
      {showLabel && config.label}
    </span>);

}