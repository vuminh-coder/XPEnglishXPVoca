"use client";
import React, { useEffect, useState } from "react";
import { useStudyPlanStore } from "@/stores/studyPlanStore";
import { useAuthStore } from "@/stores/authStore";
import { Button, Badge } from "@/shared/components/ui";
import { useNotificationStore } from "@/stores/notificationStore";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  Sparkles,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  Trophy,
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  Flame,
  Zap,
  Target,
  RefreshCw,
  Award,
  Briefcase,
  Globe,
  GraduationCap,
  ShieldCheck,
  Check,
  Gift,
  Clock,
  Play,
  Layers,
  ChevronDown,
  BarChart3,
  Edit3,
  Calendar,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

interface TargetRoadmapPhase {
  phaseNum: number;
  title: string;
  subtitle: string;
  chestRewardXp: number;
  chestRewardCoins: number;
  tasks: {
    id: string;
    dayNum: number;
    title: string;
    taskType: "LISTENING" | "READING" | "SPEAKING" | "WRITING" | "GRAMMAR" | "VOCAB";
    description: string;
    xpReward: number;
    durationMinutes: number;
    difficulty: "Dễ" | "Trung bình" | "Khó";
    practicePath: string;
    isCompleted: boolean;
    tips: string[];
  }[];
}

