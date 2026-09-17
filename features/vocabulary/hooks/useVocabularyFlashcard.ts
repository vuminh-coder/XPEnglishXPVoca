"use client";

import { useState, useEffect, useCallback } from "react";

export interface UseVocabularyFlashcardProps {
  vocabs: any[];
  setVocabs: React.Dispatch<React.SetStateAction<any[]>>;
  viewMode: string;
  onSpeak: (word: string) => void;
  showToastMsg: (title: string, body: string) => void;
}

export function useVocabularyFlashcard({
  vocabs,
  setVocabs,
  viewMode,
  onSpeak,
  showToastMsg,
}: UseVocabularyFlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isWordMasked, setIsWordMasked] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

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
  }, [vocabs.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : vocabs.length - 1));
    }, 100);
  }, [vocabs.length]);

  const handleShuffle = useCallback(() => {
    const shuffled = [...vocabs].sort(() => Math.random() - 0.5);
    setVocabs(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    showToastMsg("Trộn thẻ", "Đã trộn ngẫu nhiên danh sách Flashcard!");
  }, [vocabs, setVocabs, showToastMsg]);

  const toggleBookmark = useCallback((vocabId: string) => {
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
  }, [showToastMsg]);

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
