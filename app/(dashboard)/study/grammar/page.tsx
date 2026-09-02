"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  ArrowRight,
  Zap,
  Target,
  Lightbulb,
  MessageSquare,
  Copy,
  Search,
  BookMarked,
  Layers,
  Award,
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
} from "lucide-react";

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

export default function GrammarCatalogPage() {
  const [activeLevel, setActiveLevel] = useState<"all" | "basic" | "intermediate" | "advanced">("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      {/* AppTopHeader Navigation */}
      <AppTopHeader
        rightDesktopContent={
          <Link
            href="/study/grammar/present_simple"
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            <span>Học Bài Đầu Tiên +15 XP</span>
          </Link>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={activeLevel === "all"}
            onClick={() => setActiveLevel("all")}
            icon={<BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Tất Cả"
          />
          <HeaderPillItem
            active={activeLevel === "basic"}
            onClick={() => setActiveLevel("basic")}
            icon={<CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
            label="Nền Tảng 500+"
          />
          <HeaderPillItem
            active={activeLevel === "intermediate"}
            onClick={() => setActiveLevel("intermediate")}
            icon={<Layers className="w-3.5 h-3.5 text-sky-500" />}
            label="Bứt Phá 750+"
          />
          <HeaderPillItem
            active={activeLevel === "advanced"}
            onClick={() => setActiveLevel("advanced")}
            icon={<Award className="w-3.5 h-3.5 text-purple-500" />}
            label="Chinh Phục 900+"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* Main Hub Container */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. Compact Hero Studio Banner & 4 Inline Metrics */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs relative overflow-hidden space-y-3"
        >
          {/* Top ambient blue accent glow */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#0059bb]/60 to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Left: Studio Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                <BookMarked className="w-5 h-5 stroke-[2]" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                    Ngữ Pháp AI • Grammar Studio
                  </h1>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    CEFR B1-C2
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                  Hệ thống 60 chuyên đề bài giảng & phòng luyện trắc nghiệm AI phân tích chuyên sâu chuẩn TOEIC & IELTS.
                </p>
              </div>
            </div>

            {/* Right: 4 Micro Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
              <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Tất cả</span>
                  <span className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white mt-0.5 block">60 bài</span>
                </div>
                <BookOpen className="w-4 h-4 text-[#0059bb] shrink-0" />
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">500+</span>
                  <span className="text-xs sm:text-sm font-black font-display text-emerald-600 dark:text-emerald-400 mt-0.5 block">20 bài</span>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">750+</span>
                  <span className="text-xs sm:text-sm font-black font-display text-sky-600 dark:text-sky-400 mt-0.5 block">20 bài</span>
                </div>
                <Layers className="w-4 h-4 text-sky-500 shrink-0" />
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">900+</span>
                  <span className="text-xs sm:text-sm font-black font-display text-purple-600 dark:text-purple-400 mt-0.5 block">20 bài</span>
                </div>
                <Award className="w-4 h-4 text-purple-500 shrink-0" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Search Box Row */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm chuyên đề ngữ pháp theo tên, ngữ cảnh hoặc kỳ thi..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3. 60 Grammar Topics Grid */}
        {filteredTopics.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto shadow-2xs">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Không tìm thấy chuyên đề ngữ pháp phù hợp
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5"
          >
            {filteredTopics.map((topic) => (
              <motion.div key={topic.id} variants={itemVariants}>
                <Link
                  href={`/study/grammar/${topic.id}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 transition-all cursor-pointer flex flex-col justify-between h-full group active:scale-[0.99]"
                >
                  <div className="space-y-3">
                    {/* Upper Header: Icon + Focus Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {getGrammarTopicIcon(topic.id)}
                      </div>

                      <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 shrink-0 truncate max-w-[130px]">
                        {topic.focus.split("&")[0].trim()}
                      </span>
                    </div>

                    {/* Topic Title & Desc */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                        {topic.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2 font-medium">
                        {topic.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-display">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 shrink-0" />
                      <span>Học ngay</span>
                    </span>

                    <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-[#0059bb] group-hover:text-white transition-all flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </PageEntranceWrapper>
  );
}
