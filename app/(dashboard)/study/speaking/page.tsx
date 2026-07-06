"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Badge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Sparkles,
  Trophy,
  Volume2,
  CheckCircle,
  AlertCircle,
  Play,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Phrase {
  id: string;
  text: string;
  phonetic: string;
  topic: string;
}

const MOCK_PHRASES: Phrase[] = [
  {
    id: "p1",
    topic: "IELTS Speaking Part 1",
    text: "Actually, I am working as a software developer in a tech company.",
    phonetic: "/ˈæktʃuəli, aɪ æm ˈwɜːkɪŋ æz ə ˈsɒftweə dɪˈveləpə ɪn ə tek ˈkʌmpəni./",
  },
  {
    id: "p2",
    topic: "TOEIC Speaking Read Aloud",
    text: "Welcome to the grand opening of our new corporate headquarters today.",
    phonetic: "/ˈwelkəm tuː ðə ɡrænd ˈəʊpənɪŋ ɒv ˈaʊə ˈkɔːpərət ˌhedˈkwɔːtəz təˈdeɪ./",
  },
  {
    id: "p3",
    topic: "IELTS Speaking Part 2",
    text: "It was an unforgettable experience that completely changed my perspective.",
    phonetic: "/ɪt wɒz ən ˌʌnfəˈɡetəbl ɪkˈspɪəriəns ðæt kəmˈpliːtli tʃeɪndʒd maɪ pəˈspektɪv./",
  },
  {
    id: "p4",
    topic: "IELTS Speaking Part 1",
    text: "In my opinion, online learning offers incredible flexibility for working professionals.",
    phonetic: "/ɪn maɪ əˈpɪnjən, ˈɒnˌlaɪn ˈlɜːnɪŋ ˈɒfəz ɪnˈkredəbl ˌfleksəˈbɪləti fɔː ˈwɜːkɪŋ prəˈfeʃənlz./",
  },
  {
    id: "p5",
    topic: "TOEIC Speaking Read Aloud",
    text: "We are pleased to inform you that your job application has been approved.",
    phonetic: "/wiː ɑː pliːzd tuː ɪnˈfɔːm juː ðæt jɔː dʒɒb ˌæplɪˈkeɪʃn hæz biːn əˈpruːvd./",
  },
  {
    id: "p6",
    topic: "IELTS Speaking Part 2",
    text: "The technological advancements in recent years have been absolutely phenomenal.",
    phonetic: "/ðə ˌteknəˈlɒdʒɪkl ədˈvɑːnsmənts ɪn ˈriːsnt jɪəz hæv biːn ˌæbsəˈluːtli fəˈnɒmɪnl./",
  },
];

