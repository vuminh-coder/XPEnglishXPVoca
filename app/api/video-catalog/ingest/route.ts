import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import {
  ingestYouTubeVideo,
  PreExtractedSegmentInput,
  VideoCaptionsNotFoundError,
} from "@/features/listening/services/videoIngestionService";

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Vui lòng đăng nhập để nạp video vào kho chung." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      youtubeUrl,
      categorySlug,
      playlistSlug,
      customTitle,
      customDescription,
      cefrLevel,
      preferredLang,
      preExtractedSegments,
    } = body as {
      youtubeUrl: string;
      categorySlug?: string;
      playlistSlug?: string;
      customTitle?: string;
      customDescription?: string;
      cefrLevel?: string;
      preferredLang?: string;
      preExtractedSegments?: PreExtractedSegmentInput[];
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
      preferredLang,
      preExtractedSegments,
      submittedByUserId: userId,
    });

    return NextResponse.json({
      success: true,
      message: result.isExisting
        ? "Video bài học đã được cập nhật thành công!"
        : "Nạp và chuẩn hóa bài học video thành công!",
      lesson: result.lesson,
      segmentCount: result.segmentCount,
    });
  } catch (error: any) {
    if (error instanceof VideoCaptionsNotFoundError) {
      return NextResponse.json(
        {
          success: false,
          code: error.code,
          error: error.message,
        },
        { status: 422 }
      );
    }
    console.error("[API video-catalog/ingest] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Lỗi khi xử lý và nạp bài học video",
      },
      { status: 500 }
    );
  }
}
