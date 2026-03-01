"use client";

import { Linkedin } from "lucide-react";

interface LinkedInPostPreviewProps {
  headline: string;
  content: string;
  hashtags: string[];
}

export function LinkedInPostPreview({ headline, content, hashtags }: LinkedInPostPreviewProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      {/* LinkedIn-style header */}
      <div className="flex items-center gap-2.5 p-3 pb-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700">
          <Linkedin className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-900">You</p>
          <p className="text-[10px] text-slate-500">Just now</p>
        </div>
      </div>

      {/* Post content */}
      <div className="px-3 pb-3 space-y-2">
        {headline && (
          <p className="text-xs font-semibold text-slate-900">{headline}</p>
        )}
        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
          {content}
        </div>
        {hashtags.length > 0 && (
          <p className="text-xs text-blue-600 font-medium">
            {hashtags.map((h) => `#${h}`).join(" ")}
          </p>
        )}
      </div>

      {/* LinkedIn-style footer */}
      <div className="border-t border-slate-100 px-3 py-2 flex items-center gap-4 text-[10px] text-slate-400">
        <span>Like</span>
        <span>Comment</span>
        <span>Repost</span>
        <span>Send</span>
      </div>
    </div>
  );
}
