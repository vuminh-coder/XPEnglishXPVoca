'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_THEMES } from '@/lib/constants';
import { Search, BookOpen, GraduationCap, Briefcase, Plane, ArrowUpRight, Sparkles } from 'lucide-react';

const THEME_ICONS: Record<string, React.ReactNode> = {
  't1': <BookOpen className="w-6 h-6 text-cyan-500" strokeWidth={1.8} />,
  't2': <GraduationCap className="w-6 h-6 text-purple-500" strokeWidth={1.8} />,
  't3': <Briefcase className="w-6 h-6 text-amber-500" strokeWidth={1.8} />,
  't4': <Plane className="w-6 h-6 text-blue-500" strokeWidth={1.8} />,
};

export default function VocabularyPage() {
  const [search, setSearch] = useState('');
  const themes = MOCK_THEMES;

  const filteredThemes = themes.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.nameEn.toLowerCase().includes(search.toLowerCase())
  );

  const getThemeAccent = (id: string) => {
    switch (id) {
      case 't1': return { accent: 'cyan', iconBg: 'bg-cyan-50 dark:bg-cyan-950/30' };
      case 't2': return { accent: 'purple', iconBg: 'bg-purple-50 dark:bg-purple-950/30' };
      case 't3': return { accent: 'amber', iconBg: 'bg-amber-50 dark:bg-amber-950/30' };
      case 't4': return { accent: 'blue', iconBg: 'bg-blue-50 dark:bg-blue-950/30' };
      default: return { accent: 'gray', iconBg: 'bg-gray-50 dark:bg-gray-950/30' };
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Khám phá bộ từ vựng</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Chọn một chủ đề để bắt đầu hành trình chinh phục từ vựng mới cùng thuật toán lặp lại thông minh.
        </p>
      </div>

      {/* Search — Double-Bezel */}
      <div className="bezel mb-8 max-w-lg animate-scale-in">
        <div className="bezel-inner relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-muted" strokeWidth={1.8} />
          <input 
            type="text" 
            className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm font-medium placeholder:text-muted focus:outline-none" 
            placeholder="Tìm kiếm chủ đề..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats summary */}
      <div className="flex items-center gap-6 mb-6 animate-fade-in-up">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-500" strokeWidth={1.8} />
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{filteredThemes.length} chủ đề</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" strokeWidth={1.8} />
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{filteredThemes.reduce((sum, t) => sum + t.totalVocabs, 0)} từ vựng</span>
        </div>
      </div>

      {/* Themes Grid — Double-Bezel cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up">
        {filteredThemes.map(t => {
          const style = getThemeAccent(t.id);
          const percentage = 15;
          return (
            <Link 
              key={t.id} 
              href={`/vocabulary/${t.id}`}
              className="bezel lift tactile block group"
            >
              <div className="bezel-inner p-6">
                <div className="flex items-start gap-5">
                  <div className={`icon-well ${style.iconBg} w-14 h-14 rounded-2xl shadow-sm border border-black/[0.03] dark:border-white/[0.03]`} style={{ transition: 'transform 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                    {THEME_ICONS[t.id] || <BookOpen className="w-6 h-6 text-gray-500" strokeWidth={1.8} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
                        {t.name}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }} strokeWidth={1.8} />
                    </div>
                    <p className="text-xs text-muted font-medium mb-4">
                      {t.nameEn} · {t.totalVocabs} từ vựng
                    </p>

                    <div className="flex items-center gap-1.5 mb-4">
                      <span className="text-[10px] text-muted font-bold uppercase tracking-wider mr-1">Độ khó:</span>
                      {Array(5).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < t.difficulty 
                              ? 'bg-cyan-500' 
                              : 'bg-neutral-200 dark:bg-neutral-700'
                          }`}
                        ></div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs text-muted mb-2 font-medium">
                      <span>Tiến trình</span>
                      <span className="text-cyan-500 font-bold">{percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" 
                        style={{ width: `${percentage}%`, transition: 'width 700ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}