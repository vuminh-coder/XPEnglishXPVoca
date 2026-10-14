import { describe, it, expect } from "vitest";
import {
  LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING,
  QUIZ_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING,
} from "../features/listening/data/lessons/movies/animation/lesson_finding_dory";

describe("Finding Dory: Dory & Marlin 'Just Keep Swimming' Best Scenes (mov_ani_09) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Baby Dory & The Seashell Memory (Segments 0-5)", () => {
    const segments = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments;
    expect(segments[0].text).toBe("Hi, I'm Dory. I suffer from short-term memory loss.");
    expect(segments[0].keywords).toContain("short-term memory loss");

    expect(segments[1].text).toBe("It runs in my family... At least I think it does. Where are they?");
    expect(segments[1].keywords).toContain("runs in my family");

    expect(segments[2].text).toBe("There you go, sweetheart! Just remember: When life gets you down, you know what you gotta do?");
    expect(segments[2].keywords).toContain("gets you down");

    expect(segments[3].text).toBe("Just keep swimming! Just keep swimming, swimming, swimming!");
    expect(segments[3].keywords).toContain("just keep swimming");

    expect(segments[4].text).toBe("That's our girl! What do we do? We swim, swim, swim!");
    expect(segments[5].text).toBe("And if you ever get lost, just follow the purple shells all the way home.");
    expect(segments[5].keywords).toContain("purple shells");
  });

  it("Audit 2: Flashback & Crossing the Ocean with Crush (Segments 6-11)", () => {
    const segments = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments;
    expect(segments[6].text).toBe("I remembered something! The Jewel of Morro Bay, California!");
    expect(segments[6].properNouns).toEqual(expect.arrayContaining(["Jewel of Morro Bay", "California"]));

    expect(segments[7].text).toBe("They have names! My mom, my dad! Jenny and Charlie!");
    expect(segments[7].properNouns).toEqual(expect.arrayContaining(["Jenny", "Charlie"]));

    expect(segments[8].text).toBe("They're out there somewhere, and they miss me! I gotta find them!");
    expect(segments[9].text).toBe("Dory, California is on the other side of the ocean! You can't just swim across the world on a whim!");
    expect(segments[9].keywords).toContain("on a whim");

    expect(segments[10].text).toBe("Dad, she remembered her family. We have to help her.");
    expect(segments[11].text).toBe("Whoa, dude! You're totally riding the EAC! Keep your flippers inside the current at all times!");
    expect(segments[11].properNouns).toContain("EAC");
  });

  it("Audit 3: Marine Life Institute & Meeting Hank (Segments 12-20)", () => {
    const segments = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments;
    expect(segments[12].text).toBe("Welcome to the Marine Life Institute, where we believe in Rescue, Rehabilitation, and Release.");
    expect(segments[12].properNouns).toContain("Marine Life Institute");

    expect(segments[13].text).toBe("Where am I? What happened? Hello? Can anyone hear me?");
    expect(segments[14].text).toBe("I am a septopus. I lost an arm, so that makes seven.");
    expect(segments[14].keywords).toContain("septopus");

    expect(segments[15].text).toBe("And you have an orange tag clipped to your fin.");
    expect(segments[16].text).toBe("An orange tag means you are getting transferred to the permanent aquarium in Cleveland.");
    expect(segments[16].properNouns).toContain("Cleveland");

    expect(segments[17].text).toBe("That tag is my ticket out of here. Give me that tag, and I'll help you find your parents.");
    expect(segments[17].keywords).toContain("ticket out of here");

    expect(segments[18].text).toBe("Deal! You help me locate my family in the Open Ocean exhibit, and the tag is all yours.");
    expect(segments[19].text).toBe("Just get in the coffee pot, and don't make a sound.");
    expect(segments[20].text).toBe("Ooh, look at you! You can camouflage! You completely blended in with the wall!");
    expect(segments[20].keywords).toContain("camouflage");
  });

  it("Audit 4: Destiny & Bailey's Sonar Insecurity (Segments 21-25)", () => {
    const segments = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments;
    expect(segments[21].text).toBe("Dory! Is that really you? We used to talk through the pipes when we were little!");
    expect(segments[22].text).toBe("Destiny! My pipe pal! You're a whale shark!");
    expect(segments[22].properNouns).toContain("Destiny");

    expect(segments[23].text).toBe("I know! And I'm really clumsy because I'm completely nearsighted! I keep swimming into walls!");
    expect(segments[23].keywords).toContain("nearsighted");

    expect(segments[24].text).toBe("My head hurts! My echolocation is completely broken!");
    expect(segments[24].keywords).toContain("echolocation");

    expect(segments[25].text).toBe("It's not broken, Bailey! You just have to believe in your sonar!");
    expect(segments[25].properNouns).toContain("Bailey");
  });

  it("Audit 5: Sea Lions, Becky The Loon & Aerial Flight (Segments 26-31)", () => {
    const segments = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments;
    expect(segments[26].text).toBe("Off! Off! Off! Off! Gerald, get off our rock!");
    expect(segments[26].properNouns).toContain("Gerald");

    expect(segments[27].text).toBe("You need to get inside the institute? You need Becky! She's a loon!");
    expect(segments[27].properNouns).toContain("Becky");

    expect(segments[28].text).toBe("Just make eye contact and imprint on her! Don't break the stare!");
    expect(segments[28].keywords).toContain("imprint on her");

    expect(segments[29].text).toBe("Roo-roo! Look at me, Becky, roo-roo!");
    expect(segments[30].text).toBe("It worked, Dad! She's picking up the bucket!");
    expect(segments[31].text).toBe("We're flying through the air! Don't look down, Nemo!");
  });

  it("Audit 6: Pipe Navigation & Echolocation Breakthrough (Segments 32-35)", () => {
    const segments = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments;
    expect(segments[32].text).toBe("Don't panic. What would Dory do? If life gets you down, you just keep swimming!");
    expect(segments[33].text).toBe("Oooohhh! The glasses are off! I can see the whole pipeline through the walls!");
    expect(segments[33].keywords).toContain("glasses are off");

    expect(segments[34].text).toBe("Dory, turn left at the next valve! You're almost in the ocean!");
    expect(segments[35].text).toBe("Where is everybody? Did I lose them again? Please, someone help me...");
  });

  it("Audit 7: The Shell Trail & Tearful Family Reunion (Segments 36-41)", () => {
    const segments = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments;
    expect(segments[36].text).toBe("Wait... Shells. Beautiful purple shells, neatly laid out in lines spreading out in all directions.");
    expect(segments[36].keywords).toContain("purple shells");

    expect(segments[37].text).toBe("They're forming a path... Just like Dad said. Follow the shells all the way home.");
    expect(segments[38].text).toBe("Dory? Is it really you, our sweet little kelpcake?");
    expect(segments[38].keywords).toContain("kelpcake");

    expect(segments[39].text).toBe("We knew you'd come home! We never gave up hope!");
    expect(segments[40].text).toBe("We laid out trails of shells every single day, hoping you would follow them back to us.");
    expect(segments[41].text).toBe("Mom! Dad! You remembered me! I found you!");
  });

  it("Audit 8: Truck Heist & Chosen Family Climax (Segments 42-49 & Quiz)", () => {
    const segments = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments;
    expect(segments[42].text).toBe("Marlin and Nemo are trapped in that truck heading to Cleveland! We have to save them!");
    expect(segments[43].text).toBe("Hit the gas, Dory? I don't have a license, and I don't have feet!");
    expect(segments[44].text).toBe("You don't need feet, Hank! Just use your tentacles on the pedals and steer the wheel!");
    expect(segments[45].text).toBe("Hang on to your suction cups! We're driving this truck into the bay!");
    expect(segments[46].text).toBe("You did it, Dory. You found your family, all on your own.");
    expect(segments[47].text).toBe("No, Marlin, I didn't do it alone. I had you, and Nemo, and Hank, and Destiny, and Bailey.");
    expect(segments[48].text).toBe("And now, I remember. And it's unforgettable.");
    expect(segments[49].text).toBe("Yes, Dory. It's completely unforgettable. Now let's go see the view.");

    // Quiz verification
    const quiz = QUIZ_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING;
    expect(quiz.questions[0].targetedConcept).toBe("Iconic Catchphrase & Resilience: Just Keep Swimming");
    expect(quiz.questions[1].targetedConcept).toBe("Pathological Memory Impairment: Short-Term Memory Loss");
    expect(quiz.questions[2].targetedConcept).toBe("Anatomical & Linguistic Innovation: The Concept of a 'Septopus'");
    expect(quiz.questions[3].targetedConcept).toBe("Transactional Exchange & Motivation: The Orange Quarantine Tag");
    expect(quiz.questions[4].targetedConcept).toBe("Sensory Adaptation: Bailey's Echolocation & 'The World's Most Powerful Glasses'");
    expect(quiz.questions[5].targetedConcept).toBe("Parental Devotion & Spatial Anchors: The Trails of Purple Seashells");
    expect(quiz.questions[6].targetedConcept).toBe("Improvisational Problem-Solving: 'What Would Dory Do?'");
    expect(quiz.questions[7].targetedConcept).toBe("Theme of Chosen Family & Emotional Memory: 'I Didn't Do It Alone'");
  });
});
