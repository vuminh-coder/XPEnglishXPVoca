'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useNotificationStore } from '@/lib/store/notificationStore';
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
  Flame,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui';

const UserAvatar = ({ avatar, emoji, name, size = "w-8 h-8" }: { avatar?: string; emoji?: string; name?: string; size?: string }) => {
  if (avatar && (avatar.startsWith('http') || avatar.startsWith('/'))) {
    return (
      <img
        src={avatar}
        alt={name || ''}
        className={`${size} rounded-full object-cover shrink-0 border border-slate-200/80 dark:border-white/10 shadow-2xs`}
      />
    );
  }

  const initial = (name || 'X').replace(/^@+/, '').trim().charAt(0).toUpperCase() || 'X';

  return (
    <div className={`${size} rounded-full bg-[#0059bb] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs font-display`}>
      <span>{initial}</span>
    </div>
  );
};

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
      // Fetch friends
      const resFriends = await fetch("/api/friends");
      const dataFriends = await resFriends.json();
      if (dataFriends.success) setFriends(dataFriends.data);

      // Fetch pending requests
      const resReqs = await fetch("/api/friends/requests");
      const dataReqs = await resReqs.json();
      if (dataReqs.success) setPendingRequests(dataReqs.data.incoming || []);

      // Fetch suggestions
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
    // OPTIMISTIC UPDATE (0ms INSTANT FEEDBACK)
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
    // OPTIMISTIC UPDATE (0ms INSTANT REMOVAL FROM PENDING)
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
    <div className="space-y-6 pb-16 md:pb-6 select-none font-sans" suppressHydrationWarning>
      
      {/* 1. HERO FRIENDS BANNER */}
      <div className="p-5 sm:p-6 rounded-lg bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#0284c7] text-white shadow-xs relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-sky-200" /> Kết Nối Học Tập XP
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
              Thưởng +10 XP / Lời mời kết bạn
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white flex items-center gap-2">
              Bạn Đồng Hành Học Tập
              <Sparkles className="w-5 h-5 text-amber-300" />
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl font-medium leading-relaxed">
              Tìm kiếm và kết nối với những người bạn cùng mục tiêu thi TOEIC, IELTS để cùng nhau thi đấu và duy trì thói quen học mỗi ngày!
            </p>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID LAYOUT (3/4 MAIN CONTENT + 1/4 SIDEBAR SUGGESTIONS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT 3/4 COLUMN: SEARCH, PENDING REQUESTS & FRIENDS LIST */}
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
            <div className="py-1.5 px-3 rounded-sm sm:rounded-md bg-[#0059bb] text-white text-[10px] sm:text-xs font-bold shadow-2xs flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap">
              <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-200 shrink-0" /> Bạn bè
            </div>
            <Link
              href="/community/groups"
              className="py-1.5 px-3 rounded-sm sm:rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500 shrink-0" /> Nhóm
            </Link>
          </div>

          {/* SEARCH & ADD FRIEND CARD */}
          <div className="p-4 sm:p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Tìm Kiếm Bạn Bè Theo Username:
            </h3>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchAndAddFriend()}
                  placeholder="Nhập tên người dùng hoặc username..."
                  className="w-full pl-9 pr-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
                />
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSearchAndAddFriend}
                disabled={!friendName.trim()}
                className="px-4 py-2 rounded-md bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer disabled:opacity-50"
              >
                <UserPlus className="w-3.5 h-3.5" /> Kết bạn
              </Button>
            </div>
          </div>

          {/* PENDING FRIEND REQUESTS SECTION */}
          {pendingRequests.length > 0 && (
            <div className="p-4 sm:p-5 rounded-lg bg-[#ebf3fe]/80 dark:bg-slate-800/60 border border-[#0059bb]/30 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
                <UserPlus className="w-4 h-4" /> Lời Mời Kết Bạn Đang Chờ ({pendingRequests.length}):
              </h3>

              <div className="space-y-2">
                {pendingRequests.map((req: any) => (
                  <div
                    key={req.id}
                    className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar avatar={req.sender?.avatar} emoji={req.sender?.avatarEmoji} name={req.sender?.fullName} size="w-9 h-9" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white font-display">
                          {req.sender?.fullName} <span className="text-slate-400 font-normal">(@{req.sender?.username})</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          Muốn kết nối đồng hành học tập cùng bạn
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleProcessRequest(req.id, 'ACCEPT')}
                        className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> Đồng ý
                      </button>
                      <button
                        onClick={() => handleProcessRequest(req.id, 'DECLINE')}
                        className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-600 dark:text-slate-400 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Từ chối
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAIN FRIENDS LIST */}
          <div className="p-4 sm:p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-white/5 pb-2.5">
              <Users className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Danh Sách Bạn Bè ({friends.length}):
            </h3>

            {loading ? (
              /* SKELETON LOADING (RULE 1 COMPLIANCE) */
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-md bg-slate-100 dark:bg-slate-800/40 animate-pulse flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="flex-1 space-y-1.5">
                      <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />
                      <div className="w-24 h-3 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : friends.length === 0 ? (
              <div className="p-6 text-center space-y-2">
                <div className="text-2xl">👥</div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Chưa có bạn bè nào trong danh sách
                </div>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto font-medium">
                  Hãy kết bạn từ danh sách gợi ý bên phải để nhận thưởng +10 XP và cùng nhau thi đấu từ vựng nhé!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {friends.map((f: any) => (
                  <div
                    key={f.id}
                    className="p-3 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-3 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <UserAvatar avatar={f.avatar} emoji={f.avatarEmoji} name={f.fullName} size="w-9 h-9" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                          {f.fullName} <span className="text-slate-400 font-normal">(@{f.username})</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                          Cấp {f.level || 1} · {f.title || 'Học viên năng nổ'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20">
                        {f.xp || 0} XP
                      </span>
                      <button
                        onClick={() => handleRemoveFriend(f.id)}
                        title="Hủy kết bạn"
                        className="p-1.5 rounded bg-slate-200/60 dark:bg-slate-700 hover:bg-rose-50 hover:text-rose-600 text-slate-500 dark:text-slate-400 text-xs transition-all cursor-pointer"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT 1/4 COLUMN: SUGGESTED FRIENDS SIDEBAR WIDGET */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4 sticky top-4">
          
          {/* BENTO WIDGET 1: SUGGESTED STUDY BUDDIES */}
          <div className="p-4 sm:p-4.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20 text-base">
                  💡
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Gợi Ý Bạn Học
                </h3>
              </div>

              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                +10 XP
              </span>
            </div>

            <div className="space-y-2">
              {suggestions.slice(0, 4).map((s: any) => (
                <div
                  key={s.id}
                  className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <UserAvatar avatar={s.avatar} emoji={s.avatarEmoji} name={s.fullName} size="w-7 h-7" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {s.fullName}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        @{s.username} · Cấp {s.level}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddFriend(s.id, s.fullName)}
                    className="px-2 py-1 rounded bg-[#0059bb] hover:bg-[#004799] text-white text-[11px] font-bold transition-all shadow-2xs shrink-0 cursor-pointer flex items-center gap-1"
                  >
                    <UserPlus className="w-3 h-3" /> Kết bạn
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BENTO WIDGET 2: REASON TO CONNECT */}
          <div className="p-4 sm:p-4.5 rounded-lg bg-[#ebf3fe]/80 dark:bg-slate-800/60 border border-[#0059bb]/20 shadow-xs space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
              <Sparkles className="w-4 h-4" /> Lợi Ích Kết Bạn Học Tập
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              "Học cùng bạn bè giúp duy trì chuỗi Streak học tập cao hơn 3 lần so với học đơn độc. Thách đấu từ vựng ngay!"
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}