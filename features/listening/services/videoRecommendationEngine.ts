import { prisma } from "@/infrastructure/database/prisma";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

export interface UserLearningProfile {
  userId?: string;
  cefrLevel: string; // A1, A2, B1, B2, C1, C2
  preferredAccent?: string; // en-US, en-GB, en-AU
  targetExam?: string; // TOEIC, IELTS, TOEFL, GENERAL
  targetDurationCategory?: "SHORT" | "MEDIUM" | "LONG" | "ANY"; // SHORT: <3m, MEDIUM: 3-7m, LONG: >7m
  weakKeywords?: string[];
  favoriteCategorySlugs?: string[];
}

export interface RecommendationFacetScore {
  facet: string;
  score: number;
  maxScore: number;
  description: string;
}

export interface VideoRecommendationItem {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  externalId: string;
  thumbnailUrl: string;
  durationSeconds: number;
  durationFormatted: string;
  cefrLevel: string;
  accent: string | null;
  category: {
    name: string;
    slug: string;
    icon?: string | null;
  } | null;
  totalSegments: number;
  viewCount: number;
  matchScore: number;
  matchPercentage: number;
  recommendationReason: string;
  facets: RecommendationFacetScore[];
}

const CEFR_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"];

/**
 * Calculates distance between two CEFR levels (0 = identical, 5 = furthest)
 */
export function getCefrDistance(levelA: string, levelB: string): number {
  const idxA = CEFR_ORDER.indexOf(levelA.toUpperCase());
  const idxB = CEFR_ORDER.indexOf(levelB.toUpperCase());
  if (idxA === -1 || idxB === -1) return 2; // Default moderate distance
  return Math.abs(idxA - idxB);
}

/**
 * Evaluates 8 Facets for a candidate VideoLesson against a learner profile:
 * 1. CEFR Level Match (Max 30 pts)
 * 2. Topic/Category Affinity (Max 20 pts)
 * 3. Duration Preference Match (Max 15 pts)
 * 4. Accent Compatibility (Max 10 pts)
 * 5. Weak Vocabulary Overlap (Max 25 pts)
 * 6. Novelty / Unstudied Bonus (Max 15 pts)
 * 7. Community Popularity (Max 10 pts)
 * 8. Content Freshness (Max 10 pts)
 * Total Max Score = 135 pts -> Normalized to 100% Match Percentage
 */
