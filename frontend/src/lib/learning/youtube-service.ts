/**
 * YouTube Data API v3 Service
 * Secure, server-side retrieval of real educational YouTube video references.
 * Never exposes API keys to client-side.
 * Strictly adheres to ZERO fake fallback videos.
 */

import { LearningResourceItem } from "./types";
import { SkillGapItem } from "@/lib/skill-gap/types";

interface YouTubeApiSearchItem {
  id: {
    kind: string;
    videoId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
    channelTitle: string;
  };
}

interface YouTubeApiSearchResponse {
  items?: YouTubeApiSearchItem[];
  error?: {
    code: number;
    message: string;
  };
}

/**
 * Decode HTML entities commonly returned by YouTube API (e.g., &amp;, &#39;, &quot;)
 */
function decodeHtmlEntities(text: string): string {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–");
}

/**
 * Formulate targeted educational search query derived from actual student gap,
 * target niche, and experience level.
 */
export function buildYouTubeSearchQuery(
  skillName: string,
  nicheTitle: string,
  difficulty: "beginner" | "intermediate" | "advanced"
): string {
  let levelTerm = "tutorial beginner basics";
  if (difficulty === "intermediate") {
    levelTerm = "tutorial practical guide implementation";
  } else if (difficulty === "advanced") {
    levelTerm = "architecture deep dive advanced tutorial";
  }

  // Combine skill name with target technical domain context
  return `${skillName} ${nicheTitle} ${levelTerm}`;
}

/**
 * Educational filter to reject obvious non-educational or irrelevant content.
 */
function isEducationalVideo(title: string, description: string): boolean {
  const combined = `${title} ${description}`.toLowerCase();
  const nonEducationalPatterns = [
    "official music video",
    "official trailer",
    "movie clip",
    "reaction video",
    "funny moments",
    "vlog #",
    "song",
    "prank",
  ];

  for (const pattern of nonEducationalPatterns) {
    if (combined.includes(pattern)) {
      return false;
    }
  }

  return true;
}

interface RawVideoItem {
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt?: string;
}

interface YouTubeiSearchResult {
  contents?: {
    twoColumnSearchResultsRenderer?: {
      primaryContents?: {
        sectionListRenderer?: {
          contents?: Array<{
            itemSectionRenderer?: {
              contents?: Array<{
                videoRenderer?: {
                  videoId?: string;
                  title?: { runs?: Array<{ text?: string }> };
                  ownerText?: { runs?: Array<{ text?: string }> };
                  detailedMetadataSnippets?: Array<{
                    snippetText?: { runs?: Array<{ text?: string }> };
                  }>;
                  thumbnail?: {
                    thumbnails?: Array<{ url?: string }>;
                  };
                  publishedTimeText?: { simpleText?: string };
                };
              }>;
            };
          }>;
        };
      };
    };
  };
}

/**
 * Query official YouTube Data API v3 when YOUTUBE_API_KEY is available.
 */
async function fetchViaYouTubeDataApi(
  query: string,
  apiKey: string,
  maxResults: number
): Promise<{ items: RawVideoItem[]; error?: string }> {
  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", query);
    url.searchParams.set("type", "video");
    url.searchParams.set("safeSearch", "strict");
    url.searchParams.set("relevanceLanguage", "en");
    url.searchParams.set("maxResults", String(maxResults));
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as YouTubeApiSearchResponse;
      const errMsg = errorData.error?.message || response.statusText;
      console.warn("YouTube Data API v3 error response:", errMsg);
      return { items: [], error: errMsg };
    }

    const data = (await response.json()) as YouTubeApiSearchResponse;
    const items: RawVideoItem[] = [];

    for (const item of data.items || []) {
      const videoId = item.id?.videoId;
      if (!videoId) continue;

      const title = decodeHtmlEntities(item.snippet?.title || "");
      const description = decodeHtmlEntities(item.snippet?.description || "");
      const channelTitle = decodeHtmlEntities(item.snippet?.channelTitle || "Educational Channel");
      const thumbnailUrl =
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      items.push({
        videoId,
        title,
        description,
        channelTitle,
        thumbnailUrl,
        publishedAt: item.snippet?.publishedAt,
      });
    }

    return { items };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("YouTube Data API fetch failed:", msg);
    return { items: [], error: msg };
  }
}

/**
 * Server-side fallback using direct educational query against YouTube's live index.
 * Retrieves authentic videos without requiring client-side exposure or fabricating data.
 */
