import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const body = await request.json();
    const { lessonId, content } = body;

    // Notes are private user data. Never accept an identity supplied in the body.
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (typeof lessonId !== "string" || !lessonId) {
      return NextResponse.json(
        { success: false, error: "Thiếu userId hoặc lessonId" },
        { status: 400 }
      );
    }

    if (typeof content !== "string" || content.length > 10_000) {
      return NextResponse.json({ success: false, error: "Invalid note content" }, { status: 400 });
    }

    // Ensure foreign key constraint is satisfied if lesson is in videoLesson
    let targetLessonId = lessonId;
    const existingLesson = await prisma.listeningLesson.findUnique({
      where: { id: lessonId },
      select: { id: true },
    });

    if (!existingLesson) {
      const videoLesson = await prisma.videoLesson.findFirst({
        where: {
          OR: [
            { id: lessonId },
            { slug: lessonId },
            { externalId: lessonId },
          ],
        },
        include: { category: true, segments: { orderBy: { orderIndex: "asc" } } },
      });

      if (videoLesson) {
        targetLessonId = videoLesson.id;
        const existingVideoInListening = await prisma.listeningLesson.findUnique({
          where: { id: videoLesson.id },
          select: { id: true },
        });

        if (!existingVideoInListening) {
          await prisma.listeningLesson.create({
            data: {
              id: videoLesson.id,
              title: videoLesson.title,
              category: videoLesson.category?.name || "Video Catalog",
              level: videoLesson.cefrLevel || "Intermediate",
              duration: videoLesson.durationFormatted || "05:00",
              accent: videoLesson.accent || "en-US",
              audioUrl: videoLesson.externalId ? `https://www.youtube.com/watch?v=${videoLesson.externalId}` : "",
              imageUrl: videoLesson.thumbnailUrl || "",
              transcript: videoLesson.segments.map((seg, idx) => ({
                id: seg.id || `seg_${idx + 1}`,
                startTime: seg.startTime,
                endTime: seg.endTime,
                text: seg.text,
                ipaUs: seg.ipaUs || "",
                ipaUk: seg.ipaUk || "",
                translationVi: seg.translationVi,
                explanationVi: seg.explanationAi || "",
                properNouns: seg.properNouns || [],
                keywords: seg.keywords || [],
              })),
              vocabList: [],
              grammarNotes: [],
              orderIndex: 9999,
            },
          });
        }
      }
    }

    const note = await prisma.listeningNote.upsert({
      where: {
        userId_lessonId: { userId, lessonId: targetLessonId },
      },
      update: {
        content,
        updatedAt: new Date(),
      },
      create: {
        userId,
        lessonId: targetLessonId,
        content,
      },
    });

    return NextResponse.json({
      success: true,
      data: note,
      message: "Ghi chú đã được lưu vào CSDL.",
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json(
      { success: false, error: prismaErr.error },
      { status: prismaErr.status }
    );
  }
}
