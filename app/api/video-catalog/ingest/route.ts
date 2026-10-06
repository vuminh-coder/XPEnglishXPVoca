import { NextRequest, NextResponse } from "next/server";
import { ingestYouTubeVideo } from "@/features/listening/services/videoIngestionService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      youtubeUrl,
      categorySlug,
      playlistSlug,
      customTitle,
      customDescription,
      cefrLevel,
      submittedByUserId,
    } = body as {
      youtubeUrl: string;
      categorySlug?: string;
      playlistSlug?: string;
      customTitle?: string;
      customDescription?: string;
      cefrLevel?: string;
      submittedByUserId?: string;
    };

    if (!youtubeUrl) {
      return NextResponse.json(
        { success: false, error: "Vui lòng cung cấp youtubeUrl" },
        { status: 400 }
      );
    }

    const result = await ingestYouTubeVideo({
      youtubeUrl,
      categorySlug,
      playlistSlug,
      customTitle,
      customDescription,
      cefrLevel,
      submittedByUserId,
    });

    return NextResponse.json({
      success: true,
      message: result.isExisting
        ? "Video bài học đã tồn tại và được cập nhật thành công!"
        : "Nạp và phân đoạn bài học video thành công!",
      lesson: result.lesson,
      segmentCount: result.segmentCount,
    });
  } catch (error: any) {
    console.error("[API video-catalog/ingest] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Lỗi khi xử lý và nạp bài học video",
      },
      { status: 500 }
    );
  }
}
