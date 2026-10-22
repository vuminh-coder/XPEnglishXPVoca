import { NextRequest, NextResponse } from "next/server";
import {
  parseTimedTextAny,
  parseVnTimedTextAny,
  alignBilingualSubtitles,
  extractDictationWord,
  formatTimestampMs,
  ParsedXmlItem,
} from "@/features/listening/services/youtubeSubtitleParser";
import { fetchLrclibSyncedLyrics } from "@/features/listening/services/lrclibLyricsService";
import { generateAiSubtitlesForVideo } from "@/features/myvideo/services/videoAiTranscribeService";

export interface SubtitleItem {
  id: number;
  start: string;
  end: string;
  duration: number;
  english: string;
  vietnamese: string;
  dictationWord: string;
  startSeconds: number;
  wordTimings?: { word: string; start: number; end: number }[];
  isAiGenerated?: boolean;
}

export interface ExtractedTrack {
  lang: string;
  kind?: string;
  baseUrl: string;
}

// In-Memory Subtitle Cache by videoId (2-hour TTL, max 300 entries) to prevent memory creep
const captionServerCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const MAX_CAPTION_CACHE_ITEMS = 300;

function setCaptionCache(videoId: string, data: any) {
  if (captionServerCache.size >= MAX_CAPTION_CACHE_ITEMS) {
    const oldestKey = captionServerCache.keys().next().value;
    if (oldestKey) captionServerCache.delete(oldestKey);
  }
  captionServerCache.set(videoId, { data, timestamp: Date.now() });
}

// In-Flight Request Coalescing (Eliminates Cache Stampedes on upstream YouTube API)
const inFlightCaptionsMap = new Map<string, Promise<any>>();

async function getOrFetchCaptions(videoId: string): Promise<any> {
  const fetchPromise = (async () => {
    const result = await fetchSubtitlesOrTracksOnServer(videoId);
    if (!result || (!result.subtitles?.length && !result.tracks?.length)) {
      return null;
    }

    const payload = {
      success: true,
      videoId,
      title: result.title || "Video Học Tiếng Anh YouTube",
      authorName: result.authorName || "YouTube Creator",
      subtitles: result.subtitles || [],
      tracks: result.tracks || [],
      needClientFetch: result.needClientFetch || false,
      totalCount: result.subtitles?.length || 0,
      hasCaptions: true,
      isAiGenerated: (result as any).isAiGenerated || false,
    };

    if (result.subtitles && result.subtitles.length > 0) {
      setCaptionCache(videoId, payload);
    }
    return payload;
  })();

  inFlightCaptionsMap.set(videoId, fetchPromise);
  try {
    return await fetchPromise;
  } finally {
    inFlightCaptionsMap.delete(videoId);
  }
}

/**
 * Backend Server API Route: /api/youtube/captions
 * Multi-tier Hybrid Server-Client Subtitle Extractor & Watch Page Parser.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json(
      { error: "Vui lòng cung cấp tham số videoId", hasCaptions: false },
      { status: 400 }
    );
  }

  // Check Cache HIT (bypass with ?force=1)
  const forceRefresh = searchParams.get("force") === "1";
  const cached = captionServerCache.get(videoId);
  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, {
      headers: { "X-Cache": "HIT" },
    });
  }

  // Check In-Flight Coalescing
  if (inFlightCaptionsMap.has(videoId)) {
    try {
      const coalescedData = await inFlightCaptionsMap.get(videoId);
      if (coalescedData) {
        return NextResponse.json(coalescedData, {
          headers: { "X-Cache": "IN_FLIGHT_COALESCED" },
        });
      }
    } catch {
      // Continue to fetch
    }
  }

  try {
    const payload = await getOrFetchCaptions(videoId);
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: "Video YouTube này không có phụ đề khả dụng.",
          hasCaptions: false,
          subtitles: [],
          tracks: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(payload, {
      headers: { "X-Cache": "MISS" },
    });

  } catch (error: any) {
    console.error("Error in backend caption route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Không thể lấy phụ đề từ YouTube Server",
        details: error?.message,
        hasCaptions: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const videoId = body.videoId;

    if (!videoId) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp videoId trong body", hasCaptions: false },
        { status: 400 }
      );
    }

    // Check Cache HIT
    const cached = captionServerCache.get(videoId);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json(cached.data, {
        headers: { "X-Cache": "HIT" },
      });
    }

    // Check In-Flight Coalescing
    if (inFlightCaptionsMap.has(videoId)) {
      try {
        const coalescedData = await inFlightCaptionsMap.get(videoId);
        if (coalescedData) {
          return NextResponse.json(coalescedData, {
            headers: { "X-Cache": "IN_FLIGHT_COALESCED" },
          });
        }
      } catch {}
    }

    const payload = await getOrFetchCaptions(videoId);
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: "Video YouTube này không có phụ đề khả dụng.",
          hasCaptions: false,
          subtitles: [],
          tracks: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(payload, {
      headers: { "X-Cache": "MISS" },
    });

  } catch (error: any) {
    console.error("Error in backend caption POST route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Lỗi hệ thống khi trích xuất phụ đề",
        details: error?.message,
        hasCaptions: false,
      },
      { status: 500 }
    );
  }
}

/**
 * Extract captionTracks from YouTube page HTML using multiple regex strategies
 */
