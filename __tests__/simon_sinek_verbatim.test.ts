import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_SIMON_SINEK } from "@/features/listening/data/lessons/lesson_simon_sinek";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Simon Sinek: How Great Leaders Inspire Action - 100% Master Verbatim Audit", () => {
  const masterPath = path.resolve(process.cwd(), "scripts/simon_sinek_master_segments.json");
  const masterSegments = JSON.parse(fs.readFileSync(masterPath, "utf8"));

  it("should have exactly 72 master segments with valid duration and metadata", () => {
    expect(LESSON_SIMON_SINEK.segments.length).toBe(72);
    expect(masterSegments.length).toBe(72);
    expect(LESSON_SIMON_SINEK.externalId).toBe("qp0HIF3SfI4");
    expect(LESSON_SIMON_SINEK.durationSeconds).toBe(350);
    expect(LESSON_SIMON_SINEK.durationFormatted).toBe("05:50");
    expect(LESSON_SIMON_SINEK.cefrLevel).toBe("B2");
  });

  it("should have chronological 1-indexed timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_SIMON_SINEK.segments.length; i++) {
      const seg = LESSON_SIMON_SINEK.segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, valid IPA, and rich pedagogical metadata", () => {
    for (const seg of LESSON_SIMON_SINEK.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.startsWith("/")).toBe(true);
      expect(seg.ipaUs!.endsWith("/")).toBe(true);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords!.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeDefined();
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("should tokenize all 72 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_SIMON_SINEK.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBe(885);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 72 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "qp0HIF3SfI4");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(72);
    for (let i = 0; i < 72; i++) {
      expect(mock?.segments[i].orderIndex).toBe(i + 1);
      expect(mock?.segments[i].text).toBe(LESSON_SIMON_SINEK.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_SIMON_SINEK.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_SIMON_SINEK.segments[i].endTime);
      expect(mock?.segments[i].ipaUs).toBe(LESSON_SIMON_SINEK.segments[i].ipaUs);
      expect(mock?.segments[i].translationVi).toBe(LESSON_SIMON_SINEK.segments[i].translationVi);
    }
  });

  it("should match 100% word-for-word against official TED YouTube subtitles in json3 (0 diffs across 929 words)", () => {
    const jsonPath = path.resolve(process.cwd(), "scripts/simon_sinek_ted.en.json3");
    if (!fs.existsSync(jsonPath)) return;

    const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const events = rawJson.events.filter(
      (e: any) => e.tStartMs >= 16000 && e.tStartMs <= 350100 && e.segs
    );

    function cleanWords(str: string): string[] {
      return (str.match(/\b[A-Za-z0-9_]+\b/g) || []).map((w) => w.toLowerCase());
    }

    const rawWords: string[] = [];
    events.forEach((e: any) => {
      const txt = e.segs.map((s: any) => s.utf8).join("").replace(/\n/g, " ");
      rawWords.push(...cleanWords(txt));
    });

    const lessonWords: string[] = [];
    LESSON_SIMON_SINEK.segments.forEach((seg) => {
      lessonWords.push(...cleanWords(seg.text));
    });

    expect(lessonWords.length).toBe(929);
    expect(rawWords.length).toBe(929);
    expect(lessonWords).toEqual(rawWords);
  });

  it("should have comprehensive bilingual reading quiz attached with valid 1-indexed references", () => {
    expect(LESSON_SIMON_SINEK.quiz).toBeDefined();
    const quiz = LESSON_SIMON_SINEK.quiz!;
    expect(quiz.lessonId).toBe("vid_simon_sinek_golden_circle");
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
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(72);
      const targetSeg = LESSON_SIMON_SINEK.segments.find(
        (s) => s.orderIndex === q.referenceSegmentIndex
      );
      expect(targetSeg).toBeDefined();
    }
  });
});
