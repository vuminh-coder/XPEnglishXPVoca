"use client";

import React from "react";
import {
  Headphones,
  GraduationCap,
  Sparkles,
  Mic,
  PenTool,
  Clock,
  HelpCircle,
} from "lucide-react";
import { ExamPaper } from "@/features/exam-prep/data/exam-papers/types";

interface ExamPaperCoverProps {
  exam: ExamPaper;
  className?: string;
}

// Dedicated 1-to-1 Mapping: Mỗi bài thi sở hữu một ảnh nghệ thuật độc bản riêng biệt
const EXAM_SPECIFIC_COVERS: Record<string, string> = {
  // TOEIC
  toeic_lr_2026_01: "/images/exams/cover-toeic-lr.jpg",
  toeic_lr_2026_02: "/images/exams/cover-toeic-02.jpg",
  toeic_full_4k_01: "/images/exams/cover-toeic-master.jpg",
  toeic_sw_2026_01: "/images/exams/cover-toeic-sw.jpg",
  toeic_sw_2026_02: "/images/exams/cover-toeic-sw.jpg",
  toeic_mini_speed_01: "/images/exams/cover-mini-speed.jpg",
  // IELTS
  ielts_academic_4k_01: "/images/exams/cover-ielts-academic.jpg",
  ielts_speaking_pro_01: "/images/exams/cover-ielts-speaking.jpg",
  ielts_writing_master_01: "/images/exams/cover-ielts-writing.jpg",
  ielts_academic_4k_02: "/images/exams/cover-ielts-02.jpg",
  ielts_academic_4k_03: "/images/exams/cover-ielts-academic.jpg",
  ielts_academic_4k_04: "/images/exams/cover-ielts-02.jpg",
  ielts_speaking_pro_02: "/images/exams/cover-ielts-speaking.jpg",
  ielts_writing_master_02: "/images/exams/cover-ielts-writing.jpg",
};

