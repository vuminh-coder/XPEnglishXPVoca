"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useNotificationStore } from "@/stores/notificationStore";
import { StudyGroup } from "../types";

export function useGroupsData(user: any, awardXp?: (amt: number) => void) {
  const { addToast } = useNotificationStore();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadGroups = useCallback(() => {
    setLoading(true);
    fetch("/api/groups")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setGroups(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching groups:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const handleJoinGroup = async (id: string) => {
    let isNowJoined = false;
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          isNowJoined = !g.joined;
          const newCount = isNowJoined ? g.memberCount + 1 : Math.max(1, g.memberCount - 1);
          return { ...g, joined: isNowJoined, memberCount: newCount };
        }
        return g;
      })
    );

    addToast({
      type: "success",
      title: isNowJoined ? "Tham gia thành công!" : "Đã rời nhóm",
      message: isNowJoined
        ? "Đã tham gia nhóm học tập thành công!"
        : "Đã rời nhóm thành công.",
    });

    if (isNowJoined && awardXp) awardXp(15);

    try {
      const res = await fetch(`/api/groups/${id}/join`, { method: "POST" });
      const data = await res.json();
      if (data.success && data.data) {
        const { joined, memberCount } = data.data;
        setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, memberCount, joined } : g)));
      }
    } catch (err) {
      console.error("Error toggling group member:", err);
    }
  };

  const handleCreateGroup = async () => {
    if (!user) return;
    if ((user.level || 1) < 15) {
      addToast({
        type: "warning",
        title: "Chưa đủ cấp độ",
        message: "Khởi tạo câu lạc bộ mới yêu cầu cấp độ 15 trở lên!",
      });
      return;
    }

    const name = prompt("Nhập tên câu lạc bộ học tập mới:");
    if (!name || !name.trim()) return;

    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: "Nhóm học tập mới do cộng đồng khởi tạo" }),
      });
      const data = await res.json();
      if (data.success) {
        addToast({ type: "success", title: "Thành công", message: "Đã tạo câu lạc bộ mới thành công!" });
        loadGroups();
      } else {
        addToast({ type: "error", title: "Lỗi", message: data.error || "Không thể khởi tạo nhóm" });
      }
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  const filteredGroups = useMemo(() => {
    if (filter === "joined") return groups.filter((g) => g.joined);
    if (filter === "exam")
      return groups.filter(
        (g) =>
          g.name?.toLowerCase().includes("toeic") ||
          g.name?.toLowerCase().includes("ielts") ||
          g.tag?.toLowerCase().includes("toeic") ||
          g.tag?.toLowerCase().includes("ielts")
      );
    if (filter === "speaking")
      return groups.filter(
        (g) =>
          g.name?.toLowerCase().includes("giao tiếp") ||
          g.name?.toLowerCase().includes("ipa") ||
          g.name?.toLowerCase().includes("speaking")
      );
    return groups;
  }, [groups, filter]);

  const myJoinedGroups = useMemo(() => groups.filter((g) => g.joined), [groups]);

  return {
    groups,
    loading,
    filter,
    setFilter,
    handleJoinGroup,
    handleCreateGroup,
    filteredGroups,
    myJoinedGroups,
    refetch: loadGroups,
  };
}
