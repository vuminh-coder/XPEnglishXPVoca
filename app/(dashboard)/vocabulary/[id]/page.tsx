'use client';
import React, { use, useState } from 'react';
import Link from 'next/link';
import { MOCK_THEMES } from '@/lib/constants';
import { MOCK_VOCABULARIES } from '@/lib/constants/vocabularies';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { useAuthStore } from '@/lib/store/authStore';
import { ArrowLeft, Layers, List, Heart, Volume2, Zap, CheckCircle2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ThemeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const theme = MOCK_THEMES.find(t => t.id === id);
  const vocabs = MOCK_VOCABULARIES.filter(v => v.themeId === id);
  const { toggleFavorite, learned, practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();

  const [toast, setToast] = useState<{ title: string; body: string } | null>(null);
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!theme) return <div className="p-8 text-center text-red-500">Chủ đề không tồn tại</div>;

  const showToastMsg = (title: string, body: string) => {
    setToast({ title, body });
    setTimeout(() => setToast(null), 3000);
  };

  const speak = (word: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    } else {
      showToastMsg('Lỗi phát âm', 'Trình duyệt không hỗ trợ!');
    }
  };

  const activeVocab = vocabs[currentIndex];
  const activeState = activeVocab ? learned.find(l => l.vocabId === activeVocab.id) : null;
  const isCurrentFav = activeState?.isFavorite || false;
  const currentProf = activeState?.proficiency || 0;

  return (
    <div className="animate-fade-in-up">
      {toast && (
        <div className="fixed bottom-6 right-6 z-[600] bezel animate-fade-in-up">
          <div className="bezel-inner bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
            <div>
              <div className="text-xs font-bold text-gray-900 dark:text-gray-100">{toast.title}</div>
              <div className="text-[12px] text-muted font-medium">{toast.body}</div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/vocabulary" className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 hover:border-cyan-300 dark:hover:border-cyan-800 bg-white dark:bg-neutral-900 tactile">
            <ArrowLeft className="w-4 h-4 text-muted" strokeWidth={1.8} />
          </Link>
          <div>
            <h2 className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-gray-100">{theme.name}</h2>
            <p className="text-xs text-muted font-medium mt-0.5">{theme.nameEn} · Độ khó: {theme.difficulty}/5</p>
          </div>
        </div>

        {/* View Mode */}
        <div className="flex bg-black/[0.025] dark:bg-white/[0.025] p-1 rounded-full border border-black/[0.03] dark:border-white/[0.03] w-fit">
          <button 
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full ${viewMode === 'flashcard' ? 'bg-white dark:bg-neutral-900 text-primary-c shadow-sm' : 'text-muted'}`}
            style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
            onClick={() => setViewMode('flashcard')}
          >
            <Layers className="w-3.5 h-3.5" strokeWidth={1.8} /> Flashcard 3D
          </button>
          <button 
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full ${viewMode === 'list' ? 'bg-white dark:bg-neutral-900 text-primary-c shadow-sm' : 'text-muted'}`}
            style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
            onClick={() => setViewMode('list')}
          >
            <List className="w-3.5 h-3.5" strokeWidth={1.8} /> Danh sách
          </button>
        </div>
      </div>

      {/* Mode Render */}
      {viewMode === 'flashcard' && activeVocab && (
        <div className="max-w-md mx-auto animate-scale-in">
          {/* 3D Flipping Card — Double-Bezel */}
          <div className="bezel">
            <div className="perspective-[1000px] w-full" style={{ borderRadius: 'calc(var(--radius-3xl) - 6px)' }}>
              <div 
                className={`relative w-full h-80 rounded-[calc(var(--radius-3xl)-6px)] [transform-style:preserve-3d] cursor-pointer ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                style={{ transition: 'transform 700ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front Side */}
                <div className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-[calc(var(--radius-3xl)-6px)] p-8 flex flex-col items-center justify-center [backface-visibility:hidden] text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                  <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-extrabold text-cyan-500 mb-6 bg-cyan-500/10 px-2.5 py-1 rounded-full">
                    <RotateCcw className="w-3 h-3" strokeWidth={2} /> Bấm để lật
                  </span>
                  <h3 className="text-4xl font-extrabold text-primary-600 dark:text-cyan-400 mb-2 tracking-tight">{activeVocab.word}</h3>
                  <span className="text-xs bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full font-bold uppercase mb-3">
                    {activeVocab.pos}
                  </span>
                  <div className="text-gray-400 text-sm font-medium font-mono">{activeVocab.phonetic}</div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 rounded-[calc(var(--radius-3xl)-6px)] p-8 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.06) 0%, rgba(99, 102, 241, 0.03) 100%)' }}>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-emerald-500 mb-4 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    Ý nghĩa từ vựng
                  </span>
                  <h4 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">{activeVocab.definitionVn}</h4>
                  <p className="text-xs text-muted max-w-xs mb-5 leading-relaxed">{activeVocab.definition}</p>
                  <div className="bg-white/60 dark:bg-neutral-950/30 px-4 py-3 rounded-xl border border-black/[0.03] dark:border-white/[0.03] text-xs text-muted font-medium italic w-full max-w-xs leading-relaxed">
                    &quot;{activeVocab.examples[0]}&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flashcard Operations — Double-Bezel */}
          <div className="bezel mt-6">
            <div className="bezel-inner p-3 flex items-center justify-between">
              <button 
                className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 hover:border-cyan-300 dark:hover:border-cyan-800 bg-white dark:bg-neutral-900 tactile"
                onClick={() => {
                  setIsFlipped(false);
                  setTimeout(() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : vocabs.length - 1));
                  }, 150);
                }}
              >
                <ChevronLeft className="w-5 h-5 text-muted" strokeWidth={1.8} />
              </button>
              
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-bold text-muted">{currentIndex + 1} / {vocabs.length} từ</span>
                <div className="flex gap-2">
                  <button 
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900 tactile"
                    onClick={() => {
                      toggleFavorite(activeVocab.id);
                      showToastMsg('Yêu thích', !isCurrentFav ? 'Đã thêm từ vào mục yêu thích' : 'Đã bỏ từ khỏi mục yêu thích');
                    }}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isCurrentFav ? 'text-red-500 fill-red-500' : 'text-muted'}`} strokeWidth={1.8} />
                  </button>
                  <button 
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900 tactile"
                    onClick={() => speak(activeVocab.word)}
                  >
                    <Volume2 className="w-3.5 h-3.5 text-muted" strokeWidth={1.8} />
                  </button>
                  <button 
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900 tactile"
                    onClick={() => {
                      practiceWord(activeVocab.id, true);
                      awardXp(15);
                      showToastMsg('Rèn luyện', 'Đã ghi nhận ôn tập từ! +15 XP');
                    }}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              <button 
                className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 hover:border-cyan-300 dark:hover:border-cyan-800 bg-white dark:bg-neutral-900 tactile"
                onClick={() => {
                  setIsFlipped(false);
                  setTimeout(() => {
                    setCurrentIndex((prev) => (prev < vocabs.length - 1 ? prev + 1 : 0));
                  }, 150);
                }}
              >
                <ChevronRight className="w-5 h-5 text-muted" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List Mode View */}
      {viewMode === 'list' && (
        <div className="vocab-list grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up">
          {vocabs.map(v => {
            const state = learned.find(l => l.vocabId === v.id);
            const isFav = state?.isFavorite || false;
            const prof = state?.proficiency || 0;

            return (
              <div key={v.id} className="bezel lift group">
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
                      onClick={() => {
                        toggleFavorite(v.id);
                        showToastMsg('Yêu thích', !isFav ? 'Đã thêm từ vào mục yêu thích' : 'Đã bỏ từ khỏi mục yêu thích');
                      }}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-red-500 fill-red-500' : 'text-muted'}`} strokeWidth={1.8} />
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
                            i < prof ? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-neutral-800'
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
                          showToastMsg('Rèn luyện', 'Đã ghi nhận luyện từ! +15 XP');
                        }}
                      >
                        <Zap className="w-3.5 h-3.5" strokeWidth={2} /> Luyện
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}