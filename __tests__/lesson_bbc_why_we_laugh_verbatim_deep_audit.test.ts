import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { LESSON_BBC_WHY_WE_LAUGH } from "@/features/listening/data/lessons/lesson_bbc_why_we_laugh";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("BBC 6 Minute English: Why Laughter is the Best Medicine - Verbatim Deep Audit Suite", () => {
  it("should match 100% word-for-word against official BBC json3 events without omission or hallucination", () => {
    const subPath = path.resolve(process.cwd(), "scripts/bbc_why_laugh_official.en-GB.json3");
    expect(fs.existsSync(subPath)).toBe(true);

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const rawOfficialText = sub.events
      .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
      .join(" ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    function cleanWords(s: string): string[] {
      return s
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/--/g, " ")
        .replace(/—/g, " ")
        .replace(/['"]+/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
    }

    const officialWords = cleanWords(rawOfficialText);
    const lessonWords: string[] = [];
    LESSON_BBC_WHY_WE_LAUGH.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

    // Normalize spacing artifacts in BBC transcript (e.g. "it s" -> "its", "you re" -> "youre")
    function normList(words: string[]): string[] {
      const res: string[] = [];
      let i = 0;
      while (i < words.length) {
        if (i + 1 < words.length && words[i] === "it" && words[i + 1] === "s") {
          res.push("its");
          i += 2;
        } else if (i + 1 < words.length && words[i] === "you" && words[i + 1] === "re") {
          res.push("youre");
          i += 2;
        } else {
          res.push(words[i]);
          i += 1;
        }
      }
      return res;
    }

    const normalizedOfficial = normList(officialWords);
    expect(lessonWords.length).toBe(953);
    expect(normalizedOfficial.length).toBe(953);
    expect(lessonWords).toEqual(normalizedOfficial);
  });

  it("should successfully tokenize every segment with DictationWorkspace tokenizer with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_BBC_WHY_WE_LAUGH.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(900);
  });

  it("should strictly respect Zero Merged Utterances across speaker transitions", () => {
    // Check turn transition 1: Sam greeting -> Neil greeting
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[1].text).toBe("I'm Sam.");
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[2].text).toBe("And I'm Neil.");

    // Check turn transition 2: Joke & punchline
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[4].text).toBe("Question: what's a rat's favourite game?");
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[5].text).toBe("I don't know, Sam, what is a rat's favourite game?");
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[6].text).toBe("Hide and squeak!");
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[7].text).toBe("Ha-ha-ha! Very funny!");

    // Check turn transition 3: Quiz answer
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[55].text).toBe("So, the answer must be... Gelotology!");
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[56].text).toBe("The correct answer!");

    // Check turn transition 4: Outro
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[67].text).toBe("Bye for now!");
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[68].text).toBe("Goodbye!");
  });

  it("should ensure accurate time boundaries spanning from 02.78s to 368.66s", () => {
    const firstSeg = LESSON_BBC_WHY_WE_LAUGH.segments[0];
    const lastSeg = LESSON_BBC_WHY_WE_LAUGH.segments[68];

    expect(firstSeg.startTime).toBe(2.78);
    expect(lastSeg.endTime).toBe(368.66);
  });

  it("should verify accurate bilingual quiz answers against corresponding master segments", () => {
    const quiz = LESSON_BBC_WHY_WE_LAUGH.quiz!;
    for (const q of quiz.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      const refSeg = LESSON_BBC_WHY_WE_LAUGH.segments[q.referenceSegmentIndex!];
      expect(refSeg).toBeDefined();

      if (q.id === "q_bbc_why_we_laugh_1") {
        expect(refSeg.text).toContain("Hide and squeak");
      } else if (q.id === "q_bbc_why_we_laugh_2") {
        expect(refSeg.text).toContain("endorphins");
      } else if (q.id === "q_bbc_why_we_laugh_3") {
        expect(refSeg.text).toContain("funny bones");
      } else if (q.id === "q_bbc_why_we_laugh_4") {
        expect(refSeg.text).toContain("Gelotology");
      } else if (q.id === "q_bbc_why_we_laugh_5") {
        expect(refSeg.text).toContain("contractions of the rib cage");
      } else if (q.id === "q_bbc_why_we_laugh_6") {
        expect(refSeg.text).toContain("drum to amplify");
      } else if (q.id === "q_bbc_why_we_laugh_7") {
        expect(refSeg.text).toContain("giggle");
      } else if (q.id === "q_bbc_why_we_laugh_8") {
        expect(refSeg.text).toContain("invitation to play");
      }
    }
  });

  it("should ensure all translationVi and explanationAi are high quality and non-empty", () => {
    for (const seg of LESSON_BBC_WHY_WE_LAUGH.segments) {
      expect(seg.translationVi.length).toBeGreaterThan(5);
      expect(seg.explanationAi!.length).toBeGreaterThan(15);
      expect(seg.translationVi).not.toContain("TODO");
      expect(seg.explanationAi).not.toContain("TODO");
    }
  });
});
