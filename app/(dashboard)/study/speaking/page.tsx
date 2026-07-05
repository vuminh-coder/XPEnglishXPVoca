"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Badge } from "@/components/ui";
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
];

export default function SpeakingPracticePage() {
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase>(MOCK_PHRASES[0]);
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
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        animationFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(0, 0, width, height);

        const barWidth = (width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2;
          ctx.fillStyle = `rgb(${barHeight + 100}, 139, 246)`;
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
    <div className="mx-auto max-w-5xl animate-fade-in space-y-6">
      {/* Page Header */}
      <div className="page-header animate-fade-in-down">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">
          AI Speaking Pronunciation Coach
        </h1>
        <p className="page-subtitle text-muted max-w-2xl" style={{ marginTop: "6px" }}>
          Luyện phát âm chuẩn xác đến từng từ bằng so khớp phổ âm tự động.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5 items-start">
        {/* Left Side: Phrases Selection */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Mẫu câu luyện nói</h3>
          <div className="space-y-3">
            {MOCK_PHRASES.map((phrase) => (
              <button
                key={phrase.id}
                type="button"
                onClick={() => {
                  setSelectedPhrase(phrase);
                  setSpokenText("");
                  setOverallScore(null);
                  setWordsFeedback([]);
                }}
                className={`bezel w-full text-left ${selectedPhrase.id === phrase.id ? "ring-2 ring-sky-400" : ""}`}
              >
                <div className="bezel-inner p-4 space-y-2">
                  <Badge variant={phrase.topic.includes("IELTS") ? "legendary" : "primary"}>
                    {phrase.topic}
                  </Badge>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2">
                    {phrase.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Active speaking board */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bezel">
            <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-6 text-center">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-neutral-800 pb-3">
                <span className="text-xs font-black uppercase text-slate-400">Đọc to câu dưới đây</span>
                <button
                  type="button"
                  onClick={playTTS}
                  className="rounded-full bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 hover:text-sky-500 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-750"
                  title="Nghe giọng đọc mẫu"
                >
                  <Volume2 className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Phrase text with pronunciation visual colorizer */}
              <div className="space-y-2 py-4">
                {wordsFeedback.length > 0 ? (
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-2xl font-black tracking-tight">
                    {wordsFeedback.map((w, idx) => (
                      <span
                        key={idx}
                        className={w.isCorrect ? "text-emerald-500" : "text-rose-500 underline decoration-wavy decoration-2"}
                      >
                        {w.word}
                      </span>
                    ))}
                  </div>
                ) : (
                  <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-200 leading-relaxed">
                    {selectedPhrase.text}
                  </h2>
                )}
                <p className="text-xs font-mono text-slate-400">{selectedPhrase.phonetic}</p>
              </div>

              {/* Waveform Visualizer Canvas */}
              {isRecording && (
                <div className="flex justify-center">
                  <canvas ref={canvasRef} className="h-12 w-full max-w-xs rounded-xl" width={300} height={50} />
                </div>
              )}

              {/* Recording Action Button */}
              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`h-16 w-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                    isRecording
                      ? "bg-rose-500 shadow-rose-500/20"
                      : "bg-sky-500 shadow-sky-500/20"
                  }`}
                >
                  {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>
                <span className="text-xs font-bold text-slate-500">
                  {isRecording ? "Đang ghi âm... Nhấp lại để dừng" : "Nhấp micro để bắt đầu nói"}
                </span>
              </div>

              {/* Spoken transcript output */}
              {spokenText && (
                <div className="bg-slate-50 dark:bg-neutral-950/40 p-4 rounded-2xl border border-slate-100 dark:border-neutral-900 text-left space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400">Kết quả nhận diện giọng nói</span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    “{spokenText}”
                  </p>
                </div>
              )}

              {/* Submit / Score feedback section */}
              {spokenText && overallScore === null && (
                <Button
                  variant="primary"
                  className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
                  onClick={handleEvaluate}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang phân tích..." : "Xem phân tích phát âm"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}

              {overallScore !== null && (
                <div className="bg-sky-50/50 dark:bg-sky-950/10 p-5 rounded-2xl border border-sky-100/50 dark:border-sky-900/30 flex items-center justify-between text-left">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-7 w-7 text-amber-500 animate-bounce" />
                    <div>
                      <h4 className="text-sm font-black text-sky-850 dark:text-sky-400">Độ chuẩn xác phát âm</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Tiêu chuẩn bản xứ Mỹ.</p>
                    </div>
                  </div>
                  <span className="text-3xl font-black text-sky-600">{overallScore}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}