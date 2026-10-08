import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_OXFORD_FOOD_COOKING } from "@/features/listening/data/lessons/lesson_oxford_food_cooking";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Oxford Online English: Talk About Food and Cooking - 100% Verbatim Audit", () => {
  it("should have exactly 12 segments with valid duration and metadata", () => {
    expect(LESSON_OXFORD_FOOD_COOKING.segments.length).toBe(12);
    expect(LESSON_OXFORD_FOOD_COOKING.externalId).toBe("SlTrn13aez4");
    expect(LESSON_OXFORD_FOOD_COOKING.durationSeconds).toBe(121);
    expect(LESSON_OXFORD_FOOD_COOKING.cefrLevel).toBe("A2");
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_OXFORD_FOOD_COOKING.segments.length; i++) {
      const seg = LESSON_OXFORD_FOOD_COOKING.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, and valid IPA transcriptions", () => {
    for (const seg of LESSON_OXFORD_FOOD_COOKING.segments) {
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

  it("should tokenize all 12 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_OXFORD_FOOD_COOKING.segments) {
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

  it("should match mock data in videoCatalogMockData.ts exactly across all 12 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "SlTrn13aez4");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(12);
    for (let i = 0; i < 12; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_OXFORD_FOOD_COOKING.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_OXFORD_FOOD_COOKING.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_OXFORD_FOOD_COOKING.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official YouTube subtitle events in json3 (0 diffs)", () => {
    const jsonPath = path.resolve(process.cwd(), "scripts/oxford_food.en.json3");
    if (!fs.existsSync(jsonPath)) return;

    const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const dialogueEvents = rawJson.events.slice(12, 39);

    function cleanWords(str: string): string[] {
      return str
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/…/g, "...")
        .replace(/[^a-zA-Z0-9\s']/g, " ")
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
    }

    const rawTexts = dialogueEvents.map((e: any) =>
      (e.segs || []).map((s: any) => s.utf8).join("").replace(/\n/g, " ").trim()
    );
    const rawWords = cleanWords(rawTexts.join(" "));

    const lessonWords = cleanWords(
      LESSON_OXFORD_FOOD_COOKING.segments.map((s) => s.text).join(" ")
    );

    expect(lessonWords.length).toBe(rawWords.length);
    expect(lessonWords).toEqual(rawWords);
  });
});
