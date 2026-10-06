import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { extractYouTubeVideoId } from "@/features/listening/services/videoIngestionService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { youtubeUrl, topicCategory, notes, userId } = body as {
      youtubeUrl: string;
      topicCategory?: string;
      notes?: string;
      userId?: string;
    };

    if (!youtubeUrl || !youtubeUrl.trim()) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập đường dẫn YouTube hợp lệ" },
        { status: 400 }
      );
    }

    const videoId = extractYouTubeVideoId(youtubeUrl);
    if (!videoId) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy mã video YouTube từ đường dẫn đã nhập" },
        { status: 400 }
      );
    }

    // Check if video already exists as a lesson
    const existingLesson = await prisma.videoLesson.findFirst({
      where: { externalId: videoId },
      select: { id: true, title: true, slug: true },
    });

    if (existingLesson) {
      return NextResponse.json({
        success: true,
        alreadyExists: true,
        message: "Video này đã có sẵn trong kho bài học!",
        lesson: existingLesson,
      });
    }

    // Check recent pending request for this video
    const recentRequest = await prisma.lessonRequest.findFirst({
      where: {
        youtubeUrl: { contains: videoId },
        status: { in: ["PENDING", "PROCESSING"] },
      },
    });

    if (recentRequest) {
      return NextResponse.json({
        success: true,
        alreadyRequested: true,
        message: "Video này đã có người gửi yêu cầu và đang được hệ thống xử lý!",
        request: recentRequest,
      });
    }

    const created = await prisma.lessonRequest.create({
      data: {
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        topicCategory: topicCategory?.trim() || "Chung",
        notes: notes?.trim() || null,
        userId: userId || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Gửi yêu cầu bài học thành công! Hệ thống sẽ xử lý và thông báo khi hoàn tất.",
      request: created,
    });
  } catch (error: any) {
    console.error("[API video-catalog/request-lesson] Error:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi máy chủ khi gửi yêu cầu bài học" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "20", 10));

    const where: any = {};
    if (status) where.status = status.toUpperCase();

    const requests = await prisma.lessonRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: {
          select: { id: true, username: true, fullName: true, avatarUrl: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      requests,
      count: requests.length,
    });
  } catch (error: any) {
    console.error("[API video-catalog/request-lesson GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi máy chủ khi lấy danh sách yêu cầu" },
      { status: 500 }
    );
  }
}
