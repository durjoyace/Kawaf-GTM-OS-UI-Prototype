import type { Account } from "@/lib/types/models";

export function AccountRow({ account, isSelected }: { account: Account; isSelected?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${isSelected ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-[10px] font-bold text-white">
        {account.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{account.name}</p>
        <p className="text-[10px] text-muted-foreground truncate">{account.industry}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold">{account.score}</p>
      </div>
    </div>
  );
}
