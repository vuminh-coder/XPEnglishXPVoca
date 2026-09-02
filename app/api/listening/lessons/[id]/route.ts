import { NextResponse } from "next/server";
import { prisma, safeDbExecute, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get("userId");

    if (!userId) {
      userId = await getAuthenticatedUserId(request);
    }

    let lessonData: any = await safeDbExecute(async () => {
      // 1. Try finding by direct ID (UUID or custom ID)
      let lesson = await prisma.listeningLesson.findUnique({
        where: { id },
        include: userId
          ? {
              progresses: {
                where: { userId },
                take: 1,
              },
              notes: {
                where: { userId },
                take: 1,
              },
            }
          : undefined,
      });

      // 2. Fallback: if not found, try finding by formatted id (listen_XXX), orderIndex or numeric index (e.g. id=52 -> listen_052)
      if (!lesson) {
        const num = parseInt(id, 10);
        if (!isNaN(num)) {
          const formatted = `listen_${String(num).padStart(3, "0")}`;
          lesson = await prisma.listeningLesson.findFirst({
            where: {
              OR: [
                { id: formatted },
                { orderIndex: num - 1 },
                { orderIndex: num },
              ],
            },
            include: userId
              ? {
                  progresses: {
                    where: { userId },
                    take: 1,
                  },
                  notes: {
                    where: { userId },
                    take: 1,
                  },
                }
              : undefined,
          });
        }
      }

      if (!lesson) return null;

      const userProgress = (lesson as any).progresses?.[0] || null;
      const userNote = (lesson as any).notes?.[0] || null;

      const transcriptArray = Array.isArray(lesson.transcript) ? lesson.transcript : [];
      const totalSentences = transcriptArray.length;
      const completedCount = Array.isArray(userProgress?.completedSentences)
        ? userProgress.completedSentences.length
        : 0;

      const isCompleted =
        userProgress?.status === "COMPLETED" ||
        (totalSentences > 0 && completedCount >= totalSentences);

      return {
        ...lesson,
        totalSentences,
        userProgress: userProgress
          ? {
              status: isCompleted ? "COMPLETED" : userProgress.status,
              completedSentences: userProgress.completedSentences || [],
              bookmarkedSentences: userProgress.bookmarkedSentences || [],
              inlineAiScores: userProgress.inlineAiScores || {},
              timeSpent: userProgress.timeSpent || 0,
              lastPracticedAt: userProgress.lastPracticedAt,
            }
          : null,
        userNote: userNote?.content || "",
      };
    }, "Fetch Single Listening Lesson");

    // 3. Fallback to MOCK_LESSONS_DATA if not found in database table or DB connection timeout
    if (!lessonData) {
      let mockLesson = MOCK_LESSONS_DATA.find((l) => l.id === id);
      if (!mockLesson) {
        const num = parseInt(id, 10);
        if (!isNaN(num)) {
          if (num >= 1 && num <= MOCK_LESSONS_DATA.length) {
            mockLesson = MOCK_LESSONS_DATA[num - 1];
          } else {
            const formatted = `listen_${String(num).padStart(3, "0")}`;
            mockLesson = MOCK_LESSONS_DATA.find((l) => l.id === formatted);
          }
        }
      }

      if (mockLesson) {
        let userProgress: any = null;
        let userNote = "";

        if (userId && userId !== "guest_user" && userId !== "guest-user") {
          try {
            const [p, n] = await Promise.all([
              prisma.listeningProgress.findUnique({
                where: { userId_lessonId: { userId, lessonId: mockLesson.id } },
              }),
              prisma.listeningNote.findUnique({
                where: { userId_lessonId: { userId, lessonId: mockLesson.id } },
              }),
            ]);
            if (p) userProgress = p;
            if (n) userNote = n.content || "";
          } catch {}
        }

        const transcriptArray = Array.isArray(mockLesson.transcript) ? mockLesson.transcript : [];
        const totalSentences = transcriptArray.length;
        const completedCount = Array.isArray(userProgress?.completedSentences)
          ? userProgress.completedSentences.length
          : 0;
        const isCompleted =
          userProgress?.status === "COMPLETED" ||
          (totalSentences > 0 && completedCount >= totalSentences);

        lessonData = {
          ...mockLesson,
          totalSentences,
          userProgress: userProgress
            ? {
                status: isCompleted ? "COMPLETED" : userProgress.status,
                completedSentences: userProgress.completedSentences || [],
                bookmarkedSentences: userProgress.bookmarkedSentences || [],
                inlineAiScores: userProgress.inlineAiScores || {},
                timeSpent: userProgress.timeSpent || 0,
                lastPracticedAt: userProgress.lastPracticedAt,
              }
            : null,
          userNote,
        };
      }
    }

    if (!lessonData) {
      return NextResponse.json(
        { success: false, error: "Bài nghe không tồn tại" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lessonData,
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json(
      { success: false, error: prismaErr.error },
      { status: prismaErr.status }
    );
  }
}
