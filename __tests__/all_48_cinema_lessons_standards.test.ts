import { describe, it, expect } from "vitest";
import {
  ALL_MODULAR_MOVIE_LESSONS,
  LESSONS_ROMANCE_CINEMA,
  LESSONS_INSPIRATIONAL_LIFE,
  LESSONS_CLASSIC_SITCOMS,
  LESSONS_ANIMATION_PIXAR_DISNEY,
} from "@/features/listening/data/topics";

describe("48 Cinema Video Lessons - Senior Tester Standards Compliance", () => {
  it("should have exactly 12 lessons in each of the 4 cinema categories (total 48)", () => {
    expect(LESSONS_ROMANCE_CINEMA.length).toBe(12);
    expect(LESSONS_INSPIRATIONAL_LIFE.length).toBe(12);
    expect(LESSONS_CLASSIC_SITCOMS.length).toBe(12);
    expect(LESSONS_ANIMATION_PIXAR_DISNEY.length).toBe(12);
    expect(ALL_MODULAR_MOVIE_LESSONS.length).toBe(48);
  });

  it("every lesson must have duration >= 300 seconds (at least 5 minutes)", () => {
    for (const lesson of ALL_MODULAR_MOVIE_LESSONS) {
      expect(
        lesson.durationSeconds,
        `Lesson [${lesson.id}] "${lesson.title}" duration (${lesson.durationSeconds}s) is < 300s!`
      ).toBeGreaterThanOrEqual(300);
    }
  });

  it("every lesson must have real view count >= 100,000 views", () => {
    for (const lesson of ALL_MODULAR_MOVIE_LESSONS) {
      expect(
        lesson.viewCount,
        `Lesson [${lesson.id}] "${lesson.title}" viewCount (${lesson.viewCount}) is < 100,000!`
      ).toBeGreaterThanOrEqual(100000);
    }
  });

  it("every lesson must have a valid 11-character YouTube video ID", () => {
    for (const lesson of ALL_MODULAR_MOVIE_LESSONS) {
      expect(lesson.externalId).toMatch(/^[a-zA-Z0-9_-]{11}$/);
      expect(lesson.sourceType).toBe("YOUTUBE");
    }
  });

  it("every lesson must contain at least 2 verbatim segments, strictly sorted by startTime", () => {
    for (const lesson of ALL_MODULAR_MOVIE_LESSONS) {
      expect(
        lesson.segments.length,
        `Lesson [${lesson.id}] "${lesson.title}" must have >= 2 segments!`
      ).toBeGreaterThanOrEqual(2);

      for (let i = 0; i < lesson.segments.length; i++) {
        const seg = lesson.segments[i];
        expect(seg.text.length).toBeGreaterThan(0);
        expect(seg.translationVi.length).toBeGreaterThan(0);
        expect(seg.orderIndex).toBe(i);

        if (i > 0) {
          expect(seg.startTime).toBeGreaterThanOrEqual(lesson.segments[i - 1].startTime);
        }
      }
    }
  });

  it("every lesson must have a comprehensive quiz with bilingual questions and options", () => {
    for (const lesson of ALL_MODULAR_MOVIE_LESSONS) {
      expect(lesson.quiz, `Lesson [${lesson.id}] "${lesson.title}" is missing quiz`).toBeDefined();
      if (lesson.quiz) {
        expect(lesson.quiz.questions.length).toBeGreaterThanOrEqual(1);

        for (const q of lesson.quiz.questions) {
          expect(q.question.length).toBeGreaterThan(0);
          expect(q.options.length).toBeGreaterThanOrEqual(2);
          expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
          expect(q.correctAnswer).toBeLessThan(q.options.length);
          expect(q.explanation.length).toBeGreaterThan(0);
        }
      }
    }
  });
});
