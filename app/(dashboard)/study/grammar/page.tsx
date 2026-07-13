"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Zap,
  Target,
  GraduationCap,
  PenTool,
  Lightbulb,
  AlertTriangle,
  Tag,
  FlaskConical,
  MessageSquare,
  Copy,
  Check,
  Send
} from "lucide-react";
import { getGrammarLesson, type GrammarLesson } from "@/lib/data/grammarContent";

interface Exercise {
  id: number;
  sentence: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  difficulty?: string;
}

interface GrammarTopic {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  desc: string;
  level: "basic" | "intermediate" | "advanced";
  focus: string;
}

const GRAMMAR_TOPICS: GrammarTopic[] = [
  // Basic level (20 topics in pedagogical learning order)
  { id: "present_simple", name: "Thì Hiện tại đơn", nameEn: "Present Simple", icon: "⏰", desc: "Mô tả công việc hàng ngày, thói quen và sự thật hiển nhiên.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "present_continuous", name: "Thì Hiện tại tiếp diễn", nameEn: "Present Continuous", icon: "⏳", desc: "Mô tả hành động đang diễn ra tại thời điểm nói hoặc kế hoạch gần.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "past_simple", name: "Thì Quá khứ đơn", nameEn: "Past Simple", icon: "🗓", desc: "Kể lại sự việc đã chấm dứt hoàn toàn trong quá khứ.", level: "basic", focus: "TOEIC Part 6 & IELTS Speaking" },
  { id: "past_continuous", name: "Thì Quá khứ tiếp diễn", nameEn: "Past Continuous", icon: "⏱", desc: "Mô tả hành động đang xảy ra tại một thời điểm xác định trong quá khứ.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "future_simple", name: "Thì Tương lai đơn", nameEn: "Future Simple", icon: "🔮", desc: "Quyết định tự phát, hứa hẹn hoặc dự đoán không căn cứ.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "future_near", name: "Thì Tương lai gần", nameEn: "Be Going To", icon: "🛫", desc: "Dự định, kế hoạch đã có từ trước hoặc dự đoán có căn cứ.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "singular_plural_nouns", name: "Danh từ số ít & số nhiều", nameEn: "Singular & Plural Nouns", icon: "📦", desc: "Quy tắc thêm đuôi -s/es và danh từ biến đổi bất quy tắc.", level: "basic", focus: "TOEIC Part 5" },
  { id: "nouns_countability", name: "Danh từ đếm được & không đếm được", nameEn: "Countable & Uncountable Nouns", icon: "🥛", desc: "Phân biệt danh từ đếm được, không đếm được và đơn vị đo lường.", level: "basic", focus: "TOEIC Part 5" },
  { id: "subject_object_pronouns", name: "Đại từ chủ ngữ & tân ngữ", nameEn: "Subject & Object Pronouns", icon: "👥", desc: "Cách định dạng chủ từ và túc từ đứng trước/sau động từ.", level: "basic", focus: "TOEIC Part 5" },
  { id: "reflexive_demonstrative", name: "Đại từ phản thân & chỉ định", nameEn: "Reflexive & Demonstrative Pronouns", icon: "👈", desc: "Cách sử dụng đại từ phản thân (myself) và từ chỉ định (this, that).", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "possessive_adj_pronouns", name: "Tính từ & Đại từ sở hữu", nameEn: "Possessive Adjectives & Pronouns", icon: "🔑", desc: "Phân biệt cách dùng tính từ sở hữu (my) và đại từ sở hữu (mine).", level: "basic", focus: "TOEIC Part 5" },
  { id: "possessive_case", name: "Danh từ sở hữu cách ('s)", nameEn: "Possessive Case", icon: "📎", desc: "Cách biểu thị quyền sở hữu đối với người và vật hữu sinh.", level: "basic", focus: "TOEIC Part 5" },
  { id: "determiners_basic", name: "Từ hạn định: Some, Any, No", nameEn: "Basic Determiners", icon: "🔢", desc: "Quy tắc dùng một vài, bất kỳ và không có gì trong câu.", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "quantifiers_basic", name: "Lượng từ: Much, Many, Few, Little", nameEn: "Basic Quantifiers", icon: "📊", desc: "Dùng các lượng từ chỉ số lượng nhiều/ít với danh từ đếm/không đếm được.", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "basic_articles", name: "Mạo từ xác định & Không xác định", nameEn: "Basic Articles (A, An, The)", icon: "📝", desc: "Quy tắc dùng mạo từ A, An, The hoặc lược bỏ mạo từ.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "basic_adj_adv", name: "Tính từ & Trạng từ chỉ thể cách", nameEn: "Adjectives & Adverbs of Manner", icon: "✨", desc: "Nhận biết vị trí tính từ và trạng từ đuôi -ly bổ nghĩa động từ.", level: "basic", focus: "TOEIC Part 5" },
  { id: "comparatives_basic", name: "So sánh bằng & So sánh hơn", nameEn: "Basic Comparatives", icon: "📊", desc: "Cấu trúc so sánh bằng (as...as) và so sánh hơn của tính từ ngắn/dài.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "superlatives_basic", name: "Cấu trúc So sánh nhất", nameEn: "Superlatives", icon: "🏆", desc: "Cấu trúc so sánh nhất của tính từ ngắn/dài và trạng từ.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "time_prepositions", name: "Giới từ chỉ Thời gian", nameEn: "Prepositions of Time", icon: "⏳", desc: "Quy tắc sử dụng các giới từ thời gian In, On, At, For, Since.", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "place_prepositions", name: "Giới từ chỉ Nơi chốn & Hướng", nameEn: "Prepositions of Place & Direction", icon: "📍", desc: "Cách định vị không gian: In, On, At, Under, Into, To, Across.", level: "basic", focus: "TOEIC Part 5 & 6" },

  // Intermediate level (20 topics in pedagogical learning order)
  { id: "perfect_present", name: "Thì Hiện tại hoàn thành", nameEn: "Present Perfect", icon: "⏳", desc: "Mô tả kinh nghiệm, hành động vừa xảy ra kéo dài đến hiện tại.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "perfect_present_cont", name: "Thì Hiện tại hoàn thành tiếp diễn", nameEn: "Present Perfect Continuous", icon: "🔄", desc: "Nhấn mạnh tính liên tục của hành động bắt đầu từ quá khứ kéo dài đến nay.", level: "intermediate", focus: "IELTS Speaking & Writing" },
  { id: "perfect_past", name: "Thì Quá khứ hoàn thành", nameEn: "Past Perfect", icon: "⏮", desc: "Mô tả hành động hoàn thành trước một hành động quá khứ khác.", level: "intermediate", focus: "TOEIC Part 6 & IELTS Writing" },
  { id: "perfect_past_cont", name: "Thì Quá khứ hoàn thành tiếp diễn", nameEn: "Past Perfect Continuous", icon: "⏳", desc: "Nhấn mạnh tính liên tục của sự việc trước một mốc quá khứ khác.", level: "intermediate", focus: "IELTS Writing Task 2" },
  { id: "perfect_future", name: "Thì Tương lai hoàn thành", nameEn: "Future Perfect", icon: "⏭", desc: "Mô tả sự việc sẽ hoàn tất trước một thời điểm ở tương lai.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "perfect_future_cont", name: "Thì Tương lai hoàn thành tiếp diễn", nameEn: "Future Perfect Continuous", icon: "⌛", desc: "Mô tả tính liên tục của hành động kéo dài đến một mốc tương lai.", level: "intermediate", focus: "IELTS Writing Task 1" },
  { id: "passive_basic", name: "Câu bị động các thì cơ bản", nameEn: "Passive Voice in Basic Tenses", icon: "🔄", desc: "Chuyển câu chủ động sang bị động với thì hiện tại, quá khứ, tương lai.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "passive_modals_cont", name: "Câu bị động khuyết thiếu & tiếp diễn", nameEn: "Passive with Modals & Continuous", icon: "🔄", desc: "Cấu trúc bị động với modal verbs (should be done) và thì tiếp diễn (being done).", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "conditionals_0_1", name: "Câu điều kiện Loại 0 & Loại 1", nameEn: "Conditionals Type 0 & 1", icon: "🔀", desc: "Diễn tả chân lý khoa học hoặc giả định thực tế có thể xảy ra ở tương lai.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "conditionals_2", name: "Câu điều kiện Loại 2", nameEn: "Conditionals Type 2", icon: "🔀", desc: "Giả định trái ngược hoàn toàn với thực tế ở hiện tại.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "relative_defining", name: "Mệnh đề quan hệ xác định", nameEn: "Defining Relative Clauses", icon: "🔗", desc: "Mệnh đề cung cấp thông tin bắt buộc phải có cho danh từ đứng trước.", level: "intermediate", focus: "TOEIC Part 5 & 6" },
  { id: "relative_non_defining", name: "Mệnh đề quan hệ không xác định", nameEn: "Non-defining Relative Clauses", icon: "🔗", desc: "Bổ sung thông tin phụ cho danh từ đã xác định (ngăn cách bởi dấu phẩy).", level: "intermediate", focus: "TOEIC Part 5 & 6" },
  { id: "gerunds_usage", name: "Danh động từ làm Chủ & Tân ngữ", nameEn: "Gerunds as Subjects & Objects", icon: "🎯", desc: "Cấu trúc danh động từ đứng đầu câu làm chủ ngữ hoặc sau giới từ.", level: "intermediate", focus: "TOEIC Part 5" },
  { id: "infinitives_usage", name: "Động từ nguyên mẫu có 'to' & không 'to'", nameEn: "Infinitives with/without To", icon: "🎯", desc: "Quy tắc sử dụng to-V và V-bare sau các động từ đặc biệt.", level: "intermediate", focus: "TOEIC Part 5" },
  { id: "modal_obligation", name: "Động từ khuyết thiếu bắt buộc & khuyên bảo", nameEn: "Modals of Obligation & Advice", icon: "💡", desc: "Cách dùng diễn tả trách nhiệm, lời khuyên: Must, Have to, Should, Ought to.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "modal_ability", name: "Động từ khuyết thiếu xin phép & khả năng", nameEn: "Modals of Permission & Ability", icon: "💡", desc: "Diễn tả năng lực, khả năng xảy ra hoặc xin phép: Can, Could, May, Might.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "conjunctions_coordinating", name: "Liên từ kết hợp & Liên từ tương hợp", nameEn: "Coordinating & Correlative Conjunctions", icon: "🖇", desc: "Nối các từ/mệnh đề độc lập: FANBOYS, both...and, either...or, neither...nor.", level: "intermediate", focus: "TOEIC Part 5 & 6" },
  { id: "conjunctions_cause_effect", name: "Mệnh đề trạng ngữ chỉ Lý do & Kết quả", nameEn: "Adverbial Clauses of Cause & Effect", icon: "📝", desc: "Mệnh đề phụ thuộc dùng Because, Since, As, So, Therefore, Consequently.", level: "intermediate", focus: "TOEIC Part 5 & 6 & IELTS Writing Task 2" },
  { id: "reported_statements", name: "Câu gián tiếp tường thuật câu kể", nameEn: "Reported Speech: Statements", icon: "💬", desc: "Quy tắc lùi thì, đổi đại từ, trạng ngữ chỉ thời gian khi thuật lại câu kể.", level: "intermediate", focus: "TOEIC Part 7 & IELTS Speaking" },
  { id: "reported_questions", name: "Câu gián tiếp tường thuật câu hỏi", nameEn: "Reported Speech: Questions & Commands", icon: "💬", desc: "Thuật lại câu hỏi Yes/No, câu hỏi Wh- và câu ra lệnh yêu cầu.", level: "intermediate", focus: "TOEIC Part 7 & IELTS Speaking" },

  // Advanced level (20 topics in pedagogical learning order)
  { id: "noun_clauses_basic", name: "Mệnh đề danh từ làm Chủ & Tân ngữ", nameEn: "Noun Clauses as Subjects & Objects", icon: "💬", desc: "Mệnh đề đóng vai trò danh từ đứng đầu câu hoặc sau động từ chính.", level: "advanced", focus: "IELTS Writing Task 2 & TOEIC Part 6" },
  { id: "noun_clauses_advanced", name: "Mệnh đề danh từ làm bổ ngữ & đồng vị", nameEn: "Noun Clauses as Complements", icon: "💬", desc: "Mệnh đề danh từ đóng vai trò bổ nghĩa cho tính từ hoặc đồng vị đứng sau danh từ.", level: "advanced", focus: "IELTS Writing Task 2" },
  { id: "conditionals_3", name: "Câu điều kiện Loại 3", nameEn: "Conditionals Type 3", icon: "🔀", desc: "Giả định trái ngược hoàn toàn với thực tế đã xảy ra trong quá khứ.", level: "advanced", focus: "IELTS Writing & Speaking (Band 7.0+)" },
  { id: "conditionals_mixed", name: "Câu điều kiện Hỗn hợp (Mixed)", nameEn: "Mixed Conditionals", icon: "🔀", desc: "Kết hợp giả định quá khứ có ảnh hưởng/kết quả ở hiện tại và ngược lại.", level: "advanced", focus: "IELTS Writing & Speaking (Band 7.0+)" },
  { id: "conditional_inversion", name: "Đảo ngữ trong câu điều kiện", nameEn: "Inversion in Conditionals", icon: "🔀", desc: "Lược bỏ 'If' và đảo trợ động từ lên đầu câu: Should I, Were I, Had I.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "inversion", name: "Đảo ngữ với Trạng từ phủ định", nameEn: "Inversion with Negative Adverbs", icon: "🔄", desc: "Đảo trợ động từ lên trước chủ ngữ: Never, Seldom, Hardly, Under no circumstances.", level: "advanced", focus: "IELTS Writing Task 2 (Band 7.0+)" },
  { id: "subjunctive_mood", name: "Thể giả định nâng cao", nameEn: "Advanced Subjunctive Mood", icon: "⚖️", desc: "Cấu trúc giả định trong câu khuyên bảo trang trọng: demand that, crucial that.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "reduced_relative", name: "Rút gọn mệnh đề quan hệ (Chủ/Bị động)", nameEn: "Reduced Relative Clauses", icon: "✂️", desc: "Lược bỏ đại từ quan hệ và động từ to-be, dùng cụm V-ing hoặc V3/ed.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "participle_clauses", name: "Mệnh đề phân từ đồng chủ ngữ", nameEn: "Participle Clauses", icon: "✂️", desc: "Kết nối 2 hành động cùng chủ ngữ sử dụng V-ing (chủ động) hoặc V3/ed (bị động).", level: "advanced", focus: "IELTS Writing Task 2 (Band 7.5+)" },
  { id: "reduced_adverbial", name: "Rút gọn mệnh đề trạng ngữ", nameEn: "Reduced Adverbial Clauses", icon: "✂️", desc: "Lược bỏ chủ ngữ phụ trong mệnh đề thời gian/nhượng bộ: Although playing, When finished.", level: "advanced", focus: "IELTS Writing Task 2 & TOEIC Part 6" },
  { id: "double_passive", name: "Bị động kép & Bị động phi cá nhân", nameEn: "Double & Impersonal Passive", icon: "🔄", desc: "Cấu trúc tường thuật khách quan: It is believed that / She is said to.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "cleft_sentences", name: "Câu chẻ nhấn mạnh", nameEn: "Cleft Sentences", icon: "⚡", desc: "Cấu trúc nhấn mạnh tiêu điểm thông tin cụ thể: It is... that... / What... is...", level: "advanced", focus: "IELTS Writing Task 2 & Speaking" },
  { id: "double_comparatives", name: "So sánh kép (The more... the more...)", nameEn: "Double Comparatives", icon: "📈", desc: "Cấu trúc nhân quả song song biểu thị sự biến đổi tương thích.", level: "advanced", focus: "IELTS Writing Task 2" },
  { id: "advanced_comparatives", name: "So sánh bội số & So sánh ẩn", nameEn: "Advanced Comparatives", icon: "📈", desc: "Cấu trúc so sánh nâng cao: gấp bao nhiêu lần, so sánh ngầm.", level: "advanced", focus: "IELTS Writing Task 1 & TOEIC Part 5" },
  { id: "advanced_modals", name: "Động từ khuyết thiếu quá khứ (Perfect Modals)", nameEn: "Advanced Past Modals", icon: "🛡", desc: "Đoán nhận sự việc quá khứ: must have done, should have done, needn't have done.", level: "advanced", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "parallel_structure", name: "Cấu trúc song hành nâng cao", nameEn: "Parallel Structure", icon: "⚖️", desc: "Đồng bộ từ loại trong chuỗi thông tin để tăng điểm mạch lạc và liên kết.", level: "advanced", focus: "IELTS Writing Task 2 (Band 7.0+)" },
  { id: "subject_verb_exceptions", name: "Hòa hợp Chủ - Vị ngoại lệ", nameEn: "Subject-Verb Agreement Exceptions", icon: "🤝", desc: "Các quy tắc chia động từ phức tạp với danh từ tập hợp, đại từ bất định.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "advanced_determiners", name: "Từ hạn định & Lượng từ nâng cao", nameEn: "Advanced Determiners", icon: "🔢", desc: "Phân biệt cách dùng nâng cao: Either, Neither, None, Both, Each, Every.", level: "advanced", focus: "TOEIC Part 5" },
  { id: "prepositional_phrases", name: "Cụm giới từ đi kèm (Collocations)", nameEn: "Prepositional Collocations", icon: "📍", desc: "Các cụm giới từ cố định đi với danh từ, động từ và tính từ phổ biến trong viết luận.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "emphatic_fronting", name: "Cấu trúc nhấn mạnh bổ trợ (Fronting)", nameEn: "Emphatic Structures & Fronting", icon: "🚀", desc: "Đảo ngữ hoặc đảo thành tố câu lên đầu câu để tạo hiệu ứng tu từ mạnh mẽ.", level: "advanced", focus: "IELTS Writing & Speaking (Band 8.0+)" }
];

const topicsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
} as const;

const topicItemVariants = {
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

function parseFormula(formula: string) {
  let type: "affirmative" | "negative" | "interrogative" | "general" = "general";
  let cleanText = formula;
  if (formula.startsWith("(+)")) {
    type = "affirmative";
    cleanText = formula.substring(3).trim();
  } else if (formula.startsWith("(-)")) {
    type = "negative";
    cleanText = formula.substring(3).trim();
  } else if (formula.startsWith("(?)")) {
    type = "interrogative";
    cleanText = formula.substring(3).trim();
  }
  return { type, cleanText };
}

interface ParsedHeading {
  text: string;
  slug: string;
  level: number;
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-5 border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-black/30 rounded-2xl overflow-hidden relative group font-mono text-xs sm:text-sm shadow-inner">
      <div className="flex justify-between items-center px-4 py-2.5 bg-slate-100/50 dark:bg-neutral-900 border-b border-slate-200/50 dark:border-neutral-850 text-slate-500 dark:text-slate-400 text-xs font-bold select-none">
        <span>Cú pháp & Ví dụ mẫu</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-650 dark:hover:text-indigo-400 transition cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[10px] sm:text-xs">Đã chép!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[10px] sm:text-xs">Sao chép</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 sm:p-5 overflow-x-auto text-slate-800 dark:text-indigo-300 whitespace-pre-wrap leading-relaxed select-all">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderVisualFormula(formulaText: string) {
  const tokens = formulaText.split(/(\s*\+\s*)/);
  return (
    <div className="flex flex-nowrap items-center gap-1 sm:gap-1.5 font-sans w-full py-0.5 overflow-hidden select-none">
      {tokens.map((token, index) => {
        const cleanToken = token.trim();
        if (cleanToken === "+") {
          return (
            <span key={index} className="text-slate-400 dark:text-slate-300 font-extrabold text-[10px] sm:text-xs shrink-0">
              →
            </span>
          );
        }
        if (!cleanToken) return null;
        
        let bgStyle = "bg-slate-100 text-slate-700 dark:bg-neutral-850 dark:text-slate-355 border-slate-250 dark:border-neutral-850";
        const lowerToken = cleanToken.toLowerCase();
        if (lowerToken === "s" || lowerToken.includes("subject")) {
          bgStyle = "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-850/30";
        } else if (lowerToken.startsWith("v") || lowerToken.includes("verb")) {
          bgStyle = "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-850/30";
        } else if (lowerToken === "o" || lowerToken.includes("object")) {
          bgStyle = "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-850/30";
        } else if (lowerToken.includes("not") || lowerToken.includes("don't") || lowerToken.includes("doesn't")) {
          bgStyle = "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-850/30";
        } else if (lowerToken.includes("do") || lowerToken.includes("does") || lowerToken.includes("did") || lowerToken.includes("has") || lowerToken.includes("have") || lowerToken.includes("will") || lowerToken.includes("modal")) {
          bgStyle = "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-850/30";
        }
        return (
          <span
            key={index}
            className={`px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border text-[10px] sm:text-[11px] font-black tracking-wide shadow-sm leading-none flex items-center shrink-0 ${bgStyle}`}
          >
            {cleanToken}
          </span>
        );
      })}
    </div>
  );
}

function parseMarkdown(md: string): { elements: React.ReactNode[]; headings: ParsedHeading[] } {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  const headings: ParsedHeading[] = [];
  
  let currentCodeBlock: string[] = [];
  let inCodeBlock = false;
  
  let currentBlockquote: string[] = [];
  let inBlockquote = false;

  let currentList: string[] = [];
  let inList = false;

  let currentTable: string[] = [];
  let inTable = false;

  const renderText = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;
    const codeRegex = /`(.*?)`/g;
    
    let parts: React.ReactNode[] = [text];
    
    parts = parts.flatMap(part => {
      if (typeof part !== 'string') return part;
      const subparts = part.split(/\*\*(.*?)\*\*/);
      return subparts.map((sp, idx) => idx % 2 === 1 ? <strong key={`bold-${idx}`} className="font-black text-slate-900 dark:text-white">{sp}</strong> : sp);
    });

    parts = parts.flatMap(part => {
      if (typeof part !== 'string') return part;
      const subparts = part.split(/\*(.*?)\*/);
      return subparts.map((sp, idx) => idx % 2 === 1 ? <em key={`italic-${idx}`} className="italic text-indigo-650 dark:text-indigo-400 font-bold">{sp}</em> : sp);
    });

    parts = parts.flatMap(part => {
      if (typeof part !== 'string') return part;
      const subparts = part.split(/`(.*?)`/);
      return subparts.map((sp, idx) => idx % 2 === 1 ? <code key={`code-${idx}`} className="font-mono text-xs sm:text-sm px-1.5 py-0.5 rounded bg-slate-100 dark:bg-black text-indigo-600 dark:text-indigo-400 font-bold border border-slate-200/50 dark:border-neutral-800">{sp}</code> : sp);
    });

    return parts;
  };

  const flushCode = (key: number) => {
    if (currentCodeBlock.length > 0) {
      const codeStr = currentCodeBlock.join("\n");
      elements.push(<CodeBlock key={`code-${key}`} code={codeStr} />);
      currentCodeBlock = [];
      inCodeBlock = false;
    }
  };

  const flushBlockquote = (key: number) => {
    if (currentBlockquote.length > 0) {
      const text = currentBlockquote.join(" ");
      let type: "info" | "warning" = "info";
      let cleanText = text;
      if (text.includes("[CHÚ Ý]") || text.includes("[LƯU Ý]") || text.includes("[CẢNH BÁO]")) {
        type = "warning";
        cleanText = text.replace(/\[(CHÚ Ý|LƯU Ý|CẢNH BÁO)\]/g, "").trim();
      }
      elements.push(
        <div 
          key={`quote-${key}`} 
          className={`my-5 border-l-[4px] p-4.5 rounded-r-2xl text-xs sm:text-sm leading-relaxed font-semibold shadow-sm ${
            type === "warning"
              ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/10 text-amber-900 dark:text-amber-200"
              : "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/10 text-slate-800 dark:text-slate-200"
          }`}
        >
          <div className="flex gap-3 items-start">
            <span className="text-base sm:text-lg shrink-0 mt-0.5">{type === "warning" ? "⚠️" : "💡"}</span>
            <div className="flex-1">{renderText(cleanText)}</div>
          </div>
        </div>
      );
      currentBlockquote = [];
      inBlockquote = false;
    }
  };

  const flushList = (key: number) => {
    if (currentList.length > 0) {
      elements.push(
        <div key={`ul-${key}`} className="my-4 pl-1 space-y-3">
          {currentList.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <div className="text-sm md:text-base text-slate-700 dark:text-slate-350 leading-relaxed font-medium flex-1">
                {renderText(item)}
              </div>
            </div>
          ))}
        </div>
      );
      currentList = [];
      inList = false;
    }
  };

  const flushTable = (key: number) => {
    if (currentTable.length > 0) {
      let tableHeaders: string[] = [];
      let tableRows: string[][] = [];
      
      currentTable.forEach((line) => {
        const cols = line.split("|").map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (line.includes("-") && cols.every(c => c.match(/^-+$/))) {
          return;
        }
        if (tableHeaders.length === 0) {
          tableHeaders = cols;
        } else {
          tableRows.push(cols);
        }
      });

      if (tableHeaders.length > 0 || tableRows.length > 0) {
        elements.push(
          <div key={`table-wrapper-${key}`} className="overflow-x-auto my-6 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-sm bg-white dark:bg-neutral-900">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50/80 dark:bg-neutral-950 text-slate-800 dark:text-white font-black border-b border-slate-200 dark:border-neutral-800">
                <tr>
                  {tableHeaders.map((h, idx) => (
                    <th key={idx} className="px-4 py-3.5 font-extrabold">{renderText(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-neutral-800 text-slate-600 dark:text-slate-300">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-neutral-800/20 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3.5 font-semibold">{renderText(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      currentTable = [];
      inTable = false;
    }
  };

  const flushAll = (key: number) => {
    flushList(key);
    flushTable(key);
    flushBlockquote(key);
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCode(i);
      } else {
        flushAll(i);
        inCodeBlock = true;
      }
      continue;
    }
    
    if (inCodeBlock) {
      currentCodeBlock.push(lines[i]);
      continue;
    }

    if (line.startsWith(">")) {
      flushList(i);
      flushTable(i);
      inBlockquote = true;
      currentBlockquote.push(line.substring(1).trim());
      continue;
    } else {
      flushBlockquote(i);
    }

    if (line.startsWith("|")) {
      flushList(i);
      inTable = true;
      currentTable.push(line);
      continue;
    } else {
      flushTable(i);
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      currentList.push(line.substring(2).trim());
      continue;
    } else {
      flushList(i);
    }

    if (line.startsWith("## ")) {
      const text = line.substring(3).trim();
      const slug = text.replace(/[^a-zA-Z0-9\s-]/g, '').trim().toLowerCase().replace(/\s+/g, '-');
      headings.push({ text, slug, level: 2 });
      elements.push(
        <h2 
          key={i} 
          id={slug} 
          className="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-8 mb-4 border-l-[3.5px] border-indigo-500 pl-3.5 scroll-mt-20 flex items-center gap-2"
        >
          {renderText(text)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      const text = line.substring(4).trim();
      const slug = text.replace(/[^a-zA-Z0-9\s-]/g, '').trim().toLowerCase().replace(/\s+/g, '-');
      headings.push({ text, slug, level: 3 });
      elements.push(
        <h3 
          key={i} 
          id={slug} 
          className="text-base md:text-lg font-black text-indigo-600 dark:text-indigo-400 mt-6 mb-3 scroll-mt-20 flex items-center gap-1.5"
        >
          <span className="text-indigo-500 text-sm">✦</span> {renderText(text)}
        </h3>
      );
    } else if (line.startsWith("#### ")) {
      const text = line.substring(5).trim();
      elements.push(
        <h4 key={i} className="text-sm md:text-base font-extrabold text-slate-700 dark:text-white mt-4 mb-2">
          {renderText(text)}
        </h4>
      );
    } else if (line !== "") {
      elements.push(
        <p key={i} className="text-sm md:text-base text-slate-600 dark:text-slate-350 leading-relaxed my-3.5 font-medium">
          {renderText(line)}
        </p>
      );
    }
  }

  flushAll(lines.length);
  return { elements, headings };
}

export default function GrammarLabPage() {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<"basic" | "intermediate" | "advanced">("basic");
  const [activeTab, setActiveTab] = useState<"lesson" | "exercise">("lesson");
  const [lessonData, setLessonData] = useState<GrammarLesson | null>(null);
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // New sub-tab state for interactive AI Lecture Lab
  const [activeSubTab, setActiveSubTab] = useState<"summary" | "deep_dive" | "chat">("summary");
  const [deepDiveContent, setDeepDiveContent] = useState<string>("");
  const [guideCache, setGuideCache] = useState<Record<string, string>>({});
  const [guideLoading, setGuideLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [activeHeading, setActiveHeading] = useState<string>("");

  const parsedDeepDive = useMemo(() => {
    if (!deepDiveContent) return { elements: [], headings: [] };
    return parseMarkdown(deepDiveContent);
  }, [deepDiveContent]);

  const scrollToAnchor = useCallback((slug: string) => {
    setActiveHeading(slug);
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const openTopic = useCallback((topicId: string) => {
    setSelectedTopic(topicId);
    setActiveTab("lesson");
    setActiveSubTab("summary");
    setDeepDiveContent(guideCache[`${topicId}_${activeLevel}`] || "");
    setChatMessages([]);
    setChatInput("");
    setExercises([]);
    setCurrentIndex(0);
    setAnswers({});
    setCheckedQuestions({});
    setShowResults(false);
    setSubmitted(false);
    // Load static lesson content
    const lesson = getGrammarLesson(topicId);
    setLessonData(lesson || null);
  }, [guideCache, activeLevel]);

  const fetchDeepDiveGuide = useCallback(async (topicId: string, level: string) => {
    const cacheKey = `${topicId}_${level}`;
    if (guideCache[cacheKey]) {
      setDeepDiveContent(guideCache[cacheKey]);
      return;
    }
    setGuideLoading(true);
    try {
      const res = await fetch("/api/ai/grammar/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, level, mode: "generate_guide" }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.guide) {
        setDeepDiveContent(data.guide);
        setGuideCache((prev) => ({ ...prev, [cacheKey]: data.guide }));
      }
    } catch {
      addToast({ type: "error", title: "Lỗi!", message: "Không thể tải bài giảng chuyên sâu. Vui lòng thử lại." });
    } finally {
      setGuideLoading(false);
    }
  }, [guideCache, addToast]);

  const sendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || chatLoading || !selectedTopic) return;

    const userText = chatInput.trim();
    setChatInput("");
    
    const updatedMessages = [...chatMessages, { role: "user" as const, text: userText }];
    setChatMessages(updatedMessages);
    setChatLoading(true);

    try {
      const res = await fetch("/api/ai/grammar/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: selectedTopic,
          level: activeLevel,
          mode: "chat",
          messages: updatedMessages,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.reply) {
        setChatMessages([...updatedMessages, { role: "ai" as const, text: data.reply }]);
      }
    } catch {
      addToast({ type: "error", title: "Lỗi!", message: "Không thể kết nối trợ lý AI." });
    } finally {
      setChatLoading(false);
    }
  };

  const generateExercises = async () => {
    if (!selectedTopic) return;
    setActiveTab("exercise");
    setLoading(true);
    setExercises([]);
    setCurrentIndex(0);
    setAnswers({});
    setCheckedQuestions({});
    setShowResults(false);
    setSubmitted(false);

    try {
      const res = await fetch("/api/ai/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic, level: activeLevel }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      if (data.exercises) {
        setExercises(data.exercises);
      }
    } catch {
      addToast({ type: "error", title: "Lỗi!", message: "Không thể sinh bài tập. Vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (exerciseId: number, answer: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [exerciseId]: answer }));
  };

  const submitAll = async () => {
    setSubmitted(true);
    setShowResults(true);
    const correctCount = exercises.filter((ex) => answers[ex.id] === ex.correctAnswer).length;
    const xpEarned = correctCount * 5 + 20;

    try {
      await fetch("/api/ai/grammar/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: selectedTopic,
          level: activeLevel,
          score: correctCount,
          xpEarned: xpEarned
        })
      });
    } catch (dbErr) {
      console.error("Failed to submit progress:", dbErr);
    }

    awardXp(xpEarned);
    addToast({
      type: "xp",
      title: `+${xpEarned} XP!`,
      message: `Đúng ${correctCount}/${exercises.length} câu. Làm tốt lắm!`,
    });
  };

  const currentExercise = exercises[currentIndex];
  const filteredTopics = GRAMMAR_TOPICS.filter((t) => t.level === activeLevel);
  const selectedTopicData = GRAMMAR_TOPICS.find((t) => t.id === selectedTopic);

  // Topic selection screen
  if (!selectedTopic) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 pb-24 md:pb-12 px-4 sm:px-6" suppressHydrationWarning>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="bezel overflow-hidden rounded-[2rem]"
        >
          <div className="bezel-inner bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50/30 dark:from-neutral-950 dark:via-indigo-950/20 dark:to-purple-950/10 p-4 sm:p-6 md:p-8 relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight flex items-center gap-2 sm:gap-3 text-slate-900 dark:text-white font-display">
              <BookOpen className="h-6 w-6 sm:h-8 w-8 text-indigo-500 animate-pulse shrink-0" /> Phòng luyện Ngữ pháp AI
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium leading-relaxed max-w-3xl">
              Chọn chủ đề ngữ pháp IELTS & TOEIC tích hợp — Gemini AI sẽ phân tích trình độ và tự động sinh bài tập trắc nghiệm riêng biệt cho bạn.
            </p>
          </div>
        </motion.div>

        {/* Level Tabs selector */}
        <div className="flex w-full sm:w-fit gap-1 p-1.5 bg-slate-100 dark:bg-neutral-950 rounded-2xl">
          {[
            { id: "basic", name: "Cơ bản" },
            { id: "intermediate", name: "Trung cấp" },
            { id: "advanced", name: "Nâng cao" }
          ].map((lvl) => {
            const active = activeLevel === lvl.id;
            const count = GRAMMAR_TOPICS.filter(t => t.level === lvl.id).length;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setActiveLevel(lvl.id as any)}
                className={`flex-1 sm:flex-initial text-center px-4 sm:px-6 py-3 rounded-xl text-sm font-black cursor-pointer transition-all select-none flex items-center justify-center gap-1.5 ${
                  active 
                    ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {lvl.name}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  active ? "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" : "bg-slate-200 dark:bg-neutral-800 text-slate-500 dark:text-slate-400"
                }`}>{count}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          variants={topicsContainerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredTopics.map((topic) => (
            <motion.div
              variants={topicItemVariants}
              whileHover={{ translateY: -4 }}
              whileTap={{ scale: 0.98 }}
              key={topic.id}
              onClick={() => openTopic(topic.id)}
              className="cursor-pointer group p-1 bg-slate-100/40 dark:bg-neutral-900/40 border border-slate-200/20 dark:border-neutral-800/20 rounded-[2rem]"
            >
              <Card
                variant="bezel"
                className={`p-4 sm:p-6 flex flex-col justify-between h-full bg-white dark:bg-neutral-900 border-t-[4px] ${
                  topic.level === "basic"
                    ? "border-t-emerald-500"
                    : topic.level === "intermediate"
                    ? "border-t-sky-500"
                    : "border-t-amber-500"
                } border-l border-r border-b border-slate-250 dark:border-neutral-800 rounded-[calc(2rem-0.25rem)] relative overflow-hidden shadow-sm`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-4xl">{topic.icon}</div>
                    <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                      {topic.focus.split("&").map((part, pIdx) => (
                        <Badge key={pIdx} variant="neutral" className="text-[9px] font-black px-2 py-0.5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-neutral-850 rounded-md shrink-0">
                          {part.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-black text-slate-800 dark:text-white group-hover:text-indigo-500 transition-colors">{topic.name}</h3>
                  <p className="text-xs text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider">{topic.nameEn}</p>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-350 leading-relaxed font-medium mt-2">{topic.desc}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                    <Sparkles className="h-4.5 w-4.5 text-yellow-500 animate-pulse" /> Bắt đầu học 
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500">
                    <ArrowRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // ── LESSON + EXERCISE TABS SCREEN ──
  if (activeTab === "lesson" && lessonData) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 pb-24 md:pb-12 px-4 sm:px-6" suppressHydrationWarning>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <Button variant="secondary" size="sm" className="cursor-pointer rounded-xl font-bold px-4 py-2 hover:bg-slate-200/50" onClick={() => { setSelectedTopic(null); setLessonData(null); }}>
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Chọn chủ đề khác
          </Button>
          <Badge variant="primary" className="text-sm font-black px-4 py-1.5 flex items-center gap-1.5 shadow-sm">
            <span className="text-lg">{selectedTopicData?.icon}</span> {selectedTopicData?.name}
          </Badge>
        </motion.div>
        {/* Tab Navigation — 3 content tabs + 1 CTA */}
        <div className="border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center justify-between gap-3">
            {/* Content tabs */}
            <div 
              className="flex overflow-x-auto gap-1 sm:gap-1.5 pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
               {([
                { key: "summary" as const, label: "Tóm tắt cốt lõi", mobileLabel: "Tóm tắt", icon: <GraduationCap className="h-4 w-4 shrink-0" /> },
                { key: "deep_dive" as const, label: "Cẩm nang Chuyên sâu", mobileLabel: "Cẩm nang", icon: <BookOpen className="h-4 w-4 shrink-0" /> },
                { key: "chat" as const, label: "Hỏi Trợ lý AI", mobileLabel: "Hỏi AI", icon: <MessageSquare className="h-4 w-4 shrink-0" /> },
              ]).map((tab) => {
                const isActive = activeSubTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveTab("lesson");
                      setActiveSubTab(tab.key);
                      if (tab.key === "deep_dive") fetchDeepDiveGuide(selectedTopic, activeLevel);
                    }}
                    className={`whitespace-nowrap shrink-0 text-xs sm:text-sm font-black px-3 sm:px-4 py-2.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
                      isActive
                        ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20"
                        : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.mobileLabel}</span>
                  </button>
                );
              })}
            </div>
            {/* CTA: Luyện tập AI — tách riêng khỏi tabs */}
            <button
              type="button"
              onClick={() => generateExercises()}
              className="whitespace-nowrap shrink-0 text-xs sm:text-sm font-black px-3 sm:px-5 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-[0.97] transition-all mb-px"
            >
              <PenTool className="h-3.5 w-3.5 shrink-0" /> <span className="hidden sm:inline">Luyện tập AI</span><span className="sm:hidden">Luyện tập</span>
            </button>
          </div>
        </div>

        {/* ═══════════ Tab Content: Tóm tắt cốt lõi ═══════════ */}
        {activeSubTab === "summary" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 85, damping: 15 }}
              className="space-y-8"
            >
              {/* ─── FORMULAS: Full-width hero card ─── */}
              <div className="p-1.5 bg-slate-100/40 dark:bg-neutral-950/40 border border-slate-200/25 dark:border-neutral-800/20 rounded-[2rem]">
                <Card variant="bezel" className="overflow-hidden bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-[calc(2rem-0.375rem)] shadow-sm">
                  <div className="px-5 sm:px-6 py-4 bg-slate-50 dark:bg-neutral-950 border-b border-slate-100 dark:border-neutral-800 flex items-center gap-2.5">
                    <FlaskConical className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-sm md:text-base font-black text-slate-800 dark:text-white">Công thức Ngữ pháp</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                      {lessonData.formulas.map((f, i) => {
                        const { type, cleanText } = parseFormula(f);
                        let badgeLabel = "";
                        let accentColor = "";
                        let icon = "";
                        switch (type) {
                          case "affirmative":
                            badgeLabel = "Khẳng định";
                            accentColor = "emerald";
                            icon = "➕";
                            break;
                          case "negative":
                            badgeLabel = "Phủ định";
                            accentColor = "rose";
                            icon = "➖";
                            break;
                          case "interrogative":
                            badgeLabel = "Nghi vấn";
                            accentColor = "amber";
                            icon = "❓";
                            break;
                          default:
                            badgeLabel = "Công thức";
                            accentColor = "indigo";
                            icon = "✨";
                        }
                        const borderColorMap: Record<string, string> = {
                          emerald: "border-l-emerald-500",
                          rose: "border-l-rose-500",
                          amber: "border-l-amber-500",
                          indigo: "border-l-indigo-500",
                        };
                        const badgeBgMap: Record<string, string> = {
                          emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/40",
                          rose: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/40",
                          amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/40",
                          indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800/40",
                        };

                        return (
                          <div key={i} className={`flex flex-col gap-2.5 p-4 rounded-xl bg-slate-50/80 dark:bg-neutral-950/60 border border-slate-100 dark:border-neutral-800 border-l-[3px] ${borderColorMap[accentColor]} shadow-sm`}>
                            <div className="flex items-center gap-2">
                              <span className="text-base">{icon}</span>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${badgeBgMap[accentColor]}`}>
                                {badgeLabel}
                              </span>
                            </div>
                            <div className="py-1">
                              {renderVisualFormula(cleanText)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </div>

              {/* ─── TWO-COLUMN GRID: Content + Sidebar ─── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column (8 cols): Examples + Common Mistakes + Extra Rules */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Examples Card */}
                  <Card variant="bezel" className="overflow-hidden bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-2xl shadow-sm">
                    <div className="px-5 sm:px-6 py-4 bg-slate-50 dark:bg-neutral-950 border-b border-slate-100 dark:border-neutral-800 flex items-center gap-2.5">
                      <BookOpen className="h-5 w-5 text-indigo-500" />
                      <h2 className="text-sm md:text-base font-black text-slate-800 dark:text-white">Ví dụ Mẫu</h2>
                    </div>
                    <div className="p-4 sm:p-6 space-y-3">
                      {lessonData.examples.map((ex, i) => (
                        <div key={i} className="p-3.5 sm:p-4 rounded-xl bg-slate-50/60 dark:bg-neutral-950/60 border border-slate-100 dark:border-neutral-800 flex items-start justify-between gap-3 hover:border-slate-300 dark:hover:border-neutral-700 transition-colors duration-200">
                          <div className="space-y-1.5 min-w-0">
                            <p className="text-sm md:text-base font-extrabold text-slate-800 dark:text-white leading-relaxed">
                              {ex.en.split(ex.highlight).map((part, j, arr) => (
                                <React.Fragment key={j}>
                                  {part}
                                  {j < arr.length - 1 && (
                                    <span className="text-indigo-600 dark:text-indigo-400 font-black underline decoration-2 decoration-indigo-400/50 bg-indigo-500/5 dark:bg-indigo-500/10 px-1 rounded">
                                      {ex.highlight}
                                    </span>
                                  )}
                                </React.Fragment>
                              ))}
                            </p>
                            <p className="text-xs md:text-sm text-slate-505 dark:text-slate-300 font-bold italic">→ {ex.vi}</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              if (typeof window !== "undefined" && window.speechSynthesis) {
                                window.speechSynthesis.cancel();
                                const utterance = new SpeechSynthesisUtterance(ex.en);
                                utterance.lang = "en-US";
                                window.speechSynthesis.speak(utterance);
                              }
                            }}
                            className="w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 shrink-0 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-sm" 
                            title="Nghe phát âm"
                          >
                            🔊
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Common Mistakes Card */}
                  {lessonData.commonMistakes.length > 0 && (
                    <Card variant="bezel" className="overflow-hidden bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-2xl shadow-sm">
                      <div className="px-5 sm:px-6 py-4 bg-slate-50 dark:bg-neutral-950 border-b border-slate-100 dark:border-neutral-800 flex items-center gap-2.5">
                        <AlertTriangle className="h-5 w-5 text-rose-500" />
                        <h2 className="text-sm md:text-base font-black text-slate-800 dark:text-white">Lỗi sai phổ biến</h2>
                      </div>
                      <div className="p-4 sm:p-6 space-y-4">
                        {lessonData.commonMistakes.map((m, i) => (
                          <div key={i} className="p-3.5 sm:p-4 rounded-xl bg-slate-50/60 dark:bg-neutral-950/60 border border-slate-100 dark:border-neutral-800 space-y-2.5">
                            <div className="p-2.5 bg-rose-50/80 dark:bg-rose-500/10 border border-rose-200/30 dark:border-rose-900/30 rounded-lg flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                              <p className="text-xs md:text-sm font-extrabold text-rose-600 dark:text-rose-400 line-through decoration-1 leading-relaxed">{m.wrong}</p>
                            </div>
                            <div className="p-2.5 bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200/30 dark:border-emerald-900/30 rounded-lg flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <p className="text-xs md:text-sm font-black text-emerald-600 dark:text-emerald-400 leading-relaxed">{m.correct}</p>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-300 font-semibold leading-relaxed pl-1">
                              💡 {m.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Extra Rules Card */}
                  {lessonData.extraRules && lessonData.extraRules.length > 0 && (
                    <Card variant="bezel" className="overflow-hidden bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-2xl shadow-sm">
                      <div className="px-5 sm:px-6 py-4 bg-slate-50 dark:bg-neutral-950 border-b border-slate-100 dark:border-neutral-800 flex items-center gap-2.5">
                        <Sparkles className="h-5 w-5 text-indigo-500" />
                        <h2 className="text-sm md:text-base font-black text-slate-800 dark:text-white">Quy tắc Bổ sung</h2>
                      </div>
                      <div className="p-4 sm:p-6 space-y-2.5">
                        {lessonData.extraRules.map((rule, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50/60 dark:bg-neutral-950/60 border border-slate-100 dark:border-neutral-800">
                            <span className="text-indigo-500 font-black text-xs shrink-0 mt-0.5">•</span>
                            <p className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">{rule}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  </div>

                {/* Right Column (4 cols): Signal Words + Memory Tip + Usages */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Signal Words */}
                  {lessonData.signalWords.length > 0 && (
                    <Card variant="bezel" className="overflow-hidden bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-2xl shadow-sm">
                      <div className="px-5 py-3.5 bg-slate-50 dark:bg-neutral-950 border-b border-slate-100 dark:border-neutral-800 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-indigo-500" />
                        <h2 className="text-sm font-black text-slate-800 dark:text-white">Từ Nhận biết</h2>
                      </div>
                      <div className="p-4 flex flex-wrap gap-2">
                        {lessonData.signalWords.map((w, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-800/30 text-xs font-black text-indigo-700 dark:text-indigo-400">
                            {w}
                          </span>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Memory Tip */}
                  <Card variant="bezel" className="overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-950/20 dark:to-orange-950/15 border border-amber-500/20 dark:border-neutral-800 rounded-2xl shadow-sm">
                    <div className="px-5 py-3.5 bg-amber-500/10 dark:bg-amber-950/40 border-b border-amber-200/30 dark:border-neutral-800 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 animate-pulse" />
                      <h2 className="text-sm font-black text-amber-900 dark:text-amber-300">Mẹo Ghi nhớ</h2>
                    </div>
                    <div className="p-4">
                      <p className="text-xs md:text-sm font-extrabold text-amber-800 dark:text-amber-300 leading-relaxed italic">{lessonData.memoryTip}</p>
                    </div>
                  </Card>

                  {/* Exam Usage Contexts */}
                  {lessonData.usages.length > 0 && (
                    <Card variant="bezel" className="overflow-hidden bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-2xl shadow-sm">
                      <div className="px-5 py-3.5 bg-slate-50 dark:bg-neutral-950 border-b border-slate-100 dark:border-neutral-800 flex items-center gap-2">
                        <Target className="h-4 w-4 text-indigo-500" />
                        <h2 className="text-sm font-black text-slate-800 dark:text-white">Ứng dụng thi cử</h2>
                      </div>
                      <div className="p-4 space-y-3">
                        {lessonData.usages.map((u, i) => (
                          <div key={i} className="p-3 rounded-lg bg-slate-50/60 dark:bg-neutral-950/60 border border-slate-100 dark:border-neutral-800">
                            <Badge variant="neutral" className="text-[10px] font-black px-2 py-0.5 mb-1.5">{u.context}</Badge>
                            <p className="text-xs font-semibold text-slate-605 dark:text-slate-300 leading-relaxed italic">&ldquo;{u.example}&rdquo;</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>

              {/* Start Practice CTA below the entire grid */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => generateExercises()}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/10 active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <span>Bắt đầu luyện tập</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>


          </>
        )}

        {activeSubTab === "deep_dive" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {guideLoading ? (
              /* Skeleton Loading (Rule 1) */
              <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-slate-200 dark:bg-neutral-800 rounded-xl w-3/4" />
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 dark:bg-neutral-800 rounded w-full" />
                  <div className="h-4 bg-slate-100 dark:bg-neutral-800 rounded w-5/6" />
                  <div className="h-4 bg-slate-100 dark:bg-neutral-800 rounded w-2/3" />
                </div>
                <div className="h-40 bg-slate-100 dark:bg-neutral-900 rounded-[2rem] border border-slate-200/20 dark:border-neutral-800/30" />
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 dark:bg-neutral-800 rounded w-full" />
                  <div className="h-4 bg-slate-100 dark:bg-neutral-800 rounded w-4/5" />
                </div>
              </div>
            ) : (
              <div className="p-1.5 bg-slate-100/40 dark:bg-neutral-950/40 border border-slate-200/25 dark:border-neutral-800/20 rounded-[2rem]">
                <Card variant="bezel" className="p-6 md:p-8 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-[calc(2rem-0.375rem)] shadow-sm max-w-none">
                  <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
                    {parsedDeepDive.elements}
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        )}

        {activeSubTab === "chat" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-1.5 bg-slate-100/40 dark:bg-neutral-950/40 border border-slate-200/25 dark:border-neutral-800/20 rounded-[2rem]">
              <Card variant="bezel" className="bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-[calc(2rem-0.375rem)] overflow-hidden shadow-sm flex flex-col h-[500px] sm:h-[550px] md:h-[600px] max-h-[70dvh] min-h-[400px]">
                {/* Welcome Banner */}
                <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/5 dark:to-violet-500/5 border-b border-slate-100 dark:border-neutral-800 flex items-center gap-2.5">
                  <MessageSquare className="h-5 w-5 text-indigo-500" />
                  <div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-white">Trợ lý Hỏi đáp Ngữ pháp AI</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-300 font-semibold">Thảo luận, viết ví dụ, hoặc dịch thuật về: {selectedTopicData?.name}</p>
                  </div>
                </div>

                {/* Message History */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-500 text-xl font-bold">
                        💬
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-700 dark:text-slate-300">Chưa có câu hỏi nào</p>
                        <p className="text-xs text-slate-500 dark:text-slate-300 max-w-sm font-medium leading-relaxed">
                          Nhập câu hỏi của bạn ở bên dưới hoặc dùng các gợi ý nhanh để bắt đầu thảo luận với trợ lý AI nhé!
                        </p>
                      </div>
                    </div>
                  ) : (
                    chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium leading-relaxed ${
                          msg.role === "user"
                            ? "bg-indigo-600 text-white rounded-br-none shadow-sm"
                            : "bg-slate-50 dark:bg-neutral-950 text-slate-800 dark:text-slate-300 rounded-bl-none border border-slate-200/30 dark:border-neutral-850/40"
                        }`}>
                          {msg.role === "user" ? (
                            msg.text
                          ) : (
                            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {parseMarkdown(msg.text).elements}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100/50 dark:bg-neutral-950 text-slate-400 dark:text-slate-300 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-200/20 dark:border-neutral-800/30 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                        <span className="text-xs font-semibold">Trợ lý đang gõ...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggested Prompts (Pills) */}
                {chatMessages.length === 0 && (
                  <div className="px-4 py-2.5 border-t border-slate-100 dark:border-neutral-850 flex flex-wrap gap-2 select-none bg-slate-50/40 dark:bg-black/10">
                    {[
                      "💡 Giải thích sâu công thức",
                      "📝 Cho tôi 3 ví dụ thực tế",
                      "⚠️ Lỗi thường gặp là gì?",
                      "🔄 Viết một câu tương tự"
                    ].map((promptText) => (
                      <button
                        key={promptText}
                        type="button"
                        onClick={() => setChatInput(promptText)}
                        className="text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-650 dark:hover:text-indigo-400 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all duration-150 cursor-pointer"
                      >
                        {promptText}
                      </button>
                    ))}
                  </div>
                )}

                {/* Chat Form Input */}
                <form onSubmit={sendChatMessage} className="p-3 sm:p-4 border-t border-slate-100/60 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/30 flex gap-2 items-center">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Hỏi về cấu trúc, ví dụ, cách dùng..."
                    disabled={chatLoading}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-50"
                  />
                  <Button 
                    type="submit" 
                    disabled={chatLoading || !chatInput.trim()} 
                    className="h-11 w-11 shrink-0 p-0 flex items-center justify-center rounded-xl cursor-pointer"
                    variant="primary"
                  >
                    <Send className="h-4.5 w-4.5 text-white" />
                  </Button>
                </form>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Exercise screen
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 md:pb-12 px-4 sm:px-6" suppressHydrationWarning>
      {/* Progress header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar whitespace-nowrap" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {lessonData && (
            <Button variant="secondary" className="cursor-pointer rounded-xl font-black text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 shrink-0" onClick={() => setActiveTab("lesson")}>
              <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Bài giảng
            </Button>
          )}
          <Button variant="secondary" className="cursor-pointer rounded-xl font-black text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 shrink-0" onClick={() => { setSelectedTopic(null); setLessonData(null); setExercises([]); }}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Chọn chủ đề khác
          </Button>
        </div>
        <Badge variant="primary" className="w-fit text-[10px] sm:text-xs font-black px-3 py-1 sm:px-4 sm:py-1.5 self-end sm:self-auto shadow-sm">
          {showResults ? "Kết quả" : `Câu ${currentIndex + 1} / ${exercises.length}`}
        </Badge>
      </motion.div>

      {/* Progress bar */}
      <div className="h-2.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${((showResults ? exercises.length : currentIndex + 1) / exercises.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showResults ? (() => {
          const correctCount = exercises.filter((ex) => answers[ex.id] === ex.correctAnswer).length;
          const percentage = Math.round((correctCount / exercises.length) * 100);
          const emoji = percentage >= 80 ? "🎉" : percentage >= 50 ? "💪" : "📚";
          const message = percentage >= 80 ? "Xuất sắc!" : percentage >= 50 ? "Khá tốt!" : "Cần ôn thêm!";
          return (
          /* Results summary */
          <div className="p-1 bg-slate-100/40 dark:bg-neutral-900/40 border border-slate-200/20 dark:border-neutral-800/20 rounded-[2rem] animate-scale-up">
            <Card variant="bezel" className="p-5 sm:p-8 space-y-5 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-[calc(2rem-0.25rem)] shadow-sm">
              <div className="text-center py-4 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 rounded-2xl border border-indigo-100/30 dark:border-indigo-950/20">
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-indigo-600 dark:text-indigo-400 font-display">
                  {correctCount} / {exercises.length}
                </div>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-300 mt-1.5 font-bold uppercase tracking-wider">
                  {message} — {percentage}% đúng
                </p>
              </div>

              <div className="space-y-3">
                {exercises.map((ex) => {
                  const isCorrect = answers[ex.id] === ex.correctAnswer;
                  return (
                    <div key={ex.id} className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed font-semibold ${isCorrect ? "border-emerald-200/50 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-700 dark:text-emerald-400" : "border-rose-200/50 bg-rose-50/20 dark:bg-rose-950/10 text-rose-700 dark:text-rose-400"}`}>
                      <div className="flex items-start gap-2.5">
                        {isCorrect ? <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />}
                        <div className="space-y-1.5 min-w-0">
                          <p className="text-sm md:text-base font-extrabold text-slate-800 dark:text-slate-200 leading-relaxed">{ex.sentence}</p>
                          {!isCorrect && (
                            <p className="text-xs font-black text-rose-600 dark:text-rose-400 leading-relaxed">
                              Bạn chọn: <span className="underline decoration-wavy">{answers[ex.id] || "(bỏ trống)"}</span> — Đáp án: <span className="text-emerald-600 dark:text-emerald-400 font-black">{ex.correctAnswer}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="primary" className="flex-1 py-3.5 rounded-xl font-black text-sm cursor-pointer text-white dark:text-white" onClick={() => { setActiveTab("lesson"); setExercises([]); setShowResults(false); }}>
                  Quay lại bài học
                </Button>
                <Button variant="secondary" className="flex-1 py-3.5 rounded-xl font-black text-sm cursor-pointer" onClick={() => { setExercises([]); setShowResults(false); setAnswers({}); setCurrentIndex(0); setSubmitted(false); generateExercises(); }}>
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Làm lại
                </Button>
              </div>
            </Card>
          </div>
          );
        })() : exercises[currentIndex] ? (() => {
          const currentQuestion = exercises[currentIndex];
          const hasAnswered = answers[currentQuestion.id] !== undefined;
          const isChecked = checkedQuestions[currentQuestion.id] === true;
          const selectedAnswer = answers[currentQuestion.id];
          const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

          return (
          /* Question Display */
          <div key={currentIndex} className="p-1 bg-slate-100/40 dark:bg-neutral-900/40 border border-slate-200/20 dark:border-neutral-800/20 rounded-[2rem]">
            <Card variant="bezel" className="p-5 sm:p-8 space-y-5 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-800 rounded-[calc(2rem-0.375rem)] shadow-sm">
              
              <div className="flex justify-between items-center select-none">
                <Badge variant={currentQuestion.difficulty === "easy" ? "success" : currentQuestion.difficulty === "medium" ? "warning" : "danger"} className="text-[10px] font-black px-2 py-0.5 capitalize">
                  Độ khó: {currentQuestion.difficulty || "easy"}
                </Badge>
                {isChecked && (
                  <Badge variant={isCorrect ? "success" : "danger"} className="text-[10px] font-black px-2 py-0.5 capitalize flex items-center gap-1">
                    {isCorrect ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    {isCorrect ? "Chính xác" : "Chưa đúng"}
                  </Badge>
                )}
              </div>

              <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-800 dark:text-white leading-relaxed">
                {currentQuestion.sentence}
              </h2>

              <div className="grid grid-cols-1 gap-2.5">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isOptionCorrect = option === currentQuestion.correctAnswer;

                  let optionStyle = "border-slate-200 dark:border-neutral-800 hover:border-slate-300 bg-white dark:bg-neutral-950 text-slate-700 dark:text-slate-300 dark:hover:bg-neutral-800";
                  
                  if (isChecked) {
                    if (isOptionCorrect) {
                      // Correct option is always green once checked
                      optionStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-600 shadow-sm font-black";
                    } else if (isSelected) {
                      // Selected wrong option is red
                      optionStyle = "border-rose-500 bg-rose-50/50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-600 shadow-sm font-black";
                    } else {
                      optionStyle = "border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-slate-400 dark:text-slate-500 opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-600 shadow-sm";
                  }

                  return (
                    <motion.button
                      disabled={isChecked}
                      whileHover={isChecked ? {} : { scale: 1.01 }}
                      whileTap={isChecked ? {} : { scale: 0.98 }}
                      key={option}
                      onClick={() => selectAnswer(exercises[currentIndex].id, option)}
                      className={`p-4 min-h-[48px] rounded-xl text-sm md:text-base font-extrabold text-left transition-all border cursor-pointer leading-snug ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-600 shadow-sm"
                          : "border-slate-200 dark:border-neutral-800 hover:border-slate-300 bg-white dark:bg-neutral-950 text-slate-700 dark:text-slate-300 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>

              {/* Instant check Explanation box */}
              {isChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border leading-relaxed text-xs sm:text-sm font-semibold shadow-sm ${
                    isCorrect 
                      ? "border-emerald-200/50 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-700 dark:text-emerald-400" 
                      : "border-rose-200/50 bg-rose-50/20 dark:bg-rose-950/10 text-rose-700 dark:text-rose-400"
                  }`}
                >
                  <div className="flex gap-2.5 items-start">
                    <span className="text-base shrink-0 mt-0.5">{isCorrect ? "🎉" : "💡"}</span>
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Giải thích đáp án:</p>
                      <p className="mt-1 font-semibold text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between items-center gap-3 pt-3 border-t border-slate-100 dark:border-neutral-800 flex-wrap">
                <Button
                  variant="bezel"
                  className="rounded-xl font-bold cursor-pointer text-xs sm:text-sm px-4 sm:px-5 py-2.5"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => i - 1)}
                >
                  ← Trước
                </Button>

                <div className="flex items-center gap-2 flex-1 sm:flex-initial justify-end">
                  {!isChecked ? (
                    <>
                      {currentIndex < exercises.length - 1 ? (
                        <Button
                          variant="bezel"
                          className="rounded-xl font-bold cursor-pointer text-xs sm:text-sm px-4 sm:px-5 py-2.5"
                          onClick={() => setCurrentIndex((i) => i + 1)}
                        >
                          Bỏ qua
                        </Button>
                      ) : (
                        <Button
                          variant="bezel"
                          className="rounded-xl font-bold cursor-pointer text-xs sm:text-sm px-4 sm:px-5 py-2.5"
                          onClick={submitAll}
                        >
                          Hoàn thành
                        </Button>
                      )}
                      <Button
                        variant="primary"
                        disabled={!hasAnswered}
                        className="rounded-xl font-bold cursor-pointer text-xs sm:text-sm px-5 py-2.5 flex items-center justify-center gap-1.5 text-white dark:text-white"
                        onClick={() => setCheckedQuestions(prev => ({ ...prev, [currentQuestion.id]: true }))}
                      >
                        Kiểm tra đáp án
                      </Button>
                    </>
                  ) : currentIndex < exercises.length - 1 ? (
                    <Button
                      variant="primary"
                      className="rounded-xl font-bold cursor-pointer text-xs sm:text-sm px-5 py-2.5 flex items-center justify-center gap-1.5 animate-bounce text-white dark:text-white"
                      onClick={() => setCurrentIndex((i) => i + 1)}
                    >
                      Tiếp theo <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="rounded-xl font-bold cursor-pointer text-xs sm:text-sm px-5 sm:px-6 py-2.5 flex items-center justify-center gap-1.5 shadow-glow text-white dark:text-white"
                      onClick={submitAll}
                    >
                      <Zap className="h-4 w-4 text-yellow-300 animate-bounce" /> Hoàn thành
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
          );
        })() : null}
      </AnimatePresence>
    </div>
  );
}
