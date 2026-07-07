"use client";
import React, { useState } from "react";
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
  RotateCcw,
  Zap,
  Target,
  GraduationCap
} from "lucide-react";

interface Exercise {
  id: number;
  sentence: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
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
  // Basic level (15 topics)
  { id: "present_tenses", name: "Thì Hiện tại đơn & Tiếp diễn", nameEn: "Present Simple & Continuous", icon: "⏰", desc: "Mô tả công việc hàng ngày, thói quen và lịch trình.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "past_continuous_tenses", name: "Thì Quá khứ đơn & Tiếp diễn", nameEn: "Past Simple & Continuous", icon: "🗓", desc: "Mô tả sự việc đã hoàn thành hoặc đang xảy ra tại một thời điểm quá khứ.", level: "basic", focus: "TOEIC Part 6 & IELTS Speaking" },
  { id: "future_tenses", name: "Thì Tương lai đơn & Tương lai gần", nameEn: "Future Simple & Be Going To", icon: "🔮", desc: "Kêu gọi hành động tự phát hoặc kế hoạch dự định trước.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "nouns_countability", name: "Danh từ & Tính chất đếm được", nameEn: "Nouns & Countability", icon: "📦", desc: "Phân biệt danh từ đếm được, không đếm được và danh từ số nhiều.", level: "basic", focus: "TOEIC Part 5" },
  { id: "pronouns", name: "Đại từ nhân xưng & Phản thân", nameEn: "Pronouns & Possessives", icon: "👥", desc: "Sử dụng đúng đại từ làm chủ ngữ, tân ngữ và phản thân.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "possessive_structures", name: "Tính từ sở hữu & Sở hữu cách", nameEn: "Possessive Adjectives & Case", icon: "🔑", desc: "Cách chỉ định sở hữu vật lý và danh tính sở hữu cách.", level: "basic", focus: "TOEIC Part 5" },
  { id: "determiners_quantifiers", name: "Từ hạn định & Lượng từ cơ bản", nameEn: "Determiners & Quantifiers", icon: "🔢", desc: "Dùng các lượng từ thông dụng: some, any, many, much, few, little.", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "basic_articles", name: "Mạo từ cơ bản (A, An, The)", nameEn: "Basic Articles", icon: "📝", desc: "Quy tắc xác định và không xác định danh từ.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "basic_adj_adv", name: "Tính từ & Trạng từ chỉ thể cách", nameEn: "Adjectives & Adverbs", icon: "✨", desc: "Vị trí của tính từ và trạng từ bổ nghĩa trong câu.", level: "basic", focus: "TOEIC Part 5" },
  { id: "basic_comparisons", name: "So sánh hơn & So sánh nhất", nameEn: "Basic Comparatives & Superlatives", icon: "📊", desc: "Các cấu trúc so sánh hơn, so sánh bằng và so sánh nhất.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "time_prepositions", name: "Giới từ chỉ Thời gian", nameEn: "Prepositions of Time", icon: "⏳", desc: "Cách dùng In, On, At, During, For, Since chính xác.", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "place_prepositions", name: "Giới từ chỉ Nơi chốn & Hướng", nameEn: "Prepositions of Place & Direction", icon: "📍", desc: "Cách sử dụng giới từ không gian: In, On, At, Under, Into, To.", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "basic_modals", name: "Động từ khuyết thiếu cơ bản", nameEn: "Basic Modal Verbs", icon: "💡", desc: "Diễn tả khả năng, xin phép, bắt buộc: Can, Could, Must, Should.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "tag_questions", name: "Câu hỏi đuôi cơ bản", nameEn: "Basic Tag Questions", icon: "❓", desc: "Quy tắc láy đuôi xác nhận thông tin khẳng định/phủ định.", level: "basic", focus: "TOEIC Part 7 & IELTS Speaking" },
  { id: "basic_conjunctions", name: "Liên từ nối cơ bản (FANBOYS)", nameEn: "Basic Conjunctions", icon: "🔗", desc: "Kết nối ý tưởng cơ bản bằng And, But, Or, So, Because.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing" },

  // Intermediate level (15 topics)
  { id: "perfect_present", name: "Thì Hiện tại hoàn thành & HTTD", nameEn: "Present Perfect & Continuous", icon: "⏳", desc: "Mô tả hành động kéo dài từ quá khứ hoặc vừa mới xảy ra.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "perfect_past", name: "Thì Quá khứ hoàn thành & QKHTTD", nameEn: "Past Perfect & Continuous", icon: "⏮", desc: "Mô tả sự việc xảy ra trước một thời điểm hoặc hành động khác trong quá khứ.", level: "intermediate", focus: "TOEIC Part 6 & IELTS Writing" },
  { id: "perfect_future", name: "Thì Tương lai hoàn thành & TLHTTD", nameEn: "Future Perfect & Continuous", icon: "⏭", desc: "Mô tả hành động sẽ hoàn thành trước một mốc thời gian tương lai.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "passive_voice", name: "Câu bị động cơ bản & nâng cao", nameEn: "Passive Voice", icon: "🔄", desc: "Nhấn mạnh đối tượng chịu tác động của hành động trong các thì.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "conditionals_0_1_2", name: "Câu điều kiện Loại 0, 1 & 2", nameEn: "Conditionals Type 0, 1 & 2", icon: "🔀", desc: "Giả định về các tình huống có thật hoặc giả định trái thực tế hiện tại.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "relative_clauses", name: "Mệnh đề quan hệ", nameEn: "Relative Clauses", icon: "🔗", desc: "Nối các câu đơn sử dụng đại từ quan hệ Who, Whom, Which, That, Whose.", level: "intermediate", focus: "TOEIC Part 5 & 6" },
  { id: "gerunds_infinitives", name: "Danh động từ & Động từ nguyên mẫu", nameEn: "Gerunds & Infinitives", icon: "🎯", desc: "Quy tắc động từ đi kèm đuôi -ing hoặc to-infinitive.", level: "intermediate", focus: "TOEIC Part 5" },
  { id: "modal_verbs_inter", name: "Động từ khuyết thiếu trung cấp", nameEn: "Intermediate Modals", icon: "💡", desc: "Diễn tả bổn phận, khuyên bảo nâng cao: Have to, Ought to, May, Might, Need.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "conjunctions_transitions", name: "Liên từ tương hợp & Trạng từ liên kết", nameEn: "Correlative Conjunctions & Adverbs", icon: "🖇", desc: "Kết nối ý tưởng bằng Both...and, Either...or, However, Therefore.", level: "intermediate", focus: "TOEIC Part 5 & 6 & IELTS Writing Task 2" },
  { id: "adverbial_clauses", name: "Mệnh đề trạng ngữ chỉ Lý do & Nhượng bộ", nameEn: "Adverbial Clauses", icon: "📝", desc: "Cách dùng cấu trúc Although, Even though, Because of, Due to.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "reported_speech", name: "Câu gián tiếp & Tường thuật", nameEn: "Reported Speech", icon: "💬", desc: "Trần thuật lại câu nói của người khác với quy tắc lùi thì.", level: "intermediate", focus: "TOEIC Part 7 & IELTS Speaking" },
  { id: "causative_structures", name: "Cấu trúc truyền khiến (Nhờ vả)", nameEn: "Causative Structures", icon: "🤝", desc: "Thể nhờ vả, yêu cầu: Have/Get something done.", level: "intermediate", focus: "TOEIC Part 5 & 6" },
  { id: "subject_verb_agreement", name: "Sự hòa hợp Chủ - Vị cơ bản", nameEn: "Subject-Verb Agreement Rules", icon: "⚖️", desc: "Các nguyên tắc chia động từ cơ bản phù hợp với chủ ngữ số ít/số nhiều.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "linking_verbs", name: "Động từ liên kết & Hệ từ", nameEn: "Linking Verbs", icon: "🧠", desc: "Cách dùng động từ nối với tính từ: Become, Seem, Taste, Feel.", level: "intermediate", focus: "TOEIC Part 5" },
  { id: "phrasal_verbs_basics", name: "Cụm động từ phổ biến", nameEn: "Phrasal Verbs basics", icon: "🚀", desc: "Giới thiệu các cụm động từ thông dụng trong giao tiếp và công sở.", level: "intermediate", focus: "TOEIC Part 7 & IELTS Speaking" },

  // Advanced level (15 topics in pedagogical learning order)
  { id: "noun_clauses", name: "Mệnh đề danh từ", nameEn: "Noun Clauses", icon: "💬", desc: "Mệnh đề đóng vai trò danh từ dùng That, Wh-words, If/Whether.", level: "advanced", focus: "IELTS Writing Task 2 & TOEIC Part 6" },
  { id: "conditionals_3_mixed", name: "Điều kiện Loại 3 & Hỗn hợp", nameEn: "Type 3 & Mixed Conditionals", icon: "🔀", desc: "Giả định trái ngược với quá khứ và tác động đến hiện tại.", level: "advanced", focus: "IELTS Writing & Speaking (Band 7.0+)" },
  { id: "conditional_inversion", name: "Đảo ngữ trong câu điều kiện", nameEn: "Inversion in Conditionals", icon: "🔀", desc: "Cấu trúc đảo ngữ trang trọng: Should I, Were I, Had I.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "inversion", name: "Đảo ngữ với Trạng từ phủ định", nameEn: "Inversion with Negative Adverbs", icon: "🔄", desc: "Đảo trợ động từ lên trước chủ ngữ để nhấn mạnh câu viết.", level: "advanced", focus: "IELTS Writing Task 2 (Band 7.0+)" },
  { id: "subjunctive_mood", name: "Thể giả định nâng cao", nameEn: "Advanced Subjunctive Mood", icon: "⚖️", desc: "Sử dụng trong các câu cầu khiến trang trọng: demand that, crucial that.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "reduced_clauses", name: "Rút gọn mệnh đề quan hệ & phân từ", nameEn: "Reduced Clauses & Participles", icon: "✂️", desc: "Lược bỏ đại từ quan hệ và dùng V-ing/V3 để câu ngắn gọn.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "reduced_adverbial", name: "Rút gọn mệnh đề trạng ngữ", nameEn: "Reduced Adverbial Clauses", icon: "✂️", desc: "Lược bỏ chủ ngữ phụ khi hai mệnh đề cùng chủ ngữ: Although playing, When finished.", level: "advanced", focus: "IELTS Writing Task 2 & TOEIC Part 6" },
  { id: "double_passive", name: "Bị động kép & Bị động phi cá nhân", nameEn: "Double & Impersonal Passive", icon: "🔄", desc: "Cấu trúc giả định khách quan: It is believed that / She is said to.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "cleft_sentences", name: "Câu chẻ nhấn mạnh", nameEn: "Cleft Sentences", icon: "⚡", desc: "Cấu trúc nhấn mạnh tiêu điểm thông tin: It is... that...", level: "advanced", focus: "IELTS Writing Task 2 & Speaking" },
  { id: "double_comparatives", name: "So sánh kép & Nâng cao", nameEn: "Double & Advanced Comparatives", icon: "📈", desc: "Cấu trúc nhân quả song song: The more... the more...", level: "advanced", focus: "IELTS Writing Task 2" },
  { id: "advanced_modals", name: "Động từ khuyết thiếu quá khứ", nameEn: "Advanced Past Modals", icon: "🛡", desc: "Đoán nhận sự việc quá khứ: must have done, should have done.", level: "advanced", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "advanced_determiners", name: "Từ hạn định & Lượng từ nâng cao", nameEn: "Advanced Determiners", icon: "🔢", desc: "Phân biệt cách dùng: Either, Neither, None, All, Both, Each.", level: "advanced", focus: "TOEIC Part 5" },
  { id: "subject_verb_exceptions", name: "Hòa hợp Chủ - Vị ngoại lệ", nameEn: "Subject-Verb Agreement Exceptions", icon: "🤝", desc: "Các quy tắc chia động từ phức tạp với danh từ tập hợp, đại từ bất định.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "parallel_structure", name: "Cấu trúc song hành nâng cao", nameEn: "Parallel Structure", icon: "⚖️", desc: "Đồng bộ từ loại trong chuỗi thông tin để tăng điểm mạch lạc.", level: "advanced", focus: "IELTS Writing Task 2 (Band 7.0+)" },
  { id: "prepositions_collocations", name: "Cụm giới từ đi kèm (Collocations)", nameEn: "Prepositional Collocations", icon: "📍", desc: "Các cụm giới từ cố định đi với danh từ, động từ và tính từ phổ biến.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" }
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

export default function GrammarLabPage() {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<"basic" | "intermediate" | "advanced">("basic");
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const generateExercises = async (topicId: string) => {
    setSelectedTopic(topicId);
    setLoading(true);
    setExercises([]);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setSubmitted(false);

    try {
      const res = await fetch("/api/ai/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicId, level: activeLevel }),
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

  const submitAll = () => {
    setSubmitted(true);
    setShowResults(true);
    const correctCount = exercises.filter((ex) => answers[ex.id] === ex.correctAnswer).length;
    const xpEarned = correctCount * 5 + 20;
    awardXp(xpEarned);
    addToast({
      type: "xp",
      title: `+${xpEarned} XP!`,
      message: `Đúng ${correctCount}/${exercises.length} câu. Làm tốt lắm!`,
    });
  };

  const currentExercise = exercises[currentIndex];
  const filteredTopics = GRAMMAR_TOPICS.filter((t) => t.level === activeLevel);

  // Topic selection screen
  if (!selectedTopic || exercises.length === 0) {
    return (
      <div className="space-y-6 pb-20 md:pb-6" suppressHydrationWarning>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="bezel overflow-hidden"
        >
          <div className="bezel-inner bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-purple-950/20 p-6 relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 text-slate-900 dark:text-white font-display">
              <BookOpen className="h-7 w-7 text-indigo-500 animate-pulse" /> Phòng luyện Ngữ pháp AI
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold leading-relaxed">
              Chọn chủ đề ngữ pháp IELTS & TOEIC tích hợp — Gemini AI sẽ phân tích trình độ và tự động sinh bài tập trắc nghiệm riêng biệt cho bạn.
            </p>
          </div>
        </motion.div>

        {/* Level Tabs selector */}
        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-neutral-950 rounded-2xl w-fit">
          {[
            { id: "basic", name: "Cơ bản" },
            { id: "intermediate", name: "Trung cấp" },
            { id: "advanced", name: "Nâng cao" }
          ].map((lvl) => {
            const active = activeLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setActiveLevel(lvl.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all select-none ${
                  active 
                    ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                    : "text-slate-500 hover:text-slate-750 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {lvl.name}
              </button>
            );
          })}
        </div>

        {loading ? (
          <Card variant="bezel" className="p-12 text-center bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)] animate-scale-up">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mx-auto" />
            <p className="text-xs md:text-sm font-bold text-slate-450 dark:text-slate-500 mt-3 animate-pulse">AI đang phân tích và sinh đề bài tập...</p>
          </Card>
        ) : (
          <motion.div
            variants={topicsContainerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredTopics.map((topic) => (
              <motion.div
                variants={topicItemVariants}
                whileHover={{ translateY: -3 }}
                whileTap={{ scale: 0.98 }}
                key={topic.id}
                onClick={() => generateExercises(topic.id)}
                className="cursor-pointer"
              >
                <Card
                  variant="bezel"
                  className="p-5 flex flex-col justify-between h-full group bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)] relative overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="text-3xl mb-1">{topic.icon}</div>
                    <h3 className="text-xs font-black text-slate-800 dark:text-white group-hover:text-indigo-500 transition-colors">{topic.name}</h3>
                    <p className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold italic">{topic.nameEn}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed font-medium mt-1">{topic.desc}</p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100/60 dark:border-neutral-850/60 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[9px] font-black text-indigo-500 uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                      <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" /> Bắt đầu luyện <ArrowRight className="h-3 w-3 shrink-0" />
                    </div>
                    <Badge variant="neutral" className="text-[8px] font-extrabold px-1.5 py-0.5 tracking-tighter flex items-center gap-0.5">
                      <Target className="h-2.5 w-2.5 text-indigo-500" /> {topic.focus}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  // Exercise screen
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-6" suppressHydrationWarning>
      {/* Progress header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
      >
        <Button variant="secondary" size="sm" className="cursor-pointer rounded-xl font-bold" onClick={() => { setSelectedTopic(null); setExercises([]); }}>
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Chọn chủ đề khác
        </Button>
        <Badge variant="primary" className="text-xs md:text-sm font-black px-3.5 py-1">
          {showResults ? "Kết quả" : `${currentIndex + 1} / ${exercises.length}`}
        </Badge>
      </motion.div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-slate-100 dark:bg-neutral-855 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${((showResults ? exercises.length : currentIndex + 1) / exercises.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showResults ? (
          /* Results summary */
          <motion.div
            key="results-summary"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
          >
            <Card variant="bezel" className="p-6 space-y-5 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)] animate-scale-up">
              <div className="text-center">
                <div className="text-4xl font-black text-indigo-650 font-display">
                  {exercises.filter((ex) => answers[ex.id] === ex.correctAnswer).length}/{exercises.length}
                </div>
                <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 mt-1 font-bold">Câu trả lời đúng</p>
              </div>

              <div className="space-y-4">
                {exercises.map((ex) => {
                  const isCorrect = answers[ex.id] === ex.correctAnswer;
                  return (
                    <div key={ex.id} className={`p-4 rounded-2xl border text-xs leading-relaxed font-semibold ${isCorrect ? "border-emerald-250/50 bg-emerald-50/20 dark:bg-emerald-950/15 text-emerald-700 dark:text-emerald-400" : "border-rose-250/50 bg-rose-50/20 dark:bg-rose-950/15 text-rose-750 dark:text-rose-400"}`}>
                      <div className="flex items-start gap-2.5">
                        {isCorrect ? <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />}
                        <div className="space-y-1.5">
                          <p className="text-xs font-black text-slate-800 dark:text-slate-200">{ex.sentence}</p>
                          {!isCorrect && (
                            <p className="text-[11px] text-rose-500 font-bold">Bạn chọn: <span className="underline decoration-wavy">{answers[ex.id] || "(bỏ trống)"}</span> — Đáp án đúng: <span className="text-emerald-600 dark:text-emerald-400 font-black">{ex.correctAnswer}</span></p>
                          )}
                          <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed font-medium mt-1">{ex.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button variant="primary" className="w-full py-4 text-xs md:text-sm font-bold flex items-center justify-center cursor-pointer shadow-glow" onClick={() => { setSelectedTopic(null); setExercises([]); }}>
                <RotateCcw className="h-4 w-4 mr-1.5" /> Luyện chủ đề khác
              </Button>
            </Card>
          </motion.div>
        ) : currentExercise ? (
          /* Single exercise card */
          <motion.div
            key={`exercise-${currentIndex}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ type: "spring", stiffness: 95, damping: 16 }}
          >
            <Card variant="bezel" className="p-6 space-y-6 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)]">
              <div>
                <Badge variant="neutral" className="mb-3 font-bold animate-pulse">Câu {currentIndex + 1}</Badge>
                <p className="text-base font-black text-slate-800 dark:text-white leading-relaxed font-display">
                  {currentExercise.sentence}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {currentExercise.options.map((option) => {
                  const isSelected = answers[currentExercise.id] === option;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={option}
                      onClick={() => selectAnswer(currentExercise.id, option)}
                      className={`p-3.5 rounded-xl text-xs md:text-sm font-bold text-left transition-all border cursor-pointer leading-snug ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-50/50 text-indigo-750 dark:bg-indigo-950/20 dark:text-indigo-450 dark:border-indigo-650"
                          : "border-slate-200 dark:border-neutral-850 hover:border-slate-350 bg-white dark:bg-neutral-950 text-slate-700 dark:text-slate-300 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-between gap-3 pt-3 border-t border-slate-100 dark:border-neutral-850">
                <Button
                  variant="bezel"
                  size="sm"
                  className="rounded-xl font-bold cursor-pointer text-xs"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => i - 1)}
                >
                  ← Trước
                </Button>

                {currentIndex < exercises.length - 1 ? (
                  <Button variant="primary" size="sm" className="rounded-xl font-bold cursor-pointer text-xs flex items-center gap-1" onClick={() => setCurrentIndex((i) => i + 1)}>
                    Tiếp <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-xl font-bold cursor-pointer text-xs flex items-center gap-1 shadow-glow"
                    onClick={submitAll}
                    disabled={Object.keys(answers).length < exercises.length}
                  >
                    <Zap className="h-3.5 w-3.5 text-yellow-300 animate-bounce" /> Nộp bài
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
