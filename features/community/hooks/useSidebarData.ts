"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuthStore } from "@/stores/authStore";
import { LeaderboardUser, StudyGroup } from "../types";
import { processLeaderboardWithUser } from "./useLeaderboardData";

export function useSidebarData(userParam?: any) {
  const storeUser = useAuthStore((s) => s.user);
  const user = userParam !== undefined ? userParam : storeUser;

  const [rawLeaders, setRawLeaders] = useState<any[]>([]);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSidebarData = useCallback(async () => {
    try {
      const [resLeaderboard, resGroups] = await Promise.allSettled([
        fetch(`/api/leaderboard?period=week&t=${Date.now()}`),
        fetch(`/api/groups?t=${Date.now()}`),
      ]);

      if (resLeaderboard.status === "fulfilled") {
        const lbData = await resLeaderboard.value.json();
        if (lbData.success && Array.isArray(lbData.data)) {
          setRawLeaders(lbData.data);
        }
      }

      if (resGroups.status === "fulfilled") {
        const grData = await resGroups.value.json();
        if (grData.success && Array.isArray(grData.data)) {
          const list = grData.data.slice(0, 3).map((g: any) => ({
            id: g.id,
            name: g.name,
            description: g.description,
            memberCount: Number(g.memberCount || 0),
            tag: g.tag || g.themeName || "Cộng đồng",
            joined: Boolean(g.joined),
          }));
          setStudyGroups(list);
        }
      }
    } catch (err) {
      console.error("Error fetching community sidebar data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchSidebarData();

    // Sync with leaderboard tab in background & on window focus (zero layout flicker)
    const interval = setInterval(fetchSidebarData, 10000);
    const onFocus = () => fetchSidebarData();
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchSidebarData]);

  // Dynamic ranking reconciliation matching useLeaderboardData 100%
  const topLearners = useMemo<LeaderboardUser[]>(() => {
    const processed = processLeaderboardWithUser(rawLeaders, user);
    return processed.slice(0, 3);
  }, [rawLeaders, user]);

  return {
    topLearners,
    studyGroups,
    loading,
    refetch: fetchSidebarData,
  };
}

