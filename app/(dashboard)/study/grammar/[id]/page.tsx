"use client";
import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore, recordSkillPractice } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  PageEntranceWrapper,
  MotionItem,
  containerVariants,
  itemVariants,
} from "@/shared/components/feedback/PageEntranceAnimation";
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
  Lightbulb,
  AlertTriangle,
  Tag,
  FlaskConical,
  MessageSquare,
  Copy,
  Check,
  Send,
  Search,
  BookMarked,
  Layers,
  Award,
  Flame,
  X,
  Clock,
  Activity,
  History,
  Timer,
  Plane,
  Boxes,
  Scale,
  Users,
  UserCheck,
  KeyRound,
  Paperclip,
  Hash,
  BarChart2,
  FileText,
  Wand2,
  SlidersHorizontal,
  Trophy,
  Calendar,
  MapPin,
  CheckCircle2,
  RotateCw,
  Rewind,
  Hourglass,
  FastForward,
  Compass,
  RefreshCw,
  GitFork,
  GitBranch,
  Link2,
  ShieldAlert,
  FileCheck,
  HelpCircle,
  MessageCircle,
  MessagesSquare,
  GitMerge,
  Shuffle,
  ArrowUpDown,
  Repeat,
  Scissors,
  Combine,
  Minimize2,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Equal,
  CheckCheck,
  Binary,
  Pin,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getGrammarLesson, type GrammarLesson } from "@/features/grammar/data/grammarContent";

