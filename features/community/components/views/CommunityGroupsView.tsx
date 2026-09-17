"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Target,
  Laptop,
  Briefcase,
  MessageCircle,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { useNotificationStore } from "@/stores/notificationStore";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";

interface CommunityGroupsViewProps {
  user: any;
  awardXp?: (amt: number) => void;
}

const GROUP_ICONS: Record<string, React.ReactNode> = {
  g1: <Target className="w-5 h-5 text-[#0059bb]" />,
  g2: <Laptop className="w-5 h-5 text-indigo-500" />,
  g3: <Briefcase className="w-5 h-5 text-amber-500" />,
  g4: <MessageCircle className="w-5 h-5 text-emerald-500" />,
};

const GROUP_FILTERS = [
  { id: "all", label: "Tất cả nhóm" },
  { id: "joined", label: "Đã tham gia" },
  { id: "exam", label: "TOEIC & IELTS" },
  { id: "speaking", label: "Giao tiếp IPA" },
];

export function CommunityGroupsView({ user, awardXp }: CommunityGroupsViewProps) {
  const { addToast } = useNotificationStore();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadGroups = () => {
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
  };

  useEffect(() => {
    loadGroups();
  }, []);

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

  const myJoinedGroups = groups.filter((g) => g.joined);

  return (
    <div className="space-y-4">
      {/* 1. HERO SPOTLIGHT BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#312e81] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-indigo-300" /> Nhóm Học Tập XP
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 shrink-0">
              Cấp 15+ Để Tạo Nhóm Mới
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
              <span>Câu Lạc Bộ & Nhóm Học Thuật</span>
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            </h1>
            <p className="text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
              Tham gia các nhóm theo mục tiêu thi TOEIC, IELTS hoặc từ vựng chuyên ngành để cùng nhau thảo luận bài tập và nhận thưởng XP!
            </p>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID: GROUPS 8/12 + SIDEBAR 4/12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* Left Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            
            {/* Header with Sub-tabs & Create Group Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              {/* LEVEL 2 SUB-TABS: GROUP FILTERS */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto no-scrollbar select-none">
                {GROUP_FILTERS.map((f) => {
                  const isActive = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilter(f.id)}
                      className={`relative px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 font-display ${
                        isActive
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeGroupsFilterIndicator"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                        />
                      )}
                      <span className="relative z-10">{f.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleCreateGroup}
                className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 font-display self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Tạo nhóm mới
              </button>
            </div>

            {/* 2x2 GRID OF GROUPS OR SHIMMER SKELETON */}
            {loading ? (
              /* EXACT 2x2 SHIMMER SKELETON (ZERO CLS) */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3.5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <ShimmerCircle size="w-10 h-10 rounded-xl" />
                        <ShimmerBox className="w-24 h-5 rounded-lg" />
                      </div>
                      <ShimmerBox className="w-36 h-4 rounded-md" />
                      <ShimmerBox className="w-full h-3 rounded-md" />
                      <ShimmerBox className="w-4/5 h-3 rounded-md" />
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                      <ShimmerBox className="w-20 h-3 rounded" />
                      <ShimmerBox className="w-24 h-7 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredGroups.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
                  {filter === "joined" ? "Bạn chưa tham gia nhóm học nào" : "Chưa có nhóm nào trong mục này"}
                </div>
                <p className="text-xs text-slate-400 max-w-xs mx-auto font-medium">
                  Hãy khám phá và tham gia các câu lạc bộ để học tập cùng đồng đội nhé!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredGroups.map((g) => {
                  const icon = GROUP_ICONS[g.id] || <Users className="w-5 h-5 text-indigo-500" />;
                  return (
                    <div
                      key={g.id}
                      className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between space-y-3.5 transition-all shadow-2xs"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shadow-2xs">
                            {icon}
                          </div>
                          <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] border border-indigo-200/60 dark:border-indigo-900/40 font-mono">
                            {g.memberCount} Thành viên
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                            {g.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1 line-clamp-2">
                            {g.description || "Nhóm học tập chuyên sâu cùng XP English."}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                          {g.tag || "Cộng đồng"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleJoinGroup(g.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 ${
                            g.joined
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300/60 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                              : "bg-[#0059bb] hover:bg-[#004ba0] text-white"
                          }`}
                        >
                          {g.joined ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Đã tham gia</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Tham gia</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (lg:col-span-4): My Groups & Requirements */}
        <div className="lg:col-span-4 space-y-4 sticky top-4">
          
          {/* Widget 1: My Joined Groups */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider font-display">
                Nhóm Đã Tham Gia ({myJoinedGroups.length})
              </h3>
            </div>

            {myJoinedGroups.length === 0 ? (
              <p className="text-xs text-slate-400 py-2 font-medium text-center">
                Bạn chưa tham gia nhóm nào. Hãy bấm "Tham gia" ở danh sách bên trái!
              </p>
            ) : (
              <div className="space-y-2">
                {myJoinedGroups.map((g) => (
                  <div
                    key={g.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate font-display">
                      {g.name}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md font-mono shrink-0">
                      {g.memberCount} tv
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Widget 2: Creator Requirement */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/40 dark:border-amber-700/40 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-display">
                Đặc Quyền Trưởng Nhóm
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Đạt cấp độ 15 để mở khóa quyền tạo Câu lạc bộ học thuật riêng, ghim bài viết hướng dẫn và cấp chứng chỉ hoàn thành học phần cho thành viên nhóm!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
