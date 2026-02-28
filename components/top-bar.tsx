"use client";

import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from "@/components/notification-dropdown";
import { UserMenu } from "@/components/user-menu";

interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-white/80 backdrop-blur-sm px-6 py-3">
      <div className="min-w-0">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button className="relative hidden md:flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent transition-colors w-[220px]">
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1 text-left">Search signals, accounts...</span>
          <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 text-[10px] font-medium">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </button>

        <div className="flex items-center gap-1 rounded-full border px-2.5 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-[10px] font-medium text-muted-foreground">Live</span>
        </div>

        {actions}

        <Button size="sm" className="h-8 gap-1 bg-green-600 hover:bg-green-700 text-xs">
          <Plus className="h-3.5 w-3.5" />
          New
        </Button>

        <NotificationDropdown />
        <UserMenu />
      </div>
    </header>
  );
}
