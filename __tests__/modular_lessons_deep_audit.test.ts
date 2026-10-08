import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { MOCK_VIDEO_LESSONS, MOCK_VIDEO_CATEGORIES } from "@/features/listening/data/videoCatalogMockData";
import {
  ALL_MODULAR_LESSONS,
  LESSON_REWRITE_THE_STARS,
  LESSON_KURZGESAGT_INTERSTELLAR,
  LESSON_DAILY_PETS,
  LESSON_BBC_SUNKEN_SHIP,
  LESSON_STEVE_JOBS,
  LESSON_TED_BILINGUAL_BRAIN,
  LESSON_BBC_WHY_WE_LAUGH,
  LESSON_AIRPORT_CHECKIN,
  LESSON_NATGEO_RENEWABLE_ENERGY,
  LESSON_JENSEN_HUANG,
  LESSON_MATT_WALKER_SLEEP,
  LESSON_OXFORD_FOOD_COOKING,
  LESSON_DAVID_ATTENBOROUGH_PLANET,
  LESSON_CAREERVIDZ_INTERVIEW,
  LESSON_RATATOUILLE_ANTON_EGO,
  LESSON_PSYCHOLOGY_OF_MONEY,
} from "@/features/listening/data/lessons";

describe("Modular Lessons Architecture & Deep Data Integrity Audit (16 Diverse Lessons)", () => {
  const modularLessonsList = [
    { name: "Rewrite The Stars", lesson: LESSON_REWRITE_THE_STARS, expectedExtId: "pRfmrE0ToTo", expectedSegs: 18 },
    { name: "Kurzgesagt Interstellar", lesson: LESSON_KURZGESAGT_INTERSTELLAR, expectedExtId: "tybKnGZRwcU", expectedSegs: 21 },
    { name: "Daily Pets", lesson: LESSON_DAILY_PETS, expectedExtId: "AK42GhbTZ9w", expectedSegs: 11 },
    { name: "BBC Sunken Ship", lesson: LESSON_BBC_SUNKEN_SHIP, expectedExtId: "doOlP7NLUwc", expectedSegs: 13 },
    { name: "Steve Jobs Stanford", lesson: LESSON_STEVE_JOBS, expectedExtId: "UF8uR6Z6KLc", expectedSegs: 18 },
    { name: "TED-Ed Bilingual Brain", lesson: LESSON_TED_BILINGUAL_BRAIN, expectedExtId: "MMmOLN5zBLY", expectedSegs: 18 },
    { name: "BBC Why We Laugh", lesson: LESSON_BBC_WHY_WE_LAUGH, expectedExtId: "Fez57g8jMNM", expectedSegs: 18 },
    { name: "Airport Check-in", lesson: LESSON_AIRPORT_CHECKIN, expectedExtId: "bIz2Gzu3DKE", expectedSegs: 16 },
    { name: "NatGeo Renewable Energy", lesson: LESSON_NATGEO_RENEWABLE_ENERGY, expectedExtId: "1kUE0BZtTRc", expectedSegs: 25 },
    { name: "Jensen Huang Supercomputer", lesson: LESSON_JENSEN_HUANG, expectedExtId: "lpLFjQ-bRv8", expectedSegs: 10 },
    { name: "Matt Walker TED Sleep", lesson: LESSON_MATT_WALKER_SLEEP, expectedExtId: "5MuIMqhT8DM", expectedSegs: 12 },
    { name: "Oxford Food & Cooking", lesson: LESSON_OXFORD_FOOD_COOKING, expectedExtId: "SlTrn13aez4", expectedSegs: 12 },
    { name: "David Attenborough Planet", lesson: LESSON_DAVID_ATTENBOROUGH_PLANET, expectedExtId: "64R2MYUt394", expectedSegs: 14 },
    { name: "CareerVidz Job Interview", lesson: LESSON_CAREERVIDZ_INTERVIEW, expectedExtId: "ml8HHHgDxiE", expectedSegs: 12 },
    { name: "Ratatouille Anton Ego Review", lesson: LESSON_RATATOUILLE_ANTON_EGO, expectedExtId: "tAyQL1inris", expectedSegs: 14 },
    { name: "Psychology of Money Buffett", lesson: LESSON_PSYCHOLOGY_OF_MONEY, expectedExtId: "DOgVUMfcb7U", expectedSegs: 9 },
  ];

  it("should have exactly 16 separated lesson files loaded via ALL_MODULAR_LESSONS", () => {
    expect(ALL_MODULAR_LESSONS.length).toBe(16);
    expect(modularLessonsList.length).toBe(16);
  });

  it("should preserve 100% backward compatibility with MOCK_VIDEO_LESSONS aggregator", () => {
    expect(MOCK_VIDEO_LESSONS.length).toBe(16);
    for (let i = 0; i < 16; i++) {
      expect(MOCK_VIDEO_LESSONS[i].id).toBe(ALL_MODULAR_LESSONS[i].id);
      expect(MOCK_VIDEO_LESSONS[i].slug).toBe(ALL_MODULAR_LESSONS[i].slug);
      expect(MOCK_VIDEO_LESSONS[i].externalId).toBe(ALL_MODULAR_LESSONS[i].externalId);
      expect(MOCK_VIDEO_LESSONS[i].segments.length).toBe(ALL_MODULAR_LESSONS[i].segments.length);
    }
  });

  it("should ensure zero duplicate YouTube video IDs and zero duplicate slugs", () => {
    const videoIds = new Set();
    const slugs = new Set();
    for (const item of modularLessonsList) {
      expect(videoIds.has(item.lesson.externalId)).toBe(false);
      videoIds.add(item.lesson.externalId);

      expect(slugs.has(item.lesson.slug)).toBe(false);
      slugs.add(item.lesson.slug);
    }
    expect(videoIds.size).toBe(16);
    expect(slugs.size).toBe(16);
  });

  it("should validate all 11 categories and foreign key references", () => {
    expect(MOCK_VIDEO_CATEGORIES.length).toBe(11);
    const validCategoryIds = new Set(MOCK_VIDEO_CATEGORIES.map((c) => c.id));
    for (const item of modularLessonsList) {
      expect(validCategoryIds.has(item.lesson.categoryId)).toBe(true);
      expect(item.lesson.categorySlug.length).toBeGreaterThan(0);
      expect(item.lesson.categoryName.length).toBeGreaterThan(0);
    }
  });

  describe.each(modularLessonsList)(
    "Deep audit for $name ($expectedExtId)",
    ({ name, lesson, expectedExtId, expectedSegs }) => {
      it("should have valid root metadata schema", () => {
        expect(lesson.id.length).toBeGreaterThan(0);
        expect(lesson.slug.length).toBeGreaterThan(0);
        expect(lesson.title.length).toBeGreaterThan(0);
        expect(lesson.description.length).toBeGreaterThan(0);
        expect(lesson.sourceType).toBe("YOUTUBE");
        expect(lesson.externalId).toBe(expectedExtId);
        expect(lesson.externalId.length).toBe(11);
        expect(lesson.thumbnailUrl).toContain(expectedExtId);
        expect(lesson.durationSeconds).toBeGreaterThan(0);
        expect(lesson.durationFormatted).toMatch(/^\d{2}:\d{2}$/);
        expect(["A1", "A2", "B1", "B2", "C1", "C2"]).toContain(lesson.cefrLevel);
        expect(["DICTATION", "SHADOWING", "BOTH"]).toContain(lesson.supportedTypes);
        expect(lesson.wpmSpeed).toBeGreaterThan(0);
        expect(lesson.segments.length).toBe(expectedSegs);
      });

      it("should have chronologically valid segments with positive duration and no backwards jumps", () => {
        let prevStartTime = -1;
        for (let i = 0; i < lesson.segments.length; i++) {
          const seg = lesson.segments[i];
          expect(seg.startTime).toBeGreaterThanOrEqual(0);
          expect(seg.endTime).toBeGreaterThan(seg.startTime);
          const dur = seg.endTime - seg.startTime;
          expect(dur).toBeGreaterThanOrEqual(0.4);

          // Chronological check
          expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
          prevStartTime = seg.startTime;

          // No massive time gap between segments (> 30s)
          if (i > 0) {
            const gap = seg.startTime - lesson.segments[i - 1].endTime;
            expect(gap).toBeLessThanOrEqual(30);
          }
        }
      });

      it("should have complete verbatim text, Vietnamese translations, and IPA transcriptions", () => {
        for (const seg of lesson.segments) {
          expect(seg.text.trim().length).toBeGreaterThan(0);
          expect(seg.translationVi.trim().length).toBeGreaterThan(0);
          expect(seg.ipaUs).toBeDefined();
          expect(seg.ipaUs!.length).toBeGreaterThan(0);
          expect(Array.isArray(seg.properNouns || [])).toBe(true);
          expect(Array.isArray(seg.keywords || [])).toBe(true);
        }
      });

      it("should tokenize all segments cleanly with DictationWorkspace tokenizer", () => {
        let totalLessonWords = 0;
        for (const seg of lesson.segments) {
          const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
          expect(tokens.length).toBeGreaterThan(0);
          totalLessonWords += tokens.length;

          for (const token of tokens) {
            expect(token.clean.length).toBeGreaterThan(0);
            expect(token.dots.length).toBe(token.clean.length);
          }
        }
        expect(totalLessonWords).toBeGreaterThan(30);
      });
    }
  );
});