// Tailored deep roadmap generator based on target exam and target score
const generateGoalSpecificRoadmap = (targetExam: string, targetScore: string, targetCategory: string): TargetRoadmapPhase[] => {
  const isIelts = targetExam === "IELTS" || targetCategory === "ACADEMIC";
  const isBusiness = targetCategory === "BUSINESS";

  if (isIelts) {
    return [
      {
        phaseNum: 1,
        title: `Chặng 1: Nền Tảng Từ Vựng Học Thuật Academic Word List & Listening Sec 1-2`,
        subtitle: `Tích lũy 600 từ vựng cốt lõi AWL & phản xạ nghe điền từ chính tả cho Band ${targetScore}`,
        chestRewardXp: 250,
        chestRewardCoins: 100,
        tasks: [
          { id: "i1", dayNum: 1, title: "Academic Vocabulary - AWL Sublist 1 & 2", taskType: "VOCAB", description: "Học 30 từ vựng nghiên cứu khoa học & phân tích dữ liệu", xpReward: 25, durationMinutes: 15, difficulty: "Dễ", practicePath: "/vocabulary", isCompleted: true, tips: ["Chú ý tra phiên âm IPA và ví dụ ngữ cảnh học thuật."] },
          { id: "i2", dayNum: 2, title: "IELTS Listening Section 1 - Form Completion", taskType: "LISTENING", description: "Luyện nghe điền tên riêng, số điện thoại & ngày tháng", xpReward: 30, durationMinutes: 20, difficulty: "Dễ", practicePath: "/study/listening", isCompleted: true, tips: ["Chú ý cách phát âm chữ cái W, Z, H trong tiếng Anh Anh."] },
          { id: "i3", dayNum: 3, title: "Ngữ Pháp AI: Câu Phức & Mệnh Đề Quan Hệ", taskType: "GRAMMAR", description: "Cấu trúc ngữ pháp tạo câu ghép ăn điểm Writing Task 2", xpReward: 25, durationMinutes: 15, difficulty: "Trung bình", practicePath: "/study/grammar", isCompleted: false, tips: ["Sử dụng mệnh đề quan hệ rút gọn (V-ing / V-ed)."] },
          { id: "i4", dayNum: 4, title: "IELTS Listening Section 2 - Map & Diagram Labeling", taskType: "LISTENING", description: "Luyện nghe bản đồ chỉ hướng trong khuôn viên đại học", xpReward: 30, durationMinutes: 20, difficulty: "Trung bình", practicePath: "/study/listening", isCompleted: false, tips: ["Định vị điểm mốc xuất phát trước khi bắt đầu bài nghe."] },
          { id: "i5", dayNum: 5, title: "IELTS Speaking Part 1 - AI Tutor 1-on-1 Chat", taskType: "SPEAKING", description: "Giao tiếp phản xạ chủ đề Hometown & Daily Routine", xpReward: 35, durationMinutes: 15, difficulty: "Dễ", practicePath: "/ai/tutor", isCompleted: false, tips: ["Mở rộng câu trả lời bằng lý do (Because/Since...)."] },
        ],
      },
      {
        phaseNum: 2,
        title: `Chặng 2: Bứt Phá Listening Sec 3-4 & IELTS Reading Passage 2-3`,
        subtitle: `Chiến thuật Skimming/Scanning bài đọc dài & phản xạ bài nghe giảng đường Band ${targetScore}`,
        chestRewardXp: 350,
        chestRewardCoins: 150,
        tasks: [
          { id: "i6", dayNum: 6, title: "Academic Reading - Skimming & Scanning Technique", taskType: "READING", description: "Đọc hiểu bài luận khoa học sinh học & lịch sử", xpReward: 35, durationMinutes: 25, difficulty: "Khó", practicePath: "/study/reading", isCompleted: false, tips: ["Đọc câu đầu và câu cuối của mỗi đoạn văn để nắm ý chính."] },
          { id: "i7", dayNum: 7, title: "IELTS Writing Task 1 - Line Graph & Bar Chart Analysis", taskType: "WRITING", description: "Viết đoạn văn miêu tả xu hướng biến động số liệu", xpReward: 30, durationMinutes: 20, difficulty: "Trung bình", practicePath: "/study/practice?subMode=writing", isCompleted: false, tips: ["Dùng các từ thay thế: fluctuate, surge, decline, remain steady."] },
          { id: "i8", dayNum: 8, title: "IELTS Listening Section 3 - Academic Discussion", taskType: "LISTENING", description: "Luyện nghe bài thảo luận giữa sinh viên và giáo sư", xpReward: 35, durationMinutes: 20, difficulty: "Khó", practicePath: "/study/listening", isCompleted: false, tips: ["Chú ý sự thay đổi ý kiến giữa các nhân vật khi thảo luận."] },
          { id: "i9", dayNum: 9, title: "IELTS Speaking Part 2 - Monologue Cue Card", taskType: "SPEAKING", description: "Luyện nói 2 phút chủ đề Describe a memorable event", xpReward: 40, durationMinutes: 15, difficulty: "Trung bình", practicePath: "/ai/tutor", isCompleted: false, tips: ["Ghi chú 4 ý chính: Who, When, Where, Why memorable trong 1 phút chuẩn bị."] },
        ],
      },
      {
        phaseNum: 3,
        title: `Chặng 3: Luyện Đề Mock Test Full-Length & Chữa Lỗi Viết AI Task 2`,
        subtitle: `Tối ưu thời gian làm bài & bứt phá mục tiêu Band ${targetScore}`,
        chestRewardXp: 500,
        chestRewardCoins: 200,
        tasks: [
          { id: "i10", dayNum: 10, title: "IELTS Writing Task 2 - Essay Structure & Argumentation", taskType: "WRITING", description: "Viết bài luận Opinion Essay 250 từ & AI chấm lỗi chi tiết", xpReward: 45, durationMinutes: 30, difficulty: "Khó", practicePath: "/ai/conversation", isCompleted: false, tips: ["Mỗi đoạn thân bài chỉ tập trung vào 1 luận điểm chính duy nhất."] },
          { id: "i11", dayNum: 11, title: "Full Mock Test IELTS Listening & Reading", taskType: "LISTENING", description: "Thi thử áp lực thời gian thật 60 phút", xpReward: 50, durationMinutes: 60, difficulty: "Khó", practicePath: "/study/practice", isCompleted: false, tips: ["Kiểm tra kỹ chính tả và dạng từ (singular/plural) khi chép đáp án."] },
        ],
      },
    ];
  }

  if (isBusiness) {
    return [
      {
        phaseNum: 1,
        title: "Chặng 1: Tiếng Anh Email, Trao Đổi Công Việc & Từ Vựng Công Sở",
        subtitle: "Thành thạo 500 từ vựng Tiếng Anh thương mại & viết Email chuyên nghiệp",
        chestRewardXp: 200,
        chestRewardCoins: 80,
        tasks: [
          { id: "b1", dayNum: 1, title: "Business English Vocabulary - Office & HR", taskType: "VOCAB", description: "Học 30 từ vựng nhân sự, phòng họp & báo cáo tiến độ", xpReward: 20, durationMinutes: 15, difficulty: "Dễ", practicePath: "/vocabulary", isCompleted: true, tips: ["Học theo cụm từ colocations công sở: hold a meeting, meet a deadline."] },
          { id: "b2", dayNum: 2, title: "Viết Email Công Việc: Gửi Báo Cáo & Xin Nghỉ Phép", taskType: "WRITING", description: "Luyện viết Email chuẩn form chuyên nghiệp cho đối tác", xpReward: 25, durationMinutes: 15, difficulty: "Dễ", practicePath: "/study/practice?subMode=writing", isCompleted: true, tips: ["Sử dụng câu mở đầu lịch sự: Dear [Name], I am writing to inform you..."] },
          { id: "b3", dayNum: 3, title: "Nghe Phản Xạ Cuộc Gọi Điện Thoại Công Việc", taskType: "LISTENING", description: "Luyện nghe hội thoại đặt lịch hẹn & xác nhận dịch vụ", xpReward: 25, durationMinutes: 20, difficulty: "Trung bình", practicePath: "/study/listening", isCompleted: false, tips: ["Chú ý cách nhắc lại thông tin xác nhận: Could you confirm that...?"] },
        ],
      },
      {
        phaseNum: 2,
        title: "Chặng 2: Kỹ Năng Phỏng Vấn Xin Việc & Thảo Luận Cuộc Họp",
        subtitle: "Tự tin trả lời phỏng vấn & đưa ra ý kiến trong cuộc họp quốc tế",
        chestRewardXp: 300,
        chestRewardCoins: 120,
        tasks: [
          { id: "b4", dayNum: 4, title: "AI Tutor 1-on-1 Job Interview Simulator", taskType: "SPEAKING", description: "Trả lời phỏng vấn tuyển dụng chủ đề Strength & Experience", xpReward: 35, durationMinutes: 15, difficulty: "Trung bình", practicePath: "/ai/tutor", isCompleted: false, tips: ["Sử dụng phương pháp STAR (Situation, Task, Action, Result) khi trả lời."] },
          { id: "b5", dayNum: 5, title: "Thảo Luận Cuộc Họp: Đưa Ra Ý Kiến & Phản Bác Lịch Sự", taskType: "SPEAKING", description: "Luyện phát âm cụm từ: From my perspective, I partially agree...", xpReward: 30, durationMinutes: 15, difficulty: "Trung bình", practicePath: "/ai/tutor", isCompleted: false, tips: ["Phản bác lịch sự: I see your point, but have we considered...?"] },
        ],
      },
    ];
  }

  // DEFAULT TOEIC ROADMAP
  return [
    {
      phaseNum: 1,
      title: `Chặng 1: Bứt Phá Nền Tảng Part 1 & Part 2 + 600 Từ Vựng TOEIC`,
      subtitle: `Luyện nghe phản xạ mô tả hình ảnh & câu hỏi đáp ngắn cho mục tiêu TOEIC ${targetScore}`,
      chestRewardXp: 200,
      chestRewardCoins: 80,
      tasks: [
        { id: "t1", dayNum: 1, title: "TOEIC Part 1 - Mô Tả Hình Ảnh Người & Vật", taskType: "LISTENING", description: "Luyện nghe 10 câu hình ảnh hành động chủ thể (Subject + V-ing)", xpReward: 20, durationMinutes: 15, difficulty: "Dễ", practicePath: "/study/listening", isCompleted: true, tips: ["Loại bỏ ngay đáp án có từ phát âm tương tự nhưng sai nghĩa (Distractors)."] },
        { id: "t2", dayNum: 2, title: "600 Từ Vựng TOEIC - Chủ Đề Contract & Office", taskType: "VOCAB", description: "Học 30 từ vựng hợp đồng thương mại & thiết bị văn phòng", xpReward: 20, durationMinutes: 15, difficulty: "Dễ", practicePath: "/vocabulary", isCompleted: true, tips: ["Học từ kèm từ loại Noun, Verb, Adjective để làm tốt Part 5."] },
        { id: "t3", dayNum: 3, title: "TOEIC Part 2 - Câu Hỏi WHO, WHERE, WHEN", taskType: "LISTENING", description: "Luyện nghe hỏi đáp nhanh & nhận diện từ để hỏi", xpReward: 25, durationMinutes: 20, difficulty: "Trung bình", practicePath: "/study/listening", isCompleted: false, tips: ["Câu hỏi Who ưu tiên đáp án có tên người hoặc chức danh công việc."] },
        { id: "t4", dayNum: 4, title: "Ngữ Pháp TOEIC Part 5 - Biến Đổi Từ Loại (Word Form)", taskType: "GRAMMAR", description: "Cấu trúc chọn Danh từ, Tính từ, Trạng từ điền vào khoảng trống", xpReward: 25, durationMinutes: 15, difficulty: "Trung bình", practicePath: "/study/grammar", isCompleted: false, tips: ["Nhìn trước và sau khoảng trống để xác định từ loại cần điền."] },
      ],
    },
    {
      phaseNum: 2,
      title: `Chặng 2: Chinh Phục Listening Part 3 & 4 + Đọc Hiểu Part 5 & 6`,
      subtitle: `Luyện nghe đoạn hội thoại dài 3 người & kỹ năng Skimming Part 6 TOEIC ${targetScore}`,
      chestRewardXp: 350,
      chestRewardCoins: 150,
      tasks: [
        { id: "t5", dayNum: 5, title: "TOEIC Part 3 - Short Conversations (Hội thoại ngắn)", taskType: "LISTENING", description: "Luyện nghe hội thoại mua sắm, đặt vé & lịch làm việc", xpReward: 30, durationMinutes: 20, difficulty: "Trung bình", practicePath: "/study/listening", isCompleted: false, tips: ["Đọc trước 3 câu hỏi trước khi đĩa CD bắt đầu phát bài nghe."] },
        { id: "t6", dayNum: 6, title: "TOEIC Part 5 & 6 - Ngữ Pháp Thì & Liên Từ", taskType: "READING", description: "Luyện chọn đáp án Thì Hoàn Thành & Trạng từ nối câu", xpReward: 30, durationMinutes: 20, difficulty: "Trung bình", practicePath: "/study/reading", isCompleted: false, tips: ["Chú ý các dấu hiệu thời gian: since, for, already, recently."] },
        { id: "t7", dayNum: 7, title: "TOEIC Part 4 - Short Talks (Bài nói độc thoại)", taskType: "LISTENING", description: "Luyện nghe thông báo sân bay, tin nhắn thoại & quảng cáo", xpReward: 35, durationMinutes: 20, difficulty: "Khó", practicePath: "/study/listening", isCompleted: false, tips: ["Chú ý câu mở đầu để nhận biết ngay ngữ cảnh (Who is speaking, where is it taking place)."] },
      ],
    },
    {
      phaseNum: 3,
      title: `Chặng 3: Luyện Đề Full Test 200 Câu Áp Lực Thời Gian & Bứt Phá Mục Tiêu`,
      subtitle: `Thi thử bấm giờ 120 phút & chữa chi tiết từng câu sai TOEIC ${targetScore}`,
      chestRewardXp: 500,
      chestRewardCoins: 200,
      tasks: [
        { id: "t8", dayNum: 8, title: "TOEIC Part 7 - Đọc Hiểu Đoạn Đơn & Đoạn Kép", taskType: "READING", description: "Chiến thuật tìm thông tin chéo giữa Email và Hóa đơn", xpReward: 40, durationMinutes: 30, difficulty: "Khó", practicePath: "/study/practice", isCompleted: false, tips: ["Làm câu hỏi chi tiết trước, câu hỏi suy luận (infer) làm sau."] },
        { id: "t9", dayNum: 9, title: "Full Mock Test TOEIC 200 Câu (Bấm giờ 120 phút)", taskType: "LISTENING", description: "Luyện đề chuẩn format đề thi thật tại IIG", xpReward: 50, durationMinutes: 120, difficulty: "Khó", practicePath: "/study/practice", isCompleted: false, tips: ["Phân bổ: 45 phút Nghe, 75 phút Đọc, dành 5 phút cuối kiểm tra tô đáp án."] },
      ],
    },
  ];
};

