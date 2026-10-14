import { describe, it, expect } from "vitest";
import {
  LESSON_RATATOUILLE_ANTON_EGO,
  QUIZ_RATATOUILLE_ANTON_EGO,
} from "../features/listening/data/lessons/lesson_ratatouille_anton_ego";

describe("Ratatouille: Anton Ego's Food Critic Review (vid_ratatouille_anton_ego) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: The Nature of Criticism & Position of Power (Segments 1-3)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO.segments;
    // Segment 1 (orderIndex: 1)
    expect(segments[0].orderIndex).toBe(1);
    expect(segments[0].text).toBe("In many ways, the work of a critic is easy.");
    expect(segments[0].keywords).toContain("work of a critic");
    expect(segments[0].keywords).toContain("easy");

    // Segment 2 (orderIndex: 2)
    expect(segments[1].orderIndex).toBe(2);
    expect(segments[1].text).toBe(
      "We risk very little, yet enjoy a position over those who offer up their work and their selves to our judgment."
    );
    expect(segments[1].keywords).toContain("risk very little");
    expect(segments[1].keywords).toContain("offer up");

    // Segment 3 (orderIndex: 3)
    expect(segments[2].orderIndex).toBe(3);
    expect(segments[2].text).toBe(
      "We thrive on negative criticism, which is fun to write and to read."
    );
    expect(segments[2].keywords).toContain("thrive on");
    expect(segments[2].keywords).toContain("negative criticism");
  });

  it("Audit 2: The Bitter Truth & Defense of The New (Segments 4-7)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO.segments;
    // Segment 4 (orderIndex: 4)
    expect(segments[3].orderIndex).toBe(4);
    expect(segments[3].text).toBe(
      "But the bitter truth we critics must face, is that in the grand scheme of things,"
    );
    expect(segments[3].keywords).toContain("bitter truth");
    expect(segments[3].keywords).toContain("grand scheme of things");

    // Segment 5 (orderIndex: 5)
    expect(segments[4].orderIndex).toBe(5);
    expect(segments[4].text).toBe(
      "the average piece of junk is probably more meaningful than our criticism designating it so."
    );
    expect(segments[4].keywords).toContain("piece of junk");
    expect(segments[4].keywords).toContain("meaningful");

    // Segment 6 (orderIndex: 6)
    expect(segments[5].orderIndex).toBe(6);
    expect(segments[5].text).toBe(
      "But there are times when a critic truly risks something, and that is in the discovery and defense of the new."
    );
    expect(segments[5].keywords).toContain("truly risks");
    expect(segments[5].keywords).toContain("discovery and defense");

    // Segment 7 (orderIndex: 7)
    expect(segments[6].orderIndex).toBe(7);
    expect(segments[6].text).toBe(
      "The world is often unkind to new talent, new creations. The new needs friends."
    );
    expect(segments[6].keywords).toContain("unkind");
    expect(segments[6].keywords).toContain("new creations");
  });

  it("Audit 3: Rocked to The Core & Disdain for Gusteau's Motto (Segments 8-11)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO.segments;
    // Segment 8 (orderIndex: 8)
    expect(segments[7].orderIndex).toBe(8);
    expect(segments[7].text).toBe(
      "Last night, I experienced something new, an extraordinary meal from a singularly unexpected source."
    );
    expect(segments[7].keywords).toContain("extraordinary meal");
    expect(segments[7].keywords).toContain("singularly unexpected source");

    // Segment 9 (orderIndex: 9)
    expect(segments[8].orderIndex).toBe(9);
    expect(segments[8].text).toBe(
      "To say that both the meal and its maker have challenged my preconceptions about fine cooking is a gross understatement. They have rocked me to my core."
    );
    expect(segments[8].keywords).toContain("preconceptions");
    expect(segments[8].keywords).toContain("rocked me to my core");

    // Segment 10 (orderIndex: 10)
    expect(segments[9].orderIndex).toBe(10);
    expect(segments[9].text).toBe(
      "In the past, I have made no secret of my disdain for Chef Gusteau's famous motto: 'Anyone can cook.'"
    );
    expect(segments[9].properNouns).toContain("Chef Gusteau's");
    expect(segments[9].keywords).toContain("disdain");

    // Segment 11 (orderIndex: 11)
    expect(segments[10].orderIndex).toBe(11);
    expect(segments[10].text).toBe(
      "But I realize, only now do I truly understand what he meant."
    );
    expect(segments[10].keywords).toContain("only now do I understand");
  });

  it("Audit 4: Anyone Can Cook & Final Verdict on The Finest Chef in France (Segments 12-14)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO.segments;
    // Segment 12 (orderIndex: 12)
    expect(segments[11].orderIndex).toBe(12);
    expect(segments[11].text).toBe(
      "Not everyone can become a great artist, but a great artist can come from anywhere."
    );
    expect(segments[11].keywords).toContain("great artist");
    expect(segments[11].keywords).toContain("come from anywhere");

    // Segment 13 (orderIndex: 13)
    expect(segments[12].orderIndex).toBe(13);
    expect(segments[12].text).toBe(
      "It is difficult to imagine more humble origins than those of the genius now cooking at Gusteau's, who is, in this critic's opinion, nothing less than the finest chef in France."
    );
    expect(segments[12].properNouns).toContain("Gusteau's");
    expect(segments[12].properNouns).toContain("France");
    expect(segments[12].keywords).toContain("humble origins");
    expect(segments[12].keywords).toContain("finest chef in France");

    // Segment 14 (orderIndex: 14)
    expect(segments[13].orderIndex).toBe(14);
    expect(segments[13].text).toBe(
      "I will be returning to Gusteau's soon, hungry for more."
    );
    expect(segments[13].properNouns).toContain("Gusteau's");
    expect(segments[13].keywords).toContain("hungry for more");
  });
});
