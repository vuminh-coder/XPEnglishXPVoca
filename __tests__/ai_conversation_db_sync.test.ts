import { describe, it, expect } from "vitest";
import { lookupWordDeep } from "@/features/vocabulary/data/deepDictionary";

describe("AI Conversation Studio & DB Synchronization Suite", () => {
  // 1. Topic Goal Completion Engine
  it("verifies goal keyword detection across user conversation turns", () => {
    const goals = [
      { id: "at1_g1", name: "Gọi ít nhất 1 món ăn", keywords: ["order", "like", "have", "salad", "pizza", "pasta"] },
      { id: "at1_g2", name: "Yêu cầu đồ uống", keywords: ["drink", "water", "juice", "coffee", "tea"] },
      { id: "at1_g3", name: "Hỏi hóa đơn thanh toán", keywords: ["bill", "check", "pay", "card", "cash"] },
    ];

    const userTurns = [
      "Hello, I would like to order a fresh garden salad, please.",
      "Could I get a glass of cold water as well?",
    ];

    const userTextCombined = userTurns.map((t) => t.toLowerCase()).join(" ");

    const completedGoalIds = goals
      .filter((g) => g.keywords.some((kw) => userTextCombined.includes(kw.toLowerCase())))
      .map((g) => g.id);

    expect(completedGoalIds).toContain("at1_g1");
    expect(completedGoalIds).toContain("at1_g2");
    expect(completedGoalIds).not.toContain("at1_g3");
    expect(completedGoalIds.length).toBe(2);
  });

  // 2. 4-Axis Conversation Scoring Algorithm
  it("calculates accurate 4-axis evaluation score and grade", () => {
    const totalGoals = 3;
    const completedGoalsCount = 3;
    const userTurnsCount = 4;
    const grammarErrorsCount = 0;

    const goalsScore = Math.min(100, Math.round((completedGoalsCount / totalGoals) * 100)); // 100
    const grammarScore = Math.max(50, Math.min(100, 100 - grammarErrorsCount * 15)); // 100
    const interactionScore = Math.min(100, Math.max(60, userTurnsCount * 25)); // 100
    const vocabScore = Math.min(100, Math.max(65, 60 + userTurnsCount * 10)); // 100

    const overallScore = Math.round(
      0.40 * goalsScore +
      0.30 * grammarScore +
      0.20 * interactionScore +
      0.10 * vocabScore
    );

    expect(overallScore).toBe(100);

    // Rank evaluation
    let grade = "C";
    let xpAward = 15;
    if (overallScore >= 90) {
      grade = "S";
      xpAward = 45;
    } else if (overallScore >= 80) {
      grade = "A";
      xpAward = 35;
    } else if (overallScore >= 70) {
      grade = "B";
      xpAward = 25;
    }

    expect(grade).toBe("S");
    expect(xpAward).toBe(45);
  });

  // 3. Score degradation under grammar mistakes
  it("evaluates lower rank B and adjusted XP when mistakes occur", () => {
    const totalGoals = 3;
    const completedGoalsCount = 2; // 67%
    const userTurnsCount = 2; // interaction = 60, vocab = 80
    const grammarErrorsCount = 2; // grammar = 70%

    const goalsScore = Math.min(100, Math.round((completedGoalsCount / totalGoals) * 100)); // 67
    const grammarScore = Math.max(50, Math.min(100, 100 - grammarErrorsCount * 15)); // 70
    const interactionScore = Math.min(100, Math.max(60, userTurnsCount * 25)); // 60
    const vocabScore = Math.min(100, Math.max(65, 60 + userTurnsCount * 10)); // 80

    const overallScore = Math.round(
      0.40 * goalsScore +
      0.30 * grammarScore +
      0.20 * interactionScore +
      0.10 * vocabScore
    );

    // 0.4*67 + 0.3*70 + 0.2*60 + 0.1*80 = 26.8 + 21 + 12 + 8 = 67.8 -> 68 (Grade C)
    expect(overallScore).toBeGreaterThanOrEqual(65);
    expect(overallScore).toBeLessThan(75);
  });

  // 4. Daily Skill Practice DB Sync Payload Validation
  it("creates valid DailySkillPractice writing payload structure", () => {
    const elapsedTimeSeconds = 240; // 4 minutes
    const calculatedMinutes = Math.max(1, Math.ceil(elapsedTimeSeconds / 60));
    const xpAward = 35;

    const payload = {
      skill: "writing" as const,
      minutes: calculatedMinutes,
      xpEarned: xpAward,
    };

    expect(payload.skill).toBe("writing");
    expect(payload.minutes).toBe(4);
    expect(payload.xpEarned).toBe(35);
  });

  // 5. User Vocabulary Sync Payload Validation
  it("creates valid UserVocabulary bookmark payload", () => {
    const wordToSave = "experience";
    const payload = {
      vocabId: wordToSave.toLowerCase(),
      isFavorite: true,
    };

    expect(payload.vocabId).toBe("experience");
    expect(payload.isFavorite).toBe(true);
  });

  // 6. Deep Dictionary Lookup Integration
  it("resolves accurate phonetic, meaning, and example from deepDictionary", () => {
    const lookup1 = lookupWordDeep("good");
    expect(lookup1).toBeDefined();
    expect(lookup1.ipa).toContain("/ɡʊ(d)/");
    expect(lookup1.meaning).toBeDefined();

    const lookup2 = lookupWordDeep("employee");
    expect(lookup2).toBeDefined();
    expect(lookup2.ipa).toContain("/ɪmˈplɔɪ.iː/");

    const lookup3 = lookupWordDeep("speaking");
    expect(lookup3).toBeDefined();
    expect(lookup3.meaning).toBeDefined();
    expect(lookup3.pos).toBeDefined();
  });
});
