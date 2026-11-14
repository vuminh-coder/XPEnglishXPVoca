/**
 * AI Transcript Alignment & Bilingual Subtitle Builder
 * NOTE: Never fabricates/hallucinates subtitles from a video's title alone.
 * Requires an authentic `rawTranscript` pasted by the learner (or external ASR text),
 * aligns into natural sentences using Gemini when configured or deterministic punctuation splitting,
 * and normalizes + translates EN->VI cleanly.
 */

import {
  extractDictationWord,
  formatTimestampMs,
} from "@/features/listening/services/youtubeSubtitleParser";
import {
  normalizeSubtitlePipeline,
  NormalizedCue,
} from "@/features/listening/services/subtitleNormalizer";
import { translateMissingVietnameseBatch } from "@/features/listening/services/subtitleTranslateHelper";

export interface AiGeneratedSubtitleItem {
  id: number;
  start: string;
  end: string;
  duration: number;
  english: string;
  vietnamese: string;
  dictationWord: string;
  startSeconds: number;
  isAiGenerated?: boolean;
}

export interface GenerateAiSubtitlesParams {
  videoId: string;
  videoTitle: string;
  authorName?: string;
  rawTranscript?: string;
}

export class RawTranscriptRequiredError extends Error {
  code = "RAW_TRANSCRIPT_REQUIRED";
  constructor(
    message = "Video không có phụ đề CC khả dụng. Vui lòng dán nội dung transcript hoặc tải lên file .srt / .vtt thật của video để căn chỉnh phụ đề."
  ) {
    super(message);
    this.name = "RawTranscriptRequiredError";
  }
}

/**
 * Deterministically segments authentic raw transcript text into natural sentences
 * with proportional spoken timestamps (~2.4 words/sec) and batch EN->VI translation.
 */
async function buildDeterministicAlignedSubtitles(rawTranscript: string): Promise<AiGeneratedSubtitleItem[]> {
  const cleanedLines = rawTranscript
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n+/)
    .map((line) => line.replace(/^\[\d{1,2}:\d{2}(?::\d{2})?\]\s*/, "").trim())
    .filter((line) => line.length > 0);

  const sentenceChunks: string[] = [];
  for (const line of cleanedLines) {
    // Split line by sentence terminators while keeping natural phrasing
    const parts = line
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    for (const part of parts) {
      const words = part.split(/\s+/).filter(Boolean);
      if (words.length <= 16) {
        sentenceChunks.push(part);
      } else {
        for (let i = 0; i < words.length; i += 12) {
          sentenceChunks.push(words.slice(i, i + 12).join(" "));
        }
      }
    }
  }

  let cursor = 0.5;
  const rawCues: NormalizedCue[] = sentenceChunks.map((textEn) => {
    const wordCount = Math.max(2, textEn.split(/\s+/).filter(Boolean).length);
    const dur = parseFloat(Math.min(7.5, Math.max(1.8, wordCount / 2.4)).toFixed(3));
    const startTime = parseFloat(cursor.toFixed(3));
    const endTime = parseFloat((startTime + dur).toFixed(3));
    cursor = endTime + 0.15;
    return {
      startTime,
      endTime,
      duration: dur,
      textEn,
    };
  });

  const normalized = normalizeSubtitlePipeline(rawCues, []);
  const translated = await translateMissingVietnameseBatch(normalized);

  return translated.map((item, idx) => ({
    id: idx + 1,
    start: formatTimestampMs(item.startTime),
    end: formatTimestampMs(item.endTime),
    duration: item.duration,
    english: item.textEn,
    vietnamese: item.textVn,
    dictationWord: extractDictationWord(item.textEn),
    startSeconds: item.startTime,
    isAiGenerated: true,
  }));
}

/**
 * Aligns an authentic `rawTranscript` into timed bilingual subtitles.
 * Throws `RawTranscriptRequiredError` if `rawTranscript` is empty/missing (never hallucinates from video title).
 */
export async function generateAiSubtitlesForVideo({
  videoId,
  videoTitle,
  authorName = "YouTube Creator",
  rawTranscript,
}: GenerateAiSubtitlesParams): Promise<AiGeneratedSubtitleItem[]> {
  void videoId;
  const cleanTranscript = rawTranscript?.trim() || "";
  if (cleanTranscript.length < 10) {
    throw new RawTranscriptRequiredError();
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim() || "";
  if (apiKey) {
    const prompt = `You are an expert bilingual speech and subtitle alignment engine.
Convert the following authentic raw transcript into a clean, synchronized bilingual subtitle timeline for English language learners. Do NOT invent extra dialogue not present in the transcript.

Video Title: "${videoTitle}"
Author: "${authorName}"
Raw Transcript:
"${cleanTranscript.slice(0, 6000)}"

Requirements:
1. Preserve the exact wording from the transcript; divide only at natural sentence/clause boundaries (max 15 words per cue).
2. Assign realistic progressive timestamps (startTime starting at 0.5, duration 1.8 to 7.0 seconds proportional to word count, non-overlapping).
3. Provide accurate natural Vietnamese translations for each sentence.
4. Output strictly a JSON array:
[
  {
    "startTime": 0.5,
    "duration": 3.8,
    "english": "Exact sentence from transcript.",
    "vietnamese": "Bản dịch tiếng Việt chuẩn xác."
  }
]`;

    const modelsToTry = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.0-flash"];
    for (const modelName of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 4000,
              responseMimeType: "application/json",
            },
          }),
          signal: AbortSignal.timeout(12000),
        });

        if (res.ok) {
          const data = await res.json();
          const rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawJsonText) {
            const cleanedText = rawJsonText.trim().replace(/^```(?:json)?|```$/g, "").trim();
            const parsed = JSON.parse(cleanedText);
            if (Array.isArray(parsed) && parsed.length > 0) {
              let runningTime = 0.5;
              const cues: NormalizedCue[] = [];
              const vnPairs: { startTime: number; endTime: number; textVn: string }[] = [];

              for (const item of parsed) {
                const textEn = String(item?.english || "").trim();
                if (!textEn) continue;
                const startSec =
                  typeof item.startTime === "number"
                    ? Math.max(0, parseFloat(item.startTime.toFixed(3)))
                    : runningTime;
                const dur =
                  typeof item.duration === "number"
                    ? Math.max(1.2, parseFloat(item.duration.toFixed(3)))
                    : 3.5;
                const endSec = parseFloat((startSec + dur).toFixed(3));
                runningTime = endSec + 0.15;

                cues.push({ startTime: startSec, endTime: endSec, duration: dur, textEn });
                const vnText = String(item?.vietnamese || "").trim();
                if (vnText) {
                  vnPairs.push({ startTime: startSec, endTime: endSec, textVn: vnText });
                }
              }

              if (cues.length > 0) {
                const normalized = normalizeSubtitlePipeline(cues, vnPairs);
                const withVn = await translateMissingVietnameseBatch(normalized);
                return withVn.map((item, idx) => ({
                  id: idx + 1,
                  start: formatTimestampMs(item.startTime),
                  end: formatTimestampMs(item.endTime),
                  duration: item.duration,
                  english: item.textEn,
                  vietnamese: item.textVn,
                  dictationWord: extractDictationWord(item.textEn),
                  startSeconds: item.startTime,
                  isAiGenerated: true,
                }));
              }
            }
          }
        }
      } catch (e: any) {
        console.warn(`[Gemini AI Transcribe] ${modelName} warning:`, e?.message || e);
      }
    }
  }

  return await buildDeterministicAlignedSubtitles(cleanTranscript);
}