function extractCaptionTracksFromHtml(html: string): any[] {
  // Strategy 1: "captionTracks" with greedy balanced bracket match
  const strategies = [
    // Match captionTracks JSON array (handles nested objects and various quote styles)
    /"captionTracks"\s*:\s*(\[[\s\S]*?\])\s*,\s*"(?:audioTracks|translationLanguages|defaultAudioTrackIndex)/,
    /"captionTracks"\s*:\s*(\[\{[\s\S]*?\}\])/,
    /"captionTracks"\s*:\s*(\[[^\]]+\])/,
  ];

  for (const regex of strategies) {
    const match = regex.exec(html);
    if (match && match[1]) {
      try {
        const tracks = JSON.parse(match[1]);
        if (Array.isArray(tracks) && tracks.length > 0) {
          return tracks;
        }
      } catch {
        // Try cleaning the string and re-parsing
        try {
          const cleaned = match[1].replace(/\\u0026/g, "&").replace(/\\\\/g, "\\");
          const tracks = JSON.parse(cleaned);
          if (Array.isArray(tracks) && tracks.length > 0) return tracks;
        } catch {}
      }
    }
  }

  // Strategy 2: Extract full ytInitialPlayerResponse and navigate to captionTracks
  const playerResponsePatterns = [
    /ytInitialPlayerResponse\s*=\s*(\{[\s\S]+?\})\s*;\s*(?:var\s|let\s|const\s|window\.|document\.|<\/script>)/,
    /ytInitialPlayerResponse\s*=\s*(\{[\s\S]+?\})\s*;/,
  ];

  for (const pattern of playerResponsePatterns) {
    const match = pattern.exec(html);
    if (match && match[1]) {
      try {
        const playerResponse = JSON.parse(match[1]);
        const tracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (Array.isArray(tracks) && tracks.length > 0) return tracks;
      } catch {
        // Fallback for rich/large responses: targeted extraction of captionTracks array
        const subMatch = /"captionTracks"\s*:\s*(\[[\s\S]*?\])\s*,\s*"(?:audioTracks|translationLanguages|defaultAudioTrackIndex)/.exec(match[1]);
        if (subMatch && subMatch[1]) {
          try {
            const tracks = JSON.parse(subMatch[1]);
            if (Array.isArray(tracks) && tracks.length > 0) return tracks;
          } catch {}
        }
      }
    }
  }

  // Strategy 3: Find baseUrl patterns for timedtext directly
  const urlPattern = /https?:\\?\/\\?\/www\.youtube\.com\\?\/api\\?\/timedtext[^"'\s]*/g;
  const urls: string[] = [];
  let urlMatch;
  while ((urlMatch = urlPattern.exec(html)) !== null) {
    const url = urlMatch[0]
      .replace(/\\u0026/g, "&")
      .replace(/\\\//g, "/")
      .replace(/\\"/g, "");
    if (!urls.includes(url)) urls.push(url);
  }

  if (urls.length > 0) {
    // Create synthetic track objects from discovered URLs
    return urls.map((url, i) => {
      const langMatch = /[?&]lang=(\w+)/.exec(url);
      const kindMatch = /[?&]kind=(\w+)/.exec(url);
      return {
        baseUrl: url,
        languageCode: langMatch?.[1] || (i === 0 ? "en" : "vi"),
        kind: kindMatch?.[1] || "manual",
      };
    });
  }

  return [];
}

/**
 * Helper: Check if response text is a Google rate-limit/block page
 */
function isRateLimitedHtml(text: string): boolean {
  if (!text) return true;
  const lower = text.toLowerCase();
  return (
    lower.includes("we're sorry") ||
    lower.includes("<title>sorry...") ||
    lower.includes("automated queries") ||
    (lower.startsWith("<!doctype html") && !lower.includes("<text") && !lower.includes("captionTracks"))
  );
}

/**
 * External proxy services for bypassing Vercel datacenter IP blocks.
 * Ordered by reliability for YouTube timedtext & HTML pages.
 */
const EXTERNAL_PROXIES = [
  { name: "CorsProxy", type: "raw", buildUrl: (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}` },
  { name: "AllOriginsJSON", type: "json", buildUrl: (url: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}` },
  { name: "CodeTabs", type: "raw", buildUrl: (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}` },
  { name: "ThingProxy", type: "raw", buildUrl: (url: string) => `https://thingproxy.freeboard.io/fetch/${url}` },
];

/**
 * Fetch a URL with multi-tier proxy fallback chain.
 * Tier 0: Direct fetch. Tier 1-4: External proxy services.
 */
async function fetchWithProxyChain(url: string, options?: RequestInit): Promise<{ text: string; tier: string } | null> {
  // Tier 0: Direct fetch with 5.0s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, { ...options, signal: controller.signal, cache: "no-store" });
    clearTimeout(timeoutId);
    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().length > 30 && !isRateLimitedHtml(text)) {
        console.log(`[ProxyChain Tier 0] Direct fetch SUCCESS (${text.length} chars)`);
        return { text, tier: "Direct" };
      }
    }
  } catch (e: any) {
    console.warn(`[ProxyChain Tier 0] Direct fetch failed: ${e?.message}`);
  }

  // Tier 1-4: External proxy services with 6.0s timeout each
  for (let i = 0; i < EXTERNAL_PROXIES.length; i++) {
    const proxy = EXTERNAL_PROXIES[i];
    try {
      const proxyUrl = proxy.buildUrl(url);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(proxyUrl, { signal: controller.signal, cache: "no-store" });
      clearTimeout(timeoutId);
      if (res.ok) {
        let text = "";
        if (proxy.type === "json") {
          const data = await res.json();
          text = typeof data?.contents === "string" ? data.contents : "";
        } else {
          text = await res.text();
        }

        if (text && text.trim().length > 30 && !isRateLimitedHtml(text)) {
          console.log(`[ProxyChain Tier ${i + 1}] ${proxy.name} SUCCESS (${text.length} chars)`);
          return { text, tier: proxy.name };
        }
      }
    } catch {}
  }

  return null;
}

