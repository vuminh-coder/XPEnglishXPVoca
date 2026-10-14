import { describe, it, expect } from "vitest";
import {
  LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE,
  QUIZ_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE,
} from "../features/listening/data/lessons/movies/animation/lesson_ratatouille";

describe("Ratatouille: Remy, Linguini & Anton Ego Food Philosophy (mov_ani_04) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: RealLife Lesson Intro & Auguste Gusteau's Philosophy (Segments 0-3)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
    expect(segments[0].text).toContain("Today, we're going to be learning English with Ratatouille!");
    expect(segments[0].properNouns).toEqual(expect.arrayContaining(["Ratatouille", "Andrea"]));

    expect(segments[1].text).toContain("Ratatouille is about an ambitious rat named Remy, who dreams of becoming a great French chef despite everyone telling him it's impossible.");
    expect(segments[1].properNouns).toEqual(expect.arrayContaining(["Ratatouille", "Remy"]));

    expect(segments[2].text).toContain("In this lesson, we will help you to learn English without getting lost, without missing the jokes, and without subtitles.");
    expect(segments[2].keywords).toContain("getting lost");

    expect(segments[3].text).toContain("Linguini was hired as a garbage boy at Gusteau's restaurant");
    expect(segments[3].properNouns).toEqual(expect.arrayContaining(["Linguini", "Gusteau"]));
  });

  it("Audit 2: The Soup Disaster & Skinner's Wrath (Segments 4-10)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
    expect(segments[4].text).toContain("throwing random vegetables, spices, and tap water into the simmering broth");
    expect(segments[4].keywords).toContain("simmering broth");

    expect(segments[5].text).toContain("it's an absolute culinary disaster");
    expect(segments[5].properNouns).toContain("Remy");

    expect(segments[6].text).toContain("grabs fresh thyme, bay leaves, roasted garlic, and heavy cream to completely transform the flavor profile");
    expect(segments[6].keywords).toEqual(expect.arrayContaining(["fresh thyme", "bay leaves", "flavor profile"]));

    expect(segments[7].text).toBe(
      "What are you doing?! Where do you get the gall to even attempt to cook in my kitchen?!"
    );

    expect(segments[8].text).toBe(
      "No, Chef! I was just cleaning! I spilled the soup by mistake and I was trying to wipe the counter!"
    );

    expect(segments[9].text).toBe(
      "You will be fired! You will be drawn and quartered! I'll do it, I think the law is on my side!"
    );

    expect(segments[10].text).toContain("The waiter already took a bowl out to table five!");
  });

  it("Audit 3: Solene LeClaire's Praise & Rhetorical Analysis (Segments 11-17)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
    expect(segments[11].text).toContain("The soup was served to Solene LeClaire, the demanding food critic from Le Figaro, and she adored it!");
    expect(segments[11].properNouns).toEqual(expect.arrayContaining(["Solene LeClaire", "Le Figaro"]));

    expect(segments[12].text).toContain("Chef Skinner insults Linguini by saying that for him to cook would be 'monumentally idiotic'.");
    expect(segments[12].properNouns).toEqual(expect.arrayContaining(["Skinner", "Linguini"]));

    expect(segments[13].text).toContain("Chef Skinner is using these expressions hyperbolically, which means in an exaggerated, dramatic way.");
    expect(segments[13].keywords).toEqual(expect.arrayContaining(["hyperbolically", "exaggerated", "dramatic way"]));

    expect(segments[14].text).toContain("When someone is 'on your side', it means they support your position, agree with your argument, or back you up.");
    expect(segments[14].keywords).toContain("on your side");

    expect(segments[15].text).toContain("The adjective 'blathering' describes someone who talks far too much, often in a foolish, annoying, or meaningless manner.");
    expect(segments[15].keywords).toContain("blathering");

    expect(segments[16].text).toContain("correlative conjunctions: 'either... or' presents choices, while 'neither... nor' negates both alternatives.");
    expect(segments[16].keywords).toContain("correlative conjunctions");

    expect(segments[17].text).toContain("To 'pay attention' means to focus your conscious mental energy to carefully observe, listen, or learn.");
  });

  it("Audit 4: Connected Speech & The Marionette Hair Puppetry (Segments 18-27)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
    expect(segments[18].text).toContain("Notice connected speech: when a word ending in a /t/ sound meets a /j/ sound like 'you', they blend into a /tʃ/ sound: 'but you' becomes 'but-chu'.");
    expect(segments[18].keywords).toContain("connected speech");

    expect(segments[19].text).toContain("They think you might be a cook, but you know what I think, Linguini? I think you are a sneaky, overreaching little rat!");
    expect(segments[19].keywords).toContain("sneaky");

    expect(segments[20].text).toContain("If someone is described as 'sneaky', they behave in a secretive, deceitful way to deceive others without being noticed.");
    expect(segments[21].text).toContain("A rat in the kitchen?! Our reputation is hanging by a thread! Dispose of it far away!");

    expect(segments[22].text).toContain("Linguini pedals his bicycle to the banks of the River Seine, preparing to throw the trapped rat into the water.");
    expect(segments[22].properNouns).toContain("River Seine");

    expect(segments[23].text).toContain("Wait... you were the one who added those ingredients, weren't you? Can you understand what I'm saying?");
    expect(segments[24].text).toContain("Remy nods his head vigorously. Linguini drops to his knees in utter disbelief.");
    expect(segments[25].text).toContain("I can't cook, and you can't be seen cooking! But together... maybe we can pull this off!");

    expect(segments[26].text).toContain("Back in Linguini's tiny flat, Remy accidentally tugs on a lock of Linguini's hair, causing his arm to jerk upright.");
    expect(segments[27].text).toBe(
      "Whoa! That is strangely involuntary! You're pulling my hair and controlling my muscles!"
    );
  });

  it("Audit 5: Chef Colette's Professional Kitchen Rules & Ego's Challenge (Segments 28-36)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
    expect(segments[28].text).toContain("The coach asks: which of these human physical actions is involuntary? Coughing, sneezing, or dancing?");
    expect(segments[29].text).toContain("Hiding underneath Linguini's toque blanche chef hat, Remy steers his hands to replicate the exact soup recipe.");
    expect(segments[29].properNouns).toEqual(expect.arrayContaining(["Linguini", "Remy"]));

    expect(segments[30].text).toContain("Congratulations, you were able to repeat your accidental success! But you will need to know much more if you are to survive in my kitchen, boy!");
    expect(segments[31].text).toContain("Colette will be responsible for teaching you how we do things here. Do not make her regret it!");
    expect(segments[31].properNouns).toContain("Colette");

    expect(segments[32].text).toContain("High cuisine is not for the faint of heart. It is governed by rigorous rules, timing, cuts, and ruthless precision.");
    expect(segments[33].text).toContain("Keep your station clean! If you clear your cutting board after every prep, the mess will never conquer you!");

    expect(segments[34].text).toContain("News of the mysterious culinary genius at Gusteau's reached the somber study of Anton Ego, the most feared food critic in France.");
    expect(segments[34].properNouns).toEqual(expect.arrayContaining(["Gusteau", "Anton Ego", "France"]));

    expect(segments[35].text).toContain("Bring me your finest dish tonight, and let us see if Gusteau's motto holds any truth.");
    expect(segments[36].text).toContain("Remy chose to serve him Ratatouille: a humble peasant dish made of thinly layered eggplant, zucchini, squash, and tomato confit.");
  });

  it("Audit 6: The Proustian Childhood Flashback & Critic Redefinition (Segments 37-39)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
    expect(segments[37].text).toContain("Ego took a single bite. In an instant, the fork slipped from his hand as he was transported back to his childhood kitchen.");
    expect(segments[37].keywords).toContain("transported back to childhood");

    expect(segments[38].text).toContain("He remembered scraping his knee, weeping, and his mother comforting him with a warm bowl of freshly cooked ratatouille.");
    expect(segments[38].keywords).toContain("freshly cooked ratatouille");

    expect(segments[39].text).toContain("The next morning, Anton Ego published his legendary review, fundamentally redefining the very purpose of criticism.");
    expect(segments[39].properNouns).toContain("Anton Ego");
  });

  it("Audit 7: Anton Ego's Legendary Food Review Monologue & Lesson Wrap-up (Segments 40-49)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
    expect(segments[40].text).toBe(
      "In many ways, the work of a critic is easy. We risk very little, yet enjoy a position over those who offer up their work to our judgment."
    );
    expect(segments[41].text).toContain(
      "We thrive on negative criticism, which is fun to write and to read. But the bitter truth we must face is that the average piece of junk is more meaningful"
    );
    expect(segments[42].text).toContain(
      "There are times when a critic truly risks something, and that is in the discovery and defense of the new."
    );
    expect(segments[43].text).toContain(
      "Last night, I experienced something new: an extraordinary meal from a singularly unexpected source."
    );
    expect(segments[44].text).toContain(
      "To say that both the meal and its maker have challenged my preconceptions about fine cooking is a gross understatement."
    );
    expect(segments[45].text).toContain(
      "They have rocked me to my core. In the past, I have made no secret of my disdain for Chef Gusteau's famous motto: 'Anyone can cook.'"
    );
    expect(segments[46].text).toContain(
      "Not everyone can become a great artist, but a great artist can come from anywhere."
    );
    expect(segments[47].text).toContain(
      "nothing less than the finest chef in France."
    );
    expect(segments[48].text).toBe("I will be returning to Gusteau's soon, hungry for more.");
    expect(segments[49].text).toContain(
      "Keep practicing your English every single day, enjoy great cinema, and we'll see you in our next lesson!"
    );
  });
});
