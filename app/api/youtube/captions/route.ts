import { NextRequest, NextResponse } from "next/server";
import {
  parseTimedTextXml,
  parseVnTimedTextXml,
  parseTimedTextAny,
  parseVnTimedTextAny,
  alignBilingualSubtitles,
  extractDictationWord,
  formatTimestampMs,
} from "@/lib/services/youtubeSubtitleParser";
import { fetchLrclibSyncedLyrics } from "@/lib/services/lrclibLyricsService";

export interface SubtitleItem {
  id: number;
  start: string;
  end: string;
  duration: number;
  english: string;
  vietnamese: string;
  dictationWord: string;
  startSeconds: number;
}

export interface ExtractedTrack {
  lang: string;
  kind?: string;
  baseUrl: string;
}

// In-Memory Subtitle Cache by videoId (2-hour TTL) to prevent repeated 20s API overhead
const captionServerCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

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

  // Check Cache HIT
  const cached = captionServerCache.get(videoId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    console.log(`[Captions API Cache HIT] Returning cached subtitles for videoId "${videoId}" in <10ms!`);
    return NextResponse.json(cached.data);
  }

  try {
    const result = await fetchSubtitlesOrTracksOnServer(videoId);
    if (!result || (!result.subtitles?.length && !result.tracks?.length)) {
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

    const payload = {
      success: true,
      videoId,
      subtitles: result.subtitles || [],
      tracks: result.tracks || [],
      needClientFetch: result.needClientFetch || false,
      totalCount: result.subtitles?.length || 0,
      hasCaptions: true,
    };

    // Store in Cache
    if (result.subtitles && result.subtitles.length > 0) {
      captionServerCache.set(videoId, { data: payload, timestamp: Date.now() });
    }

    return NextResponse.json(payload);

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
      console.log(`[Captions API Cache HIT] Returning cached subtitles for videoId "${videoId}" in <10ms!`);
      return NextResponse.json(cached.data);
    }

    const result = await fetchSubtitlesOrTracksOnServer(videoId);
    if (!result || (!result.subtitles?.length && !result.tracks?.length)) {
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

    const payload = {
      success: true,
      videoId,
      subtitles: result.subtitles || [],
      tracks: result.tracks || [],
      needClientFetch: result.needClientFetch || false,
      totalCount: result.subtitles?.length || 0,
      hasCaptions: true,
    };

    if (result.subtitles && result.subtitles.length > 0) {
      captionServerCache.set(videoId, { data: payload, timestamp: Date.now() });
    }

    return NextResponse.json(payload);

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
      } catch (e) {
        // Try cleaning the string and re-parsing
        try {
          const cleaned = match[1].replace(/\\u0026/g, "&").replace(/\\\\/g, "\\");
          const tracks = JSON.parse(cleaned);
          if (Array.isArray(tracks) && tracks.length > 0) return tracks;
        } catch (e2) {}
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
        // Truncate at reasonable length to avoid parsing issues
        let jsonStr = match[1];
        if (jsonStr.length > 500000) jsonStr = jsonStr.substring(0, 500000);
        const playerResponse = JSON.parse(jsonStr);
        const tracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (Array.isArray(tracks) && tracks.length > 0) return tracks;
      } catch (e) {}
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
 * Each proxy has a different IP range so YouTube won't block all of them.
 */
const EXTERNAL_PROXIES = [
  { name: "AllOrigins", buildUrl: (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}` },
  { name: "CodeTabs", buildUrl: (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}` },
  { name: "CorsProxy", buildUrl: (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}` },
];

/**
 * Fetch a URL with multi-tier proxy fallback chain.
 * Tier 0: Direct fetch. Tier 1-3: External proxy services.
 */
async function fetchWithProxyChain(url: string, options?: RequestInit): Promise<{ text: string; tier: string } | null> {
  // Tier 0: Direct fetch
  try {
    const res = await fetch(url, { ...options, cache: "no-store" });
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

  // Tier 1-3: External proxy services
  for (let i = 0; i < EXTERNAL_PROXIES.length; i++) {
    const proxy = EXTERNAL_PROXIES[i];
    try {
      const proxyUrl = proxy.buildUrl(url);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(proxyUrl, { signal: controller.signal, cache: "no-store" });
      clearTimeout(timeoutId);
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim().length > 30 && !isRateLimitedHtml(text)) {
          console.log(`[ProxyChain Tier ${i + 1}] ${proxy.name} SUCCESS (${text.length} chars)`);
          return { text, tier: proxy.name };
        }
        console.warn(`[ProxyChain Tier ${i + 1}] ${proxy.name} returned invalid/rate-limited content`);
      }
    } catch (e: any) {
      console.warn(`[ProxyChain Tier ${i + 1}] ${proxy.name} failed: ${e?.message}`);
    }
  }

  return null;
}

/**
 * Fetch caption tracks via YouTube Innertube API with Multi-Proxy Resilience.
 * When direct Innertube calls fail (YouTube blocks Vercel datacenter IP),
 * automatically retries through external proxy services with different IPs.
 */
async function fetchInnertubeCaptionTracks(videoId: string): Promise<any[]> {
  const clients = [
    {
      userAgent: "com.google.android.youtube/19.02.39 (Linux; U; Android 14; US) gzip",
      clientName: "ANDROID",
      clientVersion: "19.02.39",
    },
    {
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1",
      clientName: "MWEB",
      clientVersion: "2.20240501.00.00",
    },
    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      clientName: "WEB",
      clientVersion: "2.20240501.00.00",
    },
  ];

  // Strategy 1: Direct Innertube POST calls
  for (const clientConfig of clients) {
    try {
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
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (Array.isArray(tracks) && tracks.length > 0) {
          console.log(`[Innertube Direct] ${clientConfig.clientName} returned ${tracks.length} caption tracks`);
          return tracks;
        }
      }
    } catch (e) {
      console.warn(`[Innertube Direct] ${clientConfig.clientName} failed:`, e);
    }
  }

  // Strategy 2: Innertube via Watch Page HTML through external proxies
  console.log(`[Innertube] All direct calls failed. Trying Watch Page via external proxies...`);
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

  console.warn(`[Innertube] ALL strategies failed for videoId ${videoId}`);
  return [];
}

/**
 * Batch Auto-Translate English Subtitles to Vietnamese via Server Google Translate API
 * Uses 100% Parallel Promise.all Execution (14x Speedup)
 */
async function autoTranslateSubtitlesToVn(subtitles: SubtitleItem[]): Promise<SubtitleItem[]> {
  if (!subtitles || subtitles.length === 0) return [];
  const hasVnCount = subtitles.filter((s) => s.vietnamese && s.vietnamese.trim() !== s.english.trim()).length;
  if (subtitles.length > 0 && hasVnCount / subtitles.length > 0.3) {
    return subtitles;
  }

  try {
    const englishTexts = subtitles.map((s) => s.english);
    const chunkSize = 15;
    const chunks: string[][] = [];

    for (let i = 0; i < englishTexts.length; i += chunkSize) {
      chunks.push(englishTexts.slice(i, i + chunkSize));
    }

    // Execute all translation chunks IN PARALLEL for 14x speedup!
    const translatedChunkPromises = chunks.map(async (chunk) => {
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
          const parts = translatedRaw.split("|||").map((p: string) => p.trim());
          if (parts.length === chunk.length) {
            return parts;
          }
        }
      } catch (e) {}
      return chunk;
    });

    const chunkResults = await Promise.all(translatedChunkPromises);
    const translatedLines = chunkResults.flat();

    return subtitles.map((sub, idx) => ({
      ...sub,
      vietnamese: translatedLines[idx] || sub.english,
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
}> {
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

  if (captionTracks.length > 0) {
    extractedTracks = captionTracks.map((t: any) => ({
      lang: t.languageCode || "en",
      kind: t.kind || "manual",
      baseUrl: (t.baseUrl || "").replace(/\\u0026/g, "&").replace(/\\\//g, "/"),
    }));

    // Find English track (prefer manual over ASR, matching all en variants: en, en-US, en-GB, en-CA, en-AU)
    let targetTrack = captionTracks.find(
      (t: any) => (t.languageCode?.toLowerCase().startsWith("en") || t.vssId?.includes("en") || t.vssId?.includes("a.en")) && t.kind !== "asr"
    );
    if (!targetTrack) {
      targetTrack = captionTracks.find(
        (t: any) => t.languageCode?.toLowerCase().startsWith("en") || t.vssId?.includes("en") || t.vssId?.includes("a.en")
      );
    }
    if (!targetTrack) targetTrack = captionTracks[0];

    if (targetTrack && targetTrack.baseUrl) {
      let baseUrl = targetTrack.baseUrl.replace(/\\u0026/g, "&").replace(/\\\//g, "/");
      const isEnglishTrack = targetTrack.languageCode?.toLowerCase().startsWith("en") || targetTrack.vssId?.includes("en");
      if (!isEnglishTrack && !baseUrl.includes("tlang=")) {
        baseUrl += "&tlang=en";
      }


      // Try multiple formats: json3 first (most reliable), then srv1 (XML)
      const fetchUrls = [
        baseUrl.includes("fmt=") ? baseUrl : `${baseUrl}&fmt=json3`,
        baseUrl.includes("fmt=") ? baseUrl.replace(/fmt=\w+/, "fmt=srv1") : `${baseUrl}&fmt=srv1`,
        baseUrl,
      ];

      for (const url of fetchUrls) {
        const result = await fetchWithProxyChain(url, { headers });
        if (result && result.text.trim().length > 50) {
          rawContentEn = result.text;
          console.log(`[Server TimedText EN] Fetched via ${result.tier} (${rawContentEn.length} chars)`);
          break;
        }
      }

      // Fetch Vietnamese track
      const vnTrack = captionTracks.find((t: any) => t.languageCode?.startsWith("vi"));
      if (vnTrack || targetTrack.baseUrl) {
        const vnBaseUrl = vnTrack
          ? (vnTrack.baseUrl || "").replace(/\\u0026/g, "&").replace(/\\\//g, "/")
          : `${baseUrl}&tlang=vi`;
        const vnFetchUrls = [
          vnBaseUrl.includes("fmt=") ? vnBaseUrl : `${vnBaseUrl}&fmt=json3`,
          vnBaseUrl.includes("fmt=") ? vnBaseUrl.replace(/fmt=\w+/, "fmt=srv1") : `${vnBaseUrl}&fmt=srv1`,
        ];

        for (const url of vnFetchUrls) {
          const vnResult = await fetchWithProxyChain(url, { headers });
          if (vnResult && vnResult.text.trim().length > 30) {
            rawContentVn = vnResult.text;
            console.log(`[Server TimedText VN] Fetched via ${vnResult.tier} (${rawContentVn.length} chars)`);
            break;
          }
        }
      }
    }
  }

  // 2. Server parse success → Auto-Translate & Return Subtitles
  if (rawContentEn) {
    const parsedEn = parseTimedTextAny(rawContentEn);
    const parsedVn = rawContentVn ? parseVnTimedTextAny(rawContentVn) : [];

    if (parsedEn.length > 0) {
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
      }));

      subtitles = await autoTranslateSubtitlesToVn(subtitles);
      return { subtitles, needClientFetch: false };
    }
  }

  // 3. Direct timedtext API candidates (no watch page needed)
  let xmlEn = "";
  const candidateUrlsEn = [
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=json3`,
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en`,
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&kind=asr`,
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&kind=asr&fmt=json3`,
  ];

  for (const url of candidateUrlsEn) {
    const result = await fetchWithProxyChain(url, { headers });
    if (result && result.text.trim().length > 50) {
      xmlEn = result.text;
      console.log(`[Server Direct TimedText EN] Fetched via ${result.tier} (${xmlEn.length} chars)`);
      break;
    }
  }

  if (xmlEn) {
    const parsedEn = parseTimedTextAny(xmlEn);
    if (parsedEn.length > 0) {
      let xmlVn = "";
      const vnDirectResult = await fetchWithProxyChain(
        `https://www.youtube.com/api/timedtext?v=${videoId}&lang=vi`,
        { headers }
      );
      if (vnDirectResult && vnDirectResult.text.trim().length > 30) {
        xmlVn = vnDirectResult.text;
        console.log(`[Server Direct TimedText VN] Fetched via ${vnDirectResult.tier}`);
      }

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
      }));

      subtitles = await autoTranslateSubtitlesToVn(subtitles);
      return { subtitles, needClientFetch: false };
    }
  }

  // 4. Server LRCLIB Synced Lyrics Fallback Engine (For music/acoustic/compilation videos like aZGCSLa3GLk)
  try {
    let videoTitle = "";
    const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`, { cache: "no-store" });
    if (oembedRes.ok) {
      const oembed = await oembedRes.json();
      videoTitle = oembed.title || "";
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
        return { subtitles, needClientFetch: false };
      }
    }
  } catch (e: any) {
    console.warn("[Server LRCLIB Engine] Warning:", e?.message || e);
  }

  // 5. If server got tracks but couldn't fetch content (YouTube IP throttle)
  if (extractedTracks.length > 0) {
    return { tracks: extractedTracks, needClientFetch: true };
  }

  // 6. No captions found at all → return empty
  return { subtitles: [], tracks: [], needClientFetch: false };
}
