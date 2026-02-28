"use client";

import { useState, useEffect } from "react";
import { Bell, Radar, GitBranch, Plug, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Notification } from "@/lib/types/models";
import { getNotifications } from "@/lib/data/api";

const typeIcons: Record<string, React.ElementType> = {
  signal: Radar,
  sequence: GitBranch,
  integration: Plug,
  system: Settings,
};

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

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
        <div className="border-b px-4 py-2.5">
          <p className="text-sm font-semibold">Notifications</p>
          <p className="text-[10px] text-muted-foreground">{unreadCount} unread</p>
        </div>
        <div className="max-h-[320px] overflow-y-auto divide-y">
          {notifications.map((n) => {
            const Icon = typeIcons[n.type] || Bell;
            return (
              <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer ${!n.read ? "bg-blue-50/40" : ""}`}>
                <div className={`rounded-full p-1.5 mt-0.5 ${!n.read ? "bg-blue-100" : "bg-gray-100"}`}>
                  <Icon className={`h-3 w-3 ${!n.read ? "text-blue-600" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{n.description}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">{n.time}</p>
                </div>
                {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
