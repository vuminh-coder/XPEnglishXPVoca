'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PageEntranceWrapper } from '@/shared/components/feedback/PageEntranceAnimation';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  UserMinus, 
  Search, 
  Trophy, 
  Sparkles, 
  Check, 
  X, 
  UserCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { UserAvatar, formatCleanName } from '@/shared/components/feedback/UserAvatar';
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from '@/shared/components/layout/AppTopHeader';

export default function FriendsPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [friendName, setFriendName] = useState('');
  const [friends, setFriends] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
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
      console.error("Error loading friends page data:", err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleAddFriend = async (receiverId: string, name: string) => {
    awardXp(10);
    addToast({ type: "success", title: "Thành công", message: `Đã gửi lời mời đến ${name}. Nhận +10 XP 🎉` });
    setSuggestions(prev => prev.filter(s => s.id !== receiverId));

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
        setFriendName('');
      } else {
        addToast({ type: "warning", title: "Không tìm thấy", message: `Không tìm thấy người dùng "${friendName.trim()}"` });
      }
    } catch (err) {
      console.error("Error searching friend:", err);
    }
  };

  const handleProcessRequest = async (requestId: string, action: 'ACCEPT' | 'DECLINE') => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    addToast({ type: "success", title: action === "ACCEPT" ? "Đã chấp nhận!" : "Đã từ chối", message: action === "ACCEPT" ? "Đã chấp nhận lời mời kết bạn!" : "Đã từ chối lời mời." });

    try {
      const res = await fetch("/api/friends/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      const data = await res.json();
      if (data.success) {
        loadData();
      }
    } catch (err) {
      console.error("Error processing friend request:", err);
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
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      
      {/* 1. APP TOP HEADER INTEGRATION */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/40 text-[#0059bb] dark:text-sky-400 font-bold text-xs shrink-0 font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>{friends.length} Bạn bè</span>
          </div>
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
            active={true}
            icon={<UserPlus className="w-3.5 h-3.5 text-sky-500" />}
            label="Bạn Bè"
          />
          <HeaderPillItem
            href="/community/groups"
            active={false}
            icon={<Users className="w-3.5 h-3.5 text-indigo-500" />}
            label="Nhóm Học"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* HERO FRIENDS BANNER */}
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

        {/* 3. BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT COLUMN: SEARCH, PENDING REQUESTS & FRIENDS LIST (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* SEARCH & ADD FRIEND CARD */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-display">
                <Search className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Tìm Kiếm Bạn Bè Theo Username:
              </h3>

              <div className="flex items-center gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchAndAddFriend()}
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

            {/* PENDING FRIEND REQUESTS SECTION */}
            {pendingRequests.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/60 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-2 font-display">
                  <UserPlus className="w-4 h-4" /> Lời Mời Kết Bạn Đang Chờ ({pendingRequests.length}):
                </h3>

                <div className="space-y-2.5">
                  {pendingRequests.map((req: any) => {
                    const cleanSenderName = formatCleanName(req.sender?.fullName || req.sender?.username);
                    return (
                      <div
                        key={req.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <UserAvatar avatar={req.sender?.avatar} avatarUrl={req.sender?.avatarUrl} imageUrl={req.sender?.imageUrl} emoji={req.sender?.avatarEmoji} name={cleanSenderName} size="w-9 h-9 sm:w-10 sm:h-10" />
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
                            onClick={() => handleProcessRequest(req.id, 'ACCEPT')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" /> Đồng ý
                          </button>
                          <button
                            onClick={() => handleProcessRequest(req.id, 'DECLINE')}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-600 dark:text-slate-400 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" /> Từ chối
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MAIN FRIENDS LIST */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 font-display">
                <Users className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Danh Sách Bạn Bè ({friends.length}):
              </h3>

              {loading ? (
                /* SKELETON LOADING */
                <div className="space-y-2.5 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                      <div className="flex-1 space-y-1.5">
                        <div className="w-36 h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />
                        <div className="w-24 h-3 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : friends.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <div className="text-2xl">👥</div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
                    Chưa có bạn bè nào trong danh sách
                  </div>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">
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
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <UserAvatar avatar={f.avatar} avatarUrl={f.avatarUrl} imageUrl={f.imageUrl} emoji={f.avatarEmoji} name={cleanFriendName} size="w-9 h-9 sm:w-10 sm:h-10" />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                              {cleanFriendName}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                              Cấp {f.level || 1} · {f.title || 'Học viên năng nổ'}
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

          </div>

          {/* RIGHT COLUMN: SUGGESTED FRIENDS SIDEBAR WIDGET (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 sticky top-4">
            
            {/* BENTO WIDGET 1: SUGGESTED STUDY BUDDIES */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0 shadow-2xs">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Gợi Ý Bạn Học
                  </h3>
                </div>

                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 font-mono">
                  +10 XP
                </span>
              </div>

              <div className="space-y-2.5">
                {suggestions.slice(0, 4).map((s: any) => {
                  const cleanSuggName = formatCleanName(s.fullName || s.username);
                  return (
                    <div
                      key={s.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <UserAvatar avatar={s.avatar} avatarUrl={s.avatarUrl} imageUrl={s.imageUrl} emoji={s.avatarEmoji} name={cleanSuggName} size="w-8 h-8" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate font-display">
                            {cleanSuggName}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            Cấp {s.level || 1} · {s.title || 'Học viên'}
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

            {/* BENTO WIDGET 2: REASON TO CONNECT */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/60 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
                <Sparkles className="w-4 h-4" /> Lợi Ích Kết Bạn Học Tập
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                "Học cùng bạn bè giúp duy trì chuỗi Streak học tập cao hơn 3 lần so với học đơn độc. Thách đấu từ vựng ngay!"
              </p>
            </div>

          </div>
        </div>
      </div>
    </PageEntranceWrapper>
  );
}