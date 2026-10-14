import { describe, it, expect } from "vitest";
import {
  LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
  QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
} from "../features/listening/data/lessons/movies/animation/lesson_the_lion_king";

describe("The Lion King: Rafiki, Timon & Pumbaa 'Hakuna Matata & The Past Can Hurt' (mov_ani_08) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Mufasa's Royal Solar Wisdom & Lesson Opening (Segments 0-4)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments[0].text).toBe("Look, Simba. Everything the light touches is our kingdom.");
    expect(segments[0].properNouns).toContain("Simba");

    expect(segments[1].text).toBe("A king's time as ruler rises and falls like the sun.");
    expect(segments[1].keywords).toEqual(expect.arrayContaining(["ruler", "rises and falls", "like the sun"]));

    expect(segments[2].text).toBe("One day, Simba, the sun will set on my time here, and will rise with you as the new king.");
    expect(segments[2].keywords).toContain("sun will set");

    expect(segments[3].text).toContain("Welcome to Learn English with TV Series");
    expect(segments[3].properNouns).toEqual(expect.arrayContaining(["Disney", "The Lion King"]));

    expect(segments[4].text).toContain("Today we will explore natural pronunciation, witty wordplay, and life philosophies with Timon, Pumbaa, and Simba.");
    expect(segments[4].properNouns).toEqual(expect.arrayContaining(["Timon", "Pumbaa", "Simba"]));
  });

  it("Audit 2: Desert Rescue & Debating Whether to Keep a Lion (Segments 5-13)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments[5].text).toBe("Yee-haw! Clear the road! Get out of the way!");
    expect(segments[6].text).toBe("Hey, Timon, look at him. He's so cute, and all alone. Can we keep him?");
    expect(segments[7].text).toBe("Pumbaa, are you nuts? You nearly killed us! He's a lion! Lions eat guys like us!");
    expect(segments[7].keywords).toContain("are you nuts");

    expect(segments[8].text).toBe("But he's so little!");
    expect(segments[9].text).toBe("He's gonna get bigger!");
    expect(segments[10].text).toBe("Maybe he'll be on our side.");
    expect(segments[11].text).toBe("A-ha! That's the stupidest thing I ever heard!");

    expect(segments[12].text).toBe("Wait a second. What if he's on our side? Having a lion around might not be such a bad idea.");
    expect(segments[13].text).toBe("If he's with us, who's gonna mess with us?");
    expect(segments[13].keywords).toContain("mess with us");
  });

  it("Audit 3: Simba Wakes Up & Past Grief (Segments 14-24)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments[14].text).toBe("You okay, kid?");
    expect(segments[15].text).toBe("I guess so.");
    expect(segments[16].text).toBe("You nearly died! I saved you! Well, Pumbaa helped. A little.");
    expect(segments[17].text).toBe("Thanks for your help.");

    expect(segments[18].text).toBe("Hey, where are you going? Where you from?");
    expect(segments[19].text).toBe("Doesn't matter. I can't go back.");
    expect(segments[20].text).toBe("What did you do, kid?");
    expect(segments[21].text).toBe("Something terrible. But I don't want to talk about it.");
    expect(segments[22].text).toBe("Good. We don't want to hear about it.");
    expect(segments[23].text).toBe("Come on, Timon! Anything we can do to help?");
    expect(segments[24].text).toBe("Not unless you can change the past.");
    expect(segments[24].keywords).toEqual(expect.arrayContaining(["unless", "change the past"]));
  });

  it("Audit 4: Wordplay on Color & Food Chain (Segments 25-29)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments[25].text).toBe("Gee, he looks blue.");
    expect(segments[25].keywords).toContain("looks blue");

    expect(segments[26].text).toBe("I'd say brownish-gold.");
    expect(segments[26].keywords).toContain("brownish-gold");

    expect(segments[27].text).toBe("No, no, no. I mean he's depressed!");
    expect(segments[28].text).toBe("Kid, what's eating you?");
    expect(segments[28].keywords).toContain("what's eating you");

    expect(segments[29].text).toBe("Nothing! He's at the top of the food chain! Ha-ha-ha, the food chain!");
    expect(segments[29].keywords).toContain("top of the food chain");
  });

  it("Audit 5: Pumbaa's Malapropism & Timon's Escapist Philosophy (Segments 30-36)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments[30].text).toBe("You know, kid, in times like this, my buddy Timon here says: you got to put your behind in your past.");
    expect(segments[30].keywords).toContain("behind in your past");

    expect(segments[31].text).toBe("No, no, no! Amateur! Lie down before you hurt yourself!");
    expect(segments[32].text).toBe("It's: you got to put your past behind you!");
    expect(segments[32].keywords).toContain("put your past behind you");

    expect(segments[33].text).toBe("Look, kid. Bad things happen, and you can't do anything about it, right?");
    expect(segments[34].text).toBe("Right.");
    expect(segments[35].text).toBe("Wrong! When the world turns its back on you, you turn your back on the world!");
    expect(segments[35].keywords).toContain("turn your back on");

    expect(segments[36].text).toBe("Well, that's not what I was taught.");
  });

  it("Audit 6: Hakuna Matata & Motto Wordplay (Segments 37-42)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments[37].text).toBe("Then maybe you need a new lesson. Repeat after me: Hakuna Matata!");
    expect(segments[37].properNouns).toContain("Hakuna Matata");

    expect(segments[38].text).toBe("What?");
    expect(segments[39].text).toBe("Hakuna Matata. It means no worries!");
    expect(segments[40].text).toBe("What's a motto?");
    expect(segments[41].text).toBe("Nothing! What's a motto with you? Ha-ha-ha!");
    expect(segments[41].keywords).toContain("what's a motto with you");

    expect(segments[42].text).toBe("Hakuna Matata! It means no worries for the rest of your days!");
  });

  it("Audit 7: Grub Rustling & Slimy Yet Satisfying Bug Feast (Segments 43-48)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments[43].text).toBe("I'm starved. I could eat a whole zebra.");
    expect(segments[44].text).toBe("Whoa, kid! No zebras around here! We gotta rustle up some grub.");
    expect(segments[44].keywords).toEqual(expect.arrayContaining(["rustle up", "grub"]));

    expect(segments[45].text).toBe("Look at this rotten log. It's an all-you-can-eat bug buffet!");
    expect(segments[45].keywords).toContain("all-you-can-eat");

    expect(segments[46].text).toBe("Mmm, piquant, with a very pleasant crunch!");
    expect(segments[46].keywords).toEqual(expect.arrayContaining(["piquant", "pleasant crunch"]));

    expect(segments[47].text).toBe("Well... slimy, yet satisfying!");
    expect(segments[47].keywords).toEqual(expect.arrayContaining(["slimy", "satisfying"]));

    expect(segments[48].text).toBe("That's it! Tastes like chicken!");
    expect(segments[48].keywords).toContain("tastes like chicken");
  });

  it("Audit 8: Climax Wisdom of Rafiki & Bilingual Quiz Rigor (Segment 49 & Quiz)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments[49].text).toBe("Ah yes, the past can hurt. But the way I see it, you can either run from it, or learn from it!");
    expect(segments[49].keywords).toEqual(expect.arrayContaining(["past can hurt", "run from it", "learn from it"]));

    // Quiz verification
    const quiz = QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST;
    expect(quiz.questions[0].targetedConcept).toBe("Philosophical Metaphor: The Monarch's Solar Cycle");
    expect(quiz.questions[1].targetedConcept).toBe("Ecological Hierarchy & Character Conflict: Predator vs. Prey Dynamics");
    expect(quiz.questions[2].targetedConcept).toBe("Pragmatic Reasoning: Having an Apex Predator on Your Side");
    expect(quiz.questions[3].targetedConcept).toBe("Idiom vs. Literal Color: The Idiom 'Look Blue'");
    expect(quiz.questions[4].targetedConcept).toBe("Double Entendre & Wordplay: 'What's Eating You' & Food Chain");
    expect(quiz.questions[5].targetedConcept).toBe("Linguistic Malapropism: 'Put Your Behind in Your Past'");
    expect(quiz.questions[6].targetedConcept).toBe("Escapist Coping Mechanism: Turning Your Back on the World");
    expect(quiz.questions[7].targetedConcept).toBe("Growth Mindset vs. Avoidance: Run from It or Learn from It");
  });
});
