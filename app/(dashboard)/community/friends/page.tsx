'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { Users, UserPlus, MessageSquare, UserMinus, Search } from 'lucide-react';

export default function FriendsPage() {
  const { user, awardXp } = useAuthStore();
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
    try {
      const res = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId }),
      });
      const data = await res.json();
      if (data.success) {
        awardXp(10);
        alert(`Đã gửi lời mời kết bạn hoặc kết bạn thành công với ${name}! +10 XP`);
        loadData();
      } else {
        alert(data.error || "Không thể kết bạn");
      }
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

  const handleSearchAndAddFriend = async () => {
    if (!friendName.trim()) return;
    // Tìm kiếm trong suggestions hoặc gửi trực tiếp tới API qua username/id nếu trùng
    // Để đơn giản và tiện dụng: Thử tìm user có username trùng khớp trong suggestions
    const matched = suggestions.find(
      (s) => s.username.toLowerCase() === friendName.trim().toLowerCase()
    );

    if (matched) {
      handleAddFriend(matched.id, matched.fullName);
      setFriendName('');
    } else {
      // Nếu không khớp gợi ý, hiện thông báo tìm kiếm chi tiết
      alert(`Không tìm thấy người dùng có tên khớp trong danh sách gợi ý. Vui lòng nhập chính xác tên từ bảng gợi ý.`);
    }
  };

  const handleProcessRequest = async (requestId: string, action: 'ACCEPT' | 'DECLINE') => {
    try {
      const res = await fetch("/api/friends/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      const data = await res.json();
      if (data.success) {
        alert(action === "ACCEPT" ? "Đã chấp nhận lời mời kết bạn!" : "Đã từ chối lời mời.");
        loadData();
      } else {
        alert(data.error || "Lỗi xử lý yêu cầu");
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
        alert("Đã hủy kết bạn thành công.");
        loadData();
      } else {
        alert(data.error || "Không thể hủy kết bạn");
      }
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Cộng đồng học tập</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Quản lý và tìm kiếm bạn đồng hành cùng hỗ trợ luyện tiếng Anh hiệu quả mỗi ngày.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-8 bg-black/[0.025] dark:bg-white/[0.025] p-1 rounded-full w-fit border border-black/[0.03] dark:border-white/[0.03] animate-scale-in">
        <Link href="/community" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bảng tin</Link>
        <Link href="/community/leaderboard" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bảng xếp hạng</Link>
        <div className="px-4 py-2 text-xs font-bold rounded-full bg-white dark:bg-neutral-900 text-primary-c shadow-sm">Bạn bè</div>
        <Link href="/community/groups" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Nhóm học tập</Link>
      </div>

      <div className="animate-fade-in-up flex flex-col gap-6">
        {/* Add Friend — Double-Bezel */}
        <div className="bezel">
          <div className="bezel-inner p-5">
            <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4">
              Tìm kiếm bạn bè mới
            </h3>
            <div className="flex gap-2">
              <div className="flex-1 relative flex items-center bg-neutral-50/60 dark:bg-neutral-900/40 rounded-xl border border-black/[0.04] dark:border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <Search className="absolute left-4 w-4 h-4 text-muted" strokeWidth={1.8} />
                <input 
                  type="text" 
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent text-xs font-medium focus:outline-none placeholder:text-muted" 
                  placeholder="Nhập tên người dùng tiếng Anh..." 
                  value={friendName}
                  onChange={e => setFriendName(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearchAndAddFriend()}
                />
              </div>
              <button className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-bold py-2.5 px-5 tactile shadow-sm" onClick={handleSearchAndAddFriend}>
                <UserPlus className="w-3.5 h-3.5" strokeWidth={2} /> Kết bạn
              </button>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div>
            <h3 className="text-[11px] font-extrabold text-amber-500 uppercase tracking-[0.15em] mb-4">
              Lời mời kết bạn đang chờ ({pendingRequests.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map(req => (
                <div key={req.requestId} className="bezel">
                  <div className="bezel-inner p-4 flex justify-between items-center bg-amber-50/10 dark:bg-amber-950/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-lg border border-black/5 dark:border-white/5">
                        <span>{req.avatarEmoji}</span>
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-gray-900 dark:text-gray-100">
                          {req.fullName} <span className="text-[12px] text-muted font-normal">(@{req.username})</span>
                        </div>
                        <div className="text-[12px] text-muted font-medium">Cấp độ {req.level}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="px-3 py-1.5 text-[12px] font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full tactile shadow-sm" 
                        onClick={() => handleProcessRequest(req.requestId, 'ACCEPT')}
                      >
                        Đồng ý
                      </button>
                      <button 
                        className="px-3 py-1.5 text-[12px] font-bold text-muted bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full tactile" 
                        onClick={() => handleProcessRequest(req.requestId, 'DECLINE')}
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friends Grid List */}
        <div>
          <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4">
            Danh sách bạn bè ({friends.length})
          </h3>
          
          {loading ? (
            <div className="bezel">
              <div className="bezel-inner p-12 text-center text-xs font-bold text-muted animate-pulse">
                Đang tải danh sách bạn bè...
              </div>
            </div>
          ) : friends.length === 0 ? (
            <div className="bezel">
              <div className="bezel-inner p-12 text-center flex flex-col items-center">
                <Users className="w-12 h-12 text-muted mb-4" strokeWidth={1.2} />
                <div className="text-sm font-extrabold text-gray-900 dark:text-gray-100 mb-1">Chưa có bạn bè</div>
                <p className="text-xs text-muted max-w-xs leading-relaxed">Hãy tìm kiếm hoặc kết bạn từ danh sách gợi ý bên dưới nhé!</p>
              </div>
            </div>
          ) : (
            <div className="friends-list grid grid-cols-1 md:grid-cols-2 gap-4">
              {friends.map(f => (
                <div key={f.id} className="bezel lift">
                  <div className="bezel-inner p-4 flex justify-between items-center bg-white dark:bg-neutral-900">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-xl border border-black/5 dark:border-white/5 flex-shrink-0">
                        <span>{f.avatarEmoji}</span>
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-gray-900 dark:text-gray-100">
                          {f.fullName} <span className="text-[12px] text-muted font-normal">(@{f.username})</span>
                        </div>
                        <div className="text-[12px] text-muted font-medium mt-0.5">Cấp độ {f.level} · {f.xp} XP</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-muted bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full tactile" 
                        onClick={() => alert('Tính năng chat riêng tư đang được phát triển!')}
                      >
                        <MessageSquare className="w-3 h-3 text-muted" strokeWidth={1.8} /> Chat
                      </button>
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 rounded-full tactile" 
                        onClick={() => handleRemoveFriend(f.id)}
                      >
                        <UserMinus className="w-3 h-3 text-red-500" strokeWidth={1.8} /> Hủy kết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Suggestions List */}
        {suggestions.length > 0 && (
          <div>
            <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4">
              Gợi ý kết bạn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map(s => (
                <div key={s.id} className="bezel lift">
                  <div className="bezel-inner p-4 flex justify-between items-center bg-white dark:bg-neutral-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-lg border border-black/5 dark:border-white/5 flex-shrink-0">
                        <span>{s.avatarEmoji}</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-gray-100">
                          {s.fullName} <span className="text-[12px] text-muted font-normal">(@{s.username})</span>
                        </div>
                        <div className="text-[12px] text-muted font-medium mt-0.5">Cấp độ {s.level} · {s.xp} XP</div>
                      </div>
                    </div>
                    <button 
                      className="flex items-center gap-1 bg-neutral-50 dark:bg-neutral-900 text-[11px] font-black uppercase tracking-wider py-1.5 px-3.5 border border-black/10 dark:border-white/10 rounded-full hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:text-cyan-500 hover:border-cyan-200 dark:hover:border-cyan-800 transition-all duration-300 tactile"
                      onClick={() => handleAddFriend(s.id, s.fullName)}
                    >
                      <UserPlus className="w-3.5 h-3.5" strokeWidth={2} /> Kết bạn
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}