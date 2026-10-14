import { describe, it, expect } from "vitest";
import {
  LESSON_HOTEL_CHECKIN,
  QUIZ_HOTEL_CHECKIN,
} from "../features/listening/data/lessons/lesson_hotel_checkin";

describe("English for Travel: Hotel Check-in & Guest Services (vid_travel_hotel_checkin) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Reception Greeting & Tom's 3-Night Reservation (Segments 0-2)", () => {
    const segments = LESSON_HOTEL_CHECKIN.segments;
    expect(segments[0].text).toBe("Good morning. Welcome to the Transnational Hotel. What can I do for you?");
    expect(segments[0].properNouns).toContain("Transnational Hotel");
    expect(segments[0].keywords).toContain("welcome");

    expect(segments[1].text).toBe("Good morning. My name is Tom Sanders. I have a reservation for a single room for three nights.");
    expect(segments[1].properNouns).toContain("Tom Sanders");
    expect(segments[1].keywords).toContain("reservation");
    expect(segments[1].keywords).toContain("single room");

    expect(segments[2].text).toBe("All right, Mr. Sanders. Let me pull up your reservation.");
    expect(segments[2].properNouns).toContain("Mr. Sanders");
    expect(segments[2].keywords).toContain("pull up");
  });

  it("Audit 2: Booking Glitch, Deposit & Reservation Number (Segments 3-6)", () => {
    const segments = LESSON_HOTEL_CHECKIN.segments;
    expect(segments[3].text).toBe("I can't seem to find a record of your booking. Did you book the room directly through us or do you use a hotel reservation service or a travel agent?");
    expect(segments[3].keywords).toContain("directly");
    expect(segments[3].keywords).toContain("travel agent");

    expect(segments[4].text).toBe("Well, I booked it directly through you. I've already also paid a deposit on the first night. I have a a reservation number if that helps.");
    expect(segments[4].keywords).toContain("booked directly");
    expect(segments[4].keywords).toContain("deposit");

    expect(segments[5].text).toBe("Yeah, sure. Can I see that, please? Thank you.");
    expect(segments[5].keywords).toContain("sure");

    expect(segments[6].text).toBe("Oh, I see. Maybe there was a glitch with the booking system.");
    expect(segments[6].keywords).toContain("glitch");
    expect(segments[6].keywords).toContain("booking system");
  });

  it("Audit 3: Adjoined Room Precaution & Free Business Suite Jacuzzi Upgrade (Segments 7-10)", () => {
    const segments = LESSON_HOTEL_CHECKIN.segments;
    expect(segments[7].text).toBe("Well, we don't have any more single rooms available with the exception of one adjoined room, but you would then be right next door to a family with children, which might get noisy.");
    expect(segments[7].keywords).toContain("adjoined room");
    expect(segments[7].keywords).toContain("with the exception of");

    expect(segments[8].text).toBe("But that's not a problem. I can upgrade you to one of our business suites. They all come with jacuzzi's.");
    expect(segments[8].keywords).toContain("upgrade");
    expect(segments[8].keywords).toContain("business suites");
    expect(segments[8].keywords).toContain("jacuzzi");

    expect(segments[9].text).toBe("Well, that sounds nice. Uh, but how much more is that going to cost?");
    expect(segments[9].keywords).toContain("how much more");

    expect(segments[10].text).toBe("That would of course be at no extra charge to you.");
    expect(segments[10].keywords).toContain("no extra charge");
  });

  it("Audit 4: Amenities, Wi-Fi Code & Airport Taxi (Segments 13-18)", () => {
    const segments = LESSON_HOTEL_CHECKIN.segments;
    expect(segments[13].text).toBe("Uh, what about the wireless internet?");
    expect(segments[13].keywords).toContain("wireless internet");

    expect(segments[14].text).toBe("Oh, it's really easy. This is your access code and instructions on how to use it. If you have any problems, feel free to call the front desk.");
    expect(segments[14].keywords).toContain("access code");
    expect(segments[14].keywords).toContain("front desk");

    expect(segments[15].text).toBe("And this is a list of all the hotel amenities like the gym and the indoor pool.");
    expect(segments[15].keywords).toContain("hotel amenities");
    expect(segments[15].keywords).toContain("indoor pool");

    expect(segments[17].text).toBe("You're welcome. Has the valet already taken your car or will you be needing a parking pass?");
    expect(segments[17].keywords).toContain("valet");
    expect(segments[17].keywords).toContain("parking pass");

    expect(segments[18].text).toBe("Oh, I don't have a car. I took a taxi direct from the airport.");
    expect(segments[18].keywords).toContain("taxi direct");
  });

  it("Audit 5: San Francisco West Coast & Big Apple Conference (Segments 19-27)", () => {
    const segments = LESSON_HOTEL_CHECKIN.segments;
    expect(segments[19].text).toBe("Oh, all right. Could I have some form of ID, please? And could you just fill out this registration form?");
    expect(segments[19].keywords).toContain("form of ID");
    expect(segments[19].keywords).toContain("registration form");

    expect(segments[20].text).toBe("Sure. Uh, here's my driver's license.");
    expect(segments[20].keywords).toContain("driver's license");

    expect(segments[21].text).toBe("Thank you. Oh, you're from San Francisco?");
    expect(segments[21].properNouns).toContain("San Francisco");

    expect(segments[22].text).toBe("Yes, I am all the way from the West Coast.");
    expect(segments[22].properNouns).toContain("West Coast");

    expect(segments[24].text).toBe("Yes, I did. Thank you. The flight was long, but it was smooth and I slept almost the whole way.");
    expect(segments[24].keywords).toContain("smooth");

    expect(segments[25].text).toBe("Oh, and is this your first time in the Big Apple?");
    expect(segments[25].properNouns).toContain("Big Apple");

    expect(segments[26].text).toBe("Yes, it is. I have a business conference to attend, but I'm looking forward to getting some sightseeing done as well.");
    expect(segments[26].keywords).toContain("business conference");
    expect(segments[26].keywords).toContain("sightseeing");

    expect(segments[27].text).toBe("Well, I'd be more than happy to give you some sightseeing tips if you need any.");
    expect(segments[27].keywords).toContain("sightseeing tips");
  });

  it("Audit 6: Key Handover, Room 653, Elevator Directions & Bellboy (Segments 29-36)", () => {
    const segments = LESSON_HOTEL_CHECKIN.segments;
    expect(segments[29].text).toBe("All right, I've got you all checked into your room. This is your room key. You're in room 653.");
    expect(segments[29].keywords).toContain("room key");
    expect(segments[29].keywords).toContain("room 653");

    expect(segments[30].text).toBe("Just take the elevator on the right up to the sixth floor. When you get off the elevator, turn right.");
    expect(segments[30].keywords).toContain("take the elevator");
    expect(segments[30].keywords).toContain("sixth floor");

    expect(segments[31].text).toBe("Your room is at the end of the corridor on the left hand side.");
    expect(segments[31].keywords).toContain("end of the corridor");

    expect(segments[32].text).toBe("Just leave your suitcase here and the bell boy will bring it up.");
    expect(segments[32].keywords).toContain("bell boy");

    expect(segments[34].text).toBe("If you need anything, please feel free to dial the front desk. Enjoy your stay.");
    expect(segments[34].keywords).toContain("dial the front desk");
    expect(segments[34].keywords).toContain("enjoy your stay");

    expect(segments[35].text).toBe("Thank you.");
    expect(segments[36].text).toBe("You're welcome.");
  });
});
