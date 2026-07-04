import { create } from 'zustand';
import { Vocabulary, LearnedVocabulary } from '@/types';
import { MOCK_VOCABULARIES } from '../constants/vocabularies';
import { useAuthStore } from './authStore';

interface VocabularyState {
  vocabularies: Vocabulary[];
  learned: LearnedVocabulary[];
  toggleFavorite: (vocabId: string) => void;
  practiceWord: (vocabId: string, isCorrect: boolean) => void;
  loadLearnedWords: (userId: string) => void;
}

export const useVocabularyStore = create<VocabularyState>((set, get) => ({
  vocabularies: MOCK_VOCABULARIES,
  learned: [
    { userId: 'u1', vocabId: 'v1', proficiency: 5, lastPracticed: new Date().toISOString(), nextReview: new Date().toISOString(), isFavorite: true },
    { userId: 'u1', vocabId: 'v2', proficiency: 3, lastPracticed: new Date().toISOString(), nextReview: new Date().toISOString(), isFavorite: false }
  ],
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

    // Sync with secure vocab API endpoint
    (async () => {
      try {
        const res = await fetch("/api/user/vocab");
        const json = await res.json();
        
        if (json.success && json.data && json.data.length > 0) {
          const mappedList = json.data.map((c: any) => ({
            userId: c.userId,
            vocabId: c.vocabId,
            proficiency: c.proficiency,
            lastPracticed: c.lastPracticed,
            nextReview: c.nextReview,
            isFavorite: c.isFavorite
          }));
          set({ learned: mappedList });
          localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(mappedList));
        }
      } catch (err) {
        console.error("Secure API load vocab progress error:", err);
      }
    })();
  },
  toggleFavorite: (vocabId) => {
    const list = get().learned;
    const userId = useAuthStore.getState().user?.id || 'u1';
    const item = list.find(l => l.vocabId === vocabId && l.userId === userId);
    let updatedList = [];
    if (item) {
      item.isFavorite = !item.isFavorite;
      updatedList = [...list];
    } else {
      updatedList = [...list, { userId, vocabId, proficiency: 0, lastPracticed: null, nextReview: null, isFavorite: true }];
    }
    set({ learned: updatedList });

    if (typeof window !== 'undefined') {
      localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(updatedList));
    }

    const activeItem = updatedList.find(l => l.vocabId === vocabId && l.userId === userId);
    if (activeItem) {
      fetch("/api/user/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabId: vocabId,
          isFavorite: activeItem.isFavorite,
          proficiency: activeItem.proficiency,
          lastPracticed: activeItem.lastPracticed,
          nextReview: activeItem.nextReview
        })
      }).catch(err => console.error("Error syncing favorite to API:", err));
    }
  },
  practiceWord: (vocabId, isCorrect) => {
    const list = get().learned;
    const userId = useAuthStore.getState().user?.id || 'u1';
    const item = list.find(l => l.vocabId === vocabId && l.userId === userId);
    let updatedList = [];
    if (item) {
      item.proficiency = isCorrect ? Math.min(5, item.proficiency + 1) : Math.max(0, item.proficiency - 1);
      item.lastPracticed = new Date().toISOString();
      updatedList = [...list];
    } else {
      updatedList = [...list, { userId, vocabId, proficiency: isCorrect ? 1 : 0, lastPracticed: new Date().toISOString(), nextReview: new Date().toISOString(), isFavorite: false }];
    }
    set({ learned: updatedList });

    if (typeof window !== 'undefined') {
      localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(updatedList));
    }

    const activeItem = updatedList.find(l => l.vocabId === vocabId && l.userId === userId);
    if (activeItem) {
      fetch("/api/user/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabId: vocabId,
          isFavorite: activeItem.isFavorite,
          proficiency: activeItem.proficiency,
          lastPracticed: activeItem.lastPracticed,
          nextReview: activeItem.nextReview
        })
      }).catch(err => console.error("Error syncing practice word to API:", err));
    }
  }
}));