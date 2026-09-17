"use client";

import { useState, useMemo } from "react";
import { GRAMMAR_TOPICS } from "../data/grammarTopics";
import { GrammarLevel, GrammarTopic } from "../types/grammarTypes";
import { useGrammarProgressStore } from "@/stores/grammarProgressStore";

export type GrammarFilterLevel = "all" | GrammarLevel;

export function useGrammarCatalog() {
  const [activeLevel, setActiveLevel] = useState<GrammarFilterLevel>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { completedTopicIds, getTopicStatus, getCompletedCount, getAverageAccuracy } =
    useGrammarProgressStore();

  const counts = useMemo(() => {
    return {
      all: GRAMMAR_TOPICS.length,
      basic: GRAMMAR_TOPICS.filter((t) => t.level === "basic").length,
      intermediate: GRAMMAR_TOPICS.filter((t) => t.level === "intermediate").length,
      advanced: GRAMMAR_TOPICS.filter((t) => t.level === "advanced").length,
      completed: completedTopicIds.length,
    };
  }, [completedTopicIds]);

  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return GRAMMAR_TOPICS.filter((t) => {
      const matchesLevel = activeLevel === "all" || t.level === activeLevel;
      if (!matchesLevel) return false;
      if (!q) return true;

      return (
        t.name.toLowerCase().includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.focus.toLowerCase().includes(q)
      );
    });
  }, [activeLevel, searchQuery]);

  const stats = useMemo(() => {
    const completed = getCompletedCount();
    const total = GRAMMAR_TOPICS.length;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const accuracy = getAverageAccuracy();

    return {
      total,
      completed,
      progressPercent,
      accuracy,
    };
  }, [getCompletedCount, getAverageAccuracy]);

  return {
    activeLevel,
    setActiveLevel,
    searchQuery,
    setSearchQuery,
    filteredTopics,
    counts,
    stats,
    getTopicStatus,
  };
}
