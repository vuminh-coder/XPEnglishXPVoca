import { describe, it, expect } from "vitest";
import {
  LESSON_JULIAN_TREASURE,
  QUIZ_JULIAN_TREASURE,
} from "../features/listening/data/lessons/lesson_julian_treasure";

describe("Julian Treasure: How to Speak So That People Want to Listen (vid_julian_treasure_speak) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Voice as Instrument & The 7 Deadly Sins of Speaking (Segments 0-20)", () => {
    const segments = LESSON_JULIAN_TREASURE.segments;
    expect(segments[0].text).toBe("The human voice: It's the instrument we all play.");
    expect(segments[0].keywords).toContain("human voice");
    expect(segments[0].keywords).toContain("instrument");

    expect(segments[1].text).toContain("start a war or say \"I love you.\"");
    expect(segments[1].keywords).toContain("powerful sound");

    expect(segments[5].text).toContain("seven deadly sins of speaking.");
    expect(segments[5].keywords).toContain("deadly sins of speaking");

    // Sin 1: Gossip
    expect(segments[7].text).toBe("First, gossip. Speaking ill of somebody who's not present.");
    expect(segments[7].keywords).toContain("gossip");

    // Sin 2: Judging
    expect(segments[9].text).toContain("Second, judging.");
    expect(segments[9].text).toContain("judged and found wanting");
    expect(segments[9].keywords).toContain("found wanting");

    // Sin 3: Negativity
    expect(segments[10].text).toContain("Third, negativity.");
    expect(segments[11].text).toContain("It's October 1 today");
    expect(segments[11].properNouns).toContain("October");

    // Sin 4: Complaining
    expect(segments[12].text).toContain("complaining. Well, this is the national art of the U.K.");
    expect(segments[12].properNouns).toContain("U.K.");
    expect(segments[13].text).toContain("complaining is viral misery.");

    // Sin 5: Excuses & Blamethrower
    expect(segments[14].text).toContain("Some people have a blamethrower.");
    expect(segments[14].keywords).toContain("blamethrower");

    // Sin 6: Exaggeration & Embroidery
    expect(segments[16].text).toContain("embroidery, exaggeration. It demeans our language");
    expect(segments[17].text).toContain("this exaggeration becomes lying");

    // Sin 7: Dogmatism
    expect(segments[18].text).toContain("And finally, dogmatism. The confusion of facts with opinions.");
    expect(segments[18].keywords).toContain("dogmatism");
    expect(segments[18].keywords).toContain("conflated");

    expect(segments[20].text).toContain("So here they are, seven deadly sins of speaking.");
  });

  it("Audit 2: The HAIL Framework & 4 Cornerstones (Segments 21-30)", () => {
    const segments = LESSON_JULIAN_TREASURE.segments;
    expect(segments[21].text).toContain("four really powerful cornerstones, foundations");
    expect(segments[21].keywords).toContain("cornerstones");

    expect(segments[22].text).toContain("The word is \"hail,\" and it has a great definition as well.");
    expect(segments[22].properNouns).toContain("HAIL");

    expect(segments[23].text).toContain("to greet or acclaim enthusiastically");

    // H - Honesty
    expect(segments[24].text).toBe("The H, honesty, of course, being true in what you say, being straight and clear.");
    expect(segments[24].properNouns).toContain("H");
    expect(segments[24].properNouns).toContain("Honesty");

    // A - Authenticity
    expect(segments[25].text).toContain("The A is authenticity, just being yourself.");
    expect(segments[25].text).toContain("standing in your own truth");
    expect(segments[25].properNouns).toContain("A");
    expect(segments[25].properNouns).toContain("Authenticity");

    // I - Integrity
    expect(segments[26].text).toBe("The I is integrity, being your word, actually doing what you say, and being somebody people can trust.");
    expect(segments[26].properNouns).toContain("I");
    expect(segments[26].properNouns).toContain("Integrity");

    // L - Love
    expect(segments[27].text).toBe("And the L is love. I don't mean romantic love, but I do mean wishing people well, for two reasons.");
    expect(segments[27].properNouns).toContain("L");
    expect(segments[27].properNouns).toContain("Love");

    expect(segments[28].text).toContain("absolute honesty may not be what we want. I mean, my goodness, you look ugly this morning.");
    expect(segments[29].text).toContain("Tempered with love, of course, honesty is a great thing.");
    expect(segments[29].keywords).toContain("simultaneously");

    expect(segments[30].text).toContain("it is what you say, it's also the way that you say it.");
  });

  it("Audit 3: The Vocal Toolbox: Register & Timbre (Segments 31-40)", () => {
    const segments = LESSON_JULIAN_TREASURE.segments;
    expect(segments[31].text).toContain("You have an amazing toolbox.");
    expect(segments[31].keywords).toContain("amazing toolbox");

    expect(segments[32].text).toContain("have a little rummage in there with you now");
    expect(segments[32].keywords).toContain("rummage");

    // Register
    expect(segments[33].text).toContain("Register, for example.");
    expect(segments[35].text).toContain("up here in my nose");
    expect(segments[35].text).toContain("down here in my throat");
    expect(segments[36].text).toContain("go down here to the chest.");
    expect(segments[37].text).toContain("We vote for politicians with lower voices, it's true, because we associate depth with power and with authority.");

    // Timbre
    expect(segments[38].text).toContain("Then we have timbre. It's the way your voice feels.");
    expect(segments[38].text).toContain("rich, smooth, warm, like hot chocolate.");
    expect(segments[38].keywords).toContain("hot chocolate");

    expect(segments[39].text).toContain("Go and get a voice coach.");
    expect(segments[40].text).toContain("breathing, with posture, and with exercises to improve the timbre of your voice.");
    expect(segments[40].keywords).toContain("breathing");
    expect(segments[40].keywords).toContain("posture");
  });

  it("Audit 4: The Vocal Toolbox: Prosody, Pace, Silence, Pitch & Volume (Segments 41-49)", () => {
    const segments = LESSON_JULIAN_TREASURE.segments;
    // Prosody
    expect(segments[41].text).toContain("Then prosody. I love prosody. This is the sing-song, the meta-language");
    expect(segments[41].keywords).toContain("meta-language");

    expect(segments[42].text).toContain("That's where the word \"monotonic\" comes from, or monotonous, monotone.");
    expect(segments[42].keywords).toContain("monotonic");

    expect(segments[43].text).toContain("where every sentence ends as if it were a question when it's actually not a question, it's a statement?");
    expect(segments[44].text).toContain("restricting your ability to communicate through prosody");

    // Pace & Silence
    expect(segments[45].text).toContain("Pace. I can get very excited by saying something really quickly, or I can slow right down to emphasize");
    expect(segments[45].text).toContain("our old friend silence.");
    expect(segments[46].text).toContain("There's nothing wrong with a bit of silence in a talk, is there? We don't have to fill it with ums and ahs.");
    expect(segments[46].keywords).toContain("ums and ahs");

    // Pitch
    expect(segments[47].text).toContain("pitch often goes along with pace");
    expect(segments[47].text).toContain("Where did you leave my keys?");

    // Volume & Sodcasting
    expect(segments[48].text).toContain("And finally, volume.");
    expect(segments[49].text).toContain("That's called sodcasting, imposing your sound on people around you carelessly and inconsiderately.");
    expect(segments[49].keywords).toContain("sodcasting");
  });

  it("Audit 5: Crucial Moments & 6 Vocal Warm-up Exercises (Segments 50-59)", () => {
    const segments = LESSON_JULIAN_TREASURE.segments;
    expect(segments[50].text).toContain("standing on a stage like this and giving a talk to people. It might be proposing marriage, asking for a raise, a wedding speech.");
    expect(segments[51].text).toContain("no engine works well without being warmed up. Warm up your voice.");

    expect(segments[52].text).toContain("the six vocal warm-up exercises that I do before every talk I ever do.");

    // Exercise 1: Arms up & sigh out
    expect(segments[53].text).toContain("First, arms up, deep breath in, and sigh out, ahhhhh, like that.");

    // Exercise 2: Lips with Ba Ba Ba
    expect(segments[54].text).toContain("warm up our lips, and we're going to go Ba, Ba, Ba, Ba, Ba, Ba, Ba, Ba.");

    // Exercise 3: Lip trill brrrr
    expect(segments[55].text).toContain("And now, brrrrrrrrrr, just like when you were a kid.");

    // Exercise 4: Tongue with la la la
    expect(segments[56].text).toContain("with exaggerated la, la, la, la, la, la, la, la, la.");

    // Exercise 5: Roll an R
    expect(segments[57].text).toContain("roll an R: Rrrrrrr. That's like champagne for the tongue.");
    expect(segments[57].properNouns).toContain("R");

    // Exercise 6: The Siren
    expect(segments[58].text).toContain("the pros call this the siren.");
    expect(segments[58].text).toContain("The \"we\" is high, the \"aw\" is low.");
    expect(segments[59].text).toContain("weeeaawww, weeeaawww. Fantastic.");
  });

  it("Audit 6: Conscious Sound & The Vision of a Beautiful World (Segments 60-64)", () => {
    const segments = LESSON_JULIAN_TREASURE.segments;
    expect(segments[60].text).toContain("Next time you speak, do those in advance.");
    expect(segments[61].text).toContain("people who simply aren't listening in an environment that's all about noise and bad acoustics.");

    expect(segments[62].text).toContain("speaking powerfully to people who were listening consciously in environments which were actually fit for purpose?");
    expect(segments[62].keywords).toContain("fit for purpose");

    expect(segments[63].text).toContain("creating sound consciously and consuming sound consciously and designing all our environments consciously for sound?");

    expect(segments[64].text).toBe("That would be a world that does sound beautiful, and one where understanding would be the norm, and that is an idea worth spreading. Thank you.");
    expect(segments[64].keywords).toContain("sound beautiful");
    expect(segments[64].keywords).toContain("understanding would be the norm");
    expect(segments[64].keywords).toContain("idea worth spreading");
  });

  it("Audit 7: Reading Comprehension Quiz Reference Segment Cross-Validation (1-indexed)", () => {
    const quiz = QUIZ_JULIAN_TREASURE;
    const segments = LESSON_JULIAN_TREASURE.segments;

    // Q1: Voice as instrument -> Segment 1
    expect(quiz.questions[0].referenceSegmentIndex).toBe(1);
    expect(segments[quiz.questions[0].referenceSegmentIndex! - 1].text).toContain("instrument we all play");

    // Q2: Gossip -> Segment 8
    expect(quiz.questions[1].referenceSegmentIndex).toBe(8);
    expect(segments[quiz.questions[1].referenceSegmentIndex! - 1].text).toContain("gossip");

    // Q3: Blamethrower -> Segment 15
    expect(quiz.questions[2].referenceSegmentIndex).toBe(15);
    expect(segments[quiz.questions[2].referenceSegmentIndex! - 1].text).toContain("blamethrower");

    // Q4: HAIL -> Segment 23
    expect(quiz.questions[3].referenceSegmentIndex).toBe(23);
    expect(segments[quiz.questions[3].referenceSegmentIndex! - 1].text).toContain("hail");

    // Q5: Lower voices & politicians -> Segment 38
    expect(quiz.questions[4].referenceSegmentIndex).toBe(38);
    expect(segments[quiz.questions[4].referenceSegmentIndex! - 1].text).toContain("politicians with lower voices");

    // Q6: Timbre & hot chocolate -> Segment 39
    expect(quiz.questions[5].referenceSegmentIndex).toBe(39);
    expect(segments[quiz.questions[5].referenceSegmentIndex! - 1].text).toContain("hot chocolate");

    // Q7: Repetitive prosody / upspeak -> Segment 44
    expect(quiz.questions[6].referenceSegmentIndex).toBe(44);
    expect(segments[quiz.questions[6].referenceSegmentIndex! - 1].text).toContain("every sentence ends as if it were a question");

    // Q8: Beautiful world of sound -> Segment 65
    expect(quiz.questions[7].referenceSegmentIndex).toBe(65);
    expect(segments[quiz.questions[7].referenceSegmentIndex! - 1].text).toContain("world that does sound beautiful");
  });
});
