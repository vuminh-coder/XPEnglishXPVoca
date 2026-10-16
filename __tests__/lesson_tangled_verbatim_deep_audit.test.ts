import { describe, it, expect } from "vitest";
import {
  LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT,
  QUIZ_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT,
} from "../features/listening/data/lessons/movies/animation/lesson_tangled";

describe("Tangled: Rapunzel & Flynn Rider Floating Lanterns & I See The Light (mov_ani_10) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Introduction & Awakening Tied in the Tower (Segments 0-5)", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    expect(segments[0].text).toContain("Welcome to Learn English with TV Series");
    expect(segments[0].keywords).toContain("spoken English");

    expect(segments[1].text).toBe("Okay... AHH! Wha...? Is this... hair?");
    expect(segments[1].keywords).toContain("hair");

    expect(segments[2].text).toBe("Struggling... struggling is pointless.");
    expect(segments[2].keywords).toContain("pointless");

    expect(segments[3].text).toBe("What?");

    expect(segments[4].text).toBe("I know why you're here, and I'm not afraid of you.");
    expect(segments[4].keywords).toContain("not afraid of you");

    expect(segments[5].text).toBe("Who are you, and how did you find me?");
    expect(segments[5].keywords).toContain("how did you find me");
  });

  it("Audit 2: Flynn's Introduction & Name Exchange (Segments 6-11)", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    expect(segments[6].text).toBe("I know not who you are, nor how I came to find you.");
    expect(segments[6].keywords).toContain("know not");

    expect(segments[7].text).toBe("But may I just say, hi! How you doing? The name's Flynn Rider. How's your day going, huh?");
    expect(segments[7].keywords).toContain("How you doing");
    expect(segments[7].properNouns).toContain("Flynn Rider");

    expect(segments[8].text).toBe("Who else knows my location, Flynn Rider?");
    expect(segments[9].text).toBe("All right, Blondie.");
    expect(segments[9].keywords).toContain("Blondie");

    expect(segments[10].text).toBe("Rapunzel.");
    expect(segments[10].properNouns).toContain("Rapunzel");

    expect(segments[11].text).toBe("Gesundheit.");
    expect(segments[11].keywords).toContain("Gesundheit");
  });

  it("Audit 3: The Missing Satchel & Cooking Pot Hideout (Segments 12-19)", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    expect(segments[12].text).toBe("Here's the thing: I was in a situation, gallivanting through the forest, I came across your tower, and—");
    expect(segments[12].keywords).toContain("gallivanting");

    expect(segments[13].text).toBe("I've hidden it, somewhere you'll never find it.");
    expect(segments[14].text).toBe("Ho, ho, no. Where is my satchel?");
    expect(segments[14].keywords).toContain("satchel");

    expect(segments[15].text).toBe("I hid it. Somewhere you'll never find it.");
    expect(segments[16].text).toBe("It's in the pot, isn't it?");
    expect(segments[16].keywords).toContain("in the pot");

    expect(segments[17].text).toBe("Now it's hidden where you'll never find it! So, what do you want with my hair? To cut it?");
    expect(segments[18].text).toBe("What?");
    expect(segments[19].text).toBe("Sell it?");
  });

  it("Audit 4: Clarification on Magical Hair & Proposing the Deal (Segments 20-27)", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    expect(segments[20].text).toBe("No! Listen, the only thing I want to do with your hair is to get out of it. Literally!");
    expect(segments[20].keywords).toContain("literally");

    expect(segments[21].text).toBe("Wait, you don't want my hair?");
    expect(segments[22].text).toBe("Why on earth would I want your hair? Look, I was being chased, I saw a tower, I climbed it, end of story.");
    expect(segments[22].keywords).toContain("why on earth");

    expect(segments[23].text).toBe("You're telling the truth?");
    expect(segments[24].text).toBe("YES!");
    expect(segments[25].text).toContain("I think he's telling the truth, too.");
    expect(segments[26].text).toBe("Okay, Flynn Rider, I'm prepared to offer you a deal.");
    expect(segments[26].keywords).toContain("prepared to offer a deal");
    expect(segments[27].text).toBe("Deal?");
  });

  it("Audit 5: Floating Lanterns Condition & Reluctant Refusal (Segments 28-35)", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    expect(segments[28].text).toBe("Look this way. Do you know what these are?");
    expect(segments[29].text).toBe("You mean the lantern thing they do for the princess?");
    expect(segments[29].keywords).toContain("lantern thing");

    expect(segments[30].text).toBe("Lanterns... I knew they weren't stars!");
    expect(segments[31].text).toBe("Well, tomorrow evening, they will light the night sky with these lanterns.");
    expect(segments[32].text).toBe("You will act as my guide, take me to these lanterns, and return me home safely.");
    expect(segments[32].keywords).toContain("act as my guide");

    expect(segments[33].text).toBe("Then, and only then, will I return your satchel to you. That is my deal.");
    expect(segments[34].text).toBe("Yeah, no can do. Unfortunately, the kingdom and I are not exactly simpatico at the moment.");
    expect(segments[34].keywords).toContain("no can do");

    expect(segments[35].text).toBe("So, I won't be taking you anywhere.");
  });

  it("Audit 6: Unbreakable Promise & The Smolder (Segments 36-45)", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    expect(segments[36].text).toBe("Something brought you here, Flynn Rider. Call it what you will: fate, destiny...");
    expect(segments[37].text).toBe("A horse.");
    expect(segments[38].text).toContain("So, I have made the decision to trust you.");
    expect(segments[39].text).toBe("You can tear this tower apart, brick by brick, but without my help, you will never find your precious satchel.");
    expect(segments[39].keywords).toContain("brick by brick");

    expect(segments[40].text).toContain("Let me just get this straight.");
    expect(segments[40].keywords).toContain("get this straight");

    expect(segments[41].text).toBe("I promise. And when I promise something, I never, ever break that promise. EVER!");
    expect(segments[41].keywords).toContain("never break a promise");

    expect(segments[42].text).toBe("All right, listen. I didn't want to have to do this, but you leave me no choice. Here comes... the smolder.");
    expect(segments[42].keywords).toContain("the smolder");

    expect(segments[43].text).toContain("This is kind of an off day for me.");
    expect(segments[44].text).toBe("Really?!");
    expect(segments[45].text).toBe("Oops. You broke my smolder.");
    expect(segments[45].keywords).toContain("broke my smolder");
  });

  it("Audit 7: TV Series Pronunciation Lessons & 'I See the Light' Ballad (Segments 46-49)", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    expect(segments[46].text).toContain("In connected speech, Americans frequently use elision");
    expect(segments[46].keywords).toContain("connected speech");
    expect(segments[46].keywords).toContain("elision");

    expect(segments[47].text).toContain("When pronouncing the T in common phrases like 'get this straight'");
    expect(segments[47].keywords).toContain("flap T");

    expect(segments[48].text).toContain("By stepping outside her tower, Rapunzel trades the safety of her comfort zone");
    expect(segments[48].keywords).toContain("comfort zone");

    expect(segments[49].text).toBe("And at last I see the light, and it's like the fog has lifted. And at last I see the light, and it's like the sky is new.");
    expect(segments[49].keywords).toContain("fog has lifted");
  });

  it("Audit 8: Deep Quiz Content Rigor & Reference Segments Alignment", () => {
    const quiz = QUIZ_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT;
    expect(quiz.questions.length).toBe(8);

    // Q1 -> referenceSegmentIndex 3
    expect(quiz.questions[0].referenceSegmentIndex).toBe(3);
    expect(LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments[2].text).toContain("pointless");

    // Q2 -> referenceSegmentIndex 15
    expect(quiz.questions[1].referenceSegmentIndex).toBe(15);
    expect(LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments[14].text).toContain("satchel");

    // Q3 -> referenceSegmentIndex 21
    expect(quiz.questions[2].referenceSegmentIndex).toBe(21);
    expect(LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments[20].text).toContain("Literally");

    // Q4 -> referenceSegmentIndex 33
    expect(quiz.questions[3].referenceSegmentIndex).toBe(33);
    expect(LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments[32].text).toContain("act as my guide");

    // Q5 -> referenceSegmentIndex 43
    expect(quiz.questions[4].referenceSegmentIndex).toBe(43);
    expect(LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments[42].text).toContain("smolder");

    // Q6 -> referenceSegmentIndex 47
    expect(quiz.questions[5].referenceSegmentIndex).toBe(47);
    expect(LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments[46].text).toContain("elision");

    // Q7 -> referenceSegmentIndex 42
    expect(quiz.questions[6].referenceSegmentIndex).toBe(42);
    expect(LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments[41].text).toContain("break that promise");

    // Q8 -> referenceSegmentIndex 50
    expect(quiz.questions[7].referenceSegmentIndex).toBe(50);
    expect(LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments[49].text).toContain("fog has lifted");
  });
});
