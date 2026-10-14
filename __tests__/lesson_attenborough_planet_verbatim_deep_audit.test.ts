import { describe, it, expect } from "vitest";
import {
  LESSON_DAVID_ATTENBOROUGH_PLANET,
  QUIZ_DAVID_ATTENBOROUGH_PLANET,
} from "../features/listening/data/lessons/lesson_david_attenborough_planet";

describe("Sir David Attenborough: A Life on Our Planet (vid_david_attenborough_planet) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Introduction, 93 Years of Age & Extraordinary Life (Segments 1-4)", () => {
    const segments = LESSON_DAVID_ATTENBOROUGH_PLANET.segments;
    expect(segments[0].text).toBe("Tonight, we've got rather a different program for you.");
    expect(segments[0].orderIndex).toBe(1);
    expect(segments[0].keywords).toContain("rather a different");

    expect(segments[1].text).toBe("I am David Attenborough, and I am 93.");
    expect(segments[1].orderIndex).toBe(2);
    expect(segments[1].properNouns).toContain("David Attenborough");
    expect(segments[1].keywords).toContain("93");

    expect(segments[2].text).toBe("I've had the most extraordinary life.");
    expect(segments[2].orderIndex).toBe(3);
    expect(segments[2].keywords).toContain("extraordinary life");

    expect(segments[3].text).toBe("It's only now that I appreciate how extraordinary.");
    expect(segments[3].orderIndex).toBe(4);
    expect(segments[3].keywords).toContain("appreciate");
  });

  it("Audit 2: Spectacular Living World, Human Overrun & Taming the Wild (Segments 5-8)", () => {
    const segments = LESSON_DAVID_ATTENBOROUGH_PLANET.segments;
    expect(segments[4].text).toBe("The living world is a unique and spectacular marvel.");
    expect(segments[4].orderIndex).toBe(5);
    expect(segments[4].keywords).toContain("spectacular marvel");

    expect(segments[5].text).toBe("Yet the way we humans live on Earth is sending it into a decline.");
    expect(segments[5].orderIndex).toBe(6);
    expect(segments[5].properNouns).toContain("Earth");
    expect(segments[5].keywords).toContain("sending into a decline");

    expect(segments[6].text).toBe("Human beings have overrun the world.");
    expect(segments[6].orderIndex).toBe(7);
    expect(segments[6].keywords).toContain("overrun the world");

    expect(segments[7].text).toBe("We're replacing the wild with the tame.");
    expect(segments[7].orderIndex).toBe(8);
    expect(segments[7].keywords).toContain("the wild");
    expect(segments[7].keywords).toContain("the tame");
  });

  it("Audit 3: Witness Statement, Greatest Mistake & Opportunity to Put It Right (Segments 9-11)", () => {
    const segments = LESSON_DAVID_ATTENBOROUGH_PLANET.segments;
    expect(segments[8].text).toBe("This film is my witness statement and my vision for the future.");
    expect(segments[8].orderIndex).toBe(9);
    expect(segments[8].keywords).toContain("witness statement");
    expect(segments[8].keywords).toContain("vision for the future");

    expect(segments[9].text).toBe("The story of how we came to make this our greatest mistake.");
    expect(segments[9].orderIndex).toBe(10);
    expect(segments[9].keywords).toContain("greatest mistake");

    expect(segments[10].text).toBe("And how, if we act now, we can yet put it right.");
    expect(segments[10].orderIndex).toBe(11);
    expect(segments[10].keywords).toContain("act now");
    expect(segments[10].keywords).toContain("put it right");
  });

  it("Audit 4: Impending Disaster, Working With Nature & Solution Roadmap (Segments 12-14)", () => {
    const segments = LESSON_DAVID_ATTENBOROUGH_PLANET.segments;
    expect(segments[11].text).toBe("Our planet is headed for disaster.");
    expect(segments[11].orderIndex).toBe(12);
    expect(segments[11].keywords).toContain("headed for disaster");

    expect(segments[12].text).toBe("We need to learn how to work with nature, rather than against it.");
    expect(segments[12].orderIndex).toBe(13);
    expect(segments[12].keywords).toContain("work with nature");
    expect(segments[12].keywords).toContain("rather than against it");

    expect(segments[13].text).toBe("And I'm going to tell you how.");
    expect(segments[13].orderIndex).toBe(14);
    expect(segments[13].keywords).toContain("going to tell you");
  });
});
