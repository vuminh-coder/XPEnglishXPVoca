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

    return NextResponse.json({
      success: true,
      videoId,
      subtitles: result.subtitles || [],
      tracks: result.tracks || [],
      needClientFetch: result.needClientFetch || false,
      totalCount: result.subtitles?.length || 0,
      hasCaptions: true,
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

    return NextResponse.json({
      success: true,
      videoId,
      subtitles: result.subtitles || [],
      tracks: result.tracks || [],
      needClientFetch: result.needClientFetch || false,
      totalCount: result.subtitles?.length || 0,
      hasCaptions: true,
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
 * Fetch caption tracks via YouTube Innertube API (Official Mobile Client Endpoint)
 * Extremely reliable and bypasses watch page HTML parsing changes.
 */
async function fetchInnertubeCaptionTracks(videoId: string): Promise<any[]> {
  try {
    const res = await fetch("https://www.youtube.com/youtubei/v1/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "com.google.android.youtube/19.02.39 (Linux; U; Android 14; US) gzip",
      },
      body: JSON.stringify({
        videoId,
        context: {
          client: {
            clientName: "ANDROID",
            clientVersion: "19.02.39",
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
        return tracks;
      }
    }
  } catch (e) {
    console.warn("Innertube API caption extraction notice:", e);
  }
  return [];
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

    // Find English track (prefer manual over ASR)
    let targetTrack = captionTracks.find(
      (t: any) => t.languageCode?.startsWith("en") && t.kind !== "asr"
    );
    if (!targetTrack) {
      targetTrack = captionTracks.find((t: any) => t.languageCode?.startsWith("en"));
    }
    if (!targetTrack) targetTrack = captionTracks[0];

    if (targetTrack && targetTrack.baseUrl) {
      const baseUrl = targetTrack.baseUrl.replace(/\\u0026/g, "&").replace(/\\\//g, "/");

      // Try multiple formats: json3 first (most reliable), then srv1 (XML)
      const fetchUrls = [
        baseUrl.includes("fmt=") ? baseUrl : `${baseUrl}&fmt=json3`,
        baseUrl.includes("fmt=") ? baseUrl.replace(/fmt=\w+/, "fmt=srv1") : `${baseUrl}&fmt=srv1`,
        baseUrl,
      ];

      for (const url of fetchUrls) {
        try {
          const trackRes = await fetch(url, { headers, cache: "no-store" });
          if (trackRes.ok) {
            const text = await trackRes.text();
            if (text && text.trim().length > 50) {
              rawContentEn = text;
              break;
            }
          }
        } catch (e) {}
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
          try {
            const vnTrackRes = await fetch(url, { headers, cache: "no-store" });
            if (vnTrackRes.ok) {
              const vnText = await vnTrackRes.text();
              if (vnText && vnText.trim().length > 30) {
                rawContentVn = vnText;
                break;
              }
            }
          } catch (e) {}
        }
      }
    }
  }

  // 2. Server parse success → return subtitles
  if (rawContentEn) {
    const parsedEn = parseTimedTextAny(rawContentEn);
    const parsedVn = rawContentVn ? parseVnTimedTextAny(rawContentVn) : [];

    if (parsedEn.length > 0) {
      const aligned = alignBilingualSubtitles(parsedEn, parsedVn);
      const subtitles = aligned.map((item, index) => ({
        id: index + 1,
        start: formatTimestampMs(item.startTime),
        end: formatTimestampMs(item.endTime),
        duration: item.duration,
        english: item.textEn,
        vietnamese: item.textVn,
        dictationWord: extractDictationWord(item.textEn),
        startSeconds: item.startTime,
      }));
      return { subtitles, needClientFetch: false };
    }
  }

  // 3. If server got tracks but couldn't fetch content (YouTube IP throttle)
  //    → return tracks for client browser to fetch (client has cookies/different IP)
  if (extractedTracks.length > 0) {
    return { tracks: extractedTracks, needClientFetch: true };
  }

  // 4. Direct timedtext API candidates (no watch page needed)
  let xmlEn = "";
  const candidateUrlsEn = [
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=json3`,
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en`,
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&kind=asr`,
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&kind=asr&fmt=json3`,
  ];

  for (const url of candidateUrlsEn) {
    try {
      const res = await fetch(url, { headers, cache: "no-store" });
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim().length > 50) {
          xmlEn = text;
          break;
        }
      }
    } catch (e) {}
  }

  if (xmlEn) {
    const parsedEn = parseTimedTextAny(xmlEn);
    if (parsedEn.length > 0) {
      // Also try fetching Vietnamese
      let xmlVn = "";
      try {
        const vnRes = await fetch(
          `https://www.youtube.com/api/timedtext?v=${videoId}&lang=vi`,
          { headers, cache: "no-store" }
        );
        if (vnRes.ok) {
          const vnText = await vnRes.text();
          if (vnText && vnText.trim().length > 30) xmlVn = vnText;
        }
      } catch (e) {}

      const parsedVn = xmlVn ? parseVnTimedTextAny(xmlVn) : [];
      const aligned = alignBilingualSubtitles(parsedEn, parsedVn);
      const subtitles = aligned.map((item, index) => ({
        id: index + 1,
        start: formatTimestampMs(item.startTime),
        end: formatTimestampMs(item.endTime),
        duration: item.duration,
        english: item.textEn,
        vietnamese: item.textVn,
        dictationWord: extractDictationWord(item.textEn),
        startSeconds: item.startTime,
      }));
      return { subtitles, needClientFetch: false };
    }
  }

  // 5. No captions found at all → return empty (let client service handle fallback)
  return { subtitles: [], tracks: [], needClientFetch: false };
}
