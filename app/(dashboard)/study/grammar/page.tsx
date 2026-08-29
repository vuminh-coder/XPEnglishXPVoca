"use client";
import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, recordSkillPractice } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
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
  Link,
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
      return <Link className="w-4 h-4 text-[#0059bb]" />;
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

import { containerVariants, itemVariants } from "@/shared/components/feedback/PageEntranceAnimation";

export default function AiGrammarPage() {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [activeLevel, setActiveLevel] = useState<"all" | "basic" | "intermediate" | "advanced">("all");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState<"lesson" | "practice">("lesson");
  const [lessonData, setLessonData] = useState<GrammarLesson | null>(null);

  const activeTimeRef = useRef(0);

  // Real-time backend practice time tracker for Grammar / Writing
  useStudyTimeTracker("writing", {
    activeCondition: !!selectedTopic,
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

  // Exercise Quiz states
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // AI Chat & Deep Dive states
  const [activeSubTab, setActiveSubTab] = useState<"summary" | "deep_dive" | "chat">("summary");
  const [deepDiveContent, setDeepDiveContent] = useState<string>("");
  const [guideCache, setGuideCache] = useState<Record<string, string>>({});
  const [guideLoading, setGuideLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const filteredTopics = useMemo(() => {
    return GRAMMAR_TOPICS.filter((t) => {
      const matchesLevel = activeLevel === "all" || t.level === activeLevel;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.focus.toLowerCase().includes(q);
      return matchesLevel && matchesQuery;
    });
  }, [activeLevel, searchQuery]);

  const selectedTopicData = useMemo(() => {
    return GRAMMAR_TOPICS.find((t) => t.id === selectedTopic);
  }, [selectedTopic]);

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

    const lesson = getGrammarLesson(topicId);
    setLessonData(lesson || null);
  }, [guideCache, activeLevel]);

  const generateExercises = useCallback(async () => {
    if (!selectedTopic) return;
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
        body: JSON.stringify({ topic: selectedTopic, level: activeLevel === "all" ? "basic" : activeLevel }),
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
  }, [selectedTopic, activeLevel, addToast]);

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
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  const handleSendChatMessage = async (textToSend: string) => {
    const queryText = textToSend || chatInput;
    if (!queryText.trim() || !selectedTopic || chatLoading) return;

    const userMessage = { role: "user" as const, text: queryText };
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/ai/grammar/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: selectedTopic,
          level: activeLevel === "all" ? "basic" : activeLevel,
          mode: "chat",
          messages: updatedMessages,
        }),
      });

      if (!res.ok) throw new Error("Chat API failed");
      const data = await res.json();

      if (data.reply) {
        setChatMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
        awardXp(10);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Xin lỗi, hiện tại trợ lý AI đang bận. Bạn có thể xem lại tóm tắt công thức hoặc thử lại sau ít phút nhé!",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSelectOption = (exerciseId: number, option: string) => {
    if (submitted) return;
    if (answers[exerciseId]) return; // Instant check: Lock answer once selected for immediate feedback
    setAnswers((prev) => ({ ...prev, [exerciseId]: option }));
    setCheckedQuestions((prev) => ({ ...prev, [exerciseId]: true }));
  };

  const handleCheckQuestion = (exerciseId: number) => {
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
    awardXp(xpEarned);
    const currentUser = useAuthStore.getState().user;
    useUserStore.getState().addPracticeTime(3, "writing");
    recordSkillPractice(currentUser?.id, "Viết", 3, xpEarned);

    addToast({
      type: "xp",
      title: `+${xpEarned} XP!`,
      message: `Hoàn thành bài thi! Đúng ${correctCount}/${exercises.length} câu.`,
    });
  };

  // Main Grammar Exploration Hub (Dashboard Bento Grid Style)
  if (!selectedTopic) {
    return (
      <div className="space-y-4 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans" suppressHydrationWarning>
        {/* 1. HERO BENTO BANNER CARD */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 20 }}
          className="p-3.5 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 sm:space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-gradient-to-br from-[#0059bb]/10 to-indigo-500/10 dark:from-[#0059bb]/20 dark:to-indigo-500/20 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs text-[#0059bb] dark:text-sky-400">
                <BookMarked className="w-4 h-4 stroke-[2]" />
              </div>

              <div className="min-w-0 space-y-0.5 sm:space-y-1">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                  Ngữ Pháp AI • Grammar Studio
                </h1>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded-xs text-[8.5px] sm:text-[9px] font-black uppercase bg-[#0059bb]/10 dark:bg-sky-500/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20">
                    60 Chuyên đề
                  </span>
                  <span className="px-1.5 py-0.5 rounded-xs text-[8.5px] sm:text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    CEFR B1-C2
                  </span>
                </div>
                <p className="hidden sm:block text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  Hệ thống bài giảng và phòng luyện trắc nghiệm AI phân tích chuyên sâu chuẩn TOEIC & IELTS.
                </p>
              </div>
            </div>

            {/* Desktop Button */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={() => openTopic("present_simple")}
                className="px-3.5 py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-extrabold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                <span>Học bài đầu tiên +15 XP</span>
              </button>
            </div>
          </div>

          {/* Mobile Full-Width Clean Button */}
          <div className="sm:hidden pt-0.5">
            <button
              onClick={() => openTopic("present_simple")}
              className="w-full py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-[11px] font-extrabold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>Học bài đầu tiên +15 XP</span>
            </button>
          </div>

          {/* Hero 4 Metrics Strip (Scaled down text & padding for Mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-1 border-t border-slate-100 dark:border-white/5">
            <div className="p-2 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-tight text-slate-400 dark:text-slate-500">
                  Tất cả bài học
                </div>
                <div className="text-xs sm:text-lg font-bold text-slate-900 dark:text-white font-display mt-0.2">
                  60 <span className="text-[9px] sm:text-xs font-medium text-slate-400">chuyên đề</span>
                </div>
              </div>
              <div className="w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-xs bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>

            <div className="p-2 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-tight text-slate-400 dark:text-slate-500">
                  Nền tảng 500+
                </div>
                <div className="text-xs sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 font-display mt-0.2">
                  20 <span className="text-[9px] sm:text-xs font-medium text-slate-400">bài</span>
                </div>
              </div>
              <div className="w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>

            <div className="p-2 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-tight text-slate-400 dark:text-slate-500">
                  Bứt phá 750+
                </div>
                <div className="text-xs sm:text-lg font-bold text-sky-600 dark:text-sky-400 font-display mt-0.2">
                  20 <span className="text-[9px] sm:text-xs font-medium text-slate-400">bài</span>
                </div>
              </div>
              <div className="w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-xs bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>

            <div className="p-2 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-tight text-slate-400 dark:text-slate-500">
                  Target 900+ / IELTS
                </div>
                <div className="text-xs sm:text-lg font-bold text-purple-600 dark:text-purple-400 font-display mt-0.2">
                  20 <span className="text-[9px] sm:text-xs font-medium text-slate-400">bài</span>
                </div>
              </div>
              <div className="w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. SPLIT BAR TABS & SEARCH BAR (Rule 2 Compliance) */}
        <div className="p-1 sm:p-1.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          {/* Level Tabs selector (Strictly 1 single row on Mobile) */}
          <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/60 p-1 rounded-xs w-full sm:w-auto flex-nowrap overflow-x-auto no-scrollbar">
            {[
              { id: "all", name: "Tất cả", nameSm: "Tất cả" },
              { id: "basic", name: "Nền tảng 500+", nameSm: "Nền tảng" },
              { id: "intermediate", name: "Bứt phá 750+", nameSm: "Bứt phá" },
              { id: "advanced", name: "Chinh phục 900+ / IELTS", nameSm: "Chinh phục" },
            ].map((lvl) => {
              const active = activeLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevel(lvl.id as any)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-xs transition-all select-none cursor-pointer shrink-0 whitespace-nowrap ${
                    active
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-black"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span className="hidden sm:inline">{lvl.name}</span>
                  <span className="sm:hidden">{lvl.nameSm}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm chủ đề ngữ pháp..."
              className="w-full pl-8 sm:pl-9 pr-3 py-1.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 3. GRAMMAR TOPICS BENTO GRID (1 Card per Row on Mobile as Requested) */}
        {filteredTopics.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xs border border-slate-200/80 dark:border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Không tìm thấy chủ đề ngữ pháp phù hợp
            </h3>
            <p className="text-xs text-slate-500">
              Thử thay đổi từ khóa tìm kiếm hoặc chọn cấp độ khác.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3"
          >
            {filteredTopics.map((topic) => (
              <motion.div key={topic.id} variants={itemVariants}>
                <div
                  onClick={() => openTopic(topic.id)}
                  className="p-3 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs hover:shadow-xs hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 transition-all cursor-pointer flex flex-col justify-between h-full group"
                >
                  <div className="space-y-2 sm:space-y-2.5">
                    {/* Upper Header: Icon + Focus Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xs bg-[#0059bb]/10 dark:bg-sky-500/10 flex items-center justify-center border border-[#0059bb]/20 dark:border-sky-500/20 shrink-0 group-hover:scale-105 transition-transform">
                        {getGrammarTopicIcon(topic.id)}
                      </span>

                      <span className="px-1.5 py-0.5 rounded-xs text-[9px] font-black uppercase tracking-wider bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 shrink-0 truncate max-w-[130px]">
                        {topic.focus.split("&")[0].trim()}
                      </span>
                    </div>

                    {/* Topic Title & Desc */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                        {topic.name}
                      </h3>
                      <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {topic.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Action: Clean single CTA button with ArrowRight */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 mt-2.5 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-[#0059bb] dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500/20 shrink-0" />
                      <span>Học ngay</span>
                    </span>

                    <div className="w-5 h-5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-[#0059bb] group-hover:text-white transition-all flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 stroke-[2]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  // ── DETAILED LESSON & PRACTICE VIEW (DASHBOARD BENTO AGENCY-TIER) ──
  return (
    <div className="space-y-4 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans" suppressHydrationWarning>
      {/* 1. BREADCRUMB & HERO BENTO HEADER BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 20 }}
        className="p-3.5 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 sm:space-y-4"
      >
        {/* Breadcrumb Navigation Row - Desktop */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <button
            onClick={() => {
              setSelectedTopic(null);
              setLessonData(null);
            }}
            className="hover:text-[#0059bb] dark:hover:text-sky-400 cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Ngữ pháp AI
          </button>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-bold">
            {activeLevel === "basic"
              ? "Nền tảng 500+"
              : activeLevel === "intermediate"
              ? "Bứt phá 750+"
              : activeLevel === "advanced"
              ? "Chinh phục 900+ / IELTS"
              : "Tất cả chuyên đề"}
          </span>
          <span>/</span>
          <span className="text-[#0059bb] dark:text-sky-400 font-bold truncate">
            {selectedTopicData?.name}
          </span>
        </div>

        {/* Breadcrumb Navigation Row - Mobile */}
        <div className="sm:hidden flex items-center gap-1 text-xs font-semibold text-slate-500">
          <button
            onClick={() => {
              setSelectedTopic(null);
              setLessonData(null);
            }}
            className="hover:text-[#0059bb] dark:hover:text-sky-400 cursor-pointer flex items-center gap-1 shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Ngữ pháp
          </button>
          <span>/</span>
          <span className="text-[#0059bb] dark:text-sky-400 font-bold truncate">
            {selectedTopicData?.name}
          </span>
        </div>

        {/* Hero Banner Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pt-1">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Topic Icon Avatar */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xs bg-gradient-to-br from-[#0059bb]/10 to-indigo-500/10 dark:from-[#0059bb]/20 dark:to-indigo-500/20 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs">
              {getGrammarTopicIcon(selectedTopicData?.id || "")}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h1 className="text-sm sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                  {selectedTopicData?.name}
                </h1>
                <span className="px-2 py-0.5 rounded-xs text-[8px] sm:text-[10px] font-black uppercase bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20">
                  {selectedTopicData?.nameEn}
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                {selectedTopicData?.desc} • {selectedTopicData?.focus}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-between sm:justify-end shrink-0">
            <button
              onClick={() => {
                setSelectedTopic(null);
                setLessonData(null);
              }}
              className="px-2.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              ‹ Chọn bài khác
            </button>

            <button
              onClick={generateExercises}
              disabled={loading}
              className="px-3 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
              )}
              <span>Thi thử AI (+15 XP)</span>
            </button>
          </div>
        </div>

        {/* Hero 4 Metrics Bento Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2 border-t border-slate-100 dark:border-white/5">
          <div className="hidden sm:flex p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
                Phạm vi bài học
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display mt-0.5">
                3 cấu trúc (+ / - / ?)
              </div>
            </div>
            <div className="w-7 h-7 rounded-xs bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
            <div>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
                Trọng tâm bài thi
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 font-display mt-0.5 truncate max-w-[120px]">
                {selectedTopicData?.focus.split("&")[0].trim()}
              </div>
            </div>
            <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="hidden sm:flex p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
                Cảnh báo bẫy thi
              </div>
              <div className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 font-display mt-0.5">
                2 quy tắc bẫy TOEIC
              </div>
            </div>
            <div className="w-7 h-7 rounded-xs bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
            <div>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
                Phần thưởng
              </div>
              <div className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 font-display mt-0.5">
                +15 XP bài luyện
              </div>
            </div>
            <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. MODE SPLIT NAVIGATION TABS (UNIFIED 2 MODES) */}
      <div className="p-1 sm:p-1.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-1 sm:gap-1.5">
        <button
          onClick={() => setActiveTab("lesson")}
          className={`flex-1 py-2 sm:py-2.5 text-xs font-bold rounded-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "lesson"
              ? "bg-[#0059bb] text-white shadow-2xs font-black"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
          <span className="hidden sm:inline">Bài giảng & Cẩm nang</span>
          <span className="sm:hidden">Bài giảng</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("practice");
            if (exercises.length === 0) {
              generateExercises();
            }
          }}
          disabled={loading}
          className={`flex-1 py-2 sm:py-2.5 text-xs font-bold rounded-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "practice"
              ? "bg-purple-600 text-white shadow-2xs font-black"
              : "bg-slate-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50"
          }`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Zap className="w-4 h-4 fill-current text-amber-300 animate-pulse" />
          )}
          <span className="hidden sm:inline">🤖 Thi Thử AI & Trợ Lý AI Tutor (+15 XP)</span>
          <span className="sm:hidden">⚡ Luyện tập AI</span>
        </button>
      </div>

      {/* MODE 1: MASTER THEORY LECTURE & COLOR-CODED FORMULAS */}
      {activeTab === "lesson" && (
        <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5">
          {/* 1. Overview & Memory Tip */}
          {lessonData?.memoryTip && (
            <div className="p-3.5 sm:p-4 rounded-xs bg-[#ebf3fe]/80 dark:bg-slate-800/60 border border-[#0059bb]/20 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Mẹo ghi nhớ nhanh & Cốt lõi:
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
                {lessonData.memoryTip}
              </p>
            </div>
          )}

          {/* 2. Color-coded Formulas Section */}
          {lessonData?.formulas && lessonData.formulas.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#0059bb]" /> Cấu trúc & Công thức trọng tâm
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {lessonData.formulas.map((formula, fIdx) => {
                  const isAffirmative = formula.includes("(+)") || formula.toLowerCase().includes("khẳng định");
                  const isNegative = formula.includes("(-)") || formula.toLowerCase().includes("phủ định");

                  let colorStyle = "bg-blue-50/80 dark:bg-slate-800/60 border-blue-200/60 text-[#0059bb] dark:text-sky-300";
                  let badgeText = "Nghi vấn (?)";
                  let badgeStyle = "bg-[#0059bb]/10 text-[#0059bb] border-[#0059bb]/20";

                  if (isAffirmative) {
                    colorStyle = "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200/60 text-emerald-800 dark:text-emerald-300";
                    badgeText = "Khẳng định (+)";
                    badgeStyle = "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
                  } else if (isNegative) {
                    colorStyle = "bg-rose-50/80 dark:bg-rose-950/40 border-rose-200/60 text-rose-800 dark:text-rose-300";
                    badgeText = "Phủ định (-)";
                    badgeStyle = "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";
                  }

                  return (
                    <div key={fIdx} className={`p-3.5 rounded-xs border space-y-2 font-mono shadow-2xs ${colorStyle}`}>
                      <div className="flex items-center justify-between font-sans">
                        <span className={`px-2 py-0.5 rounded-xs text-[9px] font-black uppercase border ${badgeStyle}`}>
                          {badgeText}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold tracking-tight">
                        {formula}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Signal Words & Time Indicators */}
          {lessonData?.signalWords && lessonData.signalWords.length > 0 && (
            <div className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#0059bb]" /> Từ nhận biết & Trạng từ chỉ thời gian:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {lessonData.signalWords.map((word, wIdx) => (
                  <span key={wIdx} className="px-2 py-0.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 4. Exam Usages Contexts (TOEIC & IELTS Applications) */}
          {lessonData?.usages && lessonData.usages.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-sky-500" /> Ứng dụng trong đề thi TOEIC & IELTS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lessonData.usages.map((u, uIdx) => (
                  <div key={uIdx} className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/10 space-y-2 hover:border-[#0059bb]/30 transition-all shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-xs text-[9px] font-black uppercase bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20">
                        {u.context}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                      &quot;{u.example}&quot;
                    </p>
                    {u.note && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        💡 {u.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. REDESIGNED EXAMPLES UI (Ultra-Polished Dashboard Bento Cards) */}
          {lessonData?.examples && lessonData.examples.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-emerald-500" /> Ví dụ minh họa ngữ cảnh thực tế
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lessonData.examples.map((ex, eIdx) => (
                  <div
                    key={eIdx}
                    className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/10 space-y-2 relative overflow-hidden group hover:border-[#0059bb]/40 dark:hover:border-sky-500/30 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-xs text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                        Ví dụ {eIdx + 1}
                      </span>
                      {ex.highlight && (
                        <span className="px-2 py-0.5 rounded-xs font-mono text-[9px] font-bold bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-300 border border-[#0059bb]/20">
                          Từ trọng tâm: {ex.highlight}
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-snug">
                      &quot;{ex.en}&quot;
                    </div>

                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/50 dark:border-white/5 flex items-center gap-1.5">
                      <span>🇻🇳</span>
                      <span>{ex.vi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Extra Rules & Detailed Nuances */}
          {lessonData?.extraRules && lessonData.extraRules.length > 0 && (
            <div className="p-3.5 rounded-xs bg-blue-50/60 dark:bg-slate-800/40 border border-blue-200/60 dark:border-white/5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Quy tắc bổ sung & Lưu ý đặc biệt:
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

          {/* 7. Common Mistakes & TOEIC/IELTS Traps (Compact Dashboard Bento Cards) */}
          {lessonData?.commonMistakes && lessonData.commonMistakes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Cảnh báo bẫy thi TOEIC & IELTS
                </h3>
                <span className="px-2 py-0.5 rounded-xs text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {lessonData.commonMistakes.length} bẫy đề
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lessonData.commonMistakes.map((mistake, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/10 space-y-2 hover:border-amber-400/40 transition-all shadow-2xs"
                  >
                    {/* Wrong vs Correct Inline Rows */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 p-1.5 rounded-xs bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/10">
                        <span className="px-1.5 py-0.2 rounded-xs text-[9px] font-black uppercase bg-rose-500/15 text-rose-600 dark:text-rose-400 shrink-0">
                          ❌ Sai
                        </span>
                        <span className="line-through text-slate-500 dark:text-slate-400 text-xs font-medium truncate">
                          {mistake.wrong}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 p-1.5 rounded-xs bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/10">
                        <span className="px-1.5 py-0.2 rounded-xs text-[9px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                          ✅ Đúng
                        </span>
                        <span className="text-slate-900 dark:text-white text-xs font-bold font-mono truncate">
                          {mistake.correct}
                        </span>
                      </div>
                    </div>

                    {/* Explanation snippet */}
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed pt-1.5 border-t border-slate-200/50 dark:border-white/5 flex items-start gap-1">
                      <span className="text-amber-500 font-bold shrink-0">💡</span>
                      <span className="line-clamp-2">{mistake.explanation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Primary Action Button */}
          <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedTopic(null);
                setLessonData(null);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              ‹ Trở về danh sách
            </button>

            <button
              onClick={generateExercises}
              disabled={loading}
              className="px-4 py-2 rounded-xs bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-current" /> Bắt đầu bài thi thử AI (+15 XP) ➔
            </button>
          </div>
        </div>
      )}

      {/* MODE 2 & 3: UNIFIED INTERACTIVE PRACTICE & AI TUTOR COMPANION (66.7% + 33.3% BENTO SIDE-BY-SIDE) */}
      {activeTab === "practice" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT COLUMN: AI EXAM SIMULATOR (PRACTICE QUIZ WITH SCORECARD & PROGRESS - 8/12 SPAN) */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-4">
            {loading ? (
              /* SKELETON LOADING CARD (RULE 1 COMPLIANCE) */
              <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 animate-pulse">
                {/* Skeleton Header Bar */}
                <div className="space-y-2 border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-5 bg-slate-200 dark:bg-slate-800 rounded-xs" />
                      <div className="w-44 h-4 bg-slate-100 dark:bg-slate-800/60 rounded-xs hidden sm:block" />
                    </div>
                    <div className="w-28 h-6 bg-slate-200 dark:bg-slate-800 rounded-xs" />
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>

                {/* Skeleton Sentence */}
                <div className="space-y-2 py-1">
                  <div className="w-4/5 h-6 bg-slate-200 dark:bg-slate-800 rounded-xs" />
                  <div className="w-1/2 h-4 bg-slate-100 dark:bg-slate-800/50 rounded-xs" />
                </div>

                {/* Skeleton 4 Options */}
                <div className="space-y-2.5">
                  <div className="w-full h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xs border border-slate-200/60 dark:border-white/5" />
                  <div className="w-full h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xs border border-slate-200/60 dark:border-white/5" />
                  <div className="w-full h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xs border border-slate-200/60 dark:border-white/5" />
                  <div className="w-full h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xs border border-slate-200/60 dark:border-white/5" />
                </div>

                {/* Skeleton Footer */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="w-20 h-8 bg-slate-200 dark:bg-slate-800 rounded-xs" />
                  <div className="w-24 h-8 bg-slate-200 dark:bg-slate-800 rounded-xs" />
                </div>
              </div>
            ) : exercises.length > 0 ? (
              <div>
                {!submitted ? (
                  <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
                    {/* Header Quiz Bar & Progress Line */}
                    <div className="space-y-2 border-b border-slate-100 dark:border-white/5 pb-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="px-2.5 py-0.5 rounded-xs text-xs font-black bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 shrink-0">
                            Câu {currentIndex + 1} / {exercises.length}
                          </span>
                          <span className="text-xs font-bold text-slate-500 hidden sm:inline font-display truncate">
                            Phòng thi trắc nghiệm AI • {selectedTopicData?.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={generateExercises}
                            disabled={loading}
                            title="Tạo ngẫu nhiên 5 câu hỏi thi thử mới"
                            className="px-2.5 py-1 rounded-xs bg-[#0059bb]/10 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
                            <span>Đổi 5 câu khác</span>
                          </button>

                          <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-xs border border-emerald-500/20">
                            +15 XP
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0059bb] dark:bg-sky-400 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Exercise Sentence & Instant Feedback Screen */}
                    {exercises[currentIndex] && (() => {
                      const currentEx = exercises[currentIndex];
                      const userSelected = answers[currentEx.id];
                      const isAnswered = Boolean(userSelected);
                      const isCorrect = userSelected === currentEx.correctAnswer;
                      const optionLetters = ["A", "B", "C", "D"];

                      return (
                        <div className="space-y-4 py-1">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display leading-snug">
                            {currentEx.sentence}
                          </h3>

                          {/* Options List with Instant Color Feedback */}
                          <div className="space-y-2.5">
                            {currentEx.options.map((opt, oIdx) => {
                              const isThisCorrect = opt === currentEx.correctAnswer;
                              const isThisSelected = userSelected === opt;

                              let btnStyle =
                                "bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-blue-50/60 dark:hover:bg-slate-800 hover:border-blue-300";

                              if (isAnswered) {
                                if (isThisCorrect) {
                                  btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold shadow-2xs";
                                } else if (isThisSelected && !isThisCorrect) {
                                  btnStyle = "bg-rose-600 text-white border-rose-600 font-bold shadow-2xs";
                                } else {
                                  btnStyle = "opacity-50 bg-slate-100 dark:bg-slate-800/40 border-slate-200/60 dark:border-white/5 text-slate-400";
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleSelectOption(currentEx.id, opt)}
                                  disabled={isAnswered}
                                  className={`w-full p-3 rounded-xs border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 ${
                                    isAnswered ? "cursor-default" : "cursor-pointer"
                                  } ${btnStyle}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`w-6 h-6 rounded-xs flex items-center justify-center text-xs font-black shrink-0 ${
                                      isAnswered
                                        ? isThisCorrect || isThisSelected
                                          ? "bg-white/20 text-white"
                                          : "bg-slate-200/60 dark:bg-slate-700/50 text-slate-400"
                                        : "bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                    }`}>
                                      {optionLetters[oIdx] || oIdx + 1}
                                    </span>
                                    <span>{opt}</span>
                                  </div>

                                  {/* Instant Icon Badge */}
                                  {isAnswered && (
                                    <div className="shrink-0 font-bold text-xs">
                                      {isThisCorrect && (
                                        <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-xs text-[11px]">
                                          <Check className="w-3.5 h-3.5" /> Đúng
                                        </span>
                                      )}
                                      {isThisSelected && !isThisCorrect && (
                                        <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-xs text-[11px]">
                                          <X className="w-3.5 h-3.5" /> Sai
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* INSTANT AI EXPLANATION CARD RIGHT AT THIS QUESTION */}
                          {isAnswered && (
                            <div
                              className={`p-3.5 rounded-xs border text-xs space-y-2 transition-all shadow-2xs ${
                                isCorrect
                                  ? "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200"
                                  : "bg-rose-50/90 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-900/40 text-rose-950 dark:text-rose-200"
                              }`}
                            >
                              <div className="font-bold flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs font-black">
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
                                  <span className="text-[11px] font-mono bg-white/60 dark:bg-slate-900/60 px-2 py-0.5 rounded-xs border border-rose-200 dark:border-rose-900/40 font-bold text-rose-800 dark:text-rose-300">
                                    Đáp án đúng: <strong>{currentEx.correctAnswer}</strong>
                                  </span>
                                )}
                              </div>

                              <div className="pt-1.5 border-t border-slate-200/60 dark:border-white/10 text-xs leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
                                <span className="font-bold text-[#0059bb] dark:text-sky-400">💡 AI Giải thích chi tiết:</span>{" "}
                                {currentEx.explanation}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Quiz Navigation Footer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                        disabled={currentIndex === 0}
                        className="px-3.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
                      >
                        ‹ Câu trước
                      </button>

                      {currentIndex < exercises.length - 1 ? (
                        <button
                          onClick={() => setCurrentIndex((prev) => prev + 1)}
                          className="px-4 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          Câu tiếp ➔
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitQuiz}
                          disabled={Object.keys(answers).length < exercises.length}
                          className="px-4 py-1.5 rounded-xs bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" /> Nộp bài (+15 XP)
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* SCORECARD & DETAILED QUESTION REVIEW SCREEN */
                  <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5">
                    {/* Score Header */}
                    <div className="p-4 rounded-xs bg-[#ebf3fe]/80 dark:bg-slate-800/60 border border-[#0059bb]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl shrink-0">
                          🏆
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                            Kết Quả Bài Thi Thử AI: {selectedTopicData?.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Bạn làm đúng <span className="font-bold text-emerald-600 dark:text-emerald-400">{Object.keys(answers).filter((id) => answers[Number(id)] === exercises.find(e => e.id === Number(id))?.correctAnswer).length}/{exercises.length}</span> câu • Đã nhận +15 XP thưởng!
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={generateExercises}
                        disabled={loading}
                        className="px-3.5 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Làm bài mới
                      </button>
                    </div>

                    {/* Detailed Review List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500" /> Review Chi Tiết Đáp Án & Giải Thích AI:
                      </h4>

                      <div className="space-y-2.5">
                        {exercises.map((ex, idx) => {
                          const userAns = answers[ex.id];
                          const isCorrect = userAns === ex.correctAnswer;

                          return (
                            <div
                              key={ex.id}
                              className={`p-3.5 rounded-xs border space-y-2 shadow-2xs ${
                                isCorrect
                                  ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/30"
                                  : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/60 dark:border-rose-900/30"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                                  Câu {idx + 1}: {ex.sentence}
                                </span>
                                <span className={`px-2 py-0.5 rounded-xs text-[9px] font-black uppercase shrink-0 ${
                                  isCorrect ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20"
                                }`}>
                                  {isCorrect ? "✅ Đúng" : "❌ Sai"}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                                <div className={`p-2 rounded-xs border ${
                                  isCorrect ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300" : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-300"
                                }`}>
                                  <span className="font-sans font-bold">Bạn chọn:</span> {userAns || "(Chưa chọn)"}
                                </div>
                                <div className="p-2 rounded-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300">
                                  <span className="font-sans font-bold">Đáp án chuẩn:</span> {ex.correctAnswer}
                                </div>
                              </div>

                              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed pt-1.5 border-t border-slate-200/50 dark:border-white/5 flex items-start gap-1.5">
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

          {/* RIGHT COLUMN: INTEGRATED AI TUTOR INTERACTIVE CHAT COMPANION (BALANCED 4/12 SPAN) */}
          <div className="lg:col-span-4 xl:col-span-4 p-4 sm:p-4.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3.5 sticky top-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="w-9 h-9 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 text-xl border border-[#0059bb]/20">
                🤖
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                  Trợ Lý AI Tutor
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  {selectedTopicData?.name}
                </p>
              </div>
            </div>

            {/* Chat Message Stream */}
            <div className="space-y-2.5 max-h-80 lg:max-h-[380px] overflow-y-auto pr-1 no-scrollbar min-h-[140px]">
              {chatMessages.length === 0 ? (
                <div className="p-3 text-center rounded-xs bg-[#ebf3fe]/70 dark:bg-slate-800/60 border border-[#0059bb]/20 text-xs text-slate-700 dark:text-slate-300 font-medium space-y-1">
                  <div>👋 Bạn có thắc mắc về bài thi hay cấu trúc ngữ pháp này không?</div>
                  <div className="text-[11px] text-slate-500">Bấm gợi ý 1-Click hoặc gõ câu hỏi để trao đổi nhé!</div>
                </div>
              ) : (
                chatMessages.map((msg, mIdx) => (
                  <div
                    key={mIdx}
                    className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-6 h-6 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 text-xs border border-[#0059bb]/20">
                        🤖
                      </div>
                    )}

                    <div
                      className={`p-2.5 rounded-xs text-xs leading-relaxed max-w-[90%] ${
                        msg.role === "user"
                          ? "bg-[#0059bb] text-white font-semibold"
                          : "bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-medium"
                      }`}
                    >
                      {msg.role === "user" ? msg.text : renderFormattedText(msg.text)}
                    </div>

                    {msg.role === "user" && (
                      <div className="w-6 h-6 rounded-xs bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 text-[10px] font-bold border border-blue-500/20">
                        👤
                      </div>
                    )}
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

            {/* Quick 1-Click Prompt Chips (Only shown before chat begins) */}
            {chatMessages.length === 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                <div className="text-[10px] uppercase font-bold text-slate-400">Gợi ý câu hỏi 1-Click:</div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => handleSendChatMessage(`Giải thích thêm cho tôi lý do chọn đáp án trong các câu trắc nghiệm trên`)}
                    className="w-full p-1.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/60 text-[11px] font-bold transition-all cursor-pointer text-left flex items-center gap-1 truncate"
                  >
                    ❓ Tại sao câu trong bài lại chọn đáp án đó?
                  </button>

                  <button
                    onClick={() => handleSendChatMessage(`Cho 3 bẫy đề thi TOEIC Part 5 thường gặp nhất liên quan đến ${selectedTopicData?.name}`)}
                    className="w-full p-1.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/60 text-[11px] font-bold transition-all cursor-pointer text-left flex items-center gap-1 truncate"
                  >
                    💡 3 bẫy TOEIC hay gặp nhất
                  </button>

                  <button
                    onClick={() => handleSendChatMessage(`Cho 3 câu ví dụ mẫu chuẩn IELTS Writing Task 2 áp dụng ${selectedTopicData?.name}`)}
                    className="w-full p-1.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/60 text-[11px] font-bold transition-all cursor-pointer text-left flex items-center gap-1 truncate"
                  >
                    📝 3 câu ví dụ IELTS Writing
                  </button>

                  <button
                    onClick={() => handleSendChatMessage(`Phân biệt ${selectedTopicData?.name} với cấu trúc tương tự dễ nhầm lẫn`)}
                    className="w-full p-1.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/60 text-[11px] font-bold transition-all cursor-pointer text-left flex items-center gap-1 truncate"
                  >
                    🔍 Phân biệt cấu trúc dễ nhầm
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
                className="w-full p-2 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
              />

              <button
                type="submit"
                disabled={!chatInput.trim() || chatLoading}
                className="w-full py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" /> Gửi câu hỏi cho AI (+10 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
