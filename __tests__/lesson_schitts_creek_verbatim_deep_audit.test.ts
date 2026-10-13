import { describe, it, expect } from "vitest";
import {
  LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS,
  QUIZ_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_schitts_creek";

describe("Schitt's Creek: Alexis & David's Bickering (mov_sit_12) - Verbatim Deep Audit Suite", () => {
  const segments = LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS.segments;

  it("Test 1: Verbatim Audit of Who Gets Murdered First & Panic (Segments 0-7)", () => {
    // Opening who gets murdered first
    expect(segments[0].text).toBe("You know what, David? You get murdered first!");
    expect(segments[0].properNouns).toContain("David");
    expect(segments[1].text).toContain("No, you get murdered, David! You get murdered first!");
    expect(segments[2].text).toBe("No, you! It's to cure my hiccups, David! I have the hiccups, okay?");
    expect(segments[3].text).toBe("Did I dump you for a party?");

    // David's panic & heart attack
    expect(segments[4].text).toContain("How many people do you know that are currently in the prison system talking about you?");
    expect(segments[5].text).toBe("I think I'm having a heart attack, that's what's happening!");
    expect(segments[6].text).toBe("You are like thirty-four!");
    expect(segments[7].text).toBe("Why is it dark like a witch's house in here?");
  });

  it("Test 2: Verbatim Audit of Stolen Yogurt & Skincare Face Mask (Segments 8-18)", () => {
    expect(segments[8].text).toContain("I texted Alexis. I'm sorry for not responding to like one text, David!");
    expect(segments[9].text).toBe("So what? She was eating my yogurt!");
    expect(segments[10].text).toBe("Huh? What kind of yogurt?");
    expect(segments[11].text).toBe("I was saving that for after my run, David!");
    expect(segments[12].text).toBe("Oh my god, I guess I was saving it for during your run then, see ya!");

    // Mask excuses
    expect(segments[13].text).toBe("It's gonna be so fun! Don't touch me tonight!");
    expect(segments[14].text).toContain("I'm the one who should be at a sketchy bar meeting randoms!");
    expect(segments[15].text).toBe("I'm the one who should go missing!");
    expect(segments[16].text).toBe("Well then come!");
    expect(segments[17].text).toBe("I can't!");
    expect(segments[18].text).toBe("Why? Well, for one thing, this mask doesn't come off for another twenty minutes.");
  });

  it("Test 3: Verbatim Audit of Apartment Hunting & Edible Nail Polish Scandal (Segments 19-26)", () => {
    expect(segments[19].text).toBe("Bring it in, big guy.");
    expect(segments[20].text).toBe("Yeah, I don't know if that's something I want to do right now, David.");
    expect(segments[21].text).toContain("Speaking of which, David, I'm gonna need you to come and look at the apartment with me, okay?");
    expect(segments[22].text).toBe("Why would I do that?");
    expect(segments[23].text).toBe("This is cute, right? Super cute! Wait, is it cute?");
    expect(segments[24].text).toContain("Putting your name on a line of edible nail polish isn't what I would call having a job!");
    expect(segments[25].text).toBe("I was very hands-on, David! I came up with all of the flavors by myself!");
    expect(segments[26].text).toBe("Even the one that poisoned all those people, David?");
  });

  it("Test 4: Verbatim Audit of Cake Icing & Parallel Parking in a Burka (Segments 27-34)", () => {
    // Guangzhou factory & Cake
    const allText = segments.map((s) => s.text).join(" ");
    expect(allText).toContain("The factory in Guangzhou assured us that it was lead-free!");
    expect(allText).toContain("Who picked through my cake and only left the icing?");
    expect(allText).toContain("What kind of barnyard were you raised in");
    expect(allText).toContain("So you can share a boyfriend, but you can't share a piece of cake?!");

    // Driving lessons
    expect(allText).toContain("Not all of us can flirt our way into getting driving lessons, okay?");
    expect(allText).toContain("You try parallel parking in a burka, David!");
    expect(allText).toContain("Reorganizing my knits.");
  });

  it("Test 5: Verbatim Audit of Hand Cream, Twins Panic & 15-Minute Walk Home (Segments 35-43)", () => {
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("I asked you to get the box of hand cream, not sample the hand cream!");
    expect(allText).toContain("That's like fifty-three pounds! Why are you here?");
    expect(allText).toContain("When the twins arrive, I'm gonna really need your help.");
    expect(allText).toContain("Um, that's a hard pass! He's so involved in their lives.");
    expect(allText).toContain("Your body, your problem, David. Alexis isn't pregnant!");
    expect(allText).toContain("There's tiny little poops you get to clean up!");
    expect(allText).toContain("I can't have your personal drama storming over my business dealings right now.");
    expect(allText).toContain("Walked home?! That would take like fifteen minutes, David! That's absolutely not happening!");
  });

  it("Test 6: Verbatim Audit of Electrical Storm, Wet Hands & 'Eat Glass, Ken!' (Segments 44-50)", () => {
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("Did you plug your hair dryer in with wet hands again?");
    expect(allText).toContain("That happened twice, David, let it go! Stop!");
    expect(allText).toContain("Could be worse, you guys. Could be a total power failure.");
    expect(allText).toContain("Mmm, eat glass, Ken!");
    expect(allText).toContain("Just when I thought it was impossible to find a thirty-something named Ken!");
  });

  it("Test 7: Verbatim Audit of The Six Tamagotchis, Kate Winslet & The White Wedding Dress (Segments 51-70)", () => {
    const allText = segments.map((s) => s.text).join(" ");

    // Tamagotchi feud
    expect(allText).toContain("Oh, this is about those stupid Tamagotchis!");
    expect(allText).toContain("Taking care of that many is like a full-time job!");
    expect(allText).toContain("I left you with six adult Tamagotchis in perfect health!");

    // Kate Winslet's wedding
    expect(allText).toContain("You mixed up the day and the month on your ticket again, didn't you?");
    expect(allText).toContain("Like that time you showed up to Kate Winslet's wedding?");
    expect(allText).toContain("The calligraphy was hard to read, and Billy Zane also did the same thing!");

    // The wedding dress finale
    expect(allText).toContain("Alexis, you're wearing a wedding dress to my wedding!");
    expect(allText).toContain("This is not a wedding dress! It's a white floor-length gown. It's very different.");
    expect(allText).toContain("Did it come with a veil? No, it came with a headdress!");
    expect(allText).toContain("Now can you please walk me down the aisle before people lose interest?");
    expect(allText).toContain("David, it would be my honor.");

    // Quiz cross-reference check
    const quiz = QUIZ_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS;
    for (const q of quiz.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      const targetSeg = segments[q.referenceSegmentIndex!];
      expect(targetSeg).toBeDefined();
      expect(targetSeg.orderIndex).toBe(q.referenceSegmentIndex);
    }
  });
});
