import { playbookTemplates } from "@/lib/data/playbook-templates";
import { PlaybookCard } from "@/components/playbook-card";

export default function PlaybooksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Playbook Templates</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pre-built GTM playbooks by industry. Select a template to get started in seconds.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {playbookTemplates.map((template) => (
          <PlaybookCard
            key={template.id}
            id={template.id}
            name={template.name}
            industry={template.industry}
            description={template.description}
            channels={template.sequenceConfig.channels}
            steps={template.sequenceConfig.steps}
          />
        ))}
      </div>
    </div>
  );
}
