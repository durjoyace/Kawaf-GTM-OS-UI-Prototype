export interface NewsResult {
  companyName: string;
  title: string;
  description: string;
  url: string | null;
  publishedAt: string | null;
}

/**
 * Scan for funding and leadership news matching ICP.
 * Uses NewsAPI in production. Returns mock data when API key is not configured.
 */
export async function scanFundingNews(
  icpConfig: Record<string, unknown> | null
): Promise<NewsResult[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return getMockNewsResults();
  }

  const industries = (icpConfig?.industries as string[]) ?? [];
  const query = `(funding OR "series" OR "raised" OR "new CEO" OR "leadership") ${industries.slice(0, 2).join(" ")}`;

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
    );
    if (!res.ok) return [];

    const data = await res.json();
    const articles = (data.articles ?? []).slice(0, 10);

    return articles.map((article: Record<string, string>) => ({
      companyName: extractCompanyName(article.title ?? ""),
      title: article.title ?? "",
      description: (article.description ?? "").slice(0, 500),
      url: article.url ?? null,
      publishedAt: article.publishedAt ?? null,
    }));
  } catch {
    return [];
  }
}

/** Simple company name extraction from news titles */
function extractCompanyName(title: string): string {
  // Try to extract company name before common funding keywords
  const match = title.match(/^(.+?)(?:\s+raises?\s|\s+secures?\s|\s+announces?\s|\s+appoints?\s)/i);
  return match ? match[1].trim() : "Unknown";
}

function getMockNewsResults(): NewsResult[] {
  return [
    {
      companyName: "CloudSync AI",
      title: "CloudSync AI Raises $25M Series B to Expand Enterprise Platform",
      description: "CloudSync AI has secured $25M in Series B funding led by Sequoia Capital to scale their enterprise data synchronization platform.",
      url: null,
      publishedAt: new Date().toISOString(),
    },
    {
      companyName: "DataFlow",
      title: "DataFlow Appoints New CRO to Lead Revenue Growth",
      description: "DataFlow has appointed Jane Smith as Chief Revenue Officer to lead their go-to-market expansion.",
      url: null,
      publishedAt: new Date().toISOString(),
    },
  ];
}
