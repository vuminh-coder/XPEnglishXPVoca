import { NextRequest, NextResponse } from "next/server";
import { generateAiSubtitlesForVideo } from "@/features/myvideo/services/videoAiTranscribeService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoId, videoTitle, authorName, rawTranscript } = body;

    if (!videoId) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp videoId", success: false },
        { status: 400 }
      );
    }

    const subtitles = await generateAiSubtitlesForVideo({
      videoId,
      videoTitle: videoTitle || "Video Học Tiếng Anh YouTube",
      authorName: authorName || "YouTube Creator",
      rawTranscript,
    });

    return NextResponse.json({
      success: true,
      videoId,
      title: videoTitle || "Video Học Tiếng Anh YouTube",
      authorName: authorName || "YouTube Creator",
      subtitles,
      totalCount: subtitles.length,
      hasCaptions: true,
      isAiGenerated: true,
    });
  } catch (error: any) {
    console.error("[API AI Transcribe Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Không thể sinh phụ đề AI cho video này",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
