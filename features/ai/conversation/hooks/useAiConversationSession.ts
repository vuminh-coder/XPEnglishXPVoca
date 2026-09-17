"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUserStore } from "@/stores/userStore";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { aiTopics } from "../data/aiTopics";
import { Message, Topic, PastSession } from "../types";

export function useAiConversationSession() {
  const { addToast } = useNotificationStore();

  const [selectedTopicId, setSelectedTopicId] = useState<string>("at1");
  const [sessionId, setSessionId] = useState<string>(
    () => `ai_conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);

  // History drawer state
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [pastSessions, setPastSessions] = useState<PastSession[]>([]);
  const [selectedPastSession, setSelectedPastSession] = useState<PastSession | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Refs to avoid stale closures in syncActiveSessionToDb
  const sessionIdRef = useRef(sessionId);
  const elapsedTimeRef = useRef(0);
  const selectedTopicIdRef = useRef(selectedTopicId);
  const hasUserInteractedRef = useRef(false);
  const activeTimeRef = useRef(0);

  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);
  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);
  useEffect(() => {
    selectedTopicIdRef.current = selectedTopicId;
  }, [selectedTopicId]);

  // Track active study time as writing skill
  useStudyTimeTracker("writing", {
    activeCondition: !isSessionCompleted,
  });

  // Track study time timer
  useEffect(() => {
    if (isSessionCompleted) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
      activeTimeRef.current += 1;
    }, 1000);

    return () => {
      clearInterval(timer);
      if (activeTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(activeTimeRef.current / 60));
        useUserStore.getState().addPracticeTime(mins, "writing");
        activeTimeRef.current = 0;
      }
    };
  }, [isSessionCompleted]);

  // Helper to sync in-progress session to DB & LocalStorage immediately
  const syncActiveSessionToDb = useCallback(
    (newMessages: Message[], newElapsed?: number) => {
      const elapsed = newElapsed ?? elapsedTimeRef.current;
      const sid = sessionIdRef.current;
      const topicId = selectedTopicIdRef.current;
      try {
        localStorage.setItem(
          "xp_active_conv_session",
          JSON.stringify({
            sessionId: sid,
            topicId,
            messages: newMessages,
            elapsedTime: elapsed,
            savedAt: Date.now(),
          })
        );
      } catch {}

      fetch("/api/ai/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sid,
          mode: "conversation",
          topicId,
          messages: newMessages,
          timeSpentSeconds: elapsed,
          status: "IN_PROGRESS",
        }),
      }).catch(() => {});
    },
    []
  );

  // Fetch past conversation history from API
  const fetchSessionHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch("/api/ai/sessions?mode=conversation");
      const data = await res.json();
      if (data.success && Array.isArray(data.sessions)) {
        setPastSessions(data.sessions);
      }
    } catch (err) {
      console.warn("Could not fetch conversation session history:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  const handleOpenHistoryDrawer = useCallback(() => {
    setIsHistoryDrawerOpen(true);
    fetchSessionHistory();
  }, [fetchSessionHistory]);

  const markUserInteracted = useCallback(() => {
    hasUserInteractedRef.current = true;
  }, []);

  const resetSession = useCallback(() => {
    const newSid = `ai_conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setSessionId(newSid);
    setElapsedTime(0);
    setIsSessionCompleted(false);
    hasUserInteractedRef.current = false;
    try {
      localStorage.removeItem("xp_active_conv_session");
    } catch {}
  }, []);

  return {
    selectedTopicId,
    setSelectedTopicId,
    sessionId,
    setSessionId,
    elapsedTime,
    setElapsedTime,
    isSessionCompleted,
    setIsSessionCompleted,
    isHistoryDrawerOpen,
    setIsHistoryDrawerOpen,
    pastSessions,
    selectedPastSession,
    setSelectedPastSession,
    isLoadingHistory,
    fetchSessionHistory,
    handleOpenHistoryDrawer,
    syncActiveSessionToDb,
    markUserInteracted,
    hasUserInteractedRef,
    resetSession,
  };
}
