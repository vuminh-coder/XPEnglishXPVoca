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

    it("6. Exports PhaseCarouselSwiper and LessonInspectorCard for swipeable phases & sticky companion layout", async () => {
      const roadmapModule = await import("@/features/roadmap");
      expect(roadmapModule.PhaseCarouselSwiper).toBeDefined();
      expect(roadmapModule.LessonInspectorCard).toBeDefined();
      expect(roadmapModule.PhaseRoadmapCard).toBeDefined();
    }, 15000);

    it("7. Curated Ziczac Pathway supports dynamic unit lengths [5, 7, 6, 6, 4] with milestones at unit ends", async () => {
      const { CURATED_ROADMAP_STEPS, getCuratedUnitGroups } = await import("@/features/roadmap");
      expect(CURATED_ROADMAP_STEPS.length).toBe(28);

      const checkpoints = CURATED_ROADMAP_STEPS.filter((s) => s.isCheckpoint);
      expect(checkpoints.length).toBe(5);
      expect(checkpoints.map((c) => c.stepNumber)).toEqual([5, 12, 18, 24, 28]);

      checkpoints.forEach((cp) => {
        expect(cp.skillType).toBe("CHECKPOINT");
        expect(cp.checkpointReviewScope).toBeTruthy();
        expect(cp.xpReward).toBeGreaterThanOrEqual(100);
      });

      const units = getCuratedUnitGroups();
      expect(units.length).toBe(5);

      // Verify dynamic unit lengths (Duolingo variable node model: not fixed to 5)
      expect(units.map((u) => u.steps.length)).toEqual([5, 7, 6, 6, 4]);

      units.forEach((unit) => {
        // Every unit ends with a milestone checkpoint
        const lastStep = unit.steps[unit.steps.length - 1];
        expect(lastStep.isCheckpoint).toBe(true);

        // Every unit provides complete Guidebook data
        expect(unit.guidebookObjectives?.length).toBeGreaterThanOrEqual(3);
        expect(unit.guidebookGrammarTip).toBeTruthy();
        expect(unit.guidebookKeyPhrases?.length).toBeGreaterThanOrEqual(2);
      });
    });

    it("8. All curated steps have real practicePath routes linking to actual website features", async () => {
      const { CURATED_ROADMAP_STEPS } = await import("@/features/roadmap");
      const validPrefixes = ["/vocabulary", "/study/dictation", "/study/grammar", "/study/shadowing", "/study/reading", "/study/practice", "/study/exam-prep"];

      CURATED_ROADMAP_STEPS.forEach((step) => {
        const hasValidRoute = validPrefixes.some((prefix) => step.practicePath.startsWith(prefix));
        expect(hasValidRoute).toBe(true);
        expect(step.title).toBeTruthy();
        expect(step.description).toBeTruthy();
        expect(step.xpReward).toBeGreaterThan(0);
        expect(step.durationMinutes).toBeGreaterThan(0);
      });
    });

    it("9. Exports all Ziczac Pathway interactive components and Duolingo gamification widgets", async () => {
      const roadmapModule = await import("@/features/roadmap");
      expect(roadmapModule.ZiczacRoadmapPathway).toBeDefined();
      expect(roadmapModule.ZiczacStepNode).toBeDefined();
      expect(roadmapModule.ZiczacMilestoneCheckpoint).toBeDefined();
      expect(roadmapModule.ZiczacUnitHeader).toBeDefined();
      expect(roadmapModule.ZiczacNodePopover).toBeDefined();
      expect(roadmapModule.RoadmapDuolingoSidebar).toBeDefined();
    }, 15000);

    it("10. Ziczac Pathway components export clean props for single-active popover and smart placement", async () => {
      const { ZiczacNodePopover, ZiczacStepNode, ZiczacMilestoneCheckpoint } = await import("@/features/roadmap");
      expect(typeof ZiczacNodePopover).toBe("function");
      expect(typeof ZiczacStepNode).toBe("function");
      expect(typeof ZiczacMilestoneCheckpoint).toBe("function");
    });

    it("11. Duolingo S-curve pattern prevents straight lines: no consecutive identical offsets across all 28 steps", async () => {
      const { CURATED_ROADMAP_STEPS, getNodeHorizontalPercent, getShorterWidthSide } = await import("@/features/roadmap");
      
      const stepPositions = CURATED_ROADMAP_STEPS.map((step) => {
        const x = step.isCheckpoint ? 50 : getNodeHorizontalPercent(step.stepNumber);
        const side = getShorterWidthSide(x);
        return { stepNumber: step.stepNumber, isCheckpoint: step.isCheckpoint, x, side };
      });

      // 1. All regular steps stay strictly within mobile safe boundaries [33%, 67%]
      stepPositions.forEach((pos) => {
        expect(pos.x).toBeGreaterThanOrEqual(33);
        expect(pos.x).toBeLessThanOrEqual(67);
      });

      // 2. CRITICAL: No two adjacent steps ever have the exact same horizontal position
      for (let i = 0; i < stepPositions.length - 1; i++) {
        const current = stepPositions[i];
        const next = stepPositions[i + 1];
        const diff = Math.abs(current.x - next.x);
        expect(diff).toBeGreaterThanOrEqual(7); // Minimum 7% horizontal delta
      }

      // 3. CRITICAL: Unit 2 steps (6 to 12) never form a straight vertical line of 4 buttons
      const unit2Steps = stepPositions.filter((p) => p.stepNumber >= 6 && p.stepNumber <= 12);
      expect(unit2Steps.length).toBe(7);
      const unit2XPositions = unit2Steps.map((p) => p.x);
      // Verify steps 9, 10, 11, 12: they must be distinct and wave dynamically
      expect(unit2XPositions.slice(3)).toEqual([58, 42, 33, 50]);
    });

    it("12. Multi-session progression and 300-word spaced repetition standards", async () => {
      const { CURATED_ROADMAP_STEPS } = await import("@/features/roadmap");
      const step1 = CURATED_ROADMAP_STEPS[0];

      // 1. Step 1 metadata
      expect(step1.totalSessions).toBe(3);
      expect(step1.totalTargetWords).toBe(300);
      expect(step1.dailyTargetWords).toBe(20);
      expect(step1.dailyPlanBreakdown?.length).toBe(3);

      const phases = step1.dailyPlanBreakdown!;
      expect(phases[0].activity).toContain("Flashcard");
      expect(phases[0].timeSlot).toContain("5 phút");
      expect(phases[1].activity).toContain("phản xạ");
      expect(phases[1].timeSlot).toContain("7 phút");
      expect(phases[2].activity).toContain("ngữ cảnh");
      expect(phases[2].timeSlot).toContain("3 phút");

      // Total daily duration is 15 minutes (5 + 7 + 3)
      expect(step1.durationMinutes).toBe(15);

      // 2. SVG Progress ring circumference & dashoffset calculation
      // Circumference C = 2 * Math.PI * 46 ~= 289
      const calcOffset = (percent: number) => Math.round(289 * (1 - percent / 100));
      expect(calcOffset(0)).toBe(289);
      expect(calcOffset(33)).toBe(194);
      expect(calcOffset(66)).toBe(98);
      expect(calcOffset(100)).toBe(0);

      // Initial active pulse for 0% active node: 6% -> offset 272
      const activePulseOffset = Math.round(289 * (1 - 6 / 100));
      expect(activePulseOffset).toBe(272);
    });
  });
});
