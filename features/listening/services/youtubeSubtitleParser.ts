/**
 * Shared YouTube Subtitle Parser & Normalization Engine
 * Shared between Server Route (/api/youtube/captions), Extractor, and Client Service (youtubeSubtitleService).
 */

import {
  cleanSubtitleText,
  deduplicateRollingAsrCues,
  normalizeSubtitlePipeline,
  mergeBrokenSentenceFragments,
  bridgeSubtitleGaps as bridgeGapsCore,
  isMeaningfulSubtitleText,
  WordTiming,
  NormalizedCue,
} from "@/features/listening/services/subtitleNormalizer";

export type WordTimingItem = WordTiming;

export interface ParsedXmlItem {
  startTime: number;
  endTime: number;
  duration: number;
  textEn: string;
  wordTimings?: WordTimingItem[];
}

export interface ParsedVnItem {
  startTime: number;
  endTime?: number;
  textVn: string;
}

/** Standard timing shift in seconds (0.0s default so raw subtitle timestamps match video audio 100%) */
export const SUBTITLE_TIME_SHIFT_SEC = 0.0;

/** Helper to shift timestamp (clamped to >= 0) */
export function shiftTimestampSec(seconds: number, shift: number = SUBTITLE_TIME_SHIFT_SEC): number {
  if (isNaN(seconds)) return 0;
  return Math.max(0, parseFloat((seconds - shift).toFixed(3)));
}

// Common English Stop-Words to exclude from dictation target word selection
const STOP_WORDS = new Set([
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "here", "where", "much", "down", "should", "those", "being", "very", "yeah",
  "okay", "ok", "oh", "um", "uh", "really", "going", "been",
]);

/**
 * Decodes XML/HTML entities and strips subtitle stage markers ([Music], >>, ♪, zero-width chars).
 */
export function decodeXmlEntities(text: string): string {
  return cleanSubtitleText(text);
}

/**
 * Helper to parse SRT or WEBVTT subtitle text into ParsedXmlItem[]
 */
function parseSrtOrVttToItems(text: string): ParsedXmlItem[] {
  if (!text || !text.includes("-->")) return [];
  const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const blocks = clean.split(/\n\n+/).filter((b) => b.trim().length > 0);
  const items: ParsedXmlItem[] = [];
  const arrowRegex = /(\d{1,2}:\d{2}(?::\d{2})?[.,]\d{1,3})\s*-->\s*(\d{1,2}:\d{2}(?::\d{2})?[.,]\d{1,3})/;

  function parseTsSec(s: string): number {
    const parts = s.trim().replace(",", ".").split(":");
    if (parts.length === 3) {
      return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
    }
    if (parts.length === 2) {
      return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
    }
    return parseFloat(s) || 0;
  }

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    let timeIdx = -1;
    for (let i = 0; i < Math.min(3, lines.length); i++) {
      if (arrowRegex.test(lines[i])) {
        timeIdx = i;
        break;
      }
    }
    if (timeIdx === -1) continue;
    const match = arrowRegex.exec(lines[timeIdx]);
    if (!match) continue;
    const start = parseFloat(parseTsSec(match[1]).toFixed(3));
    const end = Math.max(start + 0.3, parseFloat(parseTsSec(match[2]).toFixed(3)));
    const textLines = lines
      .slice(timeIdx + 1)
      .filter((l) => !l.startsWith("NOTE") && !l.startsWith("WEBVTT") && !l.startsWith("STYLE"));
    const rawText = textLines.join(" ").trim();
    const textEn = cleanSubtitleText(rawText);
    if (isMeaningfulSubtitleText(textEn)) {
      items.push({
        startTime: start,
        endTime: end,
        duration: parseFloat(Math.max(0.3, end - start).toFixed(3)),
        textEn,
      });
    }
  }
  return items;
}

/**
 * Robust XML TimedText Parser resilient against attribute order, quote styles, and spaces.
 * Supports both YouTube standard <text start="..." dur="..."> and TTML / srv3 <p t="..." d="...">.
 */
