import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { extractYouTubeVideoId } from "@/features/listening/services/videoIngestionService";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { sanitizeInput } from "@/infrastructure/security/validation";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

export async function POST(req: NextRequest) {
  try {
    const authenticatedUserId = await getAuthenticatedUserId(req);
    if (!authenticatedUserId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Vui lòng đăng nhập để gửi yêu cầu bài học." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { youtubeUrl, topicCategory, notes } = body as {
      youtubeUrl: string;
      topicCategory?: string;
      notes?: string;
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

    // Check if video already exists in DB or curated mock catalog
    const existingLesson =
      (await prisma.videoLesson.findFirst({
        where: { externalId: videoId },
        select: { id: true, title: true, slug: true },
      })) ??
      (() => {
        const mock = MOCK_VIDEO_LESSONS.find((m) => m.externalId === videoId);
        return mock ? { id: mock.id, title: mock.title, slug: mock.slug } : null;
      })();

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
      select: {
        id: true,
        youtubeUrl: true,
        topicCategory: true,
        status: true,
        createdAt: true,
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

    const existingProfile = await prisma.profile.findUnique({
      where: { id: authenticatedUserId },
      select: { id: true },
    });

    const created = await prisma.lessonRequest.create({
      data: {
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        topicCategory: topicCategory?.trim().slice(0, 80) || "Chung",
        notes: notes ? sanitizeInput(notes.trim().slice(0, 500)) : null,
        // Always derive userId from verified JWT session (null only if profile row absent)
        userId: existingProfile?.id ?? null,
        status: "PENDING",
      },
      select: {
        id: true,
        youtubeUrl: true,
        topicCategory: true,
        notes: true,
        status: true,
        createdAt: true,
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
    const authenticatedUserId = await getAuthenticatedUserId(req);
    if (!authenticatedUserId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10) || 20));

    const where: any = {};
    if (status) where.status = status.toUpperCase();

    // Only expose anonymized community queue fields (never leak user emails, usernames, or private IDs)
    const requests = await prisma.lessonRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        youtubeUrl: true,
        topicCategory: true,
        notes: true,
        status: true,
        createdAt: true,
        userId: true,
      },
    });

    const sanitizedRequests = requests.map(({ userId: ownerId, ...rest }) => ({
      ...rest,
      isMine: ownerId === authenticatedUserId,
    }));

    return NextResponse.json({
      success: true,
      requests: sanitizedRequests,
      count: sanitizedRequests.length,
    });
  } catch (error: any) {
    console.error("[API video-catalog/request-lesson GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi máy chủ khi lấy danh sách yêu cầu" },
      { status: 500 }
    );
  }
}
