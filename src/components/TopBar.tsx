import React, { useState } from 'react';
import {
  SearchIcon,
  BellIcon,
  PlusIcon,
  ChevronDownIcon,
  ZapIcon,
  SlidersHorizontalIcon } from
'lucide-react';
type TopBarProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};
export function TopBar({ title, subtitle, actions }: TopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center gap-4 sticky top-0 z-10">
      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-gray-900 leading-tight">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>

      {/* Search */}
      <div
        className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${searchFocused ? 'border-blue-300 bg-blue-50/50 w-64' : 'border-gray-200 bg-gray-50 w-48'}`}>

        <SearchIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search signals, accounts..."
          className="bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none w-full"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)} />

        <kbd className="hidden lg:flex items-center gap-0.5 text-[10px] text-gray-400 font-mono bg-white border border-gray-200 rounded px-1 py-0.5">
          ⌘K
        </kbd>
      </div>

      {/* Signal pulse indicator */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-medium text-emerald-700">Live</span>
      </div>

      {/* Filter */}
      <button className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
        <SlidersHorizontalIcon className="w-3.5 h-3.5" />
        Filters
      </button>

      {/* Actions */}
      {actions}

      {/* New action button */}
      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm">
        <PlusIcon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">New</span>
      </button>

      {/* Notifications */}
      <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        <BellIcon className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
      </button>

      {/* User */}
      <button className="flex items-center gap-2 pl-2 border-l border-gray-100">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center">
          <span className="text-[11px] font-bold text-white">AK</span>
        </div>
        <ChevronDownIcon className="w-3 h-3 text-gray-400" />
      </button>
    </header>);

}