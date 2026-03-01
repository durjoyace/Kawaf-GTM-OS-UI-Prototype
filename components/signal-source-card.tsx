import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Briefcase, TrendingUp, Plug } from "lucide-react";

const sources = [
  { id: "crm", name: "CRM Sync", icon: Plug, status: "active", color: "text-blue-500" },
  { id: "tracking", name: "Website Tracking", icon: Eye, status: "active", color: "text-green-500" },
  { id: "jobs", name: "Job Postings", icon: Briefcase, status: "active", color: "text-purple-500" },
  { id: "funding", name: "Funding & News", icon: TrendingUp, status: "active", color: "text-orange-500" },
];

export function SignalSourceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Signal Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sources.map((source) => (
            <div key={source.id} className="flex items-center gap-3">
              <source.icon className={`h-4 w-4 ${source.color}`} />
              <span className="flex-1 text-sm">{source.name}</span>
              <Badge variant="secondary" className="text-[11px]">
                {source.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
