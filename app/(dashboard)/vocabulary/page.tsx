'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_THEMES } from '@/lib/constants';
import { Search, BookOpen, GraduationCap, Briefcase, Plane, ArrowUpRight, Sparkles, Clock3, Target } from 'lucide-react';

const THEME_ICONS: Record<string, React.ReactNode> = {
  t1: <BookOpen className="h-6 w-6 text-cyan-500" strokeWidth={1.8} />,
  t2: <GraduationCap className="h-6 w-6 text-purple-500" strokeWidth={1.8} />,
  t3: <Briefcase className="h-6 w-6 text-amber-500" strokeWidth={1.8} />,
  t4: <Plane className="h-6 w-6 text-blue-500" strokeWidth={1.8} />,
};

export default function VocabularyPage() {
  const [search, setSearch] = useState('');
  const themes = MOCK_THEMES;

  const filteredThemes = themes.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.nameEn.toLowerCase().includes(search.toLowerCase()),
  );

  const getThemeAccent = (id: string) => {
    switch (id) {
      case 't1':
        return { iconBg: 'bg-cyan-50 dark:bg-cyan-950/30', stripe: 'from-cyan-400 to-sky-500' };
      case 't2':
        return { iconBg: 'bg-purple-50 dark:bg-purple-950/30', stripe: 'from-violet-400 to-fuchsia-500' };
      case 't3':
        return { iconBg: 'bg-amber-50 dark:bg-amber-950/30', stripe: 'from-amber-400 to-orange-500' };
      case 't4':
        return { iconBg: 'bg-blue-50 dark:bg-blue-950/30', stripe: 'from-blue-400 to-indigo-500' };
      default:
        return { iconBg: 'bg-slate-50 dark:bg-slate-950/30', stripe: 'from-slate-400 to-slate-500' };
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="page-header animate-fade-in-down">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Khám phá bộ từ vựng</h1>
        <p className="page-subtitle text-muted max-w-2xl" style={{ marginTop: '6px' }}>
          Chọn một chủ đề, học theo nhịp điệu riêng và giữ động lực bằng lộ trình rõ ràng.
        </p>
      </div>

      <div className="bezel">
        <div className="bezel-inner overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 p-6 text-white md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                Today’s focus
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Bắt đầu từ một chủ đề quen thuộc nhất</h2>
              <p className="mt-2 text-sm text-white/75 sm:text-base">
                Tìm bộ từ phù hợp với mục tiêu của bạn, rồi học theo các gói ngắn, dễ hoàn thành.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Trong tuần</div>
              <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
                <Target className="h-4 w-4 text-cyan-300" />
                12 mục tiêu sắp hoàn thành
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bezel">
        <div className="bezel-inner flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.8} />
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-neutral-900"
              placeholder="Tìm kiếm chủ đề..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              <span>{filteredThemes.length} chủ đề</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" />
              <span>{filteredThemes.reduce((sum, t) => sum + t.totalVocabs, 0)} từ</span>
            </div>
          </div>
        </div>
      </div>

      {filteredThemes.length === 0 ? (
        <div className="bezel">
          <div className="bezel-inner p-10 text-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Không tìm thấy chủ đề phù hợp</p>
            <p className="mt-2 text-sm text-muted">Hãy thử từ khóa khác như “travel”, “work”, hoặc “daily”.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredThemes.map((t) => {
            const style = getThemeAccent(t.id);
            const percentage = Math.min(100, 15 + t.difficulty * 8);
            return (
              <Link key={t.id} href={`/vocabulary/${t.id}`} className="bezel lift tactile group block">
                <div className="bezel-inner p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className={`icon-well ${style.iconBg} h-14 w-14 rounded-2xl border border-black/[0.03] shadow-sm dark:border-white/[0.03]`}>
                      {THEME_ICONS[t.id] || <BookOpen className="h-6 w-6 text-slate-500" strokeWidth={1.8} />}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" strokeWidth={1.8} />
                  </div>

                  <div className="mt-5">
                    <h3 className="text-base font-black text-gray-900 dark:text-gray-100">{t.name}</h3>
                    <p className="mt-1 text-sm text-muted">{t.nameEn} · {t.totalVocabs} từ vựng</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    <Clock3 className="h-3.5 w-3.5" />
                    8 phút / buổi
                  </div>

                  <div className="mt-4 flex items-center gap-1.5">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className={`h-1.8 w-1.8 rounded-full ${i < t.difficulty ? 'bg-cyan-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    ))}
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted">
                      <span>Tiến trình</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                      <div className={`h-full rounded-full bg-gradient-to-r ${style.stripe}`} style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
