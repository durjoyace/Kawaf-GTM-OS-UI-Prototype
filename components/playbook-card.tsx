import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PlaybookCardProps {
  id: string;
  name: string;
  industry: string;
  description: string;
  channels: string[];
  steps: number;
}

export function PlaybookCard({
  id,
  name,
  industry,
  description,
  channels,
  steps,
}: PlaybookCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          <Badge variant="secondary">{industry}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{steps} steps</span>
          <span>{channels.join(", ")}</span>
        </div>
        <Button variant="outline" size="sm" className="mt-4" asChild>
          <Link href={`/playbooks/${id}`}>
            Use Template <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
