import { describe, it, expect } from "vitest";
import { LESSON_KURZGESAGT_INTERSTELLAR } from "@/features/listening/data/lessons/lesson_kurzgesagt_interstellar";

describe("Kurzgesagt: How to Win an Interstellar War - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for Kurzgesagt How to Win an Interstellar War", () => {
    expect(LESSON_KURZGESAGT_INTERSTELLAR.id).toBe("88c4fc17-4445-46f4-82d4-c51fbb56e859");
    expect(LESSON_KURZGESAGT_INTERSTELLAR.externalId).toBe("tybKnGZRwcU");
    expect(LESSON_KURZGESAGT_INTERSTELLAR.slug).toBe("kurzgesagt-interstellar-war");
    expect(LESSON_KURZGESAGT_INTERSTELLAR.categoryId).toBe("cat_science_tech");
    expect(LESSON_KURZGESAGT_INTERSTELLAR.durationSeconds).toBe(286);
    expect(LESSON_KURZGESAGT_INTERSTELLAR.durationFormatted).toBe("04:46");
    expect(LESSON_KURZGESAGT_INTERSTELLAR.cefrLevel).toBe("B2");
    expect(LESSON_KURZGESAGT_INTERSTELLAR.accent).toBe("en-US");
  });

  it("should have exactly 58 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_KURZGESAGT_INTERSTELLAR.segments).toBeDefined();
    expect(LESSON_KURZGESAGT_INTERSTELLAR.segments.length).toBe(58);

    for (let i = 0; i < LESSON_KURZGESAGT_INTERSTELLAR.segments.length; i++) {
      const seg = LESSON_KURZGESAGT_INTERSTELLAR.segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.text.trim().length).toBeGreaterThan(0);
      expect(seg.translationVi.trim().length).toBeGreaterThan(0);
      expect(seg.explanationAi?.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs?.startsWith("/")).toBe(true);
      expect(seg.ipaUs?.endsWith("/")).toBe(true);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.properNouns).toBeDefined();
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount).toBeGreaterThan(0);

      // Verify tokenCount matches regex JS exactly
      const regexTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(regexTokens);
    }
  });

  it("should maintain chronological continuity across all 58 segments", () => {
    const segments = LESSON_KURZGESAGT_INTERSTELLAR.segments;
    let prevStartTime = -1;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = curr.startTime;
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_KURZGESAGT_INTERSTELLAR.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_KURZGESAGT_INTERSTELLAR.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_kurzgesagt_${i + 1}`);
      expect(q.questionEn?.length).toBeGreaterThan(15);
      expect(q.questionVi?.length).toBeGreaterThan(15);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanationEn?.length).toBeGreaterThan(20);
      expect(q.explanationVi?.length).toBeGreaterThan(20);
      expect(q.targetedConceptEn?.length).toBeGreaterThan(5);
      expect(q.targetedConceptVi?.length).toBeGreaterThan(5);
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(58);
    }
  });

  it("should cover key thematic vocabulary across segments and quiz", () => {
    const allText = LESSON_KURZGESAGT_INTERSTELLAR.segments.map((s) => s.text).join(" ").toLowerCase();
    expect(allText).toContain("kurzgesagt");
    expect(allText).toContain("smorpians");
    expect(allText).toContain("interstellar war");
    expect(allText).toContain("dyson swarm");
    expect(allText).toContain("star laser");
    expect(allText).toContain("speed of light");
    expect(allText).toContain("hd 40307");
    expect(allText).toContain("relativistic missile");
    expect(allText).toContain("ultra-relativistic");
    expect(allText).toContain("green light");
    expect(allText).toContain("sea of lava");
  });
});
