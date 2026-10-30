"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useStudyPlanStore } from "@/stores/studyPlanStore";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import {
  TargetCategory,
  TargetExam,
  TargetRoadmapPhase,
  RoadmapTask,
  ZiczacPathStep,
  ZiczacStepProgress,
} from "../types";
import { generateGoalSpecificRoadmap } from "../data/roadmapGenerators";
import { CURATED_ROADMAP_STEPS } from "../data/curatedRoadmapPathway";
import {
  STORAGE_KEY_COMPLETED_STEPS,
  STORAGE_KEY_STEP_SESSIONS,
  getScopedCompletedStepsKey,
  getScopedStepSessionsKey,
} from "../utils/roadmapSessionSync";

export function useRoadmapManager() {
  const { plan, isLoading, generatePlan, loadPlan } = useStudyPlanStore();
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [targetCategory, setTargetCategory] = useState<TargetCategory>("EXAM");
  const [targetExam, setTargetExam] = useState<TargetExam>("TOEIC");
  const [targetScore, setTargetScore] = useState<string>("750");
  const [currentLevel, setCurrentLevel] = useState<string>("A2 Elementary");
  const [weeklyHours, setWeeklyHours] = useState<number>(5);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // 1. Curated Ziczac Roadmap Pathway Management
  const [ziczacSteps] = useState<ZiczacPathStep[]>(CURATED_ROADMAP_STEPS);

  // Completed steps IDs set (loaded from user-scoped or global localStorage, starting empty for new users)
  const [completedStepIds, setCompletedStepIds] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const userId = useAuthStore.getState().user?.id;
        const scopedKey = getScopedCompletedStepsKey(userId);
        const saved =
          localStorage.getItem(scopedKey) ||
          localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return new Set(parsed);
          }
        }
      } catch {
        // Fallback below
      }
    }
    return new Set();
  });

  // Multi-session progress state per step (loaded from user-scoped or global localStorage)
  const [stepSessions, setStepSessions] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      try {
        const userId = useAuthStore.getState().user?.id;
        const scopedKey = getScopedStepSessionsKey(userId);
        const saved =
          localStorage.getItem(scopedKey) ||
          localStorage.getItem(STORAGE_KEY_STEP_SESSIONS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            return parsed;
          }
        }
      } catch {
        // Fallback below
      }
    }
    return {};
  });

  // Selected Step for Inspector Companion
  const [selectedStep, setSelectedStep] = useState<ZiczacPathStep>(() => {
    return (
      CURATED_ROADMAP_STEPS.find((s) => !completedStepIds.has(s.id)) ||
      CURATED_ROADMAP_STEPS[0]
    );
  });

  // Listen for storage, account changes, or external game completion events to update roadmap session states reactively
  useEffect(() => {
    const reloadSessionsFromStorage = () => {
      try {
        const currentUserId = useAuthStore.getState().user?.id;
        const scopedSessionsKey = getScopedStepSessionsKey(currentUserId);
        const scopedCompletedKey = getScopedCompletedStepsKey(currentUserId);

        const savedSessions =
          localStorage.getItem(scopedSessionsKey) ||
          localStorage.getItem(STORAGE_KEY_STEP_SESSIONS);
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions);
          if (parsed && typeof parsed === "object") {
            setStepSessions(parsed);
          }
        } else {
          setStepSessions({});
        }

        const savedCompleted =
          localStorage.getItem(scopedCompletedKey) ||
          localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS);
        if (savedCompleted) {
          const parsed = JSON.parse(savedCompleted);
          if (Array.isArray(parsed)) {
            setCompletedStepIds(new Set(parsed));
          }
        } else {
          setCompletedStepIds(new Set());
        }
      } catch {}
    };

    reloadSessionsFromStorage();
    window.addEventListener("storage", reloadSessionsFromStorage);
    window.addEventListener("roadmap_step_advanced", reloadSessionsFromStorage);
    return () => {
      window.removeEventListener("storage", reloadSessionsFromStorage);
      window.removeEventListener("roadmap_step_advanced", reloadSessionsFromStorage);
    };
  }, [user?.id]);

  // Toggle Ziczac step completed
  const handleToggleStepCompleted = useCallback(
    (stepId: string) => {
      setCompletedStepIds((prev) => {
        const next = new Set(prev);
        const step = ziczacSteps.find((s) => s.id === stepId);
        const willBeCompleted = !next.has(stepId);
        const total = step?.totalSessions || (step?.isCheckpoint ? 1 : 2);
        const currentUserId = useAuthStore.getState().user?.id;
        const scopedSessionsKey = getScopedStepSessionsKey(currentUserId);
        const scopedCompletedKey = getScopedCompletedStepsKey(currentUserId);

        if (willBeCompleted) {
          next.add(stepId);
          // Set sessions to total
          setStepSessions((prevSessions) => {
            const updated = { ...prevSessions, [stepId]: total };
            if (typeof window !== "undefined") {
              try {
                const raw = JSON.stringify(updated);
                localStorage.setItem(STORAGE_KEY_STEP_SESSIONS, raw);
                if (scopedSessionsKey !== STORAGE_KEY_STEP_SESSIONS) {
                  localStorage.setItem(scopedSessionsKey, raw);
                }
              } catch {}
            }
            return updated;
          });

          const xp = step ? step.xpReward : 25;
          useAuthStore.getState().awardXp(xp);
          useNotificationStore.getState().addToast({
            type: "success",
            title: `🎉 +${xp} XP ${step?.isCheckpoint ? "CỘT MỐC TỔNG HỢP" : "BÀI HỌC"} HOÀN THÀNH!`,
            message: `Đã hoàn thành ${step ? step.title : "chặng học"}.`,
          });
        } else {
          next.delete(stepId);
          // Reset sessions to 0
          setStepSessions((prevSessions) => {
            const updated = { ...prevSessions, [stepId]: 0 };
            if (typeof window !== "undefined") {
              try {
                const raw = JSON.stringify(updated);
                localStorage.setItem(STORAGE_KEY_STEP_SESSIONS, raw);
                if (scopedSessionsKey !== STORAGE_KEY_STEP_SESSIONS) {
                  localStorage.setItem(scopedSessionsKey, raw);
                }
              } catch {}
            }
            return updated;
          });

          useNotificationStore.getState().addToast({
            type: "info",
            title: "Cập Nhật Trạng Thái",
            message: `Đã chuyển chặng ${step?.stepNumber} về trạng thái chưa hoàn thành.`,
          });
        }

        if (typeof window !== "undefined") {
          try {
            const rawCompleted = JSON.stringify(Array.from(next));
            localStorage.setItem(STORAGE_KEY_COMPLETED_STEPS, rawCompleted);
            if (scopedCompletedKey !== STORAGE_KEY_COMPLETED_STEPS) {
              localStorage.setItem(scopedCompletedKey, rawCompleted);
            }
          } catch {
            // Storage quota handled
          }
        }

        return next;
      });
    },
    [ziczacSteps]
  );

  // Compute step session progress
  const getStepProgress = useCallback(
    (stepId: string): ZiczacStepProgress => {
      const step = ziczacSteps.find((s) => s.id === stepId);
      const totalSessions = step?.totalSessions || (step?.isCheckpoint ? 1 : 3);
      const isCompleted = completedStepIds.has(stepId);
      const completedSessions = isCompleted
        ? totalSessions
        : Math.min(stepSessions[stepId] || 0, totalSessions);
      const progressPercent =
        totalSessions > 0
          ? Math.min(100, Math.round((completedSessions / totalSessions) * 100))
          : 0;

      const wordsPerSession = step?.dailyTargetWords || 20;
      const totalWords = step?.totalTargetWords;
      const wordsLearned = totalWords
        ? Math.min(totalWords, completedSessions * wordsPerSession)
        : undefined;

      return {
        stepId,
        completedSessions,
        totalSessions,
        progressPercent,
        isCompleted,
        wordsLearned,
        totalWords,
      };
    },
    [ziczacSteps, completedStepIds, stepSessions]
  );

  // Advance a single session within a step (e.g. Session 1 -> 2 -> 3)
  const handleAdvanceStepSession = useCallback(
    (stepId: string) => {
      const step = ziczacSteps.find((s) => s.id === stepId);
      const totalSessions = step?.totalSessions || (step?.isCheckpoint ? 1 : 3);
      const current = stepSessions[stepId] || 0;
      const nextSession = current + 1;

      // Award session XP (+15 XP)
      useAuthStore.getState().awardXp(15);

      if (nextSession >= totalSessions) {
        setStepSessions((prev) => {
          const updated = { ...prev, [stepId]: totalSessions };
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(STORAGE_KEY_STEP_SESSIONS, JSON.stringify(updated));
            } catch {}
          }
          return updated;
        });

        if (!completedStepIds.has(stepId)) {
          handleToggleStepCompleted(stepId);
        }
      } else {
        setStepSessions((prev) => {
          const updated = { ...prev, [stepId]: nextSession };
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(STORAGE_KEY_STEP_SESSIONS, JSON.stringify(updated));
            } catch {}
          }
          return updated;
        });

        useNotificationStore.getState().addToast({
          type: "success",
          title: `🌟 +15 XP VÒNG ${nextSession}/${totalSessions} HOÀN THÀNH!`,
          message: `Đã hoàn thành phiên học. Tiếp tục để mở khóa chặng tiếp theo!`,
        });
      }
    },
    [ziczacSteps, stepSessions, completedStepIds, handleToggleStepCompleted]
  );

  // 2. Backward compatibility with legacy phase structure
  const [phases, setPhases] = useState<TargetRoadmapPhase[]>(() => {
    return generateGoalSpecificRoadmap("TOEIC", "750", "EXAM");
  });

  const [selectedTask, setSelectedTask] = useState<RoadmapTask | null>(() => {
    const initialPhases = generateGoalSpecificRoadmap("TOEIC", "750", "EXAM");
    return initialPhases[0]?.tasks[0] || null;
  });

  // Load plan from SWR / DB once on mount
  const hasMountedRef = React.useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      loadPlan();
    }
  }, [loadPlan]);

  // Sync legacy phases if plan loads
  useEffect(() => {
    if (plan && plan.targetExam) {
      setTargetExam((plan.targetExam as TargetExam) || "TOEIC");
      const scoreStr = String(plan.targetScore || "750");
      setTargetScore(scoreStr);
      const generated = generateGoalSpecificRoadmap(plan.targetExam, scoreStr, targetCategory);
      setPhases(generated);
      if (generated[0]?.tasks[0]) {
        setSelectedTask(generated[0].tasks[0]);
      }
    }
  }, [plan, targetCategory]);

  // Handle generate for legacy modal
  const handleGenerate = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const targetDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const numericScore = parseFloat(targetScore) || 750;

      generatePlan({
        targetExam,
        targetScore: numericScore,
        targetDate,
        currentLevel,
        weeklyHours,
      });

      const newPhases = generateGoalSpecificRoadmap(targetExam, targetScore, targetCategory);
      setPhases(newPhases);
      if (newPhases[0]?.tasks[0]) {
        setSelectedTask(newPhases[0].tasks[0]);
      }

      setIsFormOpen(false);
      useAuthStore.getState().awardXp(15);
      addToast({
        type: "success",
        title: "Khởi Tạo Lộ Trình AI",
        message: `Đã khởi tạo lộ trình học AI cho ${targetExam} Target ${targetScore} thành công! (+15 XP)`,
      });
    },
    [targetExam, targetScore, targetCategory, currentLevel, weeklyHours, generatePlan, addToast]
  );

  // Toggle legacy phase task completion
  const handleToggleTaskCompleted = useCallback((taskId: string) => {
    let xpAwarded = 25;
    let isNowCompleted = false;

    setPhases((prev) =>
      prev.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((t) => {
          if (t.id === taskId) {
            isNowCompleted = !t.isCompleted;
            xpAwarded = t.xpReward;
            if (isNowCompleted) {
              useAuthStore.getState().awardXp(xpAwarded);
              useNotificationStore.getState().addToast({
                type: "success",
                title: `🎉 +${xpAwarded} XP BÀI HỌC HOÀN THÀNH!`,
                message: `Đã hoàn thành bài học "Ngày ${t.dayNum}: ${t.title}".`,
              });
            }
            return { ...t, isCompleted: isNowCompleted };
          }
          return t;
        }),
      }))
    );

    useStudyPlanStore.getState().toggleTask(taskId, isNowCompleted);
  }, []);

  // Computed metrics for Ziczac Pathway
  const totalStepsCount = ziczacSteps.length;
  const completedStepsCount = completedStepIds.size;
  const overallProgress =
    totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0;

  // Next active step
  const nextActiveStep = useMemo(() => {
    return (
      ziczacSteps.find((s) => !completedStepIds.has(s.id)) ||
      ziczacSteps[ziczacSteps.length - 1]
    );
  }, [ziczacSteps, completedStepIds]);

  // Steps remaining until next milestone checkpoint
  const nextCheckpointStep = useMemo(() => {
    return ziczacSteps.find((s) => s.isCheckpoint && !completedStepIds.has(s.id));
  }, [ziczacSteps, completedStepIds]);

  const stepsUntilNextCheckpoint = useMemo(() => {
    if (!nextCheckpointStep) return 0;
    const count = ziczacSteps.filter(
      (s) => s.stepNumber <= nextCheckpointStep.stepNumber && !completedStepIds.has(s.id)
    ).length;
    return count;
  }, [ziczacSteps, completedStepIds, nextCheckpointStep]);

  const currentActiveExam = plan?.targetExam || targetExam;
  const currentActiveScore = String(plan?.targetScore || targetScore);

  return {
    user,
    plan,
    isLoading,
    targetCategory,
    setTargetCategory,
    targetExam,
    setTargetExam,
    targetScore,
    setTargetScore,
    currentLevel,
    setCurrentLevel,
    weeklyHours,
    setWeeklyHours,
    isFormOpen,
    setIsFormOpen,
    // Ziczac Pathway
    ziczacSteps,
    completedStepIds,
    stepSessions,
    selectedStep,
    setSelectedStep,
    handleToggleStepCompleted,
    handleAdvanceStepSession,
    getStepProgress,
    nextActiveStep,
    nextCheckpointStep,
    stepsUntilNextCheckpoint,
    // Legacy support
    phases,
    selectedTask,
    setSelectedTask,
    handleGenerate,
    handleToggleTaskCompleted,
    // Shared Metrics
    overallProgress,
    totalStepsCount,
    completedStepsCount,
    currentActiveExam,
    currentActiveScore,
  };
}
