"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataToolbarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  tabs?: { label: string; value: string; count?: number }[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  sortOptions?: { label: string; value: string }[];
  activeSort?: string;
  onSortChange?: (value: string) => void;
  actions?: React.ReactNode;
}

export function DataToolbar({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  tabs,
  activeTab,
  onTabChange,
  sortOptions,
  activeSort,
  onSortChange,
  actions,
}: DataToolbarProps) {
  return (
    <div className="space-y-3">
      {/* Search + Actions row */}
      <div className="flex items-center gap-3">
        {onSearchChange && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-8 pl-8 text-xs"
            />
          </div>
        )}
        {actions}
        {sortOptions && (
          <div className="ml-auto flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground mr-1" />
            {sortOptions.map((sort) => (
              <button
                key={sort.value}
                onClick={() => onSortChange?.(sort.value)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  activeSort === sort.value
                    ? "bg-slate-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tabs row */}
      {tabs && (
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              size="sm"
              variant={activeTab === tab.value ? "default" : "secondary"}
              onClick={() => onTabChange?.(tab.value)}
              className={`h-7 rounded-full text-xs gap-1.5 ${
                activeTab === tab.value
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[11px] ${activeTab === tab.value ? "opacity-80" : "text-muted-foreground"}`}>
                  {tab.count}
                </span>
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
