import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";

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

    const lesson = await prisma.videoLesson.findFirst({
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

    if (!lesson) {
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
      new Set(lesson.segments.flatMap((s) => s.properNouns || []))
    );
    const allKeywords = Array.from(
      new Set(lesson.segments.flatMap((s) => s.keywords || []))
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
        segments: lesson.segments.map((s) => ({
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
