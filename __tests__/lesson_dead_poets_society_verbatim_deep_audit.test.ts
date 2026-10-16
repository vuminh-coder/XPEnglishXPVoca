import { describe, it, expect } from "vitest";
import {
  LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN,
  QUIZ_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN,
} from "../features/listening/data/lessons/movies/inspirational/lesson_dead_poets_society";

describe("Dead Poets Society: Robin Williams 'Rip It Out' (mov_insp_03) - Verbatim Deep Audit Suite", () => {
  const segments = LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN.segments;

  it("Test 1: Verbatim Audit of Opening Classroom Invitation (Segments 0-2)", () => {
    expect(segments[0].text).toBe("Gentlemen, open your text to page 21 of the introduction.");
    expect(segments[1].text).toBe(
      "Mr. Perry, will you read the opening paragraph of the preface entitled 'Understanding Poetry'?"
    );
    expect(segments[1].properNouns).toContain("Perry");

    expect(segments[2].text).toBe("'Understanding Poetry' by Dr. J. Evans Pritchard, Ph.D.");
    expect(segments[2].properNouns).toContain("Pritchard");
  });

  it("Test 2: Verbatim Audit of Pritchard's Mathematical Poetry Measurement (Segments 3-14)", () => {
    expect(segments[3].text).toBe(
      "To fully understand poetry, we must first be fluent with its meter, rhyme, and figures of speech, then ask two questions:"
    );
    expect(segments[4].text).toBe("One: How artfully has the objective of the poem been rendered?");
    expect(segments[5].text).toBe("And two: How important is that objective?");
    expect(segments[6].text).toBe(
      "Question one rates the poem's perfection; question two rates its importance."
    );
    expect(segments[7].text).toBe(
      "And once these questions have been answered, determining the poem's greatness becomes a relatively simple matter."
    );
    expect(segments[8].text).toBe(
      "If the poem's score for perfection is plotted on the horizontal of a graph and its importance is plotted on the vertical,"
    );
    expect(segments[9].text).toBe(
      "then calculating the total area of the poem yields the measure of its greatness."
    );

    // Byron and Shakespeare sonnets
    expect(segments[10].text).toBe(
      "A sonnet by Byron might score high on the vertical, but only average on the horizontal."
    );
    expect(segments[10].properNouns).toContain("Byron");

    expect(segments[11].text).toBe(
      "A Shakespearean sonnet, on the other hand, would score high both horizontally and vertically, yielding a massive total area,"
    );
    expect(segments[11].properNouns).toContain("Shakespearean");

    expect(segments[12].text).toBe("thereby revealing the poem to be truly great.");
    expect(segments[13].text).toBe(
      "As you proceed through the poetry in this book, practice this rating method."
    );
    expect(segments[14].text).toBe(
      "As your ability to evaluate poems in this manner grows, so will your enjoyment and understanding of poetry."
    );
  });

  it("Test 3: Verbatim Audit of Keating's Outrage & American Bandstand Satire (Segments 15-19)", () => {
    expect(segments[15].text).toBe("Excrement!");
    expect(segments[16].text).toBe("That's what I think of Mr. J. Evans Pritchard.");
    expect(segments[16].properNouns).toContain("Pritchard");

    expect(segments[17].text).toBe("We're not laying pipe! We're talking about poetry.");
    expect(segments[18].text).toBe("How can you describe poetry like American Bandstand?");
    expect(segments[18].properNouns).toContain("American Bandstand");

    expect(segments[19].text).toBe("'I like Byron, I give him a 42, but I can't dance to it'?");
    expect(segments[19].properNouns).toContain("Byron");
  });

  it("Test 4: Verbatim Audit of The Page-Ripping Revolution (Segments 20-31)", () => {
    expect(segments[20].text).toBe("Now I want you to rip out that page.");
    expect(segments[21].text).toBe("Go on, rip out the entire page!");
    expect(segments[22].text).toBe("You hear me? Rip it out! Rip it out!");
    expect(segments[23].text).toBe("Come on, rip it out!");

    expect(segments[24].text).toBe("Thank you, Mr. Dalton.");
    expect(segments[24].properNouns).toContain("Dalton");

    expect(segments[25].text).toBe(
      "Gentlemen, tell you what: don't just tear out that page, tear out the entire introduction!"
    );
    expect(segments[26].text).toBe("I want it gone! History! Leave nothing of it!");
    expect(segments[27].text).toBe("Rip it out! Be gone, J. Evans Pritchard, Ph.D.!");
    expect(segments[27].properNouns).toContain("Pritchard");

    expect(segments[28].text).toBe(
      "Shred it, tear it, rip it out! I want to hear nothing but the ripping of Mr. Pritchard!"
    );
    expect(segments[29].text).toBe("Is that the Bible? You're not going to go to hell for this!");
    expect(segments[29].properNouns).toContain("Bible");

    expect(segments[30].text).toBe("Make a clean tear! I want nothing left of it!");
    expect(segments[31].text).toBe("Rip it out!");
  });

  it("Test 5: Verbatim Audit of Mr. McAllister Encounter & War for Hearts and Souls (Segments 32-46)", () => {
    expect(segments[32].text).toBe("I don't hear enough rips!");
    expect(segments[33].text).toBe("What the hell is going on here?");

    expect(segments[34].text).toBe("Mr. McAllister!");
    expect(segments[34].properNouns).toContain("McAllister");

    expect(segments[35].text).toBe("I'm sorry, I... I didn't know you were here.");
    expect(segments[36].text).toBe("I am.");
    expect(segments[37].text).toBe("Ah, so you are. Excuse me.");

    expect(segments[38].text).toBe(
      "Keep ripping, gentlemen! This is a battle, a war, and the casualties could be your hearts and souls."
    );
    expect(segments[39].text).toBe(
      "Armies of academics going forward measuring poetry... No, we'll not have that here! No more Mr. J. Evans Pritchard."
    );
    expect(segments[39].properNouns).toContain("Pritchard");

    expect(segments[40].text).toBe("Now in my class, you will learn to think for yourselves again.");
    expect(segments[41].text).toBe("You will learn to savor words and language.");
    expect(segments[42].text).toBe("No matter what anybody tells you, words and ideas can change the world.");

    expect(segments[43].text).toContain("Mr. Pitts' eye");
    expect(segments[43].properNouns).toContain("Pitts");

    expect(segments[44].text).toContain("Mr. Hopkins");
    expect(segments[44].properNouns).toContain("Hopkins");
    expect(segments[44].properNouns).toContain("Pritchard");

    expect(segments[45].text).toBe("'and go quietly about the business of achieving other ambitions.'");
    expect(segments[46].text).toBe("I have a little secret for you. Huddle up! Huddle up!");
  });

  it("Test 6: Verbatim Audit of Passion, The Human Race & Noble Pursuits (Segments 47-51)", () => {
    expect(segments[47].text).toBe("We don't read and write poetry because it's cute.");
    expect(segments[48].text).toBe(
      "We read and write poetry because we are members of the human race."
    );
    expect(segments[49].text).toBe("And the human race is filled with passion.");
    expect(segments[50].text).toBe(
      "Medicine, law, business, engineering, these are noble pursuits and necessary to sustain life."
    );
    expect(segments[51].text).toBe(
      "But poetry, beauty, romance, love, these are what we stay alive for."
    );
  });

  it("Test 7: Verbatim Audit of Walt Whitman's O Me! O Life! & 'What will your verse be?' (Segments 52-58)", () => {
    expect(segments[52].text).toBe(
      "To quote from Whitman: 'O me! O life!... of the questions of these recurring;'"
    );
    expect(segments[52].properNouns).toContain("Whitman");

    expect(segments[53].text).toBe(
      "'Of the endless trains of the faithless, of cities filled with the foolish...'"
    );
    expect(segments[54].text).toBe("'What good amid these, O me, O life?'");
    expect(segments[55].text).toBe("Answer: That you are here — that life exists, and identity;");
    expect(segments[56].text).toBe(
      "that the powerful play goes on, and you may contribute a verse."
    );
    expect(segments[57].text).toBe(
      "That the powerful play goes on, and you may contribute a verse."
    );
    expect(segments[58].text).toBe("What will your verse be?");

    // Quiz cross-reference audit (1-indexed)
    const quiz = QUIZ_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN;
    for (const q of quiz.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(segments.length);
      const targetSeg = segments[q.referenceSegmentIndex! - 1];
      expect(targetSeg).toBeDefined();
      expect(targetSeg.orderIndex).toBe(q.referenceSegmentIndex);
      expect(targetSeg.text.length).toBeGreaterThan(0);
    }
  });
});
