import { create } from "zustand";
import { User } from "@/types";
import { LEVEL_TITLES } from "../constants";
import { useVocabularyStore } from "./vocabularyStore";

const getDemoUser = (): User => ({
  id: "u1",
  username: "Aministrator",
  fullName: "Vũ Văn Minh",
  email: "vuanhtuanfc@gmail.com",
  level: 11,
  totalXp: 2850,
  currentStreak: 15,
  longestStreak: 30,
  avatarEmoji: "🦉",
  bio: "Founder & Developer of XP Voca 🚀",
  title: "Word Wizard",
  wordsLearned: 245,
  wordsToReview: 12,
  minutesStudied: 1240,
});

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  logout: () => void;
  awardXp: (amount: number) => { levelUp: boolean };
  updateProfile: (fullName: string, bio: string) => void;
  syncClerkUser: (clerkUser: any, isSignedIn: boolean) => void;
  setLocalUser: () => void;
  localLogin: (username: string, email: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (email) => {
    if (email === "vuanhtuanfc@gmail.com" || email.includes("@")) {
      set({ isAuthenticated: true, user: getDemoUser() });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("xp_voca_active_userId");
      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "local-user-id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  },
  setLocalUser: () => {
    if (typeof window !== "undefined") {
      const activeUserId = localStorage.getItem("xp_voca_active_userId") || "local_user";
      const localData = localStorage.getItem(`xp_voca_user_${activeUserId}`);
      if (localData) {
        try {
          const localUser = JSON.parse(localData);
          set({ user: localUser, isAuthenticated: true });
          useVocabularyStore.getState().loadLearnedWords(activeUserId);
        } catch (e) {
          console.error(e);
        }
      }
    }
  },
  localLogin: (username, email) => {
    const userId = "local_" + username.toLowerCase().replace(/[^a-z0-9]/g, "");
    const syncedUser: User = {
      id: userId,
      username: username,
      fullName: username,
      email: email,
      level: 1,
      totalXp: 0,
      currentStreak: 1,
      longestStreak: 1,
      avatarEmoji: "🦉",
      bio: "Học viên mới của XP Voca! 🚀",
      title: LEVEL_TITLES[1] || "Newbie",
      wordsLearned: 0,
      wordsToReview: 0,
      minutesStudied: 0,
    };
    set({ user: syncedUser, isAuthenticated: true });
    if (typeof window !== "undefined") {
      localStorage.setItem(`xp_voca_user_${userId}`, JSON.stringify(syncedUser));
      localStorage.setItem("xp_voca_active_userId", userId);
      document.cookie = "auth-token=true; path=/; max-age=86400";
      document.cookie = `local-user-id=${userId}; path=/; max-age=86400`;
    }
    useVocabularyStore.getState().loadLearnedWords(userId);
  },
  updateProfile: (fullName, bio) => {
    const user = get().user;
    if (user) {
      const updatedUser = { ...user, fullName, bio };
      set({ user: updatedUser });
      if (typeof window !== "undefined") {
        localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
      }
      
      // Sync with secure profile API endpoint
      fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, bio }),
      }).catch(err => console.error("Error updating profile in DB:", err));
    }
  },
  awardXp: (amount) => {
    const user = get().user;
    if (!user) return { levelUp: false };
    const newXp = user.totalXp + amount;

    // Level up check
    let newLevel = user.level;
    let levelUp = false;
    const LEVEL_XP = [
      0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
      7600, 9200, 11000,
    ];
    if (newXp >= LEVEL_XP[newLevel]) {
      newLevel++;
      levelUp = true;
    }

    const newTitle = LEVEL_TITLES[newLevel] || "Grandmaster";
    const updatedUser = { ...user, totalXp: newXp, level: newLevel, title: newTitle };
    set({ user: updatedUser });
    if (typeof window !== "undefined") {
      localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
    }
    
    // Sync with secure profile API endpoint
    fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalXp: newXp,
        level: newLevel,
        title: newTitle,
      }),
    }).catch(err => console.error("Error syncing XP to DB:", err));

    return { levelUp };
  },
  syncClerkUser: (clerkUser, isSignedIn) => {
    if (!isSignedIn || !clerkUser) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    const userId = clerkUser.id;
    const email = clerkUser.primaryEmailAddress?.emailAddress || "";
    const username = clerkUser.username || clerkUser.firstName || "user";
    const fullName = clerkUser.fullName || clerkUser.firstName || "User";
    const imageUrl = clerkUser.imageUrl || "";

    let storedUser: Partial<User> = {};
    if (typeof window !== "undefined") {
      try {
        const localData = localStorage.getItem(`xp_voca_user_${userId}`);
        if (localData) {
          storedUser = JSON.parse(localData);
        }
      } catch (e) {
        console.error("Error loading user data from localStorage:", e);
      }
    }

    const userLevel = storedUser.level || 1;
    const syncedUser: User = {
      id: userId,
      username: storedUser.username || username,
      fullName: storedUser.fullName || fullName,
      email: storedUser.email || email,
      level: userLevel,
      totalXp: storedUser.totalXp || 0,
      currentStreak: storedUser.currentStreak || 0,
      longestStreak: storedUser.longestStreak || 0,
      avatarEmoji: storedUser.avatarEmoji || "🦉",
      bio: storedUser.bio || "Học viên mới của XP Voca! 🚀",
      title: LEVEL_TITLES[userLevel] || storedUser.title || "Newbie",
      wordsLearned: storedUser.wordsLearned || 0,
      wordsToReview: storedUser.wordsToReview || 0,
      minutesStudied: storedUser.minutesStudied || 0,
      imageUrl: imageUrl,
    };

    set({ user: syncedUser, isAuthenticated: true });

    if (typeof window !== "undefined") {
      localStorage.setItem(`xp_voca_user_${userId}`, JSON.stringify(syncedUser));
    }

    // Load vocabulary progress locally first
    useVocabularyStore.getState().loadLearnedWords(userId);

    // Sync with secure profile API endpoint
    (async () => {
      try {
        const res = await fetch("/api/user/profile");
        const json = await res.json();
        
        if (json.success && json.data) {
          const profile = json.data;
          const cloudUser: User = {
            ...syncedUser,
            fullName: profile.fullName || syncedUser.fullName,
            username: profile.username || syncedUser.username,
            level: profile.level || syncedUser.level,
            totalXp: profile.totalXp || syncedUser.totalXp,
            currentStreak: profile.currentStreak || syncedUser.currentStreak,
            minutesStudied: profile.minutesStudied || syncedUser.minutesStudied,
            title: profile.title || syncedUser.title,
            avatarEmoji: profile.avatarEmoji || syncedUser.avatarEmoji,
          };
          set({ user: cloudUser });
          localStorage.setItem(`xp_voca_user_${userId}`, JSON.stringify(cloudUser));
          
          // Re-load vocabulary progress to sync correctly after profile loaded
          useVocabularyStore.getState().loadLearnedWords(userId);
        } else {
          // If profile fetch fails or profile is missing, initialize on server
          await fetch("/api/user/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: syncedUser.fullName,
              username: syncedUser.username,
              avatarEmoji: syncedUser.avatarEmoji,
              level: syncedUser.level,
              totalXp: syncedUser.totalXp,
              currentStreak: syncedUser.currentStreak,
              minutesStudied: syncedUser.minutesStudied,
              title: syncedUser.title,
            }),
          });
        }
      } catch (err) {
        console.error("Secure profile sync error:", err);
      }
    })();
  },
}));
