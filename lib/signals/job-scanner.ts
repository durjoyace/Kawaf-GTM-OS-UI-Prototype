export interface JobPostingResult {
  companyName: string;
  title: string;
  description: string;
  location: string | null;
  url: string | null;
}

/**
 * Scan for job postings matching ICP criteria.
 * Uses SerpAPI in production. Returns mock data when API key is not configured.
 */
export async function scanJobPostings(
  icpConfig: Record<string, unknown> | null
): Promise<JobPostingResult[]> {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey || !icpConfig) {
    return getMockJobPostings();
  }

  const titles = (icpConfig.titles as string[]) ?? ["VP Sales", "Head of Growth"];
  const industries = (icpConfig.industries as string[]) ?? [];

  const query = `${titles.slice(0, 2).join(" OR ")} ${industries.slice(0, 2).join(" ")} hiring`;

  try {
    const res = await fetch(
      `https://serpapi.com/search.json?engine=google_jobs&q=${encodeURIComponent(query)}&api_key=${apiKey}`
    );
    if (!res.ok) return [];

    const data = await res.json();
    const jobs = (data.jobs_results ?? []).slice(0, 10);

    return jobs.map((job: Record<string, string>) => ({
      companyName: job.company_name ?? "Unknown",
      title: job.title ?? "",
      description: (job.description ?? "").slice(0, 500),
      location: job.location ?? null,
      url: job.share_link ?? null,
    }));
  } catch {
    return [];
  }
}

function getMockJobPostings(): JobPostingResult[] {
  return [
    {
      companyName: "TechCorp Inc",
      title: "VP of Sales",
      description: "Looking for a VP of Sales to lead our go-to-market expansion into enterprise.",
      location: "San Francisco, CA",
      url: null,
    },
    {
      companyName: "GrowthStack",
      title: "Head of Revenue Operations",
      description: "Hiring a Head of RevOps to scale our sales infrastructure and CRM processes.",
      location: "Remote",
      url: null,
    },
  ];
}
