import { describe, it, expect } from "vitest";
import {
  LESSON_MEDICAL_CONSULTATION,
  QUIZ_MEDICAL_CONSULTATION,
} from "../features/listening/data/lessons/lesson_medical_consultation";

describe("Medical English: Doctor Consultation & Pharmacy Prescription (vid_medical_consultation) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Reception Greeting & Walk-in Appointment Booking (Segments 1-8)", () => {
    const segments = LESSON_MEDICAL_CONSULTATION.segments;
    expect(segments[0].text).toBe("Hello.");
    expect(segments[1].text).toBe("Hello.");

    expect(segments[2].text).toBe("What can I do for you today?");
    expect(segments[2].keywords).toContain("what can I do");

    expect(segments[3].text).toBe("I would like to see Dr. David.");
    expect(segments[3].properNouns).toContain("Dr. David");
    expect(segments[3].keywords).toContain("would like to see");

    expect(segments[4].text).toBe("Do you have an appointment?");
    expect(segments[4].keywords).toContain("appointment");

    expect(segments[5].text).toBe("No, I don't.");

    expect(segments[6].text).toBe("Dr. David is busy with a patient. If you want to see Dr. David, then you need to make an appointment.");
    expect(segments[6].properNouns).toContain("Dr. David");
    expect(segments[6].keywords).toContain("busy with a patient");

    expect(segments[7].text).toBe("Okay, I would like to make an appointment.");
    expect(segments[7].keywords).toContain("make an appointment");
  });

  it("Audit 2: Name, Age 23, Fever Symptom & Token Number 23 (Segments 9-15)", () => {
    const segments = LESSON_MEDICAL_CONSULTATION.segments;
    expect(segments[8].text).toBe("Can I have your name and age, please?");
    expect(segments[8].keywords).toContain("name and age");

    expect(segments[9].text).toBe("My name is Kate, I am 23.");
    expect(segments[9].properNouns).toContain("Kate");
    expect(segments[9].keywords).toContain("23");

    expect(segments[10].text).toBe("And what is your diagnosis?");
    expect(segments[10].keywords).toContain("diagnosis");

    expect(segments[11].text).toBe("I think I have a fever.");
    expect(segments[11].keywords).toContain("have a fever");

    expect(segments[12].text).toBe("Here is your token number. Please wait in the waiting hall. I will let you know when your turn comes.");
    expect(segments[12].keywords).toContain("token number");
    expect(segments[12].keywords).toContain("waiting hall");

    expect(segments[13].text).toBe("Fine, thank you.");

    expect(segments[14].text).toBe("Token number 23, Miss Kate, it is your turn. Please go to the doctor's room.");
    expect(segments[14].properNouns).toContain("Miss Kate");
    expect(segments[14].keywords).toContain("token number 23");
    expect(segments[14].keywords).toContain("doctor's room");
  });

  it("Audit 3: Clinical Consultation, Mild Fever & 120 over 80 Blood Pressure (Segments 16-23)", () => {
    const segments = LESSON_MEDICAL_CONSULTATION.segments;
    expect(segments[15].text).toBe("Hello, Miss Kate.");
    expect(segments[15].properNouns).toContain("Miss Kate");

    expect(segments[16].text).toBe("Hello, Doctor.");

    expect(segments[17].text).toBe("What is the matter?");
    expect(segments[17].keywords).toContain("what is the matter");

    expect(segments[18].text).toBe("I have a fever, I am not feeling well.");
    expect(segments[18].keywords).toContain("fever");
    expect(segments[18].keywords).toContain("not feeling well");

    expect(segments[19].text).toBe("Let me examine you. You have a mild fever.");
    expect(segments[19].keywords).toContain("examine");
    expect(segments[19].keywords).toContain("mild fever");

    expect(segments[20].text).toBe("I feel terrible.");
    expect(segments[20].keywords).toContain("feel terrible");

    expect(segments[21].text).toBe("Let me check your blood pressure level. Roll up your sleeve.");
    expect(segments[21].keywords).toContain("blood pressure level");
    expect(segments[21].keywords).toContain("roll up your sleeve");

    expect(segments[22].text).toBe("Your blood pressure level is fine: 120 over 80. No need to worry, I am prescribing you some medicines.");
    expect(segments[22].keywords).toContain("120 over 80");
    expect(segments[22].keywords).toContain("prescribing medicines");
  });

  it("Audit 4: Prescription Dosage: Two Tablets Thrice a Day After Meals (Segments 24-28)", () => {
    const segments = LESSON_MEDICAL_CONSULTATION.segments;
    expect(segments[23].text).toBe("Here is the prescription. Take two tablets thrice a day.");
    expect(segments[23].keywords).toContain("prescription");
    expect(segments[23].keywords).toContain("two tablets");
    expect(segments[23].keywords).toContain("thrice a day");

    expect(segments[24].text).toBe("With meal or without meal?");
    expect(segments[24].keywords).toContain("with meal");

    expect(segments[25].text).toBe("After having meal, you can take your medicine, and have some rest after taking the medicine.");
    expect(segments[25].keywords).toContain("after having meal");
    expect(segments[25].keywords).toContain("take your medicine");
    expect(segments[25].keywords).toContain("have some rest");

    expect(segments[26].text).toBe("Thank you.");
    expect(segments[27].text).toBe("Get well soon.");
    expect(segments[27].keywords).toContain("get well soon");
  });

  it("Audit 5: Pharmacy Counter: Prescription Fulfillment, Cost $8.67 & Change (Segments 29-38)", () => {
    const segments = LESSON_MEDICAL_CONSULTATION.segments;
    expect(segments[28].text).toBe("Hello.");
    expect(segments[29].text).toBe("Hello.");

    expect(segments[30].text).toBe("What can I do for you?");
    expect(segments[30].keywords).toContain("what can I do for you");

    expect(segments[31].text).toBe("Give me these medicines according to this prescription.");
    expect(segments[31].keywords).toContain("medicines");
    expect(segments[31].keywords).toContain("prescription");

    expect(segments[32].text).toBe("Okay, ma'am, I will be right back.");
    expect(segments[32].keywords).toContain("ma'am");
    expect(segments[32].keywords).toContain("right back");

    expect(segments[33].text).toBe("Here you go.");
    expect(segments[33].keywords).toContain("here you go");

    expect(segments[34].text).toBe("Thanks. How much is this medicine?");
    expect(segments[34].keywords).toContain("how much");

    expect(segments[35].text).toBe("It costs 8.67.");
    expect(segments[35].keywords).toContain("8.67");

    expect(segments[36].text).toBe("Here you go.");

    expect(segments[37].text).toBe("Here is your change.");
    expect(segments[37].keywords).toContain("change");
  });
});