export function ExamPaperCover({ exam, className = "" }: ExamPaperCoverProps) {
  const isIelts = exam.type.includes("IELTS");
  const isSpeakingOnly =
    exam.type === "IELTS_SPEAKING" ||
    (exam.supportedSkills.length === 1 && exam.supportedSkills.includes("SPEAKING")) ||
    (exam.title.toLowerCase().includes("speaking") && !exam.title.toLowerCase().includes("writing"));
  const isWritingOnly =
    exam.type === "IELTS_WRITING" ||
    (exam.supportedSkills.length === 1 && exam.supportedSkills.includes("WRITING")) ||
    (exam.title.toLowerCase().includes("writing") && !exam.title.toLowerCase().includes("speaking"));
  const isSpeakingWriting =
    exam.type === "TOEIC_SPEAKING_WRITING" ||
    (exam.title.toLowerCase().includes("speaking") && exam.title.toLowerCase().includes("writing"));
  const isMini = exam.type === "TOEIC_MINI" || exam.tags.includes("AI");

  // Extract clean title and test number for unique identification
  const testNumberMatch = exam.id.match(/_(\d+)$/) || exam.title.match(/(\d+)/);
  const testNumber = testNumberMatch ? testNumberMatch[1].padStart(2, "0") : null;
  const cleanTitle = exam.title
    .replace(/\s*#?\d+\s*(\s*\(.*\))?$/, "")
    .replace(/\s*#.*$/, "")
    .trim();
  // Khử lặp từ: OFFICIAL EDITION • 01 (không lặp từ TEST 2 lần)
  const subtitle = testNumber ? `OFFICIAL EDITION • ${testNumber}` : "OFFICIAL EDITION";

  // Determine Visual Palette & Academic Cover Image (Pristine, 100% Text-Free Art, 1-to-1 Unique)
  let coverImage = EXAM_SPECIFIC_COVERS[exam.id];
  let brandTag = "ETS TOEIC";
  let BrandIcon = Headphones;

  if (isIelts) {
    if (isSpeakingOnly) {
      coverImage = coverImage || "/images/exams/cover-ielts-speaking.jpg";
      brandTag = "IELTS SPEAKING";
      BrandIcon = Mic;
    } else if (isWritingOnly) {
      coverImage = coverImage || "/images/exams/cover-ielts-writing.jpg";
      brandTag = "IELTS WRITING";
      BrandIcon = PenTool;
    } else {
      coverImage =
        coverImage ||
        (Number(testNumber || 1) % 2 === 0
          ? "/images/exams/cover-ielts-02.jpg"
          : "/images/exams/cover-ielts-academic.jpg");
      brandTag = "IELTS ACADEMIC";
      BrandIcon = GraduationCap;
    }
  } else if (isSpeakingWriting) {
    coverImage = coverImage || "/images/exams/cover-toeic-sw.jpg";
    brandTag = "SPEAK & WRITE";
    BrandIcon = Mic;
  } else if (isMini) {
    coverImage = coverImage || "/images/exams/cover-mini-speed.jpg";
    brandTag = "MINI SPEED";
    BrandIcon = Sparkles;
  } else {
    // TOEIC LR - Luân phiên đa dạng theo số thứ tự đề
    if (!coverImage) {
      const num = Number(testNumber || 1);
      if (num % 3 === 1) coverImage = "/images/exams/cover-toeic-lr.jpg";
      else if (num % 3 === 2) coverImage = "/images/exams/cover-toeic-02.jpg";
      else coverImage = "/images/exams/cover-toeic-master.jpg";
    }
  }

  // Format Level compactly without wrapping
  const levelBadge =
    exam.level === "Beginner"
      ? "A2 Basic"
      : exam.level === "Intermediate"
      ? "B1 • B2"
      : "C1 Advanced";

  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden shrink-0 bg-slate-900 text-white select-none border-b border-slate-100 dark:border-slate-800/80 ${className}`}
    >
      {/* 1. Pristine 3D Minimalist Artwork (Absolutely 0% Text in Image - Zero Collision) */}
      <img
        src={coverImage}
        alt={cleanTitle}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
        loading="lazy"
      />

      {/* 2. Soft Bottom Directional Scrim (Leaves top & center bright & natural, protects text readability at bottom) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

      {/* 3. Subtle Ambient Light Tone on Hover */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors pointer-events-none" />

      {/* 4. Content Container */}
      <div className="relative h-full p-3 sm:p-3.5 flex flex-col justify-between z-10">
        {/* Top Header: Kính mờ siêu nhẹ trong suốt (Glassmorphism), không còn khối đen dán băng dính */}
        <div className="flex items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 font-mono shadow-2xs whitespace-nowrap">
            <BrandIcon className="w-3 h-3 text-white/95 shrink-0" strokeWidth={2.2} />
            <span>{brandTag}</span>
          </span>

          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-white/15 hover:bg-white/20 text-white/95 backdrop-blur-md border border-white/25 shadow-2xs whitespace-nowrap">
            {levelBadge}
          </span>
        </div>

        {/* Center/Bottom: Typography sắc nét, thoáng đãng, không đè nát bức ảnh */}
        <div className="my-auto py-1">
          <span className="text-[10px] font-mono font-bold text-sky-200/90 uppercase tracking-wider block mb-1 drop-shadow-xs">
            {subtitle}
          </span>
          <span className="text-[15px] sm:text-base font-black font-display text-white tracking-tight leading-snug line-clamp-2 drop-shadow-md">
            {cleanTitle}
          </span>
        </div>

        {/* Bottom Metrics Bar: Đồng bộ 100% hai bên, bỏ đường line ngang cắt vụn ảnh */}
        <div className="flex items-center justify-between gap-2 pt-1 text-[10.5px] font-mono font-semibold">
          <span className="inline-flex items-center gap-1.5 text-slate-200/90">
            <Clock className="w-3.5 h-3.5 text-sky-300 shrink-0" strokeWidth={2.2} />
            <span>{exam.timeLimitMinutes} phút</span>
          </span>

          <span className="inline-flex items-center gap-1.5 text-slate-200/90">
            <HelpCircle className="w-3.5 h-3.5 text-sky-300 shrink-0" strokeWidth={2.2} />
            <span>{exam.totalQuestions} câu hỏi</span>
          </span>
        </div>
      </div>
    </div>
  );
}
