const endpoints = [
  {
    method: "GET",
    path: "/api/signals",
    description: "List all signals for your workspace",
    auth: "Bearer token",
  },
  {
    method: "POST",
    path: "/api/signals/ingest",
    description: "Ingest a new signal from an external source",
    auth: "Bearer token",
  },
  {
    method: "GET",
    path: "/api/accounts",
    description: "List all signal accounts",
    auth: "Bearer token",
  },
  {
    method: "POST",
    path: "/api/signals/{id}/draft-action",
    description: "AI-draft a personalized outreach email for a signal",
    auth: "Bearer token",
  },
  {
    method: "POST",
    path: "/api/signals/{id}/send-action",
    description: "Send an outreach email via Resend",
    auth: "Bearer token",
  },
  {
    method: "POST",
    path: "/api/tracking/events",
    description: "Track a website visitor event (public, API key auth)",
    auth: "API key",
  },
  {
    method: "GET",
    path: "/api/playbooks",
    description: "List all playbooks for your workspace",
    auth: "Bearer token",
  },
  {
    method: "POST",
    path: "/api/playbooks",
    description: "Create a playbook from a template",
    auth: "Bearer token",
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-green-500/10 text-green-600",
  POST: "bg-blue-500/10 text-blue-600",
  PUT: "bg-amber-500/10 text-amber-600",
  DELETE: "bg-red-500/10 text-red-600",
};

export function ApiReference() {
  return (
    <div className="space-y-3">
      {endpoints.map((ep) => (
        <div key={`${ep.method}-${ep.path}`} className="flex items-start gap-3 rounded-lg border p-4">
          <span className={`rounded px-2 py-0.5 text-xs font-mono font-semibold ${methodColors[ep.method]}`}>
            {ep.method}
          </span>
          <div className="flex-1">
            <code className="text-sm font-mono">{ep.path}</code>
            <p className="mt-1 text-xs text-muted-foreground">{ep.description}</p>
          </div>
          <span className="text-xs text-muted-foreground">{ep.auth}</span>
        </div>
      ))}
    </div>
  );
}
