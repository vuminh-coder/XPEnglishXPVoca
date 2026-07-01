'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Target, Laptop, Briefcase, MessageCircle, Plus, Users, Globe, ArrowRight } from 'lucide-react';

const GROUP_ICONS: Record<string, React.ReactNode> = {
  'g1': <Target className="w-6 h-6 text-cyan-500" strokeWidth={1.8} />,
  'g2': <Laptop className="w-6 h-6 text-blue-500" strokeWidth={1.8} />,
  'g3': <Briefcase className="w-6 h-6 text-amber-500" strokeWidth={1.8} />,
  'g4': <MessageCircle className="w-6 h-6 text-purple-500" strokeWidth={1.8} />,
};

export default function GroupsPage() {
  const [groups, setGroups] = useState([
    { id: 'g1', name: 'IELTS Warriors', description: 'Nhóm luyện từ vựng IELTS band 7.0+', themeName: 'IELTS / TOEIC Prep', memberCount: 28, maxMembers: 50, joined: false, accent: 'cyan' },
    { id: 'g2', name: 'Tech Vocab Club', description: 'Học từ vựng công nghệ cho developers', themeName: 'Technology', memberCount: 15, maxMembers: 30, joined: false, accent: 'blue' },
    { id: 'g3', name: 'Business English Pro', description: 'Tiếng Anh thương mại cho dân công sở', themeName: 'Business', memberCount: 32, maxMembers: 50, joined: false, accent: 'amber' },
    { id: 'g4', name: 'Daily English Chat', description: 'Nói tiếng Anh mỗi ngày, không ngại sai!', themeName: 'Daily Conversations', memberCount: 45, maxMembers: 100, joined: false, accent: 'purple' }
  ]);

  const handleJoinGroup = (id: string) => {
    setGroups(groups.map(g => {
      if (g.id === id) {
        if (g.joined) return g;
        alert(`Đã tham gia nhóm ${g.name} thành công!`);
        return { ...g, memberCount: g.memberCount + 1, joined: true };
      }
      return g;
    }));
  };

  const accentMap: Record<string, string> = {
    cyan: 'bg-cyan-50 dark:bg-cyan-950/30',
    blue: 'bg-blue-50 dark:bg-blue-950/30',
    amber: 'bg-amber-50 dark:bg-amber-950/30',
    purple: 'bg-purple-50 dark:bg-purple-950/30',
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Cộng đồng học tập</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Tham gia các nhóm thảo luận chuyên môn để cùng chia sẻ bài tập và hỗ trợ nhau cải thiện tiếng Anh.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-8 bg-black/[0.025] dark:bg-white/[0.025] p-1 rounded-full w-fit border border-black/[0.03] dark:border-white/[0.03] animate-scale-in">
        <Link href="/community" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bảng tin</Link>
        <Link href="/community/leaderboard" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bảng xếp hạng</Link>
        <Link href="/community/friends" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bạn bè</Link>
        <div className="px-4 py-2 text-xs font-bold rounded-full bg-white dark:bg-neutral-900 text-primary-c shadow-sm">Nhóm học tập</div>
      </div>

      <div className="animate-fade-in-up flex flex-col gap-6">
        {/* Intro Banner — Double-Bezel */}
        <div className="bezel">
          <div className="bezel-inner p-5 flex justify-between items-center bg-white dark:bg-neutral-900">
            <div>
              <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-1">
                Nhóm học tập cộng đồng
              </h3>
              <p className="text-xs text-muted">Tham gia nhóm để giao lưu từ vựng cùng sở thích học thuật.</p>
            </div>
            <button className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-bold py-2.5 px-5 tactile shadow-sm" onClick={() => alert('Khởi tạo nhóm mới yêu cầu cấp độ 15!')}>
              <Plus className="w-4 h-4" strokeWidth={2.5} /> Tạo nhóm mới
            </button>
          </div>
        </div>

        {/* Groups Grid — Double-Bezel cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map(g => (
            <div key={g.id} className="bezel lift group">
              <div className="bezel-inner p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`icon-well ${accentMap[g.accent]} w-12 h-12 rounded-2xl border border-black/[0.03] dark:border-white/[0.03]`} style={{ transition: 'transform 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                      {GROUP_ICONS[g.id] || <Globe className="w-6 h-6 text-gray-500" strokeWidth={1.8} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1 leading-tight group-hover:text-cyan-500" style={{ transition: 'color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                        {g.name}
                      </h3>
                      <span className="inline-block text-[9px] font-bold py-0.5 px-2 bg-neutral-100 dark:bg-neutral-800 text-muted rounded-full border border-black/5 dark:border-white/5 uppercase">
                        {g.themeName}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-4">{g.description}</p>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-black/[0.04] dark:border-white/[0.04]">
                  <span className="flex items-center gap-1.5 text-[10px] text-muted font-bold uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} /> {g.memberCount}/{g.maxMembers} thành viên
                  </span>
                  <button 
                    className={`flex items-center gap-1 px-4 py-1.5 text-[10px] font-bold rounded-full tactile border ${
                      g.joined 
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-muted border-black/5 dark:border-white/5 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                    }`}
                    onClick={() => handleJoinGroup(g.id)}
                    disabled={g.joined}
                  >
                    {g.joined ? 'Đã tham gia' : 'Tham gia'} {!g.joined && <ArrowRight className="w-3 h-3 ml-0.5" strokeWidth={2} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}