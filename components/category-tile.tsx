import { BarChart3, Building2, Database, Megaphone, Newspaper } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { SignalCategoryCount } from "@/lib/types/models";

const iconMap: Record<string, React.ElementType> = {
  "bar-chart-3": BarChart3,
  "building-2": Building2,
  database: Database,
  megaphone: Megaphone,
  newspaper: Newspaper,
};

export function CategoryTile({ category }: { category: SignalCategoryCount }) {
  const Icon = iconMap[category.icon] || BarChart3;

  return (
    <Card className="flex items-center gap-3 px-4 py-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="rounded-lg bg-blue-50 p-2">
        <Icon className="h-4 w-4 text-blue-600" />
      </div>
      <div>
        <p className="text-lg font-bold leading-tight">{category.count}</p>
        <p className="text-[10px] text-muted-foreground">{category.label}</p>
      </div>
    </Card>
  );
}
