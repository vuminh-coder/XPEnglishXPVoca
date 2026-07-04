'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_VOCABULARIES } from '@/lib/constants/vocabularies';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { useAuthStore } from '@/lib/store/authStore';
import { Brain, Layers, PenLine, Mic, Volume2, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function SpeakingPage() {
  const vocabs = MOCK_VOCABULARIES;
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const { practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();

  const speak = (word: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt không hỗ trợ nhận dạng giọng nói.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    
    setFeedback("Hệ thống đang lắng nghe...");
    setListening(true);

    recognition.onresult = async (event: any) => {
      const spokenText = event.results[0][0].transcript;
      const target = vocabs[index].word;
      
      setFeedback("Đang phân tích giọng nói...");

      try {
        const res = await fetch("/api/ai/pronunciation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spokenText, targetText: target })
        });
        const data = await res.json();
        
        if (data.success) {
          const isCorrect = data.isCorrect;
          practiceWord(vocabs[index].id, isCorrect);
          
          if (isCorrect) {
            setFeedback(`Chính xác! Bạn phát âm đúng (${data.score}%): "${spokenText}" (+15 XP)`);
            awardXp(15);
          } else {
            setFeedback(`Chưa chuẩn lắm (${data.score}%). Bạn phát âm: "${spokenText}" (Từ đúng: ${target}) (+5 XP)`);
            awardXp(5);
          }
        } else {
          throw new Error("API validation failed");
        }
      } catch (err) {
        console.error("Pronunciation sync error:", err);
        // Fallback to client-side direct matching
        const cleanSpoken = spokenText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const cleanTarget = target.toLowerCase();
        const isCorrect = cleanSpoken === cleanTarget;
        practiceWord(vocabs[index].id, isCorrect);
        
        if (isCorrect) {
          setFeedback(`Chính xác! Bạn phát âm đúng: "${spokenText}" (+15 XP)`);
          awardXp(15);
        } else {
          setFeedback(`Chưa chuẩn lắm! Bạn phát âm: "${spokenText}" (Từ đúng: ${target}) (+5 XP)`);
          awardXp(5);
        }
      }

      setTimeout(() => {
        setListening(false);
        setFeedback(null);
        setIndex((prev) => (prev + 1) % vocabs.length);
      }, 3000);
    };

    recognition.onerror = () => {
      setFeedback("Lỗi micro hoặc không nhận diện được giọng nói.");
      setListening(false);
    };

    recognition.start();
  };

  const modes = [
    { href: "/study/practice", label: 'Trắc nghiệm', icon: <Brain className="w-5 h-5" strokeWidth={1.8} />, active: false },
    { href: "/study/practice", label: 'Thẻ học', icon: <Layers className="w-5 h-5" strokeWidth={1.8} />, active: false },
    { href: "/study/writing", label: 'Luyện viết', icon: <PenLine className="w-5 h-5" strokeWidth={1.8} />, active: false },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Học tập và Rèn luyện</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Rèn luyện khả năng phát âm chuẩn IPA Mỹ thông qua micro AI phân tích giọng nói trực tiếp.
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
              <Mic className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">Luyện phát âm</div>
            <p className="text-[12px] text-muted leading-relaxed">Nhận diện giọng nói thông minh.</p>
          </div>
        </div>
      </div>

      {/* Arena — Double-Bezel */}
      <div id="practice-arena" className="animate-fade-in-up">
        <div className="bezel max-w-xl mx-auto">
          <div className="bezel-inner p-6 flex flex-col gap-6 text-center">
            <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em]">
              Luyện phát âm chuẩn Mỹ
            </h3>
            
            <div className="p-8 bg-neutral-50/50 dark:bg-neutral-900/30 rounded-[calc(var(--radius-3xl)-6px)] border border-black/[0.03] dark:border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <h1 className="text-4xl font-black text-primary-600 dark:text-cyan-400 tracking-tight mb-2">
                {vocabs[index]?.word}
              </h1>
              <p className="text-sm font-mono text-muted mb-4">{vocabs[index]?.phonetic} ({vocabs[index]?.pos})</p>
              <p className="text-xs text-gray-900 dark:text-gray-100 font-bold bg-white dark:bg-neutral-950 py-2 px-4 rounded-xl border border-black/5 dark:border-white/5 w-fit mx-auto shadow-sm">
                Nghĩa: {vocabs[index]?.definitionVn}
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 my-2">
              <div className="relative">
                {listening && (
                  <span className="absolute -inset-4 rounded-full bg-cyan-400/20 animate-ping"></span>
                )}
                <button 
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 transition-all duration-300 relative z-10 tactile ${
                    listening 
                      ? 'bg-gradient-to-tr from-red-500 to-rose-600 text-white animate-pulse' 
                      : 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-white'
                  }`}
                  onClick={startSpeechRecognition}
                  disabled={listening}
                >
                  <Mic className="w-8 h-8 text-white" strokeWidth={2} />
                </button>
              </div>

              <div className="flex justify-center gap-3">
                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-muted bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full tactile" onClick={() => speak(vocabs[index].word)}>
                  <Volume2 className="w-3.5 h-3.5" strokeWidth={1.8} /> Nghe phát âm mẫu
                </button>
                <button 
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full tactile"
                  onClick={startSpeechRecognition}
                  disabled={listening}
                >
                  <Mic className="w-3.5 h-3.5 animate-pulse" strokeWidth={2} /> {listening ? 'Hệ thống đang nghe...' : 'Bắt đầu nói'}
                </button>
              </div>
            </div>

            {feedback && (
              <div className={`p-4 rounded-xl border text-xs font-bold leading-relaxed flex items-center justify-center gap-2 ${
                feedback.includes('Chính xác') 
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                  : feedback.includes('Lỗi') 
                    ? 'bg-red-50 dark:bg-red-950/20 border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-neutral-50 dark:bg-neutral-900 border-black/[0.04] dark:border-white/[0.04] text-muted'
              }`}>
                {feedback.includes('Chính xác') ? <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} /> : <AlertCircle className="w-4 h-4" strokeWidth={1.8} />}
                <span>{feedback}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}