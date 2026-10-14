import { describe, it, expect } from "vitest";
import {
  LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE,
  QUIZ_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE,
} from "../features/listening/data/lessons/movies/inspirational/lesson_12_angry_men";

describe("12 Angry Men: Juror 8 Classic Deliberation (mov_insp_12) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Foreman Opening & The Electric Chair Stakes (Segments 0-6)", () => {
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
    expect(segments[0].text).toBe("All right, gentlemen. We can handle this any way you'd like.");
    expect(segments[2].text).toBe("I believe it's customary to take a preliminary vote.");
    expect(segments[2].keywords).toContain("preliminary vote");

    expect(segments[3].text).toContain("we have a first-degree murder charge here.");
    expect(segments[3].text).toContain("we send the accused to the electric chair.");
    expect(segments[3].keywords).toEqual(
      expect.arrayContaining(["first-degree murder", "electric chair"])
    );

    expect(segments[4].text).toBe("Now, that's mandatory. I think we all know that.");
    expect(segments[5].text).toBe(
      "All right. This has to be a twelve-to-nothing vote either way. Everybody okay with that?"
    );
    expect(segments[6].text).toBe("Yeah, let's go. Let's get it over with.");
  });

  it("Audit 2: The Preliminary Vote & The Lone Dissenter (Segments 7-15)", () => {
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
    expect(segments[7].text).toBe("All those voting guilty, raise your hands.");
    expect(segments[8].text).toBe("One, two, three, four, five, six, seven, eight, nine, ten, eleven.");
    expect(segments[9].text).toBe("Eleven votes for guilty.");

    expect(segments[10].text).toBe("All those voting not guilty, raise your hand.");
    expect(segments[11].text).toBe("One. One vote for not guilty.");
    expect(segments[12].text).toBe("Eleven to one in favor of guilty.");

    expect(segments[14].text).toBe("Boy, oh boy. There's always one.");
    expect(segments[14].keywords).toContain("there's always one");
    expect(segments[15].text).toBe("Well, what do we do now?");
  });

  it("Audit 3: The Dangerous Killer Accusation & Nineteen Years Old (Segments 16-22)", () => {
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
    expect(segments[16].text).toBe("Do you really think he's innocent?");
    expect(segments[17].text).toBe("I don't know.");
    expect(segments[18].text).toBe("Well, let's be reasonable! You sat in the courtroom. You heard the same things we did.");

    expect(segments[19].text).toBe("The man is a dangerous killer! You can see it!");
    expect(segments[20].text).toBe("The man? He's nineteen years old.");
    expect(segments[21].text).toBe("Well, that's old enough! He knifed his own father, four inches into his chest!");
    expect(segments[22].text).toBe("It's obvious! I was convinced from the first day.");
  });

  it("Audit 4: Open-and-Shut Claim vs Just Want to Talk (Segments 23-30)", () => {
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
    expect(segments[23].text).toContain("one of those open-and-shut cases.");
    expect(segments[23].keywords).toContain("open-and-shut case");

    expect(segments[24].text).toBe("Would you like me to list them for you?");
    expect(segments[25].text).toBe("No.");
    expect(segments[26].text).toBe("Then what do you want?");

    expect(segments[27].text).toBe("Nothing. I just want to talk.");
    expect(segments[28].text).toBe("Do you believe his story?");
    expect(segments[29].text).toBe("I don't know whether I believe it or not. Maybe I don't.");
    expect(segments[30].text).toBe("Then what did you vote not guilty for?");
  });

  it("Audit 5: The Conscience of Raising One's Hand & Suppose We're Wrong (Segments 31-38)", () => {
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
    expect(segments[31].text).toBe("There were eleven votes for guilty.");
    expect(segments[32].text).toBe(
      "It's not easy for me to raise my hand and send a boy off to die without at least talking about it first."
    );
    expect(segments[32].keywords).toEqual(
      expect.arrayContaining(["raise my hand", "send a boy off to die"])
    );

    expect(segments[34].text).toBe("You can talk for a hundred years! What difference does it make?");
    expect(segments[35].text).toBe(
      "I'm not trying to change your mind. It's just that we're talking about somebody's life here."
    );
    expect(segments[36].text).toBe("We can't decide it in five minutes. Suppose we're wrong?");
    expect(segments[36].keywords).toContain("suppose we're wrong");

    expect(segments[38].text).toBe("Look, let's take an hour. Your ball game doesn't start till eight o'clock.");
  });

  it("Audit 6: Slum Childhood, Orphanage & 'Owe Him a Few Words' (Segments 41-47)", () => {
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
    expect(segments[41].text).toBe("Look, this boy's been kicked around his whole life.");
    expect(segments[41].keywords).toContain("kicked around");

    expect(segments[42].text).toBe("He was born in a slum. His mother died when he was nine years old.");
    expect(segments[43].text).toContain("spent a year and a half in an orphanage while his father served prison time for forgery.");
    expect(segments[44].text).toBe("That's not a very good head start. He's had a pretty terrible nineteen years.");

    expect(segments[45].text).toBe("I just think we owe him a few words. That's all.");
    expect(segments[45].keywords).toContain("owe him a few words");

    expect(segments[46].text).toBe("Well, I don't mind telling you this, mister: we don't owe him a damn thing!");
    expect(segments[47].text).toContain("He got a fair trial, didn't he? What do you think this trial cost?");
  });

  it("Audit 7: Bigotry Rebuked & Constitutional Burden of Proof (Segments 48-55)", () => {
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
    expect(segments[48].text).toBe("Listen to me! I've lived among them all my life. You can't believe a word they say! They're born liars!");
    expect(segments[48].keywords).toContain("born liars");

    expect(segments[49].text).toBe("It suddenly occurs to me that you must be an ignorant man.");
    expect(segments[49].keywords).toContain("ignorant man");

    expect(segments[50].text).toContain("You think you have a monopoly on the truth?");
    expect(segments[50].keywords).toContain("monopoly on the truth");

    expect(segments[52].text).toContain("I thought it was obvious from the word go.");
    expect(segments[53].text).toBe("Nobody proved otherwise.");

    expect(segments[54].text).toBe("Nobody has to prove otherwise! The burden of proof is on the prosecution.");
    expect(segments[54].keywords).toEqual(
      expect.arrayContaining(["burden of proof", "prosecution"])
    );

    expect(segments[55].text).toBe("The defendant doesn't have to open his mouth. That's in the Constitution. You've heard of it, haven't you?");
    expect(segments[55].properNouns).toContain("Constitution");
  });
});
