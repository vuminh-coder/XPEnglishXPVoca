import { NextRequest, NextResponse } from "next/server";
import { extractSubtitlesFromTrackUrl } from "@/features/listening/services/xpSubExtractor";
import { isAllowedYouTubeTimedTextUrl } from "@/infrastructure/security/youtubeSubtitleUrl";

const SAFE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * POST /api/youtube/subtitles/inject
 * Body: { videoId, trackBaseUrl, isBilingual, targetLang }
 * Triggers in-house extraction and returns SubtitleSentence[] array for 0ms auto-inject into active video workspace.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoId, trackBaseUrl, isBilingual = true, targetLang = "vi", videoTitle } = body;

    if (!videoId || !trackBaseUrl) {
      return NextResponse.json(
        { success: false, error: "Vui lòng cung cấp videoId và trackBaseUrl" },
        { status: 400 }
      );
    }

    if (typeof videoId !== "string" || !SAFE_VIDEO_ID_PATTERN.test(videoId)) {
      return NextResponse.json(
        { success: false, error: "Mã videoId không hợp lệ" },
        { status: 400 }
      );
    }

    if (typeof trackBaseUrl !== "string" || !isAllowedYouTubeTimedTextUrl(trackBaseUrl)) {
      return NextResponse.json(
        { success: false, error: "trackBaseUrl không nằm trong allowlist hợp lệ của YouTube" },
        { status: 400 }
      );
    }

    const sentences = await extractSubtitlesFromTrackUrl(
      trackBaseUrl,
      targetLang,
      isBilingual,
      videoId,
      videoTitle
    );

    return NextResponse.json({
      success: true,
      videoId,
      subtitles: sentences,
      totalCount: sentences.length,
    });
  } catch (error: any) {
    console.error("[API XP-Sub Inject] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Lỗi hệ thống khi trích xuất và nạp phụ đề",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