export default function SpeakingPracticePage() {
  const [shuffledPhrases, setShuffledPhrases] = useState<Phrase[]>(() => MOCK_PHRASES);
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase>(MOCK_PHRASES[0]);

  useEffect(() => {
    const shuffled = [...MOCK_PHRASES].sort(() => 0.5 - Math.random());
    setShuffledPhrases(shuffled);
    if (shuffled.length > 0) {
      setSelectedPhrase(shuffled[0]);
    }
  }, []);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const [wordsFeedback, setWordsFeedback] = useState<Array<{ word: string; isCorrect: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onresult = (event: any) => {
          const result = event.results[0][0].transcript;
          setSpokenText(result);
        };

        rec.onerror = (e: any) => {
          console.error("Speech recognition error:", e);
          setIsRecording(false);
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = rec;
      }
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Visualizer Waveform Canvas animation
  const startVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(stream);
      
      source.connect(analyser);
      analyser.fftSize = 256;
      
      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        
        // Dynamically resize canvas logical pixels to match CSS layout width to prevent pixelation
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        animationFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        // Soft visualizer tail glow overlay
        ctx.fillStyle = "rgba(250, 251, 252, 0.2)";
        ctx.fillRect(0, 0, width, height);

        const barWidth = (width / bufferLength) * 2.2;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2.5;
          // Gradient fill colors matching styling
          ctx.fillStyle = `rgb(${i * 4 + 78}, 145, 245)`;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };

      draw();
    } catch (e) {
      console.warn("Audio Context Visualizer blocked or failed:", e);
    }
  };

  const stopVisualizer = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    // Clean canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Recording controls
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói Web Speech API.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      stopVisualizer();
      setIsRecording(false);
    } else {
      setSpokenText("");
      setOverallScore(null);
      setWordsFeedback([]);
      
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        startVisualizer();
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Submit to API
  const handleEvaluate = async () => {
    if (!spokenText) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/pronunciation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spokenText,
          targetText: selectedPhrase.text,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setOverallScore(json.score);
        setWordsFeedback(json.words);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const playTTS = () => {
    if (typeof window !== "undefined") {
      const synth = window.speechSynthesis;
      if (synth) {
        const utterance = new SpeechSynthesisUtterance(selectedPhrase.text);
        utterance.lang = "en-US";
        synth.speak(utterance);
      }
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
          AI Speaking Pronunciation Coach
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium max-w-xl">
          Luyện phát âm chuẩn xác đến từng từ bằng so khớp phổ âm tự động.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-5 items-start">
        {/* Left Side: Phrases Selection */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">
            Mẫu câu luyện nói
          </h3>
          <div className="space-y-3">
            {shuffledPhrases.map((phrase) => (
              <motion.button
                whileHover={{ translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                key={phrase.id}
                type="button"
                onClick={() => {
                  setSelectedPhrase(phrase);
                  setSpokenText("");
                  setOverallScore(null);
                  setWordsFeedback([]);
                }}
                className={`bezel w-full text-left cursor-pointer ${
                  selectedPhrase.id === phrase.id ? "ring-2 ring-sky-400" : ""
                }`}
              >
                <div className={`bezel-inner p-4 space-y-2 transition-all ${
                  selectedPhrase.id === phrase.id 
                    ? "bg-sky-50/30 dark:bg-sky-950/20" 
                    : "bg-white dark:bg-neutral-900"
                }`}>
                  <Badge variant={phrase.topic.includes("IELTS") ? "legendary" : "primary"}>
                    {phrase.topic}
                  </Badge>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm line-clamp-2 leading-relaxed">
                    {phrase.text}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Side: Active speaking board */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bezel">
            <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-6 text-center">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-neutral-850 pb-3">
                <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500">
                  Đọc to câu dưới đây
                </span>
                <button
                  type="button"
                  onClick={playTTS}
                  className="rounded-full bg-slate-50 p-2 text-slate-650 hover:bg-slate-100 hover:text-sky-500 dark:bg-neutral-850 dark:text-slate-400 dark:hover:bg-neutral-800 cursor-pointer"
                  title="Nghe giọng đọc mẫu"
                >
                  <Volume2 className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Phrase text with pronunciation visual colorizer */}
              <div className="space-y-2 py-4">
                {wordsFeedback.length > 0 ? (
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-xl md:text-2xl font-black tracking-tight">
                    {wordsFeedback.map((w, idx) => (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        key={idx}
                        className={w.isCorrect ? "text-emerald-500" : "text-rose-500 underline decoration-wavy decoration-2"}
                      >
                        {w.word}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-800 dark:text-slate-200 leading-relaxed font-display">
                    {selectedPhrase.text}
                  </h2>
                )}
                <p className="text-[10px] md:text-xs font-mono text-slate-400 dark:text-slate-500 font-bold mt-1">
                  {selectedPhrase.phonetic}
                </p>
              </div>

              {/* Waveform Visualizer Canvas */}
              {isRecording && (
                <div className="flex justify-center">
                  <canvas ref={canvasRef} className="h-12 w-full max-w-xs rounded-xl bg-slate-50/50 border border-slate-100 dark:bg-neutral-950/20 dark:border-neutral-850" width={300} height={50} />
                </div>
              )}

              {/* Recording Action Button */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  {isRecording && (
                    <span className="absolute inset-0 rounded-full bg-rose-500/25 animate-ping" />
                  )}
                  <motion.button
                    whileTap={{ scale: 0.93 }}
                    type="button"
                    onClick={toggleRecording}
                    className={`relative h-16 w-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 cursor-pointer ${
                      isRecording
                        ? "bg-rose-500 shadow-rose-500/20"
                        : "bg-sky-500 shadow-sky-500/20"
                    }`}
                  >
                    {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </motion.button>
                </div>
                <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                  {isRecording ? "Đang ghi âm... Nhấp lại để dừng" : "Nhấp micro để bắt đầu nói"}
                </span>
              </div>

              {/* Spoken transcript output */}
              {spokenText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 dark:bg-neutral-950/40 p-4 rounded-2xl border border-slate-100 dark:border-neutral-850 text-left space-y-1.5"
                >
                  <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-550">
                    Kết quả nhận diện giọng nói
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-350 leading-relaxed">
                    “{spokenText}”
                  </p>
                </motion.div>
              )}

              {/* Submit / Score feedback section */}
              {spokenText && overallScore === null && (
                <Button
                  variant="primary"
                  className="w-full py-3 text-xs md:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-glow"
                  onClick={handleEvaluate}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang phân tích..." : "Xem phân tích phát âm"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}

              {overallScore !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 95, damping: 15 }}
                  className="bg-sky-50/50 dark:bg-sky-950/10 p-5 rounded-2xl border border-sky-100/50 dark:border-sky-900/30 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="h-7 w-7 text-amber-500 animate-bounce" />
                    <div>
                      <h4 className="text-xs md:text-sm font-black text-sky-850 dark:text-sky-400">Độ chuẩn xác phát âm</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Tiêu chuẩn bản xứ Mỹ.</p>
                    </div>
                  </div>
                  <span className="text-2xl md:text-3xl font-black text-sky-600 font-display">{overallScore}%</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}