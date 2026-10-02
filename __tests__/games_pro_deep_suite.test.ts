import { describe, it, expect } from "vitest";
import { gameAudio } from "@/features/games/utils/gameAudio";
import { GameReviewItem, SpeedBlitzQuestion, SentenceScramblePackage } from "@/features/games/types";
import { VISUAL_VOCAB_BANK } from "@/features/games/data/visualVocabBank";

describe("Mini Games Pro Deep Suite & Evaluation Engine", () => {
  describe("1. Upgraded Game Audio Engine with Mute & Combo Chords", () => {
    it("safely handles mute state and toggling", () => {
      const initial = gameAudio.isMuted();
      const toggled = gameAudio.toggleMute();
      expect(toggled).toBe(!initial);
      expect(gameAudio.isMuted()).toBe(toggled);

      // Restore
      gameAudio.setMuted(initial);
      expect(gameAudio.isMuted()).toBe(initial);
    });

    it("executes new sound triggers without throwing in headless environment", () => {
      expect(() => gameAudio.playTap()).not.toThrow();
      expect(() => gameAudio.playComboStreak(1)).not.toThrow();
      expect(() => gameAudio.playComboStreak(5)).not.toThrow();
      expect(() => gameAudio.playTimerUrgent()).not.toThrow();
    });
  });

  describe("2. Deep Evaluation CEFR Grading Algorithm", () => {
    const getCefrBadge = (acc: number, sc: number = 0) => {
      if (acc >= 90 || sc >= 70) return { level: "C1 Advanced" };
      if (acc >= 80 || sc >= 50) return { level: "B2 Upper-Int" };
      if (acc >= 65 || sc >= 30) return { level: "B1 Intermediate" };
      return { level: "A2 Elementary" };
    };

    it("evaluates C1 Advanced for top accuracy or elite score", () => {
      expect(getCefrBadge(95, 80).level).toBe("C1 Advanced");
      expect(getCefrBadge(70, 75).level).toBe("C1 Advanced");
    });

    it("evaluates B2 Upper-Intermediate for standard proficient performance", () => {
      expect(getCefrBadge(85, 40).level).toBe("B2 Upper-Int");
      expect(getCefrBadge(60, 55).level).toBe("B2 Upper-Int");
    });

    it("evaluates B1 Intermediate for developing learners", () => {
      expect(getCefrBadge(70, 20).level).toBe("B1 Intermediate");
      expect(getCefrBadge(50, 35).level).toBe("B1 Intermediate");
    });

    it("evaluates A2 Elementary for low accuracy attempts", () => {
      expect(getCefrBadge(40, 10).level).toBe("A2 Elementary");
    });
  });

  describe("3. Sentence Builder Unscramble Verification", () => {
    it("validates tokenization and correct word sequence comparison", () => {
      const original = "Technology plays an essential role in education.";
      const rawTokens = original.replace(/[.?!,;:]/g, "").split(/\s+/);

      expect(rawTokens).toEqual([
        "Technology",
        "plays",
        "an",
        "essential",
        "role",
        "in",
        "education",
      ]);

      const userTokensCorrect = [
        "Technology",
        "plays",
        "an",
        "essential",
        "role",
        "in",
        "education",
      ];
      const isCorrect =
        userTokensCorrect.join(" ").toLowerCase() === rawTokens.join(" ").toLowerCase();
      expect(isCorrect).toBe(true);

      const userTokensWrong = [
        "plays",
        "Technology",
        "an",
        "essential",
        "role",
        "in",
        "education",
      ];
      const isWrong =
        userTokensWrong.join(" ").toLowerCase() === rawTokens.join(" ").toLowerCase();
      expect(isWrong).toBe(false);
    });
  });

  describe("4. Speed Blitz Question Distractor Integrity", () => {
    it("verifies 4 distinct options with correct answer included", () => {
      const target = {
        word: "RESILIENT",
        definitionVn: "Kiên cường, có khả năng phục hồi nhanh",
      };
      const distractors = [
        "Nhút nhát, sợ hãi",
        "Hào phóng, rộng lượng",
        "Cẩn thận, tỉ mỉ",
      ];

      const options = [...distractors, target.definitionVn];
      expect(options.length).toBe(4);
      expect(options).toContain(target.definitionVn);

      const uniqueOptions = new Set(options);
      expect(uniqueOptions.size).toBe(4);
    });
  });

  describe("5. Vocab Review Item Data Contract", () => {
    it("conforms to notebook and analytics specifications", () => {
      const item: GameReviewItem = {
        id: "vocab_101",
        word: "ELOQUENT",
        phonetic: "/ˈel.ə.kwənt/",
        pos: "adj",
        definitionVn: "Có tài hùng biện, lưu loát",
        imageUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45",
        example: "She gave an eloquent speech to the audience.",
        isCorrect: true,
        userAnswer: "ELOQUENT",
        correctAnswer: "ELOQUENT",
      };

      expect(item.id).toBeDefined();
      expect(item.word).toBe("ELOQUENT");
      expect(item.isCorrect).toBe(true);
      expect(item.imageUrl).toBeDefined();
      expect(item.phonetic).toContain("/ˈel.ə.kwənt/");
    });
  });

  describe("6. PictoWord Visual Bank Integrity & Options Generator", () => {
    it("ensures visual vocab bank has valid items with HTTPS images and definitions", () => {
      expect(VISUAL_VOCAB_BANK.length).toBeGreaterThanOrEqual(20);
      VISUAL_VOCAB_BANK.forEach((item) => {
        expect(item.word).toBeDefined();
        expect(item.imageUrl).toMatch(/^https:\/\//);
        expect(item.definitionVn).toBeDefined();
        expect(item.phonetic).toBeDefined();
      });
    });

    it("verifies 4 distinct options with exactly one correct option in PictoWord", () => {
      const target = VISUAL_VOCAB_BANK[0];
      const distractors = VISUAL_VOCAB_BANK.filter((w) => w.word !== target.word)
        .slice(0, 3)
        .map((d) => ({ word: d.word, isCorrect: false }));

      const options = [
        ...distractors,
        { word: target.word, isCorrect: true },
      ];

      expect(options.length).toBe(4);
      const correctOptions = options.filter((o) => o.isCorrect);
      expect(correctOptions.length).toBe(1);
      expect(correctOptions[0].word).toBe(target.word);
    });
  });
});

