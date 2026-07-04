'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_VOCABULARIES } from '@/lib/constants/vocabularies';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { useAuthStore } from '@/lib/store/authStore';
import { FolderOpen, Heart, RefreshCw, Crown, Volume2, Zap, Inbox, ArrowRight } from 'lucide-react';

export default function MyVocabularyPage() {
  const [filter, setFilter] = useState<'all' | 'favorite' | 'learning' | 'mastered'>('all');
  const { learned, toggleFavorite, practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();
  const vocabs = MOCK_VOCABULARIES;

  const favoriteWords = learned.filter(l => l.isFavorite);
  const masteredWords = learned.filter(l => l.proficiency === 5);
  const learningWords = learned.filter(l => l.proficiency > 0 && l.proficiency < 5);

  let filteredList: any[] = [];
  if (filter === 'all') filteredList = learned;
  else if (filter === 'favorite') filteredList = favoriteWords;
  else if (filter === 'learning') filteredList = learningWords;
  else if (filter === 'mastered') filteredList = masteredWords;

  const speak = (word: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  const statCards = [
    { key: 'all' as const, label: 'Tổng số', sublabel: 'Từ vựng đã bắt đầu học', count: learned.length, icon: <FolderOpen className="w-[18px] h-[18px]" strokeWidth={1.8} />, accent: 'blue' },
    { key: 'favorite' as const, label: 'Yêu thích', sublabel: 'Từ vựng đánh dấu thích', count: favoriteWords.length, icon: <Heart className="w-[18px] h-[18px]" strokeWidth={1.8} />, accent: 'emerald' },
    { key: 'learning' as const, label: 'Đang học', sublabel: 'Từ vựng đang rèn luyện', count: learningWords.length, icon: <RefreshCw className="w-[18px] h-[18px]" strokeWidth={1.8} />, accent: 'amber' },
    { key: 'mastered' as const, label: 'Làm chủ', sublabel: 'Đã thành thạo cấp tối đa', count: masteredWords.length, icon: <Crown className="w-[18px] h-[18px]" strokeWidth={1.8} />, accent: 'purple' },
  ];

  const accentMap: Record<string, { iconBg: string, badgeBg: string, badgeText: string, activeBorder: string }> = {
    blue: { iconBg: 'bg-blue-50 dark:bg-blue-950/30', badgeBg: 'bg-blue-50 dark:bg-blue-950/50', badgeText: 'text-blue-500', activeBorder: 'border-blue-400 dark:border-blue-700' },
    emerald: { iconBg: 'bg-emerald-50 dark:bg-emerald-950/30', badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50', badgeText: 'text-emerald-500', activeBorder: 'border-emerald-400 dark:border-emerald-700' },
    amber: { iconBg: 'bg-amber-50 dark:bg-amber-950/30', badgeBg: 'bg-amber-50 dark:bg-amber-950/50', badgeText: 'text-amber-500', activeBorder: 'border-amber-400 dark:border-amber-700' },
    purple: { iconBg: 'bg-purple-50 dark:bg-purple-950/30', badgeBg: 'bg-purple-50 dark:bg-purple-950/50', badgeText: 'text-purple-500', activeBorder: 'border-purple-400 dark:border-purple-700' },
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Bộ từ vựng của tôi</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Theo dõi, ôn tập và quản lý các từ vựng bạn đang học, yêu thích hoặc đã làm chủ.
        </p>
      </div>

      {/* Stats — Double-Bezel filter cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(s => {
          const a = accentMap[s.accent];
          const isActive = filter === s.key;
          return (
            <div
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`bezel cursor-pointer ${isActive ? a.activeBorder : ''}`}
              style={{ transition: 'border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
            >
              <div className="bezel-inner p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className={`icon-well ${a.iconBg} ${a.badgeText}`}>{s.icon}</div>
                  <span className={`text-[11px] ${a.badgeText} ${a.badgeBg} px-2 py-0.5 rounded-full font-bold uppercase tracking-wider`}>{s.label}</span>
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">{s.count}</div>
                <div className="text-[11px] text-muted font-medium mt-1">{s.sublabel}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pill tab filters */}
      <div className="flex gap-1.5 mb-6 bg-black/[0.025] dark:bg-white/[0.025] p-1 rounded-full w-fit border border-black/[0.03] dark:border-white/[0.03]">
        {(['all', 'favorite', 'learning', 'mastered'] as const).map(key => {
          const labels: Record<string, string> = { all: 'Tất cả', favorite: 'Yêu thích', learning: 'Đang học', mastered: 'Đã thuộc' };
          const counts: Record<string, number> = { all: learned.length, favorite: favoriteWords.length, learning: learningWords.length, mastered: masteredWords.length };
          return (
            <button
              key={key}
              className={`px-4 py-2 text-xs font-bold rounded-full ${filter === key ? 'bg-white dark:bg-neutral-900 text-primary-c shadow-sm' : 'text-muted'}`}
              style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
              onClick={() => setFilter(key)}
            >
              {labels[key]} ({counts[key]})
            </button>
          );
        })}
      </div>

      {/* Vocabulary cards — Double-Bezel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up">
        {filteredList.length === 0 ? (
          <div className="bezel col-span-2">
            <div className="bezel-inner flex flex-col items-center justify-center p-12 text-center">
              <Inbox className="w-12 h-12 text-muted mb-4" strokeWidth={1.2} />
              <div className="text-base font-extrabold text-gray-900 dark:text-gray-100 mb-1">Thư mục đang trống</div>
              <p className="text-xs text-muted max-w-xs mb-6 leading-relaxed">
                Bạn chưa lưu từ vựng nào thuộc bộ lọc này. Hãy bắt đầu khám phá và ôn luyện từ vựng mới ngay!
              </p>
              <Link href="/vocabulary" className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold px-6 py-2.5 shadow-md tactile">
                Khám phá từ mới <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        ) : (
          filteredList.map(item => {
            const v = vocabs.find(vocab => vocab.id === item.vocabId);
            if (!v) return null;
            return (
              <div key={item.vocabId} className="bezel lift group">
                <div className="bezel-inner p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-extrabold text-primary-600 dark:text-cyan-400 group-hover:text-cyan-500" style={{ transition: 'color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>{v.word}</h3>
                      <span className="inline-block text-[12px] font-bold px-2 py-0.5 bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 rounded-full uppercase mt-1">
                        {v.pos}
                      </span>
                      <div className="text-xs text-muted font-mono mt-1">{v.phonetic}</div>
                    </div>
                    <button 
                      className="w-9 h-9 rounded-full flex items-center justify-center tactile border border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900"
                      onClick={() => toggleFavorite(v.id)}
                    >
                      <Heart className={`w-4 h-4 ${item.isFavorite ? 'text-red-500 fill-red-500' : 'text-muted'}`} strokeWidth={1.8} />
                    </button>
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">{v.definitionVn}</div>
                  <div className="text-xs text-muted mb-4 leading-relaxed">{v.definition}</div>
                  <div className="text-xs text-muted bg-black/[0.02] dark:bg-white/[0.02] p-3 rounded-xl border border-black/[0.03] dark:border-white/[0.03] italic leading-relaxed">
                    &quot;{v.examples[0]}&quot;
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/[0.04] dark:border-white/[0.04]">
                    <div className="flex gap-1">
                      {Array(5).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < item.proficiency ? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-neutral-800'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-muted bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full tactile" onClick={() => speak(v.word)}>
                        <Volume2 className="w-3.5 h-3.5" strokeWidth={1.8} /> Nghe
                      </button>
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full tactile"
                        onClick={() => {
                          practiceWord(v.id, true);
                          awardXp(15);
                        }}
                      >
                        <Zap className="w-3.5 h-3.5" strokeWidth={2} /> Ôn tập
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
