"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb, ArrowRight, Building2, Users, MapPin, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfidenceBar } from "@/components/confidence-bar";
import { StatusChip } from "@/components/status-chip";
import { SignalActionDialog } from "@/components/signal-action-dialog";
import type { Signal } from "@/lib/types/models";

interface EnrichmentData {
  employees?: number | null;
  revenue?: string | null;
  techStack?: string[] | null;
  headquarters?: string | null;
  fundingStage?: string | null;
}

export function SignalCardExpanded({ signal, enrichment }: { signal: Signal; enrichment?: EnrichmentData }) {
  const [expanded, setExpanded] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  return (
    <Card className="p-5 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-bold text-white">
          {signal.accountAvatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm truncate">{signal.accountName}</h3>
            <StatusChip label={signal.impact === "high" ? "High Impact" : signal.impact === "medium" ? "Medium" : "Low"} />
          </div>
          <p className="text-xs text-blue-600 font-medium mt-0.5">{signal.signalType}</p>
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{signal.description}</p>
          <ConfidenceBar value={signal.confidence} className="mt-3" />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {signal.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{signal.recency}</span>
          </div>

          {/* Enrichment data */}
          {enrichment && (enrichment.employees || enrichment.revenue || enrichment.headquarters || enrichment.techStack) && (
            <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
              {enrichment.employees && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {enrichment.employees.toLocaleString()} employees
                </span>
              )}
              {enrichment.revenue && (
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" /> {enrichment.revenue}
                </span>
              )}
              {enrichment.headquarters && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {enrichment.headquarters}
                </span>
              )}
              {enrichment.techStack && enrichment.techStack.length > 0 && (
                <span className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" /> {enrichment.techStack.slice(0, 3).join(", ")}
                </span>
              )}
            </div>
          )}

          {/* Expandable section */}
          {(signal.explanation || signal.suggestedAction) && (
            <>
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 flex items-center gap-1 text-[10px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Lightbulb className="h-3 w-3" />
                Why this signal?
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              {expanded && (
                <div className="mt-2 space-y-2 animate-in slide-in-from-top-1 fade-in-0 duration-200">
                  {signal.explanation && (
                    <div className="rounded-lg bg-blue-50/50 border border-blue-100 p-3">
                      <p className="text-[10px] font-semibold text-blue-800 mb-1">Attribution Logic</p>
                      <p className="text-[10px] text-blue-700/80 leading-relaxed">{signal.explanation}</p>
                    </div>
                  )}
                  {signal.suggestedAction && (
                    <div className="rounded-lg bg-green-50/50 border border-green-100 p-3">
                      <p className="text-[10px] font-semibold text-green-800 mb-1">Suggested Action</p>
                      <p className="text-[10px] text-green-700/80 leading-relaxed">{signal.suggestedAction}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 h-6 text-[10px] gap-1 border-green-200 text-green-700 hover:bg-green-50"
                        onClick={() => setActionOpen(true)}
                      >
                        Take Action <ArrowRight className="h-2.5 w-2.5" />
                      </Button>
                      <SignalActionDialog
                        signalId={signal.id}
                        open={actionOpen}
                        onOpenChange={setActionOpen}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
