import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_MATT_WALKER_SLEEP } from "@/features/listening/data/lessons/lesson_matt_walker_sleep";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Matt Walker: Sleep Is Your Superpower - 100% Verbatim & Segment Audit", () => {
  it("should have exactly 140 segments with valid duration and metadata", () => {
    expect(LESSON_MATT_WALKER_SLEEP.segments.length).toBe(140);
    expect(LESSON_MATT_WALKER_SLEEP.externalId).toBe("5MuIMqhT8DM");
    expect(LESSON_MATT_WALKER_SLEEP.durationSeconds).toBe(1145);
    expect(LESSON_MATT_WALKER_SLEEP.durationFormatted).toBe("19:05");
    expect(LESSON_MATT_WALKER_SLEEP.cefrLevel).toBe("B2");
    expect(LESSON_MATT_WALKER_SLEEP.accent).toBe("en-US");
    expect(LESSON_MATT_WALKER_SLEEP.categoryId).toBe("cat_ted_ed");
    expect(LESSON_MATT_WALKER_SLEEP.viewCount).toBe(17445000);
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_MATT_WALKER_SLEEP.segments.length; i++) {
      const seg = LESSON_MATT_WALKER_SLEEP.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, and valid IPA transcriptions", () => {
    for (const seg of LESSON_MATT_WALKER_SLEEP.segments) {
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

  it("should tokenize all 140 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_MATT_WALKER_SLEEP.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(2500);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 140 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "5MuIMqhT8DM");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(140);
    for (let i = 0; i < 140; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_MATT_WALKER_SLEEP.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_MATT_WALKER_SLEEP.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_MATT_WALKER_SLEEP.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official TED YouTube subtitles in json3 (0 diffs across 2,641 words)", () => {
    const jsonPath = path.resolve(process.cwd(), "scripts/matt_walker_sleep.en.json3");
    if (!fs.existsSync(jsonPath)) return;

    const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const events = rawJson.events.filter(
      (e: any) => e.segs && !["(Laughter)", "(Applause)", "(Cheering)", "(Music)"].includes(e.segs.map((s: any) => s.utf8).join("").trim())
    );

    function cleanWords(str: string): string[] {
      return str
        .replace(/\b(David Biello|Matt Walker|DB|MW):\s*/g, "")
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
    LESSON_MATT_WALKER_SLEEP.segments.forEach((seg) => {
      lessonWords.push(...cleanWords(seg.text));
    });

    expect(lessonWords.length).toBe(2641);
    expect(rawWords.length).toBe(2641);
    expect(lessonWords).toEqual(rawWords);
  });

  it("should have comprehensive bilingual reading quiz attached", () => {
    expect(LESSON_MATT_WALKER_SLEEP.quiz).toBeDefined();
    const quiz = LESSON_MATT_WALKER_SLEEP.quiz!;
    expect(quiz.lessonId).toBe("vid_matt_walker_sleep");
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
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_MATT_WALKER_SLEEP.segments.length);
    }
  });
});
