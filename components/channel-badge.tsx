import { Linkedin, Mail, MessageSquare, Calendar, Webhook } from "lucide-react";
import type { ChannelType } from "@/lib/types/models";

const channelConfig: Record<ChannelType, { icon: React.ElementType; label: string; className: string }> = {
  linkedin: { icon: Linkedin, label: "LinkedIn", className: "bg-blue-50 text-blue-700" },
  email: { icon: Mail, label: "Email", className: "bg-purple-50 text-purple-700" },
  sms: { icon: MessageSquare, label: "SMS", className: "bg-green-50 text-green-700" },
  slack: { icon: MessageSquare, label: "Slack", className: "bg-amber-50 text-amber-700" },
  calendar: { icon: Calendar, label: "Calendar", className: "bg-pink-50 text-pink-700" },
  webhook: { icon: Webhook, label: "Webhook", className: "bg-gray-50 text-gray-700" },
};

export function ChannelBadge({ channel }: { channel: ChannelType }) {
  const config = channelConfig[channel];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${config.className}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
