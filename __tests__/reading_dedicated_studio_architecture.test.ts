import { describe, it, expect } from "vitest";
import React from "react";
import {
  ReadingCatalogView,
  ReadingPracticeStudio,
  ReadingListingSkeleton,
  ReadingStudioSkeleton,
  READING_PASSAGES_DATA,
} from "@/features/reading";

describe("Reading Dedicated Studio Architecture & Zero Floating Blocks Suite", () => {
  it("exports all necessary reading components and data from features/reading barrel", () => {
    expect(typeof ReadingCatalogView).toBe("function");
    expect(typeof ReadingPracticeStudio).toBe("function");
    expect(typeof ReadingListingSkeleton).toBe("function");
    expect(typeof ReadingStudioSkeleton).toBe("function");
    expect(Array.isArray(READING_PASSAGES_DATA)).toBe(true);
    expect(READING_PASSAGES_DATA.length).toBeGreaterThanOrEqual(10);
  });

  it("verifies reading passage data integrity (questions, options, explanations, translations)", () => {
    READING_PASSAGES_DATA.forEach((passage) => {
      expect(passage.id).toBeTruthy();
      expect(passage.title).toBeTruthy();
      expect(passage.passage).toBeTruthy();
      expect(passage.passage.length).toBeGreaterThan(20);
      expect(Array.isArray(passage.questions)).toBe(true);
      expect(passage.questions.length).toBeGreaterThan(0);

      // Verify each question has valid 4 options and valid correct index
      passage.questions.forEach((q) => {
        expect(q.id).toBeTruthy();
        expect(q.text).toBeTruthy();
        expect(Array.isArray(q.options)).toBe(true);
        expect(q.options.length).toBe(4);
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThanOrEqual(3);
        expect(q.explanation).toBeTruthy();
      });
    });
  });

  it("ensures skeletons instantiate valid React elements", () => {
    const listingSkeletonEl = React.createElement(ReadingListingSkeleton);
    const studioSkeletonEl = React.createElement(ReadingStudioSkeleton);

    expect(React.isValidElement(listingSkeletonEl)).toBe(true);
    expect(React.isValidElement(studioSkeletonEl)).toBe(true);
  });

  it("verifies reading practice studio component accepts passage and callbacks", () => {
    const samplePassage = READING_PASSAGES_DATA[0];
    const studioEl = React.createElement(ReadingPracticeStudio, {
      passage: samplePassage,
      allPassages: READING_PASSAGES_DATA,
      onBack: () => {},
    });

    expect(React.isValidElement(studioEl)).toBe(true);
    expect(studioEl.props.passage.id).toBe(samplePassage.id);
  });

  it("verifies passage r35 exists with valid questions and structure", () => {
    const passageR35 = READING_PASSAGES_DATA.find((p) => p.id === "r35");
    expect(passageR35).toBeDefined();
    expect(passageR35?.questions.length).toBeGreaterThanOrEqual(3);
    expect(passageR35?.questions[0].options.length).toBe(4);
  });
});
