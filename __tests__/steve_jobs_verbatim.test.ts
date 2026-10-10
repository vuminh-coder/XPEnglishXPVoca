import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_STEVE_JOBS } from "@/features/listening/data/lessons/lesson_steve_jobs";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Steve Jobs: Stanford Commencement Speech - 100% Verbatim & Segment Audit", () => {
  it("should have exactly 18 segments with valid duration and metadata", () => {
    expect(LESSON_STEVE_JOBS.segments.length).toBe(18);
    expect(LESSON_STEVE_JOBS.externalId).toBe("UF8uR6Z6KLc");
    expect(LESSON_STEVE_JOBS.durationSeconds).toBe(173);
    expect(LESSON_STEVE_JOBS.cefrLevel).toBe("B2");
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_STEVE_JOBS.segments.length; i++) {
      const seg = LESSON_STEVE_JOBS.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, and valid IPA transcriptions", () => {
    for (const seg of LESSON_STEVE_JOBS.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords!.length).toBeGreaterThan(0);
    }
  });

  it("should tokenize all 18 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_STEVE_JOBS.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(200);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 18 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "UF8uR6Z6KLc");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(18);
    for (let i = 0; i < 18; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_STEVE_JOBS.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_STEVE_JOBS.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_STEVE_JOBS.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official YouTube Stanford speech subtitles in json3 (0 diffs across 388 words)", () => {
    const subPath = path.resolve(process.cwd(), "scripts/steve_jobs_official.en-eEY6OEpapPo.json3");
    if (!fs.existsSync(subPath)) return;

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const matchedEvents = sub.events.filter((e: any) => {
      const t = (e.tStartMs || 0) / 1000;
      return t >= 22.0 && t < 173.0 && e.segs;
    });

    function cleanWords(s: string): string[] {
      return s
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/--/g, " ")
        .replace(/—/g, " ")
        .replace(/['"]+/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
    }

    const offText = matchedEvents
      .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
      .join(" ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const offWords = cleanWords(offText);
    const lessonWords: string[] = [];
    LESSON_STEVE_JOBS.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

    expect(lessonWords.length).toBe(388);
    expect(offWords.length).toBe(388);
    expect(lessonWords).toEqual(offWords);
  });

  it("should have valid explanationAi and tokenCount across all 18 segments in lesson object", () => {
    expect(LESSON_STEVE_JOBS.segments.length).toBe(18);
    for (const seg of LESSON_STEVE_JOBS.segments) {
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("should have comprehensive bilingual reading comprehension quiz attached", () => {
    const quiz = LESSON_STEVE_JOBS.quiz;
    expect(quiz).toBeDefined();
    if (!quiz) return;

    expect(quiz.lessonId).toBe("0678a126-f94d-4930-81ce-ebe1e6731e7e");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(40);

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
