import { describe, it, expect } from "vitest";
import {
  LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE,
  QUIZ_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE,
} from "../features/listening/data/lessons/movies/animation/lesson_walle";

describe("WALL-E: Hidden Meaning, Captain McCrea & 'I Want to Live' (mov_ani_11) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Earthling Cinema Introduction & Abandoned Earth (Segments 0-4)", () => {
    const segments = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments;
    expect(segments[0].text).toBe("Greetings, and welcome to Earthling Cinema. I am your host, Garyx Wormuloid.");
    expect(segments[0].keywords).toContain("Earthling Cinema");

    expect(segments[1].text).toContain("This week's artifact is Wall-E");
    expect(segments[1].keywords).toContain("mess with your head");

    expect(segments[2].text).toBe("Our story begins on Earth, which the Earthlings have abandoned in protest of the electoral college.");
    expect(segments[2].properNouns).toEqual(expect.arrayContaining(["Earth", "Earthlings"]));

    expect(segments[3].text).toBe("The planet's maid, Wall-E, is left behind to clean up all the garbage.");
    expect(segments[4].text).toContain("stack it into piles that would definitely fall over");
  });

  it("Audit 2: EVE Arrival, Plant Discovery & Carnival Cruise Humans (Segments 5-9)", () => {
    const segments = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments;
    expect(segments[5].text).toBe("One day, a sexy default Twitter avatar named Eve comes to town and starts scanning for vegetation, sexily.");
    expect(segments[5].properNouns).toEqual(expect.arrayContaining(["Twitter", "Eve"]));

    expect(segments[6].text).toContain("fortunately Wall-E gives her a plant after like ten minutes of work");
    expect(segments[7].text).toBe("Good thing she landed in exactly the spot where Earth's only resident lives, huh?");

    expect(segments[8].text).toBe("When Eve's spaceship returns, Wall-E hitches a ride so he doesn't have to keep hanging out with a cockroach.");
    expect(segments[8].keywords).toContain("hitches a ride");

    expect(segments[9].text).toContain("soaking up the sun's delicious calories");
    expect(segments[9].keywords).toContain("Carnival cruise");
  });

  it("Audit 3: The Axiom, Autopilot Mutiny & Doohickey Return (Segments 10-16)", () => {
    const segments = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments;
    expect(segments[10].text).toContain("Wall-E and Eve meet the Captain and discover");
    expect(segments[11].text).toBe("Piece of cake in a cup.");

    expect(segments[12].text).toContain("he mutinies, sending Wall-E and Eve to the trash compactor");
    expect(segments[12].keywords).toContain("mutinies");

    expect(segments[13].text).toBe("But not so fast, because Wall-E's all graduated and ready to leave the nest.");
    expect(segments[13].keywords).toContain("leave the nest");

    expect(segments[14].text).toContain("where all the humans have been gathered for no explicable reason");
    expect(segments[15].text).toContain("put the plant in the doohickey, and they go back to Earth in two seconds");
    expect(segments[16].text).toContain("progress report that badly");
  });

  it("Audit 4: Satire of Consumerism & Silent Film Comedy (Segments 17-21)", () => {
    const segments = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments;
    expect(segments[17].text).toBe("Wall-E satirizes mass consumerism by depicting a planet destroyed by the insatiable need for newer, flashier stuff.");
    expect(segments[17].keywords).toContain("mass consumerism");

    expect(segments[18].text).toContain("something far more sinister and impossible to predict");
    expect(segments[19].text).toBe("Ironically, the film presents this world of overconsumption in the minimalist style of the silent film era.");
    expect(segments[19].keywords).toContain("silent film era");

    expect(segments[20].text).toBe("Rather than dialogue, Wall-E communicates its message using the actions of its title character.");
    expect(segments[21].text).toBe("Whose antics are reminiscent of early stars like Buster Keaton, Charlie Chaplin, and woman stomping on grapes.");
    expect(segments[21].properNouns).toEqual(expect.arrayContaining(["Buster Keaton", "Charlie Chaplin"]));
  });

  it("Audit 5: Autonomy vs Automation Wordplay & Blue Danube (Segments 22-30)", () => {
    const segments = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments;
    expect(segments[22].text).toContain("warns about overreliance on technology");
    expect(segments[23].text).toContain("in the name of making life more convenient, but at what cost");

    expect(segments[24].text).toContain("they have placed their free will in its cold, metallic handles");
    expect(segments[25].text).toBe("They have traded their autonomy for automation. A little wordplay for the fans, free of charge.");
    expect(segments[25].keywords).toContain("autonomy");
    expect(segments[25].keywords).toContain("automation");

    expect(segments[26].text).toContain("critical thinking is remembered only as a laughable antiquity");
    expect(segments[27].text).toContain("humans have devolved into nothing more than overgrown babies");
    expect(segments[27].keywords).toContain("physical and mental atrophy");

    expect(segments[28].text).toContain("vacuum of power that allows the Autopilot to take control");
    expect(segments[29].text).toContain("His entrance is accompanied by Johann Strauss's \"The Blue Danube\"");
    expect(segments[30].text).toBe("The message is clear: if you don't control your technology, it may wind up controlling you, which is the opposite of what you want.");
  });

  it("Audit 6: Biblical Genesis & Relearning First Steps (Segments 31-39)", () => {
    const segments = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments;
    expect(segments[31].text).toContain("reminiscent of the biblical story of Adam");
    expect(segments[32].text).toContain("similar to the Olive Garden of Eden");

    expect(segments[33].text).toContain("Wall-E and Eve are the genesis of man's rebirth");
    expect(segments[33].keywords).toContain("genesis");

    expect(segments[34].text).toContain("transform into a fertilized egg");
    expect(segments[35].text).toContain("triggering the salvation of the human species");

    expect(segments[36].text).toContain("the humans begin to \"grow up.\"");
    expect(segments[37].text).toContain("They take their first steps, begin learning new words, \"Define Hoedown,\"");

    expect(segments[38].text).toContain("\"Also Sprach Zarathustra\" by Richard Strauss");
    expect(segments[39].text).toBe("Both films use the music to indicate a breakthrough of evolutionary significance, but only one of them has funny monkeys.");
  });

  it("Audit 7: Returning Home & Climax Duel Captain vs AUTO (Segments 40-49)", () => {
    const segments = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments;
    expect(segments[40].text).toContain("cleaning up the mess Wall-E failed to clean up for 700 years");
    expect(segments[41].text).toContain("repurpose their technology and move humanity forward");
    expect(segments[42].text).toContain("inevitably ruin everything and have to leave again");
    expect(segments[43].text).toContain("shop at BuyNLarge this holiday season");

    expect(segments[44].text).toBe("AUTO: On the Axiom, you will survive.");
    expect(segments[45].text).toBe("Captain McCrea: I don't want to survive! I want to live!");
    expect(segments[45].keywords).toContain("want to live");

    expect(segments[46].text).toBe("Directive A-113: Earth is toxic. Do not return to Earth. Repeat: Do not return to Earth.");
    expect(segments[47].text).toBe("Captain McCrea: Look at this plant! It's life, AUTO! We have to go back and help it grow!");
    expect(segments[48].text).toBe("Captain McCrea: Out there is our home, AUTO! Home! And I am not going to let you steer us into eternity!");
    expect(segments[49].text).toBe("Captain McCrea: Mutiny? I am the Captain of the Axiom! And I am relieving you of duty!");
    expect(segments[49].keywords).toContain("relieving you of duty");
  });

  it("Audit 8: Deep Quiz Content Rigor & Reference Segments Alignment", () => {
    const quiz = QUIZ_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE;
    expect(quiz.questions.length).toBe(8);

    // Q1 -> referenceSegmentIndex 18
    expect(quiz.questions[0].referenceSegmentIndex).toBe(18);
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments[17].text).toContain("mass consumerism");

    // Q2 -> referenceSegmentIndex 22
    expect(quiz.questions[1].referenceSegmentIndex).toBe(22);
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments[21].text).toContain("Charlie Chaplin");

    // Q3 -> referenceSegmentIndex 26
    expect(quiz.questions[2].referenceSegmentIndex).toBe(26);
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments[25].text).toContain("autonomy for automation");

    // Q4 -> referenceSegmentIndex 30
    expect(quiz.questions[3].referenceSegmentIndex).toBe(30);
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments[29].text).toContain("The Blue Danube");

    // Q5 -> referenceSegmentIndex 34
    expect(quiz.questions[4].referenceSegmentIndex).toBe(34);
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments[33].text).toContain("genesis");

    // Q6 -> referenceSegmentIndex 46
    expect(quiz.questions[5].referenceSegmentIndex).toBe(46);
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments[45].text).toContain("I want to live");

    // Q7 -> referenceSegmentIndex 28
    expect(quiz.questions[6].referenceSegmentIndex).toBe(28);
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments[27].text).toContain("physical and mental atrophy");

    // Q8 -> referenceSegmentIndex 39
    expect(quiz.questions[7].referenceSegmentIndex).toBe(39);
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments[38].text).toContain("Also Sprach Zarathustra");
  });
});
