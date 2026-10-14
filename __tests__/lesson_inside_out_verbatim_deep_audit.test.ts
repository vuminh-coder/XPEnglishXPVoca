import { describe, it, expect } from "vitest";
import {
  LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH,
  QUIZ_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH,
} from "../features/listening/data/lessons/movies/animation/lesson_inside_out";

describe("Inside Out: Joy, Sadness & Headquarters Emotional Journey (mov_ani_02) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Headquarters & Core Memories Orientation (Segments 0-6)", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    expect(segments[0].text).toContain("Headquarters only got more crowded from there.");
    expect(segments[0].properNouns).toContain("Headquarters");

    expect(segments[1].text).toContain("Meet Sadness. I'm not actually sure what she does");
    expect(segments[1].keywords).toContain("meet Sadness");

    expect(segments[4].text).toContain("each core memory powers a different aspect of Riley's personality");
    expect(segments[4].keywords).toContain("core memory");

    expect(segments[5].text).toBe("Yep, Goofball Island is the best!");
    expect(segments[5].properNouns).toContain("Goofball Island");

    expect(segments[6].text).toContain("We love our girl. She's got great friends and a great house.");
  });

  it("Audit 2: San Francisco New Home Shock & Moving Van Delay (Segments 7-15)", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    expect(segments[7].text).toBe("Okay... not what I had in mind.");
    expect(segments[7].keywords).toContain("not what I had in mind");

    expect(segments[8].text).toContain("earthquakes are a myth, Joy");
    expect(segments[8].keywords).toContain("earthquakes are a myth");

    expect(segments[10].text).toContain("smells like something died in here");
    expect(segments[10].keywords).toContain("smells like something died");

    expect(segments[11].text).toContain("The moving van won't be here until Thursday.");
    expect(segments[12].text).toContain("You're telling me we have to sleep on the floor?");

    expect(segments[13].text).toContain("My nerves are shot.");
    expect(segments[13].keywords).toContain("nerves are shot");

    expect(segments[15].text).toContain("If you and I can keep smiling, it would be a big help to your dad.");
    expect(segments[15].keywords).toContain("keep smiling");
  });

  it("Audit 3: First Day of School, Sadness Chalk Circle & Hockey Breakdown (Segments 16-24)", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    expect(segments[16].text).toContain("First day of school! Very, very exciting!");
    expect(segments[17].text).toContain("Train of Thought, right on schedule!");
    expect(segments[17].properNouns).toContain("Train of Thought");

    expect(segments[18].text).toContain("Make sure that all the sadness stays inside the circle.");
    expect(segments[18].keywords).toContain("stays inside the circle");

    expect(segments[21].text).toContain("How about Minnesota?");
    expect(segments[21].properNouns).toEqual(expect.arrayContaining(["Riley", "Minnesota"]));

    expect(segments[22].text).toContain("We used to play on the frozen pond all winter long.");
    expect(segments[23].text).toBe("Hey, Sadness! You touched a memory! We talked about this!");
    expect(segments[24].text).toContain("No, that's a core memory! No, no, no, don't touch it!");
  });

  it("Audit 4: The Tense Family Dinner & Sass Overload (Segments 25-29)", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    expect(segments[25].text).toContain("junior hockey league right here in San Francisco");
    expect(segments[25].keywords).toContain("junior hockey league");

    expect(segments[26].text).toContain("She's probing us! Quick, pretend to be Joy!");
    expect(segments[26].keywords).toContain("probing us");

    expect(segments[27].text).toContain("Sir, she just rolled her eyes at us!");
    expect(segments[27].keywords).toContain("rolled her eyes");

    expect(segments[28].text).toContain("Sir, reporting high levels of sass!");
    expect(segments[28].keywords).toContain("reporting high levels of sass");

    expect(segments[29].text).toContain("Oh no... we lost Goofball Island!");
    expect(segments[29].properNouns).toContain("Goofball Island");
  });

  it("Audit 5: Long Term Memory, Bing Bong's Candy Tears & Abstract Thought (Segments 30-36)", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    expect(segments[31].text).toContain("just keep Washington, Lincoln");
    expect(segments[31].properNouns).toEqual(expect.arrayContaining(["Washington", "Lincoln"]));

    expect(segments[33].text).toContain("I cried candy! Try the caramel, it's delicious!");
    expect(segments[33].keywords).toContain("cried candy");
    expect(segments[33].properNouns).toContain("Bing Bong");

    expect(segments[34].text).toContain("What abstract concept are we trying to comprehend today?");
    expect(segments[34].properNouns).toContain("Abstract Thought");

    expect(segments[35].text).toContain("We're in the second stage! We're deconstructing! Run!");
    expect(segments[35].keywords).toContain("deconstructing");

    expect(segments[36].text).toContain("take Riley to the moon!");
    expect(segments[36].properNouns).toContain("Imagination Land");
  });

  it("Audit 6: Dream Productions Nightmare & Hockey Resignation (Segments 37-40)", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    expect(segments[37].text).toBe("Oh no, she loves hockey! She can't give up on hockey!");
    expect(segments[37].keywords).toContain("give up on hockey");

    expect(segments[38].text).toContain("I have to do stupid dream duty!");
    expect(segments[39].text).toContain("My teeth are falling out! This isn't working!");
    expect(segments[40].text).toContain("Pan away, pan away!");
    expect(segments[40].keywords).toContain("pan away");
  });

  it("Audit 7: Memory Dump, Bing Bong's Sacrifice & The Blended Core Memory (Segments 41-49)", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    expect(segments[41].text).toContain("Why does Riley keep feeling so sad?");
    expect(segments[43].text).toContain("sing the song louder! We're going to make it!");

    expect(segments[44].text).toBe("Take her to the moon for me, okay?");
    expect(segments[44].keywords).toContain("take her to the moon");

    expect(segments[45].text).toContain("Joy realized it wasn't about keeping Riley happy all the time.");
    expect(segments[45].text).toContain("Sadness was the reason Riley got help when she needed it most.");

    expect(segments[46].text).toContain("Everything is awful, and my legs don't work.");
    expect(segments[47].text).toBe("Sadness, it's up to you. Riley needs you right now.");

    expect(segments[48].text).toContain("I miss Minnesota. I miss the woods and the pond.");
    expect(segments[49].text).toContain("blended with both gold joy and blue sadness.");
    expect(segments[49].keywords).toContain("new core memory");
  });
});
