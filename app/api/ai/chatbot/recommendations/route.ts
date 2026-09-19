import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { getLocalDateString } from "@/shared/utils/dateUtils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const { searchParams } = new URL(request.url);
    const pathname = searchParams.get("pathname") || "/dashboard";

    const isGuest = !userId || userId === "guest_user" || userId === "local_user";
    const todayStr = getLocalDateString();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Fallback data for guests or unauthenticated users
    if (isGuest) {
      return NextResponse.json({
        success: true,
        data: {
          user: {
            level: 1,
            totalXp: 150,
            currentStreak: 1,
            coins: 100,
          },
          targetGoal: {
            exam: "TOEIC",
            score: 750,
            currentLevel: "A2",
            weeklyHours: 10,
            completionPercentage: 35,
          },
          dailyQuests: [
            {
              id: "quest_vocab",
              title: "Học 5 từ vựng mới",
              description: "Khám phá 60 chủ đề cơ bản A1-A2",
              progress: 0,
              target: 5,
              xpReward: 15,
              coinReward: 10,
              isCompleted: false,
              link: "/vocabulary",
              icon: "📚",
            },
            {
              id: "quest_listening",
              title: "Luyện nghe Dictation 10 phút",
              description: "Chép chính tả từng câu phản xạ",
              progress: 0,
              target: 10,
              xpReward: 20,
              coinReward: 15,
              isCompleted: false,
              link: "/study/listening",
              icon: "🎧",
            },
            {
              id: "quest_grammar",
              title: "Ôn tập chuyên đề Ngữ pháp",
              description: "Thì Hiện tại đơn & trắc nghiệm AI",
              progress: 0,
              target: 1,
              xpReward: 20,
              coinReward: 15,
              isCompleted: false,
              link: "/study/grammar/present_simple",
              icon: "📖",
            },
          ],
          rewardChest: {
            canClaim: false,
            isClaimed: false,
            xpReward: 50,
            coinReward: 20,
          },
          recommendations: {
            weakestSkill: {
              skill: "speaking",
              label: "Luyện nói & Shadowing",
              minutes7d: 0,
              advice: "Bạn chưa luyện phát âm tuần này. Hãy bắt đầu với 5 phút Shadowing!",
              link: "/study/shadowing",
            },
            srsDue: {
              count: 0,
              advice: "Kho từ vựng sẵn sàng. Hãy lưu các từ khó vào sổ từ để ôn tập ngắt quãng!",
              link: "/vocabulary",
            },
            nextListening: {
              lessonId: "preset_1",
              title: "Daily Routine & Morning Habits",
              category: "Conversations",
              progressText: "Chưa học",
              link: "/study/listening",
            },
            nextGrammar: {
              topicId: "present_simple",
              title: "Thì Hiện tại đơn (Present Simple)",
              advice: "Nền tảng quan trọng nhất trong giao tiếp và đề thi TOEIC/IELTS.",
              link: "/study/grammar/present_simple",
            },
            contextualTip: getContextualTip(pathname),
          },
        },
      });
    }

    // Authenticated user: Query real database records
    const dbData = await safeDbExecute(async () => {
      // 1. Profile
      const profile = await prisma.profile.findUnique({
        where: { id: userId },
        select: {
          level: true,
          totalXp: true,
          currentStreak: true,
          coins: true,
          minutesStudied: true,
        },
      });

      // 2. Study Plan
      const studyPlan = await prisma.studyPlan.findUnique({
        where: { userId },
        include: {
          dailyTasks: {
            where: {
              date: { gte: startOfToday },
            },
          },
        },
      });

      // 3. User vocabulary: Words learned today & SRS due words
      const wordsLearnedToday = await prisma.userVocabulary.count({
        where: {
          userId,
          lastPracticed: { gte: startOfToday },
        },
      });

      const srsDueCount = await prisma.userVocabulary.count({
        where: {
          userId,
          nextReview: { lte: new Date() },
        },
      });

      // 4. Daily skill practices (today and last 7 days)
      const practicesToday = await prisma.dailySkillPractice.findMany({
        where: {
          userId,
          date: todayStr,
        },
      });

      const practices7d = await prisma.dailySkillPractice.findMany({
        where: {
          userId,
          createdAt: { gte: sevenDaysAgo },
        },
      });

      // 5. Listening progress (find in-progress or next unstarted)
      const inProgressListening = await prisma.listeningProgress.findFirst({
        where: {
          userId,
          status: "IN_PROGRESS",
        },
        include: {
          lesson: true,
        },
        orderBy: {
          lastPracticedAt: "desc",
        },
      });

      let nextListeningLesson = null;
      if (!inProgressListening) {
        nextListeningLesson = await prisma.listeningLesson.findFirst({
          where: {
            progresses: {
              none: {
                userId,
                status: "COMPLETED",
              },
            },
          },
          orderBy: {
            orderIndex: "asc",
          },
        });
      }

      // 6. Grammar progress
      const completedGrammar = await prisma.grammarProgress.findMany({
        where: { userId },
        select: { topicId: true },
      });

      return {
        profile,
        studyPlan,
        wordsLearnedToday,
        srsDueCount,
        practicesToday,
        practices7d,
        inProgressListening,
        nextListeningLesson,
        completedGrammarTopics: new Set(completedGrammar.map((g) => g.topicId)),
      };
    }, "Get Chatbot DB Recommendations");

    // Compute metrics
    const userProfile = dbData?.profile || {
      level: 1,
      totalXp: 150,
      currentStreak: 1,
      coins: 100,
    };

    let listeningMinutesToday = 0;
    let speakingMinutesToday = 0;
    let grammarExercisesToday = 0;
    let isChestClaimedToday = false;
    let totalStudyMinutesToday = 0;

    dbData?.practicesToday?.forEach((p) => {
      totalStudyMinutesToday += p.minutes || 0;
      if (p.skill === "dictation" || p.skill === "writing") {
        listeningMinutesToday += p.minutes || 0;
      }
      if (p.skill === "speaking" || p.skill === "shadowing") {
        speakingMinutesToday += p.minutes || 0;
      }
      if (p.skill === "grammar") {
        grammarExercisesToday += 1;
      }
      if (p.skill === "challenge_claim_daily_chest" || p.skill === "roadmap_chest_claimed") {
        isChestClaimedToday = true;
      }
    });

    // Calculate weakest skill over last 7 days
    const skillMinutesMap: Record<string, number> = {
      dictation: 0,
      speaking: 0,
      vocab: 0,
      grammar: 0,
    };

    dbData?.practices7d?.forEach((p) => {
      if (skillMinutesMap[p.skill] !== undefined) {
        skillMinutesMap[p.skill] += p.minutes || 0;
      }
    });

    let weakestSkill = "speaking";
    let minMinutes = Infinity;
    for (const [skill, mins] of Object.entries(skillMinutesMap)) {
      if (mins < minMinutes) {
        minMinutes = mins;
        weakestSkill = skill;
      }
    }

    const skillLabels: Record<string, { label: string; link: string; advice: string }> = {
      speaking: {
        label: "Luyện phát âm & Shadowing",
        link: "/study/shadowing",
        advice: `7 ngày qua bạn mới luyện nói ${minMinutes} phút. Hãy luyện Shadowing để bứt phá phản xạ!`,
      },
      dictation: {
        label: "Luyện nghe Dictation",
        link: "/study/listening",
        advice: `7 ngày qua bạn mới luyện nghe ${minMinutes} phút. Hãy làm 1 bài nghe chép chính tả!`,
      },
      vocab: {
        label: "Mở rộng vốn từ vựng",
        link: "/vocabulary",
        advice: `Bạn mới tích lũy ${minMinutes} phút học từ. Hãy khám phá thêm 5 từ vựng mới!`,
      },
      grammar: {
        label: "Củng cố Ngữ pháp AI",
        link: "/study/grammar",
        advice: `Cần luyện thêm ngữ pháp để hạn chế bẫy đề thi và cải thiện độ chính xác câu.`,
      },
    };

    const weakestSkillInfo = skillLabels[weakestSkill] || skillLabels.speaking;

    // Daily Quests with real progress
    const questVocabCompleted = (dbData?.wordsLearnedToday || 0) >= 5;
    const questListeningCompleted = listeningMinutesToday >= 10;
    const questGrammarCompleted = grammarExercisesToday >= 1 || speakingMinutesToday >= 5;

    const completedQuestsCount =
      (questVocabCompleted ? 1 : 0) +
      (questListeningCompleted ? 1 : 0) +
      (questGrammarCompleted ? 1 : 0);

    const canClaimChest = completedQuestsCount >= 2 && !isChestClaimedToday;

    const dailyQuests = [
      {
        id: "quest_vocab",
        title: "Học 5 từ vựng mới",
        description: "Khám phá kho từ vựng và ghi nhớ từ mới",
        progress: Math.min(dbData?.wordsLearnedToday || 0, 5),
        target: 5,
        xpReward: 15,
        coinReward: 10,
        isCompleted: questVocabCompleted,
        link: "/vocabulary",
        icon: "📚",
      },
      {
        id: "quest_listening",
        title: "Luyện nghe Dictation 10 phút",
        description: "Luyện nghe chép từng câu chuẩn bản xứ",
        progress: Math.min(listeningMinutesToday, 10),
        target: 10,
        xpReward: 20,
        coinReward: 15,
        isCompleted: questListeningCompleted,
        link: "/study/listening",
        icon: "🎧",
      },
      {
        id: "quest_grammar",
        title: "Luyện ngữ pháp hoặc luyện nói",
        description: "Thực hành bài tập ngữ pháp hoặc phát âm Shadowing",
        progress: questGrammarCompleted ? 1 : 0,
        target: 1,
        xpReward: 20,
        coinReward: 15,
        isCompleted: questGrammarCompleted,
        link: "/study/grammar/present_simple",
        icon: "📖",
      },
    ];

    // Next Listening Lesson recommendation
    let nextListeningInfo = {
      lessonId: "preset_1",
      title: "Daily Routine & Morning Habits",
      category: "Conversations",
      progressText: "Chưa học",
      link: "/study/listening",
    };

    if (dbData?.inProgressListening) {
      const lesson = dbData.inProgressListening.lesson;
      const completedSentences = Array.isArray(dbData.inProgressListening.completedSentences)
        ? (dbData.inProgressListening.completedSentences as any[]).length
        : 0;
      nextListeningInfo = {
        lessonId: lesson.id,
        title: lesson.title,
        category: lesson.category,
        progressText: `Đang dở (${completedSentences} câu)`,
        link: `/study/listening?id=${lesson.id}`,
      };
    } else if (dbData?.nextListeningLesson) {
      const lesson = dbData.nextListeningLesson;
      nextListeningInfo = {
        lessonId: lesson.id,
        title: lesson.title,
        category: lesson.category,
        progressText: "Bài tiếp theo",
        link: `/study/listening?id=${lesson.id}`,
      };
    }

    // Next Grammar Topic recommendation
    const completedSet = dbData?.completedGrammarTopics || new Set();
    const commonGrammarTopics = [
      { id: "present_simple", title: "Thì Hiện tại đơn (Present Simple)" },
      { id: "past_simple", title: "Thì Quá khứ đơn (Past Simple)" },
      { id: "present_continuous", title: "Thì Hiện tại tiếp diễn (Present Continuous)" },
      { id: "present_perfect", title: "Thì Hiện tại hoàn thành (Present Perfect)" },
      { id: "passive_voice", title: "Câu bị động (Passive Voice)" },
    ];
    const nextGrammar =
      commonGrammarTopics.find((t) => !completedSet.has(t.id)) || commonGrammarTopics[0];

    return NextResponse.json({
      success: true,
      data: {
        user: {
          level: userProfile.level,
          totalXp: userProfile.totalXp,
          currentStreak: userProfile.currentStreak,
          coins: userProfile.coins,
        },
        targetGoal: {
          exam: dbData?.studyPlan?.targetExam || "TOEIC",
          score: dbData?.studyPlan?.targetScore || 750,
          currentLevel: dbData?.studyPlan?.currentLevel || "B1",
          weeklyHours: dbData?.studyPlan?.weeklyHours || 10,
          completionPercentage: Math.min(
            100,
            Math.round((completedQuestsCount / 3) * 100)
          ),
        },
        dailyQuests,
        rewardChest: {
          canClaim: canClaimChest,
          isClaimed: isChestClaimedToday,
          xpReward: 50,
          coinReward: 20,
        },
        recommendations: {
          weakestSkill: {
            skill: weakestSkill,
            label: weakestSkillInfo.label,
            minutes7d: minMinutes,
            advice: weakestSkillInfo.advice,
            link: weakestSkillInfo.link,
          },
          srsDue: {
            count: dbData?.srsDueCount || 0,
            advice:
              (dbData?.srsDueCount || 0) > 0
                ? `Bạn có ${dbData?.srsDueCount} từ vựng đến hạn ôn tập hôm nay!`
                : "Hàng đợi ôn tập sạch sẽ. Hãy tích cực học thêm từ mới!",
            link: (dbData?.srsDueCount || 0) > 0 ? "/review" : "/vocabulary",
          },
          nextListening: nextListeningInfo,
          nextGrammar: {
            topicId: nextGrammar.id,
            title: nextGrammar.title,
            advice: "Chuyên đề ngữ pháp cốt lõi cần làm chủ để tối đa điểm số.",
            link: `/study/grammar/${nextGrammar.id}`,
          },
          contextualTip: getContextualTip(pathname),
        },
        studySummary: {
          totalVocabLearned: dbData?.wordsLearnedToday || 0,
          studyTimeToday: totalStudyMinutesToday,
        },
      },
    });
  } catch (error: any) {
    console.error("GET /api/ai/chatbot/recommendations error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

function getContextualTip(pathname: string) {
  if (pathname.includes("/grammar")) {
    return {
      badge: "Ngữ Pháp AI",
      title: "Mẹo làm bài trắc nghiệm",
      description: "Sau khi nắm vững công thức, hãy hoàn thành 5 câu quiz AI để nhận +15 XP tức thì!",
      actionText: "Làm trắc nghiệm AI",
      link: pathname,
    };
  }
  if (pathname.includes("/myvideo")) {
    return {
      badge: "Video Studio",
      title: "Chép chính tả song ngữ",
      description: "Bật tab 'Dictation AI' ở cột phải để vừa nghe video vừa gõ chữ rèn phản xạ tai.",
      actionText: "Luyện Dictation",
      link: "/myvideo",
    };
  }
  if (pathname.includes("/vocabulary")) {
    return {
      badge: "Kho Từ Vựng",
      title: "Chu kỳ lặp lại ngắt quãng",
      description: "Bấm biểu tượng Ngôi sao ⭐ để lưu các từ khó vào hàng đợi ôn tập Spaced Repetition.",
      actionText: "Xem từ đã lưu",
      link: "/myvocab",
    };
  }
  if (pathname.includes("/study/listening")) {
    return {
      badge: "Dictation Focus",
      title: "Chống nhìn lén đáp án",
      description: "Nếu nghe chưa kịp, hãy dùng phím tắt Space để nghe lại trước khi mở hé phụ đề.",
      actionText: "Luyện nghe tiếp",
      link: pathname,
    };
  }
  return {
    badge: "Mục Tiêu Ngày",
    title: "Duy trì chuỗi Streak rực lửa",
    description: "Hoàn thành 2 trong 3 nhiệm vụ hôm nay để mở khóa Rương Thưởng +50 XP & +20 Coins!",
    actionText: "Khám phá bài học",
    link: "/vocabulary",
  };
}