export default function RoadmapPage() {
  const { plan, isLoading, generatePlan, loadPlan } = useStudyPlanStore();
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [targetCategory, setTargetCategory] = useState<string>("EXAM");
  const [targetExam, setTargetExam] = useState<string>("TOEIC");
  const [targetScore, setTargetScore] = useState<string>("750");
  const [currentLevel, setCurrentLevel] = useState<string>("A2 Elementary");
  const [weeklyHours, setWeeklyHours] = useState<number>(5);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Dynamic phase manager
  const [phases, setPhases] = useState<TargetRoadmapPhase[]>([]);
  const [selectedTask, setSelectedTask] = useState<TargetRoadmapPhase["tasks"][0] | null>(null);

  // Load plan on mount
  useEffect(() => {
    loadPlan();
  }, [loadPlan]);

  // Sync initial roadmap on load or plan change
  useEffect(() => {
    if (plan) {
      setTargetExam(plan.targetExam || "TOEIC");
      const scoreStr = String(plan.targetScore || "750");
      setTargetScore(scoreStr);
      const generated = generateGoalSpecificRoadmap(plan.targetExam || "TOEIC", scoreStr, targetCategory);
      setPhases(generated);
      if (generated[0]?.tasks[0]) {
        setSelectedTask(generated[0].tasks[0]);
      }
    } else {
      const generated = generateGoalSpecificRoadmap(targetExam, targetScore, targetCategory);
      setPhases(generated);
      if (generated[0]?.tasks[0]) {
        setSelectedTask(generated[0].tasks[0]);
      }
    }
  }, [plan, targetCategory]);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const targetDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const numericScore = parseFloat(targetScore) || 750;
    generatePlan({
      targetExam,
      targetScore: numericScore,
      targetDate,
      currentLevel,
      weeklyHours,
    });
    const newPhases = generateGoalSpecificRoadmap(targetExam, targetScore, targetCategory);
    setPhases(newPhases);
    if (newPhases[0]?.tasks[0]) {
      setSelectedTask(newPhases[0].tasks[0]);
    }
    setIsFormOpen(false);
    useAuthStore.getState().awardXp(15);
    addToast({
      type: "success",
      title: "Khởi Tạo Lộ Trình AI",
      message: `Đã khởi tạo lộ trình học AI cho ${targetExam} Target ${targetScore} thành công! (+15 XP)`,
    });
  };

  const handleToggleTaskCompleted = (taskId: string) => {
    let xpAwarded = 25;
    let isNowCompleted = false;

    setPhases(prev => prev.map(phase => ({
      ...phase,
      tasks: phase.tasks.map(t => {
        if (t.id === taskId) {
          isNowCompleted = !t.isCompleted;
          xpAwarded = t.xpReward;
          if (isNowCompleted) {
            useAuthStore.getState().awardXp(xpAwarded);
            useNotificationStore.getState().addToast({
              type: "success",
              title: `🎉 +${xpAwarded} XP BÀI HỌC HOÀN THÀNH!`,
              message: `Đã tích chọn hoàn thành bài học "Ngày ${t.dayNum}: ${t.title}".`,
            });
          }
          return { ...t, isCompleted: isNowCompleted };
        }
        return t;
      })
    })));

    useStudyPlanStore.getState().toggleTask(taskId, isNowCompleted);
  };

  // 1. STEP 1: GOAL SELECTION FORM (Unified max-w-7xl with Bento Form + AI Blueprint Preview)
  if (!plan || isFormOpen) {
    const toeicScores = ["550", "750", "850", "950"];
    const ieltsScores = ["5.5", "6.5", "7.5", "8.5"];
    const scoresList = targetExam === "TOEIC" ? toeicScores : ieltsScores;

    return (
      <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
        
        {/* APP TOP HEADER INTEGRATION */}
        <AppTopHeader
          showDailyQuote={false}
          hideThemeAndAvatarOnDesktop={true}
          rightDesktopContent={
            <div className="flex items-center gap-2">
              {plan && (
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Quay Lại Lộ Trình</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Tạo Lộ Trình AI</span>
              </button>
            </div>
          }
        >
          <HeaderPillContainer>
            <HeaderPillItem
              active={true}
              icon={<Compass className="w-3.5 h-3.5 text-amber-500" />}
              label="Lộ trình"
            />
            <HeaderPillItem
              href="/analytics"
              icon={<BarChart3 className="w-3.5 h-3.5 text-blue-500" />}
              label="Thống kê"
            />
            <HeaderPillItem
              href="/community"
              icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
              label="Xếp hạng"
            />
          </HeaderPillContainer>
        </AppTopHeader>

        {/* UNIFIED 7XL CONTAINER */}
        <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
          
          {/* HERO DASHBOARD SPOTLIGHT BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1.5 font-display shadow-2xs">
                  <Target className="w-3.5 h-3.5 text-amber-300" /> AI Goal Setting Step
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/15 text-white border border-white/20 font-mono">
                  Khung Chuẩn CEFR, TOEIC & IELTS
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
                  <span>Thiết Kế Lộ Trình Học AI Cho <span className="text-amber-300">{user?.fullName || "Học Viên"}</span></span>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                </h1>
                <p className="text-xs text-blue-100/90 font-medium leading-relaxed max-w-2xl">
                  Chọn mục tiêu của bạn bên dưới. AI sẽ khởi tạo giáo án bài học chuyên sâu chi tiết từng chặng phù hợp 100% với điểm số đó.
                </p>
              </div>
            </div>
          </div>

          {/* BENTO GRID: 8 COLS FORM + 4 COLS PREVIEW WIDGET */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            
            {/* LEFT 8-COLS: FORM CONTROLS */}
            <div className="lg:col-span-8">
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-5">
                <form onSubmit={handleGenerate} className="space-y-5">
                  
                  {/* 1. Category Selection Bento Grid */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-400 font-display">
                      1. Chọn định hướng mục tiêu học tập
                    </label>

                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                      {/* Exam Card */}
                      <div
                        onClick={() => {
                          setTargetCategory("EXAM");
                          setTargetExam("TOEIC");
                          setTargetScore("750");
                        }}
                        className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                          targetCategory === "EXAM"
                            ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 shadow-2xs ring-2 ring-[#0059bb]/20"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-4.5 h-4.5" />
                          </div>
                          {targetCategory === "EXAM" && <Check className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white leading-tight">Luyện Thi</div>
                          <div className="text-[11px] font-bold text-slate-500 mt-0.5">TOEIC / IELTS</div>
                        </div>
                      </div>

                      {/* Business Card */}
                      <div
                        onClick={() => {
                          setTargetCategory("BUSINESS");
                          setTargetExam("TOEIC");
                          setTargetScore("750");
                        }}
                        className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                          targetCategory === "BUSINESS"
                            ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-2xs ring-2 ring-emerald-500/20"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <Briefcase className="w-4.5 h-4.5" />
                          </div>
                          {targetCategory === "BUSINESS" && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white leading-tight">Công Sở</div>
                          <div className="text-[11px] font-bold text-slate-500 mt-0.5">Email & Họp</div>
                        </div>
                      </div>

                      {/* Travel Card */}
                      <div
                        onClick={() => {
                          setTargetCategory("TRAVEL");
                          setTargetExam("TOEIC");
                          setTargetScore("550");
                        }}
                        className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                          targetCategory === "TRAVEL"
                            ? "bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 shadow-2xs ring-2 ring-amber-500/20"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                            <Globe className="w-4.5 h-4.5" />
                          </div>
                          {targetCategory === "TRAVEL" && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white leading-tight">Du Lịch</div>
                          <div className="text-[11px] font-bold text-slate-500 mt-0.5">Giao Tiếp</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Exam Type Picker */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-400 font-display">
                      2. Chọn kỳ thi & chứng chỉ
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setTargetExam("TOEIC");
                          setTargetScore("750");
                        }}
                        className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                          targetExam === "TOEIC"
                            ? "bg-white dark:bg-slate-900 border-[#0059bb] shadow-2xs ring-2 ring-[#0059bb]/20"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800"
                        }`}
                      >
                        <span className="text-2xl shrink-0">📊</span>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white">TOEIC Listening & Reading</div>
                          <div className="text-[11px] text-slate-500 font-medium truncate">Tiếng Anh môi trường công sở</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setTargetExam("IELTS");
                          setTargetScore("6.5");
                        }}
                        className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                          targetExam === "IELTS"
                            ? "bg-white dark:bg-slate-900 border-[#0059bb] shadow-2xs ring-2 ring-[#0059bb]/20"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800"
                        }`}
                      >
                        <span className="text-2xl shrink-0">🎓</span>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white">IELTS Academic</div>
                          <div className="text-[11px] text-slate-500 font-medium truncate">Học thuật quốc tế & Du học</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 3. Target Score Pills */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-400 font-display">
                      3. Mục tiêu điểm số chi tiết
                    </label>

                    <div className="grid grid-cols-4 gap-2">
                      {scoresList.map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => setTargetScore(score)}
                          className={`py-2.5 px-2 rounded-xl border-2 text-center font-black transition-all cursor-pointer font-mono text-xs sm:text-sm ${
                            targetScore === score
                              ? "bg-[#0059bb] text-white border-[#0059bb] shadow-xs"
                              : "bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                          }`}
                        >
                          {targetExam === "TOEIC" ? `${score}đ` : `Band ${score}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Current Level & Commitment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 font-display">
                        Trình độ hiện tại
                      </label>
                      <select
                        value={currentLevel}
                        onChange={(e) => setCurrentLevel(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
                      >
                        <option value="A1 Beginner">A1 - Mới bắt đầu / Mất gốc</option>
                        <option value="A2 Elementary">A2 - Sơ cấp (Có nền tảng nhẹ)</option>
                        <option value="B1 Intermediate">B1 - Trung cấp (Giao tiếp khá)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 font-display">
                        Thời gian cam kết / Tuần
                      </label>
                      <div className="flex items-center justify-between text-xs sm:text-sm font-bold font-mono p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                        <span>{weeklyHours} giờ / tuần</span>
                        <span className="text-slate-400 text-xs">~{Math.round((weeklyHours / 7) * 60)} phút/ngày</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="flex items-center gap-3 pt-2">
                    {plan && (
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-3 rounded-xl border border-slate-200/90 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        Hủy
                      </button>
                    )}
                    <Button
                      type="submit"
                      className="flex-1 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-[#0059bb] hover:bg-[#004ba0] text-white rounded-xl shadow-xs flex items-center justify-center gap-2 font-display cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4 text-amber-300" />
                      <span>Tạo Lộ Trình AI Chuyên Sâu Ngay</span>
                    </Button>
                  </div>

                </form>
              </div>
            </div>

            {/* RIGHT 4-COLS: AI BLUEPRINT PREVIEW & CEFR ALIGNMENT */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Card 1: Blueprint Preview */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-display flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#0059bb]" /> Mô Phỏng Lộ Trình AI
                  </span>
                  <Badge variant="primary" className="text-[10px] font-mono font-black">
                    {targetExam} {targetScore}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 space-y-1">
                    <div className="text-xs font-bold text-[#0059bb] dark:text-sky-400">Thời gian ước tính</div>
                    <div className="text-sm font-black font-display text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#0059bb]" /> 12 Tuần (~90 Ngày học)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                      <div className="text-[10px] font-bold text-slate-500">Tổng Chặng</div>
                      <div className="text-sm font-black text-slate-900 dark:text-white font-mono">3 Chặng Lớn</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                      <div className="text-[10px] font-bold text-slate-500">Tổng Thưởng</div>
                      <div className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono">+1,050 XP</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    <div className="flex items-center gap-2">
                      <CheckCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Cân bằng toàn diện 4 kỹ năng Nghe, Nói, Đọc, Viết.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Thuật toán lặp lại ngắt quãng Spaced Repetition.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Chữa lỗi phát âm & viết luận 1-on-1 cùng AI Tutor.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: CEFR Quality Assurance */}
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300">Cam Kết Chuẩn CEFR Quốc Tế</span>
                </div>
                <p className="text-xs text-amber-800/90 dark:text-amber-400/90 leading-relaxed font-medium">
                  Giáo án được thiết kế đồng bộ theo ngân hàng đề thi chuẩn mới nhất, giúp tối ưu hóa thời gian và bứt phá mục tiêu nhanh nhất.
                </p>
              </div>

            </div>

          </div>

        </div>

      </PageEntranceWrapper>
    );
  }

  // 2. STEP 2: HIGH-END TAILORED ROADMAP PATHWAY
  const allTasks = phases.flatMap(p => p.tasks);
  const totalTasksCount = allTasks.length;
  const completedTasksCount = allTasks.filter(t => t.isCompleted).length;
  const overallProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const currentActiveExam = plan?.targetExam || targetExam;
  const currentActiveScore = plan?.targetScore || targetScore;
  const nextUncompletedTask = allTasks.find(t => !t.isCompleted) || allTasks[0];

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      
      {/* 1. APP TOP HEADER INTEGRATION */}
      <AppTopHeader
        showDailyQuote={false}
        hideThemeAndAvatarOnDesktop={true}
        rightDesktopContent={
          <Link
            href={nextUncompletedTask?.practicePath || "/study/listening"}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Học Bài Tiếp Theo</span>
          </Link>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={true}
            icon={<Compass className="w-3.5 h-3.5 text-amber-500" />}
            label="Lộ trình"
          />
          <HeaderPillItem
            href="/analytics"
            icon={<BarChart3 className="w-3.5 h-3.5 text-blue-500" />}
            label="Thống kê"
          />
          <HeaderPillItem
            href="/community"
            icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
            label="Xếp hạng"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. UNIFIED MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* HERO SPOTLIGHT BANNER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1.5 font-display shadow-2xs">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" /> Lộ Trình AI
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/15 text-white border border-white/20 font-mono">
                  {currentActiveExam} Target: {currentActiveScore}
                </span>
              </div>

              <div className="space-y-0.5">
                <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
                  <span>Giáo Án Luyện Thi {currentActiveExam} {currentActiveScore}</span>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                </h1>
                <p className="text-xs text-blue-100/90 font-medium leading-relaxed">
                  Tối ưu cá nhân hóa riêng cho học viên <strong className="text-amber-300 font-bold">{user?.fullName || "Học Viên"}</strong> để chinh phục {currentActiveExam} {currentActiveScore}.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-3 shrink-0">
              <div className="p-2.5 rounded-xl bg-white/10 dark:bg-slate-900/60 border border-white/20 backdrop-blur-md flex items-center gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200 font-display">Tiến độ</div>
                  <div className="text-xs font-black font-display text-white font-mono">{overallProgress}% Hoàn Thành</div>
                </div>
              </div>

              <button
                onClick={() => setIsFormOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/30 transition-all flex items-center gap-1.5 font-display shrink-0 cursor-pointer shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-300" /> 
                <span>Đổi Mục Tiêu AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. BENTO 3/4 + 1/4 GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT 8-COLS: HIGH-END TAILORED PHASES & LESSON CARDS */}
          <div className="lg:col-span-8 space-y-4">
            {phases.map((phase) => {
              const phaseCompletedCount = phase.tasks.filter((t) => t.isCompleted).length;
              const phaseTotalCount = phase.tasks.length;
              const isPhaseDone = phaseCompletedCount === phaseTotalCount;

              return (
                <div key={phase.phaseNum} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
                  
                  {/* PHASE HEADER & CHEST REWARD */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-[#0059bb] text-white font-display shrink-0 shadow-2xs">
                          Chặng {phase.phaseNum}
                        </span>
                        <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                          {phase.title}
                        </h2>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {phase.subtitle}
                      </p>
                    </div>

                    {/* Chest Unlock Reward Badge */}
                    <div className={`px-2.5 py-1 rounded-xl border flex items-center gap-1.5 shrink-0 ${
                      isPhaseDone
                        ? "bg-amber-400/20 border-amber-400/60 text-amber-700 dark:text-amber-300 animate-pulse"
                        : "bg-slate-100 dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-400"
                    }`}>
                      <Gift className={`w-4 h-4 ${isPhaseDone ? "text-amber-500 fill-amber-400" : "text-slate-400"}`} />
                      <span className="text-[10px] sm:text-[11px] font-mono font-black">
                        +{phase.chestRewardXp} XP & +{phase.chestRewardCoins} Coin
                      </span>
                    </div>
                  </div>

                  {/* TAILORED LESSON ITEMS LIST */}
                  <div className="space-y-2.5">
                    {phase.tasks.map((task) => {
                      const isSelected = selectedTask?.id === task.id;

                      const getSkillBadge = (type: string) => {
                        switch (type) {
                          case "LISTENING":
                            return { name: "Luyện Nghe", icon: <Headphones className="w-3.5 h-3.5" />, bg: "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border-blue-200 dark:border-blue-800" };
                          case "READING":
                            return { name: "Đọc Hiểu", icon: <BookOpen className="w-3.5 h-3.5" />, bg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" };
                          case "SPEAKING":
                            return { name: "Luyện Nói AI", icon: <Mic className="w-3.5 h-3.5" />, bg: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800" };
                          case "WRITING":
                            return { name: "Luyện Viết", icon: <PenTool className="w-3.5 h-3.5" />, bg: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800" };
                          case "GRAMMAR":
                            return { name: "Ngữ Pháp AI", icon: <ShieldCheck className="w-3.5 h-3.5" />, bg: "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800" };
                          default:
                            return { name: "Từ Vựng", icon: <BookOpen className="w-3.5 h-3.5" />, bg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800" };
                        }
                      };

                      const badge = getSkillBadge(task.taskType);

                      return (
                        <div key={task.id} className="space-y-2">
                          <div
                            onClick={() => setSelectedTask(task)}
                            className={`p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                              isSelected
                                ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 shadow-2xs ring-2 ring-[#0059bb]/20"
                                : task.isCompleted
                                ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500/40 text-slate-800 dark:text-emerald-100 shadow-2xs"
                                : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-[#0059bb]/50"
                            }`}
                          >
                            <div className="flex items-start sm:items-center gap-3 min-w-0 w-full sm:w-auto">
                              {/* Checkbox toggle */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleTaskCompleted(task.id);
                                }}
                                className="shrink-0 mt-0.5 sm:mt-0 cursor-pointer"
                              >
                                {task.isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:border-[#0059bb] transition-colors" />
                                )}
                              </button>

                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black flex items-center gap-1 border ${badge.bg} font-display shrink-0`}>
                                    {badge.icon} {badge.name}
                                  </span>

                                  <span className={`text-xs sm:text-sm font-bold font-display line-clamp-1 ${task.isCompleted ? "line-through text-slate-400" : "text-slate-900 dark:text-white"}`}>
                                    Ngày {task.dayNum}: {task.title}
                                  </span>
                                </div>

                                <p className="text-xs text-slate-500 truncate font-medium max-w-lg">
                                  {task.description}
                                </p>
                              </div>
                            </div>

                            {/* Action Launcher */}
                            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800 shrink-0">
                              <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono font-black text-xs border border-amber-300/30">
                                +{task.xpReward} XP
                              </span>

                              <Link href={task.practicePath}>
                                <Button className="py-1.5 px-3 bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold rounded-xl shadow-2xs flex items-center gap-1 font-display cursor-pointer">
                                  <Play className="w-3 h-3 fill-white" /> Luyện Ngay
                                </Button>
                              </Link>
                            </div>
                          </div>

                          {/* MOBILE INLINE GUIDANCE DRAWER */}
                          {isSelected && (
                            <div className="lg:hidden p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2.5">
                              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-2">
                                <span className="text-xs font-black uppercase text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
                                  <Compass className="w-4 h-4" /> Mẹo Làm Bài Ăn Điểm
                                </span>
                                <Badge variant={task.isCompleted ? "success" : "warning"} className="text-[9px] font-mono font-black">
                                  {task.isCompleted ? "Đã xong" : "Chưa làm"}
                                </Badge>
                              </div>

                              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                                {task.tips.map((tip, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-[#0059bb] font-bold">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>

                              <Link href={task.practicePath} className="block pt-1">
                                <Button className="w-full bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs py-2 rounded-xl shadow-2xs flex items-center justify-center gap-1.5 font-display cursor-pointer">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Bắt Đầu Luyện Tập (+{task.xpReward} XP)
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>

          {/* RIGHT 4-COLS: INSPECTOR COMPANION CARD (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 sticky top-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-display flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#0059bb]" /> Hướng Dẫn Chi Tiết Bài Học
                </span>
                {selectedTask && (
                  <Badge variant={selectedTask.isCompleted ? "success" : "warning"} className="text-[10px] font-mono font-black">
                    {selectedTask.isCompleted ? "Đã xong" : "Chưa làm"}
                  </Badge>
                )}
              </div>

              {selectedTask ? (
                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black font-display text-slate-900 dark:text-white">
                      {selectedTask.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      {selectedTask.description}
                    </p>
                  </div>

                  <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider font-display">Mẹo làm bài ăn điểm</span>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {selectedTask.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#0059bb] font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300 font-mono">
                    <span>Thưởng bài học:</span>
                    <span>+{selectedTask.xpReward} XP</span>
                  </div>

                  <div className="pt-1">
                    <Link href={selectedTask.practicePath} className="w-full block">
                      <Button className="w-full bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs py-2.5 rounded-xl shadow-2xs flex items-center justify-center gap-2 font-display cursor-pointer">
                        <Sparkles className="w-4 h-4 text-amber-300" /> Bắt Đầu Luyện Tập (+{selectedTask.xpReward} XP)
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 space-y-2 text-slate-400">
                  <Compass className="w-10 h-10 mx-auto opacity-40" />
                  <p className="text-xs font-bold">Chọn bài học bất kỳ ở danh sách bên trái để xem hướng dẫn chi tiết.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </PageEntranceWrapper>
  );
}
