import { create } from 'zustand';
import { Vocabulary, LearnedVocabulary } from '@/shared/types';
import { useUserStore } from './userStore';
import { useDailyChallengeStore } from './dailyChallengeStore';

interface VocabularyState {
  vocabularies: Vocabulary[];
  learned: LearnedVocabulary[];
  toggleFavorite: (vocabId: string) => void;
  practiceWord: (vocabId: string, isCorrect: boolean) => void;
  loadLearnedWords: (userId: string) => void;
  submitReview: (vocabId: string, quality: number) => Promise<void>;
}

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`[SafeFetch] Suppressed fetch error for ${url}:`, err);
    return null;
  }
};

export const useVocabularyStore = create<VocabularyState>((set, get) => ({
  vocabularies: [],
  learned: [],
  loadLearnedWords: (userId) => {
    if (!userId || typeof window === 'undefined') return;
    try {
      const localData = localStorage.getItem(`xp_voca_learned_${userId}`);
      if (localData) {
        set({ learned: JSON.parse(localData) });
      }
    } catch (e) {
      console.error("Error loading local vocab progress:", e);
    }

    if (userId === "local_user" || userId.startsWith("local_user") || userId === "u1") {
      return;
    }

    // Sync with secure vocab API endpoint
    (async () => {
      const json = await safeFetch("/api/user/vocab");
      if (json && json.success && json.data) {
        const mappedList = json.data.map((c: any) => ({
          userId: c.userId,
          vocabId: c.vocabId,
          proficiency: c.proficiency,
          lastPracticed: c.lastPracticed,
          nextReview: c.nextReview,
          isFavorite: c.isFavorite,
          word: c.word,
          phonetic: c.phonetic,
          definition: c.definition,
          definitionVn: c.definitionVn,
          pos: c.pos,
          difficulty: c.difficulty,
          frequency: c.frequency,
          themeId: c.themeId,
          examples: c.examples,
          synonyms: c.synonyms,
          antonyms: c.antonyms,
        }));
        set({ learned: mappedList });
        localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(mappedList));
      }
    })();
  },
  toggleFavorite: (vocabId) => {
    const list = get().learned;
    const user = useUserStore.getState().user;
    const userId = user?.id || 'u1';
    const item = list.find(l => l.vocabId === vocabId && (l.userId === userId || l.userId === 'local_user'));
    let updatedList = [];
    if (item) {
      item.isFavorite = !item.isFavorite;
      updatedList = [...list];
    } else {
      updatedList = [...list, { userId, vocabId, proficiency: 0, lastPracticed: null, nextReview: null, isFavorite: true }];
    }
    set({ learned: updatedList });

    if (user) {
      const activeSavedCount = updatedList.filter(l => (l.userId === user.id || l.userId === 'local_user') && (l.isFavorite || (l.proficiency && l.proficiency > 0))).length;
      useUserStore.setState({ user: { ...user, wordsLearned: activeSavedCount } });
      if (typeof window !== 'undefined') {
        localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify({ ...user, wordsLearned: activeSavedCount }));
      }
      if (user.id !== "local_user" && !user.id.startsWith("local_user") && user.id !== "u1") {
        safeFetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wordsLearned: activeSavedCount }),
        });
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(updatedList));
    }

    const activeItem = updatedList.find(l => l.vocabId === vocabId);
    if (activeItem && user && user.id !== "local_user" && !user.id.startsWith("local_user") && user.id !== "u1") {
      safeFetch("/api/user/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabId: vocabId,
          isFavorite: activeItem.isFavorite,
          proficiency: activeItem.proficiency,
          lastPracticed: activeItem.lastPracticed,
          nextReview: activeItem.nextReview
        })
      });
    }
  },
  practiceWord: (vocabId, isCorrect) => {
    const list = get().learned;
    const user = useUserStore.getState().user;
    const userId = user?.id || 'u1';
    const item = list.find(l => l.vocabId === vocabId && (l.userId === userId || l.userId === 'local_user'));
    let updatedList = [];
    if (item) {
      item.proficiency = isCorrect ? Math.min(5, item.proficiency + 1) : Math.max(0, item.proficiency - 1);
      item.isLearned = item.proficiency > 0;
      item.lastPracticed = new Date().toISOString();
      updatedList = [...list];
      if (isCorrect) {
        useDailyChallengeStore.getState().incrementProgress("review_cards");
      }
    } else {
      updatedList = [...list, { userId, vocabId, proficiency: isCorrect ? 1 : 0, isLearned: isCorrect, lastPracticed: new Date().toISOString(), nextReview: new Date().toISOString(), isFavorite: false }];
      if (isCorrect) {
        useDailyChallengeStore.getState().incrementProgress("learn_words");
      }
    }
    set({ learned: updatedList });

    if (user) {
      const activeSavedCount = updatedList.filter(l => (l.userId === user.id || l.userId === 'local_user') && (l.isFavorite || (l.proficiency && l.proficiency > 0))).length;
      useUserStore.setState({ user: { ...user, wordsLearned: activeSavedCount } });
      if (typeof window !== 'undefined') {
        localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify({ ...user, wordsLearned: activeSavedCount }));
      }
      if (user.id !== "local_user" && !user.id.startsWith("local_user") && user.id !== "u1") {
        safeFetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wordsLearned: activeSavedCount }),
        });
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(updatedList));
    }

    const activeItem = updatedList.find(l => l.vocabId === vocabId);
    if (activeItem && user && user.id !== "local_user" && !user.id.startsWith("local_user") && user.id !== "u1") {
      safeFetch("/api/user/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabId: vocabId,
          isFavorite: activeItem.isFavorite,
          proficiency: activeItem.proficiency,
          lastPracticed: activeItem.lastPracticed,
          nextReview: activeItem.nextReview
        })
      });
    }
  },
  submitReview: async (vocabId, quality) => {
    const list = get().learned;
    const user = useUserStore.getState().user;
    const userId = user?.id || 'u1';
    
    const json = await safeFetch("/api/user/vocab/review-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vocabId, quality }),
    });
    
    if (json && json.success && json.data) {
      useDailyChallengeStore.getState().incrementProgress("review_cards");

      const updatedVocab = json.data;
      const itemIndex = list.findIndex(l => l.vocabId === vocabId);
      
      let updatedList = [...list];
      const newLearnedItem = {
        userId,
        vocabId,
        proficiency: updatedVocab.proficiency,
        lastPracticed: updatedVocab.lastPracticed,
        nextReview: updatedVocab.nextReview,
        isFavorite: itemIndex !== -1 ? list[itemIndex].isFavorite : false
      };

      if (itemIndex !== -1) {
        updatedList[itemIndex] = newLearnedItem;
      } else {
        updatedList.push(newLearnedItem);
      }

      set({ learned: updatedList });
      if (typeof window !== 'undefined') {
        localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(updatedList));
      }
    }
  }
}));