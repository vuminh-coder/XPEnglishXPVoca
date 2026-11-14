import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";
import { extractYouTubeVideoId, formatDurationSeconds } from "@/features/listening/utils/videoUrlHelper";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Thiếu mã định danh bài học" },
        { status: 400 }
      );
    }

    const mock = MOCK_VIDEO_LESSONS.find(
      (m) =>
        m.id === id ||
        m.slug === id ||
        m.externalId === id ||
        (id === "steve-jobs-stanford-commencement" && m.slug === "steve-jobs-stanford-stay-hungry")
    );
    if (mock) {
      return NextResponse.json({
        success: true,
        lesson: {
          id: mock.id,
          slug: mock.slug,
          title: mock.title,
          description: mock.description,
          sourceType: mock.sourceType,
          externalId: mock.externalId,
          thumbnailUrl: mock.thumbnailUrl,
          durationSeconds: mock.durationSeconds,
          durationFormatted: mock.durationFormatted,
          cefrLevel: mock.cefrLevel,
          supportedTypes: mock.supportedTypes,
          accent: mock.accent,
          wpmSpeed: mock.wpmSpeed,
          viewCount: mock.viewCount,
          studyCount: mock.studyCount,
          category: {
            id: mock.categoryId,
            name: mock.categoryName,
            slug: mock.categorySlug,
          },
          segments: mock.segments,
        },
      });
    }

    let lesson: any = null;
    try {
      lesson = await prisma.videoLesson.findFirst({
        where: {
          OR: [{ id }, { slug: id }, { externalId: id }],
        },
        include: {
          category: true,
          playlist: true,
          segments: {
            orderBy: { orderIndex: "asc" },
          },
        },
      });
    } catch (dbErr) {
      console.warn("[API video-catalog/lessons/[id]] DB lookup error:", dbErr);
    }
    if (!lesson) {
      // Fallback: check user-created YouTube lessons persisted in ListeningLesson
      try {
        const listeningFallback = await prisma.listeningLesson.findUnique({ where: { id } });
        const ytId = listeningFallback ? extractYouTubeVideoId(listeningFallback.audioUrl || "") : null;
        if (listeningFallback && ytId) {
          const transcript = Array.isArray(listeningFallback.transcript)
            ? (listeningFallback.transcript as any[])
            : [];
          const lastEnd =
            transcript.length > 0 ? Number(transcript[transcript.length - 1]?.endTime || 180) : 180;
          const durSec = Math.max(30, Math.round(lastEnd));
          return NextResponse.json({
            success: true,
            lesson: {
              id: listeningFallback.id,
              slug: listeningFallback.id,
              title: listeningFallback.title,
              description: `Bài học Video YouTube (${listeningFallback.category})`,
              sourceType: "YOUTUBE",
              externalId: ytId,
              thumbnailUrl:
                listeningFallback.imageUrl || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
              durationSeconds: durSec,
              durationFormatted: formatDurationSeconds(durSec),
              cefrLevel: listeningFallback.level || "B1",
              supportedTypes: "BOTH",
              accent: listeningFallback.accent || "en-US",
              wpmSpeed: 130,
              viewCount: 0,
              studyCount: 0,
              category: {
                id: "custom-youtube",
                slug: "custom-youtube",
                name: listeningFallback.category || "Video Tự Nhập",
              },
              playlist: null,
              properNouns: [],
              keywords: [],
              segmentsCount: transcript.length,
              segments: transcript.map((seg, idx) => {
                const startTime = Number(seg.startTime ?? 0);
                const endTime = Number(seg.endTime ?? startTime + 3);
                return {
                  id: String(seg.id || `seg_${idx + 1}`),
                  orderIndex: idx + 1,
                  startTime,
                  endTime,
                  duration: parseFloat(Math.max(0.3, endTime - startTime).toFixed(3)),
                  text: seg.text || seg.english || "",
                  normalizedText: (seg.text || "").toLowerCase(),
                  translationVi: seg.translation || seg.vietnamese || "",
                  properNouns: seg.properNouns || [],
                  keywords: seg.keywords || [],
                  wordTimings: Array.isArray(seg.wordTimings) ? seg.wordTimings : undefined,
                };
              }),
            },
          });
        }
      } catch (listenErr) {
        console.warn("[API video-catalog/lessons/[id]] Listening fallback error:", listenErr);
      }

      return NextResponse.json(
        { success: false, error: "Không tìm thấy bài học video tương ứng" },
        { status: 404 }
      );
    }


    // Increment viewCount non-blockingly
    prisma.videoLesson
      .update({
        where: { id: lesson.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch((err) => console.warn("Failed to increment viewCount:", err));

    // Aggregate proper nouns & keywords from all segments
    const allProperNouns = Array.from(
      new Set(lesson.segments.flatMap((s: any) => s.properNouns || []))
    );
    const allKeywords = Array.from(
      new Set(lesson.segments.flatMap((s: any) => s.keywords || []))
    );

    return NextResponse.json({
      success: true,
      lesson: {
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        sourceType: lesson.sourceType,
        externalId: lesson.externalId,
        thumbnailUrl: lesson.thumbnailUrl,
        durationSeconds: lesson.durationSeconds,
        durationFormatted: lesson.durationFormatted,
        cefrLevel: lesson.cefrLevel,
        supportedTypes: lesson.supportedTypes,
        accent: lesson.accent,
        wpmSpeed: lesson.wpmSpeed,
        viewCount: lesson.viewCount + 1,
        studyCount: lesson.studyCount,
        category: lesson.category,
        playlist: lesson.playlist,
        properNouns: allProperNouns,
        keywords: allKeywords,
        segmentsCount: lesson.segments.length,
        segments: lesson.segments.map((s: any) => ({
          id: s.id,
          orderIndex: s.orderIndex,
          startTime: s.startTime,
          endTime: s.endTime,
          duration: parseFloat((s.endTime - s.startTime).toFixed(3)),
          text: s.text,
          normalizedText: s.normalizedText,
          ipaUs: s.ipaUs,
          ipaUk: s.ipaUk,
          translationVi: s.translationVi,
          explanationAi: s.explanationAi,
          properNouns: s.properNouns,
          keywords: s.keywords,
          tokenCount: s.tokenCount,
        })),
      },
    });
  } catch (error: any) {
    console.error("[API video-catalog/lessons/[id]] Error:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi máy chủ khi lấy chi tiết bài học" },
      { status: 500 }
    );
  }
}
