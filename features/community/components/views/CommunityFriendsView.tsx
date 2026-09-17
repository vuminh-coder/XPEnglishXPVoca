"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  UserCheck,
  UserMinus,
  Search,
  Sparkles,
  Check,
  X,
  Share2,
} from "lucide-react";
import { Button } from "@/shared/components/ui";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { useNotificationStore } from "@/stores/notificationStore";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";

interface CommunityFriendsViewProps {
  user: any;
  awardXp?: (amt: number) => void;
}

export function CommunityFriendsView({ user, awardXp }: CommunityFriendsViewProps) {
  const { addToast } = useNotificationStore();
  const [friendName, setFriendName] = useState("");
  const [friends, setFriends] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<"friends" | "requests" | "suggestions">("friends");

  const loadData = async () => {
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
  };

  useEffect(() => {
    loadData();
  }, []);

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

  return (
    <div className="space-y-4">
      {/* 1. HERO SPOTLIGHT BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#0284c7] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-sky-200" /> Kết Nối Học Tập XP
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 shrink-0">
              Thưởng +10 XP / Lời mời kết bạn
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
              <span>Bạn Đồng Hành Học Tập</span>
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            </h1>
            <p className="text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
              Tìm kiếm và kết nối với những người bạn cùng mục tiêu thi TOEIC, IELTS để cùng nhau thi đấu và duy trì thói quen học mỗi ngày!
            </p>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID: FRIENDS 8/12 + SIDEBAR 4/12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* Left Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* SEARCH & ADD FRIEND CARD */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-display">
              <Search className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Tìm Kiếm Bạn Bè Theo Username:
            </label>

            <div className="flex items-center gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchAndAddFriend()}
                  placeholder="Nhập tên người dùng hoặc username..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb] font-medium"
                />
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSearchAndAddFriend}
                disabled={!friendName.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" /> Kết bạn
              </Button>
            </div>
          </div>

          {/* LEVEL 2 SUB-TABS: FRIENDS FILTER */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto no-scrollbar select-none">
            <button
              type="button"
              onClick={() => setActiveSubTab("friends")}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 font-display ${
                activeSubTab === "friends"
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
              }`}
            >
              {activeSubTab === "friends" && (
                <motion.span
                  layoutId="activeFriendsSubTabIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                <span>Danh sách bạn bè ({friends.length})</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab("requests")}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 font-display ${
                activeSubTab === "requests"
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
              }`}
            >
              {activeSubTab === "requests" && (
                <motion.span
                  layoutId="activeFriendsSubTabIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5 text-amber-500" />
                <span>Lời mời ({pendingRequests.length})</span>
                {pendingRequests.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab("suggestions")}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 font-display sm:hidden ${
                activeSubTab === "suggestions"
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
              }`}
            >
              {activeSubTab === "suggestions" && (
                <motion.span
                  layoutId="activeFriendsSubTabIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Gợi ý ({suggestions.length})</span>
              </span>
            </button>
          </div>

          {/* TAB 1: FRIENDS LIST */}
          {activeSubTab === "friends" && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 font-display">
                  <Users className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Bạn Bè Đang Hoạt Động ({friends.length}):
                </h3>
              </div>

              {loading ? (
                /* EXACT SKELETON (ZERO CLS) */
                <div className="space-y-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <ShimmerCircle size="w-10 h-10" />
                        <div className="space-y-1.5">
                          <ShimmerBox className="w-36 h-4 rounded-md" />
                          <ShimmerBox className="w-24 h-3 rounded-md" />
                        </div>
                      </div>
                      <ShimmerBox className="w-20 h-7 rounded-lg" />
                    </div>
                  ))}
                </div>
              ) : friends.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
                    Chưa có bạn bè nào trong danh sách
                  </div>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto font-medium leading-relaxed">
                    Hãy kết bạn từ danh sách gợi ý bên phải để nhận thưởng +10 XP và cùng nhau thi đấu từ vựng nhé!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {friends.map((f: any) => {
                    const cleanFriendName = formatCleanName(f.fullName || f.username);
                    return (
                      <div
                        key={f.id}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <UserAvatar
                            avatar={f.avatar}
                            avatarUrl={f.avatarUrl}
                            imageUrl={f.imageUrl}
                            emoji={f.avatarEmoji}
                            name={cleanFriendName}
                            size="w-9 h-9 sm:w-10 sm:h-10"
                          />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                              {cleanFriendName}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                              Cấp {f.level || 1} · {f.title || "Học viên năng nổ"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-900/40 font-mono">
                            {f.xp || 0} XP
                          </span>
                          <button
                            onClick={() => handleRemoveFriend(f.id)}
                            title="Hủy kết bạn"
                            className="p-2 rounded-lg bg-slate-200/60 dark:bg-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 text-slate-500 dark:text-slate-400 text-xs transition-all cursor-pointer"
                          >
                            <UserMinus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PENDING REQUESTS */}
          {activeSubTab === "requests" && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-2 font-display">
                  <UserPlus className="w-4 h-4" /> Lời Mời Kết Bạn Đang Chờ ({pendingRequests.length}):
                </h3>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <UserCheck className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
                    Không có lời mời kết bạn nào
                  </div>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Bạn đã xử lý hết tất cả các yêu cầu kết nối!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {pendingRequests.map((req: any) => {
                    const cleanSenderName = formatCleanName(req.sender?.fullName || req.sender?.username);
                    return (
                      <div
                        key={req.id}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <UserAvatar
                            avatar={req.sender?.avatar}
                            avatarUrl={req.sender?.avatarUrl}
                            imageUrl={req.sender?.imageUrl}
                            emoji={req.sender?.avatarEmoji}
                            name={cleanSenderName}
                            size="w-9 h-9 sm:w-10 sm:h-10"
                          />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                              {cleanSenderName}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                              Muốn kết nối đồng hành học tập
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleProcessRequest(req.id, "ACCEPT")}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" /> Đồng ý
                          </button>
                          <button
                            onClick={() => handleProcessRequest(req.id, "DECLINE")}
                            className="px-3 py-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-600 dark:text-slate-400 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" /> Từ chối
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SUGGESTIONS (MOBILE) */}
          {activeSubTab === "suggestions" && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5 sm:hidden">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 font-display">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Gợi Ý Bạn Học ({suggestions.length}):
                </h3>
              </div>

              <div className="space-y-2">
                {suggestions.map((s: any) => {
                  const cleanSuggName = formatCleanName(s.fullName || s.username);
                  return (
                    <div
                      key={s.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <UserAvatar
                          avatar={s.avatar}
                          avatarUrl={s.avatarUrl}
                          imageUrl={s.imageUrl}
                          emoji={s.avatarEmoji}
                          name={cleanSuggName}
                          size="w-8 h-8"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate font-display">
                            {cleanSuggName}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            Cấp {s.level || 1} · {s.title || "Học viên"}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddFriend(s.id, cleanSuggName)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#0059bb] hover:bg-[#004ba0] text-white text-[11px] font-bold transition-all shadow-2xs shrink-0 cursor-pointer flex items-center gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" /> Kết bạn
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right Column (lg:col-span-4): Suggestions & Referral */}
        <div className="lg:col-span-4 space-y-4 sticky top-4">
          
          {/* Widget 1: Suggestions Desktop */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider font-display">
                  Gợi Ý Bạn Học
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                +10 XP / Lời mời
              </span>
            </div>

            <div className="space-y-2.5">
              {loading ? (
                /* SUGGESTIONS SHIMMER SKELETON (ZERO CLS) */
                <div className="space-y-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ShimmerCircle size="w-8 h-8" />
                        <div className="space-y-1">
                          <ShimmerBox className="w-24 h-3.5 rounded" />
                          <ShimmerBox className="w-16 h-2.5 rounded" />
                        </div>
                      </div>
                      <ShimmerBox className="w-16 h-7 rounded-lg shrink-0" />
                    </div>
                  ))}
                </div>
              ) : suggestions.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-3 font-medium">
                  Không có gợi ý bạn học mới lúc này.
                </p>
              ) : (
                suggestions.slice(0, 5).map((s: any) => {
                  const cleanSuggName = formatCleanName(s.fullName || s.username);
                  return (
                    <div
                      key={s.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <UserAvatar
                          avatar={s.avatar}
                          avatarUrl={s.avatarUrl}
                          imageUrl={s.imageUrl}
                          emoji={s.avatarEmoji}
                          name={cleanSuggName}
                          size="w-8 h-8"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate font-display">
                            {cleanSuggName}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            Cấp {s.level || 1} · {s.title || "Học viên"}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddFriend(s.id, cleanSuggName)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#0059bb] hover:bg-[#004ba0] text-white text-[11px] font-bold transition-all shadow-2xs shrink-0 cursor-pointer flex items-center gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" /> Kết bạn
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Widget 2: Study Buddy Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-display">
                Học Cùng Bạn Bè Nhận Thưởng
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Mời bạn bè cùng luyện tập để mở khóa phòng thi đấu PvP và nhận chuỗi phần thưởng Streak đôi!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
