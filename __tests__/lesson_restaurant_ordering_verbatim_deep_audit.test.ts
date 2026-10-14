import { describe, it, expect } from "vitest";
import {
  LESSON_RESTAURANT_ORDERING,
  QUIZ_RESTAURANT_ORDERING,
} from "../features/listening/data/lessons/lesson_restaurant_ordering";

describe("English for Dining: Ordering Food at a Restaurant (vid_travel_restaurant_ordering) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Arriving at the Restaurant, Table for Four & Requesting the Menu (Segments 0-8)", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    expect(segments[0].text).toBe("Hello! How can I help you?");
    expect(segments[0].keywords).toContain("how can I help you");

    expect(segments[1].text).toBe("Hello! I would like a table for four, please.");
    expect(segments[1].keywords).toContain("table for four");

    expect(segments[2].text).toBe("Of course. Please follow me!");
    expect(segments[2].keywords).toContain("please follow me");

    expect(segments[3].text).toBe("Here is a table for four.");
    expect(segments[3].keywords).toContain("table for four");

    expect(segments[4].text).toBe("Thank you!");

    expect(segments[5].text).toBe("Could you give us the menu, please?");
    expect(segments[5].keywords).toContain("menu");

    expect(segments[6].text).toBe("Yes, of course.");

    expect(segments[7].text).toBe("Here you are!");
    expect(segments[7].keywords).toContain("here you are");

    expect(segments[8].text).toBe("Thank you.");
  });

  it("Audit 2: Beverage Orders: Water, Lemonade, Milkshake & Orange Juice (Segments 9-14)", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    expect(segments[9].text).toBe("Can I get you anything to drink?");
    expect(segments[9].keywords).toContain("anything to drink");

    expect(segments[10].text).toBe("Just water for me.");
    expect(segments[10].keywords).toContain("just water");

    expect(segments[11].text).toBe("I'll have a lemonade.");
    expect(segments[11].keywords).toContain("lemonade");

    expect(segments[12].text).toBe("I'll have a milkshake.");
    expect(segments[12].keywords).toContain("milkshake");

    expect(segments[13].text).toBe("I'll have an orange juice.");
    expect(segments[13].keywords).toContain("orange juice");

    expect(segments[14].text).toBe("Great! I'll be right back.");
    expect(segments[14].keywords).toContain("I'll be right back");
  });

  it("Audit 3: Ordering Starters & Main Courses (Segments 15-22)", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    expect(segments[15].text).toBe("Are you ready to order?");
    expect(segments[15].keywords).toContain("ready to order");

    expect(segments[16].text).toBe("Yes, we are. I'll have the grilled chicken and a salad.");
    expect(segments[16].keywords).toContain("grilled chicken");
    expect(segments[16].keywords).toContain("salad");

    expect(segments[17].text).toBe("Would you like a starter, sir?");
    expect(segments[17].keywords).toContain("starter");

    expect(segments[18].text).toBe("Yes, I'd like the vegetable soup.");
    expect(segments[18].keywords).toContain("vegetable soup");

    expect(segments[19].text).toBe("For starter, I'd like the vegetable soup. For the main course, I'd like the grilled fish.");
    expect(segments[19].keywords).toContain("for starter");
    expect(segments[19].keywords).toContain("main course");
    expect(segments[19].keywords).toContain("grilled fish");

    expect(segments[20].text).toBe("I'll have the chicken soup and a lasagna.");
    expect(segments[20].keywords).toContain("chicken soup");
    expect(segments[20].keywords).toContain("lasagna");

    expect(segments[21].text).toBe("I'll have the chicken soup, the grilled chicken and some salad.");
    expect(segments[21].keywords).toContain("grilled chicken");

    expect(segments[22].text).toBe("Excellent, I'll be right back.");
  });

  it("Audit 4: Dining Experience: Hot Soup, Delicious Grilled Chicken, Lasagna & Passing Salt (Segments 23-35)", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    expect(segments[23].text).toBe("It smells so great!");
    expect(segments[23].keywords).toContain("smells so great");

    expect(segments[24].text).toBe("I am so hungry and I want to eat, but the soup is so hot, I can barely touch it.");
    expect(segments[24].keywords).toContain("barely touch");

    expect(segments[25].text).toBe("Wait for it to cool down before you eat it.");
    expect(segments[25].keywords).toContain("cool down");

    expect(segments[26].text).toBe("The grilled chicken tastes delicious, doesn't it, Paul?");
    expect(segments[26].properNouns).toContain("Paul");

    expect(segments[27].text).toBe("Yes dad, it does, indeed.");

    expect(segments[28].text).toBe("What about your lasagna, Amy?");
    expect(segments[28].properNouns).toContain("Amy");

    expect(segments[29].text).toBe("I love it, it's my favourite dish.");
    expect(segments[29].keywords).toContain("favourite dish");

    expect(segments[30].text).toBe("Great!");

    expect(segments[31].text).toBe("How's your fish, mom?");

    expect(segments[32].text).toBe("It's excellent. I'm so glad we came to this restaurant.");
    expect(segments[32].keywords).toContain("came to this restaurant");

    expect(segments[33].text).toBe("Could you please pass me the salt, Paul?");
    expect(segments[33].properNouns).toContain("Paul");
    expect(segments[33].keywords).toContain("pass me the salt");

    expect(segments[34].text).toBe("Here you are, mom.");

    expect(segments[35].text).toBe("Thank you.");
  });

  it("Audit 5: Desserts Ordering: Ice Cream, Chocolate Cake & Cheesecake (Segments 36-43)", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    expect(segments[36].text).toBe("Did you enjoy your meal?");
    expect(segments[36].keywords).toContain("enjoy your meal");

    expect(segments[37].text).toBe("Yes, it was wonderful, thank you.");

    expect(segments[38].text).toBe("Would you like something for dessert?");
    expect(segments[38].keywords).toContain("for dessert");

    expect(segments[39].text).toBe("Yes, for dessert, I'll have ice cream please.");
    expect(segments[39].keywords).toContain("ice cream");

    expect(segments[40].text).toBe("I'll have the chocolate cake.");
    expect(segments[40].keywords).toContain("chocolate cake");

    expect(segments[41].text).toBe("I'll have ice cream.");

    expect(segments[42].text).toBe("I'll have the cheese cake please.");
    expect(segments[42].keywords).toContain("cheese cake");

    expect(segments[43].text).toBe("Everything looks great! Let's eat the desserts!");
    expect(segments[43].keywords).toContain("desserts");
  });

  it("Audit 6: Son's Glass of Water, Bill Request & Checkout (Segments 44-52)", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    expect(segments[44].text).toBe("Dad, I'm thirsty. I would like to drink some water.");
    expect(segments[44].keywords).toContain("thirsty");

    expect(segments[45].text).toBe("Excuse me!");

    expect(segments[46].text).toBe("Yes, sir, how can I help you?");

    expect(segments[47].text).toBe("Could you bring my son a glass of water, please?");
    expect(segments[47].keywords).toContain("glass of water");

    expect(segments[48].text).toBe("Yes, of course!");

    expect(segments[49].text).toBe("Thank you.");

    expect(segments[50].text).toBe("Can I bring you anything else?");
    expect(segments[50].keywords).toContain("anything else");

    expect(segments[51].text).toBe("No, thank you, just the bill.");
    expect(segments[51].keywords).toContain("just the bill");

    expect(segments[52].text).toBe("Ok sir. I'll be right back with the bill.");
    expect(segments[52].keywords).toContain("right back with the bill");
  });
});