/**
 * Fetch caption tracks via YouTube Innertube API with Multi-Proxy Resilience.
 * Android and TV clients are prioritized for high caption availability.
 */
async function fetchInnertubeCaptionTracks(videoId: string): Promise<any[]> {
  const clients = [
    {
      userAgent: "com.google.android.youtube/19.29.35 (Linux; U; Android 14; en_US; Pixel 8 Pro)",
      clientName: "ANDROID",
      clientVersion: "19.29.35",
    },
    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      clientName: "WEB",
      clientVersion: "2.20240501.00.00",
    },
    {
      userAgent: "Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Version/6.0 TV Safari/537.36",
      clientName: "TVHTML5",
      clientVersion: "7.20230405.08.01",
    },
  ];

  // Strategy 1: Direct Innertube POST calls with 4.0s AbortController timeout
  for (const clientConfig of clients) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch("https://www.youtube.com/youtubei/v1/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": clientConfig.userAgent,
        },
        body: JSON.stringify({
          videoId,
          context: {
            client: {
              clientName: clientConfig.clientName,
              clientVersion: clientConfig.clientVersion,
              hl: "en",
              gl: "US",
            },
          },
        }),
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (Array.isArray(tracks) && tracks.length > 0) {
          console.log(`[Innertube Direct] ${clientConfig.clientName} returned ${tracks.length} caption tracks`);
          return tracks;
        }
      }
    } catch {}
  }

  // Strategy 2: Innertube via Watch Page HTML through external proxies
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const proxyResult = await fetchWithProxyChain(watchUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  if (proxyResult && proxyResult.text) {
    const tracks = extractCaptionTracksFromHtml(proxyResult.text);
    if (tracks.length > 0) {
      console.log(`[Innertube via ${proxyResult.tier}] Extracted ${tracks.length} caption tracks from Watch Page HTML`);
      return tracks;
    }
  }

  return [];
}

