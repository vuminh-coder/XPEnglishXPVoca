"use client";

import { useState, useMemo, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { PlanKey, ExamType } from "../types";
import { PLANS } from "../constants";

export function usePremiumPlan() {
  const { user } = useAuthStore();
  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanKey>("yearly");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Score simulator state
  const [targetExam, setTargetExam] = useState<ExamType>("toeic");
  const [currentScore, setCurrentScore] = useState<number>(600);

  const selectedPlan = useMemo(() => {
    return PLANS[selectedPlanKey] || PLANS.yearly;
  }, [selectedPlanKey]);

  const estimatedProScore = useMemo(() => {
    if (targetExam === "toeic") {
      return Math.min(990, currentScore + 260);
    }
    return Math.min(9.0, Number((currentScore + 1.5).toFixed(1)));
  }, [targetExam, currentScore]);

  const handleSelectExam = useCallback((exam: ExamType) => {
    setTargetExam(exam);
    if (exam === "toeic") {
      setCurrentScore(600);
    } else {
      setCurrentScore(5.5);
    }
  }, []);

  const toggleFaq = useCallback((idx: number) => {
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));
  }, []);

  return {
    user,
    selectedPlanKey,
    setSelectedPlanKey,
    selectedPlan,
    targetExam,
    setTargetExam,
    currentScore,
    setCurrentScore,
    estimatedProScore,
    handleSelectExam,
    openFaqIdx,
    setOpenFaqIdx,
    toggleFaq,
  };
}

export type UsePremiumPlanReturn = ReturnType<typeof usePremiumPlan>;
