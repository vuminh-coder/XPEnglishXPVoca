"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { GRAMMAR_TOPICS } from "../data/grammarTopics";
import { GrammarLevel, GrammarTopic } from "../types/grammarTypes";
import { useGrammarProgressStore, GrammarFilterLevel } from "@/stores/grammarProgressStore";

export type { GrammarFilterLevel };

export function useGrammarCatalog() {
  const activeLevel = useGrammarProgressStore((s) => s.catalogFilters.activeLevel);
  const setActiveLevel = useGrammarProgressStore((s) => s.setActiveLevel);
  const searchQuery = useGrammarProgressStore((s) => s.catalogFilters.searchQuery);
  const setSearchQuery = useGrammarProgressStore((s) => s.setSearchQuery);

  const {
    completedTopicIds,
    inProgressTopicIds,
    getTopicStatus,
    getCompletedCount,
    getAverageAccuracy,
    fetchServerProgress,
  } = useGrammarProgressStore();

  useEffect(() => {
    fetchServerProgress();
  }, [fetchServerProgress]);

  // Fast 180ms Shimmer Sweep state between level tabs (0px CLS)
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);

  const handleSelectLevelTab = useCallback(
    (level: GrammarFilterLevel) => {
      if (level === activeLevel) return;
      setIsSwitchingCategory(true);
      setActiveLevel(level);
      setTimeout(() => {
        setIsSwitchingCategory(false);
      }, 180);
    },
    [activeLevel, setActiveLevel]
  );

  // Shuffle Seeds for 3 Curated Rows (matching Dictation's handleShuffleBasic/Advanced)
  const [basicSeed, setBasicSeed] = useState(0);
  const [intermediateSeed, setIntermediateSeed] = useState(0);
  const [advancedSeed, setAdvancedSeed] = useState(0);

  const [isShufflingBasic, setIsShufflingBasic] = useState(false);
  const [isShufflingIntermediate, setIsShufflingIntermediate] = useState(false);
  const [isShufflingAdvanced, setIsShufflingAdvanced] = useState(false);

  const handleShuffleBasic = useCallback(() => {
    setIsShufflingBasic(true);
    setBasicSeed((s) => s + 1);
    setTimeout(() => setIsShufflingBasic(false), 180);
  }, []);

  const handleShuffleIntermediate = useCallback(() => {
    setIsShufflingIntermediate(true);
    setIntermediateSeed((s) => s + 1);
    setTimeout(() => setIsShufflingIntermediate(false), 180);
  }, []);

  const handleShuffleAdvanced = useCallback(() => {
    setIsShufflingAdvanced(true);
    setAdvancedSeed((s) => s + 1);
    setTimeout(() => setIsShufflingAdvanced(false), 180);
  }, []);

  // Level collections (20 topics per tier)
  const allBasicTopics = useMemo(
    () => GRAMMAR_TOPICS.filter((t) => t.level === "basic"),
    []
  );

  const allIntermediateTopics = useMemo(
    () => GRAMMAR_TOPICS.filter((t) => t.level === "intermediate"),
    []
  );

  const allAdvancedTopics = useMemo(
    () => GRAMMAR_TOPICS.filter((t) => t.level === "advanced"),
    []
  );

  const completedTopics = useMemo(
    () => GRAMMAR_TOPICS.filter((t) => completedTopicIds.includes(t.id)),
    [completedTopicIds]
  );

  // 8 Curated Cards per row with seed rotation (identical to Dictation)
  const displayedBasicTopics = useMemo(() => {
    const pool = allBasicTopics;
    if (pool.length === 0) return [];
    const offset = (basicSeed * 8) % Math.max(1, pool.length);
    const sliced = pool.slice(offset, offset + 8);
    if (sliced.length < 8 && pool.length >= 8) {
      return [...sliced, ...pool.slice(0, 8 - sliced.length)];
    }
    return sliced;
  }, [allBasicTopics, basicSeed]);

  const displayedIntermediateTopics = useMemo(() => {
    const pool = allIntermediateTopics;
    if (pool.length === 0) return [];
    const offset = (intermediateSeed * 8) % Math.max(1, pool.length);
    const sliced = pool.slice(offset, offset + 8);
    if (sliced.length < 8 && pool.length >= 8) {
      return [...sliced, ...pool.slice(0, 8 - sliced.length)];
    }
    return sliced;
  }, [allIntermediateTopics, intermediateSeed]);

  const displayedAdvancedTopics = useMemo(() => {
    const pool = allAdvancedTopics;
    if (pool.length === 0) return [];
    const offset = (advancedSeed * 8) % Math.max(1, pool.length);
    const sliced = pool.slice(offset, offset + 8);
    if (sliced.length < 8 && pool.length >= 8) {
      return [...sliced, ...pool.slice(0, 8 - sliced.length)];
    }
    return sliced;
  }, [allAdvancedTopics, advancedSeed]);

  const counts = useMemo(() => {
    return {
      all: GRAMMAR_TOPICS.length,
      basic: allBasicTopics.length,
      intermediate: allIntermediateTopics.length,
      advanced: allAdvancedTopics.length,
      completed: completedTopicIds.length,
    };
  }, [allBasicTopics.length, allIntermediateTopics.length, allAdvancedTopics.length, completedTopicIds.length]);

  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return GRAMMAR_TOPICS.filter((t) => {
      const matchesLevel =
        activeLevel === "all" ||
        (activeLevel === "completed"
          ? completedTopicIds.includes(t.id)
          : t.level === activeLevel);

      if (!matchesLevel) return false;
      if (!q) return true;

      return (
        t.name.toLowerCase().includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.focus.toLowerCase().includes(q)
      );
    });
  }, [activeLevel, searchQuery, completedTopicIds]);

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

  // Next recommended topic for Smart Header CTA (prioritizes in_progress > unstarted > first)
  const nextRecommendedTopic = useMemo(() => {
    const inProgress = GRAMMAR_TOPICS.find((t) => inProgressTopicIds.includes(t.id));
    if (inProgress) return inProgress;

    const unstarted = GRAMMAR_TOPICS.find(
      (t) => !completedTopicIds.includes(t.id) && !inProgressTopicIds.includes(t.id)
    );
    if (unstarted) return unstarted;

    return GRAMMAR_TOPICS[0];
  }, [inProgressTopicIds, completedTopicIds]);

  return {
    activeLevel,
    setActiveLevel,
    searchQuery,
    setSearchQuery,
    filteredTopics,
    counts,
    stats,
    getTopicStatus,
    // Dictation-style Curated Rows & Shuffles
    isSwitchingCategory,
    handleSelectLevelTab,
    allBasicTopics,
    allIntermediateTopics,
    allAdvancedTopics,
    completedTopics,
    displayedBasicTopics,
    displayedIntermediateTopics,
    displayedAdvancedTopics,
    handleShuffleBasic,
    handleShuffleIntermediate,
    handleShuffleAdvanced,
    isShufflingBasic,
    isShufflingIntermediate,
    isShufflingAdvanced,
    nextRecommendedTopic,
  };
}

