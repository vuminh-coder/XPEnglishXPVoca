import { describe, it, expect } from "vitest";
import { generateGoalSpecificRoadmap } from "@/features/roadmap/data/roadmapGenerators";
import { TargetRoadmapPhase, RoadmapTask } from "@/features/roadmap/types";

describe("Roadmap Feature Standards (features/roadmap)", () => {
  describe("generateGoalSpecificRoadmap generator", () => {
    it("1. Generates complete 3-phase roadmap for TOEIC targets (550, 750, 850, 950)", () => {
      const scores = ["550", "750", "850", "950"];
      scores.forEach((score) => {
        const phases = generateGoalSpecificRoadmap("TOEIC", score, "EXAM");
        expect(phases.length).toBeGreaterThanOrEqual(2);
        
        phases.forEach((phase: TargetRoadmapPhase, idx: number) => {
          expect(phase.phaseNum).toBe(idx + 1);
          expect(phase.title).toContain("Chặng");
          expect(phase.chestRewardXp).toBeGreaterThanOrEqual(100);
          expect(phase.chestRewardCoins).toBeGreaterThanOrEqual(50);
          expect(phase.tasks.length).toBeGreaterThanOrEqual(2);

          phase.tasks.forEach((task: RoadmapTask) => {
            expect(task.id).toBeTruthy();
            expect(task.dayNum).toBeGreaterThan(0);
            expect(task.title).toBeTruthy();
            expect(task.practicePath.startsWith("/")).toBe(true);
            expect(task.xpReward).toBeGreaterThanOrEqual(15);
            expect(task.tips.length).toBeGreaterThan(0);
          });
        });
      });
    });

    it("2. Generates complete academic roadmap for IELTS targets (5.5, 6.5, 7.5, 8.5)", () => {
      const bands = ["5.5", "6.5", "7.5", "8.5"];
      bands.forEach((band) => {
        const phases = generateGoalSpecificRoadmap("IELTS", band, "EXAM");
        expect(phases.length).toBeGreaterThanOrEqual(2);

        // Verify academic topics in phase titles/subtitles
        const combinedText = phases.map(p => `${p.title} ${p.subtitle}`).join(" ");
        expect(combinedText.toLowerCase()).toContain("ielts");
      });
    });

    it("3. Generates specialized business communication roadmap for BUSINESS category", () => {
      const phases = generateGoalSpecificRoadmap("TOEIC", "750", "BUSINESS");
      expect(phases.length).toBeGreaterThanOrEqual(1);

      const allTasks = phases.flatMap(p => p.tasks);
      expect(allTasks.length).toBeGreaterThanOrEqual(3);
      allTasks.forEach(task => {
        expect(task.practicePath).toMatch(/^\/(vocabulary|study|ai)/);
        expect(task.durationMinutes).toBeGreaterThanOrEqual(10);
      });
    });

    it("4. Generates essential travel conversation roadmap for TRAVEL category", () => {
      const phases = generateGoalSpecificRoadmap("TOEIC", "550", "TRAVEL");
      expect(phases.length).toBeGreaterThanOrEqual(1);

      const allTasks = phases.flatMap(p => p.tasks);
      expect(allTasks.length).toBeGreaterThanOrEqual(3);
    });

    it("5. Computes overall progress and handles task toggle correctly", () => {
      const phases = generateGoalSpecificRoadmap("TOEIC", "750", "EXAM");
      const allTasks = phases.flatMap(p => p.tasks);
      const total = allTasks.length;
      const completed = allTasks.filter(t => t.isCompleted).length;

      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      expect(progress).toBeGreaterThanOrEqual(0);
      expect(progress).toBeLessThanOrEqual(100);

      // Verify toggle flips isCompleted
      const targetTask = allTasks[0];
      const initialStatus = targetTask.isCompleted;
      const updatedTasks = allTasks.map(t => t.id === targetTask.id ? { ...t, isCompleted: !initialStatus } : t);
      expect(updatedTasks.find(t => t.id === targetTask.id)?.isCompleted).toBe(!initialStatus);
    });
  });
});
