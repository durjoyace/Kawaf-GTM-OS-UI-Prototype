"use client";

import { useState, useEffect } from "react";
import { Bell, Radar, GitBranch, Plug, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Notification } from "@/lib/types/models";

const typeIcons: Record<string, React.ElementType> = {
  signal: Radar,
  sequence: GitBranch,
  integration: Plug,
  system: Settings,
};

function timeAgo(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((rows) =>
        setNotifications(
          rows.map((n: { id: string; title: string; description: string; created_at: string; read: boolean; type: string }) => ({
            id: n.id,
            title: n.title,
            description: n.description ?? "",
            time: timeAgo(n.created_at ?? new Date()),
            read: n.read ?? false,
            type: n.type,
          }))
        )
      );
  }, []);

  async function markAllRead() {
    await fetch("/api/notifications/mark-all-read", { method: "POST" });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full p-1.5 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="border-b px-4 py-2.5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Notifications</p>
            <p className="text-[11px] text-muted-foreground">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-6 text-[11px] text-muted-foreground" onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-[320px] overflow-y-auto divide-y">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center px-4">
              <div className="rounded-full bg-muted p-3 mb-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs font-semibold">All caught up</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">No new notifications</p>
            </div>
          ) : (
            notifications.map((n) => {
              const Icon = typeIcons[n.type] || Bell;
              return (
                <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer ${!n.read ? "bg-blue-50/40" : ""}`}>
                  <div className={`rounded-full p-1.5 mt-0.5 ${!n.read ? "bg-blue-100" : "bg-gray-100"}`}>
                    <Icon className={`h-3 w-3 ${!n.read ? "text-blue-600" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{n.description}</p>
                    <p className="text-[11px] text-muted-foreground/60 mt-0.5">{n.time}</p>
                  </div>
                  {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
                </div>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
