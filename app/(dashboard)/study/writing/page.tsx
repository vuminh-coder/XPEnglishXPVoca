"use client";
import React, { useState } from "react";
import { Button, Card, Badge } from "@/components/ui";
import {
  PenTool,
  Trophy,
  Sparkles,
  FileText,
  FileCheck,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  desc: string;
  type: string;
}

const SAMPLE_TOPICS: Topic[] = [
  {
    id: "ielts-t2",
    type: "IELTS Writing Task 2",
    title: "Artificial Intelligence & Human Labor",
    desc: "Some people believe that the development of artificial intelligence will lead to mass unemployment. Others argue it will create new career pathways. Discuss both views and give your opinion.",
  },
  {
    id: "toeic-w1",
    type: "TOEIC Writing Part 3",
    title: "Write an Opinion Essay about Remote Work",
    desc: "Write an essay stating your opinion about whether working from home is beneficial for employees and employers. Give specific reasons and examples to support your view.",
  },
];

export default function WritingPracticePage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(SAMPLE_TOPICS[0]);
  const [essay, setEssay] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const wordCount = essay.trim() === "" ? 0 : essay.trim().split(/\s+/).length;

  const handleEvaluate = async () => {
    if (wordCount < 10) {
      alert("Bài viết quá ngắn. Vui lòng nhập tối thiểu 10 từ.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic.desc,
          essay,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setFeedback(json.data);
      } else {
        alert(json.error || "Không thể chấm bài!");
      }
    } catch (e) {
      console.error("Error evaluating essay:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl animate-fade-in space-y-6">
      {/* Page Header */}
      <div className="page-header animate-fade-in-down">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">
          AI IELTS/TOEIC Writing Examiner
        </h1>
        <p className="page-subtitle text-muted max-w-2xl" style={{ marginTop: "6px" }}>
          Trình chấm viết học thuật thông minh phân tích sâu sắc theo 4 tiêu chí chuẩn hóa quốc tế.
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
          <p className="text-sm font-semibold text-muted">Trợ lý AI đang chấm bài luận của bạn. Vui lòng chờ...</p>
        </div>
      ) : !feedback ? (
        <div className="grid gap-6 lg:grid-cols-5 items-start">
          {/* Left panel: select topic */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Chọn đề bài</h3>
            <div className="space-y-3">
              {SAMPLE_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => {
                    setSelectedTopic(topic);
                    setEssay("");
                  }}
                  className={`bezel w-full text-left ${selectedTopic.id === topic.id ? "ring-2 ring-sky-400" : ""}`}
                >
                  <div className="bezel-inner p-4 space-y-2">
                    <Badge variant={topic.type.includes("IELTS") ? "legendary" : "primary"}>
                      {topic.type}
                    </Badge>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{topic.title}</h4>
                    <p className="text-xs text-muted line-clamp-2">{topic.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <Card className="p-4 bg-slate-50/50 border border-slate-100 space-y-2.5">
              <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-sky-500" />
                Hướng dẫn tiêu chuẩn
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nên viết tối thiểu 150 từ cho Task 1 và 250 từ cho Task 2 để đảm bảo đầy đủ các ý lập luận logic và cấu trúc ngữ pháp học thuật.
              </p>
            </Card>
          </div>

          {/* Right panel: text editor */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bezel">
              <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-4">
                <div className="border-b border-slate-100 dark:border-neutral-800 pb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đề bài đang chọn:</span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                    {selectedTopic.desc}
                  </p>
                </div>

                <div className="space-y-2">
                  <textarea
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    placeholder="Nhập bài viết của bạn tại đây..."
                    className="w-full min-h-[250px] p-4 text-sm bg-slate-50/30 rounded-2xl border border-slate-200 focus:outline-none dark:border-slate-850 dark:bg-neutral-950 dark:text-slate-200 leading-relaxed"
                  />
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                    <span>Số từ: {wordCount} từ</span>
                    {wordCount > 0 && <span className="text-sky-500">Tiến độ tốt!</span>}
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
                  onClick={handleEvaluate}
                  disabled={wordCount === 0}
                >
                  <FileCheck className="h-5 w-5" />
                  Nộp bài & Chấm điểm bằng AI
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* FEEDBACK RESULTS STATE */
        <div className="space-y-8 animate-fade-in">
          {/* Score Header */}
          <div className="bezel">
            <div className="bezel-inner bg-gradient-to-r from-violet-650 to-indigo-600 p-6 md:p-8 text-white rounded-[30px] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                  AI Writing Assessment
                </span>
                <h1 className="text-2xl font-black">Nhận xét bài luận của bạn</h1>
                <p className="text-sm text-white/80 max-w-sm">
                  Đánh giá chi tiết điểm IELTS dựa trên phân tích ngôn ngữ sâu sắc của Gemini.
                </p>
              </div>

              <div className="bg-white/15 p-5 rounded-2xl border border-white/20 flex flex-col items-center min-w-[150px] shadow-inner text-center">
                <span className="text-[10px] font-black uppercase text-white/70">IELTS Overall Score</span>
                <span className="text-5xl font-black text-yellow-300 mt-1">
                  Band {feedback.bandScore}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-5 items-start">
            {/* Criteria Grid */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Điểm số thành phần</h3>
              <div className="grid gap-3">
                {[
                  { name: "Task Achievement (TA)", score: feedback.taScore, desc: "Đáp ứng yêu cầu đề bài" },
                  { name: "Coherence & Cohesion (CC)", score: feedback.ccScore, desc: "Mạch lạc và liên kết đoạn" },
                  { name: "Lexical Resource (LR)", score: feedback.lrScore, desc: "Sử dụng từ vựng phong phú" },
                  { name: "Grammatical Range (GRA)", score: feedback.graScore, desc: "Cấu trúc ngữ pháp chính xác" },
                ].map((item, idx) => (
                  <div key={idx} className="bezel">
                    <div className="bezel-inner bg-white dark:bg-neutral-900 p-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</h4>
                        <p className="text-[10px] text-slate-400">{item.desc}</p>
                      </div>
                      <Badge variant="primary" className="text-sm font-black px-3 py-1">
                        {item.score}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feedback & Suggestions */}
            <div className="md:col-span-3 space-y-6">
              {/* General comment */}
              <div className="bezel">
                <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-400">Nhận xét tổng quan</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {feedback.generalFeedback}
                  </p>
                </div>
              </div>

              {/* Vocab Upgrades */}
              {feedback.vocabUpgrades && feedback.vocabUpgrades.length > 0 && (
                <div className="bezel">
                  <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-500 animate-bounce" />
                      Gợi ý nâng cấp từ vựng Band 8.0+
                    </h3>
                    <div className="space-y-3">
                      {feedback.vocabUpgrades.map((item: any, idx: number) => (
                        <div key={idx} className="bg-slate-50 dark:bg-neutral-950/40 p-3.5 rounded-2xl border border-slate-100 dark:border-neutral-900 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="line-through text-slate-400">{item.original}</span>
                            <ChevronRight className="h-3.5 w-3.5 text-sky-500" />
                            <Badge variant="success" className="font-bold">{item.upgrade}</Badge>
                          </div>
                          <p className="text-xs text-muted font-medium">{item.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Corrections list */}
              {feedback.corrections && feedback.corrections.length > 0 && (
                <div className="bezel">
                  <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-rose-500 animate-pulse" />
                      Các điểm cần sửa lỗi ngữ pháp
                    </h3>
                    <div className="space-y-3">
                      {feedback.corrections.map((item: any, idx: number) => (
                        <div key={idx} className="bg-rose-50/20 dark:bg-rose-950/10 p-3.5 rounded-2xl border border-rose-100/50 dark:border-rose-900/30 space-y-1.5">
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="text-rose-500 font-semibold line-through">Lỗi sai: “{item.original}”</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle className="h-3.5 w-3.5" />
                              Sửa lại: “{item.correction}”
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">{item.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  variant="bezel"
                  className="w-full py-3.5 text-sm font-bold flex items-center justify-center gap-1"
                  onClick={() => {
                    setFeedback(null);
                    setEssay("");
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  Viết bài mới
                </Button>
                <Link href="/dashboard" className="w-full">
                  <Button variant="primary" className="w-full py-3.5 text-sm font-bold">
                    Quay lại Trang chủ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}