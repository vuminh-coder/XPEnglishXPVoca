import { create } from "zustand";
import { User } from "@/types";
import { LEVEL_TITLES } from "../constants";
import { useVocabularyStore } from "./vocabularyStore";
import { addSkillPracticeMinutes, getLocalDateString, SkillType } from "./skillChartStore";

interface UserState {
  user: User | null;
  awardXp: (amount: number) => { levelUp: boolean };
  addPracticeTime: (minutes: number, skill?: SkillType) => void;
  awardCoins: (amount: number) => void;
  updateProfile: (fullName: string, bio: string, avatarUrl?: string, avatarEmoji?: string) => void;
  setLocalUser: () => void;
  setUserPayload: (user: User) => void;
  checkSession: () => Promise<void>;
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

      if (user.id !== "local_user" && !user.id.startsWith("local_user")) {
        fetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStreak: newStreak,
            longestStreak: newLongest,
            streakFreezes: newFreezes,
          }),
        }).catch(err => console.error("Error syncing streak activity:", err));
      }

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

        if (user.id !== "local_user" && !user.id.startsWith("local_user")) {
          fetch("/api/user/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              currentStreak: newStreak,
              streakFreezes: newFreezes,
            }),
          }).catch(err => console.error("Error syncing freeze consumption:", err));
        }

      } else if (newStreak > 0) {
        const updatedUser = {
          ...user,
          currentStreak: 0,
        };

        set({ user: updatedUser });
        if (typeof window !== "undefined") {
          localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
        }

        if (user.id !== "local_user" && !user.id.startsWith("local_user")) {
          fetch("/api/user/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              currentStreak: 0,
            }),
          }).catch(err => console.error("Error syncing reset streak:", err));
        }
      }
    }
  },
  awardXp: (amount) => {
    get().syncStreak(true);
    const user = get().user;
    if (!user) return { levelUp: false };
    const newXp = (user.totalXp || 0) + amount;

    // Level up check
    let newLevel = user.level || 1;
    let levelUp = false;
    let levelUpCoins = 0;
    const LEVEL_XP = [
      0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
      7600, 9200, 11000,
    ];
    if (newXp >= (LEVEL_XP[newLevel] || 99999)) {
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

      // Record daily active date and daily XP locally
      const todayStr = getLocalDateString(new Date());
      const activeDatesKey = `xp_voca_active_dates_${user.id}`;
      const dailyXpKey = `xp_voca_daily_xp_${user.id}`;
      
      try {
        const storedDates = localStorage.getItem(activeDatesKey);
        const activeDates = storedDates ? JSON.parse(storedDates) : [];
        if (!activeDates.includes(todayStr)) {
          activeDates.push(todayStr);
          localStorage.setItem(activeDatesKey, JSON.stringify(activeDates));
        }
      } catch (e) {
        console.error("Error saving active dates:", e);
      }

      try {
        const storedXp = localStorage.getItem(dailyXpKey);
        const dailyXp = storedXp ? JSON.parse(storedXp) : {};
        dailyXp[todayStr] = (dailyXp[todayStr] || 0) + amount;
        localStorage.setItem(dailyXpKey, JSON.stringify(dailyXp));
      } catch (e) {
        console.error("Error saving daily XP:", e);
      }
    }
    
    // Sync with secure profile API endpoint
    if (user.id !== "local_user" && !user.id.startsWith("local_user")) {
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
    }

    return { levelUp };
  },
  addPracticeTime: (minutes, skill) => {
    get().syncStreak(true);
    const user = get().user;
    if (!user || typeof minutes !== "number" || isNaN(minutes) || minutes <= 0) return;

    // Normalize skill key and Vietnamese name
    const rawSkill = (skill || "vocab").toString().toLowerCase();
    let englishKey: SkillType = "vocab";
    let vnSkillName: "Dictation" | "Shadowing" | "Nói" | "Từ vựng" | "Viết" = "Từ vựng";

    if (rawSkill.includes("dictation") || rawSkill.includes("nghe")) {
      englishKey = "dictation";
      vnSkillName = "Dictation";
    } else if (rawSkill.includes("shadowing") || rawSkill.includes("nhại")) {
      englishKey = "shadowing";
      vnSkillName = "Shadowing";
    } else if (rawSkill.includes("speaking") || rawSkill.includes("nói")) {
      englishKey = "speaking";
      vnSkillName = "Nói";
    } else if (rawSkill.includes("writing") || rawSkill.includes("viết")) {
      englishKey = "writing";
      vnSkillName = "Viết";
    } else {
      englishKey = "vocab";
      vnSkillName = "Từ vựng";
    }

    // 1. Sync per-skill chart minutes (English key used by skillChartStore & Dashboard)
    addSkillPracticeMinutes(user.id, englishKey, minutes);

    // 2. Sync legacy / analytics per-skill keys (both English and VN keys)
    recordSkillPractice(user.id, vnSkillName, minutes, 0);
    recordSkillPractice(user.id, englishKey as any, minutes, 0);

    const newMinutes = (user.minutesStudied || 0) + Math.round(minutes);
    const updatedUser = { ...user, minutesStudied: newMinutes };
    set({ user: updatedUser });

    if (typeof window !== "undefined") {
      localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));

      const todayStr = getLocalDateString(new Date());
      const dailyMinKey = `xp_voca_daily_minutes_${user.id}`;
      
      try {
        const storedMin = localStorage.getItem(dailyMinKey);
        const dailyMin = storedMin ? JSON.parse(storedMin) : {};
        dailyMin[todayStr] = (dailyMin[todayStr] || 0) + Math.round(minutes);
        localStorage.setItem(dailyMinKey, JSON.stringify(dailyMin));
      } catch (e) {
        console.error("Error saving daily minutes:", e);
      }
    }

    if (user.id !== "local_user" && !user.id.startsWith("local_user")) {
      fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minutesStudied: newMinutes,
        }),
      }).catch(err => console.error("Error syncing practice time to DB:", err));
    }
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
    if (user.id !== "local_user" && !user.id.startsWith("local_user")) {
      fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coins: newCoins,
        }),
      }).catch(err => console.error("Error syncing awardCoins to DB:", err));
    }
  },
  updateProfile: (fullName, bio, avatarUrl, avatarEmoji) => {
    const user = get().user;
    if (user) {
      const finalAvatar = avatarUrl !== undefined ? avatarUrl : (user.imageUrl || user.avatar || user.avatarUrl || "");
      const updatedUser: User = {
        ...user,
        fullName,
        bio,
        imageUrl: finalAvatar,
        avatar: finalAvatar,
        avatarUrl: finalAvatar,
        avatarEmoji: avatarEmoji !== undefined ? avatarEmoji : user.avatarEmoji,
      };
      set({ user: updatedUser });
      if (typeof window !== "undefined") {
        localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
        if (finalAvatar) {
          localStorage.setItem(`xp_voca_avatar_${user.id}`, finalAvatar);
        }
      }
      
      // Sync with secure profile API endpoint
      if (user.id !== "local_user" && !user.id.startsWith("local_user")) {
        fetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            bio,
            avatarUrl: finalAvatar,
            avatarEmoji: avatarEmoji !== undefined ? avatarEmoji : user.avatarEmoji,
          }),
        }).catch(err => console.error("Error updating profile in DB:", err));
      }
    }
  },
  setUserPayload: (userPayload: User) => {
    const existingUser = get().user;
    let cachedImageUrl = "";
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(`xp_voca_user_${userPayload.id}`);
        const avatarCached = localStorage.getItem(`xp_voca_avatar_${userPayload.id}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          cachedImageUrl = parsed.imageUrl || parsed.avatar || parsed.avatarUrl || "";
        }
        if (!cachedImageUrl && avatarCached) {
          cachedImageUrl = avatarCached;
        }
      } catch (e) {}
    }

    const finalAvatar = userPayload.imageUrl || (userPayload as any).avatar || (userPayload as any).avatarUrl || existingUser?.imageUrl || existingUser?.avatar || existingUser?.avatarUrl || cachedImageUrl || "";

    const mergedUser: User = {
      ...userPayload,
      imageUrl: finalAvatar,
      avatar: finalAvatar,
      avatarUrl: finalAvatar,
    };

    set({ user: mergedUser });
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_voca_active_userId", mergedUser.id);
      localStorage.setItem(`xp_voca_user_${mergedUser.id}`, JSON.stringify(mergedUser));
      if (finalAvatar) {
        localStorage.setItem(`xp_voca_avatar_${mergedUser.id}`, finalAvatar);
      }
    }
    useVocabularyStore.getState().loadLearnedWords(mergedUser.id);
    get().syncStreak(false);
  },
  checkSession: async () => {
    try {
      const res = await fetch("/api/auth/me");
      const json = await res.json();
      if (json.success && json.data) {
        get().setUserPayload(json.data);
      } else {
        get().setLocalUser();
      }
    } catch (e) {
      get().setLocalUser();
    }
  },
  setLocalUser: () => {
    if (typeof window !== "undefined") {
      const activeUserId = localStorage.getItem("xp_voca_active_userId") || "local_user";
      const localData = localStorage.getItem(`xp_voca_user_${activeUserId}`);
      const cachedAvatar = localStorage.getItem(`xp_voca_avatar_${activeUserId}`);
      if (localData) {
        try {
          const localUser = JSON.parse(localData);
          const finalAvatar = localUser.imageUrl || localUser.avatar || localUser.avatarUrl || cachedAvatar || "";
          const fullUser: User = {
            ...localUser,
            imageUrl: finalAvatar,
            avatar: finalAvatar,
            avatarUrl: finalAvatar,
          };
          set({ user: fullUser });
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

    if (user.id === "local_user" || user.id.startsWith("local_user")) {
      const updatedUser: User = {
        ...user,
        coins: (user.coins || 0) - 50,
        streakFreezes: (user.streakFreezes || 0) + 1,
      };
      set({ user: updatedUser });
      if (typeof window !== "undefined") {
        localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
      }
      return true;
    }

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

    if (user.id === "local_user" || user.id.startsWith("local_user")) {
      const updatedUser: User = {
        ...user,
        coins: (user.coins || 0) - 100,
      };
      set({ user: updatedUser });
      if (typeof window !== "undefined") {
        localStorage.setItem(`xp_voca_user_${user.id}`, JSON.stringify(updatedUser));
      }
      return true;
    }

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
      document.cookie = "xp_voca_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      
      fetch("/api/auth/logout", { method: "POST" })
        .finally(() => {
          window.location.href = "/login";
        });
    }
  },
}));

export function recordSkillPractice(
  userId: string | undefined,
  skill: "Dictation" | "Shadowing" | "Nói" | "Từ vựng" | "Viết",
  mins: number,
  xp: number
) {
  if (typeof window === "undefined" || !userId) return;
  const todayStr = getLocalDateString(new Date());
  const dailyXpKey = `xp_voca_daily_xp_${userId}_${skill}`;
  const dailyMinKey = `xp_voca_daily_minutes_${userId}_${skill}`;

  try {
    const storedXp = localStorage.getItem(dailyXpKey);
    const storedMin = localStorage.getItem(dailyMinKey);
    const xpMap = storedXp ? JSON.parse(storedXp) : {};
    const minMap = storedMin ? JSON.parse(storedMin) : {};

    xpMap[todayStr] = (xpMap[todayStr] || 0) + xp;
    minMap[todayStr] = (minMap[todayStr] || 0) + mins;

    localStorage.setItem(dailyXpKey, JSON.stringify(xpMap));
    localStorage.setItem(dailyMinKey, JSON.stringify(minMap));
  } catch (e) {
    console.error("Error recording skill practice:", e);
  }
}
