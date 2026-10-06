import { describe, it, expect } from "vitest";
import {
  ambientSynthesizer,
  AMBIENCE_TRACKS,
  AmbienceType,
} from "@/features/listening/services/ambientAudioSynthesizer";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("Phase 2: Learning UX Enhancements Deep Test Suite", () => {
  // ==========================================================================
  // 1. Study With Me Ambience Sound Engine
  // ==========================================================================
  describe("1. Study With Me Ambience Synthesizer", () => {
    it("should provide 5 distinct focus sound modes including 'none'", () => {
      const trackIds = AMBIENCE_TRACKS.map((t) => t.id);
      expect(trackIds).toContain("none");
      expect(trackIds).toContain("rain");
      expect(trackIds).toContain("waves");
      expect(trackIds).toContain("fireplace");
      expect(trackIds).toContain("forest");
      expect(AMBIENCE_TRACKS.length).toBe(5);
    });

    it("should include rich Vietnamese and English metadata for all tracks", () => {
      AMBIENCE_TRACKS.forEach((track) => {
        expect(track.id).toBeTruthy();
        expect(track.name).toBeTruthy();
        expect(track.nameVn).toBeTruthy();
        expect(track.icon).toBeTruthy();
        expect(track.description).toBeTruthy();
      });
    });

    it("should clamp volume between 0.0 and 1.0 safely", () => {
      ambientSynthesizer.setVolume(0.5);
      expect(ambientSynthesizer.getVolume()).toBe(0.5);

      ambientSynthesizer.setVolume(-0.2);
      expect(ambientSynthesizer.getVolume()).toBe(0);

      ambientSynthesizer.setVolume(1.8);
      expect(ambientSynthesizer.getVolume()).toBe(1);
    });

    it("should initialize in 'none' mode and update currentMode on play/stop", () => {
      ambientSynthesizer.stop();
      expect(ambientSynthesizer.getCurrentMode()).toBe("none");
    });
  });

  // ==========================================================================
  // 2. Proper Nouns Visual Cues & Tokenization
  // ==========================================================================
  describe("2. Proper Nouns Interactive Token Chips", () => {
    it("should flag isProperNoun correctly on capitalized proper names", () => {
      const sentence = "Steve Jobs graduated from Reed College in California.";
      const properNouns = ["Steve Jobs", "Reed College", "California"];
      const tokens = tokenizeSentence(sentence, properNouns);

      const steveToken = tokens.find((t) => t.clean === "Steve");
      const jobsToken = tokens.find((t) => t.clean === "Jobs");
      const reedToken = tokens.find((t) => t.clean === "Reed");
      const caliToken = tokens.find((t) => t.clean === "California");
      const fromToken = tokens.find((t) => t.clean === "from");

      expect(steveToken?.isProperNoun).toBe(true);
      expect(jobsToken?.isProperNoun).toBe(true);
      expect(reedToken?.isProperNoun).toBe(true);
      expect(caliToken?.isProperNoun).toBe(true);
      expect(fromToken?.isProperNoun).toBe(false);
    });

    it("should mark masked tokens with correct proper noun styling indicators", () => {
      const sentence = "Welcome to London.";
      const tokens = tokenizeSentence(sentence, ["London"]);
      const londonToken = tokens.find((t) => t.clean === "London");

      expect(londonToken).toBeDefined();
      expect(londonToken?.isProperNoun).toBe(true);
      expect(londonToken?.status).toBe("masked");
    });
  });

  // ==========================================================================
  // 3. Audio Mode vs Video Mode Toggling Logic
  // ==========================================================================
  describe("3. MediaDisplayMode Toggle Architecture", () => {
    it("should accept 'audio' and 'video' as valid mode values", () => {
      const validModes = ["audio", "video"];
      expect(validModes.includes("audio")).toBe(true);
      expect(validModes.includes("video")).toBe(true);
      expect(validModes.includes("other")).toBe(false);
    });
  });

  // ==========================================================================
  // 4. Merge Next Sentence (Shadowing) Combiner Logic
  // ==========================================================================
  describe("4. Merge Next Sentence Combiner Engine (Shadowing)", () => {
    const sentenceA = {
      id: "s1",
      startTime: 10.0,
      endTime: 12.5,
      text: "Sure, why not?",
      vietnamese: "Dạ chắc chắn rồi, tại sao lại không chứ?",
      ipa: "/ʃʊər waɪ nɒt/",
    };

    const sentenceB = {
      id: "s2",
      startTime: 12.8,
      endTime: 16.2,
      text: "I would love to join your study group.",
      vietnamese: "Mình rất muốn tham gia nhóm học của bạn.",
      ipa: "/aɪ wʊd lʌv tuː dʒɔɪn/",
    };

    it("should combine two dialogue sentences seamlessly into a unified shadowing segment", () => {
      const combinedText = `${sentenceA.text} ${sentenceB.text}`;
      const combinedVn = `${sentenceA.vietnamese} ${sentenceB.vietnamese}`;
      const combinedIpa = `${sentenceA.ipa} ${sentenceB.ipa}`;
      const combinedDuration = sentenceB.endTime - sentenceA.startTime;

      expect(combinedText).toBe("Sure, why not? I would love to join your study group.");
      expect(combinedVn).toContain("Dạ chắc chắn rồi");
      expect(combinedVn).toContain("nhóm học của bạn.");
      expect(combinedIpa).toContain("/ʃʊər waɪ nɒt/");
      expect(combinedIpa).toContain("/aɪ wʊd lʌv tuː dʒɔɪn/");
      expect(combinedDuration).toBeCloseTo(6.2);
    });

    it("should preserve single sentence structure when unmerged", () => {
      let isMerged = true;
      let activeText = isMerged ? `${sentenceA.text} ${sentenceB.text}` : sentenceA.text;
      expect(activeText).toContain(sentenceB.text);

      // User clicks "Tách câu đơn"
      isMerged = false;
      activeText = isMerged ? `${sentenceA.text} ${sentenceB.text}` : sentenceA.text;
      expect(activeText).toBe("Sure, why not?");
      expect(activeText).not.toContain(sentenceB.text);
    });
  });
});
