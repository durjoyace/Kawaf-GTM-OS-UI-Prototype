"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radar,
  GitBranch,
  Sparkles,
  BarChart3,
  Workflow,
  Plug,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronDown,
  AlertTriangle,
  Eye,
  BookOpen,
  Wand2,
  FileBarChart,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  warning?: boolean;
}

const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "Core",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/signal-discovery", label: "Signal Discovery", icon: Radar, badge: "12" },
      { href: "/orchestration", label: "Orchestration", icon: GitBranch, badge: "3" },
      { href: "/attribution", label: "Attribution", icon: BarChart3 },
    ],
  },
  {
    label: "Build",
    items: [
      { href: "/ai-personalization", label: "AI Personalization", icon: Sparkles },
      { href: "/workflow-builder", label: "Workflow Builder", icon: Workflow },
      { href: "/signal-builder", label: "Signal Builder", icon: Wand2 },
    ],
  },
  {
    label: "Connect",
    items: [
      { href: "/integrations", label: "Integrations", icon: Plug, warning: true },
      { href: "/integrations/tracking-setup", label: "Tracking", icon: Eye },
    ],
  },
  {
    label: "Manage",
    items: [
      { href: "/playbooks", label: "Playbooks", icon: BookOpen },
      { href: "/reports", label: "Reports", icon: FileBarChart },
    ],
  },
];

const bottomNav = [
  { href: "/developers", label: "Help & Docs", icon: HelpCircle },
  { href: "/settings/billing", label: "Settings", icon: Settings },
];

interface SidebarNavProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function SidebarNav({ collapsed, onToggle }: SidebarNavProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside
      className={cn(
        "flex flex-col bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-xs font-bold">K</span>
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">Kawaf</p>
              <p className="text-[11px] text-slate-400">GTM OS</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="rounded-md p-1 hover:bg-white/10 transition-colors"
          title="Toggle sidebar"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Workspace selector */}
      {!collapsed && (
        <div className="mx-3 mt-3 rounded-lg bg-white/5 px-3 py-2 cursor-pointer hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium">{session?.user?.name ? `${session.user.name}'s Workspace` : "Workspace"}</p>
              <p className="text-[11px] text-slate-400">Enterprise</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>
      )}

      {/* Main nav */}
      <div className="mt-4 flex-1 space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-4 mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                {section.label}
              </p>
            )}
            <nav className="space-y-0.5 px-2">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-white/10 text-white border-l-2 border-green-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-green-500/20 text-green-400 px-1.5 py-0.5 text-[11px] font-medium">
                            {item.badge}
                          </span>
                        )}
                        {item.warning && (
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="border-t border-white/10 px-2 py-2 space-y-0.5">
        {bottomNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>

      {/* User */}
      <div className="border-t border-white/10 px-3 py-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold shrink-0">
            {session?.user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2) ?? "?"}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{session?.user?.name ?? "User"}</p>
              <p className="text-[11px] text-slate-400 truncate">{session?.user?.email ?? ""}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
