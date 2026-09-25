"use client";

import { useState, useCallback } from "react";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useUserStore } from "@/stores/userStore";
import type { WordLookupData } from "../components/shared/WordLookupCard";


export interface UseWordLookupProps {
  user: { id?: string } | null;
  awardXp: (amount: number) => void;
  addToast: (toast: { type: "info" | "success" | "warning" | "error"; title: string; message: string }) => void;
  onPauseVideo?: () => void;
}

export function useWordLookup({
  user,
  awardXp,
  addToast,
  onPauseVideo,
}: UseWordLookupProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wordLookupData, setWordLookupData] = useState<WordLookupData | null>(null);

  // 1-Click Word Lookup
  const handleWordClick = useCallback(
    async (word: string) => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
      if (!cleanWord) return;

      onPauseVideo?.();

      setSelectedWord(cleanWord);
      setWordLookupData({
        word: cleanWord.toUpperCase(),
        phonetic: `/${cleanWord}/`,
        pos: "loading...",
        definitionVn: "Đang tra từ điển...",
      });

      speakLessonText(cleanWord, { lessonId: "video_subtitle_word", rate: 1.0 });

      try {
        const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
        if (dictRes.ok) {
          const dictData = await dictRes.json();
          if (Array.isArray(dictData) && dictData.length > 0) {
            const entry = dictData[0];
            const phonetic =
              entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || `/${cleanWord}/`;
            const firstMeaning = entry.meanings?.[0];
            const pos = firstMeaning?.partOfSpeech || "word";
            const definition = firstMeaning?.definitions?.[0]?.definition || "";
            setWordLookupData({
              word: cleanWord.toUpperCase(),
              phonetic,
              pos,
              definitionVn: definition || `Từ vựng quan trọng trong ngữ cảnh video`,
            });
            return;
          }
        }
      } catch (e) {}

      setWordLookupData({
        word: cleanWord.toUpperCase(),
        phonetic: `/${cleanWord}/`,
        pos: "vocabulary",
        definitionVn: `Từ vựng xuất hiện trong video — nhấn 🔊 để nghe phát âm`,
      });
    },
    [onPauseVideo]
  );

  // Save Word to Notebook with direct sync to vocabularyStore & user profile
  const handleSaveWordToNotebook = useCallback(() => {
    if (!wordLookupData) return;
    const wordLower = wordLookupData.word.toLowerCase();

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("xp_voca_custom_notebook") || "[]";
        const parsed = JSON.parse(stored);
        if (parsed.some((w: any) => w.word === wordLower)) {
          addToast({
            type: "info",
            title: "Từ đã có trong Notebook!",
            message: `Từ "${wordLookupData.word}" đã được lưu trước đó rồi.`,
          });
          return;
        }
        parsed.push({
          word: wordLower,
          phonetic: wordLookupData.phonetic,
          pos: wordLookupData.pos,
          definitionVn: wordLookupData.definitionVn,
          savedAt: new Date().toISOString(),
        });
        localStorage.setItem("xp_voca_custom_notebook", JSON.stringify(parsed));
      } catch (e) {}
    }

    // Direct Sync with useVocabularyStore
    const currentLearned = useVocabularyStore.getState().learned;
    const userId = user?.id || "local_user";
    const existingIndex = currentLearned.findIndex(
      (l) => (l.word && l.word.toLowerCase() === wordLower) || l.vocabId === wordLower
    );

    if (existingIndex === -1) {
      const newLearnedItem = {
        userId,
        vocabId: wordLower,
        word: wordLower,
        phonetic: wordLookupData.phonetic,
        pos: wordLookupData.pos,
        definitionVn: wordLookupData.definitionVn,
        proficiency: 1,
        isFavorite: true,
        lastPracticed: new Date().toISOString(),
        nextReview: new Date().toISOString(),
      };
      const updatedList = [newLearnedItem, ...currentLearned];
      useVocabularyStore.setState({ learned: updatedList });

      if (typeof window !== "undefined") {
        localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(updatedList));
      }

      // Increment words learned in userStore (safe null check)
      const currentUser = useUserStore.getState().user;
      if (currentUser) {
        const currentCount = (currentUser.wordsLearned || 0) + 1;
        useUserStore.setState({
          user: { ...currentUser, wordsLearned: currentCount },
        });
      }
    }

    awardXp(5);
    addToast({
      type: "success",
      title: "Đã lưu vào Sổ Từ! (+5 XP)",
      message: `Từ "${wordLookupData.word}" đã được đồng bộ vào sổ từ cá nhân (/myvocab).`,
    });
  }, [wordLookupData, user?.id, awardXp, addToast]);

  const resetWordLookup = useCallback(() => {
    setWordLookupData(null);
    setSelectedWord(null);
  }, []);

  return {
    selectedWord,
    setSelectedWord,
    wordLookupData,
    setWordLookupData,
    handleWordClick,
    handleSaveWordToNotebook,
    resetWordLookup,
  };
}