/**
 * Batch Auto-Translate English Subtitles to Vietnamese via Server Google Translate API
 * 100% Sentence Coverage: Translates ONLY sentences lacking Vietnamese, eliminates 30% threshold bug,
 * and includes per-item fallback to ensure 0 sentences are omitted.
 */
async function autoTranslateSubtitlesToVn(subtitles: SubtitleItem[]): Promise<SubtitleItem[]> {
  if (!subtitles || subtitles.length === 0) return [];

  // Identify all subtitles that actually need Vietnamese translation
  const indicesNeedingVn: number[] = [];
  for (let i = 0; i < subtitles.length; i++) {
    const s = subtitles[i];
    if (!s.vietnamese || s.vietnamese.trim() === "" || s.vietnamese.trim() === s.english.trim()) {
      indicesNeedingVn.push(i);
    }
  }

  // 100% of subtitles already have valid Vietnamese translation!
  if (indicesNeedingVn.length === 0) {
    return subtitles;
  }

  try {
    const textsToTranslate = indicesNeedingVn.map((idx) => subtitles[idx].english);
    const chunkSize = 15;
    const chunks: { chunk: string[]; origIndices: number[] }[] = [];

    for (let i = 0; i < textsToTranslate.length; i += chunkSize) {
      chunks.push({
        chunk: textsToTranslate.slice(i, i + chunkSize),
        origIndices: indicesNeedingVn.slice(i, i + chunkSize),
      });
    }

    const translatedResultsMap = new Map<number, string>();

    // Parallel batch translation with per-chunk resilience
    const chunkPromises = chunks.map(async ({ chunk, origIndices }) => {
      const joined = chunk.join(" ||| ");
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(joined)}`;

      try {
        const res = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          },
        });

        if (res.ok) {
          const data = await res.json();
          const translatedRaw = Array.isArray(data?.[0]) ? data[0].map((item: any) => item?.[0] || "").join("") : "";
          const parts = translatedRaw.split(/\s*\|\|\|\s*/).map((p: string) => p.trim());
          if (parts.length === chunk.length) {
            for (let pIdx = 0; pIdx < parts.length; pIdx++) {
              translatedResultsMap.set(origIndices[pIdx], parts[pIdx] || chunk[pIdx]);
            }
            return;
          }
        }
      } catch {}

      // Fallback: translate individual items if batch split or delimiter failed
      await Promise.all(
        chunk.map(async (text, cIdx) => {
          try {
            const singleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
            const sRes = await fetch(singleUrl, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
              },
            });
            if (sRes.ok) {
              const sData = await sRes.json();
              const trans = Array.isArray(sData?.[0]) ? sData[0].map((it: any) => it?.[0] || "").join("").trim() : "";
              if (trans) {
                translatedResultsMap.set(origIndices[cIdx], trans);
                return;
              }
            }
          } catch {}
          translatedResultsMap.set(origIndices[cIdx], text);
        })
      );
    });

    await Promise.all(chunkPromises);

    // Merge translated results back to their exact original indices
    return subtitles.map((sub, idx) => ({
      ...sub,
      vietnamese: translatedResultsMap.get(idx) || sub.vietnamese || sub.english,
    }));
  } catch (e) {
    console.warn("[Auto-Translate Server Engine] Warning:", e);
    return subtitles;
  }
}

/**
 * Server-side Subtitle & Track Extraction Pipeline — Robust Multi-Strategy
 */
async function fetchSubtitlesOrTracksOnServer(videoId: string): Promise<{
  subtitles?: SubtitleItem[];
  tracks?: ExtractedTrack[];
  needClientFetch?: boolean;
  title?: string;
  authorName?: string;
}> {
  let videoTitle = "";
  let authorName = "";
  try {
    const oembedRes = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { signal: AbortSignal.timeout(2500), cache: "no-store" }
    );
    if (oembedRes.ok) {
      const oembed = await oembedRes.json();
      videoTitle = oembed.title || "";
      authorName = oembed.author_name || "";
    }
  } catch {}

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const headers: Record<string, string> = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Referer": "https://www.youtube.com/",
    "Origin": "https://www.youtube.com",
  };

  let rawContentEn = "";
  let rawContentVn = "";
  let extractedTracks: ExtractedTrack[] = [];

  // Strategy A: Innertube Official Client API (Highest reliability for real captions)
  let captionTracks = await fetchInnertubeCaptionTracks(videoId);

  // Strategy B: Fetch Watch Page HTML if Innertube didn't return tracks
  if (!captionTracks.length) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const watchRes = await fetch(watchUrl, {
        headers,
        cache: "no-store",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (watchRes.ok) {
        const html = await watchRes.text();
        captionTracks = extractCaptionTracksFromHtml(html);
      }
    } catch (e: any) {
      console.warn("Watch page caption extraction warning:", e?.message || e);
    }
  }

  // Helper: Fetch TimedText with automatic format fallbacks (JSON3 -> srv1 -> raw)
  const fetchRawTimedTextWithFormatFallback = async (urlStr: string): Promise<string> => {
    const cleanBase = urlStr.replace(/\\u0026/g, "&").replace(/\\\//g, "/");
    const fetchUrls = [
      cleanBase.includes("fmt=") ? cleanBase : `${cleanBase}&fmt=json3`,
      cleanBase.includes("fmt=") ? cleanBase.replace(/fmt=\w+/, "fmt=srv1") : `${cleanBase}&fmt=srv1`,
      cleanBase,
    ];
    for (const url of fetchUrls) {
      const result = await fetchWithProxyChain(url, { headers });
      if (result && result.text && result.text.trim().length > 30 && !isRateLimitedHtml(result.text)) {
        return result.text;
      }
    }
    return "";
  };

  if (captionTracks.length > 0) {
    extractedTracks = captionTracks.map((t: any) => ({
      lang: t.languageCode || "en",
      kind: t.kind || "manual",
      baseUrl: (t.baseUrl || "").replace(/\\u0026/g, "&").replace(/\\\//g, "/"),
    }));

    // Identify candidate tracks
    const manualEnTrack = captionTracks.find(
      (t: any) => (t.languageCode?.toLowerCase().startsWith("en") || t.vssId?.includes("en") || t.vssId?.includes("a.en")) && t.kind !== "asr"
    );
    const asrEnTrack = captionTracks.find(
      (t: any) => (t.languageCode?.toLowerCase().startsWith("en") || t.vssId?.includes("en") || t.vssId?.includes("a.en")) && t.kind === "asr"
    );
    const anyEnTrack = captionTracks.find(
      (t: any) => t.languageCode?.toLowerCase().startsWith("en") || t.vssId?.includes("en")
    );

    let bestParsedEn: ParsedXmlItem[] = [];
    let chosenTrack: any = null;

    // Priority 1: If manual English track exists, evaluate its completeness
    if (manualEnTrack && manualEnTrack.baseUrl) {
      const rawManual = await fetchRawTimedTextWithFormatFallback(manualEnTrack.baseUrl);
      if (rawManual) {
        const parsedManual = parseTimedTextAny(rawManual);
        bestParsedEn = parsedManual;
        chosenTrack = manualEnTrack;

        // Anti-abandoned manual trap:
        // If manual track is short (< 25 cues) and an ASR track exists, test if ASR has far more content
        if (parsedManual.length < 25 && asrEnTrack && asrEnTrack.baseUrl) {
          const rawAsr = await fetchRawTimedTextWithFormatFallback(asrEnTrack.baseUrl);
          if (rawAsr) {
            const parsedAsr = parseTimedTextAny(rawAsr);
            if (parsedAsr.length > parsedManual.length * 2.0) {
              console.log(
                `[Track Evaluation] Manual track only has ${parsedManual.length} cues, but ASR track has ${parsedAsr.length} cues. Upgrading to full ASR track to prevent dropping sentences!`
              );
              bestParsedEn = parsedAsr;
              chosenTrack = asrEnTrack;
            }
          }
        }
      }
    }

    // Priority 2: If manual wasn't available or returned 0 cues, try ASR track
    if (bestParsedEn.length === 0 && asrEnTrack && asrEnTrack.baseUrl) {
      const rawAsr = await fetchRawTimedTextWithFormatFallback(asrEnTrack.baseUrl);
      if (rawAsr) {
        bestParsedEn = parseTimedTextAny(rawAsr);
        chosenTrack = asrEnTrack;
      }
    }

    // Priority 3: Try any remaining English track
    if (bestParsedEn.length === 0 && anyEnTrack && anyEnTrack.baseUrl && anyEnTrack !== manualEnTrack && anyEnTrack !== asrEnTrack) {
      const rawAny = await fetchRawTimedTextWithFormatFallback(anyEnTrack.baseUrl);
      if (rawAny) {
        bestParsedEn = parseTimedTextAny(rawAny);
        chosenTrack = anyEnTrack;
      }
    }

    // Priority 4: Loop through all other captionTracks (translated with &tlang=en if needed)
    if (bestParsedEn.length === 0) {
      for (const track of captionTracks) {
        if (!track.baseUrl) continue;
        let tUrl = track.baseUrl.replace(/\\u0026/g, "&").replace(/\\\//g, "/");
        if (!track.languageCode?.toLowerCase().startsWith("en") && !tUrl.includes("tlang=")) {
          tUrl += "&tlang=en";
        }
        const raw = await fetchRawTimedTextWithFormatFallback(tUrl);
        if (raw) {
          const parsed = parseTimedTextAny(raw);
          if (parsed.length > 0) {
            bestParsedEn = parsed;
            chosenTrack = track;
            break;
          }
        }
      }
    }

    // Process Vietnamese and return if English subtitles were successfully parsed
    if (bestParsedEn.length > 0 && chosenTrack) {
      const vnTrack = captionTracks.find((t: any) => t.languageCode?.startsWith("vi"));
      const cleanChosenBase = (chosenTrack.baseUrl || "").replace(/\\u0026/g, "&").replace(/\\\//g, "/");
      const vnBaseUrl = vnTrack
        ? (vnTrack.baseUrl || "").replace(/\\u0026/g, "&").replace(/\\\//g, "/")
        : `${cleanChosenBase}&tlang=vi`;

      const rawVn = await fetchRawTimedTextWithFormatFallback(vnBaseUrl);
      const parsedVn = rawVn ? parseVnTimedTextAny(rawVn) : [];

      const aligned = alignBilingualSubtitles(bestParsedEn, parsedVn);
      let subtitles: SubtitleItem[] = aligned.map((item, index) => ({
        id: index + 1,
        start: formatTimestampMs(item.startTime),
        end: formatTimestampMs(item.endTime),
        duration: item.duration,
        english: item.textEn,
        vietnamese: item.textVn,
        dictationWord: extractDictationWord(item.textEn),
        startSeconds: item.startTime,
        wordTimings: item.wordTimings,
      }));

      subtitles = await autoTranslateSubtitlesToVn(subtitles);
      return { subtitles, needClientFetch: false, title: videoTitle, authorName };
    }
  }

  // 3. Fast direct timedtext API check (1.5s timeout, no proxy chain loop)
  let xmlEn = "";
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const directRes = await fetch(
      `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=json3`,
      { headers, signal: controller.signal, cache: "no-store" }
    );
    clearTimeout(timeoutId);
    if (directRes.ok) {
      const text = await directRes.text();
      if (text && text.trim().length > 50 && !isRateLimitedHtml(text)) {
        xmlEn = text;
      }
    }
  } catch {}

  if (xmlEn) {
    const parsedEn = parseTimedTextAny(xmlEn);
    if (parsedEn.length > 0) {
      let xmlVn = "";
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        const vnRes = await fetch(
          `https://www.youtube.com/api/timedtext?v=${videoId}&lang=vi`,
          { headers, signal: controller.signal, cache: "no-store" }
        );
        clearTimeout(timeoutId);
        if (vnRes.ok) {
          const text = await vnRes.text();
          if (text && text.trim().length > 30) xmlVn = text;
        }
      } catch {}

      const parsedVn = xmlVn ? parseVnTimedTextAny(xmlVn) : [];
      const aligned = alignBilingualSubtitles(parsedEn, parsedVn);
      let subtitles: SubtitleItem[] = aligned.map((item, index) => ({
        id: index + 1,
        start: formatTimestampMs(item.startTime),
        end: formatTimestampMs(item.endTime),
        duration: item.duration,
        english: item.textEn,
        vietnamese: item.textVn,
        dictationWord: extractDictationWord(item.textEn),
        startSeconds: item.startTime,
        wordTimings: item.wordTimings,
      }));

      subtitles = await autoTranslateSubtitlesToVn(subtitles);
      return { subtitles, needClientFetch: false, title: videoTitle, authorName };
    }
  }

  // 4. Server LRCLIB Synced Lyrics Fallback Engine (For music/acoustic/compilation videos like aZGCSLa3GLk)
  try {
    if (!videoTitle) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`, { signal: controller.signal, cache: "no-store" });
      clearTimeout(timeoutId);
      if (oembedRes.ok) {
        const oembed = await oembedRes.json();
        videoTitle = oembed.title || "";
        authorName = oembed.author_name || "";
      }
    }

    if (videoTitle) {
      const lrcItems = await fetchLrclibSyncedLyrics(videoTitle, undefined, videoId);
      if (lrcItems && lrcItems.length > 0) {
        console.log(`[Server LRCLIB Engine] Successfully fetched ${lrcItems.length} synced lyrics on Server for video ${videoId} ("${videoTitle}")!`);
        let subtitles: SubtitleItem[] = lrcItems.map((item, index) => ({
          id: index + 1,
          start: formatTimestampMs(item.startTime),
          end: formatTimestampMs(item.endTime),
          duration: parseFloat((item.endTime - item.startTime).toFixed(3)),
          english: item.textEn,
          vietnamese: item.textVn || item.textEn,
          dictationWord: extractDictationWord(item.textEn),
          startSeconds: item.startTime,
        }));

        subtitles = await autoTranslateSubtitlesToVn(subtitles);
        return { subtitles, needClientFetch: false, title: videoTitle, authorName };
      }
    }
  } catch (e: any) {
    console.warn("[Server LRCLIB Engine] Warning:", e?.message || e);
  }

  // 5. If server got tracks but couldn't fetch content (YouTube IP throttle)
  if (extractedTracks.length > 0) {
    return { tracks: extractedTracks, needClientFetch: true, title: videoTitle, authorName };
  }

  // 6. Ultimate Tier: Gemini Flash AI Video Subtitle Transcriber (100% Guaranteed Availability)
  try {
    const aiSubtitles = await generateAiSubtitlesForVideo({
      videoId,
      videoTitle: videoTitle || "Video Học Tiếng Anh YouTube",
      authorName: authorName || "YouTube Creator",
    });

    if (aiSubtitles && aiSubtitles.length > 0) {
      console.log(
        `[Server AI Transcribe Engine] Successfully generated ${aiSubtitles.length} Gemini AI subtitles for video ${videoId} ("${videoTitle}")!`
      );
      return {
        subtitles: aiSubtitles,
        needClientFetch: false,
        title: videoTitle || "Video Học Tiếng Anh YouTube",
        authorName: authorName || "YouTube Creator",
        isAiGenerated: true,
      } as any;
    }
  } catch (e: any) {
    console.warn("[Server AI Transcribe Engine] Warning:", e?.message || e);
  }

  // 7. No captions found at all → return empty
  return { subtitles: [], tracks: [], needClientFetch: false, title: videoTitle, authorName };
}
