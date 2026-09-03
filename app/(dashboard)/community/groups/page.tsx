'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PageEntranceWrapper } from '@/shared/components/feedback/PageEntranceAnimation';
import { 
  Target, 
  Laptop, 
  Briefcase, 
  MessageCircle, 
  Plus, 
  Users, 
  ArrowRight,
  Trophy,
  UserPlus,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { Button } from '@/shared/components/ui';
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from '@/shared/components/layout/AppTopHeader';

const GROUP_ICONS: Record<string, React.ReactNode> = {
  'g1': <Target className="w-5 h-5 text-[#0059bb]" />,
  'g2': <Laptop className="w-5 h-5 text-indigo-500" />,
  'g3': <Briefcase className="w-5 h-5 text-amber-500" />,
  'g4': <MessageCircle className="w-5 h-5 text-emerald-500" />,
};

export default function GroupsPage() {
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load groups on mount
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

  React.useEffect(() => {
    loadGroups();
  }, []);

  const handleJoinGroup = async (id: string) => {
    let isNowJoined = false;
    setGroups(prev => prev.map(g => {
      if (g.id === id) {
        isNowJoined = !g.joined;
        const newCount = isNowJoined ? g.memberCount + 1 : Math.max(1, g.memberCount - 1);
        return { ...g, joined: isNowJoined, memberCount: newCount };
      }
      return g;
    }));

    addToast({
      type: "success",
      title: isNowJoined ? "Tham gia thành công!" : "Đã rời nhóm",
      message: isNowJoined ? "Đã tham gia nhóm học tập thành công!" : "Đã rời nhóm thành công."
    });

    try {
      const res = await fetch(`/api/groups/${id}/join`, { method: "POST" });
      const data = await res.json();
      if (data.success && data.data) {
        const { joined, memberCount } = data.data;
        setGroups(prev => prev.map(g => g.id === id ? { ...g, memberCount, joined } : g));
      }
    } catch (err) {
      console.error("Error toggling group member:", err);
    }
  };

  const handleCreateGroup = async () => {
    if (!user) return;
    if (user.level < 15) {
      addToast({ type: "warning", title: "Chưa đủ cấp độ", message: "Khởi tạo nhóm mới yêu cầu cấp độ 15 trở lên!" });
      return;
    }

    const name = prompt("Nhập tên nhóm học tập mới:");
    if (!name || !name.trim()) return;

    const description = prompt("Nhập mô tả nhóm học tập:");
    const themeName = prompt("Nhập tên chủ đề (ví dụ: Technology, IELTS, Business):");

    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description || "",
          themeName: themeName || "General",
          accent: "blue",
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        addToast({ type: "success", title: "Tạo nhóm thành công!", message: `Đã khởi tạo nhóm ${name}` });
        loadGroups();
      } else {
        addToast({ type: "error", title: "Lỗi", message: data.error || "Không thể khởi tạo nhóm" });
      }
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  const myJoinedGroups = groups.filter(g => g.joined);

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      
      {/* 1. APP TOP HEADER INTEGRATION */}
      <AppTopHeader
        rightDesktopContent={
          <button
            onClick={handleCreateGroup}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tạo Nhóm Mới (Lv.15+)</span>
          </button>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            href="/community"
            active={false}
            icon={<MessageSquare className="w-3.5 h-3.5 text-blue-500" />}
            label="Bảng Tin"
          />
          <HeaderPillItem
            href="/community/leaderboard"
            active={false}
            icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
            label="Xếp Hạng"
          />
          <HeaderPillItem
            href="/community/friends"
            active={false}
            icon={<UserPlus className="w-3.5 h-3.5 text-sky-500" />}
            label="Bạn Bè"
          />
          <HeaderPillItem
            active={true}
            icon={<Users className="w-3.5 h-3.5 text-indigo-500" />}
            label="Nhóm Học"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* HERO GROUPS BANNER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#312e81] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
              <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-indigo-300" /> Nhóm Học Tập
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 shrink-0">
                Cấp 15+ Để Tạo Nhóm
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
                <span>Câu Lạc Bộ & Nhóm Học Thuật</span>
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              </h1>
              <p className="text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
                Tham gia các nhóm theo mục tiêu thi TOEIC, IELTS hoặc từ vựng chuyên ngành để cùng nhau thảo luận bài tập và thi đấu Flashcard!
              </p>
            </div>
          </div>
        </div>

        {/* 3. BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT COLUMN: GROUPS DIRECTORY (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 font-display">
                  <Users className="w-4 h-4 text-indigo-500" /> Danh Sách Câu Lạc Bộ ({groups.length}):
                </h3>

                <button
                  onClick={handleCreateGroup}
                  className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 font-display"
                >
                  <Plus className="w-3.5 h-3.5" /> Tạo nhóm mới
                </button>
              </div>

              {loading ? (
                /* 2x2 SKELETON LOADING CARDS (ZERO CLS) */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between space-y-3.5"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                          <div className="h-5 w-24 rounded-lg bg-indigo-500/20" />
                        </div>
                        <div className="h-4 w-36 rounded-md bg-slate-200 dark:bg-slate-700" />
                        <div className="h-3 w-full rounded-md bg-slate-100 dark:bg-slate-800" />
                        <div className="h-3 w-4/5 rounded-md bg-slate-100 dark:bg-slate-800" />
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                        <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-800" />
                        <div className="h-7 w-24 rounded-xl bg-blue-500/30" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : groups.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <div className="text-2xl">🏛️</div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
                    Chưa có nhóm học tập nào
                  </div>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
                    Hãy là người đầu tiên khởi tạo nhóm học tập khi đạt Cấp 15 nhé!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {groups.map((g) => {
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
                          <span className="text-[11px] font-bold text-slate-400 font-display">
                            Chủ đề: <span className="text-slate-600 dark:text-slate-300">{g.themeName || "General"}</span>
                          </span>

                          <button
                            onClick={() => handleJoinGroup(g.id)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1 ${
                              g.joined
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40"
                                : "bg-[#0059bb] hover:bg-[#004ba0] text-white"
                            }`}
                          >
                            {g.joined ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
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

          {/* RIGHT COLUMN: MY JOINED GROUPS & RULES (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 sticky top-4">
            
            {/* BENTO WIDGET 1: MY JOINED GROUPS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="w-4 h-4 text-indigo-500" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Nhóm Của Bạn ({myJoinedGroups.length})
                  </h3>
                </div>
              </div>

              {loading ? (
                /* JOINED GROUPS SHIMMER SKELETON (ZERO CLS) */
                <div className="space-y-2 animate-pulse">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div className="w-32 h-3.5 rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="w-12 h-4 rounded bg-indigo-500/20" />
                    </div>
                  ))}
                </div>
              ) : myJoinedGroups.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4 font-medium leading-relaxed">
                  Bạn chưa tham gia nhóm nào. Hãy bấm "Tham gia" ở danh sách bên cạnh nhé!
                </p>
              ) : (
                <div className="space-y-2">
                  {myJoinedGroups.map((g) => (
                    <div
                      key={g.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-900 dark:text-white font-display truncate">
                        {g.name}
                      </span>
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md font-bold shrink-0">
                        {g.memberCount} TV
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BENTO WIDGET 2: LEVEL 15 REQUIREMENT BADGE */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 font-display">
                <Lock className="w-4 h-4" /> Điều Kiện Tạo Nhóm Mới
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Học viên cần đạt tối thiểu <span className="font-bold text-amber-600">Cấp 15</span> để khởi tạo Câu lạc bộ học thuật mới nhằm đảm bảo chất lượng sinh hoạt cộng đồng.
              </p>
            </div>

            {/* BENTO WIDGET 3: GROUP BENEFITS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/60 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
                <ShieldCheck className="w-4 h-4" /> Quyền Lợi Thành Viên
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Tham gia nhóm học tập giúp bạn nhận thông báo thi đấu nhóm hàng tuần và chia sẻ tài liệu ôn tập độc quyền từ quản trị viên!
              </p>
            </div>

          </div>
        </div>
      </div>
    </PageEntranceWrapper>
  );
}