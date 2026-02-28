"use client";

import { Search, Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-white px-6 py-3">
      <div className="min-w-0">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search signals, accounts..."
            className="h-8 w-[220px] pl-8 text-xs"
          />
        </div>

        <div className="flex items-center gap-1 rounded-full border px-2.5 py-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-[10px] font-medium text-muted-foreground">Live</span>
        </div>

        {actions}

        <Button size="sm" className="h-8 gap-1 bg-green-600 hover:bg-green-700 text-xs">
          <Plus className="h-3.5 w-3.5" />
          New
        </Button>

        <button className="relative rounded-full p-1.5 hover:bg-gray-100 transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
          AK
        </div>
      </div>
    </header>
  );
}
