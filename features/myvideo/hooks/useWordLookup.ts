"use client";

import { useState, useCallback } from "react";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useUserStore } from "@/stores/userStore";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";
import type { WordLookupData } from "../components/shared/WordLookupCard";

interface LocalDictEntry {
  word: string;
  phonetic: string;
  pos: string;
  definitionVn: string;
}

let cachedLocalDictMap: Map<string, LocalDictEntry> | null = null;

function getLocalDictionaryMap(): Map<string, LocalDictEntry> {
  if (cachedLocalDictMap) return cachedLocalDictMap;
  const map = new Map<string, LocalDictEntry>();

  for (const item of ADVANCED_VOCABULARIES) {
    const key = item.word?.trim().toLowerCase();
    if (key && item.definitionVn) {
      map.set(key, {
        word: item.word,
        phonetic: item.phonetic || `/${key}/`,
        pos: item.pos || "vocab",
        definitionVn: item.definitionVn,
      });
    }
  }

  for (const item of BASIC_VOCABULARIES) {
    const key = item.word?.trim().toLowerCase();
    if (key && item.definitionVn) {
      map.set(key, {
        word: item.word,
        phonetic: item.phonetic || `/${key}/`,
        pos: item.pos || "vocab",
        definitionVn: item.definitionVn,
      });
    }
  }

  cachedLocalDictMap = map;
  return map;
}

export function lookupLocalVocabularyEntry(cleanWord: string): LocalDictEntry | null {
  if (!cleanWord) return null;
  const lower = cleanWord.toLowerCase();

  // 1. Check user's learned/saved words first
  const learned = useVocabularyStore.getState().learned;
  const learnedHit = learned.find(
    (l) => l.word?.toLowerCase() === lower && l.definitionVn && !l.definitionVn.startsWith("Từ vựng xuất hiện")
  );
  if (learnedHit && learnedHit.definitionVn) {
    return {
      word: learnedHit.word || lower,
      phonetic: learnedHit.phonetic || `/${lower}/`,
      pos: learnedHit.pos || "vocab",
      definitionVn: learnedHit.definitionVn,
    };
  }

  // 2. Check curated 2,700+ local vocabulary bank (exact + stem candidates)
  const dictMap = getLocalDictionaryMap();
  const candidates = [lower];
  if (lower.endsWith("ies") && lower.length > 4) candidates.push(lower.slice(0, -3) + "y");
  if (lower.endsWith("es") && lower.length > 4) candidates.push(lower.slice(0, -2));
  if (lower.endsWith("s") && lower.length > 3) candidates.push(lower.slice(0, -1));
  if (lower.endsWith("ed") && lower.length > 4) {
    candidates.push(lower.slice(0, -2));
    candidates.push(lower.slice(0, -1));
  }
  if (lower.endsWith("ing") && lower.length > 5) {
    candidates.push(lower.slice(0, -3));
    candidates.push(lower.slice(0, -3) + "e");
  }
  if (lower.endsWith("ly") && lower.length > 4) candidates.push(lower.slice(0, -2));

  for (const candidate of candidates) {
    const match = dictMap.get(candidate);
    if (match) {
      return {
        ...match,
        word: cleanWord,
      };
    }
  }

  return null;
}

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

  // 1-Click Word Lookup (Instant Local Vietnamese Dictionary + Online Bilingual Fallback)
  const handleWordClick = useCallback(
    async (word: string) => {
      const cleanWord = word
        .replace(/[^a-zA-Z'-]/g, "")
        .replace(/^['-]+|['-]+$/g, "")
        .toLowerCase();
      if (!cleanWord) return;

      onPauseVideo?.();
      setSelectedWord(cleanWord);
      speakLessonText(cleanWord, { lessonId: "video_subtitle_word", rate: 1.0 });

      // Tier 1: Instant 0ms lookup from internal 2,700+ Vietnamese vocabulary bank
      const localMatch = lookupLocalVocabularyEntry(cleanWord);
      if (localMatch) {
        setWordLookupData({
          word: cleanWord.toUpperCase(),
          phonetic: localMatch.phonetic,
          pos: localMatch.pos,
          definitionVn: localMatch.definitionVn,
        });
        return;
      }

      setWordLookupData({
        word: cleanWord.toUpperCase(),
        phonetic: `/${cleanWord}/`,
        pos: "loading...",
        definitionVn: "Đang tra từ điển Anh - Việt...",
      });

      // Tier 2: Parallel fetch IPA/POS from dictionaryapi.dev + Vietnamese meaning from Google Translate GTX
      try {
        const [dictRes, transRes] = await Promise.allSettled([
          fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`),
          fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
              cleanWord
            )}`
          ),
        ]);

        let phonetic = `/${cleanWord}/`;
        let pos = "vocabulary";
        let enDef = "";
        let vnMeaning = "";

        if (dictRes.status === "fulfilled" && dictRes.value.ok) {
          const dictData = await dictRes.value.json();
          if (Array.isArray(dictData) && dictData.length > 0) {
            const entry = dictData[0];
            phonetic =
              entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || `/${cleanWord}/`;
            const firstMeaning = entry.meanings?.[0];
            pos = firstMeaning?.partOfSpeech || "vocabulary";
            enDef = firstMeaning?.definitions?.[0]?.definition || "";
          }
        }

        if (transRes.status === "fulfilled" && transRes.value.ok) {
          const transData = await transRes.value.json();
          if (Array.isArray(transData) && Array.isArray(transData[0])) {
            const translated = transData[0].map((part: any) => part?.[0] || "").join("").trim();
            if (translated && translated.toLowerCase() !== cleanWord) {
              vnMeaning = translated.charAt(0).toUpperCase() + translated.slice(1);
            }
          }
        }

        if (!vnMeaning && enDef) {
          // Translate the concise English definition to Vietnamese if single-word translation was identical
          try {
            const defTransRes = await fetch(
              `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
                enDef
              )}`
            );
            if (defTransRes.ok) {
              const defTransData = await defTransRes.json();
              if (Array.isArray(defTransData) && Array.isArray(defTransData[0])) {
                vnMeaning = defTransData[0].map((part: any) => part?.[0] || "").join("").trim();
              }
            }
          } catch {}
        }

        if (vnMeaning || enDef) {
          setWordLookupData({
            word: cleanWord.toUpperCase(),
            phonetic,
            pos,
            definitionVn:
              vnMeaning && enDef
                ? `${vnMeaning} — ${enDef}`
                : vnMeaning || enDef || `Từ vựng quan trọng trong ngữ cảnh video`,
          });
          return;
        }
      } catch {}

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
