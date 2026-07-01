'use client';
import React from 'react';
import Link from 'next/link';

export default function AchievementsPage() {
  const achievements = [
    { id: 'a1', name: 'Bước đầu', description: 'Học 10 từ vựng đầu tiên', icon: '🎓', xpBonus: 50, unlocked: true },
    { id: 'a2', name: '5 Ngày Liên', description: 'Duy trì streak 5 ngày', icon: '🔥', xpBonus: 100, unlocked: true },
    { id: 'a3', name: 'Tuần Chiến', description: 'Học 7 ngày liên tiếp', icon: '⚔️', xpBonus: 150, unlocked: true },
    { id: 'a4', name: 'Bách Từ', description: 'Học được 100 từ vựng', icon: '💯', xpBonus: 200, unlocked: false },
    { id: 'a5', name: 'Xã Hội', description: 'Kết bạn với 5 người', icon: '🦋', xpBonus: 75, unlocked: false },
    { id: 'a6', name: 'Quiz Master', description: 'Hoàn thành 50 bài quiz', icon: '🧠', xpBonus: 150, unlocked: false }
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/profile" className="btn btn-secondary btn-icon btn-sm">
          <span>←</span>
        </Link>
        <div>
          <h2 className="font-bold text-2xl">Danh hiệu tích lũy</h2>
          <p className="text-sm text-muted">Hoàn thành các thử thách để nhận huy hiệu vinh danh</p>
        </div>
      </div>

      <div className="achievements-full-grid animate-fade-in-up">
        {achievements.map(ach => (
          <div key={ach.id} className={`achievement-full-card ${ach.unlocked ? '' : 'locked'}`}>
            <div className="achievement-full-icon">{ach.icon}</div>
            <div className="achievement-full-name">{ach.name}</div>
            <div className="achievement-full-desc">{ach.description}</div>
            <span className={`badge ${ach.unlocked ? 'badge-success' : 'badge-neutral'} mt-2`} style={{ display: 'inline-block' }}>
              {ach.unlocked ? 'Đã nhận' : `Khóa (+${ach.xpBonus} XP)`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}