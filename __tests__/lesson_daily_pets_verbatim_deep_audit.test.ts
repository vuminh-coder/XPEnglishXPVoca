import { describe, it, expect } from "vitest";
import {
  LESSON_DAILY_PETS,
  QUIZ_DAILY_PETS,
} from "../features/listening/data/lessons/lesson_daily_pets";

describe("Daily English: Pets, Animals & Nature Conversation (575d216f-b275-468e-8a41-c3b26c0ac1ea) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Family Pet Buster: White Coat & Brown Spots (Segments 1-3)", () => {
    const segments = LESSON_DAILY_PETS.segments;
    expect(segments[0].orderIndex).toBe(1);
    expect(segments[0].text).toBe("Our family has a small dog with a white coat and brown spots.");
    expect(segments[0].keywords).toContain("white coat");
    expect(segments[0].keywords).toContain("brown spots");

    expect(segments[1].orderIndex).toBe(2);
    expect(segments[1].text).toBe("My son named our dog Buster.");
    expect(segments[1].properNouns).toContain("Buster");
    expect(segments[1].keywords).toContain("named");

    expect(segments[2].orderIndex).toBe(3);
    expect(segments[2].text).toBe("Buster and our children have a lot of fun together playing.");
    expect(segments[2].properNouns).toContain("Buster");
    expect(segments[2].keywords).toContain("together playing");
  });

  it("Audit 2: Indoor vs. Outdoor Play Habits (Segments 4-5)", () => {
    const segments = LESSON_DAILY_PETS.segments;
    expect(segments[3].orderIndex).toBe(4);
    expect(segments[3].text).toBe("Sometimes they play indoors, but most of the time they play outdoors.");
    expect(segments[3].keywords).toContain("indoors");
    expect(segments[3].keywords).toContain("outdoors");

    expect(segments[4].orderIndex).toBe(5);
    expect(segments[4].text).toBe("We love being outdoors as much as we can be.");
    expect(segments[4].keywords).toContain("love being outdoors");
  });

  it("Audit 3: Zoo Trip: Giraffes & Elephants (Segments 6-8)", () => {
    const segments = LESSON_DAILY_PETS.segments;
    expect(segments[5].orderIndex).toBe(6);
    expect(segments[5].text).toBe("Sometimes we go to the local zoo to see other animals.");
    expect(segments[5].keywords).toContain("local zoo");

    expect(segments[6].orderIndex).toBe(7);
    expect(segments[6].text).toBe("My daughter's favorite animal is the giraffe because it is tall and has a long neck.");
    expect(segments[6].keywords).toContain("giraffe");
    expect(segments[6].keywords).toContain("long neck");

    expect(segments[7].orderIndex).toBe(8);
    expect(segments[7].text).toBe("We also like watching the elephants.");
    expect(segments[7].keywords).toContain("elephants");
  });

  it("Audit 4: Forest Nature Walk: Trees, Flowers, Birds, Squirrels & Rabbits (Segments 9-11)", () => {
    const segments = LESSON_DAILY_PETS.segments;
    expect(segments[8].orderIndex).toBe(9);
    expect(segments[8].text).toBe("Another thing we like to do is take walks in the woods.");
    expect(segments[8].keywords).toContain("woods");

    expect(segments[9].orderIndex).toBe(10);
    expect(segments[9].text).toBe("There are many kinds of trees, wild flowers and birds.");
    expect(segments[9].keywords).toContain("wild flowers");
    expect(segments[9].keywords).toContain("birds");

    expect(segments[10].orderIndex).toBe(11);
    expect(segments[10].text).toBe("Sometimes we see squirrels and rabbits too.");
    expect(segments[10].keywords).toContain("squirrels");
    expect(segments[10].keywords).toContain("rabbits");
  });
});
