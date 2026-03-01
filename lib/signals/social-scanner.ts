export interface SocialMention {
  platform: "twitter" | "linkedin" | "reddit";
  author: string;
  content: string;
  url: string;
  publishedAt: string;
}

/**
 * Scan social media for mentions.
 * Uses SerpAPI when SERPAPI_KEY is set, otherwise returns mock data.
 */
export async function scanSocialMentions(
  keywords: string[]
): Promise<SocialMention[]> {
  if (process.env.SERPAPI_KEY) {
    return scanViaSerpApi(keywords);
  }
  return mockSocialScan(keywords);
}

async function scanViaSerpApi(keywords: string[]): Promise<SocialMention[]> {
  const mentions: SocialMention[] = [];

  for (const keyword of keywords.slice(0, 3)) {
    const params = new URLSearchParams({
      engine: "google",
      q: `${keyword} site:twitter.com OR site:linkedin.com OR site:reddit.com`,
      api_key: process.env.SERPAPI_KEY!,
      num: "10",
    });

    try {
      const res = await fetch(`https://serpapi.com/search?${params}`);
      if (!res.ok) continue;
      const data = await res.json();

      for (const result of data.organic_results ?? []) {
        const platform = result.link?.includes("twitter.com")
          ? "twitter"
          : result.link?.includes("linkedin.com")
            ? "linkedin"
            : "reddit";

        mentions.push({
          platform,
          author: result.source ?? "Unknown",
          content: result.snippet ?? result.title ?? "",
          url: result.link ?? "",
          publishedAt: result.date ?? new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error(`[Social Scanner] SerpAPI error for "${keyword}":`, err);
    }
  }

  return mentions;
}

function mockSocialScan(keywords: string[]): SocialMention[] {
  console.log(`[Social Mock] Scanning: ${keywords.join(", ")}`);
  const platforms: Array<"twitter" | "linkedin" | "reddit"> = ["twitter", "linkedin", "reddit"];

  return keywords.slice(0, 3).flatMap((keyword, i) => [
    {
      platform: platforms[i % 3],
      author: `@user_${keyword.slice(0, 5)}`,
      content: `Just discovered ${keyword} — looks promising for our GTM workflow.`,
      url: `https://${platforms[i % 3]}.com/post/${Date.now()}`,
      publishedAt: new Date().toISOString(),
    },
  ]);
}
