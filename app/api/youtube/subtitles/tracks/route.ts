import { NextRequest, NextResponse } from "next/server";
import { fetchInnertubeCaptionTracks } from "@/features/listening/services/xpSubExtractor";

/**
 * GET /api/youtube/subtitles/tracks?videoId={videoId}
 * Returns full list of native caption tracks & auto-translation target languages for a YouTube video.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json(
      { success: false, error: "Vui lòng cung cấp videoId" },
      { status: 400 }
    );
  }

  try {
    const result = await fetchInnertubeCaptionTracks(videoId);

    return NextResponse.json({
      success: true,
      videoId,
      videoTitle: result.videoTitle || "YouTube Video",
      tracks: result.tracks,
      translationLanguages: result.translationLanguages,
      totalTracksCount: result.tracks.length,
    });
  } catch (error: any) {
    console.error("[API XP-Sub Tracks] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Không thể lấy danh sách phụ đề từ YouTube Server",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
