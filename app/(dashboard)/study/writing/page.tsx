'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_VOCABULARIES } from '@/lib/constants/vocabularies';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { useAuthStore } from '@/lib/store/authStore';
import { Brain, Layers, PenLine, Mic, Volume2, CheckCircle2, XCircle } from 'lucide-react';

export default function WritingPage() {
  const vocabs = MOCK_VOCABULARIES;
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const { practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();

  const speak = (word: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  const checkAnswer = () => {
    if (isAnswered) return;
    setIsAnswered(true);

    const isCorrect = input.trim().toLowerCase() === vocabs[index].word.toLowerCase();
    
    practiceWord(vocabs[index].id, isCorrect);
    const xp = isCorrect ? 15 : 5;
    awardXp(xp);

    if (isCorrect) {
      setFeedback(`Chính xác! Đáp án là "${vocabs[index].word}". (+15 XP)`);
    } else {
      setFeedback(`Chưa đúng! Đáp án đúng là: "${vocabs[index].word}". Bạn đã viết: "${input}" (+5 XP)`);
    }

    setTimeout(() => {
      setFeedback(null);
      setInput('');
      setIsAnswered(false);
      setIndex((index + 1) % vocabs.length);
    }, 2500);
  };

  const modes = [
    { href: "/study/practice", label: 'Trắc nghiệm', icon: <Brain className="w-5 h-5" strokeWidth={1.8} /> },
    { href: "/study/practice", label: 'Thẻ học', icon: <Layers className="w-5 h-5" strokeWidth={1.8} /> },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Học tập và Rèn luyện</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Ghi nhớ sâu sắc và thành thạo cách viết chính tả của từ vựng thông qua thực hành viết.
        </p>
      </div>

      {/* Mode Selector — Double-Bezel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-scale-in">
        {modes.map(m => (
          <Link key={m.href} href={m.href} className="bezel tactile block">
            <div className="bezel-inner p-5 flex flex-col items-center text-center">
              <div className="icon-well bg-neutral-100 dark:bg-neutral-800 text-muted mb-3">
                {m.icon}
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">{m.label}</div>
              <p className="text-[12px] text-muted leading-relaxed">Chuyển sang chế độ học tập này.</p>
            </div>
          </Link>
        ))}

        <div className="bezel border-cyan-400 dark:border-cyan-700">
          <div className="bezel-inner p-5 flex flex-col items-center text-center">
            <div className="icon-well bg-cyan-50 dark:bg-cyan-950/30 text-cyan-500 mb-3">
              <PenLine className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">Luyện viết</div>
            <p className="text-[12px] text-muted leading-relaxed">Ghi nhớ chính xác cách viết từ.</p>
          </div>
        </div>

        <Link href="/study/speaking" className="bezel tactile block">
          <div className="bezel-inner p-5 flex flex-col items-center text-center">
            <div className="icon-well bg-neutral-100 dark:bg-neutral-800 text-muted mb-3">
              <Mic className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">Luyện phát âm</div>
            <p className="text-[12px] text-muted leading-relaxed">Micro nhận diện phát âm chuẩn.</p>
          </div>
        </Link>
      </div>

      {/* Arena — Double-Bezel */}
      <div id="practice-arena" className="animate-fade-in-up">
        <div className="bezel max-w-xl mx-auto">
          <div className="bezel-inner p-6 flex flex-col gap-6">
            {/* Progress */}
            <div className="w-full">
              <div className="flex justify-between items-center text-xs text-muted mb-2 font-medium">
                <span>Dịch câu {index + 1}/{vocabs.length}</span>
                <span className="text-cyan-500 font-bold">Tiến trình: {Math.round((index / vocabs.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" 
                  style={{ width: `${(index / vocabs.length) * 100}%`, transition: 'width 700ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                ></div>
              </div>
            </div>

            {/* Prompt */}
            <div className="text-center p-8 bg-neutral-50/50 dark:bg-neutral-900/30 rounded-[calc(var(--radius-3xl)-6px)] border border-black/[0.03] dark:border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="text-[12px] text-muted font-bold tracking-[0.15em] uppercase mb-2">Hãy dịch từ sau sang tiếng Anh:</div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
                {vocabs[index]?.definitionVn}
              </h2>
              <p className="text-xs text-muted font-medium">
                Gợi ý phiên âm: <span className="font-mono">{vocabs[index]?.phonetic}</span> ({vocabs[index]?.pos})
              </p>
            </div>

            {/* Input */}
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                className="w-full py-4 text-center text-xl font-extrabold rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] focus:outline-none focus:border-cyan-450" 
                style={{ transition: 'border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isAnswered}
                placeholder="Gõ từ tại đây..." 
                autoComplete="off"
                onKeyPress={e => e.key === 'Enter' && checkAnswer()}
              />
              
              {feedback && (
                <div className={`p-4 rounded-xl border text-xs font-bold leading-relaxed flex items-center justify-center gap-2 ${
                  feedback.includes('Chính xác') 
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-red-50 dark:bg-red-950/20 border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  {feedback.includes('Chính xác') ? <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2.5} /> : <XCircle className="w-4 h-4 text-red-500" strokeWidth={2.5} />}
                  <span>{feedback}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-muted bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full tactile" onClick={() => speak(vocabs[index].word)}>
                <Volume2 className="w-3.5 h-3.5" strokeWidth={1.8} /> Phát âm gợi ý
              </button>
              <button 
                className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold px-6 py-2.5 tactile shadow-sm disabled:opacity-40" 
                disabled={isAnswered || !input.trim()} 
                onClick={checkAnswer}
              >
                Kiểm tra kết quả
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}