export function scoreVideoLesson(
  lesson: {
    id: string;
    title: string;
    cefrLevel: string;
    durationSeconds: number;
    accent?: string | null;
    viewCount?: number;
    createdAt?: Date;
    category?: { slug: string; name: string } | null;
    segments?: Array<{ keywords?: string[]; properNouns?: string[]; text?: string }>;
  },
  profile: UserLearningProfile,
  completedLessonIds: Set<string> = new Set()
): {
  totalScore: number;
  matchPercentage: number;
  reason: string;
  facets: RecommendationFacetScore[];
} {
  const facets: RecommendationFacetScore[] = [];

  // Facet 1: CEFR Level Match (0 - 30 pts)
  const cefrDist = getCefrDistance(lesson.cefrLevel, profile.cefrLevel);
  let cefrScore = 30;
  if (cefrDist === 1) cefrScore = 24; // Adjacent level (e.g., B1 -> B2 for challenge)
  else if (cefrDist === 2) cefrScore = 14;
  else if (cefrDist >= 3) cefrScore = 5;

  facets.push({
    facet: "CEFR Match",
    score: cefrScore,
    maxScore: 30,
    description: `Độ khớp trình độ ${profile.cefrLevel} vs ${lesson.cefrLevel} (${cefrDist === 0 ? "Chính xác" : "Cận kề"})`,
  });

  // Facet 2: Topic / Category Affinity (0 - 20 pts)
  let topicScore = 10; // Neutral baseline
  const categorySlug = lesson.category?.slug || "";
  if (profile.favoriteCategorySlugs?.includes(categorySlug)) {
    topicScore = 20;
  } else if (
    (profile.targetExam === "IELTS" && categorySlug === "ielts-listening") ||
    (profile.targetExam === "TOEIC" && categorySlug === "toeic-listening")
  ) {
    topicScore = 20;
  } else if (categorySlug === "ted-ed" || categorySlug === "daily-conversations") {
    topicScore = 14;
  }

  facets.push({
    facet: "Topic Affinity",
    score: topicScore,
    maxScore: 20,
    description: `Độ phù hợp chủ đề ${lesson.category?.name || "Tổng quát"}`,
  });

  // Facet 3: Duration Preference Match (0 - 15 pts)
  let durationScore = 12;
  const durationSec = lesson.durationSeconds || 0;
  if (profile.targetDurationCategory === "SHORT") {
    durationScore = durationSec <= 180 ? 15 : durationSec <= 360 ? 10 : 5;
  } else if (profile.targetDurationCategory === "MEDIUM") {
    durationScore = durationSec >= 180 && durationSec <= 420 ? 15 : 9;
  } else if (profile.targetDurationCategory === "LONG") {
    durationScore = durationSec > 420 ? 15 : 8;
  } else {
    // Default: sweet spot 3-6 minutes
    durationScore = durationSec >= 120 && durationSec <= 420 ? 15 : 11;
  }

  facets.push({
    facet: "Duration Fit",
    score: durationScore,
    maxScore: 15,
    description: `Thời lượng ${Math.round(durationSec / 60)} phút vừa vặn buổi học`,
  });

  // Facet 4: Accent Compatibility (0 - 10 pts)
  let accentScore = 8;
  if (profile.preferredAccent && lesson.accent) {
    if (lesson.accent.toLowerCase().includes(profile.preferredAccent.toLowerCase())) {
      accentScore = 10;
    } else {
      accentScore = 6;
    }
  }

  facets.push({
    facet: "Accent Fit",
    score: accentScore,
    maxScore: 10,
    description: `Chất giọng ${lesson.accent || "Standard English"}`,
  });

  // Facet 5: Weak Vocabulary Overlap (0 - 25 pts)
  let vocabOverlapScore = 5;
  let overlappingWords: string[] = [];
  if (profile.weakKeywords && profile.weakKeywords.length > 0 && lesson.segments) {
    const weakSet = new Set(profile.weakKeywords.map((w) => w.toLowerCase()));
    const allLessonWords: string[] = [];

    lesson.segments.forEach((seg) => {
      seg.keywords?.forEach((k) => allLessonWords.push(k.toLowerCase()));
      if (seg.text) {
        seg.text
          .toLowerCase()
          .split(/\s+/)
          .forEach((w) => {
            const clean = w.replace(/[^\w]/g, "");
            if (clean) allLessonWords.push(clean);
          });
      }
    });

    overlappingWords = Array.from(new Set(allLessonWords.filter((w) => weakSet.has(w))));
    if (overlappingWords.length >= 3) {
      vocabOverlapScore = 25;
    } else if (overlappingWords.length === 2) {
      vocabOverlapScore = 18;
    } else if (overlappingWords.length === 1) {
      vocabOverlapScore = 12;
    }
  }

  facets.push({
    facet: "Spaced Repetition Overlap",
    score: vocabOverlapScore,
    maxScore: 25,
    description:
      overlappingWords.length > 0
        ? `Chứa ${overlappingWords.length} từ vựng bạn đang cần củng cố (${overlappingWords.slice(0, 3).join(", ")})`
        : "Vốn từ vựng tương thích với lộ trình",
  });

  // Facet 6: Novelty / Unstudied Bonus (0 - 15 pts)
  const isCompleted = completedLessonIds.has(lesson.id);
  const noveltyScore = isCompleted ? 4 : 15;

  facets.push({
    facet: "Novelty Bonus",
    score: noveltyScore,
    maxScore: 15,
    description: isCompleted ? "Bài học đã hoàn thành (Ôn tập)" : "Bài học mới tinh chưa học",
  });

  // Facet 7: Community Popularity (0 - 10 pts)
  const views = lesson.viewCount || 0;
  const popularityScore = views > 500 ? 10 : views > 100 ? 8 : 6;

  facets.push({
    facet: "Community Popularity",
    score: popularityScore,
    maxScore: 10,
    description: `${views} học viên đã xem và luyện tập`,
  });

  // Facet 8: Content Freshness (0 - 10 pts)
  let freshnessScore = 8;
  if (lesson.createdAt) {
    const ageDays = (Date.now() - new Date(lesson.createdAt).getTime()) / (1000 * 3600 * 24);
    if (ageDays <= 14) freshnessScore = 10;
    else if (ageDays <= 60) freshnessScore = 8;
    else freshnessScore = 6;
  }

  facets.push({
    facet: "Content Freshness",
    score: freshnessScore,
    maxScore: 10,
    description: "Nội dung tuyển chọn cập nhật",
  });

  // Total Score Calculation
  const totalScore =
    cefrScore +
    topicScore +
    durationScore +
    accentScore +
    vocabOverlapScore +
    noveltyScore +
    popularityScore +
    freshnessScore;

  const MAX_POSSIBLE_SCORE = 135;
  const matchPercentage = Math.min(99, Math.max(60, Math.round((totalScore / MAX_POSSIBLE_SCORE) * 100)));

  // Generate Human-friendly recommendation rationale
  let reason = `Phù hợp ${matchPercentage}% với trình độ ${profile.cefrLevel}`;
  if (overlappingWords.length > 0) {
    reason = `Chứa ${overlappingWords.length} từ vựng bạn cần ôn luyện (${overlappingWords.slice(0, 2).join(", ")})`;
  } else if (cefrDist === 0 && topicScore >= 18) {
    reason = `Chuẩn trình độ ${profile.cefrLevel} & đúng chủ đề ${lesson.category?.name || "mục tiêu"}`;
  } else if (!isCompleted && durationScore >= 14) {
    reason = `Bài học mới ${Math.round(durationSec / 60)} phút vừa vặn lịch học hôm nay`;
  }

  return {
    totalScore,
    matchPercentage,
    reason,
    facets,
  };
}

