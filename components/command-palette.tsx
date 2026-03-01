"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard, Radar, GitBranch, Sparkles, BarChart3,
  Workflow, Plug, Search,
} from "lucide-react";

const pages = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, keywords: "home overview kpis" },
  { label: "Signal Discovery", href: "/signal-discovery", icon: Radar, keywords: "signals accounts buying intent" },
  { label: "Orchestration", href: "/orchestration", icon: GitBranch, keywords: "sequences campaigns outbound" },
  { label: "AI Personalization", href: "/ai-personalization", icon: Sparkles, keywords: "ai engine tuning messaging" },
  { label: "Attribution", href: "/attribution", icon: BarChart3, keywords: "revenue funnel analytics" },
  { label: "Workflow Builder", href: "/workflow-builder", icon: Workflow, keywords: "automation nodes canvas" },
  { label: "Integrations", href: "/integrations", icon: Plug, keywords: "salesforce hubspot connect" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filtered = pages.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.label.toLowerCase().includes(q) ||
      p.keywords.includes(q)
    );
  });

  function navigate(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            placeholder="Search pages, commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 h-11 text-sm focus-visible:ring-0 shadow-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-[11px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-1">
          <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Pages
          </p>
          {filtered.map((page) => (
            <button
              key={page.href}
              onClick={() => navigate(page.href)}
              className="flex items-center gap-2.5 w-full rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors text-left"
            >
              <page.icon className="h-4 w-4 text-muted-foreground" />
              <span>{page.label}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6">No results found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
