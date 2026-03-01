"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Code2 } from "lucide-react";

export function TrackingSnippetCard() {
  const [snippet, setSnippet] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tracking/snippet")
      .then((r) => r.json())
      .then((data) => {
        setSnippet(data.snippet);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Code2 className="h-4 w-4" />
          Tracking Snippet
        </CardTitle>
        <CardDescription>
          Add this snippet to your website to start tracking visitor behavior and generating signals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-20 animate-pulse rounded-lg bg-muted" />
        ) : (
          <>
            <div className="relative rounded-lg bg-slate-900 p-4">
              <code className="block whitespace-pre-wrap text-xs text-green-400 font-mono">
                {snippet}
              </code>
              <Button
                size="icon-xs"
                variant="ghost"
                className="absolute top-2 right-2 text-slate-400 hover:text-white"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Paste this into the <code className="text-xs">&lt;head&gt;</code> of your website.
              Events will start appearing within minutes.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