/**
 * High-performance Video Recommendation Engine:
 * Fetches user profile, weak vocabulary from SM-2 store, and scores all active VideoLessons.
 */
export async function getSmartVideoRecommendations(
  userId?: string | null,
  limit: number = 6
): Promise<VideoRecommendationItem[]> {
  // 1. Fetch user learning profile & weak vocabulary if logged in
  let profile: UserLearningProfile = {
    cefrLevel: "B1",
    preferredAccent: "en-US",
    targetExam: "GENERAL",
    targetDurationCategory: "MEDIUM",
    weakKeywords: [],
    favoriteCategorySlugs: [],
  };

  const completedLessonIds = new Set<string>();

  if (userId && !userId.startsWith("guest_")) {
    try {
      const userProfile = await prisma.profile.findUnique({
        where: { id: userId },
        select: {
          level: true,
          title: true,
          studyPlan: {
            select: {
              currentLevel: true,
              targetExam: true,
            },
          },
          vocabularies: {
            where: {
              OR: [
                { repetitions: { lte: 2 } },
                { easeFactor: { lte: 2.2 } },
                { nextReview: { lte: new Date() } },
              ],
            },
            take: 30,
            select: {
              vocabulary: { select: { word: true } },
            },
          },
          listeningProgresses: {
            where: { status: "COMPLETED" },
            select: { lessonId: true },
          },
        },
      });

      if (userProfile) {
        if (userProfile.studyPlan?.currentLevel) {
          profile.cefrLevel = userProfile.studyPlan.currentLevel.toUpperCase();
        } else if (userProfile.level >= 5) {
          profile.cefrLevel = "B2";
        } else if (userProfile.level >= 3) {
          profile.cefrLevel = "B1";
        } else {
          profile.cefrLevel = "A2";
        }

        if (userProfile.studyPlan?.targetExam) {
          profile.targetExam = userProfile.studyPlan.targetExam.toUpperCase();
        }

        if (userProfile.vocabularies && userProfile.vocabularies.length > 0) {
          profile.weakKeywords = userProfile.vocabularies
            .map((v) => v.vocabulary?.word)
            .filter((w): w is string => Boolean(w));
        }

        userProfile.listeningProgresses?.forEach((lp) => completedLessonIds.add(lp.lessonId));
      }
    } catch (err) {
      console.warn("[RecommendationEngine] Error fetching user profile:", err);
    }
  }

  // 2. Fetch active VideoLessons with category and segment keywords
  const videoLessons = await prisma.videoLesson.findMany({
    include: {
      category: {
        select: { slug: true, name: true, icon: true },
      },
      segments: {
        select: { keywords: true, properNouns: true, text: true },
        take: 8,
      },
      _count: {
        select: { segments: true },
      },
    },
    take: 40,
    orderBy: { viewCount: "desc" },
  });

  let candidateLessons = videoLessons;
  if (!candidateLessons || candidateLessons.length === 0) {
    candidateLessons = MOCK_VIDEO_LESSONS.map((m) => ({
      id: m.id,
      slug: m.slug,
      title: m.title,
      description: m.description,
      externalId: m.externalId,
      thumbnailUrl: m.thumbnailUrl,
      durationSeconds: m.durationSeconds,
      durationFormatted: m.durationFormatted,
      cefrLevel: m.cefrLevel,
      accent: m.accent,
      viewCount: m.viewCount,
      category: { slug: m.categorySlug, name: m.categoryName, icon: "🎬" },
      segments: m.segments.map((s) => ({
        keywords: s.keywords || [],
        properNouns: s.properNouns || [],
        text: s.text,
      })),
      _count: { segments: m.segments.length },
    })) as any;
  }

  // 3. Compute 8-Facet Score for each lesson
  const scoredItems: VideoRecommendationItem[] = candidateLessons.map((l) => {
    const { totalScore, matchPercentage, reason, facets } = scoreVideoLesson(
      l,
      profile,
      completedLessonIds
    );

    return {
      id: l.id,
      slug: l.slug,
      title: l.title,
      description: l.description,
      externalId: l.externalId,
      thumbnailUrl: l.thumbnailUrl,
      durationSeconds: l.durationSeconds,
      durationFormatted: l.durationFormatted,
      cefrLevel: l.cefrLevel,
      accent: l.accent,
      category: l.category,
      totalSegments: l._count.segments,
      viewCount: l.viewCount,
      matchScore: totalScore,
      matchPercentage,
      recommendationReason: reason,
      facets,
    };
  });

  // 4. Sort by Match Score Descending and pick top N
  scoredItems.sort((a, b) => b.matchScore - a.matchScore);
  return scoredItems.slice(0, limit);
}
