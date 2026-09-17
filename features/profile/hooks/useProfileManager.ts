"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, DEFAULT_LEARNER_USER } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { getXpProgress } from "@/shared/utils/calculateXP";
import { LEVEL_TITLES } from "@/shared/constants";
import { SkillMinutes, AchievementItem } from "../types";

export const AVAILABLE_EMOJIS = ["🦉", "🦁", "🦊", "👑", "🎓", "🚀", "⚡", "💎"] as const;

export function useProfileManager() {
  const { user: authUser, updateProfile, awardXp } = useAuthStore();
  const storeUser = useUserStore((s) => s.user);
  const user = authUser || storeUser || DEFAULT_LEARNER_USER;
  const { addToast } = useNotificationStore();

  const [fullName, setFullName] = useState(user.fullName || user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [selectedEmoji, setSelectedEmoji] = useState(user.avatarEmoji || "🦉");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unlocked" | "locked">("all");
  const [equippedHat, setEquippedHat] = useState(false);

  useEffect(() => {
    useUserStore.getState().checkSession();
  }, []);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || user.username || "");
      setBio(user.bio || "");
      setSelectedEmoji(user.avatarEmoji || "🦉");
    }
  }, [user]);

  // Skill-Specific Activity Minutes Computation from localStorage
  const skillMinutes = useMemo<SkillMinutes>(() => {
    if (!user || typeof window === "undefined") {
      return { dictation: 15, shadowing: 10, speaking: 12, vocab: 25, writing: 18 };
    }

    const readMinutes = (skill: string) => {
      try {
        const key = `xp_voca_daily_minutes_${user.id}_${skill}`;
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          const total = Object.values(parsed).reduce((a: any, b: any) => Number(a) + Number(b), 0);
          return Math.max(Number(total), 0);
        }
      } catch (e) {
        console.error(e);
      }
      return 0;
    };

    return {
      dictation: readMinutes("Dictation") || readMinutes("dictation") || 15,
      shadowing: readMinutes("Shadowing") || readMinutes("shadowing") || 10,
      speaking: readMinutes("Nói") || readMinutes("speaking") || 12,
      vocab: readMinutes("Từ vựng") || readMinutes("vocab") || 25,
      writing: readMinutes("Viết") || readMinutes("writing") || 18,
    };
  }, [user]);

  const { current: xpCurrent, total: xpTotal, percent: xpPercent } = getXpProgress(
    user.level || 1,
    user.totalXp || 0
  );
  const userTitle = LEVEL_TITLES[user.level || 1] || user.title || "Word Explorer";
  const wordsCount = Number(user?.wordsLearned) || 0;
  const vocabPercent = Math.min(100, Math.round((wordsCount / 3903) * 100)) || 0;

  const handleSaveProfile = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateProfile(fullName, bio, user?.imageUrl || user?.avatarUrl, selectedEmoji);
    setIsEditing(false);
    addToast({
      type: "success",
      title: "Đã cập nhật hồ sơ! 🎉",
      message: "Thông tin cá nhân của bạn đã được lưu thành công.",
      duration: 3000,
    });
  }, [bio, fullName, selectedEmoji, updateProfile, user?.avatarUrl, user?.imageUrl, addToast]);

  const shareProfile = useCallback(() => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(
        `Ghé thăm hồ sơ cá nhân của ${user.fullName || user.username} trên XP English! Cấp độ: ${user.level} (${userTitle})`
      );
      addToast({
        type: "success",
        title: "Đã sao chép liên kết! 🔗",
        message: "Liên kết hồ sơ cá nhân đã được sao chép vào bộ nhớ tạm.",
      });
    }
  }, [addToast, user.fullName, user.level, user.username, userTitle]);

  const toggleEquippedHat = useCallback(() => {
    const nextState = !equippedHat;
    setEquippedHat(nextState);
    addToast({
      type: "info",
      title: nextState ? "Trang bị nón cử nhân!" : "Tháo trang phục",
      message: nextState
        ? "Avatar của bạn hiện có thêm nón cử nhân cực ngầu"
        : "Đã tháo nón cử nhân trên avatar",
    });
  }, [addToast, equippedHat]);

  const achievements = useMemo<AchievementItem[]>(() => [
    {
      id: "a1",
      name: "Bước Đầu Vinh Quang",
      description: "Học 10 từ vựng đầu tiên",
      icon: "🎓",
      xpBonus: 50,
      unlocked: true,
      rarity: "Phổ biến",
    },
    {
      id: "a2",
      name: "Ngọn Lửa Bất Diệt",
      description: "Duy trì streak 5 ngày liên tục",
      icon: "🔥",
      xpBonus: 100,
      unlocked: true,
      rarity: "Hiếm",
    },
    {
      id: "a3",
      name: "Chiến Binh Tuần",
      description: "Học 7 ngày liên tiếp không ngắt quãng",
      icon: "⚔️",
      xpBonus: 150,
      unlocked: true,
      rarity: "Hiếm",
    },
    {
      id: "a4",
      name: "Bách Từ Uy Phong",
      description: "Học đạt mốc 100 từ vựng",
      icon: "💯",
      xpBonus: 200,
      unlocked: wordsCount >= 100,
      progress: `${Math.min(100, wordsCount)}/100`,
      rarity: "Huyền thoại",
    },
    {
      id: "a5",
      name: "Kết Nối Bạn Bè",
      description: "Giao lưu và kết bạn với 5 học viên",
      icon: "🦋",
      xpBonus: 75,
      unlocked: false,
      progress: "1/5",
      rarity: "Phổ biến",
    },
    {
      id: "a6",
      name: "Bậc Thầy Quiz",
      description: "Hoàn thành 50 bài trắc nghiệm",
      icon: "🧠",
      xpBonus: 150,
      unlocked: false,
      progress: "12/50",
      rarity: "Huyền thoại",
    },
  ], [wordsCount]);

  const unlockedCount = useMemo(() => achievements.filter((a) => a.unlocked).length, [achievements]);

  const filteredAchievements = useMemo(() => {
    return achievements.filter((ach) => {
      if (activeTab === "unlocked") return ach.unlocked;
      if (activeTab === "locked") return !ach.unlocked;
      return true;
    });
  }, [achievements, activeTab]);

  return {
    user,
    fullName,
    setFullName,
    bio,
    setBio,
    selectedEmoji,
    setSelectedEmoji,
    isEditing,
    setIsEditing,
    activeTab,
    setActiveTab,
    equippedHat,
    toggleEquippedHat,
    skillMinutes,
    xpCurrent,
    xpTotal,
    xpPercent,
    userTitle,
    wordsCount,
    vocabPercent,
    handleSaveProfile,
    shareProfile,
    achievements,
    unlockedCount,
    filteredAchievements,
    availableEmojis: AVAILABLE_EMOJIS,
  };
}
