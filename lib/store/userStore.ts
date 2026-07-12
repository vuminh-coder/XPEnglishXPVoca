import { create } from "zustand";
import { User } from "@/types";
import { LEVEL_TITLES } from "../constants";
import { useVocabularyStore } from "./vocabularyStore";

interface UserState {
  user: User | null;
  awardXp: (amount: number) => { levelUp: boolean };
  awardCoins: (amount: number) => void;
  updateProfile: (fullName: string, bio: string) => void;
  syncClerkUser: (clerkUser: any, isSignedIn: boolean) => void;
  setLocalUser: () => void;
  buyStreakFreeze: () => Promise<boolean>;
  buyDoubleXp: () => Promise<boolean>;
  syncStreak: (hasCompletedActivity: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  syncStreak: (hasCompletedActivity) => {
    const user = get().user;
    if (!user) return;

    const formatLocalDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const todayStr = formatLocalDate(new Date());
    const lastActiveKey = `xp_voca_last_active_${user.id}`;
    const lastActive = typeof window !== "undefined" ? localStorage.getItem(lastActiveKey) : null;

    if (hasCompletedActivity) {
      if (lastActive === todayStr) {
        return;
      }

      let newStreak = user.currentStreak || 0;
      let newLongest = user.longestStreak || 0;
      let newFreezes = user.streakFreezes || 0;

      if (!lastActive) {
        newStreak = 1;
      } else {
        const lastDate = new Date(lastActive + "T00:00:00");
        const todayDate = new Date(todayStr + "T00:00:00");
        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          if (newFreezes > 0) {
            newFreezes -= 1;
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        }
      }

      if (newStreak > newLongest) {
        newLongest = newStreak;
      }

      const updatedUser = {
        ...user,
        currentStreak: newStreak,
        longestStreak: newLongest,
        streakFreezes: newFreezes,
      };

      set({ user: updatedUser });
      if (typeof window !== "undefined") {
        localStorage.setItem(lastActiveKey, todayStr);
        localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
      }

      fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStreak: newStreak,
          longestStreak: newLongest,
          streakFreezes: newFreezes,
        }),
      }).catch(err => console.error("Error syncing streak activity:", err));

    } else {
      if (!lastActive) return;

      const lastDate = new Date(lastActive + "T00:00:00");
      const todayDate = new Date(todayStr + "T00:00:00");
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 1) return;

      let newStreak = user.currentStreak || 0;
      let newFreezes = user.streakFreezes || 0;

      if (newFreezes > 0 && newStreak > 0) {
        newFreezes -= 1;
        const yesterdayDate = new Date(todayDate);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterdayStr = formatLocalDate(yesterdayDate);

        const updatedUser = {
          ...user,
          streakFreezes: newFreezes,
        };

        set({ user: updatedUser });
        if (typeof window !== "undefined") {
          localStorage.setItem(lastActiveKey, yesterdayStr);
          localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
        }

        fetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStreak: newStreak,
            streakFreezes: newFreezes,
          }),
        }).catch(err => console.error("Error syncing freeze consumption:", err));

      } else if (newStreak > 0) {
        const updatedUser = {
          ...user,
          currentStreak: 0,
        };

        set({ user: updatedUser });
        if (typeof window !== "undefined") {
          localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
        }

        fetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStreak: 0,
          }),
        }).catch(err => console.error("Error syncing reset streak:", err));
      }
    }
  },
  awardXp: (amount) => {
    get().syncStreak(true);
    const user = get().user;
    if (!user) return { levelUp: false };
    const newXp = user.totalXp + amount;

    // Level up check
    let newLevel = user.level;
    let levelUp = false;
    let levelUpCoins = 0;
    const LEVEL_XP = [
      0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
      7600, 9200, 11000,
    ];
    if (newXp >= LEVEL_XP[newLevel]) {
      newLevel++;
      levelUp = true;
      levelUpCoins = 100 * newLevel;
    }

    const newTitle = LEVEL_TITLES[newLevel] || "Grandmaster";
    const newCoins = (user.coins || 0) + levelUpCoins;
    const updatedUser = { ...user, totalXp: newXp, level: newLevel, title: newTitle, coins: newCoins };
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
        coins: newCoins,
      }),
    }).catch(err => console.error("Error syncing XP to DB:", err));

    return { levelUp };
  },
  awardCoins: (amount) => {
    const user = get().user;
    if (!user) return;
    const newCoins = (user.coins || 0) + amount;
    const updatedUser = { ...user, coins: newCoins };
    set({ user: updatedUser });
    if (typeof window !== "undefined") {
      localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
    }

    // Sync coins with DB
    fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coins: newCoins,
      }),
    }).catch(err => console.error("Error syncing awardCoins to DB:", err));
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
  syncClerkUser: (clerkUser, isSignedIn) => {
    if (!isSignedIn || !clerkUser) {
      set({ user: null });
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
      coins: storedUser.coins !== undefined ? storedUser.coins : 100,
      streakFreezes: storedUser.streakFreezes !== undefined ? storedUser.streakFreezes : 0,
    };

    set({ user: syncedUser });

    if (typeof window !== "undefined") {
      localStorage.setItem(`xp_voca_user_${userId}`, JSON.stringify(syncedUser));
    }

    // Load vocabulary progress locally first
    useVocabularyStore.getState().loadLearnedWords(userId);

    // Validate streak status locally on Clerk user load
    get().syncStreak(false);

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
            longestStreak: profile.longestStreak || syncedUser.longestStreak,
            minutesStudied: profile.minutesStudied || syncedUser.minutesStudied,
            title: profile.title || syncedUser.title,
            avatarEmoji: profile.avatarEmoji || syncedUser.avatarEmoji,
            coins: profile.coins !== undefined ? profile.coins : syncedUser.coins,
            streakFreezes: profile.streakFreezes !== undefined ? profile.streakFreezes : syncedUser.streakFreezes,
          };
          set({ user: cloudUser });
          localStorage.setItem(`xp_voca_user_${userId}`, JSON.stringify(cloudUser));
          
          // Re-validate streak after retrieving server-synced cloud data
          get().syncStreak(false);

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
              longestStreak: syncedUser.longestStreak,
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
  setLocalUser: () => {
    if (typeof window !== "undefined") {
      const activeUserId = localStorage.getItem("xp_voca_active_userId") || "local_user";
      const localData = localStorage.getItem(`xp_voca_user_${activeUserId}`);
      if (localData) {
        try {
          const localUser = JSON.parse(localData);
          set({ user: localUser });
          useVocabularyStore.getState().loadLearnedWords(activeUserId);
          
          // Validate streak status on local load
          get().syncStreak(false);
        } catch (e) {
          console.error(e);
        }
      }
    }
  },
  buyStreakFreeze: async () => {
    const user = get().user;
    if (!user || (user.coins || 0) < 50) return false;

    try {
      const res = await fetch("/api/shop/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: "streak_freeze" }),
      });
      const data = await res.json();
      if (data.success) {
        const updatedUser: User = {
          ...user,
          coins: data.coins,
          streakFreezes: data.streakFreezes,
        };
        set({ user: updatedUser });
        if (typeof window !== "undefined") {
          localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
        }
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  },
  buyDoubleXp: async () => {
    const user = get().user;
    if (!user || (user.coins || 0) < 100) return false;

    try {
      const res = await fetch("/api/shop/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: "double_xp" }),
      });
      const data = await res.json();
      if (data.success) {
        const updatedUser: User = {
          ...user,
          coins: data.coins,
        };
        set({ user: updatedUser });
        if (typeof window !== "undefined") {
          localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
        }
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  },
  logout: () => {
    set({ user: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("xp_voca_active_userId");
      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "local-user-id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  },
}));
