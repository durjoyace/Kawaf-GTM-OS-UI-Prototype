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
import { Loader2, Send, Sparkles } from "lucide-react";

interface SignalActionDialogProps {
  signalId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignalActionDialog({
  signalId,
  open,
  onOpenChange,
}: SignalActionDialogProps) {
  const [step, setStep] = useState<"loading" | "edit" | "sending" | "sent">("loading");
  const [emailId, setEmailId] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  async function handleOpen(isOpen: boolean) {
    if (isOpen) {
      setStep("loading");
      setError("");
      try {
        const res = await fetch(`/api/signals/${signalId}/draft-action`, {
          method: "POST",
        });
        if (!res.ok) throw new Error("Failed to draft email");
        const data = await res.json();
        setEmailId(data.id);
        setSubject(data.subject);
        setBody(data.body);
        setStep("edit");
      } catch {
        setError("Failed to generate draft. Please try again.");
        setStep("edit");
      }
    }
    onOpenChange(isOpen);
  }

  async function handleSend() {
    if (!toEmail) {
      setError("Please enter a recipient email.");
      return;
    }
    setStep("sending");
    setError("");
    try {
      const res = await fetch(`/api/signals/${signalId}/send-action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId, toEmail, subject, emailBody: body }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStep("sent");
    } catch {
      setError("Failed to send email. Please try again.");
      setStep("edit");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-green-500" />
            AI-Drafted Outreach
          </DialogTitle>
          <DialogDescription>
            Review and send a personalized email based on this signal.
          </DialogDescription>
        </DialogHeader>

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drafting your email with AI...</p>
          </div>
        )}

        {(step === "edit" || step === "sending") && (
          <div className="space-y-3">
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div>
              <label className="text-xs font-medium text-muted-foreground">To</label>
              <Input
                type="email"
                placeholder="prospect@company.com"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Body</label>
              <textarea
                className="w-full min-h-[160px] rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === "sent" && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <Send className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm font-medium">Email sent successfully!</p>
            <p className="text-xs text-muted-foreground">Sent to {toEmail}</p>
          </div>
        )}

        <DialogFooter>
          {step === "edit" && (
            <Button onClick={handleSend} disabled={!toEmail || !subject || !body}>
              <Send className="mr-1 h-3.5 w-3.5" />
              Send Email
            </Button>
          )}
          {step === "sending" && (
            <Button disabled>
              <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
              Sending...
            </Button>
          )}
          {step === "sent" && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
