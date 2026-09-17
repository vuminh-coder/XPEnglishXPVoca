"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { LeaderboardUser } from "../types";

export function processLeaderboardWithUser(leaders: any[], user: any): LeaderboardUser[] {
  const userAvatar = user?.imageUrl || user?.avatar || user?.avatarUrl;
  const currentUserName = formatCleanName(user?.fullName || user?.username || user?.email);
  const currentUserXp = Number(user?.totalXp || user?.xp || 0);

  let list = [...(leaders || [])];
  let userFound = false;

  list = list.map((l) => {
    const leaderCleanName = formatCleanName(l.fullName || l.username);
    const isCurrentUser = Boolean(
      user &&
        (l.id === user.id ||
          (user.id && l.id && l.id.toString() === user.id.toString()) ||
          (l.fullName && user.fullName && l.fullName.trim().toLowerCase() === user.fullName.trim().toLowerCase()) ||
          (l.username && user.username && l.username.trim().toLowerCase() === user.username.trim().toLowerCase()) ||
          (leaderCleanName && currentUserName && leaderCleanName.toLowerCase() === currentUserName.toLowerCase()))
    );

    if (isCurrentUser) {
      userFound = true;
    }

    return {
      ...l,
      isCurrentUser,
      xp: isCurrentUser ? Math.max(Number(l.xp || 0), currentUserXp) : Number(l.xp || 0),
      avatar: isCurrentUser ? (userAvatar || l.avatar || l.avatarUrl || l.imageUrl) : (l.avatar || l.avatarUrl || l.imageUrl),
      avatarUrl: isCurrentUser ? (userAvatar || l.avatarUrl || l.avatar || l.imageUrl) : (l.avatarUrl || l.avatar || l.imageUrl),
      avatarEmoji: isCurrentUser ? (user?.avatarEmoji || l.avatarEmoji) : l.avatarEmoji,
      fullName: isCurrentUser ? formatCleanName(user?.fullName || user?.username || l.fullName) : l.fullName,
      streak: isCurrentUser ? Number(user?.currentStreak || user?.streak || l.streak || 1) : Number(l.streak || 1),
    };
  });

  if (user && !userFound && currentUserXp > 0) {
    list.push({
      id: user.id || "current-user",
      fullName: formatCleanName(user.fullName || user.username || "Bạn"),
      username: user.username || "user",
      avatar: userAvatar,
      avatarUrl: userAvatar,
      avatarEmoji: user.avatarEmoji || "🦉",
      xp: currentUserXp,
      isCurrentUser: true,
      streak: Number(user.currentStreak || user.streak || 1),
      level: Number(user.level || 1),
    });
  }

  list.sort((a, b) => Number(b.xp || 0) - Number(a.xp || 0));

  return list.map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));
}

export function useLeaderboardData(user: any) {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("week");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Periodic polling (10s interval) & window focus re-fetch
  const fetchLeaderboardData = useCallback(async () => {
    try {
      const res = await fetch(`/api/leaderboard?period=${period}&t=${Date.now()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setLeaders(data.data);
      }
    } catch (err) {
      console.error("Error fetching live leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    setLoading(true);
    fetchLeaderboardData();
    const interval = setInterval(fetchLeaderboardData, 10000);
    const onFocus = () => fetchLeaderboardData();
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchLeaderboardData]);

  // 2. Real-Time Dynamic Client-Side Leaderboard Processor
  const processedLeaders = useMemo<LeaderboardUser[]>(() => {
    return processLeaderboardWithUser(leaders, user);
  }, [leaders, user]);

  const top1 = processedLeaders[0];
  const top2 = processedLeaders[1];
  const top3 = processedLeaders[2];

  const currentUserItem = processedLeaders.find((l) => l.isCurrentUser);
  const userRankNum = currentUserItem?.rank || "-";

  const ranksFiltered = useMemo(() => {
    const listAfterTop3 = processedLeaders.slice(3);
    if (!searchQuery.trim()) return listAfterTop3;
    const q = searchQuery.trim().toLowerCase();
    return listAfterTop3.filter((item) => {
      const name = (item.fullName || item.username || "").toLowerCase();
      return name.includes(q);
    });
  }, [processedLeaders, searchQuery]);

  return {
    leaders: processedLeaders,
    loading,
    period,
    setPeriod,
    searchQuery,
    setSearchQuery,
    top1,
    top2,
    top3,
    currentUserItem,
    userRankNum,
    ranksFiltered,
    refetch: fetchLeaderboardData,
  };
}
