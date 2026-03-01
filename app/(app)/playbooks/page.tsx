import { playbookTemplates } from "@/lib/data/playbook-templates";
import { PlaybookCard } from "@/components/playbook-card";
import { TopBar } from "@/components/top-bar";

export default function PlaybooksPage() {
  return (
    <>
      <TopBar title="Playbooks" subtitle="Pre-built GTM playbooks by industry" />
      <div className="p-6 space-y-6">
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
    </>
  );
}
