"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MOCK_VOCABULARIES } from "@/lib/constants/vocabularies";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { useAuthStore } from "@/lib/store/authStore";
import {
  Brain,
  Layers,
  PenLine,
  Mic,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Clock3,
  Trophy,
} from "lucide-react";

export default function PracticeQuizPage() {
  const vocabs = MOCK_VOCABULARIES;
  const [subMode, setSubMode] = useState<"quiz" | "flashcard">("quiz");

  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qXp, setQXp] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const [fIndex, setFIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();

  const currentWord = vocabs[qIndex];
  const options = React.useMemo(() => {
    if (!currentWord || vocabs.length === 0) return [];

    const otherWords = vocabs.filter((v) => v.id !== currentWord.id);
    const decoys = otherWords.slice(0, 3);
    return [currentWord, ...decoys];
  }, [currentWord, vocabs]);

  const handleQuizAnswer = (optId: string) => {
    if (isAnswered) return;
    setSelectedOpt(optId);
    setIsAnswered(true);

    const correctId = vocabs[qIndex].id;
    const isCorrect = optId === correctId;

    practiceWord(correctId, isCorrect);
    const xpEarned = isCorrect ? 15 : 5;
    awardXp(xpEarned);
    setQXp((prev) => prev + xpEarned);
    if (isCorrect) setQScore((prev) => prev + 1);

    setTimeout(() => {
      setQIndex((prev) => (prev + 1) % vocabs.length);
      setSelectedOpt(null);
      setIsAnswered(false);
    }, 1500);
  };

  const handleFlashcardResult = (correct: boolean) => {
    practiceWord(vocabs[fIndex].id, correct);
    const xpEarned = correct ? 15 : 5;
    awardXp(xpEarned);
    setIsFlipped(false);
    setFIndex((prev) => (prev + 1) % vocabs.length);
  };

  const modes = [
    {
      key: "quiz" as const,
      label: "Trắc nghiệm",
      desc: "Chọn nghĩa đúng của từ vựng.",
      icon: <Brain className="h-5 w-5" strokeWidth={1.8} />,
    },
    {
      key: "flashcard" as const,
      label: "Thẻ học",
      desc: "Phương pháp lật hai mặt ghi nhớ.",
      icon: <Layers className="h-5 w-5" strokeWidth={1.8} />,
    },
  ];

  const progressPercent = Math.round(
    (qIndex / Math.max(1, vocabs.length)) * 100,
  );

  return (
    <div className="animate-fade-in space-y-6">
      <div className="page-header animate-fade-in-down">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">
          Học tập và rèn luyện
        </h1>
        <p
          className="page-subtitle text-muted max-w-2xl"
          style={{ marginTop: "6px" }}
        >
          Một phiên học ngắn, tập trung và có phản hồi ngay lập tức.
        </p>
      </div>

      <div className="bezel">
        <div className="bezel-inner rounded-[30px] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-6 text-white md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                Focus session
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                5 phút học là đủ để giữ streak sống động
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/75 sm:text-base">
                Chọn chế độ học phù hợp, làm vài câu và nhận điểm XP ngay trong
                lần đầu tiên.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <Clock3 className="h-5 w-5 text-cyan-300" />
              <div>
                <div className="text-sm font-semibold text-white">
                  Phiên học ngắn
                </div>
                <div className="text-xs text-white/70">Tối ưu cho mobile</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modes.map((mode) => (
          <button
            key={mode.key}
            type="button"
            onClick={() => setSubMode(mode.key)}
            className={`bezel text-left ${subMode === mode.key ? "ring-2 ring-sky-400" : ""}`}
          >
            <div className="bezel-inner flex flex-col items-start p-5">
              <div
                className={`mb-3 rounded-2xl p-2.5 ${subMode === mode.key ? "bg-sky-100 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400" : "bg-neutral-100 text-muted dark:bg-neutral-800"}`}
              >
                {mode.icon}
              </div>
              <div className="text-sm font-black text-gray-900 dark:text-gray-100">
                {mode.label}
              </div>
              <p className="mt-1 text-sm text-muted">{mode.desc}</p>
            </div>
          </button>
        ))}

        <Link href="/study/writing" className="bezel block">
          <div className="bezel-inner flex flex-col items-start p-5">
            <div className="mb-3 rounded-2xl bg-neutral-100 p-2.5 text-muted dark:bg-neutral-800">
              <PenLine className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div className="text-sm font-black text-gray-900 dark:text-gray-100">
              Luyện viết
            </div>
            <p className="mt-1 text-sm text-muted">
              Ghi nhớ chính xác cách viết từ.
            </p>
          </div>
        </Link>

        <Link href="/study/speaking" className="bezel block">
          <div className="bezel-inner flex flex-col items-start p-5">
            <div className="mb-3 rounded-2xl bg-neutral-100 p-2.5 text-muted dark:bg-neutral-800">
              <Mic className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div className="text-sm font-black text-gray-900 dark:text-gray-100">
              Luyện phát âm
            </div>
            <p className="mt-1 text-sm text-muted">
              Micro nhận diện phát âm chuẩn.
            </p>
          </div>
        </Link>
      </div>

      <div id="practice-arena" className="animate-fade-in-up">
        {subMode === "quiz" ? (
          <div className="mx-auto max-w-2xl">
            <div className="bezel">
              <div className="bezel-inner flex flex-col gap-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
                      Câu {qIndex + 1}/{vocabs.length}
                    </p>
                    <div className="mt-1 text-sm font-semibold text-slate-600">
                      Điểm: {qScore} · +{qXp} XP
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-600 dark:bg-sky-950/30">
                    <Trophy className="h-4 w-4" />
                    Mục tiêu hôm nay
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="rounded-[24px] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-8 text-center dark:border-sky-900/40 dark:from-sky-950/20 dark:to-neutral-900">
                  <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    {vocabs[qIndex]?.word}
                  </h2>
                  <div className="mt-3 text-sm text-muted">
                    Phiên âm:{" "}
                    <span className="font-mono">
                      {vocabs[qIndex]?.phonetic}
                    </span>{" "}
                    · {vocabs[qIndex]?.pos}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {options.map((opt) => {
                    let statusClass =
                      "border border-slate-200/70 bg-white text-left text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-neutral-900 dark:text-slate-200";
                    if (isAnswered) {
                      if (opt.id === vocabs[qIndex].id) {
                        statusClass =
                          "border border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400";
                      } else if (selectedOpt === opt.id) {
                        statusClass =
                          "border border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400";
                      } else {
                        statusClass += " opacity-70";
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`rounded-2xl px-4 py-3 transition-all ${statusClass}`}
                        onClick={() => handleQuizAnswer(opt.id)}
                        disabled={isAnswered}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span>{opt.definitionVn}</span>
                          {isAnswered && opt.id === vocabs[qIndex].id ? (
                            <Check className="h-4 w-4" strokeWidth={2.5} />
                          ) : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-md">
            <div className="bezel mb-4">
              <div className="bezel-inner p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-muted">
                  <span>Flashcard</span>
                  <span>
                    {fIndex + 1}/{vocabs.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bezel">
              <div className="perspective-[1000px] w-full">
                <div
                  className={`relative h-80 w-full rounded-[30px] [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
                  style={{
                    transition:
                      "transform 700ms cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[30px] bg-white p-8 text-center [backface-visibility:hidden] dark:bg-neutral-900">
                    <span className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-sky-600 dark:bg-sky-950/30">
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
                      Bấm để lật
                    </span>
                    <div className="mb-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800">
                      {vocabs[fIndex]?.pos}
                    </div>
                    <h3 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                      {vocabs[fIndex]?.word}
                    </h3>
                    <p className="mt-2 font-mono text-sm text-slate-500">
                      {vocabs[fIndex]?.phonetic}
                    </p>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[30px] bg-gradient-to-br from-sky-50 to-violet-50 p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] dark:from-sky-950/20 dark:to-violet-950/20">
                    <span className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:bg-emerald-950/30">
                      Nghĩa của từ
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                      {vocabs[fIndex]?.definitionVn}
                    </h3>
                    <p className="mt-3 text-sm text-muted">
                      {vocabs[fIndex]?.definition}
                    </p>
                    <div className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-sm text-slate-600 shadow-sm dark:bg-neutral-900/70 dark:text-slate-300">
                      “{vocabs[fIndex]?.examples[0]}”
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bezel mt-4">
              <div className="bezel-inner flex items-center justify-between p-3">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 dark:border-rose-900/30 dark:bg-rose-950/20"
                  onClick={() => handleFlashcardResult(false)}
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Đã quên
                </button>
                <span className="text-xs font-semibold text-muted">
                  Lưu lại phản hồi
                </span>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600 dark:border-emerald-900/30 dark:bg-emerald-950/20"
                  onClick={() => handleFlashcardResult(true)}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Đã thuộc
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
