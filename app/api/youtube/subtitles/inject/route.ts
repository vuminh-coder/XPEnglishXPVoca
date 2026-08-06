import { NextRequest, NextResponse } from "next/server";
import { extractSubtitlesFromTrackUrl } from "@/lib/services/xpSubExtractor";

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
