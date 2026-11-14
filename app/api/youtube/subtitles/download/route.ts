import { NextRequest, NextResponse } from "next/server";
import {
  extractSubtitlesFromTrackUrl,
  generateSrtContent,
  generateVttContent,
  generateTxtContent,
} from "@/features/listening/services/xpSubExtractor";
import { isAllowedYouTubeTimedTextUrl } from "@/infrastructure/security/youtubeSubtitleUrl";

const SAFE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * POST /api/youtube/subtitles/download
 * Body: { videoId, trackBaseUrl, format, isBilingual, targetLang }
 * Exports and returns raw subtitle file (.srt, .vtt, .txt, .json) with attachment headers.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoId, trackBaseUrl, format = "srt", isBilingual = true, targetLang = "vi" } = body;

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
      videoId
    );

    if (!sentences || sentences.length === 0) {
      return NextResponse.json(
        { success: false, error: "Không thể trích xuất nội dung phụ đề từ track đã chọn." },
        { status: 404 }
      );
    }

    let fileContent = "";
    let contentType = "text/plain; charset=utf-8";
    let extension = "srt";

    switch (format.toLowerCase()) {
      case "vtt":
        fileContent = generateVttContent(sentences, isBilingual);
        contentType = "text/vtt; charset=utf-8";
        extension = "vtt";
        break;
      case "txt":
        fileContent = generateTxtContent(sentences, isBilingual);
        contentType = "text/plain; charset=utf-8";
        extension = "txt";
        break;
      case "json":
        fileContent = JSON.stringify(sentences, null, 2);
        contentType = "application/json; charset=utf-8";
        extension = "json";
        break;
      case "srt":
      default:
        fileContent = generateSrtContent(sentences, isBilingual);
        contentType = "application/x-subrip; charset=utf-8";
        extension = "srt";
        break;
    }

    const safeVideoId = videoId.replace(/[^A-Za-z0-9_-]/g, "");
    const safeMode = isBilingual ? "bilingual" : "mono";
    const filename = `XP-Sub_${safeVideoId}_${safeMode}.${extension}`;

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache",
      },
    });
  } catch (error: any) {
    console.error("[API XP-Sub Download] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Lỗi hệ thống khi tạo file phụ đề",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
