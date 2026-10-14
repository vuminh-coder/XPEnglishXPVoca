import { describe, it, expect } from "vitest";
import {
  LESSON_OXFORD_FOOD_COOKING,
  QUIZ_OXFORD_FOOD_COOKING,
} from "../features/listening/data/lessons/lesson_oxford_food_cooking";

describe("Oxford Online English: Talk About Food and Cooking (vid_oxford_food_cooking) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Opening Food Inquiry & Diverse British Childhood (Segments 1-4)", () => {
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
    expect(segments[0].text).toBe("What kind of food do you like?");
    expect(segments[0].orderIndex).toBe(1);
    expect(segments[0].keywords).toContain("kind of food");

    expect(segments[1].text).toBe("I like a bit of everything, really.");
    expect(segments[1].orderIndex).toBe(2);
    expect(segments[1].keywords).toContain("a bit of everything");

    expect(segments[2].text).toBe("I grew up in the UK, and you can get food from all over the world there.");
    expect(segments[2].orderIndex).toBe(3);
    expect(segments[2].properNouns).toContain("UK");

    expect(segments[3].text).toBe(
      "My mum's cooking is a combination of different cuisines: a bit of French, a bit of Italian, a bit of Indian, and so on."
    );
    expect(segments[3].orderIndex).toBe(4);
    expect(segments[3].properNouns).toEqual(["French", "Italian", "Indian"]);
    expect(segments[3].keywords).toContain("cuisines");
  });

  it("Audit 2: British Staples & Shepherd's Pie vs Sunday Roast (Segments 5-9)", () => {
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
    expect(segments[4].text).toBe("What's British cuisine like?");
    expect(segments[4].properNouns).toContain("British");

    expect(segments[5].text).toBe("I know about fish and chips, but there must be more...");
    expect(segments[5].keywords).toContain("fish and chips");

    expect(segments[6].text).toBe("There is, but not that much.");
    expect(segments[6].keywords).toContain("there is");

    expect(segments[7].text).toBe(
      "There are a few famous dishes like shepherd's pie or Sunday roast, but most people eat a mix of things."
    );
    expect(segments[7].properNouns).toContain("Sunday");
    expect(segments[7].keywords).toContain("shepherd's pie");
    expect(segments[7].keywords).toContain("Sunday roast");

    expect(segments[8].text).toBe("What about you? What food do you like?");
    expect(segments[8].keywords).toContain("what about you");
  });

  it("Audit 3: Mediterranean Roots, Half-Spanish & Cosmopolitan Berlin (Segments 10-14)", () => {
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
    expect(segments[9].text).toBe("I'm half Spanish, so when I was young we ate a lot of Mediterranean food at home.");
    expect(segments[9].properNouns).toContain("Spanish");
    expect(segments[9].properNouns).toContain("Mediterranean");

    expect(segments[10].text).toBe(
      "Now, I live in Berlin, and it's a pretty cosmopolitan place, so you can get all kinds of food, like the UK, I suppose."
    );
    expect(segments[10].properNouns).toContain("Berlin");
    expect(segments[10].properNouns).toContain("UK");
    expect(segments[10].keywords).toContain("cosmopolitan place");

    expect(segments[11].text).toBe("I've never really had much Spanish food.");
    expect(segments[11].properNouns).toContain("Spanish");

    expect(segments[12].text).toBe("Is it similar to Italian?");
    expect(segments[12].properNouns).toContain("Italian");
    expect(segments[12].keywords).toContain("similar to");

    expect(segments[13].text).toBe("In some ways, yes.");
    expect(segments[13].keywords).toContain("in some ways");
  });

  it("Audit 4: Fresh Ingredients, Seafood, Salads & Pasta Comparison (Segments 15-18)", () => {
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
    expect(segments[14].text).toBe(
      "They both use a lot of fresh ingredients, and there's a lot of seafood, salads, and so on."
    );
    expect(segments[14].keywords).toContain("fresh ingredients");
    expect(segments[14].keywords).toContain("seafood");

    expect(segments[15].text).toBe("Pasta isn't so common in Spanish cooking, though.");
    expect(segments[15].properNouns).toContain("Spanish");
    expect(segments[15].keywords).toContain("pasta");

    expect(segments[16].text).toBe("What are some typical Spanish dishes?");
    expect(segments[16].properNouns).toContain("Spanish");
    expect(segments[16].keywords).toContain("typical");

    expect(segments[17].text).toBe("I'd be interested to try some.");
    expect(segments[17].keywords).toContain("interested to try");
  });

  it("Audit 5: Paella, Albondigas Meatballs & Enthusiastic Agreement (Segments 19-22)", () => {
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
    expect(segments[18].text).toBe("I guess paella is quite well-known.");
    expect(segments[18].keywords).toContain("paella");

    expect(segments[19].text).toBe(
      "My personal favourite is a dish called albondigas, which is meatballs in a tomato sauce."
    );
    expect(segments[19].keywords).toContain("albondigas");
    expect(segments[19].keywords).toContain("meatballs");
    expect(segments[19].keywords).toContain("tomato sauce");

    expect(segments[20].text).toBe("It's simple, but so tasty.");
    expect(segments[20].keywords).toContain("simple");
    expect(segments[20].keywords).toContain("tasty");

    expect(segments[21].text).toBe("Sounds good!");
    expect(segments[21].keywords).toContain("sounds good");
  });
});
