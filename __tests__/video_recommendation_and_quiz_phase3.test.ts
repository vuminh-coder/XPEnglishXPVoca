import { describe, it, expect } from "vitest";
import {
  getCefrDistance,
  scoreVideoLesson,
  type UserLearningProfile,
} from "@/features/listening/services/videoRecommendationEngine";
import {
  generateContextualFallbackQuiz,
  type VideoQuizData,
} from "@/features/listening/services/videoComprehensionService";

describe("Phase 3 - Smart 8-Facets Recommendation Engine", () => {
  it("calculates accurate CEFR distance across levels", () => {
    expect(getCefrDistance("A1", "A1")).toBe(0);
    expect(getCefrDistance("A1", "A2")).toBe(1);
    expect(getCefrDistance("B1", "B2")).toBe(1);
    expect(getCefrDistance("A1", "C2")).toBe(5);
    expect(getCefrDistance("B2", "A1")).toBe(3);
  });

  it("calculates high match score for well-matched learner profile", () => {
    const candidateLesson = {
      id: "lesson_ted_101",
      title: "How to Build Consistent Habits in English",
      cefrLevel: "B2",
      durationSeconds: 320, // ~5.3 mins
      accent: "en-US",
      viewCount: 1500,
      createdAt: new Date(),
      category: { slug: "ted-ed", name: "TED-Ed & Tư duy" },
      segments: [
        {
          text: "Building consistency is key to master any discipline.",
          keywords: ["consistency", "discipline"],
          properNouns: [],
        },
        {
          text: "Procrastination will hinder long term fluency and confidence.",
          keywords: ["procrastination", "fluency"],
          properNouns: [],
        },
      ],
    };

    const learnerProfile: UserLearningProfile = {
      userId: "user_test_99",
      cefrLevel: "B2",
      favoriteCategorySlugs: ["ted-ed"],
      preferredAccent: "en-US",
      targetDurationCategory: "MEDIUM",
      weakKeywords: ["consistency", "procrastination", "fluency"],
    };

    const result = scoreVideoLesson(candidateLesson, learnerProfile, new Set());

    expect(result.totalScore).toBeGreaterThan(80);
    expect(result.matchPercentage).toBeGreaterThan(60);
    expect(result.facets.length).toBe(8);

    // Facet 1: Exact CEFR level -> max 30 pts
    const cefrFacet = result.facets.find((f) => f.facet === "CEFR Match");
    expect(cefrFacet?.score).toBe(30);

    // Facet 2: Topic Affinity -> 20 pts
    const topicFacet = result.facets.find((f) => f.facet === "Topic Affinity");
    expect(topicFacet?.score).toBe(20);

    // Facet 4: Accent Compatibility -> 10 pts
    const accentFacet = result.facets.find((f) => f.facet === "Accent Fit");
    expect(accentFacet?.score).toBe(10);

    // Facet 5: Weak vocabulary overlap bonus -> 25 pts
    const vocabFacet = result.facets.find((f) => f.facet === "Spaced Repetition Overlap");
    expect(vocabFacet?.score).toBeGreaterThan(15);

    // Personalized smart rationale
    expect(result.reason).toContain("từ vựng");
  });

  it("prioritizes unstudied lessons over completed ones via Novelty facet", () => {
    const candidateLesson = {
      id: "lesson_completed_01",
      title: "Completed English Video",
      cefrLevel: "B1",
      durationSeconds: 240,
      accent: "en-US",
      viewCount: 500,
      createdAt: new Date(),
      category: { slug: "daily-conversations", name: "Giao tiếp" },
    };

    const profile: UserLearningProfile = {
      cefrLevel: "B1",
    };

    const unstudiedResult = scoreVideoLesson(candidateLesson, profile, new Set());
    const unstudiedNovelty = unstudiedResult.facets.find((f) => f.facet === "Novelty Bonus");
    expect(unstudiedNovelty?.score).toBe(15);

    const completedIds = new Set(["lesson_completed_01"]);
    const completedResult = scoreVideoLesson(candidateLesson, profile, completedIds);
    const completedNovelty = completedResult.facets.find((f) => f.facet === "Novelty Bonus");
    expect(completedNovelty?.score).toBe(4);

    expect(unstudiedResult.totalScore).toBeGreaterThan(completedResult.totalScore);
  });
});

describe("Phase 3 - Contextual AI Fallback Reading Comprehension Quiz Generator", () => {
  const sampleSegments = [
    {
      orderIndex: 0,
      text: "The science of habit formation demonstrates that small micro-steps lead to permanent success.",
      translationVi: "Khoa học về hình thành thói quen chứng minh rằng các bước nhỏ dẫn đến thành công bền vững.",
      properNouns: ["James Clear"],
      keywords: ["habit formation", "micro-steps"],
    },
    {
      orderIndex: 1,
      text: "Practicing English fifteen minutes daily builds neural connections faster than studying once a week.",
      translationVi: "Luyện tập tiếng Anh 15 phút mỗi ngày xây dựng liên kết thần kinh nhanh hơn học một lần mỗi tuần.",
      properNouns: [],
      keywords: ["neural connections", "daily practice"],
    },
    {
      orderIndex: 2,
      text: "Therefore, steady repetition is vastly superior to sporadic cramming.",
      translationVi: "Do đó, sự lặp lại đều đặn vượt trội hơn nhiều so với việc học dồn dập thất thường.",
      properNouns: [],
      keywords: ["steady repetition", "cramming"],
    },
  ];

  it("generates deterministic, structured 3-question reading quiz from video segments", () => {
    const quiz: VideoQuizData = generateContextualFallbackQuiz(
      "video_lesson_101",
      "The Science of Micro-Habits",
      sampleSegments
    );

    expect(quiz.lessonId).toBe("video_lesson_101");
    expect(quiz.lessonTitle).toBe("The Science of Micro-Habits");
    expect(quiz.totalQuestions).toBe(3);
    expect(quiz.questions.length).toBe(3);
    expect(quiz.generatedBy).toBe("CONTEXTUAL_FALLBACK");
    expect(quiz.xpReward).toBe(25);

    for (const q of quiz.questions) {
      expect(q.id).toBeDefined();
      expect(q.question.length).toBeGreaterThan(15);
      expect(q.options).toHaveLength(4);
      expect(typeof q.correctAnswer).toBe("number");
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(10);
      expect(q.targetedConcept).toBeDefined();
    }

    // Question 1 tests main idea
    expect(quiz.questions[0].targetedConcept).toContain("Ý chính");
    // Question 2 tests detail / keywords (case-insensitive check)
    expect(quiz.questions[1].targetedConcept?.toLowerCase()).toContain("chi tiết");
    // Question 3 tests inference & conclusion
    expect(quiz.questions[2].targetedConcept?.toLowerCase()).toContain("suy luận");
  });

  it("handles video with single segment gracefully", () => {
    const singleSegment = [
      {
        orderIndex: 0,
        text: "Curiosity is the fundamental driving force of modern scientific discovery.",
        translationVi: "Sự tò mò là động lực cơ bản của khám phá khoa học hiện đại.",
        properNouns: ["Science"],
        keywords: ["curiosity", "discovery"],
      },
    ];

    const quiz = generateContextualFallbackQuiz("lesson_single", "Scientific Wonder", singleSegment);
    expect(quiz.questions.length).toBeGreaterThanOrEqual(1);
    expect(quiz.questions[0].options).toHaveLength(4);
    expect(quiz.questions[0].correctAnswer).toBe(0);
  });
});
