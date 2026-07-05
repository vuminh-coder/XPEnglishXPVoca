"use client";
import React, { useEffect, useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import {
  Trophy,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Database,
} from "lucide-react";
import Link from "next/link";

interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  difficulty: number;
  isFullTest: boolean;
  examType: {
    name: string;
    description: string;
  };
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const cardItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 15,
    },
  },
} as const;

export default function ExamsListPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchExams = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/exams");
      const json = await res.json();
      if (json.success && json.data) {
        setExams(json.data);
      }
    } catch (e) {
      console.error("Error fetching exams list:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/exams/seed");
      const json = await res.json();
      if (json.success) {
        alert("Đã khởi tạo đề thi mẫu thành công!");
        fetchExams();
      }
    } catch (e) {
      console.error("Error seeding exams:", e);
    } finally {
      setSeeding(false);
    }
  };

  const getDifficultyBadge = (difficulty: number) => {
    if (difficulty <= 2) return <Badge variant="success">Dễ</Badge>;
    if (difficulty === 3) return <Badge variant="primary">Trung bình</Badge>;
    return <Badge variant="danger">Khó</Badge>;
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8" suppressHydrationWarning>
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 85, damping: 15 }}
        className="bezel"
      >
        <div className="bezel-inner bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-6 md:p-8 text-white rounded-[calc(var(--radius-3xl)-6px)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/90">
                <Sparkles className="h-3.5 w-3.5 text-indigo-300 animate-pulse" />
                Cổng Thi Thử Luyện Đề
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight font-display">Thi Thử TOEIC & IELTS</h1>
              <p className="text-xs md:text-sm text-white/70 max-w-lg leading-relaxed font-medium">
                Hệ thống đề thi thử chuẩn hóa hỗ trợ chấm điểm quy đổi tức thì. Rèn luyện kỹ năng quản lý thời gian và phản xạ làm đề.
              </p>
            </div>
            
            {exams.length === 0 && (
              <Button
                variant="bezel"
                className="bg-white/10 border-white/25 hover:bg-white/20 text-white font-bold flex items-center gap-2 rounded-2xl py-3 px-4 self-start md:self-auto cursor-pointer"
                onClick={handleSeed}
                disabled={seeding}
              >
                <Database className="h-4 w-4 shrink-0" />
                {seeding ? "Đang tạo..." : "Khởi tạo đề thi mẫu"}
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex h-[30vh] flex-col items-center justify-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Đang tải danh sách đề thi...</p>
        </div>
      ) : exams.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bezel text-center py-12"
        >
          <div className="bezel-inner bg-white dark:bg-neutral-900 p-8 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 dark:bg-neutral-950 text-slate-400">
              <BookOpen className="h-7 w-7" />
            </div>
            <h3 className="text-sm md:text-base font-black text-slate-800 dark:text-slate-200">Không tìm thấy đề thi nào</h3>
            <p className="text-xs text-slate-500 dark:text-slate-450 max-w-xs mx-auto leading-relaxed">
              Nhấp vào nút "Khởi tạo đề thi mẫu" phía trên để tạo sẵn các đề thi thử TOEIC và IELTS mẫu vào database.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2"
        >
          {exams.map((exam) => (
            <motion.div
              variants={cardItemVariants}
              whileHover={{ translateY: -3 }}
              key={exam.id}
              className="bezel"
            >
              <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between h-full gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={exam.examType.name.toUpperCase() === "TOEIC" ? "primary" : "legendary"}>
                      {exam.examType.name}
                    </Badge>
                    <div className="flex gap-2">
                      {getDifficultyBadge(exam.difficulty)}
                      {exam.isFullTest && <Badge variant="neutral">Full Test</Badge>}
                    </div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white line-clamp-1 font-display">
                    {exam.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-550 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {exam.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-neutral-850 pt-4 mt-2">
                  <div className="flex gap-4 text-[10px] md:text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{exam.duration} phút</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="h-4 w-4 text-slate-400" />
                      <span>{exam.totalQuestions} câu hỏi</span>
                    </div>
                  </div>

                  <Link href={`/study/exams/${exam.id}`}>
                    <Button variant="primary" size="sm" className="font-bold flex items-center gap-1 rounded-xl cursor-pointer">
                      Vào thi
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

