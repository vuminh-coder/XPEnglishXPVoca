'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Target, 
  Laptop, 
  Briefcase, 
  MessageCircle, 
  Plus, 
  Users, 
  Globe, 
  ArrowRight,
  Trophy,
  UserPlus,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Award
} from 'lucide-react';
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { Button } from '@/components/ui';

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
    // OPTIMISTIC UPDATE (0ms INSTANT TOGGLE)
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
    <div className="space-y-6 pb-16 md:pb-6 select-none font-sans" suppressHydrationWarning>
      
      {/* 1. HERO GROUPS BANNER */}
      <div className="p-5 sm:p-6 rounded-lg bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#312e81] text-white shadow-xs relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-indigo-300" /> Nhóm Học Tập Chuyên Sâu
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
              Yêu cầu Cấp 15+ để Tạo Nhóm
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white flex items-center gap-2">
              Câu Lạc Bộ & Nhóm Học Thuật
              <Sparkles className="w-5 h-5 text-amber-300" />
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl font-medium leading-relaxed">
              Tham gia các nhóm theo mục tiêu thi TOEIC, IELTS hoặc từ vựng chuyên ngành để cùng nhau thảo luận bài tập và thi đấu Flashcard!
            </p>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID LAYOUT (3/4 GROUPS STREAM + 1/4 MY GROUPS SIDEBAR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT 3/4 COLUMN: GROUPS LIST */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-5">
          
          {/* SEGMENTED NAVIGATION TABS */}
          <div className="p-1 rounded-md sm:rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 grid grid-cols-4 gap-1 w-full">
            <Link
              href="/community"
              className="py-1.5 px-3 rounded-sm sm:rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Bảng tin
            </Link>
            <Link
              href="/community/leaderboard"
              className="py-1.5 px-3 rounded-sm sm:rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" /> Xếp hạng
            </Link>
            <Link
              href="/community/friends"
              className="py-1.5 px-3 rounded-sm sm:rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-500 shrink-0" /> Bạn bè
            </Link>
            <div className="py-1.5 px-3 rounded-sm sm:rounded-md bg-[#0059bb] text-white text-[10px] sm:text-xs font-bold shadow-2xs flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-200 shrink-0" /> Nhóm
            </div>
          </div>

          {/* CREATE GROUP ACTION BAR */}
          <div className="p-4 sm:p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                Bạn muốn tạo Nhóm học tập riêng?
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Dành riêng cho học viên từ <span className="font-bold text-[#0059bb] dark:text-sky-400">Cấp độ 15 trở lên</span>.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateGroup}
              className="px-4 py-2 rounded-md bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Khởi tạo nhóm mới
            </Button>
          </div>

          {/* GROUPS STREAM GRID */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Danh Sách Nhóm Học Tập Cộng Đồng:
            </h3>

            {loading ? (
              /* SKELETON LOADING (RULE 1 COMPLIANCE) */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-800" />
                      <div className="space-y-1.5 flex-1">
                        <div className="w-32 h-4 bg-slate-200 dark:bg-slate-800 rounded-md" />
                        <div className="w-20 h-3 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                      </div>
                    </div>
                    <div className="w-full h-10 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                    <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  </div>
                ))}
              </div>
            ) : groups.length === 0 ? (
              <div className="p-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-center space-y-2">
                <div className="text-2xl">👥</div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Chưa có nhóm học tập nào
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {groups.map((g) => (
                  <div
                    key={g.id}
                    className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-3.5 hover:border-[#0059bb]/40 transition-all"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-md bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-[#0059bb]/20">
                            {GROUP_ICONS[g.id] || <Users className="w-5 h-5 text-[#0059bb]" />}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                              {g.name}
                            </h4>
                            <span className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400">
                              {g.themeName || 'Chung'}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 shrink-0">
                          {g.memberCount || 1} TV
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed line-clamp-2">
                        {g.description || 'Cùng luyện từ vựng và bài tập giao tiếp tiếng Anh.'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleJoinGroup(g.id)}
                      className={`w-full py-2 px-3 rounded-md text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1.5 ${
                        g.joined
                          ? 'bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-emerald-600 dark:text-emerald-400 border border-slate-200/80 dark:border-white/10'
                          : 'bg-[#0059bb] hover:bg-[#004799] text-white'
                      }`}
                    >
                      {g.joined ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" /> Đã tham gia (Click để rời)
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Tham gia nhóm
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT 1/4 COLUMN: MY GROUPS SIDEBAR WIDGET */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4 sticky top-4">
          
          {/* BENTO WIDGET 1: MY JOINED GROUPS */}
          <div className="p-4 sm:p-4.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 text-base">
                  👥
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Nhóm Của Tôi ({myJoinedGroups.length})
                </h3>
              </div>
            </div>

            {myJoinedGroups.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-500 font-medium">
                Bạn chưa tham gia nhóm nào. Hãy bấm "Tham gia nhóm" bên cạnh!
              </div>
            ) : (
              <div className="space-y-2">
                {myJoinedGroups.map((mg) => (
                  <div
                    key={mg.id}
                    className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white truncate">
                      {mg.name}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded shrink-0">
                      Đã tham gia
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BENTO WIDGET 2: CREATION REQUIREMENT */}
          <div className="p-4 sm:p-4.5 rounded-lg bg-[#ebf3fe]/80 dark:bg-slate-800/60 border border-[#0059bb]/20 shadow-xs space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
              <ShieldCheck className="w-4 h-4" /> Đạt Cấp 15 Để Tạo Nhóm Riêng
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Tích lũy XP qua các bài học từ vựng và bài thi thử trắc nghiệm AI để mở khóa quyền khởi tạo Nhóm học tập cộng đồng!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}