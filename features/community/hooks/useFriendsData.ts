"use client";

import { useState, useEffect, useCallback } from "react";
import { useNotificationStore } from "@/stores/notificationStore";
import { FriendUser, FriendRequest, FriendSuggestion } from "../types";

export function useFriendsData(user: any, awardXp?: (amt: number) => void) {
  const { addToast } = useNotificationStore();
  const [friendName, setFriendName] = useState("");
  const [friends, setFriends] = useState<FriendUser[]>([]);
  const [suggestions, setSuggestions] = useState<FriendSuggestion[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<"friends" | "requests" | "suggestions">("friends");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const resFriends = await fetch("/api/friends");
      const dataFriends = await resFriends.json();
      if (dataFriends.success) setFriends(dataFriends.data);

      const resReqs = await fetch("/api/friends/requests");
      const dataReqs = await resReqs.json();
      if (dataReqs.success) setPendingRequests(dataReqs.data.incoming || []);

      const resSuggs = await fetch("/api/friends/suggestions");
      const dataSuggs = await resSuggs.json();
      if (dataSuggs.success) setSuggestions(dataSuggs.data);

      setLoading(false);
    } catch (err) {
      console.error("Error loading friends view data:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddFriend = async (receiverId: string, name: string) => {
    if (awardXp) awardXp(10);
    addToast({
      type: "success",
      title: "Thành công",
      message: `Đã gửi lời mời đến ${name}. Nhận +10 XP 🎉`,
    });
    setSuggestions((prev) => prev.filter((s) => s.id !== receiverId));

    try {
      const res = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId }),
      });
      const data = await res.json();
      if (!data.success) {
        addToast({ type: "error", title: "Lỗi", message: data.error || "Không thể gửi lời mời" });
      } else {
        loadData();
      }
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

  const handleSearchAndAddFriend = async () => {
    if (!friendName.trim()) return;
    try {
      const res = await fetch(`/api/friends/search?q=${encodeURIComponent(friendName.trim())}`);
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        const firstMatch = data.data[0];
        handleAddFriend(firstMatch.id, firstMatch.fullName);
        setFriendName("");
      } else {
        addToast({
          type: "warning",
          title: "Không tìm thấy",
          message: `Không tìm thấy người dùng "${friendName.trim()}"`,
        });
      }
    } catch (err) {
      console.error("Error searching friend:", err);
    }
  };

  const handleProcessRequest = async (requestId: string, action: "ACCEPT" | "DECLINE") => {
    try {
      const res = await fetch("/api/friends/requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      const data = await res.json();
      if (data.success) {
        addToast({
          type: "success",
          title: action === "ACCEPT" ? "Đã chấp nhận" : "Đã từ chối",
          message:
            action === "ACCEPT"
              ? "Kết bạn thành công! Nhận +10 XP 🎉"
              : "Đã từ chối lời mời kết bạn.",
        });
        if (action === "ACCEPT" && awardXp) awardXp(10);
        loadData();
      }
    } catch (err) {
      console.error("Error processing request:", err);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    if (!confirm("Bạn có chắc chắn muốn hủy kết bạn?")) return;
    try {
      const res = await fetch(`/api/friends?friendId=${friendId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        addToast({ type: "success", title: "Đã hủy kết bạn", message: "Hủy kết bạn thành công." });
        loadData();
      } else {
        addToast({ type: "error", title: "Lỗi", message: data.error || "Không thể hủy kết bạn" });
      }
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  return {
    friendName,
    setFriendName,
    friends,
    suggestions,
    pendingRequests,
    loading,
    activeSubTab,
    setActiveSubTab,
    handleAddFriend,
    handleSearchAndAddFriend,
    handleProcessRequest,
    handleRemoveFriend,
    refetch: loadData,
  };
}
