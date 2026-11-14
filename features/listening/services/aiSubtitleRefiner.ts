/**
 * Tier-2 AI Punctuation & Sentence Boundary Refiner (Server-only).
 * Refines unpunctuated ASR transcripts using Gemini ONLY when punctuation density is low,
 * enforcing strict 100% alphanumeric token equality with automatic deterministic rollback.
 */

import { NormalizedCue, WordTiming, finalizeSubtitleTimeline, hasTerminalSentenceEnd } from "./subtitleNormalizer";

interface TokenWithTiming {
  word: string;
  norm: string;
  start: number;
  end: number;
}

function normalizeTokenAlphaNum(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function extractTokensWithTimings(cues: NormalizedCue[]): TokenWithTiming[] {
  const result: TokenWithTiming[] = [];

  for (const cue of cues) {
    const words = cue.textEn.split(/\s+/).filter(Boolean);
    if (words.length === 0) continue;

    if (Array.isArray(cue.wordTimings) && cue.wordTimings.length === words.length) {
      for (let i = 0; i < words.length; i++) {
        result.push({
          word: words[i],
          norm: normalizeTokenAlphaNum(words[i]),
          start: cue.wordTimings[i].start,
          end: cue.wordTimings[i].end,
        });
      }
    } else {
      const cueStart = Math.max(0, cue.startTime);
      const cueDur = Math.max(0.4, cue.endTime - cueStart);
      const weights = words.map((w) => Math.max(2, w.replace(/[^a-zA-Z0-9]/g, "").length));
      const totalWeight = weights.reduce((a, b) => a + b, 0) || words.length;
      let cursor = cueStart;

      for (let i = 0; i < words.length; i++) {
        const sliceDur = (weights[i] / totalWeight) * cueDur;
        const wStart = Math.round(cursor * 1000) / 1000;
        const wEnd = Math.round(Math.min(cue.endTime, cursor + sliceDur) * 1000) / 1000;
        result.push({
          word: words[i],
          norm: normalizeTokenAlphaNum(words[i]),
          start: wStart,
          end: Math.max(wStart + 0.04, wEnd),
        });
        cursor += sliceDur;
      }
    }
  }

  return result;
}

function mapPunctuatedSentencesToTokens(
  sentences: string[],
  chunkTokens: TokenWithTiming[]
): NormalizedCue[] | null {
  const aiTokens: { rawWord: string; sentenceIndex: number }[] = [];

  sentences.forEach((sentence, sIdx) => {
    const words = sentence.trim().split(/\s+/).filter(Boolean);
    words.forEach((w) => {
      aiTokens.push({ rawWord: w, sentenceIndex: sIdx });
    });
  });

  if (aiTokens.length !== chunkTokens.length) {
    return null;
  }

  // Strict 100% token-for-token verification
  for (let i = 0; i < chunkTokens.length; i++) {
    const aiNorm = normalizeTokenAlphaNum(aiTokens[i].rawWord);
    const origNorm = chunkTokens[i].norm;
    if (aiNorm !== origNorm) {
      return null;
    }
  }

  // Build NormalizedCue[] using exact original timestamps + Gemini punctuation
  const grouped = new Map<number, { words: string[]; wordTimings: WordTiming[] }>();
  for (let i = 0; i < aiTokens.length; i++) {
    const sIdx = aiTokens[i].sentenceIndex;
    const orig = chunkTokens[i];
    if (!grouped.has(sIdx)) {
      grouped.set(sIdx, { words: [], wordTimings: [] });
    }
    const bucket = grouped.get(sIdx)!;
    bucket.words.push(aiTokens[i].rawWord);
    bucket.wordTimings.push({
      word: aiTokens[i].rawWord,
      start: orig.start,
      end: orig.end,
    });
  }

  const cues: NormalizedCue[] = [];
  for (const [, bucket] of grouped) {
    if (bucket.words.length === 0) continue;
    const startTime = bucket.wordTimings[0].start;
    const endTime = Math.max(startTime + 0.4, bucket.wordTimings[bucket.wordTimings.length - 1].end);
    cues.push({
      startTime,
      endTime,
      duration: Math.round((endTime - startTime) * 1000) / 1000,
      textEn: bucket.words.join(" ").trim(),
      wordTimings: bucket.wordTimings,
    });
  }

  return cues.length > 0 ? cues : null;
}

async function refineChunkWithGemini(chunkTokens: TokenWithTiming[], apiKey: string): Promise<NormalizedCue[] | null> {
  const rawWordsText = chunkTokens.map((t) => t.word).join(" ");
  const prompt = `You are a strict English punctuation and sentence boundary restorer for speech-to-text transcripts.
Task: Split the following exact transcript into natural grammatical sentences (ideal 4 to 20 words per sentence), adding appropriate capitalization and punctuation (. , ? !).
CRITICAL RULES:
1. You MUST preserve EVERY SINGLE WORD in exact order.
2. Do NOT fix grammar, do NOT expand contractions, do NOT replace/add/drop ANY word. Every alphanumeric token sequence MUST stay 100% identical.
3. Return ONLY a JSON array of strings (each element is one complete sentence).

Transcript:
"${rawWordsText}"`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2500,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) return null;

    const cleaned = rawJson.trim().replace(/^```(?:json)?|```$/g, "").trim();
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;

    const stringSentences = parsed.filter((s: unknown): s is string => typeof s === "string" && s.trim().length > 0);
    return mapPunctuatedSentencesToTokens(stringSentences, chunkTokens);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Tier-2 Refiner entrypoint. Runs only when ASR punctuation density < 25% and GEMINI_API_KEY is available.
 * Automatically rolls back per-chunk or globally on any mismatch or timeout.
 */
export async function refineUnpunctuatedAsrSubtitles(cues: NormalizedCue[]): Promise<NormalizedCue[]> {
  if (!Array.isArray(cues) || cues.length < 4) return cues;

  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) return cues;

  const punctuatedCount = cues.filter((c) => hasTerminalSentenceEnd(c.textEn)).length;
  const punctuatedRatio = punctuatedCount / cues.length;
  if (punctuatedRatio >= 0.25) {
    return cues;
  }

  // Group cues into batches of <= 220 words for reliable token-exact alignment
  const cueBatches: NormalizedCue[][] = [];
  let curBatch: NormalizedCue[] = [];
  let curWords = 0;

  for (const cue of cues) {
    const wCount = cue.textEn.split(/\s+/).filter(Boolean).length;
    if (curBatch.length > 0 && curWords + wCount > 220) {
      cueBatches.push(curBatch);
      curBatch = [];
      curWords = 0;
    }
    curBatch.push(cue);
    curWords += wCount;
  }
  if (curBatch.length > 0) cueBatches.push(curBatch);

  // Skip overly long transcripts (> 12 batches) to stay within serverless latency budget
  if (cueBatches.length > 8) {
    return cues;
  }

  const batchResults = await Promise.all(
    cueBatches.map(async (batch) => {
      const tokens = extractTokensWithTimings(batch);
      if (tokens.length < 6) return batch;
      const refined = await refineChunkWithGemini(tokens, apiKey);
      return refined || batch;
    })
  );

  return finalizeSubtitleTimeline(batchResults.flat());
}
