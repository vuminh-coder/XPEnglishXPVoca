'use client';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { GraduationCap, Flame, Swords, Trophy, UserPlus, Brain, Lock, CheckCircle2, User, FileText, Save, Sparkles } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setBio(user.bio || '');
    }
  }, [user]);

  if (!user) return null;

  const handleSaveProfile = () => {
    updateProfile(fullName, bio);
    setToast('Đã lưu thông tin tài khoản thành công!');
    setTimeout(() => setToast(null), 3000);
  };

  const achievements = [
    { id: 'a1', name: 'Bước đầu', description: 'Học 10 từ vựng đầu tiên', icon: <GraduationCap className="w-6 h-6 text-cyan-500" strokeWidth={1.8} />, xpBonus: 50, unlocked: true },
    { id: 'a2', name: '5 Ngày Liên', description: 'Duy trì streak 5 ngày', icon: <Flame className="w-6 h-6 text-amber-500" strokeWidth={1.8} />, xpBonus: 100, unlocked: true },
    { id: 'a3', name: 'Tuần Chiến', description: 'Học 7 ngày liên tiếp', icon: <Swords className="w-6 h-6 text-red-500" strokeWidth={1.8} />, xpBonus: 150, unlocked: true },
    { id: 'a4', name: 'Bách Từ', description: 'Học được 100 từ vựng', icon: <Trophy className="w-6 h-6 text-yellow-500" strokeWidth={1.8} />, xpBonus: 200, unlocked: false },
    { id: 'a5', name: 'Xã Hội', description: 'Kết bạn với 5 người', icon: <UserPlus className="w-6 h-6 text-emerald-500" strokeWidth={1.8} />, xpBonus: 75, unlocked: false },
    { id: 'a6', name: 'Quiz Master', description: 'Hoàn thành 50 bài quiz', icon: <Brain className="w-6 h-6 text-purple-500" strokeWidth={1.8} />, xpBonus: 150, unlocked: false }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="animate-fade-in">
      {toast && (
        <div className="fixed bottom-6 right-6 z-[600] bezel animate-fade-in-up">
          <div className="bezel-inner bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
            <div className="text-xs font-bold text-gray-900 dark:text-gray-100">{toast}</div>
          </div>
        </div>
      )}

      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Trang cá nhân</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Xem thông tin chi tiết, huy hiệu thành tích và tùy chỉnh cài đặt tài khoản của bạn.
        </p>
      </div>

      {/* Profile Header — Double-Bezel */}
      <div className="bezel mb-8 animate-scale-in">
        <div className="bezel-inner p-6 flex flex-col md:flex-row items-center md:items-start gap-6 bg-white dark:bg-neutral-900">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-full blur-md opacity-50"></div>
            <div className="relative z-10 w-24 h-24 rounded-full border-2 border-white dark:border-neutral-800 shadow-md flex items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">{user.avatarEmoji}</span>
              )}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left min-w-0">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-1">{user.fullName}</h2>
            <div className="text-xs text-muted font-bold uppercase tracking-wider mb-3">
              @{user.username} · Cấp độ <span className="text-cyan-500">{user.level}</span> ({user.title})
            </div>
            <p className="text-xs text-muted mb-5 max-w-lg leading-relaxed">{user.bio || 'Chưa thiết lập tiểu sử.'}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-neutral-50 dark:bg-neutral-950 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5 text-center min-w-[90px]">
                <div className="text-lg font-black text-gray-900 dark:text-gray-100 tracking-tight">{user.wordsLearned}</div>
                <div className="text-[10px] text-muted font-semibold uppercase tracking-wider">Từ đã học</div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-950 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5 text-center min-w-[90px]">
                <div className="text-lg font-black text-gray-900 dark:text-gray-100 tracking-tight flex items-center justify-center gap-1">
                  {user.currentStreak} <Flame className="w-4 h-4 text-amber-500 fill-amber-500" strokeWidth={1.8} />
                </div>
                <div className="text-[10px] text-muted font-semibold uppercase tracking-wider">Streak học</div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-950 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5 text-center min-w-[90px]">
                <div className="text-lg font-black text-gray-900 dark:text-gray-100 tracking-tight">{user.totalXp}</div>
                <div className="text-[10px] text-muted font-semibold uppercase tracking-wider">Tổng XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-4">
          Kho huy hiệu tích lũy ({unlockedCount}/{achievements.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
          {achievements.map(ach => (
            <div key={ach.id} className="bezel lift">
              <div className={`bezel-inner p-5 flex flex-col items-center text-center h-full justify-between bg-white dark:bg-neutral-900 ${ach.unlocked ? '' : 'opacity-50 grayscale'}`}>
                <div className="flex flex-col items-center">
                  <div className="relative mb-3">
                    {!ach.unlocked && <Lock className="w-3.5 h-3.5 text-muted absolute top-0.5 right-0.5" strokeWidth={2.5} />}
                    <div className="icon-well bg-neutral-100 dark:bg-neutral-800">
                      {ach.icon}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">{ach.name}</h4>
                  <p className="text-[11px] text-muted max-w-xs leading-relaxed">{ach.description}</p>
                </div>
                <span className={`text-[9px] font-bold py-1 px-3.5 rounded-full border mt-4 uppercase tracking-wider ${
                  ach.unlocked 
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-neutral-50 dark:bg-neutral-900 border-black/5 dark:border-white/5 text-muted'
                }`}>
                  {ach.unlocked ? 'Đã đạt được' : `Khóa (+${ach.xpBonus} XP)`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings — Double-Bezel */}
      <div className="bezel animate-fade-in-up">
        <div className="bezel-inner p-6 bg-white dark:bg-neutral-900">
          <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-5">
            Cài đặt hồ sơ tài khoản
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> Họ và tên
              </label>
              <input 
                type="text" 
                className="w-full py-2.5 px-4 text-xs font-medium rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" 
                style={{ transition: 'border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> Tiểu sử (Bio)
              </label>
              <input 
                type="text" 
                className="w-full py-2.5 px-4 text-xs font-medium rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" 
                style={{ transition: 'border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                value={bio}
                onChange={e => setBio(e.target.value)}
              />
            </div>
          </div>
          <button 
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold py-2.5 px-6 tactile shadow-sm" 
            onClick={handleSaveProfile}
          >
            <Save className="w-3.5 h-3.5" strokeWidth={2} /> Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
}