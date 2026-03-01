import type { IntegrationAdapter } from "./types";
import { MockSalesforceAdapter } from "./adapters/mock-salesforce";
import { MockHubSpotAdapter } from "./adapters/mock-hubspot";
import { MockOutreachAdapter } from "./adapters/mock-outreach";
import { MockLinkedInAdapter } from "./adapters/mock-linkedin";

const adapters: Record<string, IntegrationAdapter> = {
  salesforce: new MockSalesforceAdapter(),
  hubspot: new MockHubSpotAdapter(),
  outreach: new MockOutreachAdapter(),
  linkedin: new MockLinkedInAdapter(),
};

export function getAdapter(provider: string): IntegrationAdapter | null {
  return adapters[provider] ?? null;
}

export function listProviders(): string[] {
  return Object.keys(adapters);
}