export function parseTimedTextXml(xmlStr: string): ParsedXmlItem[] {
  if (!xmlStr) return [];

  const rawItems: { startTime: number; rawDur: number | null; textEn: string }[] = [];

  // Format 1: Standard YouTube <text start="..." dur="...">
  if (xmlStr.includes("<text")) {
    const tagRegex = /<text\s+([^>]*)>([\s\S]*?)<\/text>/gi;
    let match: RegExpExecArray | null;

    while ((match = tagRegex.exec(xmlStr)) !== null) {
      const attrStr = match[1];
      const rawContent = match[2];

      const startMatch = /\bstart=["']?\s*([\d\.]+)\s*["']?/i.exec(attrStr);
      const durMatch = /\bdur=["']?\s*([\d\.]+)\s*["']?/i.exec(attrStr);

      if (startMatch) {
        const startTime = parseFloat(startMatch[1]);
        const rawDur = durMatch ? parseFloat(durMatch[1]) : null;
        const textEn = cleanSubtitleText(rawContent);

        if (isMeaningfulSubtitleText(textEn) && !isNaN(startTime)) {
          rawItems.push({ startTime, rawDur, textEn });
        }
      }
    }
  }

  // Format 2: YouTube TTML / srv3 <p t="..." d="..."> format (supports mixed or standalone TTML)
  if (xmlStr.includes("<p ") || xmlStr.includes("<p>")) {
    const pRegex = /<p\s+([^>]*)>([\s\S]*?)<\/p>/gi;
    let match: RegExpExecArray | null;

    while ((match = pRegex.exec(xmlStr)) !== null) {
      const attrs = match[1];
      const rawContent = match[2];

      const tMatch = /\bt=["']?\s*([\d\.]+)\s*["']?/i.exec(attrs);
      const dMatch = /\bd=["']?\s*([\d\.]+)\s*["']?/i.exec(attrs);

      if (tMatch) {
        let tVal = parseFloat(tMatch[1]);
        let dVal = dMatch ? parseFloat(dMatch[1]) : 2.5;

        // In standard YouTube TTML / srv3, t and d are always integer milliseconds.
        if (!tMatch[1].includes(".")) {
          tVal = tVal / 1000;
          if (dMatch && !dMatch[1].includes(".")) {
            dVal = dVal / 1000;
          }
        }

        const textEn = cleanSubtitleText(rawContent);
        if (isMeaningfulSubtitleText(textEn) && !isNaN(tVal)) {
          rawItems.push({ startTime: tVal, rawDur: dVal, textEn });
        }
      }
    }
  }

  if (rawItems.length === 0) return [];

  rawItems.sort((a, b) => a.startTime - b.startTime);

  // Convert rawDur to explicit endTime first, then apply rolling deduplication
  const timedCues = rawItems.map((item, i) => {
    const nextItem = rawItems[i + 1];
    let duration: number;
    if (item.rawDur !== null && !isNaN(item.rawDur) && item.rawDur > 0) {
      duration = item.rawDur;
    } else if (nextItem) {
      duration = Math.min(8.0, Math.max(0.8, parseFloat((nextItem.startTime - item.startTime).toFixed(3))));
    } else {
      duration = 4.0;
    }

    return {
      startTime: parseFloat(item.startTime.toFixed(3)),
      endTime: parseFloat((item.startTime + duration).toFixed(3)),
      text: item.textEn,
    };
  });

  const deduped = deduplicateRollingAsrCues(timedCues);

  return deduped.map((item, i) => {
    const next = deduped[i + 1];
    let endTime = item.endTime;
    if (next && endTime > next.startTime && next.startTime > item.startTime) {
      const clamped = parseFloat(next.startTime.toFixed(3));
      if (clamped - item.startTime > 0.05) {
        endTime = clamped;
      }
    }
    const duration = Math.max(0.3, parseFloat((endTime - item.startTime).toFixed(3)));
    return {
      startTime: item.startTime,
      endTime: parseFloat((item.startTime + duration).toFixed(3)),
      duration,
      textEn: item.text,
    };
  });
}

/**
 * Robust JSON3 YouTube TimedText Parser.
 * Handles format: {"events": [{"tStartMs": 1000, "dDurationMs": 2000, "segs": [{"utf8": "text"}]}]}
 */
export function parseTimedTextJson3(jsonContent: string | object): ParsedXmlItem[] {
  if (!jsonContent) return [];
  try {
    const data = typeof jsonContent === "string" ? JSON.parse(jsonContent) : jsonContent;
    if (!data || !Array.isArray(data.events)) return [];

    const rawEvents: { startTime: number; rawDur: number | null; text: string; wordTimings?: WordTimingItem[] }[] = [];

    for (const event of data.events) {
      if (!event.segs || !Array.isArray(event.segs)) continue;

      const rawText = event.segs
        .map((s: any) => s.utf8 || "")
        .join("")
        .replace(/\n/g, " ")
        .trim();

      const cleanedEventText = cleanSubtitleText(rawText);
      if (!isMeaningfulSubtitleText(cleanedEventText)) continue;

      const startTime = typeof event.tStartMs === "number" ? event.tStartMs / 1000 : 0;
      const rawDur = typeof event.dDurationMs === "number" ? event.dDurationMs / 1000 : null;
      const eventEndSec = rawDur ? startTime + rawDur : startTime + 3.0;

      // Extract sub-second word-level millisecond timing from cleaned segments
      const wordTimings: WordTimingItem[] = [];
      for (let sIdx = 0; sIdx < event.segs.length; sIdx++) {
        const seg = event.segs[sIdx];
        const segText = cleanSubtitleText(seg.utf8 || "");
        if (!segText) continue;

        const segOffsetSec = typeof seg.tOffsetMs === "number" ? seg.tOffsetMs / 1000 : 0;
        const wStart = parseFloat((startTime + segOffsetSec).toFixed(3));
        let wEnd = eventEndSec;
        if (sIdx + 1 < event.segs.length && typeof event.segs[sIdx + 1].tOffsetMs === "number") {
          wEnd = startTime + event.segs[sIdx + 1].tOffsetMs / 1000;
        }
        wEnd = Math.max(wStart + 0.05, parseFloat(wEnd.toFixed(3)));

        const subTokens = segText.split(/\s+/).filter(Boolean);
        if (subTokens.length === 1) {
          wordTimings.push({ word: subTokens[0], start: wStart, end: wEnd });
        } else if (subTokens.length > 1) {
          const totalDur = Math.max(0.08, wEnd - wStart);
          const step = totalDur / subTokens.length;
          for (let ti = 0; ti < subTokens.length; ti++) {
            wordTimings.push({
              word: subTokens[ti],
              start: parseFloat((wStart + ti * step).toFixed(3)),
              end: parseFloat((wStart + (ti + 1) * step).toFixed(3)),
            });
          }
        }
      }

      rawEvents.push({
        startTime: parseFloat(startTime.toFixed(3)),
        rawDur: rawDur !== null ? parseFloat(rawDur.toFixed(3)) : null,
        text: cleanedEventText,
        wordTimings: wordTimings.length > 0 ? wordTimings : undefined,
      });
    }

    if (rawEvents.length === 0) return [];
    rawEvents.sort((a, b) => a.startTime - b.startTime);

    const cuesForDedup = rawEvents.map((ev, i) => {
      const nextEv = rawEvents[i + 1];
      let dur = ev.rawDur !== null && !isNaN(ev.rawDur) && ev.rawDur > 0
        ? ev.rawDur
        : nextEv
        ? Math.min(7.0, Math.max(0.8, parseFloat((nextEv.startTime - ev.startTime).toFixed(3))))
        : 4.0;
      return {
        startTime: ev.startTime,
        endTime: parseFloat((ev.startTime + dur).toFixed(3)),
        text: ev.text,
        wordTimings: ev.wordTimings,
      };
    });

    const deduped = deduplicateRollingAsrCues(cuesForDedup);

    return deduped.map((item, i) => {
      const next = deduped[i + 1];
      let duration = Math.max(0.3, parseFloat((item.endTime - item.startTime).toFixed(3)));

      if (next && item.startTime + duration > next.startTime && next.startTime > item.startTime) {
        const maxAllowedDur = parseFloat((next.startTime - item.startTime).toFixed(3));
        if (maxAllowedDur > 0.05) {
          duration = maxAllowedDur;
        }
      }

      duration = Math.max(0.3, parseFloat(duration.toFixed(3)));
      const endTime = parseFloat((item.startTime + duration).toFixed(3));

      return {
        startTime: item.startTime,
        endTime,
        duration,
        textEn: item.text,
        wordTimings: item.wordTimings,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Multi-Format Universal TimedText Parser (JSON3, XML TimedText, TTML, WEBVTT, SRT)
 */
export function parseTimedTextAny(content: string): ParsedXmlItem[] {
  if (!content) return [];
  const trimmed = content.trim();

  if (trimmed.startsWith("{") || trimmed.includes('"events"')) {
    const jsonParsed = parseTimedTextJson3(trimmed);
    if (jsonParsed.length > 0) return jsonParsed;
  }

  if (trimmed.includes("<text") || trimmed.includes("<p ") || trimmed.includes("<timedtext") || trimmed.includes("<tt")) {
    const xmlParsed = parseTimedTextXml(trimmed);
    if (xmlParsed.length > 0) return xmlParsed;
  }

  if (trimmed.includes("-->") || trimmed.startsWith("WEBVTT")) {
    const srtParsed = parseSrtOrVttToItems(trimmed);
    if (srtParsed.length > 0) return srtParsed;
  }

  return [];
}

/**
 * Universal Vietnamese TimedText Parser (JSON3, XML, TTML, SRT, WEBVTT)
 * Applies the same rolling ASR deduplication & timeline extraction as English tracks.
 */
export function parseVnTimedTextAny(content: string): ParsedVnItem[] {
  if (!content) return [];
  const parsed = parseTimedTextAny(content);
  if (parsed.length === 0) return [];
  return parsed.map((it) => ({
    startTime: it.startTime,
    endTime: it.endTime,
    textVn: it.textEn,
  }));
}

export const parseVnTimedTextXml = parseVnTimedTextAny;

/**
 * Merges fragmented subtitle cues into complete grammatical sentences using shared normalizer rules.
 */
export function mergeFragmentedSubtitlesIntoSentences(items: ParsedXmlItem[]): ParsedXmlItem[] {
  return mergeBrokenSentenceFragments(items as NormalizedCue[]);
}

/**
 * Bridges silence gaps between consecutive subtitle cues with adaptive thresholds.
 */
export function bridgeSubtitleGaps(items: ParsedXmlItem[], customThreshold?: number): ParsedXmlItem[] {
  return bridgeGapsCore(items as NormalizedCue[], customThreshold);
}

/**
 * Character-Weighted Word Alignment with Punctuation Pacing for High-Precision Karaoke Highlighting.
 */
export function calculateCharacterWeightedWordIndex(
  textEn: string,
  elapsedSeconds: number,
  durationSeconds: number
): number {
  if (!textEn || durationSeconds <= 0) return -1;
  const words = textEn.split(/\s+/).filter(Boolean);
  if (words.length === 0) return -1;
  if (words.length === 1) return 0;

  const ratio = Math.max(0, Math.min(1, elapsedSeconds / durationSeconds));

  const wordWeights = words.map((w) => {
    let weight = w.length;
    if (/[,;:—\-]$/.test(w)) weight += 2.5;
    else if (/[.!?]$/.test(w)) weight += 3.5;
    return weight;
  });

  const totalWeight = wordWeights.reduce((sum, w) => sum + w, 0);
  if (totalWeight === 0) return 0;

  const targetWeightProgress = ratio * totalWeight;
  let accumulatedWeight = 0;

  for (let i = 0; i < words.length; i++) {
    accumulatedWeight += wordWeights[i];
    if (targetWeightProgress <= accumulatedWeight) {
      return i;
    }
  }
  return words.length - 1;
}

/**
 * Optimal Bilingual Subtitle Alignment Engine:
 * Splits multi-sentence cues -> merges broken fragments -> bridges tight gaps -> finalizes timeline -> aligns bilingual VN intervals by overlap.
 */
export function alignBilingualSubtitles(
  enItems: ParsedXmlItem[],
  vnItems: ParsedVnItem[]
): { textEn: string; textVn: string; startTime: number; endTime: number; duration: number; wordTimings?: WordTimingItem[] }[] {
  return normalizeSubtitlePipeline(enItems as NormalizedCue[], vnItems);
}

/**
 * Extract Target Dictation Word excluding stop-words and preserving contractions (don't, it's)
 */
export function extractDictationWord(textEn: string): string {
  if (!textEn) return "vocabulary";

  const cleanTokens = textEn
    .replace(/[^a-zA-Z'\s]/g, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^'+|'+$/g, ""))
    .filter((w) => w.length > 2);

  const targetWords = cleanTokens.filter((word) => !STOP_WORDS.has(word.toLowerCase()));

  if (targetWords.length > 0) {
    targetWords.sort((a, b) => b.length - a.length);
    return targetWords[0].toLowerCase();
  }

  return cleanTokens.length > 0 ? cleanTokens[0].toLowerCase() : "vocabulary";
}

/**
 * Timestamp Formatting Engine (Safe against Overflow and Invalid Numbers)
 */
export function formatTimestampMs(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00:00.000";

  const totalMs = Math.round(seconds * 1000);
  const ms = totalMs % 1000;
  const totalSecs = Math.floor(totalMs / 1000);

  const secs = totalSecs % 60;
  const totalMins = Math.floor(totalSecs / 60);

  const mins = totalMins % 60;
  const hrs = Math.floor(totalMins / 60);

  const hh = String(hrs).padStart(2, "0");
  const mm = String(mins).padStart(2, "0");
  const ss = String(secs).padStart(2, "0");
  const mmm = String(ms).padStart(3, "0");

  return `${hh}:${mm}:${ss}.${mmm}`;
}

export function formatSrtTimestamp(seconds: number): string {
  return formatTimestampMs(seconds).replace(".", ",");
}

/**
 * Multi-line Word Wrap for SRT/WEBVTT (< 42 chars per line split logic)
 */
export function wrapTextTo42Chars(text: string): string {
  if (!text || text.length <= 42) return text;

  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= 42) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines.join("\n");
}
