"use client";
import React, { useEffect, useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
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
    <div className="mx-auto max-w-5xl animate-fade-in space-y-8">
      {/* Banner */}
      <div className="bezel">
        <div className="bezel-inner bg-gradient-to-br from-indigo-905 via-slate-900 to-indigo-950 p-6 md:p-8 text-white rounded-[30px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                <Sparkles className="h-3.5 w-3.5" />
                Cổng Thi Thử Luyện Đề
              </div>
              <h1 className="text-3xl font-black tracking-tight">Thi Thử TOEIC & IELTS</h1>
              <p className="text-sm text-white/70 max-w-lg">
                Hệ thống đề thi thử chuẩn hóa hỗ trợ chấm điểm quy đổi tức thì. Rèn luyện kỹ năng quản lý thời gian và phản xạ làm đề.
              </p>
            </div>
            
            {exams.length === 0 && (
              <Button
                variant="bezel"
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white font-bold flex items-center gap-2 rounded-2xl py-3 px-4 self-start md:self-auto"
                onClick={handleSeed}
                disabled={seeding}
              >
                <Database className="h-4 w-4" />
                {seeding ? "Đang tạo..." : "Khởi tạo đề thi mẫu"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[30vh] flex-col items-center justify-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
          <p className="text-xs text-muted font-bold">Đang tải danh sách đề thi...</p>
        </div>
      ) : exams.length === 0 ? (
        <div className="bezel text-center py-12">
          <div className="bezel-inner bg-white dark:bg-neutral-900 p-8 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400">
              <BookOpen className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">Không tìm thấy đề thi nào</h3>
            <p className="text-sm text-muted max-w-xs mx-auto">
              Nhấp vào nút "Khởi tạo đề thi mẫu" phía trên để tạo sẵn các đề thi thử TOEIC và IELTS mẫu vào database.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {exams.map((exam) => (
            <div key={exam.id} className="bezel">
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
                  
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 line-clamp-1">
                    {exam.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">
                    {exam.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-neutral-800 pt-4 mt-2">
                  <div className="flex gap-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{exam.duration} phút</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      <span>{exam.totalQuestions} câu hỏi</span>
                    </div>
                  </div>

                  <Link href={`/study/exams/${exam.id}`}>
                    <Button variant="primary" size="sm" className="font-bold flex items-center gap-1 rounded-xl">
                      Vào thi
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
