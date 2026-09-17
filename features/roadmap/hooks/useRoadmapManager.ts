"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useStudyPlanStore } from "@/stores/studyPlanStore";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { TargetCategory, TargetExam, TargetRoadmapPhase, RoadmapTask } from "../types";
import { generateGoalSpecificRoadmap } from "../data/roadmapGenerators";

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

  // Dynamic phase manager initialized immediately with default TOEIC 750 roadmap for 0ms delay
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

  // Sync roadmap whenever plan loads or user changes targetCategory
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
    } else {
      const generated = generateGoalSpecificRoadmap(targetExam, targetScore, targetCategory);
      setPhases(generated);
      if (generated[0]?.tasks[0]) {
        setSelectedTask(generated[0].tasks[0]);
      }
    }
  }, [plan, targetCategory]);

  // Generate new roadmap
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

  // Toggle lesson task completion
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
                message: `Đã tích chọn hoàn thành bài học "Ngày ${t.dayNum}: ${t.title}".`,
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

  // Computed metrics
  const allTasks = useMemo(() => phases.flatMap((p) => p.tasks), [phases]);
  const totalTasksCount = allTasks.length;
  const completedTasksCount = allTasks.filter((t) => t.isCompleted).length;
  const overallProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  const nextUncompletedTask = useMemo(() => allTasks.find((t) => !t.isCompleted) || allTasks[0], [allTasks]);
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
    phases,
    selectedTask,
    setSelectedTask,
    handleGenerate,
    handleToggleTaskCompleted,
    overallProgress,
    nextUncompletedTask,
    currentActiveExam,
    currentActiveScore,
  };
}
