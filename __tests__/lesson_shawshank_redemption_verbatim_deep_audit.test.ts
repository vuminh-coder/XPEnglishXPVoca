import { describe, it, expect } from "vitest";
import {
  LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC,
  QUIZ_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC,
} from "../features/listening/data/lessons/movies/inspirational/lesson_shawshank_redemption";

describe("The Shawshank Redemption: Hope & Choice Words (mov_insp_04) - Verbatim Deep Audit Suite", () => {
  const segments = LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC.segments;

  it("Test 1: Verbatim Audit of The Murder Trial & Sentencing (Segments 0-3)", () => {
    expect(segments[0].text).toBe(
      "Mr. Dufresne, describe the confrontation you had with your wife the night she was murdered."
    );
    expect(segments[0].properNouns).toContain("Dufresne");

    expect(segments[1].text).toBe(
      "Since I am innocent of this crime, sir, I find it decidedly inconvenient that the gun was never found."
    );
    expect(segments[2].text).toBe(
      "Ladies and gentlemen, you strike me as a particularly icy and remorseless man."
    );
    expect(segments[3].text).toBe(
      "By the power vested in me by the State of Maine, I sentence you to two life terms back-to-back."
    );
    expect(segments[3].properNouns).toContain("Maine");
  });

  it("Test 2: Verbatim Audit of Red's 20-Year Parole & Shawshank Arrival (Segments 4-8)", () => {
    expect(segments[4].text).toBe(
      "We see by your file you've served twenty years of a life sentence. Do you feel you've been rehabilitated?"
    );
    expect(segments[5].text).toBe(
      "Yes, sir, absolutely. I've learned my lesson. I can honestly say I'm a changed man, no longer a danger to society."
    );
    expect(segments[6].text).toBe(
      "Andy came to Shawshank prison in early 1947 for murdering his wife and the fella she was banging."
    );
    expect(segments[6].properNouns).toContain("Andy");
    expect(segments[6].properNouns).toContain("Shawshank");

    expect(segments[7].text).toBe(
      "They march you in naked as the day you were born, skin burning and half-blind from that delousing spud."
    );
    expect(segments[8].text).toBe(
      "If I hear so much as a mouse fart in here the rest of the night, I swear by God you will regret it!"
    );
  });

  it("Test 3: Verbatim Audit of Yard Meeting & Rock Hammer Negotiation (Segments 9-12)", () => {
    expect(segments[9].text).toBe("I understand you're a man who knows how to get things.");
    expect(segments[10].text).toBe(
      "I'm known to locate certain things from time to time. What do you want?"
    );
    expect(segments[11].text).toBe(
      "A rock hammer. About six or seven inches long, with a pick on one side."
    );
    expect(segments[12].text).toBe(
      "If you want to carve rocks, fine. But if you're thinking of digging through a wall, it would take you six hundred years."
    );
  });

  it("Test 4: Verbatim Audit of Tarring the Roof & Cold Beer for Free Men (Segments 13-17)", () => {
    expect(segments[13].text).toBe("Mr. Hadley, do you trust your wife?");
    expect(segments[13].properNouns).toContain("Hadley");

    expect(segments[14].text).toBe(
      "If you trust her, the IRS allows you to give a one-time gift to your spouse up to sixty thousand dollars tax-free."
    );
    expect(segments[14].properNouns).toContain("IRS");

    expect(segments[15].text).toBe(
      "All I ask is three beers apiece for each of my co-workers. A man working outdoors feels more like a man if he can have a bottle of suds."
    );
    expect(segments[16].text).toBe(
      "We sat and drank with the sun on our shoulders and felt like free men. Hell, we could have been tarring the roof of one of our own houses."
    );
    expect(segments[17].text).toBe(
      "Andy sat with that strange little smile on his face, watching us drink his beer."
    );
    expect(segments[17].properNouns).toContain("Andy");
  });

  it("Test 5: Verbatim Audit of Mozart Opera & The Debate on Hope (Segments 18-27)", () => {
    expect(segments[18].text).toBe(
      "I have no idea to this day what those two Italian ladies were singing about. Truth is, I don't want to know."
    );
    expect(segments[18].properNouns).toContain("Italian");

    expect(segments[19].text).toBe(
      "Some things are best left unsaid. I'd like to think they were singing about something so beautiful it can't be expressed in words."
    );
    expect(segments[20].text).toBe(
      "It was like some beautiful bird flapped into our drab little cage and made those walls dissolve away."
    );
    expect(segments[21].text).toBe("Easy time. Easiest time I ever did in the hole.");
    expect(segments[22].text).toBe(
      "Bullshit. There's no such thing as easy time in the hole. A week in the hole is like a year."
    );
    expect(segments[23].text).toBe(
      "I had Mr. Mozart to keep me company. It was in here, and in here."
    );
    expect(segments[23].properNouns).toContain("Mozart");

    expect(segments[24].text).toBe(
      "That's the beauty of music. They can't get that from you. You need it so you don't forget that there are places not made out of stone."
    );
    expect(segments[25].text).toBe("What are you talking about?");
    expect(segments[26].text).toBe("Hope.");
    expect(segments[27].text).toBe(
      "Hope? Let me tell you something, my friend. Hope is a dangerous thing. Hope can drive a man insane."
    );
    expect(segments[28].text).toBe(
      "It's got no use on the inside. You'd better get used to that idea."
    );
  });

  it("Test 6: Verbatim Audit of Zihuatanejo, Buxton Hayfield & 'Get Busy Living' (Segments 29-34)", () => {
    expect(segments[29].text).toBe("You know what the Mexicans say about the Pacific?");
    expect(segments[29].properNouns).toContain("Mexicans");
    expect(segments[29].properNouns).toContain("Pacific");

    expect(segments[30].text).toBe(
      "They say it has no memory. That's where I want to live the rest of my life. A warm place with no memory."
    );
    expect(segments[31].text).toBe(
      "Zihuatanejo. It's in Mexico. A little place on the Pacific Ocean."
    );
    expect(segments[31].properNouns).toContain("Zihuatanejo");
    expect(segments[31].properNouns).toContain("Mexico");
    expect(segments[31].properNouns).toContain("Pacific Ocean");

    expect(segments[32].text).toBe(
      "It's a big hayfield up near Buxton. It's got a long rock wall with a big oak tree at the north end."
    );
    expect(segments[32].properNouns).toContain("Buxton");

    expect(segments[33].text).toBe(
      "There's a rock that has no earthly business in a Maine hayfield. A piece of black volcanic glass. There's something buried under it."
    );
    expect(segments[33].properNouns).toContain("Maine");

    expect(segments[34].text).toBe(
      "I guess it comes down to a simple choice, really. Get busy living, or get busy dying."
    );
  });

  it("Test 7: Verbatim Audit of 40-Year Parole, Buxton Letter & Pacific Horizon (Segments 35-50)", () => {
    expect(segments[35].text).toBe(
      "Your file says you've served forty years of a life sentence. Do you feel you've been rehabilitated?"
    );
    expect(segments[36].text).toBe(
      "Rehabilitated? Well, now, let me see. You know, I don't have any idea what that word means."
    );
    expect(segments[37].text).toBe(
      "To me, it's just a made-up word, a politician's word. It's just a bullshit word."
    );
    expect(segments[38].text).toBe(
      "So you go on and stamp your form, sonny, and stop wasting my time. Because to tell you the truth, I don't give a shit."
    );

    // Buxton letter
    expect(segments[39].text).toBe(
      "Dear Red, If you're reading this, you've gotten out. And if you've come this far, maybe you're willing to come a little further."
    );
    expect(segments[39].properNouns).toContain("Red");

    expect(segments[40].text).toBe("You remember the name of the town, don't you? Zihuatanejo.");
    expect(segments[40].properNouns).toContain("Zihuatanejo");

    expect(segments[41].text).toBe(
      "I could use a good man to help me get my project on wheels. I'll keep an eye out for you and the chessboard ready."
    );
    expect(segments[42].text).toBe(
      "Remember Red, hope is a good thing, maybe the best of things, and no good thing ever dies."
    );
    expect(segments[42].properNouns).toContain("Red");

    expect(segments[43].text).toBe("Get busy living, or get busy dying. That's goddamn right.");
    expect(segments[44].text).toContain("For the second time in my life, I'm guilty of committing a crime. Parole violation.");
    expect(segments[45].text).toBe(
      "I find I'm so excited I can barely sit still or hold a thought in my head. I think it's the excitement only a free man can feel."
    );
    expect(segments[46].text).toBe(
      "A free man at the start of a long journey whose conclusion is uncertain."
    );
    expect(segments[47].text).toBe("I hope I can make it across the border.");
    expect(segments[48].text).toBe("I hope to see my friend and shake his hand.");
    expect(segments[49].text).toBe(
      "I hope the Pacific is as blue as it has been in my dreams."
    );
    expect(segments[49].properNouns).toContain("Pacific");
    expect(segments[50].text).toBe("I hope.");

    // Quiz cross-reference audit (1-indexed)
    const quiz = QUIZ_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC;
    for (const q of quiz.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(segments.length);
      const targetSeg = segments[q.referenceSegmentIndex! - 1];
      expect(targetSeg).toBeDefined();
      expect(targetSeg.orderIndex).toBe(q.referenceSegmentIndex);
      expect(targetSeg.text.length).toBeGreaterThan(0);
    }
  });
});
