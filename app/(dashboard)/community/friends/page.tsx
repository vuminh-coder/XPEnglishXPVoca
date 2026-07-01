'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { Users, UserPlus, MessageSquare, UserMinus, Search } from 'lucide-react';

export default function FriendsPage() {
  const { user, awardXp } = useAuthStore();
  const [friendName, setFriendName] = useState('');
  const [friends, setFriends] = useState([
    { id: 'u2', fullName: 'Nguyễn Tuấn', username: 'TuanDepTrai', level: 9, xp: 830, avatarEmoji: '🐱' },
    { id: 'u3', fullName: 'Hoàng Anh', username: 'HoangAnh', level: 7, xp: 620, avatarEmoji: '🌟' },
    { id: 'u4', fullName: 'Trần Minh Thư', username: 'MinhThu', level: 12, xp: 3200, avatarEmoji: '🦋' },
    { id: 'u6', fullName: 'Phạm Thanh Hà', username: 'ThanhHa', level: 8, xp: 710, avatarEmoji: '🌸' }
  ]);

  const handleAddFriend = () => {
    if (!friendName.trim()) return;
    
    const name = friendName.trim();
    const mockNewFriend = {
      id: 'u_' + Date.now(),
      fullName: name,
      username: name.toLowerCase().replace(/\s+/g, ''),
      level: 1,
      xp: 100,
      avatarEmoji: '😊'
    };

    setFriends([...friends, mockNewFriend]);
    setFriendName('');
    awardXp(10);
    alert(`Đã kết bạn thành công với ${name}! +10 XP`);
  };

  const handleRemoveFriend = (id: string) => {
    setFriends(friends.filter(f => f.id !== id));
    alert('Đã hủy kết bạn thành công.');
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
                  placeholder="Nhập tên người dùng tiếng Anh hoặc ID..." 
                  value={friendName}
                  onChange={e => setFriendName(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleAddFriend()}
                />
              </div>
              <button className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-bold py-2.5 px-5 tactile shadow-sm" onClick={handleAddFriend}>
                <UserPlus className="w-3.5 h-3.5" strokeWidth={2} /> Kết bạn
              </button>
            </div>
          </div>
        </div>

        {/* Friends Grid List */}
        <div>
          <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4">
            Danh sách bạn bè ({friends.length})
          </h3>
          
          {friends.length === 0 ? (
            <div className="bezel">
              <div className="bezel-inner p-12 text-center flex flex-col items-center">
                <Users className="w-12 h-12 text-muted mb-4" strokeWidth={1.2} />
                <div className="text-sm font-extrabold text-gray-900 dark:text-gray-100 mb-1">Chưa có bạn bè</div>
                <p className="text-xs text-muted max-w-xs leading-relaxed">Hãy tìm kiếm tên của người dùng khác để cùng nhau kết bạn thi đua học từ vựng nhé!</p>
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
                          {f.fullName} <span className="text-[10px] text-muted font-normal">(@{f.username})</span>
                        </div>
                        <div className="text-[10px] text-muted font-medium mt-0.5">Cấp độ {f.level} · {f.xp} XP</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-muted bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full tactile" 
                        onClick={() => alert('Tính năng chat riêng tư đang được phát triển!')}
                      >
                        <MessageSquare className="w-3 h-3 text-muted" strokeWidth={1.8} /> Chat
                      </button>
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 rounded-full tactile" 
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
      </div>
    </div>
  );
}