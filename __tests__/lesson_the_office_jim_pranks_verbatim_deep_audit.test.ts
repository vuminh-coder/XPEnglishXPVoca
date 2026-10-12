import { describe, it, expect } from "vitest";
import {
  LESSON_THE_OFFICE_JIM_PRANKS_ON_DWIGHT,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_the_office_jim_pranks";

describe("The Office: Jim's Best Pranks - Verbatim & Iconic Scene Deep Audit", () => {
  const segments = LESSON_THE_OFFICE_JIM_PRANKS_ON_DWIGHT.segments;
  const fullDialogue = segments.map((s) => s.text).join(" ");

  it("Act 1: should faithfully capture the Gift-Wrapped Desk prank", () => {
    expect(fullDialogue).toContain("black belt in gift wrapping");
    expect(fullDialogue).toContain("skin a mule deer in less than ten minutes");
    expect(fullDialogue).toContain("take it apart in about five minutes");

    const giftWrapSegs = segments.filter((s) => s.startTime >= 7.0 && s.endTime <= 40.0);
    expect(giftWrapSegs.length).toBeGreaterThanOrEqual(10);
  });

  it("Act 2: should faithfully capture the Dwight Impersonation ('Bears. Beets. Battlestar Galactica.')", () => {
    expect(fullDialogue).toContain("What kind of bear is best?");
    expect(fullDialogue).toContain("False. Black bear.");
    expect(fullDialogue).toContain("two schools of thought");
    expect(fullDialogue).toContain("Bears. Beets. Battlestar Galactica.");
    expect(fullDialogue).toContain("grand total of eleven dollars");
    expect(fullDialogue).toContain("Imitation is the most sincere form of flattery");
    expect(fullDialogue).toContain("Identity theft is not a joke, Jim!");
    expect(fullDialogue).toContain("MICHAEL!");
  });

  it("Act 3: should faithfully capture the William M. Buttlicker sales roleplay disaster", () => {
    expect(fullDialogue).toContain("Bill Buttlicker");
    expect(fullDialogue).toContain("My family built this country");
    expect(fullDialogue).toContain("hard of hearing");
    expect(fullDialogue).toContain("BUTTLICKER! OUR PRICES HAVE NEVER BEEN LOWER!");
    expect(fullDialogue).toContain("aggressive, hostile, and definitely difficult");
    expect(fullDialogue).toContain("one million dollars worth of paper");
    expect(fullDialogue).toContain("fire the salesman that treated me so terribly");
    expect(fullDialogue).toContain("million dollar sale");
  });

  it("Act 4: should faithfully capture the Faxes From Future Dwight prank", () => {
    expect(fullDialogue).toContain("box of Dwight's stationery");
    expect(fullDialogue).toContain("faxes, from himself, from the future");
    expect(fullDialogue).toContain("someone poisons the coffee");
    expect(fullDialogue).toContain("Cordially, Future Dwight");
    expect(fullDialogue).toContain("You'll thank me later");
  });

  it("Act 5: should faithfully capture the Desk in the Restroom / Hot & Cold Game", () => {
    expect(fullDialogue).toContain("Where is my desk?!");
    expect(fullDialogue).toContain("retrace your steps");
    expect(fullDialogue).toContain("Colder... Warmer... little warmer");
    expect(fullDialogue).toContain("Hot! Red hot! Very hot...");
    expect(fullDialogue).toContain("twenty-pound white box");
  });

  it("Act 6: should faithfully capture Dwight's HR complaints & the Marijuana interrogation reversal", () => {
    expect(fullDialogue).toContain("replaced all my pens and pencils with crayons");
    expect(fullDialogue).toContain("Everyone has called me Dwayne all day");
    expect(fullDialogue).toContain("five bucks each. It was totally worth it");
    expect(fullDialogue).toContain("Marijuana is a memory loss drug");
    expect(fullDialogue).toContain("how much pot did you smoke");
    expect(fullDialogue).toContain("bloody glove");
    expect(fullDialogue).toContain("Meredith on the can");
    expect(fullDialogue).toContain("submission signal in primates");
    expect(fullDialogue).toContain("middle name is Kurt, not fart");
    expect(fullDialogue).toContain("knocked myself in the head with the phone");
    expect(fullDialogue).toContain("nickels into his handset");
    expect(fullDialogue).toContain("typed my name, it said diapers");
  });

  it("Act 7 & 8: should faithfully capture Asian Jim and the Telekinesis coat rack prank", () => {
    expect(fullDialogue).toContain("Jim's not Asian!");
    expect(fullDialogue).toContain("hats off to you for not seeing race");
    expect(fullDialogue).toContain("Wellington Systems");
    expect(fullDialogue).toContain("dinner reservation tonight at seven-thirty");
    expect(fullDialogue).toContain("Steve is an actor friend of ours");
    expect(fullDialogue).toContain("Roulette is not a game of skill, it is a game of chance");
    expect(fullDialogue).toContain("Mind control");
    expect(fullDialogue).toContain("telekinetic powers, and he needs absolute silence");
    expect(fullDialogue).toContain("Oh my god!");
  });
});
