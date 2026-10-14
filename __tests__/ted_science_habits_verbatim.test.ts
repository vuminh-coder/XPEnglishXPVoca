import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_TED_SCIENCE_HABITS } from "@/features/listening/data/lessons/lesson_ted_science_habits";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("TED-Ed: The Science of Habits (wr6fQ4KpbRM) - 100% Verbatim Master Audit", () => {
  it("should have exactly 32 segments with valid duration and metadata", () => {
    expect(LESSON_TED_SCIENCE_HABITS.segments.length).toBe(32);
    expect(LESSON_TED_SCIENCE_HABITS.externalId).toBe("wr6fQ4KpbRM");
    expect(LESSON_TED_SCIENCE_HABITS.durationSeconds).toBe(303);
    expect(LESSON_TED_SCIENCE_HABITS.durationFormatted).toBe("05:03");
    expect(LESSON_TED_SCIENCE_HABITS.cefrLevel).toBe("B2");
    expect(LESSON_TED_SCIENCE_HABITS.accent).toBe("en-US");
    expect(LESSON_TED_SCIENCE_HABITS.categoryId).toBe("cat_ted_ed");
    expect(LESSON_TED_SCIENCE_HABITS.viewCount).toBe(1480637);
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_TED_SCIENCE_HABITS.segments.length; i++) {
      const seg = LESSON_TED_SCIENCE_HABITS.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, valid IPA, and rich pedagogical metadata", () => {
    for (const seg of LESSON_TED_SCIENCE_HABITS.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords!.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
    }
  });

  it("should tokenize all 32 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_TED_SCIENCE_HABITS.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(650);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 32 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "wr6fQ4KpbRM");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(32);
    for (let i = 0; i < 32; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_TED_SCIENCE_HABITS.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_TED_SCIENCE_HABITS.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_TED_SCIENCE_HABITS.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official TED-Ed YouTube subtitles in json3 (0 diffs across 713 words)", () => {
    const jsonPath = path.resolve(process.cwd(), "scripts/ted_science_habits.en.json3");
    if (!fs.existsSync(jsonPath)) return;

    const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const events = rawJson.events.filter(
      (e: any) => e.tStartMs >= 7000 && e.segs
    );

    function cleanWords(str: string): string[] {
      return str
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/--/g, " ")
        .replace(/['"]+/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
    }

    const rawWords: string[] = [];
    events.forEach((e: any) => {
      const txt = e.segs.map((s: any) => s.utf8).join("").replace(/\n/g, " ");
      rawWords.push(...cleanWords(txt));
    });

    const lessonWords: string[] = [];
    LESSON_TED_SCIENCE_HABITS.segments.forEach((seg) => {
      lessonWords.push(...cleanWords(seg.text));
    });

    expect(lessonWords.length).toBe(713);
    expect(rawWords.length).toBe(713);
    expect(lessonWords.length).toBe(rawWords.length);
    expect(lessonWords).toEqual(rawWords);
  });

  it("should have comprehensive bilingual reading quiz attached", () => {
    expect(LESSON_TED_SCIENCE_HABITS.quiz).toBeDefined();
    const quiz = LESSON_TED_SCIENCE_HABITS.quiz!;
    expect(quiz.lessonId).toBe("vid_ted_science_habits");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(40);
    expect(quiz.questions.length).toBe(8);

    for (const q of quiz.questions) {
      expect(q.id.length).toBeGreaterThan(0);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi!.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_TED_SCIENCE_HABITS.segments.length);
    }
  });
});
