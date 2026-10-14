import { describe, it, expect } from "vitest";
import {
  LESSON_STEVE_JOBS,
  QUIZ_STEVE_JOBS,
} from "../features/listening/data/lessons/lesson_steve_jobs";

describe("Steve Jobs: Stanford Commencement Address (0678a126-f94d-4930-81ce-ebe1e6731e7e) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Opening Address, College Graduation & Three Stories (Segments 1-3)", () => {
    const segments = LESSON_STEVE_JOBS.segments;
    // Segment 1 (orderIndex: 1)
    expect(segments[0].orderIndex).toBe(1);
    expect(segments[0].text).toBe(
      "Thank you. I am honored to be with you today at your commencement from one of the finest universities in the world."
    );
    expect(segments[0].properNouns).toContain("Stanford");
    expect(segments[0].keywords).toContain("commencement");

    // Segment 2 (orderIndex: 2)
    expect(segments[1].orderIndex).toBe(2);
    expect(segments[1].text).toBe(
      "Truth be told, I never graduated from college, and this is the closest I've ever gotten to a college graduation."
    );
    expect(segments[1].keywords).toContain("truth be told");
    expect(segments[1].keywords).toContain("college graduation");

    // Segment 3 (orderIndex: 3)
    expect(segments[2].orderIndex).toBe(3);
    expect(segments[2].text).toBe(
      "Today I want to tell you three stories from my life. That's it. No big deal. Just three stories."
    );
    expect(segments[2].keywords).toContain("three stories");
    expect(segments[2].keywords).toContain("no big deal");
  });

  it("Audit 2: First Story: Connecting the Dots & Dropping Out of Reed College (Segments 4-6)", () => {
    const segments = LESSON_STEVE_JOBS.segments;
    // Segment 4 (orderIndex: 4)
    expect(segments[3].orderIndex).toBe(4);
    expect(segments[3].text).toBe("The first story is about connecting the dots.");
    expect(segments[3].keywords).toContain("connecting the dots");

    // Segment 5 (orderIndex: 5)
    expect(segments[4].orderIndex).toBe(5);
    expect(segments[4].text).toBe(
      "I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit."
    );
    expect(segments[4].properNouns).toContain("Reed College");
    expect(segments[4].keywords).toContain("dropped out");
    expect(segments[4].keywords).toContain("drop-in");

    // Segment 6 (orderIndex: 6)
    expect(segments[5].orderIndex).toBe(6);
    expect(segments[5].text).toBe("So why did I drop out? It started before I was born.");
    expect(segments[5].keywords).toContain("drop out");
  });

  it("Audit 3: The Adoption Saga: Biological Mother, Lawyer & Working-class Parents (Segments 7-12)", () => {
    const segments = LESSON_STEVE_JOBS.segments;
    // Segment 7 (orderIndex: 7)
    expect(segments[6].orderIndex).toBe(7);
    expect(segments[6].text).toBe(
      "My biological mother was a young, unwed graduate student, and she decided to put me up for adoption."
    );
    expect(segments[6].keywords).toContain("biological mother");
    expect(segments[6].keywords).toContain("adoption");

    // Segment 8 (orderIndex: 8)
    expect(segments[7].orderIndex).toBe(8);
    expect(segments[7].text).toBe(
      "She felt very strongly that I should be adopted by college graduates, so everything was all set for me to be adopted at birth by a lawyer and his wife."
    );
    expect(segments[7].keywords).toContain("college graduates");
    expect(segments[7].keywords).toContain("lawyer and his wife");

    // Segment 9 (orderIndex: 9)
    expect(segments[8].orderIndex).toBe(9);
    expect(segments[8].text).toBe(
      "Except that when I popped out, they decided at the last minute that they really wanted a girl."
    );
    expect(segments[8].keywords).toContain("popped out");
    expect(segments[8].keywords).toContain("last minute");

    // Segment 10 (orderIndex: 10)
    expect(segments[9].orderIndex).toBe(10);
    expect(segments[9].text).toBe(
      "So my parents, who were on a waiting list, got a call in the middle of the night asking: 'We have an unexpected baby boy; do you want him?'"
    );
    expect(segments[9].keywords).toContain("waiting list");
    expect(segments[9].keywords).toContain("unexpected baby boy");

    // Segment 11 (orderIndex: 11)
    expect(segments[10].orderIndex).toBe(11);
    expect(segments[10].text).toBe(
      "They said: 'Of course.' My biological mother later found out that my mother had never graduated from college and that my father had never graduated from high school."
    );
    expect(segments[10].keywords).toContain("never graduated");
    expect(segments[10].keywords).toContain("high school");

    // Segment 12 (orderIndex: 12)
    expect(segments[11].orderIndex).toBe(12);
    expect(segments[11].text).toBe(
      "She refused to sign the final adoption papers. She only relented a few months later when my parents promised that I would go to college."
    );
    expect(segments[11].keywords).toContain("refused to sign");
    expect(segments[11].keywords).toContain("relented");
    expect(segments[11].keywords).toContain("go to college");
  });

  it("Audit 4: Choosing Expensive College, Dropping Out & The Best Decision Ever (Segments 13-18)", () => {
    const segments = LESSON_STEVE_JOBS.segments;
    // Segment 13 (orderIndex: 13)
    expect(segments[12].orderIndex).toBe(13);
    expect(segments[12].text).toBe("This was the start in my life.");
    expect(segments[12].keywords).toContain("start in my life");

    // Segment 14 (orderIndex: 14)
    expect(segments[13].orderIndex).toBe(14);
    expect(segments[13].text).toBe(
      "And 17 years later I did go to college, but I naively chose a college that was almost as expensive as Stanford, and all of my working-class parents' savings were being spent on my college tuition."
    );
    expect(segments[13].properNouns).toContain("Stanford");
    expect(segments[13].keywords).toContain("naively");
    expect(segments[13].keywords).toContain("working-class");
    expect(segments[13].keywords).toContain("college tuition");

    // Segment 15 (orderIndex: 15)
    expect(segments[14].orderIndex).toBe(15);
    expect(segments[14].text).toBe(
      "After six months, I couldn't see the value in it. I had no idea what I wanted to do with my life, and no idea how college was going to help me figure it out."
    );
    expect(segments[14].keywords).toContain("see the value");
    expect(segments[14].keywords).toContain("figure it out");

    // Segment 16 (orderIndex: 16)
    expect(segments[15].orderIndex).toBe(16);
    expect(segments[15].text).toBe(
      "And here I was, spending all of the money my parents had saved their entire life."
    );
    expect(segments[15].keywords).toContain("spending all of the money");

    // Segment 17 (orderIndex: 17)
    expect(segments[16].orderIndex).toBe(17);
    expect(segments[16].text).toBe(
      "So I decided to drop out and trust that it would all work out OK."
    );
    expect(segments[16].keywords).toContain("decided to drop out");
    expect(segments[16].keywords).toContain("work out OK");

    // Segment 18 (orderIndex: 18)
    expect(segments[17].orderIndex).toBe(18);
    expect(segments[17].text).toBe(
      "It was pretty scary at the time, but looking back it was one of the best decisions I ever made."
    );
    expect(segments[17].keywords).toContain("pretty scary");
    expect(segments[17].keywords).toContain("looking back");
    expect(segments[17].keywords).toContain("best decisions");
  });
});
