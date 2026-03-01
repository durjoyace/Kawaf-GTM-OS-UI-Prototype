"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Linkedin, Copy, Check } from "lucide-react";
import { LinkedInPostPreview } from "@/components/linkedin-post-preview";

interface LinkedInPostDialogProps {
  signalId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LinkedInPostDialog({
  signalId,
  open,
  onOpenChange,
}: LinkedInPostDialogProps) {
  const [step, setStep] = useState<"loading" | "edit" | "copied">("loading");
  const [postId, setPostId] = useState("");
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [error, setError] = useState("");

  async function handleOpen(isOpen: boolean) {
    if (isOpen) {
      setStep("loading");
      setError("");
      try {
        const res = await fetch(`/api/signals/${signalId}/draft-linkedin-post`, {
          method: "POST",
        });
        if (!res.ok) throw new Error("Failed to draft post");
        const data = await res.json();
        setPostId(data.id);
        setHeadline(data.headline);
        setContent(data.content);
        setHashtags(data.hashtags ?? []);
        setHashtagInput((data.hashtags ?? []).join(", "));
        setStep("edit");
      } catch {
        setError("Failed to generate draft. Please try again.");
        setStep("edit");
      }
    }
    onOpenChange(isOpen);
  }

  async function handleCopy() {
    const formatted = `${headline}\n\n${content}\n\n${hashtags.map((h) => `#${h}`).join(" ")}`;
    await navigator.clipboard.writeText(formatted);
    setStep("copied");
  }

  async function handleMarkPosted() {
    try {
      await fetch(`/api/signals/${signalId}/post-linkedin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, headline, content, hashtags }),
      });
    } catch {
      // Non-critical — post is already copied
    }
    onOpenChange(false);
  }

  function updateHashtags(value: string) {
    setHashtagInput(value);
    setHashtags(
      value
        .split(",")
        .map((h) => h.trim().replace(/^#/, ""))
        .filter(Boolean)
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Linkedin className="h-4 w-4 text-blue-600" />
            Draft LinkedIn Post
          </DialogTitle>
          <DialogDescription>
            Generate a thought leadership post inspired by this signal.
          </DialogDescription>
        </DialogHeader>

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drafting your LinkedIn post with AI...</p>
          </div>
        )}

        {step === "edit" && (
          <div className="space-y-3">
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div>
              <label className="text-xs font-medium text-muted-foreground">Headline</label>
              <Input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Post headline..."
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Content</label>
              <textarea
                className="w-full min-h-[140px] rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Hashtags (comma-separated)
              </label>
              <Input
                value={hashtagInput}
                onChange={(e) => updateHashtags(e.target.value)}
                placeholder="leadership, sales, growth"
              />
            </div>

            <div className="pt-2">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Preview</label>
              <LinkedInPostPreview
                headline={headline}
                content={content}
                hashtags={hashtags}
              />
            </div>
          </div>
        )}

        {step === "copied" && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm font-medium">Copied to clipboard!</p>
            <p className="text-xs text-muted-foreground">Paste it into LinkedIn to publish.</p>
          </div>
        )}

        <DialogFooter>
          {step === "edit" && (
            <Button onClick={handleCopy} disabled={!headline || !content}>
              <Copy className="mr-1 h-3.5 w-3.5" />
              Copy to Clipboard
            </Button>
          )}
          {step === "copied" && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("edit")}>
                Edit Again
              </Button>
              <Button onClick={handleMarkPosted}>
                Mark as Posted
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
