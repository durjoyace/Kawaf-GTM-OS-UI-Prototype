"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, Settings, User, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {session?.user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2) ?? "?"}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{session?.user?.name ?? "User"}</p>
            <p className="text-xs text-muted-foreground">{session?.user?.email ?? ""}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <User className="h-3.5 w-3.5" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <CreditCard className="h-3.5 w-3.5" /> Billing
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <Settings className="h-3.5 w-3.5" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer text-red-600 focus:text-red-600" onClick={() => signOut({ callbackUrl: "/login" })}>
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
