"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUserStore } from "@/stores/userStore";
import { SkillType } from "@/stores/skillChartStore";

export interface StudyTimeTrackerOptions {
  autoStart?: boolean;
  activeCondition?: boolean;
  flushIntervalSeconds?: number;
  minFlushSeconds?: number;
}

export function useStudyTimeTracker(
  skill: SkillType = "vocab",
  options: StudyTimeTrackerOptions = {}
) {
  const {
    autoStart = true,
    activeCondition = true,
    flushIntervalSeconds = 30,
    minFlushSeconds = 15,
  } = options;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart && activeCondition);

  const accumulatedSecondsRef = useRef<number>(0);
  const bufferSecondsRef = useRef<number>(0);
  const lastActiveTimestampRef = useRef<number>(Date.now());
  const skillRef = useRef<SkillType>(skill);

  useEffect(() => {
    skillRef.current = skill;
  }, [skill]);

  // Synchronize running state with activeCondition
  useEffect(() => {
    if (activeCondition) {
      setIsRunning(true);
      lastActiveTimestampRef.current = Date.now();
    } else {
      setIsRunning(false);
    }
  }, [activeCondition]);

  // Flush buffer function to record practice time into Store & DB
  const flushNow = useCallback(() => {
    const buffered = bufferSecondsRef.current;
    if (buffered >= minFlushSeconds) {
      const minutesToRecord = Math.max(1, Math.round(buffered / 60));
      useUserStore.getState().addPracticeTime(minutesToRecord, skillRef.current);
      bufferSecondsRef.current = 0;
    }
  }, [minFlushSeconds]);

  // Activity listeners for idle detection
  useEffect(() => {
    const handleUserActivity = () => {
      lastActiveTimestampRef.current = Date.now();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsRunning(false);
        flushNow();
      } else if (activeCondition) {
        setIsRunning(true);
        lastActiveTimestampRef.current = Date.now();
      }
    };

    window.addEventListener("mousemove", handleUserActivity, { passive: true });
    window.addEventListener("keydown", handleUserActivity, { passive: true });
    window.addEventListener("touchstart", handleUserActivity, { passive: true });
    window.addEventListener("click", handleUserActivity, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeCondition, flushNow]);

  // Main 1-second counting loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Idle check: pause if no interaction for > 90 seconds
      const now = Date.now();
      if (now - lastActiveTimestampRef.current > 90000) {
        return;
      }

      setElapsedSeconds((prev) => prev + 1);
      accumulatedSecondsRef.current += 1;
      bufferSecondsRef.current += 1;

      // Auto flush every flushIntervalSeconds
      if (bufferSecondsRef.current >= flushIntervalSeconds) {
        flushNow();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, flushIntervalSeconds, flushNow]);

  // Flush on unmount and page leave / tab close
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushNow();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      flushNow();
    };
  }, [flushNow]);

  const startTimer = useCallback(() => {
    lastActiveTimestampRef.current = Date.now();
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
    flushNow();
  }, [flushNow]);

  const resetTimer = useCallback(() => {
    flushNow();
    setElapsedSeconds(0);
    accumulatedSecondsRef.current = 0;
    bufferSecondsRef.current = 0;
  }, [flushNow]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return {
    elapsedSeconds,
    formattedTime: formatTime(elapsedSeconds),
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    flushNow,
  };
}
