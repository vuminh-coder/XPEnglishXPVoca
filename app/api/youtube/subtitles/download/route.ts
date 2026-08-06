import { NextRequest, NextResponse } from "next/server";
import {
  extractSubtitlesFromTrackUrl,
  generateSrtContent,
  generateVttContent,
  generateTxtContent,
} from "@/lib/services/xpSubExtractor";

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

    const filename = `[XP-Sub]_${videoId}_${isBilingual ? "bilingual" : "mono"}.${extension}`;

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
