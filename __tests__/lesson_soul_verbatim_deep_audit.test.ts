import { describe, it, expect } from "vitest";
import {
  LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE,
  QUIZ_SOUL_THE_SPARK_AND_OCEAN_PARABLE,
} from "../features/listening/data/lessons/movies/animation/lesson_soul";

describe("Soul: The Spark, Lost Souls & Ocean Parable (mov_ani_03) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: RealLife Fluency Opening & Middle School Band Reality (Segments 0-5)", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    expect(segments[0].text).toContain("newest Disney Pixar hit film, Soul");
    expect(segments[0].properNouns).toEqual(expect.arrayContaining(["Disney", "Pixar", "Soul"]));

    expect(segments[1].text).toContain("fast speaking natives without getting lost, without missing the jokes, and without subtitles");
    expect(segments[1].keywords).toContain("fast speaking natives");

    expect(segments[4].text).toContain("Middle school band is not about making professional music, Joe.");
    expect(segments[4].keywords).toContain("middle school band");

    expect(segments[5].text).toContain("full-time position! Health insurance, pension, everything!");
    expect(segments[5].keywords).toEqual(
      expect.arrayContaining(["full-time position", "health insurance", "pension"])
    );
  });

  it("Audit 2: The Half Note Audition, Entering The Zone & The Manhole Fall (Segments 6-13)", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    expect(segments[6].text).toContain("giving up on my real dream");
    expect(segments[7].text).toContain("Dorothea Williams' piano player just dropped out for tonight's gig!");
    expect(segments[7].properNouns).toContain("Dorothea Williams");

    expect(segments[8].text).toBe(
      "I'm Dorothea Williams. Can you play, middle school teacher? Or are you just going to waste my time?"
    );

    expect(segments[10].text).toContain("He entered 'the zone': a transcendent mental space");
    expect(segments[10].keywords).toContain("the zone");

    expect(segments[11].text).toContain("Alright, Teach. You got the gig. Show up at 9 o'clock sharp in a nice suit.");
    expect(segments[12].text).toContain("My life has officially begun! Today is the greatest day of my life!");

    expect(segments[13].text).toContain("stepped right into an uncovered maintenance manhole");
    expect(segments[13].keywords).toContain("uncovered manhole");
  });

  it("Audit 3: Fast Native Speech & The 3 Keys of Fluency (Segments 14-17)", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    expect(segments[14].text).toContain("we've seen a couple examples already in this lesson of fast native speech");
    expect(segments[15].text).toContain("do you get frustrated when people speak fast");
    expect(segments[16].text).toContain("I'm sure that your answer was an emphatic yes");
    expect(segments[16].keywords).toContain("emphatic yes");

    expect(segments[17].text).toContain("the 3 Keys to understanding natives at any speed: vocabulary, pronunciation, and cultural context");
    expect(segments[17].keywords).toEqual(
      expect.arrayContaining(["3 Keys", "vocabulary", "pronunciation", "cultural context"])
    );
  });

  it("Audit 4: The Great Before, You Seminar & Soul 22 Cynicism (Segments 18-21)", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    expect(segments[18].text).toContain("Instead of passing on to The Great Beyond, Joe escaped and ended up in The Great Before.");
    expect(segments[18].properNouns).toEqual(expect.arrayContaining(["The Great Beyond", "The Great Before"]));

    expect(segments[19].text).toContain("Welcome to the You Seminar! Here, new souls develop their unique personalities");
    expect(segments[19].properNouns).toContain("You Seminar");

    expect(segments[20].text).toContain("I'm Soul 22. I've had mentors like Gandhi, Abraham Lincoln, and Mother Teresa.");
    expect(segments[20].properNouns).toEqual(
      expect.arrayContaining(["Soul 22", "Gandhi", "Abraham Lincoln", "Mother Teresa"])
    );

    expect(segments[21].text).toContain("Humans spend their entire existence working, stressing, and dying for nothing!");
    expect(segments[21].keywords).toContain("dying for nothing");
  });

  it("Audit 5: Lost Souls, Moonwind's Astral Rescue & Bodily Swap on Earth (Segments 22-29)", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    expect(segments[22].text).toContain("Look at these lost souls wandering in darkness.");
    expect(segments[22].keywords).toContain("lost souls");

    expect(segments[23].text).toContain("when that joy becomes an obsession, they become disconnected from life");
    expect(segments[23].keywords).toContain("disconnected from life");

    expect(segments[24].text).toContain("Captain Moonwind uses rhythm and meditation to break these lost souls free");
    expect(segments[24].properNouns).toContain("Captain Moonwind");

    expect(segments[25].text).toContain("Joe's soul landed in a cat while 22 landed in Joe's body!");
    expect(segments[26].text).toContain("Pepperoni pizza is the greatest invention in the universe!");
    expect(segments[27].text).toContain("caught a helicopter seed falling gently from a tree");

    expect(segments[28].text).toContain("Maybe my spark is sky-watching, or walking, or just feeling the breeze.");
    expect(segments[29].text).toContain("Those aren't purposes, 22! That's just regular living!");
  });

  it("Audit 6: The Legendary Half Note Gig & The Post-Concert Void (Segments 30-35)", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    expect(segments[30].text).toContain("arrived at The Half Note Club for the legendary performance");
    expect(segments[30].properNouns).toContain("Half Note Club");

    expect(segments[31].text).toContain("Joe played with the virtuosity he had dreamed of for twenty years");
    expect(segments[31].keywords).toContain("virtuosity");

    expect(segments[32].text).toContain("thunderous applause. It was the greatest gig of his entire life.");
    expect(segments[33].text).toContain("looked at Dorothea Williams with a perplexed expression");

    expect(segments[34].text).toBe("I've been waiting for this day my entire life. I thought I'd feel different.");
    expect(segments[34].keywords).toEqual(
      expect.arrayContaining(["waiting for this day", "thought I'd feel different"])
    );

    expect(segments[35].text).toContain("offered to tell him a short fable");
  });

  it("Audit 7: The Ocean Parable, The True Meaning of The Spark & Living Every Minute (Segments 36-49)", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    expect(segments[36].text).toContain("I’m trying to find this thing they call the ocean");
    expect(segments[37].text).toBe("'The ocean?' the older fish says, 'That’s what you’re in right now.'");
    expect(segments[38].text).toBe("'This?' says the young fish, 'This is water. What I want is the ocean!'");

    expect(segments[41].text).toContain("small treasures 22 had collected in his pocket: a half-eaten bagel, a subway token, and a helicopter maple seed");
    expect(segments[42].text).toContain("began to play piano not for ambition, but for pure gratitude");

    expect(segments[43].text).toBe(
      "We don't assign purposes here. A spark isn't a soul's purpose. The spark is simply being ready to live."
    );
    expect(segments[43].keywords).toEqual(
      expect.arrayContaining(["assign purposes", "a spark", "soul's purpose", "ready to live"])
    );

    expect(segments[45].text).toBe("Your badge is complete, 22. Your spark is ready. Go live your life.");
    expect(segments[47].text).toContain("I'm going to live every minute of it.");
    expect(segments[49].text).toContain("enjoy every little miracle around you, and we'll see you in our next lesson!");
  });
});
