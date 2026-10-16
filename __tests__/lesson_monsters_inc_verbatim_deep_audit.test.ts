import { describe, it, expect } from "vitest";
import {
  LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
  QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
} from "../features/listening/data/lessons/movies/animation/lesson_monsters_inc";

describe("Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder (mov_ani_12) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Concept Introduction & Locker Room Dialogue (Segments 0-8)", () => {
    const segments = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments;
    expect(segments[0].text).toContain("Monsters, Inc. has such a crazy concept!");
    expect(segments[0].keywords).toContain("crazy concept");

    expect(segments[2].text).toContain("where Mike and Sulley deal with Randall, a shady monster");
    expect(segments[4].text).toBe("You know, pal, she's the one! That's it, she is the one.");
    expect(segments[4].keywords).toContain("she's the one");

    expect(segments[5].text).toBe("I'm happy for you.");
    expect(segments[6].text).toBe("Oh, and thanks for hooking me up with those reservations.");
    expect(segments[6].keywords).toContain("hooking me up with");

    expect(segments[7].text).toBe("Oh, no problem. They're under the name Googly Bear.");
    expect(segments[7].properNouns).toContain("Googly Bear");
    expect(segments[8].text).toBe("Oh, good idea!");
  });

  it("Audit 2: Randall Sneak Attack & Scare Floor Challenge (Segments 9-16)", () => {
    const segments = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments;
    expect(segments[9].text).toContain("What do you know! It scares little kids and little monsters!");
    expect(segments[10].text).toBe("I wasn't scared, I have allergies.");
    expect(segments[10].keywords).toContain("allergies");

    expect(segments[11].text).toBe("Uh-huh, sure.");
    expect(segments[12].text).toBe("Hey Randall, save it for the scare floor, will you?");
    expect(segments[12].keywords).toContain("save it for the scare floor");

    expect(segments[13].text).toBe("I'm in the zone today, Sullivan! Going to be doing some serious scaring, putting up some big numbers!");
    expect(segments[13].keywords).toContain("in the zone");

    expect(segments[14].text).toContain("more humiliating when we break the record first!");
    expect(segments[15].text).toBe("Shh! Do you hear that? It's the Winds of Change!");
    expect(segments[15].properNouns).toContain("Winds of Change");

    expect(segments[16].text).toBe("What a creep! One of these days I'm really going to let you teach that guy a lesson.");
    expect(segments[16].keywords).toContain("what a creep");
  });

  it("Audit 3: Language Insights - Pal, The One, Hooking Up & Tag Questions (Segments 17-25)", () => {
    const segments = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments;
    expect(segments[17].text).toContain("You can call a friend of yours 'pal'");
    expect(segments[18].text).toContain("When Mike says Celia is 'the one'");

    expect(segments[19].text).toBe("When you hook someone up with something, you provide the person with something useful for free or as a favor.");
    expect(segments[19].keywords).toContain("hook someone up with");

    expect(segments[20].text).toContain("what do' becomes 'whaddya' and 'you' reduces to 'ya'");
    expect(segments[21].text).toContain("Save it for the scare floor', he means let's settle our rivalry during work");

    expect(segments[22].text).toContain("The tag question 'will you?' is used at the end of requests");
    expect(segments[23].text).toBe("When you say 'I'm in the zone', you mean you are at the top of your game, performing at peak capability.");
    expect(segments[23].keywords).toContain("in the zone");

    expect(segments[24].text).toContain("Calling someone a 'creep' is an insult");
  });

  it("Audit 4: Boo Enters Monster World & Don't Blow This (Segments 26-31)", () => {
    const segments = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments;
    expect(segments[26].text).toContain("A major crisis occurs when Boo, a human child, accidentally enters the Monster World!");
    expect(segments[27].text).toBe("Hey, where are you going? Please don't blow this, not when we're so close to breaking the record!");
    expect(segments[27].keywords).toContain("don't blow this");

    expect(segments[28].text).toBe("Somebody else will find the kid. It'll be their problem, not ours! She's out of our hair!");
    expect(segments[28].keywords).toContain("out of our hair");

    expect(segments[29].text).toContain("When you 'blow something', you mess it up or fail to take advantage of a valuable opportunity");
    expect(segments[29].keywords).toContain("blow something");

    expect(segments[30].text).toContain("It'll be their problem, not ours', where the T in 'not' transforms into a flap T");
    expect(segments[31].text).toBe("The idiom 'she's out of our hair' means someone is no longer causing you any trouble, disturbance, or inconvenience.");
    expect(segments[31].keywords).toContain("out of our hair");
  });

  it("Audit 5: Rehearsing The Play & 'Can It!' Slang (Segments 32-34)", () => {
    const segments = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments;
    expect(segments[32].text).toBe("They're rehearsing a play: She's out of our hair!");
    expect(segments[33].text).toBe("Can it!");
    expect(segments[33].keywords).toContain("can it");

    expect(segments[34].text).toBe("'Can it' is a slangy, emphatic way to tell someone to shut up or stop talking immediately.");
    expect(segments[34].keywords).toContain("can it");
    expect(segments[34].keywords).toContain("shut up");
  });

  it("Audit 6: Randall's Interrogation & Word on the Street (Segments 35-40)", () => {
    const segments = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments;
    expect(segments[35].text).toBe("So what do you think of that kid getting out, Sullivan? Pretty crazy, huh?");
    expect(segments[36].text).toBe("Word on the street is the kid's been traced back to this factory. You haven't seen anything, have you?");
    expect(segments[36].keywords).toContain("word on the street is");

    expect(segments[37].text).toBe("'Word on the street is' means hearing circulating rumors from people in your community or neighborhood.");
    expect(segments[38].text).toBe("No, no way!");
    expect(segments[38].keywords).toContain("no way");

    expect(segments[39].text).toContain("If you 'trace something back to somewhere'");
    expect(segments[40].text).toContain("You can use 'no way' to emphatically refuse something");
  });

  it("Audit 7: Waxford, Inside Job, Shifty Eyes & Grand Finale (Segments 41-49)", () => {
    const segments = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments;
    expect(segments[41].text).toBe("But if it was an inside job, I'd put my money on Waxford! The one at station six!");
    expect(segments[41].keywords).toContain("inside job");
    expect(segments[41].keywords).toContain("Waxford");

    expect(segments[42].text).toContain("An 'inside job' means a crime or sabotage committed by someone already working inside");
    expect(segments[43].text).toContain("Saying 'I'd put my money on Waxford' means betting");
    expect(segments[44].text).toContain("put your money where your mouth is', challenging someone to prove claims with deeds");

    expect(segments[45].text).toBe("You know, he got them shifty eyes!");
    expect(segments[45].keywords).toContain("them shifty eyes");

    expect(segments[46].text).toBe("Describing someone as 'shifty' means they appear deceitful, evasive, and untrustworthy, like someone whose eyes dart suspiciously.");
    expect(segments[46].keywords).toContain("shifty");

    expect(segments[48].text).toBe("Leave me alone, I'm not kidding! Pop a worm pill and hit the road, I'm busy!");
    expect(segments[49].text).toBe("You want to play? Fine, you can be the new astronaut. Go jump in the pail and we'll shoot you into outer space!");
  });

  it("Audit 8: Deep Quiz Content Rigor & Reference Segments Alignment", () => {
    const quiz = QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
    expect(quiz.questions.length).toBe(8);

    // Q1 -> referenceSegmentIndex 20
    expect(quiz.questions[0].referenceSegmentIndex).toBe(20);
    expect(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments[19].text).toContain("hook someone up with");

    // Q2 -> referenceSegmentIndex 24
    expect(quiz.questions[1].referenceSegmentIndex).toBe(24);
    expect(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments[23].text).toContain("in the zone");

    // Q3 -> referenceSegmentIndex 35
    expect(quiz.questions[2].referenceSegmentIndex).toBe(35);
    expect(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments[34].text).toContain("Can it");

    // Q4 -> referenceSegmentIndex 38
    expect(quiz.questions[3].referenceSegmentIndex).toBe(38);
    expect(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments[37].text).toContain("Word on the street is");

    // Q5 -> referenceSegmentIndex 45
    expect(quiz.questions[4].referenceSegmentIndex).toBe(45);
    expect(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments[44].text).toContain("put your money where your mouth is");

    // Q6 -> referenceSegmentIndex 47
    expect(quiz.questions[5].referenceSegmentIndex).toBe(47);
    expect(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments[46].text).toContain("shifty");

    // Q7 -> referenceSegmentIndex 32
    expect(quiz.questions[6].referenceSegmentIndex).toBe(32);
    expect(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments[31].text).toContain("out of our hair");

    // Q8 -> referenceSegmentIndex 30
    expect(quiz.questions[7].referenceSegmentIndex).toBe(30);
    expect(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments[29].text).toContain("blow something");
  });
});
