"use client";

import { useState, useEffect, useCallback } from "react";
import { useVocabularyCatalogStore } from "@/stores/vocabularyCatalogStore";

export interface UseVocabularyFlashcardProps {
  themeId?: string;
  vocabs: any[];
  setVocabs: React.Dispatch<React.SetStateAction<any[]>>;
  viewMode: string;
  onSpeak: (word: string) => void;
  showToastMsg: (title: string, body: string) => void;
}

export function useVocabularyFlashcard({
  themeId,
  vocabs,
  setVocabs,
  viewMode,
  onSpeak,
  showToastMsg,
}: UseVocabularyFlashcardProps) {
  // Synchronous Frame 0 probe from in-memory session store
  const session = themeId
    ? useVocabularyCatalogStore.getState().themeFlashcardSessions[themeId]
    : undefined;

  const [currentIndex, setCurrentIndexState] = useState(() => session?.currentIndex ?? 0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isWordMasked, setIsWordMaskedState] = useState(() => session?.isWordMasked ?? false);
  const [autoPlayAudio, setAutoPlayAudioState] = useState(() => session?.autoPlayAudio ?? false);
  const [bookmarkedIds, setBookmarkedIdsState] = useState<string[]>(() => session?.bookmarkedIds ?? []);

  const setCurrentIndex = useCallback(
    (updater: number | ((prev: number) => number)) => {
      setCurrentIndexState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (themeId) {
          useVocabularyCatalogStore.getState().setThemeFlashcardSession(themeId, { currentIndex: next });
        }
        return next;
      });
    },
    [themeId]
  );

  const setIsWordMasked = useCallback(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      setIsWordMaskedState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (themeId) {
          useVocabularyCatalogStore.getState().setThemeFlashcardSession(themeId, { isWordMasked: next });
        }
        return next;
      });
    },
    [themeId]
  );

  const setAutoPlayAudio = useCallback(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      setAutoPlayAudioState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (themeId) {
          useVocabularyCatalogStore.getState().setThemeFlashcardSession(themeId, { autoPlayAudio: next });
        }
        return next;
      });
    },
    [themeId]
  );

  const setBookmarkedIds = useCallback(
    (updater: string[] | ((prev: string[]) => string[])) => {
      setBookmarkedIdsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (themeId) {
          useVocabularyCatalogStore.getState().setThemeFlashcardSession(themeId, { bookmarkedIds: next });
        }
        return next;
      });
    },
    [themeId]
  );

  const activeVocab = vocabs[currentIndex] || null;

  // Auto-play audio when switching cards if autoPlayAudio is enabled
  useEffect(() => {
    if (autoPlayAudio && activeVocab && viewMode === "flashcard" && !isFlipped) {
      onSpeak(activeVocab.word);
    }
  }, [currentIndex, autoPlayAudio, viewMode, activeVocab, isFlipped, onSpeak]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev < vocabs.length - 1 ? prev + 1 : 0));
    }, 100);
  }, [vocabs.length, setCurrentIndex]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : vocabs.length - 1));
    }, 100);
  }, [vocabs.length, setCurrentIndex]);

  const handleShuffle = useCallback(() => {
    const shuffled = [...vocabs].sort(() => Math.random() - 0.5);
    setVocabs(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    showToastMsg("Trộn thẻ", "Đã trộn ngẫu nhiên danh sách Flashcard!");
  }, [vocabs, setVocabs, setCurrentIndex, showToastMsg]);

  const toggleBookmark = useCallback(
    (vocabId: string) => {
      setBookmarkedIds((prev) => {
        const exists = prev.includes(vocabId);
        if (exists) {
          showToastMsg("Đánh dấu", "Đã gỡ bookmark từ vựng.");
          return prev.filter((id) => id !== vocabId);
        } else {
          showToastMsg("Đánh dấu 🔖", "Đã lưu vào danh sách xem lại.");
          return [...prev, vocabId];
        }
      });
    },
    [setBookmarkedIds, showToastMsg]
  );

  return {
    currentIndex,
    setCurrentIndex,
    isFlipped,
    setIsFlipped,
    isWordMasked,
    setIsWordMasked,
    autoPlayAudio,
    setAutoPlayAudio,
    bookmarkedIds,
    setBookmarkedIds,
    activeVocab,
    handleNext,
    handlePrev,
    handleShuffle,
    toggleBookmark,
  };
}