function getGrammarTopicIcon(topicId: string) {
  switch (topicId) {
    case "present_simple":
      return <Clock className="w-4 h-4 text-blue-500" />;
    case "present_continuous":
      return <Activity className="w-4 h-4 text-emerald-500" />;
    case "past_simple":
      return <History className="w-4 h-4 text-amber-500" />;
    case "past_continuous":
      return <Timer className="w-4 h-4 text-rose-500" />;
    case "future_simple":
      return <Sparkles className="w-4 h-4 text-purple-500" />;
    case "future_near":
      return <Plane className="w-4 h-4 text-teal-500" />;
    case "singular_plural_nouns":
      return <Boxes className="w-4 h-4 text-indigo-500" />;
    case "nouns_countability":
      return <Scale className="w-4 h-4 text-[#0059bb]" />;
    case "subject_object_pronouns":
      return <Users className="w-4 h-4 text-sky-500" />;
    case "reflexive_demonstrative":
      return <UserCheck className="w-4 h-4 text-emerald-600" />;
    case "possessive_adj_pronouns":
      return <KeyRound className="w-4 h-4 text-amber-600" />;
    case "possessive_case":
      return <Paperclip className="w-4 h-4 text-slate-500" />;
    case "determiners_basic":
      return <Hash className="w-4 h-4 text-purple-600" />;
    case "quantifiers_basic":
      return <BarChart2 className="w-4 h-4 text-rose-500" />;
    case "basic_articles":
      return <FileText className="w-4 h-4 text-blue-600" />;
    case "basic_adj_adv":
      return <Wand2 className="w-4 h-4 text-violet-500" />;
    case "comparatives_basic":
      return <SlidersHorizontal className="w-4 h-4 text-sky-500" />;
    case "superlatives_basic":
      return <Trophy className="w-4 h-4 text-amber-500" />;
    case "time_prepositions":
      return <Calendar className="w-4 h-4 text-rose-500" />;
    case "place_prepositions":
      return <MapPin className="w-4 h-4 text-red-500" />;

    case "perfect_present":
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case "perfect_present_cont":
      return <RotateCw className="w-4 h-4 text-teal-500" />;
    case "perfect_past":
      return <Rewind className="w-4 h-4 text-amber-600" />;
    case "perfect_past_cont":
      return <Hourglass className="w-4 h-4 text-orange-500" />;
    case "perfect_future":
      return <FastForward className="w-4 h-4 text-indigo-500" />;
    case "perfect_future_cont":
      return <Compass className="w-4 h-4 text-sky-500" />;
    case "passive_basic":
      return <RefreshCw className="w-4 h-4 text-blue-600" />;
    case "passive_modals_cont":
      return <Layers className="w-4 h-4 text-purple-500" />;
    case "conditionals_0_1":
      return <GitFork className="w-4 h-4 text-emerald-600" />;
    case "conditionals_2":
      return <GitBranch className="w-4 h-4 text-teal-600" />;
    case "relative_defining":
      return <Link2 className="w-4 h-4 text-blue-500" />;
    case "relative_non_defining":
      return <Link2 className="w-4 h-4 text-[#0059bb]" />;
    case "gerunds_usage":
      return <Target className="w-4 h-4 text-rose-500" />;
    case "infinitives_usage":
      return <Compass className="w-4 h-4 text-amber-500" />;
    case "modal_obligation":
      return <ShieldAlert className="w-4 h-4 text-red-500" />;
    case "modal_ability":
      return <Lightbulb className="w-4 h-4 text-amber-500" />;
    case "conjunctions_coordinating":
      return <Paperclip className="w-4 h-4 text-slate-600" />;
    case "conjunctions_cause_effect":
      return <FileCheck className="w-4 h-4 text-emerald-600" />;
    case "reported_statements":
      return <MessageSquare className="w-4 h-4 text-indigo-500" />;
    case "reported_questions":
      return <HelpCircle className="w-4 h-4 text-[#0059bb]" />;

    case "noun_clauses_basic":
      return <MessageCircle className="w-4 h-4 text-blue-600" />;
    case "noun_clauses_advanced":
      return <MessagesSquare className="w-4 h-4 text-purple-600" />;
    case "conditionals_3":
      return <GitMerge className="w-4 h-4 text-rose-500" />;
    case "conditionals_mixed":
      return <Shuffle className="w-4 h-4 text-violet-500" />;
    case "conditional_inversion":
      return <ArrowUpDown className="w-4 h-4 text-sky-500" />;
    case "inversion":
      return <Repeat className="w-4 h-4 text-[#0059bb]" />;
    case "subjunctive_mood":
      return <Scale className="w-4 h-4 text-stone-600" />;
    case "reduced_relative":
      return <Scissors className="w-4 h-4 text-pink-500" />;
    case "participle_clauses":
      return <Combine className="w-4 h-4 text-indigo-500" />;
    case "reduced_adverbial":
      return <Minimize2 className="w-4 h-4 text-teal-500" />;
    case "double_passive":
      return <Copy className="w-4 h-4 text-purple-500" />;
    case "cleft_sentences":
      return <Zap className="w-4 h-4 text-amber-500" />;
    case "double_comparatives":
      return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    case "advanced_comparatives":
      return <BarChart3 className="w-4 h-4 text-indigo-600" />;
    case "advanced_modals":
      return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    case "parallel_structure":
      return <Equal className="w-4 h-4 text-blue-500" />;
    case "subject_verb_exceptions":
      return <CheckCheck className="w-4 h-4 text-emerald-500" />;
    case "advanced_determiners":
      return <Binary className="w-4 h-4 text-purple-500" />;
    case "prepositional_phrases":
      return <Pin className="w-4 h-4 text-red-500" />;
    case "emphatic_fronting":
      return <Rocket className="w-4 h-4 text-rose-500" />;

    default:
      return <BookOpen className="w-4 h-4 text-[#0059bb]" />;
  }
}

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
  // Basic level (20 topics)
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

  // Intermediate level (20 topics)
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

  // Advanced level (20 topics)
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

