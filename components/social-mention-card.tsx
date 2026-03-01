"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface SocialMentionCardProps {
  platform: string;
  author: string;
  content: string;
  url: string;
  sentiment: string;
  relevance: number;
}

const sentimentColors: Record<string, string> = {
  complaint: "bg-red-100 text-red-700",
  praise: "bg-green-100 text-green-700",
  intent: "bg-blue-100 text-blue-700",
  competitive: "bg-amber-100 text-amber-700",
  neutral: "bg-slate-100 text-slate-600",
};

const platformIcons: Record<string, string> = {
  twitter: "𝕏",
  linkedin: "in",
  reddit: "r/",
};

export function SocialMentionCard({
  platform,
  author,
  content,
  url,
  sentiment,
  relevance,
}: SocialMentionCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold">
          {platformIcons[platform] ?? platform[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium">{author}</span>
            <div className="flex items-center gap-1.5">
              <Badge className={`text-[11px] ${sentimentColors[sentiment] ?? sentimentColors.neutral}`}>
                {sentiment}
              </Badge>
              <span className="text-[11px] text-muted-foreground">{relevance}%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{content}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700 mt-2"
          >
            View original <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>
    </Card>
  );
}
