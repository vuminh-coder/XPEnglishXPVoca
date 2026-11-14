import { NextRequest, NextResponse } from "next/server";
import { extractYouTubeVideoId } from "@/features/listening/utils/videoUrlHelper";
import {
  extractYouTubeCaptionsOnServer,
  NormalizedCaptionLine,
  ExtractedTrackMeta,
  TranslationLanguageMeta,
  CaptionFailureReason,
} from "@/features/listening/services/youtubeTrackExtractor";

export type SubtitleItem = NormalizedCaptionLine & { isAiGenerated?: boolean };
export type ExtractedTrack = ExtractedTrackMeta;

interface CaptionsApiPayload {
  success: boolean;
  videoId: string;
  title: string;
  authorName: string;
  durationSeconds?: number;
  subtitles: NormalizedCaptionLine[];
  tracks: ExtractedTrackMeta[];
  translationLanguages: TranslationLanguageMeta[];
  selectedTrack?: ExtractedTrackMeta;
  needClientFetch: boolean;
  totalCount: number;
  hasCaptions: boolean;
  isAiGenerated: false;
  failureReason: CaptionFailureReason;
  sourceTier?: string;
}

type CaptionsFetchOutcome =
  | CaptionsApiPayload
  | { failed: true; failureReason: CaptionFailureReason; title: string; authorName: string; sourceTier?: string };

const captionServerCache = new Map<string, { data: CaptionsApiPayload; timestamp: number }>();
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const MAX_CAPTION_CACHE_ITEMS = 300;
const inFlightCaptionsMap = new Map<string, Promise<CaptionsFetchOutcome>>();

function setCaptionCache(cacheKey: string, data: CaptionsApiPayload) {
  if (captionServerCache.size >= MAX_CAPTION_CACHE_ITEMS) {
    const oldestKey = captionServerCache.keys().next().value;
    if (oldestKey) captionServerCache.delete(oldestKey);
  }
  captionServerCache.set(cacheKey, { data, timestamp: Date.now() });
}

async function getOrFetchCaptions(
  videoId: string,
  preferredLang?: string
): Promise<CaptionsFetchOutcome> {
  const cacheKey = `${videoId}:${preferredLang || "default"}`;

  const existing = inFlightCaptionsMap.get(cacheKey);
  if (existing) {
    return await existing;
  }

  const fetchPromise = (async (): Promise<CaptionsFetchOutcome> => {
    const result = await extractYouTubeCaptionsOnServer(videoId, { preferredLang });
    if (!result.subtitles.length && !result.tracks.length) {
      return {
        failed: true,
        failureReason: result.failureReason,
        title: result.title || "Video Học Tiếng Anh YouTube",
        authorName: result.authorName || "YouTube Creator",
        sourceTier: result.sourceTier,
      };
    }

    const payload: CaptionsApiPayload = {
      success: true,
      videoId: result.videoId,
      title: result.title || "Video Học Tiếng Anh YouTube",
      authorName: result.authorName || "YouTube Creator",
      durationSeconds: result.durationSeconds,
      subtitles: result.subtitles,
      tracks: result.tracks,
      translationLanguages: result.translationLanguages,
      selectedTrack: result.selectedTrack,
      needClientFetch: result.needClientFetch,
      totalCount: result.subtitles.length,
      hasCaptions: result.subtitles.length > 0 || result.tracks.length > 0,
      isAiGenerated: false,
      failureReason: result.failureReason,
      sourceTier: result.sourceTier,
    };

    // Only cache genuinely extracted captions (never cache empty or partial failures)
    if (payload.subtitles.length > 0) {
      setCaptionCache(cacheKey, payload);
    }

    return payload;
  })();

  inFlightCaptionsMap.set(cacheKey, fetchPromise);
  try {
    return await fetchPromise;
  } finally {
    inFlightCaptionsMap.delete(cacheKey);
  }
}

function buildFailureMessage(reason: CaptionFailureReason): string {
  switch (reason) {
    case "BOT_BLOCKED":
      return "YouTube đang tạm giới hạn truy cập tự động. Vui lòng thử lại sau hoặc nhập file .srt / transcript.";
    case "AGE_OR_LOGIN_REQUIRED":
      return "Video này yêu cầu đăng nhập hoặc giới hạn độ tuổi trên YouTube. Vui lòng nhập file .srt / transcript thủ công.";
    case "PRIVATE_OR_UNAVAILABLE":
      return "Video YouTube ở chế độ riêng tư, đã xóa hoặc không khả dụng.";
    case "INVALID_VIDEO_ID":
      return "Mã Video YouTube không hợp lệ.";
    default:
      return "Video YouTube này không có phụ đề CC khả dụng. Bạn có thể chọn nhập file .srt/.vtt hoặc dán transcript.";
  }
}

async function handleCaptionsRequest(
  rawVideoId: string | null | undefined,
  preferredLang?: string,
  forceRefresh = false
) {
  const videoId = rawVideoId ? extractYouTubeVideoId(rawVideoId) : null;
  if (!videoId) {
    return NextResponse.json(
      {
        success: false,
        error: "Vui lòng cung cấp videoId hoặc URL YouTube hợp lệ",
        hasCaptions: false,
        failureReason: "INVALID_VIDEO_ID",
        subtitles: [],
        tracks: [],
      },
      { status: 400 }
    );
  }

  const cacheKey = `${videoId}:${preferredLang || "default"}`;
  const cached = captionServerCache.get(cacheKey);
  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, { headers: { "X-Cache": "HIT" } });
  }

  // Wait on coalesced in-flight request if not forcing refresh
  if (!forceRefresh && inFlightCaptionsMap.has(cacheKey)) {
    try {
      const coalesced = await inFlightCaptionsMap.get(cacheKey);
      if (coalesced) {
        return NextResponse.json(coalesced, { headers: { "X-Cache": "IN_FLIGHT_COALESCED" } });
      }
    } catch {}
  }

  const result = await getOrFetchCaptions(videoId, preferredLang);
  if ("failed" in result) {
    return NextResponse.json(
      {
        success: false,
        videoId,
        title: result.title,
        authorName: result.authorName,
        error: buildFailureMessage(result.failureReason),
        hasCaptions: false,
        isAiGenerated: false,
        failureReason: result.failureReason,
        sourceTier: result.sourceTier,
        subtitles: [],
        tracks: [],
      },
      { status: 404 }
    );
  }

  return NextResponse.json(result, { headers: { "X-Cache": "MISS" } });
}

/**
 * GET /api/youtube/captions?videoId={id_or_url}&lang={bcp47}&force={0|1}
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawVideoId = searchParams.get("videoId") || searchParams.get("url");
    const preferredLang = searchParams.get("lang")?.trim() || undefined;
    const forceRefresh = searchParams.get("force") === "1";

    return await handleCaptionsRequest(rawVideoId, preferredLang, forceRefresh);
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

/**
 * POST /api/youtube/captions
 * Body: { videoId, lang?, force? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawVideoId = body?.videoId || body?.url;
    const preferredLang = typeof body?.lang === "string" ? body.lang.trim() || undefined : undefined;
    const forceRefresh = Boolean(body?.force);

    return await handleCaptionsRequest(rawVideoId, preferredLang, forceRefresh);
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
