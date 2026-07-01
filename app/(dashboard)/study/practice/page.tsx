'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_VOCABULARIES } from '@/lib/constants';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { useAuthStore } from '@/lib/store/authStore';
import { Brain, Layers, PenLine, Mic, Check, X, RotateCcw, ArrowRight } from 'lucide-react';

export default function PracticeQuizPage() {
  const vocabs = MOCK_VOCABULARIES;
  const [subMode, setSubMode] = useState<'quiz' | 'flashcard'>('quiz');
  
  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qXp, setQXp] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  const [fIndex, setFIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();

  React.useEffect(() => {
    if (vocabs.length === 0) return;
    const currentWord = vocabs[qIndex];
    const otherWords = vocabs.filter(v => v.id !== currentWord.id);
    const shuffledDecoys = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [currentWord, ...shuffledDecoys].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setSelectedOpt(null);
    setIsAnswered(false);
  }, [qIndex, vocabs]);

  const handleQuizAnswer = (optId: string) => {
    if (isAnswered) return;
    setSelectedOpt(optId);
    setIsAnswered(true);

    const correctId = vocabs[qIndex].id;
    const isCorrect = optId === correctId;
    
    practiceWord(correctId, isCorrect);
    const xpEarned = isCorrect ? 15 : 5;
    awardXp(xpEarned);
    setQXp(prev => prev + xpEarned);
    if (isCorrect) setQScore(prev => prev + 1);

    setTimeout(() => {
      setQIndex(prev => (prev + 1) % vocabs.length);
    }, 1500);
  };

  const handleFlashcardResult = (correct: boolean) => {
    practiceWord(vocabs[fIndex].id, correct);
    const xpEarned = correct ? 15 : 5;
    awardXp(xpEarned);
    setIsFlipped(false);
    setFIndex(prev => (prev + 1) % vocabs.length);
  };

  const modes = [
    { key: 'quiz' as const, label: 'Trắc nghiệm', desc: 'Chọn nghĩa đúng của từ vựng.', icon: <Brain className="w-5 h-5" strokeWidth={1.8} />, accent: 'cyan' },
    { key: 'flashcard' as const, label: 'Thẻ học', desc: 'Phương pháp lật hai mặt ghi nhớ.', icon: <Layers className="w-5 h-5" strokeWidth={1.8} />, accent: 'indigo' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Học tập và Rèn luyện</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Phương pháp rèn luyện ghi nhớ chuyên sâu qua trắc nghiệm, flashcard, luyện viết và phát âm.
        </p>
      </div>

      {/* Mode Selector — Double-Bezel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-scale-in">
        {modes.map(m => (
          <div
            key={m.key}
            onClick={() => setSubMode(m.key)}
            className={`bezel cursor-pointer tactile ${subMode === m.key ? 'border-cyan-400 dark:border-cyan-700' : ''}`}
            style={{ transition: 'border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
          >
            <div className="bezel-inner p-5 flex flex-col items-center text-center">
              <div className={`icon-well ${subMode === m.key ? 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-500' : 'bg-neutral-100 dark:bg-neutral-800 text-muted'} mb-3`} style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                {m.icon}
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">{m.label}</div>
              <p className="text-[10px] text-muted leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}

        <Link href="/study/writing" className="bezel tactile block">
          <div className="bezel-inner p-5 flex flex-col items-center text-center">
            <div className="icon-well bg-neutral-100 dark:bg-neutral-800 text-muted mb-3">
              <PenLine className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">Luyện viết</div>
            <p className="text-[10px] text-muted leading-relaxed">Ghi nhớ chính xác cách viết từ.</p>
          </div>
        </Link>

        <Link href="/study/speaking" className="bezel tactile block">
          <div className="bezel-inner p-5 flex flex-col items-center text-center">
            <div className="icon-well bg-neutral-100 dark:bg-neutral-800 text-muted mb-3">
              <Mic className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">Luyện phát âm</div>
            <p className="text-[10px] text-muted leading-relaxed">Micro nhận diện phát âm chuẩn.</p>
          </div>
        </Link>
      </div>

      <div id="practice-arena" className="animate-fade-in-up">
        {subMode === 'quiz' ? (
          <div className="bezel max-w-xl mx-auto">
            <div className="bezel-inner p-6 flex flex-col gap-6">
              {/* Progress */}
              <div className="w-full">
                <div className="flex justify-between items-center text-xs text-muted mb-2 font-medium">
                  <span>Câu {qIndex + 1}/{vocabs.length}</span>
                  <span className="text-cyan-500 font-bold">Điểm: {qScore} · +{qXp} XP</span>
                </div>
                <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" 
                    style={{ width: `${(qIndex / vocabs.length) * 100}%`, transition: 'width 700ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="text-center p-8 bg-neutral-50/50 dark:bg-neutral-900/30 rounded-[calc(var(--radius-3xl)-6px)] border border-black/[0.03] dark:border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <h2 className="text-3xl font-extrabold text-primary-600 dark:text-cyan-400 tracking-tight mb-2">
                  {vocabs[qIndex]?.word}
                </h2>
                <div className="text-xs text-muted font-medium">
                  Phiên âm: <span className="font-mono">{vocabs[qIndex]?.phonetic}</span> ({vocabs[qIndex]?.pos})
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {options.map((opt, idx) => {
                  let statusClass = 'bg-white dark:bg-neutral-900 border-black/[0.04] dark:border-white/[0.04]';
                  if (isAnswered) {
                    if (opt.id === vocabs[qIndex].id) {
                      statusClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400';
                    } else if (selectedOpt === opt.id) {
                      statusClass = 'border-red-400 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400';
                    }
                    statusClass += ' opacity-75 cursor-not-allowed';
                  } else {
                    statusClass += ' hover:border-cyan-300 dark:hover:border-cyan-800 hover:translate-x-1';
                  }
                  
                  return (
                    <button 
                      key={idx} 
                      className={`p-4 rounded-xl border text-sm font-bold text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center justify-between ${statusClass} tactile`}
                      style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                      onClick={() => handleQuizAnswer(opt.id)}
                      disabled={isAnswered}
                    >
                      <span>{opt.definitionVn}</span>
                      {isAnswered && opt.id === vocabs[qIndex].id && (
                        <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="max-w-sm w-full">
              {/* 3D Flipping Flashcard — Double-Bezel */}
              <div className="bezel mb-6">
                <div className="perspective-[1000px] w-full" style={{ borderRadius: 'calc(var(--radius-3xl) - 6px)' }}>
                  <div 
                    className={`relative w-full h-80 rounded-[calc(var(--radius-3xl)-6px)] [transform-style:preserve-3d] cursor-pointer ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                    style={{ transition: 'transform 700ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-[calc(var(--radius-3xl)-6px)] p-8 flex flex-col items-center justify-center [backface-visibility:hidden] text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                      <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-extrabold text-cyan-500 mb-6 bg-cyan-500/10 px-2.5 py-1 rounded-full">
                        <RotateCcw className="w-3 h-3" strokeWidth={2} /> Bấm để lật
                      </span>
                      <span className="text-xs bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full font-bold uppercase mb-3">
                        {vocabs[fIndex]?.pos}
                      </span>
                      <h2 className="text-4xl font-extrabold text-primary-600 dark:text-cyan-400 mb-2 tracking-tight">{vocabs[fIndex]?.word}</h2>
                      <div className="text-gray-400 text-sm font-medium font-mono">{vocabs[fIndex]?.phonetic}</div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 rounded-[calc(var(--radius-3xl)-6px)] p-8 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.06) 0%, rgba(99, 102, 241, 0.03) 100%)' }}>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-emerald-500 mb-4 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                        Nghĩa của từ
                      </span>
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">{vocabs[fIndex]?.definitionVn}</h3>
                      <p className="text-xs text-muted max-w-xs mb-5 leading-relaxed">{vocabs[fIndex]?.definition}</p>
                      <div className="bg-white/60 dark:bg-neutral-950/30 px-4 py-3 rounded-xl border border-black/[0.03] dark:border-white/[0.03] text-xs text-muted font-medium italic w-full max-w-xs leading-relaxed">
                        &quot;{vocabs[fIndex]?.examples[0]}&quot;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="bezel">
                <div className="bezel-inner p-3 flex items-center justify-between">
                  <button 
                    className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-full py-2 px-4 tactile border border-red-200/50 dark:border-red-900/30" 
                    onClick={() => handleFlashcardResult(false)}
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2.5} /> Đã quên
                  </button>
                  <span className="text-xs font-bold text-muted">{fIndex + 1} / {vocabs.length}</span>
                  <button 
                    className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full py-2 px-4 tactile border border-emerald-200/50 dark:border-emerald-900/30" 
                    onClick={() => handleFlashcardResult(true)}
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> Đã thuộc
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}