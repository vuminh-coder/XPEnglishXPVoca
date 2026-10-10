import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_JULIAN_TREASURE } from "@/features/listening/data/lessons/lesson_julian_treasure";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Julian Treasure: How to Speak So That People Want to Listen - 100% Verbatim Audit", () => {
  it("should have exactly 10 segments with valid duration and metadata", () => {
    expect(LESSON_JULIAN_TREASURE.segments.length).toBe(10);
    expect(LESSON_JULIAN_TREASURE.externalId).toBe("eIho2S0ZahI");
    expect(LESSON_JULIAN_TREASURE.durationSeconds).toBe(72);
    expect(LESSON_JULIAN_TREASURE.cefrLevel).toBe("B2");
    expect(LESSON_JULIAN_TREASURE.accent).toBe("en-GB");
    expect(LESSON_JULIAN_TREASURE.categoryId).toBe("cat_ted_ed");
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_JULIAN_TREASURE.segments.length; i++) {
      const seg = LESSON_JULIAN_TREASURE.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, valid IPA, and rich pedagogical metadata", () => {
    for (const seg of LESSON_JULIAN_TREASURE.segments) {
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

  it("should tokenize all 10 segments cleanly with zero empty tokens (177 tokens total)", () => {
    let totalTokens = 0;
    for (const seg of LESSON_JULIAN_TREASURE.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBe(177);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 10 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "eIho2S0ZahI");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(10);
    for (let i = 0; i < 10; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_JULIAN_TREASURE.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_JULIAN_TREASURE.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_JULIAN_TREASURE.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official TED YouTube subtitles in json3 (0 diffs)", () => {
    const jsonPath = path.resolve(process.cwd(), "scripts/julian_treasure.en.json3");
    if (!fs.existsSync(jsonPath)) return;

    const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const events = rawJson.events.filter(
      (e: any) => e.tStartMs >= 13900 && e.tStartMs < 72000 && e.segs
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
    LESSON_JULIAN_TREASURE.segments.forEach((seg) => {
      lessonWords.push(...cleanWords(seg.text));
    });

    expect(lessonWords.length).toBe(rawWords.length);
    expect(lessonWords).toEqual(rawWords);
  });

  it("should have comprehensive bilingual reading quiz attached", () => {
    expect(LESSON_JULIAN_TREASURE.quiz).toBeDefined();
    const quiz = LESSON_JULIAN_TREASURE.quiz!;
    expect(quiz.lessonId).toBe("vid_julian_treasure_speak");
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
    }
  });
});
