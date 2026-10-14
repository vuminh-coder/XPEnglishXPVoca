import { describe, it, expect } from "vitest";
import {
  LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION,
  QUIZ_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION,
} from "../features/listening/data/lessons/movies/animation/lesson_zootopia";

describe("Zootopia: Judy Hopps & Nick Wilde Carrot Pen Investigation (mov_ani_07) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: RealLife Lesson Intro & Clawhauser Greeting (Segments 0-4)", () => {
    const segments = LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION.segments;
    expect(segments[0].text).toContain("Let's learn English with Zootopia, a fantastic Disney animated movie");
    expect(segments[0].properNouns).toEqual(expect.arrayContaining(["Zootopia", "Disney"]));

    expect(segments[1].text).toBe("O-M-goodness! They really did hire a bunny!");
    expect(segments[1].keywords).toContain("O-M-goodness");

    expect(segments[2].text).toBe("What?! Heh, I gotta tell you, you are even cuter than I thought you'd be!");
    expect(segments[2].keywords).toContain("even cuter");

    expect(segments[3].text).toBe("Ooh, uh, you probably didn't know, but a bunny can call another bunny cute.");
    expect(segments[4].text).toBe("But when other animals do it, it's a little...");
  });

  it("Audit 2: Clawhauser's Apology & Directing to Bullpen (Segments 5-11)", () => {
    const segments = LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION.segments;
    expect(segments[5].text).toBe("I am so sorry!");
    expect(segments[6].text).toContain("Me, Benjamin Clawhauser, the guy everyone thinks is just a flabby, donut-loving cop, stereotyping you.");
    expect(segments[6].keywords).toEqual(expect.arrayContaining(["flabby", "stereotyping"]));
    expect(segments[6].properNouns).toContain("Benjamin Clawhauser");

    expect(segments[7].text).toBe("It's okay. You're Benjamin Clawhauser, right?");
    expect(segments[8].text).toBe("You've heard of me? Oh, you are sweet.");
    expect(segments[9].text).toContain("The bullpen is right through those double doors.");
    expect(segments[9].keywords).toContain("bullpen");

    expect(segments[10].text).toBe("Thank you, Officer Clawhauser! Wish me luck!");
    expect(segments[11].text).toBe("Good luck, Hopps! And don't let anyone step on your tail!");
  });

  it("Audit 3: Chief Bogo's Briefing & Elephant In The Room Pun (Segments 12-16)", () => {
    const segments = LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION.segments;
    expect(segments[12].text).toBe("All right, all right, quiet down. Everybody sit.");
    expect(segments[13].text).toBe("I've got three items on the docket.");
    expect(segments[13].keywords).toContain("on the docket");

    expect(segments[14].text).toBe("First, we need to acknowledge the elephant in the room.");
    expect(segments[14].keywords).toContain("elephant in the room");

    expect(segments[15].text).toBe("Francine, happy birthday.");
    expect(segments[15].properNouns).toContain("Francine");

    expect(segments[16].text).toContain("Number two: there are some new recruits with us I should introduce, but I'm not going to, because I don't care.");
    expect(segments[16].keywords).toContain("new recruits");
  });

  it("Audit 4: Fourteen Missing Mammals & Parking Duty Assignment (Segments 17-24)", () => {
    const segments = LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION.segments;
    expect(segments[17].text).toBe("Finally, we have fourteen missing mammal cases across the city.");
    expect(segments[18].text).toBe("All predators, from a giant polar bear to a teensy little otter.");
    expect(segments[18].keywords).toEqual(expect.arrayContaining(["predators", "giant polar bear", "teensy little otter"]));

    expect(segments[19].text).toBe("And City Hall is right up my tail to find them. This is priority number one.");
    expect(segments[19].properNouns).toContain("City Hall");
    expect(segments[19].keywords).toContain("priority number one");

    expect(segments[20].text).toContain("Officers Grizzoli, Fangmeyer, Delgato, take Rainforest District. McHorn and Wolfard, Sahara Square.");
    expect(segments[20].properNouns).toEqual(expect.arrayContaining(["Rainforest District", "Sahara Square"]));

    expect(segments[21].text).toBe("Hopps. Parking duty.");
    expect(segments[22].text).toBe("Parking duty? Sir, I was top of my class at the academy!");
    expect(segments[23].text).toBe("Didn't forget. Just don't care. Writing a hundred tickets a day should be a breeze.");
    expect(segments[23].keywords).toContain("a breeze");

    expect(segments[24].text).toBe("A hundred tickets? I'm not gonna write a hundred tickets. I'm gonna write two hundred before noon!");
  });

  it("Audit 5: Nick's Pawpsicle Scam & Street Confrontation (Segments 25-31)", () => {
    const segments = LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION.segments;
    expect(segments[25].text).toBe("Listen, little darling, time is money and money is time.");
    expect(segments[26].text).toContain("We take the Jumbo-pop, melt it down into two hundred Pawpsicles, and sell them for two bucks apiece.");
    expect(segments[26].properNouns).toEqual(expect.arrayContaining(["Jumbo-pop", "Pawpsicles"]));

    expect(segments[27].text).toContain("Then we sell the leftover wooden sticks as premium red wood lumber to the Little Rodentia construction crew.");
    expect(segments[27].properNouns).toContain("Little Rodentia");

    expect(segments[28].text).toBe("Hey! You tricked me! I thought you were buying that ice cream for your little boy!");
    expect(segments[29].text).toBe("First of all, he's not my boy, he's my business partner Finnick.");
    expect(segments[29].properNouns).toContain("Finnick");

    expect(segments[30].text).toBe("You told that mouse foreman the popsicle sticks were authentic redwood!");
    expect(segments[31].text).toBe("That's right. Red wood. With a space in the middle. Wood that is red.");
  });

  it("Audit 6: 'It's Called a Hustle' & Meter Maid Mockery (Segments 32-36)", () => {
    const segments = LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION.segments;
    expect(segments[32].text).toBe("You're a con artist!");
    expect(segments[33].text).toBe("It's called a hustle, sweetheart.");
    expect(segments[33].keywords).toEqual(expect.arrayContaining(["called a hustle", "sweetheart"]));

    expect(segments[34].text).toBe("And I'm not the liar, he is. I just know how to play the game.");
    expect(segments[34].keywords).toContain("play the game");

    expect(segments[35].text).toBe("You can't touch me, Carrots. I've been doing this since I was born.");
    expect(segments[35].properNouns).toContain("Carrots");

    expect(segments[36].text).toBe("Look around you, slick. You're never gonna be a real cop. You're just a cute little meter maid.");
    expect(segments[36].keywords).toContain("meter maid");
  });

  it("Audit 7: Felony Tax Fraud Investigation & The Carrot Pen Trap (Segments 37-46)", () => {
    const segments = LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION.segments;
    expect(segments[37].text).toBe("Nicholas Wilde, you are under arrest!");
    expect(segments[37].properNouns).toContain("Nicholas Wilde");

    expect(segments[38].text).toBe("Under arrest? For what? Hurting your delicate feelings?");
    expect(segments[39].text).toBe("Felony tax evasion.");
    expect(segments[39].keywords).toContain("felony tax evasion");

    expect(segments[40].text).toBe("Yeah, two hundred dollars a day, 365 days a year, since you were twelve.");
    expect(segments[41].text).toBe("That's two decades, times twenty, which equals one million four hundred sixty thousand dollars!");

    expect(segments[42].text).toBe("I mean, I am just a dumb bunny, but we are exceptionally good at multiplying.");
    expect(segments[42].keywords).toContain("multiplying");

    expect(segments[43].text).toBe("And according to your tax return forms, you reported exactly zero.");
    expect(segments[44].text).toBe("Lying on a federal declaration form is a serious punishable offense: five years in prison.");
    expect(segments[45].text).toBe("Wait a second, you don't have that on record! You can't prove that!");
    expect(segments[46].text).toBe("Actual 100-carat felony confession recorded right here on my carrot pen!");
    expect(segments[46].keywords).toContain("carrot pen");
  });

  it("Audit 8: Climax Investigation Deal & Bilingual Quiz Rigor (Segments 47-49 & Quiz)", () => {
    const segments = LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION.segments;
    expect(segments[47].text).toBe("Give me that pen, Carrots!");
    expect(segments[48].text).toBe("You want the pen? You help me solve this missing mammal case in forty-eight hours, or you serve five years in federal prison.");
    expect(segments[49].text).toBe("Boy, I really hate you. All right, forty-eight hours, partner. It's called a hustle, sweetheart. Boom.");

    // Quiz verification
    const quiz = QUIZ_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION;
    expect(quiz.questions[0].targetedConcept).toBe("Sociolinguistic Nuances: In-group Terminology & Stereotyping");
    expect(quiz.questions[1].targetedConcept).toBe("Idiom Subversion: Literal Pun on 'Elephant in the Room'");
    expect(quiz.questions[2].targetedConcept).toBe("Narrative Plot Dynamics: Priority Number One & External Pressure");
    expect(quiz.questions[3].targetedConcept).toBe("Character Motivation & Resilience: Doubling the Daily Quota");
    expect(quiz.questions[4].targetedConcept).toBe("Verbal Ambiguity & Deception: Compound Noun vs. Descriptive Adjective");
    expect(quiz.questions[5].targetedConcept).toBe("Colloquial Terminology: The Concept of 'A Hustle'");
    expect(quiz.questions[6].targetedConcept).toBe("Analytical Deduction & Compounding Math: Multiplying Daily Fraud");
    expect(quiz.questions[7].targetedConcept).toBe("Dramatic Irony & Leverage: The Carrot Pen Confession");
  });
});
