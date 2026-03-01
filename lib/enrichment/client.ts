import type { EnrichmentResult } from "./types";

/**
 * Enrichment provider abstraction.
 * Uses Apollo.io API when APOLLO_API_KEY is set, otherwise returns mock data.
 */
export async function fetchEnrichment(companyName: string, domain?: string): Promise<EnrichmentResult> {
  if (process.env.APOLLO_API_KEY) {
    return fetchFromApollo(companyName, domain);
  }
  return mockEnrichment(companyName);
}

async function fetchFromApollo(companyName: string, domain?: string): Promise<EnrichmentResult> {
  const res = await fetch("https://api.apollo.io/v1/organizations/enrich", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "X-Api-Key": process.env.APOLLO_API_KEY!,
    },
    body: JSON.stringify({
      name: companyName,
      domain: domain ?? undefined,
    }),
  });

  if (!res.ok) {
    console.error(`[Enrichment] Apollo API error: ${res.status}`);
    return mockEnrichment(companyName);
  }

  const data = await res.json();
  const org = data.organization;

  if (!org) return mockEnrichment(companyName);

  return {
    employees: org.estimated_num_employees ?? null,
    revenue: org.annual_revenue_printed ?? null,
    techStack: org.current_technologies?.map((t: { name: string }) => t.name).slice(0, 20) ?? null,
    linkedinUrl: org.linkedin_url ?? null,
    fundingStage: org.latest_funding_stage ?? null,
    headquarters: [org.city, org.state, org.country]
      .filter(Boolean)
      .join(", ") || null,
    source: "apollo",
  };
}

function mockEnrichment(companyName: string): EnrichmentResult {
  console.log(`[Enrichment Mock] Enriching: ${companyName}`);
  const hash = companyName.length * 7;
  return {
    employees: 50 + (hash % 950),
    revenue: `$${(1 + (hash % 99))}M`,
    techStack: ["React", "AWS", "PostgreSQL", "Stripe"].slice(0, 2 + (hash % 3)),
    linkedinUrl: `https://linkedin.com/company/${companyName.toLowerCase().replace(/\s+/g, "-")}`,
    fundingStage: ["Seed", "Series A", "Series B", "Series C"][hash % 4],
    headquarters: ["San Francisco, CA", "New York, NY", "Austin, TX", "London, UK"][hash % 4],
    source: "mock",
  };
}
