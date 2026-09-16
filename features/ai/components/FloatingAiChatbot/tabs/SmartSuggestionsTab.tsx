"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import {
  Lightbulb,
  Sparkles,
  ArrowRight,
  BookOpen,
  Headphones,
  FileText,
  Zap,
  Target,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface SuggestionItem {
  title: string;
  desc: string;
  action?: () => void;
  prompt?: string;
}

interface ContextSuggestionGroup {
  badge: string;
  title: string;
  items: SuggestionItem[];
}

export default function SmartSuggestionsTab() {
  const pathname = usePathname();
  const router = useRouter();
  const { openWithQuestion, setActiveTab } = useAiChatbotStore();

  const getPageContextSuggestions = (): ContextSuggestionGroup => {
    if (pathname?.startsWith("/study/grammar")) {
      return {
        badge: "Ngữ Pháp AI",
        title: "Gợi ý tương tác cho bài Ngữ Pháp",
        items: [
          {
            title: "Trắc nghiệm nhanh 3 câu cùng AI",
            desc: "Kiểm tra mức độ hiểu bài lý thuyết ngay lập tức",
            prompt: "Hãy tạo 3 câu hỏi trắc nghiệm kiểm tra mức độ hiểu bài của tôi về chủ đề ngữ pháp này.",
          },
          {
            title: "3 ví dụ mẫu chuẩn IELTS / TOEIC",
            desc: "Ứng dụng cấu trúc ngữ pháp này vào câu học thuật",
            prompt: "Cho tôi 3 câu ví dụ ứng dụng cấu trúc ngữ pháp này trong bài thi TOEIC và IELTS kèm giải thích.",
          },
          {
            title: "Phân biệt cấu trúc dễ gây nhầm lẫn",
            desc: "Tránh các bẫy đề thi phổ biến của thí sinh Việt Nam",
            prompt: "Chủ đề ngữ pháp này thường dễ bị nhầm lẫn với cấu trúc nào? Hãy phân biệt chi tiết giúp tôi.",
          },
        ],
      };
    }

    if (pathname?.startsWith("/myvideo")) {
      return {
        badge: "Video Song Ngữ",
        title: "Gợi ý tương tác cùng Video Studio",
        items: [
          {
            title: "Giải thích câu phụ đề khó",
            desc: "Phân tích ngữ cảnh, thành ngữ (idioms) trong video",
            prompt: "Hãy giải thích cho tôi các cấu trúc ngữ pháp và từ vựng đáng chú ý trong video này.",
          },
          {
            title: "Luyện Shadowing câu vừa nghe",
            desc: "Học cách nối âm và ngữ điệu tự nhiên của người bản xứ",
            prompt: "Hướng dẫn tôi cách luyện Shadowing hiệu quả với video này từng bước một.",
          },
          {
            title: "Tạo danh sách từ vựng trọng tâm",
            desc: "Trích xuất 5 từ vựng hữu ích nhất từ nội dung video",
            prompt: "Trích xuất giúp tôi 5 từ vựng hoặc cụm collocations hữu ích nhất từ video này.",
          },
        ],
      };
    }

    if (pathname?.startsWith("/vocabulary")) {
      return {
        badge: "Kho Từ Vựng",
        title: "Gợi ý ghi nhớ từ vựng thông minh",
        items: [
          {
            title: "Tạo câu chuyện ngắn với từ vựng",
            desc: "Ghép các từ vừa học thành một câu chuyện hài hước dễ nhớ",
            prompt: "Hãy viết cho tôi một đoạn văn ngắn thú vị bằng tiếng Anh có sử dụng các từ vựng tôi vừa học.",
          },
          {
            title: "Kiểm tra phản xạ từ vựng",
            desc: "AI đố từ qua định nghĩa tiếng Anh",
            prompt: "Hãy đố tôi 3 từ vựng bằng cách đưa ra định nghĩa tiếng Anh để tôi đoán từ nhé!",
          },
        ],
      };
    }

    // Default Dashboard & General suggestions
    return {
      badge: "Lộ Trình Tự Động",
      title: "Gợi ý học tập đề xuất hôm nay",
      items: [
        {
          title: "Bắt đầu 3 nhiệm vụ ngày của lộ trình",
          desc: "Hoàn thành sớm để duy trì chuỗi Streak & nhận thưởng XP",
          action: () => setActiveTab("roadmap"),
        },
        {
          title: "Luyện nghe 1 video ngắn 3 phút",
          desc: "Tăng phản xạ tai nghe với phụ đề song ngữ thông minh",
          action: () => router.push("/myvideo"),
        },
        {
          title: "Ôn tập từ vựng Spaced Repetition",
          desc: "Củng cố các từ vựng đang ở chu kỳ chuẩn bị quên",
          action: () => router.push("/vocabulary"),
        },
      ],
    };
  };

  const contextData = getPageContextSuggestions();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50/60 dark:bg-slate-950/60 overflow-y-auto p-3 sm:p-4 space-y-4 no-scrollbar">
      {/* 1. Context-Aware Highlight Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block leading-none font-mono">
                {contextData.badge}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display mt-0.5">
                {contextData.title}
              </h4>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] border border-blue-200/60">
            Realtime
          </span>
        </div>

        {/* Suggestion Item List */}
        <div className="space-y-2">
          {contextData.items.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (item.action) {
                  item.action();
                } else if (item.prompt) {
                  openWithQuestion(item.prompt);
                }
              }}
              className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/70 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 hover:border-[#0059bb]/50 text-left transition-all duration-200 flex items-center justify-between gap-2.5 group cursor-pointer active:scale-[0.99] shadow-2xs"
            >
              <div className="min-w-0 flex-1">
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors truncate">
                  {item.title}
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                  {item.desc}
                </p>
              </div>

              <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700/80 border border-slate-200/80 dark:border-slate-600 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform shadow-2xs">
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#0059bb]" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Weak Points Remediation Insight */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-[#0059bb]/10 border border-purple-500/20 dark:border-purple-800/40 space-y-2.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider">
            Phân Tích AI: Điểm Cần Cải Thiện
          </h4>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          Dựa trên lịch sử học tập 3 ngày qua, bạn đạt độ chính xác <strong className="text-emerald-600 dark:text-emerald-400 font-bold">85% từ vựng</strong> nhưng cần lưu ý phản xạ nghe điền từ Part 1 TOEIC.
        </p>

        <button
          type="button"
          onClick={() => router.push("/myvideo")}
          className="w-full h-8 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer font-display active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
          <span>Luyện Nghe Cải Thiện Ngay (+20 XP)</span>
        </button>
      </div>
    </div>
  );
}
