import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_DAVID_ATTENBOROUGH_PLANET } from "@/features/listening/data/lessons/lesson_david_attenborough_planet";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("David Attenborough: A Life on Our Planet - 100% Verbatim Audit", () => {
  it("should have exactly 14 segments with valid duration and metadata", () => {
    expect(LESSON_DAVID_ATTENBOROUGH_PLANET.segments.length).toBe(14);
    expect(LESSON_DAVID_ATTENBOROUGH_PLANET.externalId).toBe("64R2MYUt394");
    expect(LESSON_DAVID_ATTENBOROUGH_PLANET.durationSeconds).toBe(99);
    expect(LESSON_DAVID_ATTENBOROUGH_PLANET.cefrLevel).toBe("B2");
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_DAVID_ATTENBOROUGH_PLANET.segments.length; i++) {
      const seg = LESSON_DAVID_ATTENBOROUGH_PLANET.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, and valid IPA transcriptions", () => {
    for (const seg of LESSON_DAVID_ATTENBOROUGH_PLANET.segments) {
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

  it("should tokenize all 14 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_DAVID_ATTENBOROUGH_PLANET.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(120);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 14 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "64R2MYUt394");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(14);
    for (let i = 0; i < 14; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_DAVID_ATTENBOROUGH_PLANET.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_DAVID_ATTENBOROUGH_PLANET.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_DAVID_ATTENBOROUGH_PLANET.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official YouTube subtitle events in json3 (0 diffs)", () => {
    const jsonPath = path.resolve(process.cwd(), "scripts/attenborough.en-US.json3");
    if (!fs.existsSync(jsonPath)) return;

    const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

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

    const rawTexts = rawJson.events.map((e: any) =>
      (e.segs || []).map((s: any) => s.utf8).join("").replace(/\n/g, " ").trim()
    );
    const rawWords = cleanWords(rawTexts.join(" "));

    const lessonWords = cleanWords(
      LESSON_DAVID_ATTENBOROUGH_PLANET.segments.map((s) => s.text).join(" ")
    );

    expect(lessonWords.length).toBe(rawWords.length);
    expect(lessonWords).toEqual(rawWords);
  });
});
