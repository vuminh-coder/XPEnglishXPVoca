import { NextResponse } from "next/server";
import { prisma, safeDbExecute, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";
import { resolveCanonicalLessonId, isSameLessonId } from "@/features/listening/utils/lessonIdHelper";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // SECURITY: Only use authenticated userId — never trust client query params
    // Prevents IDOR/BOLA (OWASP API Top 10 #1) where attackers could pass ?userId=<victim>
    const userId = await getAuthenticatedUserId(request);

    const isPersonalized = Boolean(userId && !userId.startsWith("guest") && userId !== "guest_user");
    const cacheControlHeader = isPersonalized
      ? "private, no-cache, no-store, must-revalidate"
      : "public, s-maxage=60, stale-while-revalidate=120";

    const cacheKey = `listening_lesson_detail:${id}:${userId || "guest"}`;
    const cached = memoryCache.get<any>(cacheKey);
    const canonicalId = resolveCanonicalLessonId(id);
    if (cached && (isSameLessonId(cached.id, id) || (canonicalId && isSameLessonId(cached.id, canonicalId)))) {
      return NextResponse.json(
        {
          success: true,
          data: cached,
        },
        {
          headers: {
            "Cache-Control": cacheControlHeader,
            "X-Cache": "HIT",
          },
        }
      );
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

      // 1b. If not found by direct ID, try canonical ID (e.g. "51" -> "listen_toeic_q3_051")
      if (!lesson) {
        const canonicalId = resolveCanonicalLessonId(id);
        if (canonicalId && canonicalId !== id) {
          lesson = await prisma.listeningLesson.findUnique({
            where: { id: canonicalId },
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

      // 2. Fallback: if not found, try finding by formatted id (listen_XXX, listen_toeic_XXX) or pad3
      if (!lesson) {
        const isNumericOrPrefix = /^\d+$/.test(id) || /^(?:listen|lesson|toeic)[\w-]*?_?(\d+)$/i.test(id);
        if (isNumericOrPrefix) {
          const numMatch = id.match(/_?(\d+)$/);
          const num = numMatch ? parseInt(numMatch[1], 10) : NaN;
          if (!isNaN(num)) {
            const pad3 = String(num).padStart(3, "0");
            const formatted = `listen_${pad3}`;

            lesson = await prisma.listeningLesson.findFirst({
              where: {
                OR: [
                  { id: formatted },
                  { id: { contains: `_${pad3}` } },
                  { id: { contains: pad3 } },
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
      }

      // If not found in listeningLesson, check videoLesson table
      if (!lesson) {
        try {
          const videoLesson = await prisma.videoLesson.findFirst({
            where: {
              OR: [
                { id },
                { slug: id },
                { externalId: id },
              ],
            },
            include: {
              category: true,
              segments: {
                orderBy: { orderIndex: "asc" },
              },
            },
          });

          if (videoLesson) {
            let userProgress: any = null;
            let userNote: any = null;

            if (userId) {
              const [p, n] = await Promise.all([
                prisma.listeningProgress.findFirst({
                  where: {
                    userId,
                    OR: [
                      { lessonId: videoLesson.id },
                      { lessonId: id },
                    ],
                  },
                }),
                prisma.listeningNote.findFirst({
                  where: {
                    userId,
                    OR: [
                      { lessonId: videoLesson.id },
                      { lessonId: id },
                    ],
                  },
                }),
              ]);
              userProgress = p;
              userNote = n;
            }

            const totalSentences = videoLesson.segments.length;
            const completedCount = Array.isArray(userProgress?.completedSentences)
              ? userProgress.completedSentences.length
              : 0;
            const isCompleted =
              userProgress?.status === "COMPLETED" ||
              (totalSentences > 0 && completedCount >= totalSentences);

            return {
              id: videoLesson.id,
              title: videoLesson.title,
              description: videoLesson.description || "",
              level: videoLesson.cefrLevel,
              audioUrl: videoLesson.externalId ? `https://www.youtube.com/watch?v=${videoLesson.externalId}` : "",
              duration: videoLesson.durationSeconds,
              category: videoLesson.category?.name || "Video Catalog",
              imageUrl: videoLesson.thumbnailUrl,
              totalSentences,
              transcript: videoLesson.segments.map((seg, idx) => ({
                id: seg.id || `seg_${idx + 1}`,
                startTime: Number(seg.startTime),
                endTime: Number(seg.endTime),
                text: seg.text,
                translation: seg.translationVi,
                vietnamese: seg.translationVi,
                translationVi: seg.translationVi,
                ipa: seg.ipaUs || seg.ipaUk || "",
                ipaUs: seg.ipaUs || "",
                ipaUk: seg.ipaUk || "",
                explanationVi: seg.explanationAi || "",
                properNouns: seg.properNouns || [],
                keywords: seg.keywords || [],
              })),
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
              videoMetadata: {
                sourceType: videoLesson.sourceType,
                externalId: videoLesson.externalId,
                thumbnailUrl: videoLesson.thumbnailUrl,
                supportedTypes: videoLesson.supportedTypes,
                cefrLevel: videoLesson.cefrLevel,
                wpmSpeed: videoLesson.wpmSpeed,
              },
            };
          }
        } catch (videoErr) {
          console.warn("[ListeningLessonRoute] VideoLesson lookup error:", videoErr);
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
        const isNumericOrPrefix = /^\d+$/.test(id) || /^(?:listen|lesson)[\w-]*?_?(\d+)$/i.test(id);
        if (isNumericOrPrefix) {
          const numMatch = id.match(/_?(\d+)$/);
          const num = numMatch ? parseInt(numMatch[1], 10) : NaN;
          if (!isNaN(num)) {
            if (num >= 1 && num <= MOCK_LESSONS_DATA.length) {
              mockLesson = MOCK_LESSONS_DATA[num - 1];
            } else {
              const formatted = `listen_${String(num).padStart(3, "0")}`;
              mockLesson = MOCK_LESSONS_DATA.find(
                (l) => l.id === formatted || l.id.includes(String(num).padStart(3, "0"))
              );
            }
          }
        }
      }

      if (!mockLesson) {
        const mockVideo = MOCK_VIDEO_LESSONS.find(
          (v) => v.id === id || v.slug === id || v.externalId === id
        );
        if (mockVideo) {
          mockLesson = {
            id: mockVideo.id,
            title: mockVideo.title,
            description: mockVideo.description,
            level: mockVideo.cefrLevel,
            audioUrl: `https://www.youtube.com/watch?v=${mockVideo.externalId}`,
            duration: mockVideo.durationSeconds,
            category: mockVideo.categoryName,
            imageUrl: mockVideo.thumbnailUrl,
            totalSentences: mockVideo.segments.length,
            transcript: mockVideo.segments.map((seg, idx) => ({
              id: `seg_${idx + 1}`,
              startTime: Number(seg.startTime),
              endTime: Number(seg.endTime),
              text: seg.text,
              translation: seg.translationVi,
              vietnamese: seg.translationVi,
              translationVi: seg.translationVi,
              ipa: seg.ipaUs || "",
              ipaUs: seg.ipaUs || "",
              ipaUk: "",
              explanationVi: seg.explanationAi || "",
              properNouns: seg.properNouns || [],
              keywords: seg.keywords || [],
            })),
            videoMetadata: {
              sourceType: mockVideo.sourceType,
              externalId: mockVideo.externalId,
              thumbnailUrl: mockVideo.thumbnailUrl,
              supportedTypes: mockVideo.supportedTypes,
              cefrLevel: mockVideo.cefrLevel,
              wpmSpeed: mockVideo.wpmSpeed,
            },
          } as any;
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

    // Cache the resolved lesson data for 5 minutes (300 seconds)
    memoryCache.set(cacheKey, lessonData, 300);
    if (lessonData.id && lessonData.id !== id) {
      memoryCache.set(`listening_lesson_detail:${lessonData.id}:${userId || "guest"}`, lessonData, 300);
    }

    return NextResponse.json({
      success: true,
      data: lessonData,
    }, {
      headers: {
        "Cache-Control": cacheControlHeader,
        "X-Cache": "MISS",
      }
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json(
      { success: false, error: prismaErr.error },
      { status: prismaErr.status }
    );
  }
}