export default function GrammarTopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.id as string) || "present_simple";

  // Normalize ID: handle both present-simple and present_simple
  const normalizedId = useMemo(() => {
    const directMatch = GRAMMAR_TOPICS.find((t) => t.id === rawId);
    if (directMatch) return directMatch.id;
    const underscoreMatch = GRAMMAR_TOPICS.find((t) => t.id === rawId.replace(/-/g, "_"));
    if (underscoreMatch) return underscoreMatch.id;
    return "present_simple";
  }, [rawId]);

  const { awardXp } = useUserStore();
  const { addToast } = useNotificationStore();

  const [activeTab, setActiveTab] = useState<"lesson" | "practice">("lesson");
  const [lessonData, setLessonData] = useState<GrammarLesson | null>(null);

  const activeTimeRef = useRef(0);

  // Real-time backend practice time tracker for Grammar / Writing
  useStudyTimeTracker("writing", {
    activeCondition: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      activeTimeRef.current += 1;
    }, 1000);

    return () => {
      clearInterval(timer);
      if (activeTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(activeTimeRef.current / 60));
        useUserStore.getState().addPracticeTime(mins, "writing");
        activeTimeRef.current = 0;
      }
    };
  }, []);

  const selectedTopicData = useMemo(() => {
    return GRAMMAR_TOPICS.find((t) => t.id === normalizedId) || GRAMMAR_TOPICS[0];
  }, [normalizedId]);

  useEffect(() => {
    const lesson = getGrammarLesson(normalizedId);
    setLessonData(lesson || null);
  }, [normalizedId]);

  // Exercise Quiz states
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // AI Chat & Deep Dive states
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const generateExercises = useCallback(async () => {
    if (!normalizedId) return;
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
        body: JSON.stringify({ topic: normalizedId, level: selectedTopicData?.level || "basic" }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      if (data.exercises && data.exercises.length > 0) {
        setExercises(data.exercises);
        setActiveTab("practice");
      } else {
        throw new Error("No exercises");
      }
    } catch {
      addToast({ type: "error", title: "Lỗi!", message: "Không thể tạo bài tập AI. Vui lòng thử lại sau." });
    } finally {
      setLoading(false);
    }
  }, [normalizedId, selectedTopicData, addToast]);

  const renderFormattedText = (content: string) => {
    if (!content) return null;
    const lines = content.split("\n");
    return (
      <div className="space-y-1.5 font-medium leading-relaxed">
        {lines.map((line, lIdx) => {
          let trimmed = line.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("* ")) {
            trimmed = "• " + trimmed.substring(2);
          }

          const parts = trimmed.split(/(\*\*.*?\*\*)/g);

          return (
            <p key={lIdx} className="whitespace-pre-line">
              {parts.map((part, pIdx) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={pIdx} className="font-bold text-[#0059bb] dark:text-sky-400">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  const handleSendChatMessage = async (textToSend: string) => {
    if (!textToSend.trim() || chatLoading || !selectedTopicData) return;

    const userMsg = { role: "user" as const, text: textToSend };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...chatMessages.map((m) => ({ role: m.role, text: m.text })),
            {
              role: "user",
              text: `[Chuyên đề ngữ pháp: ${selectedTopicData.name} (${selectedTopicData.nameEn}) - Trọng tâm: ${selectedTopicData.focus}] Người học hỏi: ${textToSend}. Hãy trả lời ngắn gọn, chuẩn sư phạm, có ví dụ song ngữ và mẹo đề thi TOEIC/IELTS thực tế.`,
            },
          ],
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setChatMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
        awardXp(10, "writing");
      } else {
        setChatMessages((prev) => [
          ...prev,
          { role: "ai", text: "Xin lỗi, AI Tutor đang bận phân tích đề. Vui lòng bấm lại câu hỏi nhé!" },
        ]);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: "Mất kết nối mạng. Vui lòng thử lại sau giây lát!" },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSelectOption = (exerciseId: number, option: string) => {
    if (submitted) return;
    if (answers[exerciseId]) return;
    setAnswers((prev) => ({ ...prev, [exerciseId]: option }));
    setCheckedQuestions((prev) => ({ ...prev, [exerciseId]: true }));
  };

  const handleSubmitQuiz = async () => {
    if (submitted) return;
    setSubmitted(true);
    setShowResults(true);

    let correctCount = 0;
    exercises.forEach((ex) => {
      if (answers[ex.id] === ex.correctAnswer) correctCount++;
    });

    const xpEarned = correctCount * 5 + 10;
    awardXp(xpEarned, "writing");
    const currentUser = useUserStore.getState().user;
    useUserStore.getState().addPracticeTime(3, "writing");
    recordSkillPractice(currentUser?.id, "Viết", 3, xpEarned);

    addToast({
      type: "xp",
      title: `+${xpEarned} XP!`,
      message: `Hoàn thành bài thi! Đúng ${correctCount}/${exercises.length} câu.`,
    });
  };

  // Keyboard navigation for Practice mode (1, 2, 3, 4, A, B, C, D, Arrows, Space, Enter)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (activeTab === "practice" && exercises.length > 0 && !submitted) {
        const currentEx = exercises[currentIndex];
        if (!currentEx) return;

        const isAnswered = Boolean(answers[currentEx.id]);

        if (e.code === "ArrowLeft") {
          e.preventDefault();
          setCurrentIndex((prev) => Math.max(0, prev - 1));
          return;
        }

        if (e.code === "ArrowRight") {
          e.preventDefault();
          if (currentIndex < exercises.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else if (Object.keys(answers).length >= exercises.length) {
            handleSubmitQuiz();
          }
          return;
        }

        if (!isAnswered) {
          if (["Digit1", "Numpad1", "KeyA"].includes(e.code) && currentEx.options[0]) {
            e.preventDefault();
            handleSelectOption(currentEx.id, currentEx.options[0]);
          } else if (["Digit2", "Numpad2", "KeyB"].includes(e.code) && currentEx.options[1]) {
            e.preventDefault();
            handleSelectOption(currentEx.id, currentEx.options[1]);
          } else if (["Digit3", "Numpad3", "KeyC"].includes(e.code) && currentEx.options[2]) {
            e.preventDefault();
            handleSelectOption(currentEx.id, currentEx.options[2]);
          } else if (["Digit4", "Numpad4", "KeyD"].includes(e.code) && currentEx.options[3]) {
            e.preventDefault();
            handleSelectOption(currentEx.id, currentEx.options[3]);
          }
        } else {
          if (["Space", "Enter"].includes(e.code)) {
            e.preventDefault();
            if (currentIndex < exercises.length - 1) {
              setCurrentIndex((prev) => prev + 1);
            } else {
              handleSubmitQuiz();
            }
          }
        }
      }
    },
    [activeTab, exercises, currentIndex, answers, submitted]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      {/* Top Header */}
      <AppTopHeader
        rightDesktopContent={
          <button
            type="button"
            onClick={generateExercises}
            disabled={loading}
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            )}
            <span>Thi Thử AI +15 XP</span>
          </button>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            href="/study/grammar"
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
            label="Kho Ngữ Pháp"
          />
          <HeaderPillItem
            active={activeTab === "lesson"}
            onClick={() => setActiveTab("lesson")}
            icon={<BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Lý Thuyết"
          />
          <HeaderPillItem
            active={activeTab === "practice"}
            onClick={() => {
              setActiveTab("practice");
              if (exercises.length === 0) {
                generateExercises();
              }
            }}
            icon={<Zap className="w-3.5 h-3.5 text-amber-500" />}
            label="Luyện Tập AI"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* Main Studio Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 space-y-4 pt-1">
        {/* 1. Hero Compact Topic Studio Banner */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs relative overflow-hidden space-y-3"
        >
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#0059bb]/60 to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                {getGrammarTopicIcon(selectedTopicData?.id || "")}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                    {selectedTopicData?.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40">
                    {selectedTopicData?.nameEn}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                  {selectedTopicData?.desc} • {selectedTopicData?.focus}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold block leading-none">Cấu Trúc</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block mt-0.5">3 Công thức</span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold block leading-none">Mục Tiêu</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 truncate block mt-0.5">TOEIC & IELTS</span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold block leading-none">Cảnh Báo</span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 truncate block mt-0.5">Bẫy đề thi</span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold block leading-none">Thưởng XP</span>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 truncate block mt-0.5">+15 XP</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TAB 1: MASTER THEORY STUDIO */}
        {activeTab === "lesson" && (
          <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
            {/* 1. Overview & Memory Tip */}
            {lessonData?.memoryTip && (
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-850 border border-blue-200/80 dark:border-blue-800/60 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Mẹo Ghi Nhớ Nhanh & Trọng Tâm:</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
                  {lessonData.memoryTip}
                </p>
              </div>
            )}

            {/* 2. Color-coded Formulas Section */}
            {lessonData?.formulas && lessonData.formulas.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#0059bb]" /> Cấu Trúc & Công Thức Cốt Lõi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {lessonData.formulas.map((formula, fIdx) => {
                    const isAffirmative = formula.includes("(+)") || formula.toLowerCase().includes("khẳng định");
                    const isNegative = formula.includes("(-)") || formula.toLowerCase().includes("phủ định");

                    let colorStyle = "bg-blue-50/70 dark:bg-slate-800/60 border-blue-200/70 dark:border-blue-900/60 text-[#0059bb] dark:text-sky-300";
                    let badgeText = "Nghi vấn (?)";
                    let badgeStyle = "bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border-[#0059bb]/20";

                    if (isAffirmative) {
                      colorStyle = "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/70 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300";
                      badgeText = "Khẳng định (+)";
                      badgeStyle = "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
                    } else if (isNegative) {
                      colorStyle = "bg-rose-50/70 dark:bg-rose-950/40 border-rose-200/70 dark:border-rose-900/60 text-rose-800 dark:text-rose-300";
                      badgeText = "Phủ định (-)";
                      badgeStyle = "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";
                    }

                    return (
                      <div key={fIdx} className={`p-4 rounded-2xl border space-y-2.5 shadow-2xs ${colorStyle}`}>
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase border inline-block ${badgeStyle}`}>
                          {badgeText}
                        </span>
                        <div className="text-xs sm:text-sm font-bold tracking-tight leading-relaxed">
                          {formula}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Signal Words */}
            {lessonData?.signalWords && lessonData.signalWords.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#0059bb]" /> Từ Nhận Biết & Trạng Từ Chỉ Thời Gian:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {lessonData.signalWords.map((word, wIdx) => (
                    <span key={wIdx} className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Exam Usages Contexts */}
            {lessonData?.usages && lessonData.usages.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-sky-500" /> Ứng Dụng Trong Đề Thi TOEIC & IELTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lessonData.usages.map((u, uIdx) => (
                    <div key={uIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2 hover:border-[#0059bb]/40 transition-all shadow-2xs">
                      <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 inline-block">
                        {u.context}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                        &quot;{u.example}&quot;
                      </p>
                      {u.note && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          💡 {u.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Real Examples */}
            {lessonData?.examples && lessonData.examples.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-emerald-500" /> Ví Dụ Minh Họa Ngữ Cảnh Thực Tế
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lessonData.examples.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2 group hover:border-[#0059bb]/40 transition-all shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                          Ví dụ {eIdx + 1}
                        </span>
                        {ex.highlight && (
                          <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40">
                            Trọng tâm: {ex.highlight}
                          </span>
                        )}
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-snug">
                        &quot;{ex.en}&quot;
                      </div>

                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
                        🇻🇳 {ex.vi}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Extra Rules */}
            {lessonData?.extraRules && lessonData.extraRules.length > 0 && (
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-950 border border-blue-200/60 dark:border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Quy Tắc Bổ Sung & Lưu Ý Đặc Biệt:
                </h4>
                <ul className="space-y-1.5 pl-1">
                  {lessonData.extraRules.map((ruleStr, rIdx) => (
                    <li key={rIdx} className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-start gap-2">
                      <span className="text-[#0059bb] font-bold">•</span>
                      <span>{ruleStr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 7. Common Mistakes (❌ vs ✅) */}
            {lessonData?.commonMistakes && lessonData.commonMistakes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-display">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Cảnh Báo Bẫy Thi TOEIC & IELTS
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {lessonData.commonMistakes.length} bẫy đề
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lessonData.commonMistakes.map((mistake, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2.5 hover:border-amber-400/40 transition-all shadow-2xs"
                    >
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                            ❌ Sai
                          </span>
                          <span className="line-through text-slate-500 dark:text-slate-400 text-xs font-medium truncate">
                            {mistake.wrong}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                            ✅ Đúng
                          </span>
                          <span className="text-slate-900 dark:text-white text-xs font-bold truncate">
                            {mistake.correct}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-start gap-1">
                        <span className="text-amber-500 font-bold shrink-0">💡</span>
                        <span>{mistake.explanation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Footer CTA */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
              <Link
                href="/study/grammar"
                className="h-11 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center"
              >
                ‹ Trở về kho ngữ pháp
              </Link>

              <button
                type="button"
                onClick={generateExercises}
                disabled={loading}
                className="h-11 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#0059bb]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50 font-display active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current text-amber-300" />
                <span>Bắt đầu bài thi thử AI (+15 XP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: AI PRACTICE & AI TUTOR COMPANION (8/12 + 4/12 BENTO) */}
        {activeTab === "practice" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* LEFT COLUMN: AI Practice Studio (8/12) */}
            <div className="lg:col-span-8 space-y-4">
              {loading ? (
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 animate-pulse">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="h-6 w-28 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  </div>
                  <div className="space-y-2 py-4">
                    <div className="h-7 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="h-5 w-1/2 bg-slate-100 dark:bg-slate-800/60 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="h-14 bg-slate-100 dark:bg-slate-800/60 rounded-2xl" />
                    <div className="h-14 bg-slate-100 dark:bg-slate-800/60 rounded-2xl" />
                    <div className="h-14 bg-slate-100 dark:bg-slate-800/60 rounded-2xl" />
                    <div className="h-14 bg-slate-100 dark:bg-slate-800/60 rounded-2xl" />
                  </div>
                </div>
              ) : exercises.length > 0 ? (
                <div>
                  {!submitted ? (
                    <div className="space-y-4">
                      {/* 1. KHỐI CÂU HỎI STUDIO ĐỘC LẬP */}
                      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
                        {/* Header Bar */}
                        <div className="space-y-2.5 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 shrink-0">
                                Câu {currentIndex + 1} / {exercises.length}
                              </span>
                              <span className="text-xs font-bold text-slate-500 hidden sm:inline font-display truncate">
                                Phòng thi trắc nghiệm AI • {selectedTopicData?.name}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={generateExercises}
                              disabled={loading}
                              className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Đổi 5 câu khác</span>
                            </button>
                          </div>

                          {/* Progress Line */}
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#0059bb] dark:bg-sky-400 h-full transition-all duration-300 rounded-full"
                              style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Question Sentence */}
                        {exercises[currentIndex] && (() => {
                          const currentEx = exercises[currentIndex];
                          const userSelected = answers[currentEx.id];
                          const isAnswered = Boolean(userSelected);
                          const isCorrect = userSelected === currentEx.correctAnswer;
                          const optionLetters = ["A", "B", "C", "D"];

                          return (
                            <div className="space-y-4">
                              <div className="py-2 space-y-2">
                                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                                  Chọn phương án đúng để điền vào chỗ trống:
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display leading-relaxed">
                                  {currentEx.sentence}
                                </h3>
                              </div>

                              {/* 2. LƯỚI 4 ĐÁP ÁN 2 CỘT */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                                {currentEx.options.map((opt, oIdx) => {
                                  const isThisCorrect = opt === currentEx.correctAnswer;
                                  const isThisSelected = userSelected === opt;

                                  let cardStyle =
                                    "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0059bb] hover:bg-blue-50/40 dark:hover:bg-slate-850 shadow-2xs";
                                  let badgeStyle = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";

                                  if (isAnswered) {
                                    if (isThisCorrect) {
                                      cardStyle = "bg-emerald-500 text-white border-emerald-600 font-bold shadow-md shadow-emerald-500/20";
                                      badgeStyle = "bg-white/20 text-white";
                                    } else if (isThisSelected && !isThisCorrect) {
                                      cardStyle = "bg-rose-500 text-white border-rose-600 font-bold shadow-md shadow-rose-500/20";
                                      badgeStyle = "bg-white/20 text-white";
                                    } else {
                                      cardStyle = "opacity-50 bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800 text-slate-400";
                                      badgeStyle = "bg-slate-100 dark:bg-slate-800 text-slate-400";
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      type="button"
                                      onClick={() => handleSelectOption(currentEx.id, opt)}
                                      disabled={isAnswered}
                                      className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 min-h-[64px] active:scale-[0.98] ${
                                        isAnswered ? "cursor-default" : "cursor-pointer"
                                      } ${cardStyle}`}
                                    >
                                      <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs ${badgeStyle}`}>
                                          {optionLetters[oIdx]}
                                        </span>
                                        <span className="text-sm font-semibold">{opt}</span>
                                      </div>

                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <kbd className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                                          isAnswered && (isThisCorrect || isThisSelected)
                                            ? "bg-white/20 text-white"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                                        }`}>
                                          {oIdx + 1}
                                        </kbd>
                                        {isAnswered && isThisCorrect && <Check className="w-5 h-5 text-white shrink-0" />}
                                        {isAnswered && isThisSelected && !isThisCorrect && (
                                          <X className="w-5 h-5 text-white shrink-0" />
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* 3. INSTANT AI EXPLANATION BOX */}
                              {isAnswered && (
                                <div
                                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 transition-all shadow-2xs ${
                                    isCorrect
                                      ? "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200"
                                      : "bg-rose-50/90 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-900/40 text-rose-950 dark:text-rose-200"
                                  }`}
                                >
                                  <div className="font-bold flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-black">
                                      {isCorrect ? (
                                        <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                          <Check className="w-4 h-4" /> Chính xác! (+5 XP)
                                        </span>
                                      ) : (
                                        <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1">
                                          <X className="w-4 h-4" /> Tiếc quá, chưa chính xác!
                                        </span>
                                      )}
                                    </span>

                                    {!isCorrect && (
                                      <span className="text-xs bg-white/70 dark:bg-slate-900/70 px-2.5 py-0.5 rounded-lg border border-rose-200 dark:border-rose-900/40 font-bold text-rose-800 dark:text-rose-300">
                                        Đáp án đúng: <strong>{currentEx.correctAnswer}</strong>
                                      </span>
                                    )}
                                  </div>

                                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
                                    <span className="font-bold text-[#0059bb] dark:text-sky-400">💡 AI Giải thích chi tiết:</span>{" "}
                                    {currentEx.explanation}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>

                      {/* 3. THANH ĐIỀU HƯỚNG CHUYỂN CÂU CHUẨN XÁC DƯỚI CÙNG */}
                      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        {/* Previous Button */}
                        <button
                          type="button"
                          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                          disabled={currentIndex === 0}
                          className="h-11 px-4 sm:px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 active:scale-95 disabled:opacity-40 shadow-2xs"
                        >
                          <ChevronLeft className="w-4.5 h-4.5 stroke-[2.5] text-slate-700 dark:text-slate-200" />
                          <span>Câu Trước</span>
                        </button>

                        {/* Center Counter */}
                        <div className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                          <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                            {currentIndex + 1} <span className="text-slate-400">/</span> {exercises.length}
                          </span>
                        </div>

                        {/* Next / Submit Button */}
                        {currentIndex < exercises.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => setCurrentIndex((prev) => prev + 1)}
                            className="h-11 px-5 sm:px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0059bb]/20 shrink-0 font-display active:scale-95"
                          >
                            <span>Câu Tiếp Theo</span>
                            <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSubmitQuiz}
                            disabled={Object.keys(answers).length < exercises.length}
                            className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 shrink-0 font-display active:scale-95 disabled:opacity-50"
                          >
                            <Check className="w-4.5 h-4.5" />
                            <span>Nộp Bài (+15 XP)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* SCORECARD & DETAILED QUESTION REVIEW SCREEN */
                    <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
                      <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-850 border border-blue-200/80 dark:border-blue-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl shrink-0 shadow-2xs">
                            🏆
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                              Kết Quả Bài Thi Thử AI: {selectedTopicData?.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                              Bạn làm đúng <strong className="font-mono text-emerald-600 dark:text-emerald-400">{Object.keys(answers).filter((id) => answers[Number(id)] === exercises.find(e => e.id === Number(id))?.correctAnswer).length}/{exercises.length}</strong> câu • Đã nhận +15 XP thưởng!
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={generateExercises}
                          disabled={loading}
                          className="h-11 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#0059bb]/20 flex items-center gap-2 cursor-pointer shrink-0 font-display active:scale-95"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Làm Bài Mới</span>
                        </button>
                      </div>

                      {/* Detailed Review List */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> Review Chi Tiết Đáp Án & Giải Thích AI:
                        </h4>

                        <div className="space-y-3">
                          {exercises.map((ex, idx) => {
                            const userAns = answers[ex.id];
                            const isCorrect = userAns === ex.correctAnswer;

                            return (
                              <div
                                key={ex.id}
                                className={`p-4 rounded-2xl border space-y-3 shadow-2xs ${
                                  isCorrect
                                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/30"
                                    : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/60 dark:border-rose-900/30"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                                    Câu {idx + 1}: {ex.sentence}
                                  </span>
                                  <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase shrink-0 ${
                                    isCorrect ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20"
                                  }`}>
                                    {isCorrect ? "✅ Đúng" : "❌ Sai"}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                  <div className={`p-2.5 rounded-xl border ${
                                    isCorrect ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300" : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-300"
                                  }`}>
                                    <span className="font-bold">Bạn chọn:</span> {userAns || "(Chưa chọn)"}
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300">
                                    <span className="font-bold">Đáp án chuẩn:</span> {ex.correctAnswer}
                                  </div>
                                </div>

                                <div className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-start gap-1.5">
                                  <span className="text-amber-500 font-bold shrink-0">💡 AI Giải thích:</span>
                                  <span>{ex.explanation}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* RIGHT COLUMN: AI Tutor Companion (4/12) */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 sticky top-4">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                    Trợ Lý AI Tutor
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                    {selectedTopicData?.name}
                  </p>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="space-y-3 max-h-80 lg:max-h-[380px] overflow-y-auto pr-1 no-scrollbar min-h-[140px]">
                {chatMessages.length === 0 ? (
                  <div className="p-4 text-center rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 text-xs text-purple-900 dark:text-purple-300 font-medium space-y-1 shadow-2xs">
                    <div className="font-bold">👋 Bạn có thắc mắc về bài thi hay cấu trúc ngữ pháp này không?</div>
                    <div className="text-[11px] opacity-80">Bấm gợi ý 1-Click hoặc gõ câu hỏi để trao đổi nhé!</div>
                  </div>
                ) : (
                  chatMessages.map((msg, mIdx) => (
                    <div
                      key={mIdx}
                      className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "ai" && (
                        <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 text-xs border border-purple-500/20">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[90%] shadow-2xs ${
                          msg.role === "user"
                            ? "bg-[#0059bb] text-white font-semibold"
                            : "bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-900 dark:text-white font-medium"
                        }`}
                      >
                        {msg.role === "user" ? msg.text : renderFormattedText(msg.text)}
                      </div>
                    </div>
                  ))
                )}

                {chatLoading && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 p-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>AI Tutor đang phân tích...</span>
                  </div>
                )}
              </div>

              {/* Quick 1-Click Prompt Chips */}
              {chatMessages.length === 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Gợi ý câu hỏi 1-Click:</div>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSendChatMessage(`Giải thích thêm cho tôi lý do chọn đáp án trong các câu trắc nghiệm trên`)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold transition-all cursor-pointer text-left flex items-center gap-2 truncate active:scale-95"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">Tại sao câu trong bài lại chọn đáp án đó?</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendChatMessage(`Cho 3 bẫy đề thi TOEIC Part 5 thường gặp nhất liên quan đến ${selectedTopicData?.name}`)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold transition-all cursor-pointer text-left flex items-center gap-2 truncate active:scale-95"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">3 bẫy TOEIC hay gặp nhất</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendChatMessage(`Cho 3 câu ví dụ mẫu chuẩn IELTS Writing Task 2 áp dụng ${selectedTopicData?.name}`)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold transition-all cursor-pointer text-left flex items-center gap-2 truncate active:scale-95"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">3 câu ví dụ IELTS Writing</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendChatMessage(`Phân biệt ${selectedTopicData?.name} với cấu trúc tương tự dễ nhầm lẫn`)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold transition-all cursor-pointer text-left flex items-center gap-2 truncate active:scale-95"
                    >
                      <Search className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span className="truncate">Phân biệt cấu trúc dễ nhầm</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChatMessage(chatInput);
                }}
                className="space-y-2 pt-1"
              >
                <textarea
                  rows={2}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendChatMessage(chatInput);
                    }
                  }}
                  placeholder="Hỏi AI Tutor... (Enter để gửi)"
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />

                <button
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                  className={`w-full h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 font-display ${
                    !chatInput.trim() || chatLoading
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200/80 dark:border-slate-700/60 cursor-not-allowed"
                      : "bg-[#0059bb] hover:bg-[#004899] text-white shadow-md shadow-[#0059bb]/25 cursor-pointer active:scale-95"
                  }`}
                >
                  {chatLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0059bb] dark:text-sky-400" />
                      <span>AI đang trả lời...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi câu hỏi cho AI (+10 XP)</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageEntranceWrapper>
  );
}