async function fetchViaYouTubeServiceSearch(
  query: string,
  maxResults: number
): Promise<{ items: RawVideoItem[]; error?: string }> {
  try {
    const response = await fetch("https://www.youtube.com/youtubei/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "WEB",
            clientVersion: "2.20231201.00.00",
          },
        },
        query,
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      return { items: [], error: `YouTube search status: ${response.status}` };
    }

    const data = (await response.json()) as YouTubeiSearchResult;
    const sectionList =
      data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [];

    const items: RawVideoItem[] = [];

    for (const section of sectionList) {
      const contents = section.itemSectionRenderer?.contents || [];
      for (const entry of contents) {
        const vr = entry.videoRenderer;
        if (!vr || !vr.videoId) continue;

        const videoId = vr.videoId;
        const title = decodeHtmlEntities(vr.title?.runs?.map((r) => r.text || "").join("") || "");
        const description = decodeHtmlEntities(
          vr.detailedMetadataSnippets?.[0]?.snippetText?.runs?.map((r) => r.text || "").join("") ||
            vr.title?.runs?.map((r) => r.text || "").join("") ||
            ""
        );
        const channelTitle = decodeHtmlEntities(
          vr.ownerText?.runs?.map((r) => r.text || "").join("") || "Educational Channel"
        );
        const thumbs = vr.thumbnail?.thumbnails || [];
        const thumbnailUrl =
          thumbs.length > 0
            ? thumbs[thumbs.length - 1].url || ""
            : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        items.push({
          videoId,
          title,
          description,
          channelTitle,
          thumbnailUrl: thumbnailUrl.startsWith("//") ? `https:${thumbnailUrl}` : thumbnailUrl,
          publishedAt: vr.publishedTimeText?.simpleText || new Date().toISOString(),
        });

        if (items.length >= maxResults) break;
      }
      if (items.length >= maxResults) break;
    }

    return { items };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("YouTube service search failed:", msg);
    return { items: [], error: msg };
  }
}

/**
 * Retrieve real YouTube educational videos for student's identified skill gaps.
 * Prioritizes high-priority gaps, applies strict educational filtering, prevents duplicates,
 * and seamlessly uses official YouTube Data API v3 when key is provided or server search fallback.
 */
export async function fetchYouTubeResourcesForGaps(params: {
  skillGaps: SkillGapItem[];
  nicheTitle: string;
  domainName: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}): Promise<{
  resources: LearningResourceItem[];
  isConfigured: boolean;
  error?: string;
}> {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  const hasApiKey = Boolean(apiKey && apiKey.length > 0);

  const { skillGaps, nicheTitle, difficulty } = params;

  // Filter down to high priority first, then medium priority gaps (up to 3 gaps)
  const prioritizedGaps = [
    ...skillGaps.filter((g) => g.priority === "high"),
    ...skillGaps.filter((g) => g.priority === "medium"),
    ...skillGaps.filter((g) => g.priority === "low"),
  ].slice(0, 3);

  if (prioritizedGaps.length === 0) {
    return {
      resources: [],
      isConfigured: true,
    };
  }

  const collectedResources: LearningResourceItem[] = [];
  const seenVideoIds = new Set<string>();

  // Aim for 5-8 total videos across prioritized gaps (minimum 2 per gap)
  const maxPerGap = Math.max(2, Math.ceil(8 / prioritizedGaps.length));
  let lastError: string | undefined = undefined;

  for (const gap of prioritizedGaps) {
    try {
      const query = buildYouTubeSearchQuery(gap.skillName, nicheTitle, difficulty);
      let rawItems: RawVideoItem[] = [];

      // 1. Try official YouTube Data API v3 if key is configured
      if (hasApiKey && apiKey) {
        const dataApiResult = await fetchViaYouTubeDataApi(query, apiKey, maxPerGap + 4);
        if (dataApiResult.items.length > 0) {
          rawItems = dataApiResult.items;
        } else {
          lastError = dataApiResult.error;
        }
      }

      // 2. If no API key configured or Data API returned empty/error, query YouTube live search
      if (rawItems.length === 0) {
        const serviceResult = await fetchViaYouTubeServiceSearch(query, maxPerGap + 6);
        if (serviceResult.items.length > 0) {
          rawItems = serviceResult.items;
        } else if (!lastError) {
          lastError = serviceResult.error;
        }
      }

      let addedForGap = 0;
      for (const item of rawItems) {
        const { videoId, title, description, channelTitle, thumbnailUrl, publishedAt } = item;
        if (!videoId || seenVideoIds.has(videoId)) continue;

        if (!isEducationalVideo(title, description)) {
          continue;
        }

        seenVideoIds.add(videoId);

        const levelQualifier =
          difficulty === "beginner"
            ? "core fundamentals"
            : difficulty === "advanced"
            ? "advanced architectural patterns"
            : "practical hands-on techniques";

        const relevanceReason = `Recommended because it covers ${gap.skillName} ${levelQualifier} related to your ${gap.priority}-priority skill gap.`;

        collectedResources.push({
          id: `yt_${videoId}`,
          videoId,
          title,
          description: description.length > 200 ? `${description.slice(0, 197)}...` : description,
          channelTitle: channelTitle || "Educational Channel",
          thumbnailUrl,
          publishedAt: publishedAt || new Date().toISOString(),
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          skillId: gap.skillId,
          skillName: gap.skillName,
          priority: gap.priority,
          difficulty,
          relevanceReason,
        });

        addedForGap++;
        if (addedForGap >= maxPerGap) break;
      }
    } catch (err) {
      console.error(`Error querying YouTube for gap "${gap.skillName}":`, err);
    }
  }

  const isConfigured = hasApiKey || collectedResources.length > 0;

  return {
    resources: collectedResources,
    isConfigured,
    error: collectedResources.length === 0 ? lastError : undefined,
  };
}
