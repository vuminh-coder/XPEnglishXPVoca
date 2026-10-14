import { describe, it, expect } from "vitest";
import {
  LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE,
  QUIZ_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE,
} from "../features/listening/data/lessons/movies/animation/lesson_up";

describe("Up: Carl & Ellie's Adventure Book & Russell Wilderness Explorer (mov_ani_06) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Opening Lift-Off Shout & RealLife Lesson Intro (Segments 0-3)", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    expect(segments[0].text).toBe("So long, boys! I'll send you a postcard from Paradise Falls!");
    expect(segments[0].properNouns).toContain("Paradise Falls");

    expect(segments[1].text).toContain("Up has got to be one of my personal favorite Pixar movies");
    expect(segments[1].properNouns).toEqual(expect.arrayContaining(["Up", "Pixar"]));

    expect(segments[2].text).toContain("Russell accidentally gets stuck in Carl's house just as it's taking flight.");
    expect(segments[2].properNouns).toEqual(expect.arrayContaining(["Russell", "Carl"]));

    expect(segments[3].text).toContain("understand fast-speaking natives without getting lost, without missing the jokes, and without subtitles.");
  });

  it("Audit 2: The Hilarious Porch Encounter & Badges Negotiation (Segments 4-18)", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    expect(segments[4].text).toBe("Good afternoon! My name is Russell, and I am a Wilderness Explorer in Tribe 54, Sweatlodge 12.");
    expect(segments[4].properNouns).toEqual(
      expect.arrayContaining(["Russell", "Wilderness Explorer", "Tribe 54", "Sweatlodge 12"])
    );

    expect(segments[5].text).toBe("Are you in need of any assistance today, sir?");
    expect(segments[5].keywords).toContain("in need of assistance");

    expect(segments[6].text).toBe("No.");
    expect(segments[7].text).toBe("I could help you cross the street.");
    expect(segments[8].text).toBe("No.");
    expect(segments[9].text).toBe("I could help you cross your yard.");
    expect(segments[10].text).toBe("No.");
    expect(segments[11].text).toBe("I could help you cross your porch.");
    expect(segments[12].text).toBe("No.");
    expect(segments[13].text).toBe("Well, I got to help you cross something!");
    expect(segments[14].text).toBe("Uh, no, I'm doing fine. Good afternoon.");

    expect(segments[15].text).toBe("Skip to the end! See these? These are my Wilderness Explorer badges.");
    expect(segments[16].text).toBe(
      "You may notice one is missing: it's my Assisting the Elderly badge. If I get it, I will become a Senior Wilderness Explorer!"
    );
    expect(segments[16].properNouns).toEqual(
      expect.arrayContaining(["Assisting the Elderly", "Senior Wilderness Explorer"])
    );

    expect(segments[17].text).toContain("There's a big ceremony, and all the dads come, and they pin on our badges.");
    expect(segments[18].text).toBe("So you want to assist an old person? Yep! Then I'll be a Senior Wilderness Explorer!");
  });

  it("Audit 3: The Fake Mission 'Snipe Hunt' & Deceptive Azalea Lore (Segments 19-24)", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    expect(segments[19].text).toBe("You ever heard of a snipe? A snipe?");
    expect(segments[20].text).toBe("A bird with beady eyes! Every night it sneaks into my yard and gobbles my azaleas!");
    expect(segments[20].keywords).toEqual(expect.arrayContaining(["beady eyes", "gobbles my azaleas"]));

    expect(segments[21].text).toBe("I'm elderly and infirm! I can't catch it! If only someone could help me...");
    expect(segments[21].keywords).toContain("elderly and infirm");

    expect(segments[22].text).toBe("Me! Me! I'll do it! Oh, I don't know, it's awfully crafty.");
    expect(segments[23].text).toBe("You'd have to clap your hands three times to lure it in! I'll find it, Mr. Fredricksen!");
    expect(segments[23].keywords).toContain("lure it in");

    expect(segments[24].text).toBe("I think its burrow is two blocks down. Two blocks down! Got it! Here, snipey, snipey, snipe!");
    expect(segments[24].keywords).toContain("burrow");
  });

  it("Audit 4: Vocabulary Breakdown, Flapped T & American Scouting Parody (Segments 25-31)", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    expect(segments[25].text).toContain("'Wilderness Explorer' is a fictional parody of the Boy Scouts of America youth program.");
    expect(segments[25].properNouns).toEqual(expect.arrayContaining(["Wilderness Explorer", "Boy Scouts of America"]));

    expect(segments[26].text).toContain("The word 'elderly' is a polite, respectful term for older adults");
    expect(segments[27].text).toContain("A 'porch' is a raised covered platform at the entrance of a house");

    expect(segments[28].text).toContain("in 'you may notice one is missing', the T in 'notice' is a flapped T between vowels, and 'one is' links seamlessly.");
    expect(segments[28].keywords).toContain("flapped T");

    expect(segments[29].text).toContain("Carl sends Russell on a 'wild goose chase': an idiom meaning a completely hopeless, futile search");
    expect(segments[29].keywords).toContain("wild goose chase");

    expect(segments[30].text).toContain("To 'gobble up' means to devour or consume food very rapidly and greedily");
    expect(segments[31].text).toContain("A 'burrow' is a specialized hole or underground tunnel excavated by animals");
  });

  it("Audit 5: Carl's Memory of Ellie & The Flying House Lift-Off (Segments 32-35)", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    expect(segments[32].text).toContain("This house is not merely bricks and wood to Carl; it contains all the sacred memories of his beloved wife, Ellie.");
    expect(segments[32].properNouns).toEqual(expect.arrayContaining(["Carl", "Ellie"]));

    expect(segments[33].text).toContain("They had promised each other since childhood that one day they would travel together to the cliff tops of Paradise Falls.");
    expect(segments[33].properNouns).toContain("Paradise Falls");

    expect(segments[34].text).toContain("When the workers come to take him to Shady Oaks Retirement Village, Carl releases thousands of helium balloons through his chimney.");
    expect(segments[34].properNouns).toEqual(expect.arrayContaining(["Shady Oaks Retirement Village", "Carl"]));

    expect(segments[35].text).toBe("At ten thousand feet in the air, relaxing in his armchair, Carl suddenly hears a loud knock at his front porch door!");
  });

  it("Audit 6: Russell at 10,000 Feet, Steering & Soil Warnings (Segments 36-45)", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    expect(segments[36].text).toBe("Huh! I've never been in a floating house before! Goggles! Look at this stuff, wow!");
    expect(segments[37].text).toContain("Paradise Falls: a land lost in time! You're going to South America, Mr. Fredricksen!");
    expect(segments[37].properNouns).toEqual(expect.arrayContaining(["Paradise Falls", "South America", "Fredricksen"]));

    expect(segments[38].text).toBe("Don't touch that! You'll soil it!");
    expect(segments[38].keywords).toContain("soil it");

    expect(segments[39].text).toContain("most people take a plane, but you're smart because you'll have your TV and clocks and stuff!");
    expect(segments[40].text).toBe("Whoa! Is this how you steer your house? Does it really work? Oh, this makes it go right, and that one left!");
    expect(segments[40].keywords).toContain("steer your house");

    expect(segments[41].text).toBe("Knock it off! Cut it out! Stop messing with my ropes!");
    expect(segments[41].keywords).toEqual(expect.arrayContaining(["knock it off", "cut it out"]));

    expect(segments[42].text).toBe("Hey look, buildings! That building's so close I could almost touch it!");
    expect(segments[43].text).toContain("Look, there's a bus that could take me home, two blocks away!");

    expect(segments[44].text).toContain("To 'soil' means to make something dirty, while to 'steer' means to direct the navigation");
    expect(segments[45].text).toContain("Both 'knock it off' and 'cut it out' are informal imperative idioms");
  });

  it("Audit 7: Paradise Falls Epiphany & Ellie's Final Farewell Note (Segments 46-49)", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    expect(segments[46].text).toContain("Later at Paradise Falls, sitting in the empty house, Carl opens Ellie's childhood scrapbook: 'My Adventure Book'.");
    expect(segments[46].properNouns).toEqual(expect.arrayContaining(["Paradise Falls", "Carl", "Ellie", "My Adventure Book"]));

    expect(segments[47].text).toContain("He flips past the blank pages marked 'Stuff I'm Going to Do', and discovers photos of their simple, beautiful married life together.");
    expect(segments[47].keywords).toContain("Stuff I'm Going to Do");

    expect(segments[48].text).toBe(
      "On the very last page, Ellie left her final handwritten note: 'Thanks for the adventure — now go have a new one! Love, Ellie.'"
    );
    expect(segments[48].properNouns).toContain("Ellie");

    expect(segments[49].text).toContain("Keep practicing your English every single day, remember that adventure is out there, and we'll see you in our next Pixar lesson!");
    expect(segments[49].properNouns).toContain("Pixar");
  });
});
