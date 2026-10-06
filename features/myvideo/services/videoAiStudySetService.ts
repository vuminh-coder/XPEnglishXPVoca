import { YouTubeVideoItem } from "@/stores/videoStore";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { LearnedVocabulary } from "@/shared/types";
import { useUserStore } from "@/stores/userStore";
import { GeneratedFlashcard, VideoStudySetResponse } from "@/app/api/youtube/study-set/route";

const STUDY_SET_CACHE_PREFIX = "xp_video_study_set_";

export async function fetchOrGenerateVideoStudySet(
  video: YouTubeVideoItem
): Promise<VideoStudySetResponse> {
  const cacheKey = `${STUDY_SET_CACHE_PREFIX}${video.id}`;

  // 1. Check Session Storage cache
  if (typeof window !== "undefined") {
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as VideoStudySetResponse;
        if (parsed && Array.isArray(parsed.flashcards) && parsed.flashcards.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to read study set from cache:", e);
    }
  }

  // 2. Fetch from backend API
  const response = await fetch("/api/youtube/study-set", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      videoId: video.id,
      videoTitle: video.title,
      subtitles: video.subtitles || [],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Lỗi máy chủ (${response.status}) khi sinh bộ thẻ AI`);
  }

  const result: VideoStudySetResponse = await response.json();

  // 3. Save to Session Storage
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
    } catch (e) {
      console.warn("Failed to cache study set:", e);
    }
  }

  return result;
}

export interface BatchSaveResult {
  savedCount: number;
  skippedCount: number;
  totalXpAwarded: number;
}

export function batchSaveFlashcardsToNotebook(
  flashcards: GeneratedFlashcard[],
  userId: string = "local_user",
  awardXp: (amount: number) => void
): BatchSaveResult {
  if (!flashcards || flashcards.length === 0) {
    return { savedCount: 0, skippedCount: 0, totalXpAwarded: 0 };
  }

  // 1. Sync to xp_voca_custom_notebook (Notebook format)
  let notebookList: any[] = [];
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("xp_voca_custom_notebook") || "[]";
      notebookList = JSON.parse(stored);
    } catch (e) {
      notebookList = [];
    }
  }

  // 2. Sync to useVocabularyStore
  const currentLearned = useVocabularyStore.getState().learned;
  const newLearnedItems: LearnedVocabulary[] = [];
  let savedCount = 0;
  let skippedCount = 0;

  for (const card of flashcards) {
    const wordClean = card.word.trim().toLowerCase();
    const alreadyInLearned = currentLearned.some(
      (l) => (l.word && l.word.toLowerCase() === wordClean) || l.vocabId === wordClean
    );

    if (!alreadyInLearned) {
      const newItem: LearnedVocabulary = {
        userId,
        vocabId: wordClean,
        word: wordClean,
        phonetic: card.phonetic,
        pos: card.pos,
        definitionVn: card.definitionVn,
        proficiency: 1,
        isFavorite: true,
        lastPracticed: new Date().toISOString(),
        nextReview: new Date().toISOString(),
      };
      newLearnedItems.push(newItem);
      savedCount++;
    } else {
      skippedCount++;
    }

    // Add to notebook list if not present
    const alreadyInNotebook = notebookList.some((n: any) => n.word === wordClean);
    if (!alreadyInNotebook) {
      notebookList.push({
        word: wordClean,
        phonetic: card.phonetic,
        pos: card.pos,
        definitionVn: card.definitionVn,
        contextSentence: card.contextSentence,
        savedAt: new Date().toISOString(),
      });
    }
  }

  if (newLearnedItems.length > 0) {
    const updatedLearned = [...newLearnedItems, ...currentLearned];
    useVocabularyStore.setState({ learned: updatedLearned });

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(updatedLearned));
        localStorage.setItem("xp_voca_custom_notebook", JSON.stringify(notebookList));
      } catch (e) {
        console.warn("Failed to persist to localStorage:", e);
      }
    }

    // Increment user words learned counter
    const currentUser = useUserStore.getState().user;
    if (currentUser) {
      useUserStore.setState({
        user: {
          ...currentUser,
          wordsLearned: (currentUser.wordsLearned || 0) + newLearnedItems.length,
        },
      });
    }
  }

  const xpEarned = savedCount * 3;
  if (xpEarned > 0) {
    awardXp(xpEarned);
  }

  return {
    savedCount,
    skippedCount,
    totalXpAwarded: xpEarned,
  };
}
