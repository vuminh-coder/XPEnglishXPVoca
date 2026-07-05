"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  RotateCcw,
} from "lucide-react";

interface ReadingPassage {
  id: string;
  title: string;
  category: string;
  icon: string;
  passage: string;
  wordCount: number;
  questions: Array<{
    text: string;
    options: string[];
    correct: number;
  }>;
}

const READING_PASSAGES: ReadingPassage[] = [
  {
    id: "r1",
    title: "Office Email",
    category: "Business",
    icon: "📧",
    passage: `Subject: Updated Office Hours During Holiday Season\n\nDear Staff,\n\nPlease be informed that starting December 20th, our office will operate on a reduced schedule. The office will open at 9:00 AM and close at 3:00 PM from Monday through Friday. This schedule will remain in effect until January 3rd.\n\nDuring this period, all urgent requests should be directed to the emergency contact line at extension 4500. Regular maintenance work on the heating system will be carried out on December 23rd, so the office temperature may be lower than usual on that day.\n\nPlease plan your tasks accordingly and ensure all critical deadlines are met before December 19th.\n\nBest regards,\nSarah Thompson\nOffice Manager`,
    wordCount: 112,
    questions: [
      { text: "When do the reduced hours begin?", options: ["December 19th", "December 20th", "December 23rd", "January 3rd"], correct: 1 },
      { text: "What time does the office close during the holiday?", options: ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"], correct: 1 },
      { text: "What will happen on December 23rd?", options: ["Office party", "Heating maintenance", "Building closure", "Staff meeting"], correct: 1 },
    ],
  },
  {
    id: "r2",
    title: "Product Review",
    category: "Technology",
    icon: "💻",
    passage: `AirFlow Pro Wireless Headphones — Review\n\nThe AirFlow Pro represents a significant upgrade over its predecessor. Priced at $149, these wireless headphones offer 40 hours of battery life, active noise cancellation, and Bluetooth 5.3 connectivity.\n\nThe sound quality is impressive, with deep bass and crystal-clear mids. The noise cancellation effectively blocks out most ambient sounds, making them ideal for commuters and frequent travelers. The headphones are lightweight at just 250 grams and fold flat for easy storage.\n\nHowever, the microphone quality during phone calls is only average, and the companion app lacks some advanced EQ customization options. The touch controls on the ear cups can also be overly sensitive at times.\n\nOverall, the AirFlow Pro offers excellent value for money and is recommended for anyone seeking premium sound without the premium price tag.\n\nRating: 4.2 out of 5 stars`,
    wordCount: 142,
    questions: [
      { text: "How much do the AirFlow Pro headphones cost?", options: ["$99", "$129", "$149", "$199"], correct: 2 },
      { text: "What is mentioned as a weakness?", options: ["Battery life", "Sound quality", "Microphone quality", "Bluetooth range"], correct: 2 },
      { text: "What is the overall rating?", options: ["3.8 stars", "4.0 stars", "4.2 stars", "4.5 stars"], correct: 2 },
      { text: "How long does the battery last?", options: ["20 hours", "30 hours", "40 hours", "50 hours"], correct: 2 },
    ],
  },
  {
    id: "r3",
    title: "News Article",
    category: "Science",
    icon: "🔬",
    passage: `Researchers at the University of Melbourne have discovered a new species of deep-sea fish that produces its own light through a unique biological process. The fish, named Luminara australis, was found at a depth of 3,200 meters in the Coral Sea.\n\nUnlike most bioluminescent creatures that use chemical reactions to produce light, Luminara australis generates light through specialized cells in its skin that convert mechanical energy from ocean currents into visible light. This makes it the first known organism to use piezoelectric bioluminescence.\n\nDr. James Wong, who led the research team, described the discovery as "groundbreaking." The team believes this mechanism could inspire new technologies for sustainable energy production. The findings were published in the journal Nature Marine Biology.`,
    wordCount: 126,
    questions: [
      { text: "Where was the fish discovered?", options: ["Pacific Ocean", "Atlantic Ocean", "Coral Sea", "Indian Ocean"], correct: 2 },
      { text: "At what depth was the fish found?", options: ["1,200 meters", "2,200 meters", "3,200 meters", "4,200 meters"], correct: 2 },
      { text: "What makes this fish unique?", options: ["Its size", "Its color", "Its light production method", "Its speed"], correct: 2 },
    ],
  },
  {
    id: "r4",
    title: "Event Invitation",
    category: "Social",
    icon: "🎉",
    passage: `You are cordially invited to the Annual Charity Gala\n\nDate: Saturday, March 15th, 2025\nTime: 6:30 PM — 11:00 PM\nVenue: The Grand Ballroom, Riverside Hotel\nDress Code: Black Tie\n\nJoin us for an evening of fine dining, live music, and a silent auction. All proceeds will benefit the Children's Education Fund, which provides scholarships to underprivileged students in the metropolitan area.\n\nTickets are $200 per person or $350 per couple. VIP tables seating eight guests are available for $1,500. VIP guests will enjoy priority seating, a complimentary champagne reception, and a private meet-and-greet with our keynote speaker, renowned author Dr. Maya Chen.\n\nTo reserve your tickets, please visit www.charitygala2025.org or call (555) 123-4567 by March 1st.\n\nWe look forward to seeing you there!`,
    wordCount: 138,
    questions: [
      { text: "What is the dress code for the event?", options: ["Business casual", "Smart casual", "Black tie", "Costume"], correct: 2 },
      { text: "How much is a couple's ticket?", options: ["$200", "$300", "$350", "$400"], correct: 2 },
      { text: "Who is the keynote speaker?", options: ["Dr. James Wong", "Dr. Maya Chen", "Sarah Thompson", "Dr. Kim Lee"], correct: 1 },
      { text: "What is the RSVP deadline?", options: ["February 15th", "March 1st", "March 10th", "March 15th"], correct: 1 },
    ],
  },
  {
    id: "r5",
    title: "Travel Guide",
    category: "Tourism",
    icon: "✈️",
    passage: `Top 3 Hidden Gems in Kyoto, Japan\n\n1. Fushimi Inari at Dawn — While thousands of tourists visit this famous shrine during the day, arriving at 5:30 AM rewards you with an almost empty trail. The morning light filtering through the orange torii gates creates a magical atmosphere perfect for photography.\n\n2. Philosopher's Path in Autumn — This two-kilometer canal-side walk is lined with hundreds of cherry trees. While spring attracts the crowds, autumn transforms the path into a tunnel of golden and crimson leaves, with far fewer visitors.\n\n3. Nishiki Market Back Streets — Most tourists stick to the main covered market street. However, the side alleys hide family-run shops that have been operating for over a century. Try the handmade mochi at Nakamura-ya, a tiny shop that opens only on weekdays.`,
    wordCount: 140,
    questions: [
      { text: "What time should you arrive at Fushimi Inari to avoid crowds?", options: ["4:30 AM", "5:30 AM", "6:30 AM", "7:30 AM"], correct: 1 },
      { text: "How long is the Philosopher's Path?", options: ["1 km", "2 km", "3 km", "5 km"], correct: 1 },
      { text: "When is Nakamura-ya open?", options: ["Weekends only", "Weekdays only", "Every day", "Holidays only"], correct: 1 },
    ],
  },
  {
    id: "r6",
    title: "Safety Instructions",
    category: "Manual",
    icon: "⚠️",
    passage: `SmartHome Pro Security Camera — Quick Setup Guide\n\nStep 1: Download the SmartHome Pro app from the App Store or Google Play. Create an account or sign in with your existing credentials.\n\nStep 2: Plug in the camera using the included USB-C cable and power adapter. Wait for the LED indicator to flash blue, indicating the camera is ready for setup.\n\nStep 3: In the app, tap "Add Device" and select "Security Camera." Follow the on-screen instructions to connect the camera to your Wi-Fi network. Note: The camera supports only 2.4GHz networks.\n\nStep 4: Position the camera at a height of 2-3 meters for optimal coverage. The camera has a 130-degree field of view and can detect motion up to 10 meters away.\n\nTroubleshooting: If the LED flashes red, the camera cannot connect to Wi-Fi. Move the camera closer to your router or check your network password.`,
    wordCount: 150,
    questions: [
      { text: "What type of cable does the camera use?", options: ["Micro USB", "USB-C", "Lightning", "USB-A"], correct: 1 },
      { text: "What Wi-Fi frequency does the camera support?", options: ["5GHz only", "2.4GHz only", "Both", "None"], correct: 1 },
      { text: "What does a red LED indicate?", options: ["Camera is ready", "Low battery", "Wi-Fi connection failure", "Recording in progress"], correct: 2 },
      { text: "What is the camera's field of view?", options: ["90 degrees", "110 degrees", "130 degrees", "180 degrees"], correct: 2 },
    ],
  },
];

const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const cardItemVariants = {
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

export default function ReadingPage() {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (selectedPassage && !showResult) {
      timerRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selectedPassage, showResult]);

  const selectPassage = (p: ReadingPassage) => {
    setSelectedPassage(p);
    setAnswers({});
    setShowResult(false);
    setElapsed(0);
  };

  const submitReading = () => {
    if (!selectedPassage) return;
    setShowResult(true);
    if (timerRef.current) clearInterval(timerRef.current);
    const correct = selectedPassage.questions.filter((q, i) => answers[`q_${i}`] === q.correct).length;
    const xp = correct * 10 + 20;
    awardXp(xp);
    addToast({ type: "xp", title: `+${xp} XP!`, message: `Đúng ${correct}/${selectedPassage.questions.length} câu!` });
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // Passage list
  if (!selectedPassage) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-20 md:pb-6" suppressHydrationWarning>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="page-header animate-fade-in-down"
        >
          <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 text-slate-900 dark:text-white font-display">
            <BookOpen className="h-7 w-7 text-teal-500 animate-pulse" /> Đọc hiểu tiếng Anh
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Đọc bài viết và trả lời câu hỏi — phong cách TOEIC Part 7.</p>
        </motion.div>

        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {READING_PASSAGES.map((p) => (
            <motion.div
              variants={cardItemVariants}
              whileHover={{ translateY: -3 }}
              whileTap={{ scale: 0.98 }}
              key={p.id}
              className="cursor-pointer"
              onClick={() => selectPassage(p)}
            >
              <Card variant="bezel" className="p-5 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)] relative overflow-hidden group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 w-fit">{p.icon}</div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white font-display">{p.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge variant="neutral" className="text-[9px] font-bold">{p.category}</Badge>
                  <Badge variant="primary" className="text-[9px] font-bold">{p.wordCount} từ</Badge>
                  <Badge variant="neutral" className="text-[9px] font-bold">{p.questions.length} câu hỏi</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Reading + Questions view
  const correctCount = selectedPassage.questions.filter((q, i) => answers[`q_${i}`] === q.correct).length;

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-20 md:pb-6" suppressHydrationWarning>
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" className="rounded-xl font-bold cursor-pointer" onClick={() => setSelectedPassage(null)}>
          <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Chọn bài khác
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" className="font-bold"><Clock className="h-3 w-3 mr-0.5 text-sky-500 animate-spin" />{formatTime(elapsed)}</Badge>
          {showResult && (
            <Badge variant={correctCount === selectedPassage.questions.length ? "success" : "primary"} className="font-bold">
              {correctCount}/{selectedPassage.questions.length} đúng
            </Badge>
          )}
        </div>
      </div>

      {/* Passage */}
      <Card variant="bezel" className="p-6 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)]">
        <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 dark:border-neutral-850 pb-3">
          <span className="text-2xl">{selectedPassage.icon}</span>
          <div>
            <h2 className="text-sm md:text-base font-black text-slate-900 dark:text-white font-display">{selectedPassage.title}</h2>
            <Badge variant="neutral" className="text-[9px] font-bold mt-0.5">{selectedPassage.category}</Badge>
          </div>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-350 whitespace-pre-line font-medium bg-slate-50/50 dark:bg-neutral-950 p-4 rounded-2xl border border-slate-100/50 dark:border-neutral-850/50">
            {selectedPassage.passage}
          </div>
        </div>
      </Card>

      {/* Questions */}
      <Card variant="bezel" className="p-6 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)] space-y-5">
        <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Câu hỏi đọc hiểu</h3>

        {selectedPassage.questions.map((q, qi) => {
          const key = `q_${qi}`;
          const isCorrect = showResult && answers[key] === q.correct;
          const isWrong = showResult && answers[key] !== undefined && answers[key] !== q.correct;
          return (
            <div key={qi} className={`p-4 rounded-2xl border ${isCorrect ? "border-emerald-300 bg-emerald-50/30 dark:border-emerald-850/30 dark:bg-emerald-950/20" : isWrong ? "border-rose-300 bg-rose-50/30 dark:border-rose-850/30 dark:bg-rose-950/20" : "border-slate-200 dark:border-neutral-850"}`}>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-250 mb-3 flex items-start gap-1">
                <span className="shrink-0">{qi + 1}.</span> 
                <span className="flex-1 leading-normal">{q.text}</span>
                {showResult && isCorrect && <CheckCircle className="inline h-4 w-4 text-emerald-500 ml-1.5 shrink-0" />}
                {showResult && isWrong && <XCircle className="inline h-4 w-4 text-rose-500 ml-1.5 shrink-0" />}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[key] === oi;
                  const correctOpt = showResult && oi === q.correct;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={oi}
                      onClick={() => !showResult && setAnswers((prev) => ({ ...prev, [key]: oi }))}
                      disabled={showResult}
                      className={`p-3 rounded-xl text-[11px] font-bold text-left transition-all border leading-snug flex items-center cursor-pointer ${
                        correctOpt ? "border-emerald-450 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-extrabold ring-1 ring-emerald-500/10"
                        : selected && isWrong ? "border-rose-450 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-350 font-extrabold ring-1 ring-rose-500/10"
                        : selected ? "border-teal-450 bg-teal-50/50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-300 font-extrabold ring-1 ring-teal-500/10"
                        : "border-slate-250 dark:border-neutral-850 text-slate-650 dark:text-slate-400 hover:border-slate-350 bg-white dark:bg-neutral-900"
                      }`}
                    >
                      <span className="inline-block w-5 h-5 rounded-lg bg-slate-100 dark:bg-neutral-850 text-center text-[10px] font-black leading-5 mr-2.5 shrink-0">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {!showResult ? (
          <Button variant="primary" className="w-full justify-center py-3.5 font-bold cursor-pointer rounded-xl shadow-glow" onClick={submitReading}
            disabled={Object.keys(answers).length < selectedPassage.questions.length}>
            <Zap className="h-4 w-4 mr-1" /> Nộp bài
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1 justify-center py-3.5 font-bold cursor-pointer rounded-xl" onClick={() => setSelectedPassage(null)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Chọn bài khác
            </Button>
            <Button variant="primary" className="flex-1 justify-center py-3.5 font-bold cursor-pointer rounded-xl shadow-glow" onClick={() => { setAnswers({}); setShowResult(false); setElapsed(0); }}>
              <RotateCcw className="h-4 w-4 mr-1" /> Làm lại
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
