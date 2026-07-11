"use client";
import React, { useState } from "react";
import { Button, Card, Badge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool,
  Trophy,
  Sparkles,
  FileText,
  FileCheck,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ArrowLeft,
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
  {
    id: "ielts-t3",
    type: "IELTS Writing Task 2",
    title: "Online Education vs Traditional Classrooms",
    desc: "Online education has become increasingly popular. Some believe it will eventually replace traditional classroom learning, while others argue that physical attendance is essential. Discuss both sides and give your opinion.",
  },
  {
    id: "toeic-w2",
    type: "TOEIC Writing Part 3",
    title: "State your opinion on Business Trips",
    desc: "Some organizations prefer employees to travel for face-to-face business meetings, while others favor web conferencing to save costs. Write an essay defending your preference with examples.",
  },
  {
    id: "ielts-t4",
    type: "IELTS Writing Task 2",
    title: "Individual Responsibility for Climate Change",
    desc: "Some argue that large corporations and governments should take sole responsibility for addressing climate change, while others believe individuals should change their lifestyles. Discuss both views and give your opinion.",
  },
];

export default function WritingPracticePage() {
  const [shuffledTopics, setShuffledTopics] = useState<Topic[]>(() => SAMPLE_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(SAMPLE_TOPICS[0]);
  const [essay, setEssay] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  React.useEffect(() => {
    const shuffled = [...SAMPLE_TOPICS].sort(() => 0.5 - Math.random());
    setShuffledTopics(shuffled);
    if (shuffled.length > 0) {
      setSelectedTopic(shuffled[0]);
    }
  }, []);

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
    <div className="mx-auto max-w-5xl space-y-6" suppressHydrationWarning>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 85, damping: 15 }}
        className="page-header"
      >
        <Link
          href="/study/practice"
          className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors mb-3 group select-none"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Quay lại Luyện tập
        </Link>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
          AI IELTS/TOEIC Writing Examiner
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium max-w-xl">
          Trình chấm viết học thuật thông minh phân tích sâu sắc theo 4 tiêu chí chuẩn hóa quốc tế.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading-evaluator"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex h-[50vh] flex-col items-center justify-center space-y-4"
          >
            <div className="relative">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
              <PenTool className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-cyan-600 animate-pulse" />
            </div>
            <p className="text-xs md:text-sm font-black text-slate-500 dark:text-slate-450 text-center max-w-xs leading-relaxed">
              Trợ lý AI đang chấm bài luận của bạn. Vui lòng chờ...
            </p>
          </motion.div>
        ) : !feedback ? (
          <motion.div
            key="essay-editor"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="grid gap-6 lg:grid-cols-5 items-start"
          >
            {/* Left panel: select topic */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">
                Chọn đề bài
              </h3>
              <div className="flex flex-row overflow-x-auto pb-2 gap-3 lg:flex-col lg:overflow-x-visible lg:pb-0 lg:space-y-3.5 scrollbar-thin" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {shuffledTopics.map((topic) => (
                  <motion.button
                    whileHover={{ translateY: -1 }}
                    whileTap={{ scale: 0.98 }}
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(topic);
                      setEssay("");
                    }}
                    className={`bezel shrink-0 w-[240px] lg:w-full text-left cursor-pointer ${
                      selectedTopic.id === topic.id ? "ring-2 ring-sky-400" : ""
                    }`}
                  >
                    <div className={`bezel-inner p-3.5 space-y-2 h-full flex flex-col justify-between transition-all ${
                      selectedTopic.id === topic.id 
                        ? "bg-sky-50/30 dark:bg-sky-950/20" 
                        : "bg-white dark:bg-neutral-900"
                    }`}>
                      <div>
                        <Badge variant={topic.type.includes("IELTS") ? "legendary" : "primary"}>
                          {topic.type}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm line-clamp-1 mt-1">
                        {topic.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-450 line-clamp-2 leading-relaxed">
                        {topic.desc}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <Card className="p-4 bg-slate-50/50 border border-slate-200/40 dark:bg-neutral-950/20 dark:border-neutral-850 space-y-2.5 rounded-[22px]">
                <span className="text-[9px] font-black uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-sky-500 animate-pulse" />
                  Hướng dẫn tiêu chuẩn
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Nên viết tối thiểu 150 từ cho Task 1 và 250 từ cho Task 2 để đảm bảo đầy đủ các ý lập luận logic và cấu trúc ngữ pháp học thuật.
                </p>
              </Card>
            </div>

            {/* Right panel: text editor */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bezel">
                <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-4">
                  <div className="border-b border-slate-100 dark:border-neutral-850 pb-3">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Đề bài đang chọn:
                    </span>
                    <p className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-350 mt-1 leading-relaxed">
                      {selectedTopic.desc}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      value={essay}
                      onChange={(e) => setEssay(e.target.value)}
                      placeholder="Nhập bài viết của bạn tại đây..."
                      className="w-full min-h-[250px] md:min-h-[380px] p-4 text-xs md:text-sm bg-slate-50/30 rounded-2xl border border-slate-200 focus:border-cyan-500 focus:outline-none dark:border-neutral-850 dark:bg-neutral-950/40 dark:text-slate-200 leading-relaxed font-medium transition-all"
                    />
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-450 dark:text-slate-550 uppercase">
                      <span>Số từ: {wordCount} từ</span>
                      {wordCount > 0 && <span className="text-emerald-500 font-extrabold">Đang tiến hành...</span>}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full py-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-glow"
                    onClick={handleEvaluate}
                    disabled={wordCount === 0}
                  >
                    <FileCheck className="h-5 w-5 shrink-0" />
                    Nộp bài & Chấm điểm bằng AI
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* FEEDBACK RESULTS STATE */
          <motion.div
            key="feedback-results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="space-y-8 animate-fade-in"
          >
            {/* Score Header */}
            <div className="bezel">
              <div className="bezel-inner bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 p-6 md:p-8 text-white rounded-[calc(var(--radius-3xl)-6px)] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="space-y-2 relative z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
                    AI Writing Assessment
                  </span>
                  <h1 className="text-xl md:text-2xl font-black font-display">Nhận xét bài luận của bạn</h1>
                  <p className="text-xs text-white/80 max-w-sm font-medium leading-relaxed">
                    Đánh giá chi tiết điểm IELTS dựa trên phân tích ngôn ngữ sâu sắc của Gemini.
                  </p>
                </div>

                <div className="bg-white/15 p-5 rounded-2xl border border-white/20 flex flex-col items-center min-w-[150px] shadow-inner text-center relative z-10">
                  <span className="text-[9px] font-black uppercase text-white/70">IELTS Overall Score</span>
                  <span className="text-3xl md:text-4xl font-black text-yellow-300 mt-1 font-display">
                    Band {feedback.bandScore}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-5 items-start">
              {/* Criteria Grid */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">
                  Điểm số thành phần
                </h3>
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
                          <p className="text-[10px] text-slate-450 mt-0.5">{item.desc}</p>
                        </div>
                        <Badge variant="primary" className="text-xs md:text-sm font-black px-3 py-1">
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
                    <h3 className="text-[10px] font-black uppercase text-slate-400">Nhận xét tổng quan</h3>
                    <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {feedback.generalFeedback}
                    </p>
                  </div>
                </div>

                {/* Vocab Upgrades */}
                {feedback.vocabUpgrades && feedback.vocabUpgrades.length > 0 && (
                  <div className="bezel">
                    <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
                        <Trophy className="h-4 w-4 text-yellow-500 animate-bounce" />
                        Gợi ý nâng cấp từ vựng Band 8.0+
                      </h3>
                      <div className="space-y-3">
                        {feedback.vocabUpgrades.map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-slate-50 dark:bg-neutral-950/40 p-3.5 rounded-2xl border border-slate-100 dark:border-neutral-850 space-y-2"
                          >
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="line-through text-slate-400 font-medium">{item.original}</span>
                              <ChevronRight className="h-3.5 w-3.5 text-sky-500" />
                              <Badge variant="success" className="font-black px-2 py-0.5">
                                {item.upgrade}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                              {item.reason}
                            </p>
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
                      <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-rose-500 animate-pulse" />
                        Các điểm cần sửa lỗi ngữ pháp
                      </h3>
                      <div className="space-y-3">
                        {feedback.corrections.map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-rose-50/10 dark:bg-rose-950/10 p-3.5 rounded-2xl border border-rose-100/50 dark:border-rose-900/20 space-y-2"
                          >
                            <div className="flex flex-col gap-1 text-xs">
                              <span className="text-rose-500 font-bold line-through">Lỗi sai: “{item.original}”</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                                <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                                Sửa lại: “{item.correction}”
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-550 dark:text-slate-400 font-medium leading-relaxed">
                              {item.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    variant="bezel"
                    className="w-full py-3.5 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => {
                      setFeedback(null);
                      setEssay("");
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Viết bài mới
                  </Button>
                  <Link href="/dashboard" className="w-full">
                    <Button
                      variant="primary"
                      className="w-full py-3.5 text-xs md:text-sm font-bold cursor-pointer"
                    >
                      Quay lại Trang chủ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}