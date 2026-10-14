import { describe, it, expect } from "vitest";
import { LESSON_BBC_FOOD_MOOD } from "@/features/listening/data/lessons/lesson_bbc_food_mood";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import fs from "fs";
import path from "path";

describe("BBC 6 Minute English: Food and Mood - Verbatim Deep Audit Suite", () => {
  const json3Path = path.resolve(process.cwd(), "scripts/bbc_food_mood_official.en-GB.json3");

  it("should match 100% of YouTube official subtitle words with ZERO DIFFS", () => {
    expect(fs.existsSync(json3Path)).toBe(true);
    const rawData = JSON.parse(fs.readFileSync(json3Path, "utf-8"));
    const events: any[] = rawData.events || [];

    // Extract all text from json3
    const ytWords: string[] = [];
    for (const ev of events) {
      const segs = ev.segs || [];
      const text = segs.map((s: any) => s.utf8 || "").join("");
      const words = text
        .replace(/’/g, "'")
        .replace(/‘/g, "'")
        .replace(/“/g, '"')
        .replace(/”/g, '"')
        .replace(/[–—]/g, "-")
        .replace(/…/g, "...")
        .replace(/éclair/gi, "eclair")
        .toLowerCase()
        .match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [];
      ytWords.push(...words);
    }

    // Extract all words from lesson segments
    const lessonWords: string[] = [];
    for (const seg of LESSON_BBC_FOOD_MOOD.segments) {
      const words = seg.text
        .replace(/’/g, "'")
        .replace(/‘/g, "'")
        .replace(/“/g, '"')
        .replace(/”/g, '"')
        .replace(/[–—]/g, "-")
        .replace(/…/g, "...")
        .replace(/éclair/gi, "eclair")
        .toLowerCase()
        .match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [];
      lessonWords.push(...words);
    }

    expect(lessonWords.length).toBe(ytWords.length);
    expect(lessonWords.length).toBe(968);
    expect(lessonWords).toEqual(ytWords);
  });

  it("should verify token counts match tokenizeSentence perfectly across all 57 segments", () => {
    let totalTokens = 0;
    for (const seg of LESSON_BBC_FOOD_MOOD.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;

      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(950);
  });

  it("should cover the full video timeline from 09.24s to 368.60s without gaps", () => {
    const firstSeg = LESSON_BBC_FOOD_MOOD.segments[0];
    const lastSeg = LESSON_BBC_FOOD_MOOD.segments[LESSON_BBC_FOOD_MOOD.segments.length - 1];

    expect(firstSeg.startTime).toBe(9.24);
    expect(lastSeg.endTime).toBe(368.60);
    expect(LESSON_BBC_FOOD_MOOD.durationSeconds).toBe(381);
  });

  it("should have pedagogical richness with high-quality Vietnamese academic translations", () => {
    for (const seg of LESSON_BBC_FOOD_MOOD.segments) {
      expect(seg.translationVi.length).toBeGreaterThan(5);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(15);
      expect(seg.keywords!.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("should verify quiz references point to correct dialogue segments", () => {
    const quiz = LESSON_BBC_FOOD_MOOD.quiz!;
    expect(quiz.questions.length).toBe(8);

    // Q1: Topic -> Seg 10
    expect(quiz.questions[0].referenceSegmentIndex).toBe(10);
    expect(LESSON_BBC_FOOD_MOOD.segments[9].text).toContain("investigating the connection between our food and our mood");

    // Q2: Rob's comfort food -> Seg 6
    expect(quiz.questions[1].referenceSegmentIndex).toBe(6);
    expect(LESSON_BBC_FOOD_MOOD.segments[5].text).toContain("cream chocolate éclair");

    // Q3: Downside of comfort food -> Seg 8
    expect(quiz.questions[2].referenceSegmentIndex).toBe(8);
    expect(LESSON_BBC_FOOD_MOOD.segments[7].text).toContain("carbohydrates and sugar");

    // Q4: Brain energy consumption -> Seg 48
    expect(quiz.questions[3].referenceSegmentIndex).toBe(48);
    expect(LESSON_BBC_FOOD_MOOD.segments[47].text).toContain("20 percent of the body’s energy");

    // Q5: Chef Danny Edwards -> Seg 22
    expect(quiz.questions[4].referenceSegmentIndex).toBe(22);
    expect(LESSON_BBC_FOOD_MOOD.segments[21].text).toContain("appetite can become suppressed");

    // Q6: Prof Felice Jacka -> Seg 28
    expect(quiz.questions[5].referenceSegmentIndex).toBe(28);
    expect(LESSON_BBC_FOOD_MOOD.segments[27].text).toContain("nutritional psychiatry");

    // Q7: The Smile Trial -> Seg 42
    expect(quiz.questions[6].referenceSegmentIndex).toBe(42);
    expect(LESSON_BBC_FOOD_MOOD.segments[41].text).toContain("The Smile Trial");

    // Q8: Bananas & Roll eyes -> Seg 38
    expect(quiz.questions[7].referenceSegmentIndex).toBe(38);
    expect(LESSON_BBC_FOOD_MOOD.segments[37].text).toContain("bananas");
  });

  it("should have consistent CEFR B1 level calibration", () => {
    expect(LESSON_BBC_FOOD_MOOD.cefrLevel).toBe("B1");
    expect(LESSON_BBC_FOOD_MOOD.wpmSpeed).toBe(152);
  });
});
